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

    vector_store = None

    @staticmethod
    def upload_documents(files):

        all_documents = []

        total_files = 0

        for file in files:

            file_path = save_uploaded_file(file)

            documents = load_pdf(file_path)

            all_documents.extend(documents)

            total_files += 1

        chunks = split_documents(all_documents)

        vector_store = create_vector_store(chunks)

        DocumentService.vector_store = vector_store

        return {
            "total_files": total_files,
            "total_pages": len(all_documents),
            "total_chunks": len(chunks),
            "message": "Documents processed successfully"
        }
    
    @staticmethod
    def load_demo_documents():
        demo_dir = "temp/uploads"
        demo_files = [
            "Ragify Financial Rag Sample Document.pdf",
            "Ragify Indian Legal Rag Sample Document.pdf"
        ]
        
        all_documents = []
        
        for filename in demo_files:
            file_path = os.path.join(demo_dir, filename)
            if os.path.exists(file_path):
                documents = load_pdf(file_path)
                all_documents.extend(documents)
        
        if all_documents:
            chunks = split_documents(all_documents)
            vector_store = create_vector_store(chunks)
            DocumentService.vector_store = vector_store
            print(f"Loaded {len(all_documents)} pages from demo documents into {len(chunks)} chunks")
