FROM tiangolo/uvicorn-gunicorn:python3.7

# Create app directory
WORKDIR /app

RUN pip install poetry

# We copy just the requirements.txt first to leverage Docker cache
ADD ./pyproject.toml ./pyproject.toml
ADD ./poetry.lock ./poetry.lock

RUN poetry config virtualenvs.create false
RUN poetry install

ENTRYPOINT /start-reload.sh
