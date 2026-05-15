from fastapi import APIRouter

from app.services.document_service import DocumentService
from app.services.query_service import QueryService

router = APIRouter()


@router.post("/clear-custom")
async def clear_custom_documents():
    DocumentService.clear_custom_documents()
    
    session_ids_to_clear = [
        sid for sid in QueryService.store.keys()
        if sid.startswith("custom_")
    ]
    
    for session_id in session_ids_to_clear:
        QueryService.clear_session(session_id)
    
    return {
        "message": "Custom documents, vector store, and chat history cleared successfully"
    }
