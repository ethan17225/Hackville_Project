import requests
import json
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from utils.summarize_text import summarize_document
from utils.generate_quiz import generate_quiz
from utils.generate_flashcards import generate_flashcards

load_dotenv()

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:4200",  # Angular frontend
    "http://127.0.0.1:4200"  # Alternative localhost
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

file_content = ""

@app.post("/process_file")
async def process_file(request: Request):
    global file_content
    
    data = await request.json()
    file_content = data.get("file_content")
    
    return {"status": "OK"}
        
@app.post("/process_text")
async def process_text(request: Request):
    data = await request.json()
    function_var = data.get("function")
    if function_var == "summarize":
        result = summarize_document(file_content)
    elif function_var == "quiz":
        result = generate_quiz(file_content)
    elif function_var == "flashcards":
        result = generate_flashcards(file_content)
    else:
        result = {"error": "Invalid function specified"}
    
    return result

@app.post("/summarize_text")
async def summarize_text(request: Request):
    data = await request.json()
    text = data.get("text")
    result = summarize_document(text)
    return result

# Run app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)
