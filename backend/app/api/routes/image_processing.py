from fastapi import APIRouter,HTTPException
from fastapi.responses import JSONResponse
import os
from PIL import Image
from random import randint
from app.services.image_processing import TrafficDensity
from pydantic import BaseModel
router = APIRouter()

td = TrafficDensity()

class ImageProcessingRequest(BaseModel):
    file_name: str

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FOLDER = "D:\\project\\traffic-controll\\project1\\backend\\output_frames"

# os.makedirs(INPUT_FOLDER,exist_ok=True)

def process_image(img_path:str,output_path:str,img_id):
    try:
        with Image.open(img_path) as img:
            img.save(output_path)
            return 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {e}")

@router.post('/process-image')
async def process_image_endpoint(body:ImageProcessingRequest):
    try:
        print(body)
        img_id = randint(1,65)
        input_path = f"{INPUT_FOLDER}\\{body.file_name}\\{img_id}.jpg"
        print(input_path)

        detected_vehicles = td.trafficDensity(input_path,img_id)

        return {
                "img_id":img_id,
                'input_image_url': f"/images/input/{img_id}.png",
                "detected_vehicles": detected_vehicles
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

