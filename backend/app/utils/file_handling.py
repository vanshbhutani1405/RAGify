import os
from fastapi import UploadFile
from app.core.config import settings


def save_uploaded_file(file: UploadFile) -> str:
    """
    Save uploaded file to uploads directory.
    Returns saved file path.
    """

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    file_path = os.path.join(
        settings.UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path