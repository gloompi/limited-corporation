from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .views import NewsItemViewSet

router = DefaultRouter()
router.register(r'news', NewsItemViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^', include(router.urls)),
  url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]