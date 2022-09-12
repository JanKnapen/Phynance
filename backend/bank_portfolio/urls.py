from django.urls import path
from django.conf.urls import include
from rest_framework import routers

from .views import BankAccountViewSet

router = routers.DefaultRouter()
router.register('bank_accounts', BankAccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
