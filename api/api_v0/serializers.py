from django.contrib.auth.models import User
from rest_framework import serializers

from news.models import NewsModel

# Additional serializers
class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = User
    fields = (
      'username',
      'first_name',
      'last_name',
      'email',
    )

class NewsSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)

  class Meta:
    model = NewsModel
    fields = (
      'id',
      'title',
      'slug',
      'cover_picture',
      'is_published',
      'announce',
      'content',
      'author',
      'meta_title',
      'meta_description',
      'date_added'
    )
    lookup_field = 'slug'