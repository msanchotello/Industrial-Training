# INSTALLATION
----------------------------------------------------------------------
Requirements:
- Python 3

# Running locally
## Clone the project
```
git clone https://github.com/msanchotello/Industrial-Training.git
```
## Install dependencies
```
pip install -r requirements.txt
```
## Run the server
```
uvicorn app.main:app --reload
```

The application should now be running locally at http://127.0.0.1:8000

------------------------------------------------------------------------

# Running on Render.com
## Build Command
```
pip install --upgrade pip && pip install -r requirements.txt
```
## Start Command
```
uvicorn app.main:app --host 0.0.0.0 --port 10000
```

## API Documentation (Provided by Swagger UI)
----------------------------------------------------------------------
```
http://127.0.0.1:8000/docs
```

