# database.py
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

def create_session():
    db_url = os.environ.get('DB_URL') 
    engine = create_engine(db_url, echo=True)
    Session = sessionmaker(bind=engine)
    return Session()
