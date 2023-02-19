import fastapi
from .images import ImageHandlers

app = fastapi.FastAPI()
img_handler = ImageHandlers()


@app.get("/grayscale")
async def grayscale(url: str):
    data = await img_handler.add_grayscale_filter(url)
    return fastapi.responses.Response(data, media_type="image/jpeg")
