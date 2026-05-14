from pydantic import BaseModel


class QueryRequest(BaseModel):
    """
    Request model for query endpoint.
    """

    question: str

    session_id: str = "default"