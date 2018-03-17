from django.contrib import admin
from .models import DepositsModel, ProfitModel

# Register your models here.
admin.site.register(DepositsModel)
admin.site.register(ProfitModel)