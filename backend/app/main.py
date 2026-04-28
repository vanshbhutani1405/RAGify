from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.health import router as health_router
from app.core.logging import setup_logging
from app.utils.logging_utils import log_startup

def create_app() -> FastAPI:
    """ factory function to create FastAPI app"""
    setup_logging()

    app=FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION   
          )
    
    # Register routes
    app.include_router(
        health_router,
        prefix=settings.API_PREFIX
    )
    log_startup()

    return app

app=create_app()
