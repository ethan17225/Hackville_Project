from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import time
from utils.summarize_text import summarize_document
from utils.generate_quiz import generate_quiz
from utils.generate_flashcards import generate_flashcards
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from docx import Document

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:4200",
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
async def process_file(file: UploadFile = File(...)):
    global file_content

    # Read the file and extract text based on the file type
    if file.content_type == "application/pdf":
        text = extract_text_from_pdf(file.file)
    elif file.content_type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        text = extract_text_from_docx(file.file)
    else:
        return {"error": "Unsupported file type. Please upload a PDF or DOCX file."}

    file_content = text
    return {"status": "File processed successfully", "extracted_text": text}

def extract_text_from_pdf(file):
    """Extract text from a PDF file."""
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file):
    """Extract text from a DOCX file."""
    doc = Document(file)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text


@app.post("/process_text")
async def process_text(request: Request) -> Dict[str, Any]:
    try:
        data = await request.json()
        function_var = data.get("function", "")

        if not file_content:
            raise HTTPException(status_code=400, detail="No content provided")

        
        # Process short content directly
        if function_var == "summarize":
            return summarize_document(file_content)
        elif function_var == "quiz":
            return generate_quiz(file_content)
        elif function_var == "flashcards":
            return generate_flashcards(file_content)
        else:
            raise HTTPException(status_code=400, detail="Invalid function specified")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8080)