from django.urls import path

from .views import (
    api_list_shoes,
    api_bin,
    api_shoe_detail,
)

urlpatterns = [
    path("shoes/", api_list_shoes, name="api_list_shoes"),
    path("random/", api_bin, name="api_bin"),
    path("shoes/<int:pk>/", api_shoe_detail, name="api_shoe_detail")
]
