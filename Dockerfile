ARG PYTHON_VERSION=3.10
FROM python:$PYTHON_VERSION
ARG PYTHON_VERSION
WORKDIR /server
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update
RUN apt install -y python3-opencv

ADD requirements.txt requirements.txt
RUN pip install -r requirements.txt
ADD . .
EXPOSE 5000
CMD ["python", "main.py"]