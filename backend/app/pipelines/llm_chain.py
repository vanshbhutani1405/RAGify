from langchain_groq import ChatGroq

from langchain.chains import (
    create_history_aware_retriever
)

from langchain.chains.combine_documents import (
    create_stuff_documents_chain
)

from langchain_core.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder
)

from app.core.config import settings


def get_llm():

    llm = ChatGroq(
        groq_api_key=settings.GROQ_API_KEY,
        model_name=settings.LLM_MODEL
    )

    return llm


def create_history_aware_chain(
    llm,
    retriever
):

    contextualize_q_system_prompt = (
        """
        Given chat history and latest user question,
        reformulate the question into a standalone question
        understandable without chat history.

        Do NOT answer the question.
        """
    )

    contextualize_q_prompt = (
        ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    contextualize_q_system_prompt
                ),
                MessagesPlaceholder(
                    "chat_history"
                ),
                (
                    "human",
                    "{input}"
                ),
            ]
        )
    )

    history_aware_retriever = (
        create_history_aware_retriever(
            llm,
            retriever,
            contextualize_q_prompt
        )
    )

    return history_aware_retriever


def create_qa_chain(llm):

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                """
                You are RAGify, an AI-powered
                document research assistant.

                Use uploaded documents first.

                If answer is not found in documents,
                clearly mention that and then provide
                a general knowledge answer separately.

                Context:
                {context}
                """
            ),

            MessagesPlaceholder(
                "chat_history"
            ),

            (
                "human",
                "{input}"
            ),
        ]
    )

    qa_chain = create_stuff_documents_chain(
        llm,
        prompt
    )

    return qa_chain