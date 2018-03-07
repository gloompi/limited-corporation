from django.contrib.auth.models import User
from rest_framework import serializers

from news.models import NewsModel
from about.models import AboutModel
from for_investors.models import ForInvestorsModel
from for_partners.models import ForPartnersModel
from how_to_start.models import HowToStartModel
from faq.models import FaqModel
from take_access.models import CustomUser
from deposits.models import DepositsModel, ProfitModel

# Additional serializers
class FaqSerializer(serializers.ModelSerializer):

  class Meta:
    model = FaqModel
    fields = ('question', 'answer')

class ForPartnersSerializer(serializers.ModelSerializer):

  class Meta:
    model = HowToStartModel
    fields = ('title', 'cover_pic', 'content')

class ForInvestorsSerializer(serializers.ModelSerializer):

  class Meta:
    model = HowToStartModel
    fields = ('title', 'cover_pic', 'content')

class HowToStartSerializer(serializers.ModelSerializer):

  class Meta:
    model = HowToStartModel
    fields = ('title', 'cover_pic', 'content')

class AboutSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = AboutModel
    fields = ('slug', 'content')

class DepositsSerializer(serializers.ModelSerializer):

  class Meta:
    model = DepositsModel
    fields = (
      'id',
      'title',
      'amount',
      'profit',
      'date_added',
      'user'
    )

class ProfitSerializer(serializers.ModelSerializer):

  class Meta:
    model = ProfitModel
    fields = (
      'slug',
      'title',
      'percent',
      'duration',
      'amount_floor',
      'amount_ceil',
      'pay_off'
    )

class UserSerializer(serializers.ModelSerializer):

  class Meta:
    model = CustomUser
    fields = (
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