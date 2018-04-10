from django.contrib import admin
from .models import DepositsModel, ProfitModel

class DepositAdmin(admin.ModelAdmin):
  list_display = ('user', 'amount', 'is_active', 'profit', 'date_added')

# Register your models here.
admin.site.register(DepositsModel, DepositAdmin)
admin.site.register(ProfitModel)