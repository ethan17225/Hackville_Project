import boto3
import json

def process_s3_files(bucket_name, output_bucket):
    s3 = boto3.client('s3')
    textract = boto3.client('textract')

    # List objects in the bucket
    response = s3.list_objects_v2(Bucket=bucket_name)

    for obj in response.get('Contents', []):
        file_name = obj['Key']
        print(f"Processing {file_name}")

        # Start Textract job
        response = textract.start_document_text_detection(
            DocumentLocation={'S3Object': {'Bucket': bucket_name, 'Name': file_name}}
        )
        job_id = response['JobId']

        # Wait for the job to complete
        while True:
            response = textract.get_document_text_detection(JobId=job_id)
            status = response['JobStatus']
            if status in ['SUCCEEDED', 'FAILED']:
                break

        if status == 'SUCCEEDED':
            # Extract text
            text = ""
            for item in response['Blocks']:
                if item['BlockType'] == 'LINE':
                    text += item['Text'] + "\n"

            # Save text to output bucket
            output_file = f"{file_name.split('.')[0]}.txt"
            s3.put_object(Bucket=output_bucket, Key=output_file, Body=text)
            print(f"Saved text for {file_name} to {output_file}")
        else:
            print(f"Text extraction failed for {file_name}")

if __name__ == "__main__":
    input_bucket = "textract-console-us-east-1-982eefd8-210e-44ab-a83b-7750817f7fde"
    output_bucket = "textract-hackville25"
    process_s3_files(input_bucket, output_bucket)
