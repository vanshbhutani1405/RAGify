from fastapi import UploadFile

from app.utils.file_handling import (
    save_uploaded_file
)

from app.pipelines.loader import load_pdf
from app.pipelines.splitter import split_documents
from app.pipelines.vector_store import (
    create_vector_store
)


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