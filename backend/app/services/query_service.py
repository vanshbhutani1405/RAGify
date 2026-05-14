from fastapi import HTTPException

from langchain.chains import (
    create_retrieval_chain
)

from langchain_core.chat_history import (
    BaseChatMessageHistory
)

from langchain_community.chat_message_histories import (
    ChatMessageHistory
)

from langchain_core.runnables.history import (
    RunnableWithMessageHistory
)

from app.services.document_service import (
    DocumentService
)

from app.pipelines.retriever import (
    create_retriever
)

from app.pipelines.llm_chain import (
    get_llm,
    create_history_aware_chain,
    create_qa_chain
)


class QueryService:

    store = {}

    @staticmethod
    def get_session_history(
        session_id: str
    ) -> BaseChatMessageHistory:

        if session_id not in QueryService.store:

            QueryService.store[
                session_id
            ] = ChatMessageHistory()

        return QueryService.store[
            session_id
        ]

    @staticmethod
    async def stream_answer(
        question: str,
        session_id: str
    ):

        vector_store = (
            DocumentService.vector_store
        )

        if vector_store is None:

            raise HTTPException(
            status_code=400,
            detail="No documents uploaded yet."
             )

            return

        retriever = create_retriever(
            vector_store
        )

        llm = get_llm()

        history_aware_retriever = (
            create_history_aware_chain(
                llm,
                retriever
            )
        )

        qa_chain = create_qa_chain(llm)

        rag_chain = create_retrieval_chain(
            history_aware_retriever,
            qa_chain
        )

        conversational_rag_chain = (
            RunnableWithMessageHistory(
                rag_chain,
                QueryService.get_session_history,
                input_messages_key="input",
                history_messages_key="chat_history",
                output_messages_key="answer"
            )
        )

        async for chunk in (
            conversational_rag_chain.astream(
                {
                    "input": question
                },
                config={
                    "configurable": {
                        "session_id": session_id
                    }
                }
            )
        ):

            if "answer" in chunk:

                yield chunk["answer"]