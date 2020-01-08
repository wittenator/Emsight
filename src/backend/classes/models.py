from sqlalchemy import Boolean, Column, Sequence, Integer, String, JSON

from .database import Base

class Idea(Base):
    __tablename__ = 'ideas'
    id = Column(Integer, Sequence('idea_id_seq'), primary_key=True)
    title = Column(String(512))
    description = Column(String(50))
    department = Column(String(50))
    embedding = Column(JSON())
    done = Column(Boolean())
