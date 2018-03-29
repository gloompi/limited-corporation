from django.contrib.auth.models import User
from rest_framework import serializers

from news.models import NewsModel
from about.models import AboutModel, DocumentsModel
from for_investors.models import ForInvestorsModel
from for_partners.models import ForPartnersModel
from how_to_start.models import HowToStartModel
from faq.models import FaqModel
from take_access.models import CustomUser
from deposits.models import DepositsModel, ProfitModel, GetAllDepositsInfoModel
from pay_off_requests.models import PayOffModel

# Additional serializers
class GetAllDepositsInfoSerializer(serializers.ModelSerializer):

  class Meta:
    model = GetAllDepositsInfoModel
    fields = ('id', 'deposits', 'payed_off', 'active_deposits', 'partner_sum')

class PayOffSerializer(serializers.ModelSerializer):

  class Meta:
    model = PayOffModel
    fields = ('id', 'amount', 'wallet', 'date_added', 'agregator', 'comment', 'status')

class FaqSerializer(serializers.ModelSerializer):

  class Meta:
    model = FaqModel
    fields = ('id', 'question', 'answer')

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

class DocumentsSerializer(serializers.ModelSerializer):

  class Meta:
    model = DocumentsModel
    fields = ('id', 'img')

class AboutSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = AboutModel
    fields = ('slug', 'content')

class DepositsSerializer(serializers.ModelSerializer):

  class Meta:
    model = DepositsModel
    fields = (
      'id',
      'amount',
      'profit',
      'date_added',
      'is_active',
      'user'
    )

class ProfitSerializer(serializers.ModelSerializer):

  class Meta:
    model = ProfitModel
    fields = (
      'id',
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
      'id',
      'username',
      'first_name',
      'last_name',
      'email',
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
      'partner',
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