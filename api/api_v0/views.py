from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.pagination import PageNumberPagination

from news.models import NewsModel
from .serializers import (NewsSerializer)

# Create your views here.
class NewsItemViewSet(viewsets.ModelViewSet):
  queryset = NewsModel.objects.filter(is_published=True)
  serializer_class = NewsSerializer
  lookup_field = 'slug'