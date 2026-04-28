import logging
import sys 

def setup_logging():
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
         handlers=[
        logging.StreamHandler(sys.stdout)
    ]  
    )

def get_logger(name: str)-> logging.Logger:
     """
    Create and return a logger instance.

    Example:
        logger = get_logger(__name__)
    """
     
     return logging.getLogger(name)
   