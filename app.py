from flask import Flask, request, jsonify
from flask_cors import CORS
from transcribe import transcribe_audio
import os


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/transcribe_audio', methods=["POST"])
def summerize():
    if 'audio' not in request.files:
        return "Error no files uploaded"
    
    audio_file = request.files['audio']
    save_file_path = os.path.join(app.config['UPLOAD_FOLDER'], audio_file.filename)
    audio_file.save(save_file_path)

    summery = transcribe_audio(save_file_path)

    return {"response" : summery}


if __name__ == "__main__":
    app.run(debug=True)


