from django.contrib import admin

from .models import LocationVO, Hat

# Register your models here.
@admin.register(LocationVO)
class LocationVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Hat)
class HatAdmin(admin.ModelAdmin):
    pass
