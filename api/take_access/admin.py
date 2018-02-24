from django.contrib import admin
from .models import CustomUser, DepositsModel

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(DepositsModel)