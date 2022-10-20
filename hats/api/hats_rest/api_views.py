from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .acls import get_hat
from .models import LocationVO, Hat

# Create your views here.
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name", "section_number", "shelf_number", "import_href"]


class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color", "picture_url"]

    def get_extra_data(self, o):
        return {"location": o.location.import_href}


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = ["style", "fabric", "color", "location", "picture_url"]
    encoders = {
        "location": LocationVOEncoder(),
        }




@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_href=None):
    """
    Lists the hat style and link to to the hat

    GET:
    Returns a dictionary with a single key "hats" which is a list of the hat style,
    fabric, color, along with its href.

    {
        "hats": [
            {
                "style": hat's style,
                "fabric": hat's fabric,
                "color": hat's color,
                "href": URL to the hat,
            }
        ]
    }

    POST:
    Creates a hat instance and returns its details.
    {
        "style": the hat's style name,
        "fabric": the hat's fabric,
        "color": the hat's color,
        "location": {
            "id": location's id,
            "closet_name": location's closet name,
            "section_number": the number of the wardrobe section,
            "shelf_number": the number of the shelf,
            "href": URL to the location,
        }
    }
    """
    if request.method == "GET":
        if location_vo_href is not None:
            hats = Hat.objects.filter(location=location_vo_href)
        else:
            hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            location_href = content["location"]
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400
            )


        photo = get_hat(content["style"], content["color"])
        content.update(photo)
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_hat(request,pk):
    """
    Returns the details of the Hat model specified by the pk parameter.

    Returns a dictionary with the fabric, style, color, and location.

    {
        "style": hat's style,
        "fabric": hat's fabric,
        "color": hat's color,
        "location": {
            "closet_name": location's closet name,
            "section_number": the number of the wardrobe section,
            "shelf_number": the number of the shelf,
            "href": URL to the location,
        }
    }
    """

    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

    else:
        try:
            hat = Hat.objects.filter(id=pk)
            hat.delete()
            return JsonResponse({"deleted": "your hat has been deleted"})
        except Hat.DoesNotExist:
            return JsonResponse({"message": "hat does not exist"})
