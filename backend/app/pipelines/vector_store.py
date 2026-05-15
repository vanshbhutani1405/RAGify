from langchain_chroma import Chroma 

# Disable ChromaDB telemetry to save memory and network
import os
os.environ["CHROMA_TELEMETRY_ENABLED"] = "false"

from app.pipelines.embeddings import (
    get_embedding_model
)

def create_vector_store(chunks, collection_name="ragify_custom"):
    """
    Create Chroma vector store from document chunks - 100% in-memory, no persistence!
    """
    embeddings = get_embedding_model()
    
    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        collection_name=collection_name,
        persist_directory=None
    )

    return vector_store

def delete_vector_store_collection(collection_name="ragify_custom"):
    """
    Delete a Chroma collection to fully clean up old embeddings.
    """
    embeddings = get_embedding_model()
    try:
        # Create a temporary Chroma instance just to get the client and delete the collection
        temp_vector_store = Chroma(
            embedding_function=embeddings,
            collection_name=collection_name,
            persist_directory=None
        )
        temp_vector_store.delete_collection()
        print(f"Successfully deleted Chroma collection: {collection_name}")
    except Exception as e:
        print(f"Warning: Could not delete Chroma collection {collection_name}: {e}")
