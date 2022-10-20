import json
import requests
import os

PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]

def get_photo(manufacturer, model_name, color):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "per_page": 1,
        "query": f"shoes {manufacturer} {model_name} {color}",
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)
    try:
        return {"shoe_url": content["photos"][0]["src"]["original"]}
    except (KeyError, IndexError):
        return {"shoe_url": None}
