from langchain_chroma import Chroma 

from app.pipelines.embeddings import (
    get_embedding_model
)

def create_vector_store(chunks):
    """
    Create Chroma vector store from document chunks.
    """
    embeddings = get_embedding_model()
    vector_store=Chroma.from_documents(
        documents=chunks,
        embedding=embeddings
    )

    return vector_store