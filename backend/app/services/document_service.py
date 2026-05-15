from fastapi import UploadFile
import os

from app.utils.file_handling import (
    save_uploaded_file
)

from app.pipelines.loader import load_pdf
from app.pipelines.splitter import split_documents
from app.pipelines.vector_store import (
    create_vector_store
)
from app.core.config import settings


class DocumentService:

    vector_stores = {}
    uploaded_custom_files = []

    @staticmethod
    def upload_documents(
    files,
    rag_type="custom"
    ):

        all_documents = []

        total_files = 0

        for file in files:

            file_path = save_uploaded_file(file)

            documents = load_pdf(file_path)

            all_documents.extend(documents)

            total_files += 1

            if rag_type == "custom":
                DocumentService.uploaded_custom_files.append(file_path)

        chunks = split_documents(all_documents)

        vector_store = create_vector_store(chunks, collection_name=f"ragify_{rag_type}")

        DocumentService.vector_stores[rag_type] = vector_store

        return {
            "total_files": total_files,
            "total_pages": len(all_documents),
            "total_chunks": len(chunks),
            "message": "Documents processed successfully"
        }
    
    @staticmethod
    def load_demo_documents():
        demo_dir = "temp/uploads"
        
        demo_configs = [
            {
                "rag_type": "financial",
                "filename": "Ragify Financial Rag Sample Document.pdf"
            },
            {
                "rag_type": "legal",
                "filename": "Ragify Indian Legal Rag Sample Document.pdf"
            }
        ]
        
        for config in demo_configs:
            file_path = os.path.join(demo_dir, config["filename"])
            if os.path.exists(file_path):
                documents = load_pdf(file_path)
                if documents:
                    chunks = split_documents(documents)
                    vector_store = create_vector_store(chunks, collection_name=f"ragify_{config['rag_type']}")
                    DocumentService.vector_stores[config["rag_type"]] = vector_store
                    print(f"Loaded {config['rag_type']} RAG: {len(documents)} pages, {len(chunks)} chunks")
    
    @staticmethod
    def clear_custom_documents():
        if "custom" in DocumentService.vector_stores:
            del DocumentService.vector_stores["custom"]
        
        for file_path in DocumentService.uploaded_custom_files:
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception as e:
                print(f"Warning: Could not delete file {file_path}: {e}")
        
        DocumentService.uploaded_custom_files = []
