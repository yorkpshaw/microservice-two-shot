import json
import requests
import os

PEXELS_API_KEY = "563492ad6f9170000100000167984a3e6a3748e3912fc621273d7c5b"

def get_hat(fabric, style, color):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"hat {style} {color}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    try:
        return {"picture_url": content["photos"][0]["src"]["original"]}
    except (KeyError, IndexError):
        return {"picture_url": None}
