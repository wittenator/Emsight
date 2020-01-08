import typing as t

from pydantic import BaseModel


class IdeaBase(BaseModel):
    id: int
    title: str
    description: str
    department: str

class IdeaCreate(IdeaBase):
    pass

class Idea(IdeaBase):
    embedding: t.Union[str, int, float, bool, None, t.Dict[str, t.Any], t.List[t.Any]]

    class Config:
        orm_mode = True
        allow_arbitrary_types = True