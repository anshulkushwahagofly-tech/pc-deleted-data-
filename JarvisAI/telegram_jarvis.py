import telebot
from google import genai

# Telegram Token
import os`nBOT_TOKEN = os.environ.get("BOT_TOKEN", "YOUR_TELEGRAM_BOT_TOKEN_HERE")
# Gemini Token
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "YOUR_GEMINI_API_KEY_HERE")

bot = telebot.TeleBot(BOT_TOKEN)

try:
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("Gemini API connected successfully!")
except Exception as e:
    print("Gemini API Error:", e)
    client = None

@bot.message_handler(commands=['help', 'start'])
def send_welcome(message):
    bot.reply_to(message, "Hello Boss! Main aapka Advanced Jarvis hoon. Ab mere paas duniya bhar ki jankari hai, aap kuch bhi pooch sakte hain!")

@bot.message_handler(func=lambda message: True)
def handle_message(message):
    bot.send_chat_action(message.chat.id, 'typing')
    
    if client:
        try:
            # Let the advanced brain answer
            response = client.models.generate_content(
                model='gemini-3.8-flash',
                contents=message.text,
            )
            bot.reply_to(message, response.text)
        except Exception as e:
            bot.reply_to(message, "Sorry Boss, mere brain mein kuch error aa gaya: " + str(e))
    else:
        bot.reply_to(message, "Sorry Boss, mera brain theek se connect nahi hua.")

if __name__ == "__main__":
    print("Advanced Telegram Jarvis is running...")
    bot.infinity_polling()
