import speech_recognition as sr
import pyttsx3

# Initialize the text-to-speech engine
engine = pyttsx3.init()

# Set voice properties (optional)
voices = engine.getProperty('voices')
# You can change [0] to [1] to change the voice from male to female
engine.setProperty('voice', voices[0].id) 
engine.setProperty('rate', 170) # Speed of speech

def speak(text):
    """Function to make Jarvis speak"""
    print(f"Jarvis: {text}")
    engine.say(text)
    engine.runAndWait()

def listen():
    """Function to listen to the user's voice"""
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        # Adjust for ambient noise
        recognizer.adjust_for_ambient_noise(source, duration=1)
        audio = recognizer.listen(source)

    try:
        print("Recognizing...")
        # Use Google's free speech recognition
        query = recognizer.recognize_google(audio, language='en-in')
        print(f"You said: {query}")
        return query.lower()
    except sr.UnknownValueError:
        print("Sorry, I didn't catch that. Please say it again.")
        return ""
    except sr.RequestError:
        print("Network error. Please check your internet connection.")
        return ""

if __name__ == "__main__":
    speak("Hello Boss. I am online and ready to help.")
    
    while True:
        command = listen()
        
        if command:
            if "hello" in command:
                speak("Hello! How can I assist you today?")
            
            elif "time" in command:
                import datetime
                time_now = datetime.datetime.now().strftime("%I:%M %p")
                speak(f"The current time is {time_now}")
            
            elif "exit" in command or "stop" in command or "bye" in command:
                speak("Goodbye Boss. Have a great day!")
                break
            
            else:
                speak("I heard you, but I don't know how to do that yet. We will add a smart brain soon!")
