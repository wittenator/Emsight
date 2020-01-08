from sqlalchemy.orm import Session

from . import models

from typing import List


def get_ideas(db: Session):
    print(db.query(models.Idea).all())
    return db.query(models.Idea).all()


def create_idea(db: Session, title: str, description: str, department: str, embedding: List[List[float]]):
    idea = models.Idea(title=title, description=description, department=department, done=False, embedding=embedding)
    db.add(idea)
    db.commit()
    db.refresh(idea)
    return idea

def delete_ideas(db: Session):
    num = db.query(models.Idea).delete()
    db.commit()
    return num
