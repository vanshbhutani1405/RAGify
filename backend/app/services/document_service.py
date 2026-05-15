from fastapi import UploadFile
import os

from app.utils.file_handling import (
    save_uploaded_file
)

from app.pipelines.loader import load_pdf
from app.pipelines.splitter import split_documents
from app.pipelines.vector_store import (
    create_vector_store,
    delete_vector_store_collection
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
        print("=== DOCUMENT UPLOAD ===")
        print("Number of files received:", len(files))
        print("Current rag_type:", rag_type)
        
        all_documents = []
        total_files = 0

        for i, file in enumerate(files):
            print(f"  Processing file {i+1}/{len(files)}: {file.filename}")
            file_path = save_uploaded_file(file)
            documents = load_pdf(file_path)
            print(f"  Loaded {len(documents)} pages from {file.filename}")
            all_documents.extend(documents)
            total_files += 1
            if rag_type == "custom":
                DocumentService.uploaded_custom_files.append(file_path)

        print(f"Total pages across all files: {len(all_documents)}")
        chunks = split_documents(all_documents)
        print(f"Total chunks created: {len(chunks)}")

        vector_store = create_vector_store(chunks, collection_name=f"ragify_{rag_type}")
        DocumentService.vector_stores[rag_type] = vector_store
        
        print("DocumentService.vector_stores.keys():", list(DocumentService.vector_stores.keys()))
        print(f"Successfully stored {rag_type} vector store!")

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
        print("=== CLEARING CUSTOM DOCUMENTS ===")
        
        # 1. Delete Chroma collection
        delete_vector_store_collection("ragify_custom")
        
        # 2. Remove vector store from memory
        if "custom" in DocumentService.vector_stores:
            del DocumentService.vector_stores["custom"]
            print("Removed custom vector store from memory")
        
        # 3. Delete uploaded temp files
        deleted_files = 0
        for file_path in DocumentService.uploaded_custom_files:
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
                    deleted_files += 1
                    print(f"Deleted temp file: {file_path}")
            except Exception as e:
                print(f"Warning: Could not delete file {file_path}: {e}")
        
        DocumentService.uploaded_custom_files = []
        
        print("DocumentService.vector_stores.keys() after clear:", list(DocumentService.vector_stores.keys()))
        print(f"=== CLEARED {deleted_files} temp files ===")
