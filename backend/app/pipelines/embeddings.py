from langchain_huggingface import HuggingFaceEmbeddings
from app.core.config import settings

def get_embedding_model():
    """
    Load Huggingface embedding model.
    """
    embeddings = HuggingFaceEmbeddings(
        model_name=settings.EMBEDDING_MODEL
    )

    return embeddings