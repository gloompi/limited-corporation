from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^news', NewsListView.as_view(), name="news_list"),
  url(r'^news/(?P<slug>[^\.]+)/$', NewsDetailView.as_view(), name="news_detail"),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]