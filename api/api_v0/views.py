from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from news.models import NewsModel
from about.models import AboutModel, DocumentsModel
from how_to_start.models import HowToStartModel
from for_investors.models import ForInvestorsModel
from for_partners.models import ForPartnersModel
from faq.models import FaqModel
from take_access.models import CustomUser
from deposits.models import DepositsModel, ProfitModel
from .serializers import (
  DocumentsSerializer,
  FaqSerializer,
  ForPartnersSerializer,
  ForInvestorsSerializer,
  HowToStartSerializer,
  AboutSerializer,
  NewsSerializer, 
  UserSerializer, 
  CreateUserSerializer, 
  DepositsSerializer, 
  ProfitSerializer
)

# Create your views here.
class FaqView(generics.ListAPIView):
  queryset = FaqModel.objects.all()
  serializer_class = FaqSerializer

class ForPartnersView(generics.ListAPIView):
  queryset = ForPartnersModel.objects.all()
  serializer_class = ForPartnersSerializer

class ForInvestorsView(generics.ListAPIView):
  queryset = ForInvestorsModel.objects.all()
  serializer_class = ForInvestorsSerializer

class HowToStartView(generics.ListAPIView):
  queryset = HowToStartModel.objects.all()
  serializer_class = HowToStartSerializer

class DocumentsView(viewsets.ModelViewSet):
  serializer_class = DocumentsSerializer
  queryset = DocumentsModel.objects.all()

class AboutView(generics.RetrieveAPIView):
  serializer_class = AboutSerializer
  lookup_field = 'slug'

  def get_queryset(self):
    about = AboutModel.objects.all()
    return about

class DepositsViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, )
  serializer_class = DepositsSerializer
  lookup_field = 'id'

  def get_queryset(self):
    print(self.request.user)
    deposit_list = DepositsModel.objects.filter(user=self.request.user)
    return deposit_list

class ProfitViewSet(viewsets.ModelViewSet):
  queryset = ProfitModel.objects.all()
  serializer_class = ProfitSerializer

class NewsItemViewSet(viewsets.ModelViewSet):
  queryset = NewsModel.objects.filter(is_published=True)
  serializer_class = NewsSerializer
  lookup_field = 'slug'

class CreateUserView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = CreateUserSerializer
  lookup_field = 'username'

class UserView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = (IsAuthenticated, )
  queryset = CustomUser.objects.all()
  serializer_class = UserSerializer
  lookup_field = 'username'