from django.db import models
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget

def upload_path(instance, filename):
    """
    Path to files
    :param instance:
    :param filename:
    :return:
    """
    return "how_to/{0}".format(filename)

# Create your models here.
class ForInvestorsModel(models.Model):
  title = models.CharField(max_length=50, verbose_name="Название")
  cover_pic = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Картинка')
  content = RichTextField(verbose_name='Контент')

  class Meta:
    verbose_name = 'Для Инвесторов'
    verbose_name_plural = 'Для Инвесторов'

  def __str__(self):
    return self.title