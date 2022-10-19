from django.db import models
from django.urls import reverse


# Create your models here.

class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100, null=True)
    section_number = models.PositiveSmallIntegerField(null=True)
    shelf_number = models.PositiveSmallIntegerField(null=True)
    import_href = models.CharField(max_length=200, unique=True)


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style = models.CharField(max_length=100)
    color = models.CharField(max_length=25)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.style}, {self.fabric}, {self.color}"

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"pk": self.pk})
