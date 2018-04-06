from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from .views import (
  CreateBalanceChargeView,
  BalanceChargeView,
  GetReferalsInfoView,
  GetReferalsList,
  GetAllDepositsInfoView,
  PayOffView,
  CreatePayOffView,
  CreateDepositView,
  DocumentsView,
  FaqView,
  ForPartnersView,
  ForInvestorsView,
  HowToStartView,
  AboutView,
  NewsItemViewSet, 
  UserView, 
  CreateUserView, 
  DepositsViewSet, 
  ProfitViewSet
)

router = DefaultRouter()
router.register(r'news', NewsItemViewSet)
router.register(r'profits', ProfitViewSet)
router.register(r'documents', DocumentsView)
router.register(r'deposits', DepositsViewSet, base_name='deposits')
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
  url(r'^', include(router.urls)),
  url(r'^charge-list/', BalanceChargeView.as_view(), name='charge-list'),
  url(r'^balance-charge/', CreateBalanceChargeView.as_view(), name='balance-charge'),
  url(r'^get-referals-info/', GetReferalsInfoView.as_view(), name='get_referals_info'),
  url(r'^get-referals/', GetReferalsList.as_view(), name='get_referals'),
  url(r'^get-all-deposits-info/', GetAllDepositsInfoView.as_view(), name='get_all_deposots_amount'),
  url(r'^pay-off-list/', PayOffView.as_view(), name='pay_off_list'),
  url(r'^create-pay-off-request/', CreatePayOffView.as_view(), name="create_pay_off"),
  url(r'^create-deposit/', CreateDepositView.as_view(), name='create_deposit'),
  url(r'^faq/', FaqView.as_view(), name='faq'),
  url(r'^for_partners/', ForPartnersView.as_view(), name='for_partners'),
  url(r'^for_investors/', ForInvestorsView.as_view(), name='for_investors'),
  url(r'^how_to/', HowToStartView.as_view(), name='how_to'),
  url(r'^about/(?P<slug>[^\.]+)/$', AboutView.as_view(), name='about_view'),
  url(r'^user/(?P<username>[^\.]+)/$', UserView.as_view(), name='user_detail'),
  url(r'^register/', CreateUserView.as_view(), name='create_user'),
  url(r'^auth/', views.obtain_auth_token, name='get_auth_token'),
]