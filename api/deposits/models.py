from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget
from take_access.models import CustomUser
  
# Create your models here.
class DepositsModel(models.Model):
  ACTIVE = True
  NOT_ACTIVE = False
  TYPES = (
    (ACTIVE, 'Активный'),
    (NOT_ACTIVE, 'Не активный'),
  )
  amount = models.FloatField(max_length=500000, default=0, verbose_name="Капитал")
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
  is_active = models.BooleanField(max_length=10, default=ACTIVE, choices=TYPES, verbose_name='Статус')
  user = models.ForeignKey(
    CustomUser,
    on_delete=models.PROTECT,
    null=True,
    related_name='related_user',
    verbose_name='Пользователь'
  )
  profit = models.ForeignKey(
    'ProfitModel',
    on_delete=models.PROTECT,
    related_name='profits',
    verbose_name='Валюта'
  )

  class Meta:
    ordering = ['date_added']
    verbose_name = 'Депозит'
    verbose_name_plural = 'Депозиты'

  def __str__(self):
    return str(self.user)

class ProfitModel(models.Model):
  slug = models.SlugField()
  title = models.CharField(max_length=150, verbose_name="Название")
  percent = models.FloatField(max_length=1000, null=True, default=0, verbose_name='Процент')
  duration = models.IntegerField(default=0, verbose_name='Период начислений')
  amount_floor = models.FloatField(max_length=150, verbose_name='Сумма депозита от')
  amount_ceil = models.FloatField(max_length=150, verbose_name='Сумма депозита до')
  pay_off = models.CharField(max_length=150, default='В конце срока', verbose_name='Возврат депозита')

  class Meta:
    verbose_name = 'Валюта'
    verbose_name_plural = 'Валюты'

  def __str__(self):
    return str(self.title)

class GetAllDepositsInfoModel(models.Model):
  deposits = models.IntegerField(default=0, verbose_name='Всего депозитов')
  payed_off = models.IntegerField(default=0, verbose_name='Всего выведено')
  active_deposits = models.IntegerField(default=0, verbose_name='Сумма активных депозитов')
  partner_sum = models.IntegerField(default=0, verbose_name='Партнерка')