from pydantic import BaseModel


class QueryRequest(BaseModel):

    question:str

    session_id:str="default"

    rag_type:str="custom"