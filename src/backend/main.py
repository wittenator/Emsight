from dataclasses import dataclass, asdict
import socket
import json
from typing import List

from fastapi import FastAPI, Form, HTTPException, Depends
from starlette.middleware.gzip import GZipMiddleware
from sqlalchemy.orm import Session

from classes import crud, models, database, schemas
from classes.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

from bert_serving.client import BertClient


app = FastAPI()

# Dependency
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()

app.add_middleware(GZipMiddleware)

@app.get("/ideas", response_model=List[schemas.Idea])
def getData(db: Session = Depends(get_db)):
    ideas = crud.get_ideas(db)
    return ideas

@app.post("/ideas", response_model=schemas.Idea)
def postData(db: Session = Depends(get_db), title: str = Form(...), description: str = Form(...), department: str = Form(..., regex="^IT|HR|PR|IN|QM$")):
    # necessary because the bert-as-service library does not do dns name resolution :(
    try:
        bc = BertClient(ip=socket.gethostbyname_ex('BERTaaS')[2][0], output_fmt='list')
        embedding = bc.encode([description])
    except:
        raise HTTPException(status_code=500, detail="The embedding service threw an error. Please check the corresponding logs.")
    return crud.create_idea(db, title, description, department, embedding)

@app.delete("/ideas", response_model=int)
def deleteData(db: Session = Depends(get_db)):
    return crud.delete_ideas(db)
