from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget
from take_access.models import CustomUser

# Create your models here.
class DepositsModel(models.Model):
  BITCOIN = 'BTC'
  LITECOIN = 'LTC'
  ETHERIUM = 'ETH'
  DASH = 'DSH'
  RIPPLE = 'XRP'
  COIN_CHOICES = (
    (BITCOIN, 'BitCoin'),
    (LITECOIN, 'LiteCoin'),
    (ETHERIUM, 'Etherium'),
    (DASH, 'Dash'),
    (RIPPLE, 'Ripple')
  )

  slug = models.SlugField(default='', blank=True)
  title = models.CharField(max_length=3, choices=COIN_CHOICES, verbose_name="Валюта")
  amount = models.FloatField(max_length=500000, default=0, verbose_name="Капитал")
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
    verbose_name='Выгода'
  )

  class Meta:
    ordering = ['slug']
    verbose_name = 'Депозит'
    verbose_name_plural = 'Депозиты'

  def __str__(self):
    return str(self.title)

class ProfitModel(models.Model):
  slug = models.SlugField()
  title = models.CharField(max_length=150, verbose_name="Название")
  percent = models.FloatField(max_length=1000, null=True, default=0, verbose_name='Процент')
  description = RichTextField(verbose_name='Описание')

  class Meta:
    verbose_name = 'Выгода'
    verbose_name_plural = 'Выгоды'

  def __str__(self):
    return str(self.title)