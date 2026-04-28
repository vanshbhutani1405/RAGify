from app.core.logging import get_logger

logger=get_logger(__name__)

def log_startup():
    logger.info("RAGify API is starting up")

def log_shutdown():
    logger.info("RAGify API is shutting down")

def log_error(error: Exception):
    logger.error(f"An error occurred: {str(error)}")