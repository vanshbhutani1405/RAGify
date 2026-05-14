from pydantic import BaseModel


class UploadResponse(BaseModel):

    total_files: int

    total_pages: int

    total_chunks: int

    message: str


class ErrorResponse(BaseModel):

    error: str