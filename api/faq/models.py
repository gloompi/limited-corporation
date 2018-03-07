from django.db import models

# Create your models here.
class FaqModel(models.Model):
  question = models.CharField(max_length=150, verbose_name='Вопрос')
  answer = models.TextField(verbose_name='Ответ')

  def __str__(self):
    return self.question