FROM python:3.11-slim
COPY . usr/src/app
WORKDIR /usr/src/app
#RUN pip install  -r requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
#ENTRYPOINT  uvicorn --host 0.0.0.0 --port 8080 main:app --reload

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080", "--reload"]
#docker build -t entornoapi .
#docker run -it -d -p 8080:8080 -v ${pwd}:/usr/src/app entornoapi