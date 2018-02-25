from django.contrib.auth.models import User
from rest_framework import serializers

from news.models import NewsModel
from take_access.models import CustomUser
from deposits.models import DepositsModel, ProfitModel

# Additional serializers
class DepositsSerializer(serializers.ModelSerializer):

  class Meta:
    model = DepositsModel
    fields = (
      'slug',
      'title',
      'amount',
      'profit',
      'user'
    )

class ProfitSerializer(serializers.ModelSerializer):

  class Meta:
    model = ProfitModel
    fields = (
      'slug',
      'title',
      'percent',
      'description'
    )

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = CustomUser
    fields = (
      'id',
      'slug',
      'username',
      'first_name',
      'last_name',
      'email',
      'account_resource'
    )

class CreateUserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = CustomUser
    fields = (
      'slug',
      'username',
      'password',
      'first_name',
      'last_name',
      'email',
    )
    
  def create(self, validated_data):
    user = CustomUser(email=validated_data['email'], username=validated_data['username'])
    user.set_password(validated_data['password'])
    user.save()
    return user

class NewsSerializer(serializers.ModelSerializer):
  author = UserSerializer(read_only=True)

  class Meta:
    model = NewsModel
    fields = (
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