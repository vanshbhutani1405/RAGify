from langchain_text_splitters import (
    RecursiveCharacterTextSplitter
)

from app.core.config import settings

def split_documents(documents):
    """
    Split documents into smalled chunkks .
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=settings.CHUNK_SIZE,
        chunk_overlap=settings.CHUNK_OVERLAP,
    )
    chunks = text_splitter.split_documents(documents)

    return chunks