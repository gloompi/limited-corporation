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
  first_name = models.CharField(max_length=50, verbose_name="Имя")
  last_name = models.CharField(max_length=50, verbose_name="Фамилия")
  email = models.EmailField(blank=False, unique=True)
  partner = models.ForeignKey(
    'CustomUser',
    on_delete=models.PROTECT,
    blank=True,
    null=True,
    related_name='referal_user',
    verbose_name='Рефералы'
  )

  class Meta:
    verbose_name = 'Пользователь'
    verbose_name_plural = 'Пользователи'