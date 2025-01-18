import boto3
import json
import logging

s3 = boto3.client('s3')
bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-east-1')

def generate_ai_content_bedrock(text):
    try:
        response = bedrock_runtime.invoke_model(
            modelId='amazon.titan-text-lite-v1',
            contentType='application/json',
            accept='application/json',
            body=json.dumps({
                "inputText": f"Summarize the following text:\n\n{text}",
                "textGenerationConfig": {
                    "maxTokenCount": 150,
                    "temperature": 0.7,
                    "topP": 1
                }
            })
        )

        response_body = json.loads(response['body'].read())
        summary = response_body['results'][0]['outputText']
        return summary.strip(), None, None  # Add quiz and flashcard logic similarly
    except Exception as e:
        logging.error(f"Error generating content: {e}")
    
    return None, None, None

# Process S3 text files
def process_text_files(input_bucket, output_bucket):
    try:
        response = s3.list_objects_v2(Bucket=input_bucket)
        if not response.get('Contents'):
            logging.warning(f"No files found in bucket {input_bucket}")
            return

        for obj in response['Contents']:
            file_name = obj['Key']
            if file_name.endswith('.txt'):
                logging.info(f"Processing {file_name}")
                text_file = s3.get_object(Bucket=input_bucket, Key=file_name)
                text = text_file['Body'].read().decode('utf-8')
                summary, quiz, flashcards = generate_ai_content_bedrock(text)
                if summary:
                    base_name = file_name.split('.')[0]
                    s3.put_object(Bucket=output_bucket, Key=f"{base_name}_summary.txt", Body=summary)
                    logging.info(f"Saved summary for {file_name}")
    except Exception as e:
        logging.error(f"Error processing files: {e}")

if __name__ == "__main__":
    input_bucket = "textract-hackville25"
    output_bucket = "textract-hackville25"
    process_text_files(input_bucket, output_bucket)
