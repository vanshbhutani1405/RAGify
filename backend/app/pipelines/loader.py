from langchain_community.document_loaders import (
    PyPDFLoader,
    Docx2txtLoader,
    TextLoader
)
import os

def load_pdf(file_path: str):
    loader = PyPDFLoader(file_path)
    return loader.load()

def load_docx(file_path: str):
    loader = Docx2txtLoader(file_path)
    return loader.load()

def load_txt(file_path: str):
    loader = TextLoader(file_path, encoding="utf-8")
    return loader.load()

def load_document(file_path: str):
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        return load_pdf(file_path)
    elif ext == ".docx":
        return load_docx(file_path)
    elif ext == ".txt":
        return load_txt(file_path)
    else:
        raise ValueError(f"Unsupported file type: {ext}")
