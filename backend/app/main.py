from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.health import health_check

def create_app() -> FastAPI:
    """ factory function to create FastAPI app"""
    app=FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION   
          )
    
    # Register routes
    app.include_router(
        health_check.router,
        prefix=settings.API_PREFIX
    )

    return app

app=create_app()