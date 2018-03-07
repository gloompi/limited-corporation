from django.db import models
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget

# Create your models here.
class AboutModel(models.Model):
  slug = models.SlugField(unique=True)
  content = RichTextField(verbose_name='Контент')

  class Meta:
    verbose_name = 'О компании'
    verbose_name_plural = 'О компании'

  def __str__(self):
    return str(self.slug)