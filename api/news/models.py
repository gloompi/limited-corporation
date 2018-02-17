from django.db import models
from django.conf import settings
from django.contrib.auth.models import User

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
      (PUBLISHED, 'Published'),
      (DRAFT, 'Draft'),
  )

  title = models.CharField(max_length=50, verbose_name='Title')
  slug = models.SlugField()
  cover_picture = models.ImageField(blank=True, upload_to=upload_path, verbose_name='Cover picture')
  announce = models.TextField(verbose_name='Announce')
  content = models.TextField(verbose_name='Content')
  author = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, verbose_name='Author')
  meta_title = models.CharField(max_length=250, null=True, verbose_name='SEO/Meta title')
  meta_description = models.TextField(null=True, verbose_name='SEO/Meta description')
  date_added = models.DateTimeField(auto_now_add=True, verbose_name='Date added')
  is_published = models.BooleanField(choices=TYPES, default=DRAFT, verbose_name='Is published?')

  class Meta:
    ordering = ['-date_added']
    verbose_name = 'News'
    verbose_name_plural = 'News'

  def __str__(self):
    return str(self.title)

  def is_news_published(self):
    return self.is_published

  is_news_published.admin_order_field = 'is_published'
  is_news_published.boolean = True
  is_news_published.short_description = 'Is published?'