import uvicorn

from api.src.app import app


def main() -> None:
    uvicorn.run(app, host="0.0.0.0")  # type: ignore
