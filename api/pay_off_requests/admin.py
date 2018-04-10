from django.contrib import admin
from .models import PayOffModel

class PayOffAdmin(admin.ModelAdmin):
  list_display = ('user', 'amount', 'wallet', 'agregator', 'status', 'date_added')

# Register your models here.
admin.site.register(PayOffModel, PayOffAdmin)