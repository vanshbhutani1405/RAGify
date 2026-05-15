from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import settings

# Singleton: Load embedding model ONCE globally, reuse everywhere!
_embeddings_instance = None

def get_embedding_model():
    """
    Load Huggingface embedding model (singleton - loads only once!).
    """
    global _embeddings_instance
    if _embeddings_instance is None:
        _embeddings_instance = HuggingFaceEmbeddings(
            model_name=settings.EMBEDDING_MODEL
        )
    return _embeddings_instance
