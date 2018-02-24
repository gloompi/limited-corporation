from __future__ import unicode_literals

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
  if created:
    Token.objects.create(user=instance)

# Create your models here.
class CustomUser(AbstractUser):
  slug = models.SlugField()
  account_resource = models.FloatField(max_length=500000, null=True, default=0, verbose_name='Баланс')
  deposits = models.ForeignKey(
    'DepositsModel',
    null=True,
    on_delete=models.CASCADE,
    verbose_name='Депозиты'
  )

class DepositsModel(models.Model):
  slug = models.SlugField()
  title = models.CharField(max_length=150, verbose_name="Валюта")
  sum_num = models.FloatField(max_length=500000, null=True, default=0, verbose_name='Сумма')
  profit = models.ManyToManyField(
    'ProfitModel',
    verbose_name='Профит'
  )

class ProfitModel(models.Model):
  percent = models.FloatField(max_length=1000, null=True, default=0, verbose_name='Процент')