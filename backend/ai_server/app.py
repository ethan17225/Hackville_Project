import requests, json
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from utils.summarize_text import summarize_document
from utils.generate_quiz import generate_quiz
from utils.generate_flashcards import generate_flashcards
from utils.extract_text import extract_text_from_pdf, extract_text_from_docx

load_dotenv()

app = FastAPI()

file_content = ""
file_name = ""

@app.post("/process_file")
async def process_file(request: Request):
    global file_content, file_name
    
    data = await request.json()
    input_file_name = data.get("file_name")
    file_type = data.get("file_type")
    function_var = data.get("function")
    
    if file.filename.endswith(".pdf"):
            document_text = extract_text_from_pdf(file_location)
        elif file.filename.endswith(".docx"):
            document_text = extract_text_from_docx(file_location)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a PDF or DOCX file.")
    
    if function_var == "summarize":
        result = summarize_document(file_content)
    elif function_var == "quiz":
        result = generate_quiz(file_content)
    elif function_var == "flashcards":
        result = generate_flashcards(file_content)
    else:
        result = {"error": "Invalid function specified"}
    
    return result

