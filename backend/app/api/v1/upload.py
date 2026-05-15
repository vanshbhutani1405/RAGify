from typing import List, Optional

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
    HTTPException
)

from app.services.document_service import (
    DocumentService
)

from app.models.responses import (
    UploadResponse
)

router = APIRouter()


@router.post(
    "/upload",
    response_model=UploadResponse
)
async def upload_documents(
    files: List[UploadFile] = File(...),
    rag_type: Optional[str] = Form("custom")
):

    if not files:
        raise HTTPException(
            status_code=400,
            detail="No files uploaded."
        )

    supported_extensions = (".pdf", ".docx", ".txt")
    for file in files:
        if not file.filename.lower().endswith(supported_extensions):
            raise HTTPException(
                status_code=400,
                detail="Supported formats: PDF, DOCX, TXT"
            )

    response = (
        DocumentService.upload_documents(
            files,
            rag_type
        )
    )

    return response
