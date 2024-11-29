from fastapi import APIRouter
from app.api.routes import login,video_processing,image_processing
api_router = APIRouter()

@api_router.get('/health-check')
def health_check():
    return "Ok"

api_router.include_router(login.router,prefix='/login',tags=['/login'])
api_router.include_router(video_processing.router,prefix='/video-processing',tags=["video-processing"])
api_router.include_router(image_processing.router,prefix='/image-processing',tags=["image-processing"])
