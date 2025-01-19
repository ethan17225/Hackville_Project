from langchain.schema import HumanMessage, SystemMessage
import json
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.exceptions import OutputParserException
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def summarize_document(text):
    llm = ChatGroq(
        temperature=1, 
        groq_api_key="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", 
        model_name="llama-3.3-70b-versatile"
    )

    summarization_prompt_template = PromptTemplate(
        input_variables=["document_text"],
        template=(
            "You are an advanced AI assistant tasked with helping students learn. Your job is to analyze "
            "the provided document and produce a detailed summary and analysis. Follow the structure below strictly:\n"
            "1. Summarize the document in a clear and concise paragraph.\n"
            "2. Identify all key concepts mentioned in the document. For each key concept:\n"
            "   - Provide a brief explanation of the concept.\n"
            "   - List its features and properties.\n"
            "   - Give an example to help the student better understand the concept.\n"
            "3. If the document lacks enough information, search reliable resources online to provide a more comprehensive answer.\n"
            "   Focus on verified and credible academic or industry-specific sources.\n\n"
            "Document: {document_text}\n\n"
            "Your response must follow this strict JSON format:\n"
            "{{\n"
            "  \"summary\": \"[Provide the summary as a single string]\",\n"
            "  \"key_concepts\": [\n"
            "    {{\n"
            "      \"concept\": \"[Key Concept 1]\",\n"
            "      \"explanation\": \"[Brief explanation of the concept]\",\n"
            "      \"features\": [\"[Feature 1]\", \"[Feature 2]\", \"[Feature 3]\"],\n"
            "      \"example\": \"[Provide a real-world example to illustrate the concept]\"\n"
            "    }},\n"
            "    {{\n"
            "      \"concept\": \"[Key Concept 2]\",\n"
            "      \"explanation\": \"[Brief explanation of the concept]\",\n"
            "      \"features\": [\"[Feature 1]\", \"[Feature 2]\", \"[Feature 3]\"],\n"
            "      \"example\": \"[Provide a real-world example to illustrate the concept]\"\n"
            "    }}\n"
            "  ]\n"
            "}}"
        )
    )
    
    summarization_chain = summarization_prompt_template | llm
    
    res = summarization_chain.invoke({"document_text": text})
    
    try:
        json_parser = JsonOutputParser()
        res = json_parser.parse(res.content)
    except OutputParserException:
        raise OutputParserException("Context too big. Unable to parse jobs.")
    return {"summary": res["summary"], "key_concepts": res["key_concepts"]} if isinstance(res, dict) else [res] 

if __name__ == "__main__":
    SAMPLE_TEXT = """
    Deep Learning is a subset of machine learning that uses neural networks with multiple layers.
    These networks can automatically learn representations from data without explicit programming.
    Key concepts include neurons, layers, and activation functions. Neural networks process data
    through interconnected nodes, similar to biological neural networks in the brain.
    """
    
    result = summarize_document(SAMPLE_TEXT)
    print(result)