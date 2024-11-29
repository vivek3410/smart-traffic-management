from fastapi import FastAPI
from app.core.config import settings
from starlette.middleware.cors import CORSMiddleware

from fastapi.routing import APIRoute
from app.api.main import api_router
def custom_generate_unique_id(route: APIRoute) -> str:
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(
    title=settings.PROJECT_NAME
)

if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=['*']
    )

app.include_router(api_router,prefix=settings.API_V1_STR)