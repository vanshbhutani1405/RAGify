from fastapi import UploadFile
import os

from app.utils.file_handling import (
    save_uploaded_file
)

from app.pipelines.loader import load_document
from app.pipelines.splitter import split_documents
from app.pipelines.vector_store import (
    create_vector_store,
    delete_vector_store_collection
)


class DocumentService:

    vector_stores = {}
    uploaded_custom_files = []

    @staticmethod
    def _load_demo_rag(rag_type: str):
        """Load a demo RAG on demand (lazy loading)."""
        demo_dir = "temp/uploads"
        
        demo_filenames = {
            "financial": "Ragify Financial Rag Sample Document.pdf",
            "legal": "Ragify Indian Legal Rag Sample Document.pdf"
        }
        
        if rag_type not in demo_filenames:
            return
        
        filename = demo_filenames[rag_type]
        file_path = os.path.join(demo_dir, filename)
        
        if os.path.exists(file_path):
            documents = load_document(file_path)
            if documents:
                chunks = split_documents(documents)
                vector_store = create_vector_store(chunks, collection_name=f"ragify_{rag_type}")
                DocumentService.vector_stores[rag_type] = vector_store
                print(f"{rag_type.capitalize()} RAG loaded on demand")

    @staticmethod
    def upload_documents(
    files,
    rag_type="custom"
    ):
        all_documents = []
        total_files = 0

        for file in files:
            file_path = save_uploaded_file(file)
            documents = load_document(file_path)
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
    def clear_custom_documents():
        delete_vector_store_collection("ragify_custom")
        
        if "custom" in DocumentService.vector_stores:
            del DocumentService.vector_stores["custom"]
        
        for file_path in DocumentService.uploaded_custom_files:
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception:
                pass
        
        DocumentService.uploaded_custom_files = []
