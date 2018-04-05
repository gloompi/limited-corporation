from django.http import Http404
from django.utils import timezone
from datetime import date, timedelta, datetime
from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
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
from deposits.models import DepositsModel, ProfitModel, GetAllDepositsInfoModel
from pay_off_requests.models import PayOffModel
from balance_charge.models import BalanceCharge
from .serializers import (
  BalanceChargeSerializer,
  GetAllDepositsInfoSerializer,
  PayOffSerializer,
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
class BalanceChargeView(viewsets.ModelViewSet):
  serializer_class = BalanceChargeSerializer

  def get_queryset(self):
    balance_charge_list = BalanceCharge.objects.filter(user=self.request.user)
    return balance_charge_list

  def perform_create(self, serializer, **kwargs):
    balance_charge = serializer.save()

    try:
      user = CustomUser.objects.filter(id = self.request.data['user_id'])[0]
      amount = str(self.request.data['rub-value'])
      agregator = str(self.request.data['agregator'])
      user.account_resource += amount
    except:
      raise Http404

    user.save()
    balance_charge.amount = amount
    balance_charge.agregator = agregator
    balance_charge.user = self.request.user
    balance_charge.save()

class PayOffView(generics.ListAPIView):
  serializer_class = PayOffSerializer

  def get_queryset(self):
    pay_off_list = PayOffModel.objects.filter(user=self.request.user)
    return pay_off_list

class CreatePayOffView(generics.CreateAPIView):
  serializer_class = PayOffSerializer
  

  def perform_create(self, serializer, **kwargs):
    pay_off = serializer.save()

    try:
      user = CustomUser.objects.filter(id = self.request.data['user_id'])[0]
      wallet = str(self.request.data['wallet'])
      amount = self.request.data['amount']
      agregator = str(self.request.data['agregator'])
      comment = str(self.request.data['comment'])
    except:
      raise Http404

    if user.account_resource >= amount:
      user.account_resource -= amount
      user.save()
    else:
      raise Http404

    pay_off.amount = amount
    pay_off.wallet = wallet
    pay_off.agregator = agregator
    pay_off.comment = comment
    pay_off.user = user
    pay_off.save()


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

class GetAllDepositsInfoView(APIView):
  
  def get(self, request, format=None):
    info = {'deposits': 0, 'payed_off': 0, 'active_deposits': 0, 'amount': 0}
    deposits = DepositsModel.objects.filter(user=self.request.user)
    payed_off = PayOffModel.objects.filter(user=self.request.user)
    referals = CustomUser.objects.filter(partner = self.request.user)
    for item in deposits:
      info['deposits'] += item.amount
      if item.is_active:
        info['active_deposits'] += item.amount
    for item in payed_off:
      info['payed_off'] += item.amount
    for referal in referals:
      deposits = DepositsModel.objects.filter(user = referal)
      for item in deposits:
        info['amount'] += (item.amount * 0.05)

    return Response(info)

class CreateDepositView(generics.CreateAPIView):
  permission_classes = (IsAuthenticated, )
  queryset = DepositsModel.objects.all()
  serializer_class = DepositsSerializer

  def perform_create(self, serializer, **kwargs):
    deposit = serializer.save()

    try:
      user = self.request.user
      balance = user.account_resource
      profit = ProfitModel.objects.filter(id = self.request.data['profit'])[0]
      amount = self.request.data['amount']
    except:
      raise Http404

    if balance >= amount:
      user.account_resource = balance - amount
      user.save()
    else: 
      raise Http404

    deposit.user = user
    deposit.profit = profit
    deposit.amount = amount
    deposit.save()

class DepositsViewSet(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated, )
  serializer_class = DepositsSerializer
  lookup_field = 'id'

  def get_queryset(self):
    user = self.request.user
    deposit_list = DepositsModel.objects.filter(user=user)
    for item in deposit_list:
      profit = ProfitModel.objects.filter(title = item.profit)[0]
      duration = profit.duration
      endDate = item.date_added + timedelta(days=duration)
      if endDate < timezone.now():
        item.is_active = false
        user.account_resource += item.amount
        user.save()

    return deposit_list

class ProfitViewSet(viewsets.ModelViewSet):
  queryset = ProfitModel.objects.all()
  serializer_class = ProfitSerializer

class NewsItemViewSet(viewsets.ModelViewSet):
  queryset = NewsModel.objects.filter(is_published=True)
  serializer_class = NewsSerializer
  lookup_field = 'slug'

class GetReferalsList(APIView):

  def get(self, request, format=None):
    data = {}
    referals = CustomUser.objects.filter(partner = self.request.user)
    for referal in referals:
      deposits = DepositsModel.objects.filter(user = referal)
      for item in deposits:
        data[str(item.date_added)] = {'id': item.id, 'email': item.user.email, 'amount': item.amount}

    return Response(data)

class GetReferalsInfoView(APIView):
  
  def get(self, request, format=None):
    data = {'amount': 0, 'referals': 0, 'active_referals': 0}
    referals = CustomUser.objects.filter(partner = self.request.user)
    for referal in referals:
      data['referals'] += 1
      deposits = DepositsModel.objects.filter(user = referal)
      if deposits:
        data['active_referals'] += 1
      for item in deposits:
        data['amount'] += (item.amount * 0.05)

    return Response(data)

class CreateUserView(generics.CreateAPIView):
  queryset = CustomUser.objects.all()
  serializer_class = CreateUserSerializer

  def perform_create(self, serializer, **kwargs):
    user = serializer.save()
    try:
      first_name = str(self.request.data['first_name'])
      last_name = str(self.request.data['last_name'])
    except:
      first_name = ''
      last_name = ''

    partner = CustomUser.objects.get(username = self.request.data['partner_name'])
    print(partner)
    user.first_name = first_name
    user.last_name = last_name
    user.partner = partner
    user.save()

class UserView(generics.RetrieveUpdateDestroyAPIView):
  permission_classes = (IsAuthenticated, )
  queryset = CustomUser.objects.all()
  serializer_class = UserSerializer
  lookup_field = 'username'