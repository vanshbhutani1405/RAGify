import os
import uuid
from fastapi import UploadFile
from app.core.config import settings


def save_uploaded_file(file: UploadFile) -> str:
    """
    Save uploaded file to uploads directory with UUID prefix to prevent collisions.
    Returns saved file path.
    """

    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

    # Add UUID prefix to filename to prevent collisions if users upload same-named files
    safe_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(
        settings.UPLOAD_DIR,
        safe_filename
    )

    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())

    return file_path