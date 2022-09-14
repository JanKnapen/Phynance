from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import BankAccountViewSet, BankTransactionCategoryViewSet, \
    BankTransactionViewSet

router = DefaultRouter()
router.register('accounts', BankAccountViewSet)
router.register('transaction_categories', BankTransactionCategoryViewSet)
router.register('transactions', BankTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
