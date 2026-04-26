from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    """
    Centralized configuration for the application.
    Loads values from environment variables.
    """
    APP_NAME: str 
    APP_VERSION: str 
    API_PREFIX: str 

    GROQ_API_KEY: str
    LLM_MODEL: str

    EMBEDDING_MODEL: str

    UPLOAD_DIR: str
    PROCESSED_DIR: str

    CHUNK_SIZE: int
    CHUNK_OVERLAP: int
    TOP_K: int

    LANGCHAIN_TRACING_V2: bool = False
    LANGCHAIN_API_KEY: str = ""
    LANGCHAIN_PROJECT: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    """
    Returns cached settings instance.
    Prevents reloading environment repeatedly.
    """
    return Settings()
        
settings = Settings()