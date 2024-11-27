import whisper
import logging
import warnings
from get_ai import invoke_model
warnings.filterwarnings('ignore')

try:
    model = whisper.load_model("base")  # You can choose other models like "small", "medium", or "large"
    # print("Whisper model loaded successfully.")
    logging.info("Whisper model loaded successfully.")
except Exception as e:
    print(f"Error loading Whisper model: {e}")
    logging.error(f"Error loading Whisper model: {e}")
    raise

def transcribe_audio(file_path):
    try:
        result = model.transcribe(file_path, fp16=False)
        # print(f"transcribed text: {result["text"]}")

        summary = invoke_model(result["text"])
        # print(f"Summerized text: {summary}")

        return summary
    except Exception as e:
        # print(f"Error occured in transcribe_audio: {e}")
        logging.error(f"Error occured in transcribe_audio: {e}")
        return e