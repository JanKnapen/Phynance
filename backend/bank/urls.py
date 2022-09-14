from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import BankAccountViewSet, BankCategoryViewSet, \
    BankTransactionViewSet

router = DefaultRouter()
router.register('accounts', BankAccountViewSet)
router.register('categories', BankCategoryViewSet)
router.register('transactions', BankTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
