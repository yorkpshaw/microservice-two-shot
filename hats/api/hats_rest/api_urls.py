from django.urls import path

from .api_views import (
    api_list_hats,
    api_loc
)

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("hats/<int:pk>/", api_list_hats, name="api_list_hats"),
    path("loc/", api_loc, name="api_loc")
]
