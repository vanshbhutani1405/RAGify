from pydantic import BaseSettings

class Settings(BaseSettings):
    """
    Centralized configuration for the application.
    Loads values from environment variables.
    """
    APP_NAME: str = "RAGify"
    APP_VERSION: str = "1.0.0"

    API_PREFIX: str = "/api/v1"

    class Config:
        env_file = ".env"
        
settings = Settings()