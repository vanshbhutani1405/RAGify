from fastapi import APIRouter

from fastapi.responses import (
    StreamingResponse
)

from app.services.query_service import (
    QueryService
)

from app.models.requests import (
    QueryRequest
)

router = APIRouter()


@router.post("/query")
async def query_document(
    request: QueryRequest
):

    return StreamingResponse(
        QueryService.stream_answer(
            request.question,
            request.session_id
        ),
        media_type="text/plain"
    )