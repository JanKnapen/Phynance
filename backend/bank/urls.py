from django.urls import path, re_path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import BankAccountViewSet, BankCategoryViewSet, \
    BankTransactionViewSet, TransactionsPeriodViewSet, OverviewPeriodViewSet

router = DefaultRouter()
router.register('accounts', BankAccountViewSet)
router.register('categories', BankCategoryViewSet)
router.register('transactions', BankTransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    re_path(r'^accounts/(?P<pk>\d+)/transactions/period/$', TransactionsPeriodViewSet.as_view({'post': 'list'})),
    re_path(r'^accounts/(?P<pk>\d+)/overview/period/$', OverviewPeriodViewSet.as_view({'post': 'list'})),
]
