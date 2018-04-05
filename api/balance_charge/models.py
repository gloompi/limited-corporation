from django.db import models
from take_access.models import CustomUser

# Create your models here.
class BalanceCharge(models.Model):
  amount = models.FloatField(max_length=500000, default=0, verbose_name="Сумма")
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
  agregator = models.CharField(max_length=50, default='', verbose_name='Платежная система')
  user = models.ForeignKey(
    CustomUser,
    on_delete=models.PROTECT,
    null=True,
    related_name='charged_user',
    verbose_name='Пользователь'
  )

  class Meta:
    ordering = ['date_added']
    verbose_name = 'Пополнение'
    verbose_name_plural = 'Пополнения'

  def __str__(self):
    return str(self.agregator)
