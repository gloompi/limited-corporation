from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated

from news.models import NewsModel
from take_access.models import CustomUser
from deposits.models import DepositsModel, ProfitModel
from .serializers import (
  NewsSerializer, 
  UserSerializer, 
  CreateUserSerializer, 
  DepositsSerializer, 
  ProfitSerializer
)

# Create your views here.
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
  lookup_field = 'slug'

class UserView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = (IsAuthenticated, )
  queryset = CustomUser.objects.all()
  serializer_class = UserSerializer
  lookup_field = 'slug'