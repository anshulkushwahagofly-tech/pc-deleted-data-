from google import genai
import sys

import os`nGEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")
try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    response = client.models.generate_content(
        model='gemini-3.8-flash',
        contents='Say hi',
    )
    print("SUCCESS with gemini-3.8-flash:", response.text)
except Exception as e:
    print("ERROR with gemini-3.8-flash:", e)
