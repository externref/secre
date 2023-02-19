from __future__ import annotations

import asyncio
import io

import httpx
from PIL import Image as image_mod
from PIL import ImageOps


class ImageHandlers:
    client = httpx.AsyncClient()

    @classmethod
    async def fetch_bytes_for_url(cls, url: str) -> bytes:
        res = await cls.client.get(url)
        return res.read()

    @staticmethod
    def _add_grayscale_filter(data: bytes) -> bytes:
        image = image_mod.open(io.BytesIO(data))
        image = ImageOps.grayscale(image)
        image.save(new_bio := io.BytesIO(), "PNG")
        return new_bio.getvalue()

    async def add_grayscale_filter(self, url: str) -> bytes | None:
        loop = asyncio.get_event_loop()
        image = await loop.run_in_executor(
            None, self._add_grayscale_filter, await self.fetch_bytes_for_url(url)
        )
        return image
