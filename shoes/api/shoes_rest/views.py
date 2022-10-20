from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoe, BinVO
from django.http import JsonResponse
import json
from .acls import get_photo

class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "bin_number", "bin_size", "import_href"]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "shoe_url"]

    def get_extra_data(self, o):
        return {"bin": o.bin.import_href}


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name", "color", "bin", "shoe_url"]
    encoders = {
        "bin": BinVOEncoder(),
    }

def api_bin(request):
    bin_vo = BinVO.objects.all()
    return JsonResponse(
        {"bin": bin_vo},
        encoder=BinVOEncoder
    )

@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_href=None):
    if request.method == "GET":
        if bin_vo_href is not None:
            shoes = Shoe.objects.filter(bin=bin_vo_href)
        else:
            shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        photo = get_photo(content["manufacturer"], content["model_name"], content["color"])
        content.update(photo)
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_shoe_detail(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )
    else:
        try:
            shoe = Shoe.objects.get(id=pk)
            shoe.delete()
            return JsonResponse({"message": "Shoe Has Been Deleted."})
        except Shoe.DoesNotExist:
            return JsonResponse({"message": "Does Not Exist."})
