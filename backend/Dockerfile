FROM python:3.12-alpine

ENV PYTHONBUFFERED=1

RUN pip install poetry
RUN pip install "psycopg-binary"

WORKDIR /app

COPY poetry.lock pyproject.toml /app/
RUN poetry config virtualenvs.create false && poetry install --no-interaction

COPY . .

EXPOSE 8000

ENTRYPOINT python manage.py migrate && python manage.py runserver 0.0.0.0:8000

