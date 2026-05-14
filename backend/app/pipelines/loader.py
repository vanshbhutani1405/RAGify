from langchain_community.document_loaders import PyPDFLoader

def load_pdf(file_pth: str):
    """
    Load pdf and return langchain documents
    """
    loader=PyPDFLoader(file_pth)
    documents= loader.load()
    return documents