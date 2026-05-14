from app.core.config import settings


def create_retriever(vector_store):

    retriever = vector_store.as_retriever(
        search_kwargs={
            "k": settings.TOP_K
        }
    )

    return retriever