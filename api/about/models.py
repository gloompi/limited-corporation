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
    return "about/{0}".format(filename)

# Create your models here.
class AboutModel(models.Model):
  slug = models.SlugField(unique=True)
  content = RichTextField(verbose_name='Контент')

  class Meta:
    verbose_name = 'О компании'
    verbose_name_plural = 'О компании'

  def __str__(self):
    return str(self.slug)

class DocumentsModel(models.Model):
  img = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Документы')

  class Meta:
    verbose_name = 'Документ'
    verbose_name_plural = 'Документы'