import boto3

# Initialize Bedrock client
bedrock = boto3.client('bedrock', region_name='us-east-1')

try:
    response = bedrock.list_foundation_models()
    print(response)
except Exception as e:
    print(f"Error listing models: {e}")
