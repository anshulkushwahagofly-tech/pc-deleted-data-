import google.generativeai as genai
import sys

try:
    genai.configure(api_key="YOUR_GEMINI_API_KEY_HERE")
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say hi")
    print("SUCCESS")
except Exception as e:
    print(f"FAILED: {e}")
