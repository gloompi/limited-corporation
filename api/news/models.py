from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget

def upload_path(instance, filename):
    """
    Path to files
    :param instance:
    :param filename:
    :return:
    """
    return "news/{0}".format(filename)

# Create your models here.
class NewsModel(models.Model):
  PUBLISHED = True
  DRAFT = False

  TYPES = (
      (PUBLISHED, 'Опубликовано'),
      (DRAFT, 'Черновик'),
  )

  slug = models.SlugField()
  title = models.CharField(max_length=50, verbose_name='Название')
  cover_picture = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Главная картинка')
  announce = RichTextField(verbose_name='Предпросмотр')
  content = RichTextField(verbose_name='Контент')
  author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, verbose_name='Автор')
  meta_title = models.CharField(max_length=250, null=True, verbose_name='СЕО/Мета название')
  meta_description = models.TextField(null=True, verbose_name='СEO/Мета описание')
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')
  is_published = models.BooleanField(choices=TYPES, default=DRAFT, verbose_name='Опубликовано?')

  class Meta:
    ordering = ['-date_added']
    verbose_name = 'Новость'
    verbose_name_plural = 'Новости'

  def __str__(self):
    return str(self.title)

  def is_news_published(self):
    return self.is_published

  is_news_published.admin_order_field = 'Опубликовано'
  is_news_published.boolean = True
  is_news_published.short_description = 'Опубликовано?'