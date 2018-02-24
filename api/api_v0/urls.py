from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import NewsItemViewSet, UserView, CreateUserView

router = DefaultRouter()
router.register(r'news', NewsItemViewSet)
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^', include(router.urls)),
  url(r'^user/(?P<slug>[^\.]+)/$', UserView.as_view(), name='user_detail'),
  url(r'^register/', CreateUserView.as_view(), name='create_user'),
  url(r'^auth/', views.obtain_auth_token, name='get_auth_token'),
]