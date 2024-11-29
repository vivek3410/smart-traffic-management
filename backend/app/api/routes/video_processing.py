import cv2
from fastapi import APIRouter,UploadFile,File,HTTPException
import os
router = APIRouter()


# Video processing class
class VideoProcessing:
    def video_to_images(self, video_path: str, output_folder: str):
        if not os.path.exists(output_folder):
            os.makedirs(output_folder)

        video_capture = cv2.VideoCapture(video_path)

        if not video_capture.isOpened():
            raise ValueError("Error: Could not open video")

        frame_count = 0
        while True:
            ret, frame = video_capture.read()
            if not ret:
                break

            frame_filename = os.path.join(output_folder, f"{frame_count}.jpg")
            cv2.imwrite(frame_filename, frame)
            frame_count += 1

        video_capture.release()
        return frame_count, output_folder
@router.post('/video-to-images')
async def video_to_images(file: UploadFile = File(...)):
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400,detail="Only video files are allowed")
    
    input_path = os.path.join('uploaded_videos',file.filename)
    output_folder = os.path.join('output_frames',os.path.splitext(file.filename)[0])

    if not os.path.exists('uploaded_videos'):
        os.makedirs('uploaded_videos')
    with open(input_path,'wb') as video_file:
        video_file.write(await file.read()) 

    video_processor = VideoProcessing()

    try:
        frame_count, output_folder_path = video_processor.video_to_images(input_path,output_folder)
    except ValueError as e:
        raise HTTPException(status_code=500,detail=str(e))
    
    return {
        "message": f"Successfully extracted {frame_count} frames",
        "output_folder": output_folder_path
    }
