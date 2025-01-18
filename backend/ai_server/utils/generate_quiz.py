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

def generate_quiz(text):
    llm = ChatGroq(
        temperature=1,
        groq_api_key=GROQ_API_KEY,
        model_name="llama-3.3-70b-versatile"
    )

    quiz_prompt_template = PromptTemplate(
        input_variables=["document_text"],
        template=(
            "You are an AI assistant tasked with generating quiz questions to help students learn. "
            "Based on the provided document, generate 10 multiple-choice questions. Each question should have 4 answer options, "
            "but only one correct answer. Ensure the answers are related to the questions.\n\n"
            "Document: {document_text}\n\n"
            "Your response must follow this strict JSON format:\n"
            "[\n"
            "  {{\n"
            "    \"question\": \"[Question 1]\",\n"
            "    \"options\": [\n"
            "      \"[Option 1]\",\n"
            "      \"[Option 2]\",\n"
            "      \"[Option 3]\",\n"
            "      \"[Option 4]\"\n"
            "    ],\n"
            "    \"correct_answer\": \"[Correct Answer]\"\n"
            "  }},\n"
            "  {{\n"
            "    \"question\": \"[Question 2]\",\n"
            "    \"options\": [\n"
            "      \"[Option 1]\",\n"
            "      \"[Option 2]\",\n"
            "      \"[Option 3]\",\n"
            "      \"[Option 4]\"\n"
            "    ],\n"
            "    \"correct_answer\": \"[Correct Answer]\"\n"
            "  }}\n"
            "  // Repeat for 10 questions\n"
            "]"
        )
    )

    quiz_chain = quiz_prompt_template | llm

    res = quiz_chain.invoke({
        "document_text": text
    })
    
    try:
        json_parser = JsonOutputParser()
        res = json_parser.parse(res.content)
    except OutputParserException:
        raise OutputParserException("Context too big. Unable to parse jobs.")
    return res if isinstance(res, list) else [res]

if __name__ == "__main__":
    SAMPLE_TEXT = """
    Deep Learning is a subset of machine learning that uses neural networks with multiple layers.
    These networks can automatically learn representations from data without explicit programming.
    Key concepts include neurons, layers, and activation functions. Neural networks process data
    through interconnected nodes, similar to biological neural networks in the brain.
    """

    quiz = generate_quiz(SAMPLE_TEXT)
    print(quiz)
