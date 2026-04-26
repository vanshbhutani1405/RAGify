from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
def healt_check():
    """Health check endpoint."""

    return {
        "status": "ok",
        "message": "RAGify API is running"
    }