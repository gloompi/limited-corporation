from django.contrib import admin
from .models import BalanceCharge

class BalanceChargeAdmin(admin.ModelAdmin):
  list_display = ('user', 'amount', 'agregator', 'date_added')

# Register your models here.
admin.site.register(BalanceCharge, BalanceChargeAdmin)