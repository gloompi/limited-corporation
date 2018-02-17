from django.shortcuts import render
from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework.pagination import PageNumberPagination

import json
import requests
from django.conf import settings

from news.models import NewsModel

from .serializers import (NewsSerializer)

# Create your views here.
class NewsListView(ListAPIView):
  queryset = NewsModel.objects.filter(is_published=True)
  serializer_class = NewsSerializer
  pagination_class = PageNumberPagination

class NewsDetailView(RetrieveUpdateDestroyAPIView):
  queryset = NewsModel.objects.filter(is_published=True)
  serializer_class = NewsSerializer
  lookup_field = 'slug'