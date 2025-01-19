from langchain.schema import HumanMessage, SystemMessage
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
import json
import os
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def generate_flashcards(text):
    llm = ChatGroq(
        temperature=1,
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile"
    )

    flashcard_prompt_template = PromptTemplate(
        input_variables=["document_text"],
        template=(
            "You are an AI assistant tasked with generating flashcards to help students learn. "
            "Based on the provided document, generate 10 flashcards. Each flashcard should have a question on one side "
            "and the answer on the other side. Ensure the questions and answers are related to the document content.\n\n"
            "Document: {document_text}\n\n"
            "Your response must follow this strict JSON format:\n"
            "[\n"
            "  {{\n"
            "    \"question\": \"[Question 1]\",\n"
            "    \"answer\": \"[Answer 1]\"\n"
            "  }},\n"
            "  {{\n"
            "    \"question\": \"[Question 2]\",\n"
            "    \"answer\": \"[Answer 2]\"\n"
            "  }}\n"
            "  // Repeat for 10 flashcards\n"
            "]"
        )
    )

    flashcard_chain = flashcard_prompt_template | llm

    res = flashcard_chain.invoke({
        "document_text": text
    })
    
    try:
        json_parser = JsonOutputParser()
        res = json_parser.parse(res.content)
    except OutputParserException:
        raise OutputParserException("Context too big. Unable to parse jobs.")
    return {"flashcards": res} if isinstance(res, list) else [res]

if __name__ == "__main__":
    SAMPLE_TEXT = """
    Deep Learning is a subset of machine learning that uses neural networks with multiple layers.
    These networks can automatically learn representations from data without explicit programming.
    Key concepts include neurons, layers, and activation functions. Neural networks process data
    through interconnected nodes, similar to biological neural networks in the brain.
    """

    flashcards = generate_flashcards(SAMPLE_TEXT)
    print(flashcards)
