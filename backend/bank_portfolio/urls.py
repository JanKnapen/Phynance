from django.urls import path
from django.conf.urls import include
from rest_framework import routers

from .views import BankAccountViewSet, BankTransactionCategoryIconViewSet, BankTransactionCategoryViewSet, \
    BankTransactionViewSet

router = routers.DefaultRouter()
router.register('bank_accounts', BankAccountViewSet)
router.register('bank_transaction_category_icons', BankTransactionCategoryIconViewSet)
router.register('bank_transaction_categories', BankTransactionCategoryViewSet)
router.register('bank_transactions', BankTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
