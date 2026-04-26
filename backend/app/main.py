from fastapi import FastAPI

from app.core.config import settings
from app.api.v1.health import router as health_router

def create_app() -> FastAPI:
    """ factory function to create FastAPI app"""
    app=FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION   
          )
    
    # Register routes
    app.include_router(
        health_router,
        prefix=settings.API_PREFIX
    )

    return app

print(settings.APP_NAME)

app=create_app()