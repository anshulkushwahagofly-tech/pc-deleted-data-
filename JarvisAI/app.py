from flask import Flask, render_template, request, jsonify
from google import genai
import sys

app = Flask(__name__)

# Aapki Gemini API Key (jo aapne kal di thi)
import os`nGEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("Gemini Brain Connected!")
except Exception as e:
    client = None
    print("Error connecting to Gemini:", e)

@app.route('/')
def home():
    # Ye humari sundar UI (HTML) load karega
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_jarvis():
    user_message = request.json.get("message")
    
    if not user_message:
        return jsonify({"reply": "Mujhe kuch sunai nahi diya boss."})

    if client:
        try:
            # Gemini 3.8 se jawab mangenge
            response = client.models.generate_content(
                model='gemini-3.8-flash',
                contents=user_message + " (Reply in conversational Hindi/English mix. Keep it short and natural for a voice assistant.)",
            )
            return jsonify({"reply": response.text})
        except Exception as e:
            print("Error in generation:", e)
            return jsonify({"reply": "Sorry boss, mere system mein kuch technical error hai."})
    else:
        return jsonify({"reply": "Mera brain theek se connect nahi hua hai."})

if __name__ == '__main__':
    # 0.0.0.0 ka matlab hai ki aap ise apne mobile se bhi connect kar payenge!
    app.run(host='0.0.0.0', port=5000, debug=True)
