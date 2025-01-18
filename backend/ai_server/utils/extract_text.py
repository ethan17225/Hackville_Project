from PyPDF2 import PdfReader, WordExtractor

def extract_text_from_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def extract_text_from_docx(file_path):
    extractor = WordExtractor(file_path)
    text = extractor.get_text()
    return text     