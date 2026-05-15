from langchain_chroma import Chroma 

from app.pipelines.embeddings import (
    get_embedding_model
)

def create_vector_store(chunks, collection_name="ragify_custom"):
    """
    Create Chroma vector store from document chunks.
    """
    embeddings = get_embedding_model()
    
    # Use in-memory Chroma to avoid cross-contamination
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=collection_name
    )

    return vector_store
