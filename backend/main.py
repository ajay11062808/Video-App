from tensorflow.keras.models import load_model
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from collections import deque
import subprocess
import os
import imageio_ffmpeg as ffmpeg

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"  # React app origin
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model once when app starts
model = load_model("C:\\Users\\JW536ED\\Downloads\\Newone for test_revanth\\NV_10\\lrcn_model.h5")

# Model input dimensions and classes
SEQUENCE_LENGTH = 20
IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64
CLASSES_LIST = ["Fight", "noFight"]

def predict_on_video(video_file_path, output_file_path):
    video_reader = cv2.VideoCapture(video_file_path)
    original_video_width = int(video_reader.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_video_height = int(video_reader.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Initialize VideoWriter for output (temporary file before conversion)
    temp_output_path = "temp_output.mp4"
    video_writer = cv2.VideoWriter(temp_output_path, cv2.VideoWriter_fourcc(*'mp4v'), 
                                   video_reader.get(cv2.CAP_PROP_FPS), 
                                   (original_video_width, original_video_height))
    
    frames_queue = deque(maxlen=SEQUENCE_LENGTH)
    
    while True:
        ok, frame = video_reader.read()
        if not ok:
            break
        
        resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
        normalized_frame = resized_frame / 255.0
        frames_queue.append(normalized_frame)
        
        if len(frames_queue) == SEQUENCE_LENGTH:
            predicted_labels_probabilities = model.predict(np.expand_dims(frames_queue, axis=0))[0]
            predicted_label = np.argmax(predicted_labels_probabilities)
            predicted_class_name = CLASSES_LIST[predicted_label]
            cv2.putText(frame, predicted_class_name, (10, 30), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        video_writer.write(frame)
    
    video_reader.release()
    video_writer.release()

    # Convert temp_output to x264 format using imageio-ffmpeg for displaying correctly in frontend
    ffmpeg_path = ffmpeg.get_ffmpeg_exe()
    print("path",ffmpeg_path)
    command = [
        ffmpeg_path, '-y', '-i', temp_output_path, '-vcodec', 'libx264', '-f', 'mp4', output_file_path
    ]
    subprocess.call(command)
    os.remove(temp_output_path)  # Clean up temporary file

@app.post("/classify-video")
async def classify_video(file: UploadFile = File(...)):
    video_path = f"temp_{file.filename}"
    output_video_path = f"output_{file.filename}"

    # Save uploaded video file temporarily
    with open(video_path, "wb") as buffer:
        buffer.write(await file.read())

    # Run prediction and format conversion
    predict_on_video(video_path, output_video_path)

    # Clean up temporary uploaded file
    os.remove(video_path)

    return FileResponse(output_video_path, media_type="video/mp4")
