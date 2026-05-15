from fastapi import APIRouter

from app.services.document_service import DocumentService
from app.services.query_service import QueryService

router = APIRouter()


@router.post("/clear-custom")
async def clear_custom_documents():
    print("=== CLEAR ENDPOINT CALLED ===")
    DocumentService.clear_custom_documents()
    
    session_ids_to_clear = [
        sid for sid in QueryService.store.keys()
        if sid.startswith("custom_")
    ]
    
    print(f"Session IDs to clear: {session_ids_to_clear}")
    for session_id in session_ids_to_clear:
        QueryService.clear_session(session_id)
        print(f"Cleared session: {session_id}")
    
    print("QueryService.store.keys() after clear:", list(QueryService.store.keys()))
    print("=== CLEAR COMPLETE ===")
    
    return {
        "message": "Custom documents, vector store, and chat history cleared successfully"
    }
