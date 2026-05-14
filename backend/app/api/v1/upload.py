from typing import List

from fastapi import (
    APIRouter,
    UploadFile,
    File
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

    response = (
        DocumentService.upload_documents(
            files
        )
    )

    return response