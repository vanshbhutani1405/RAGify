from typing import List

from fastapi import (
    APIRouter,
    UploadFile,
    File,
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
    files: List[UploadFile] = File(...)
):

    if not files:
        raise HTTPException(
            status_code=400,
            detail="No files uploaded."
        )

    for file in files:

        if not file.filename.endswith(".pdf"):

            raise HTTPException(
                status_code=400,
                detail="Only PDF files are allowed."
            )

    response = (
        DocumentService.upload_documents(
            files
        )
    )

    return response