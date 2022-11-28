from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import MUIIconViewSet, CurrencyViewSet

router = DefaultRouter()
router.register("mui_icons", MUIIconViewSet)
router.register("currencies", CurrencyViewSet)

urlpatterns = [path("", include(router.urls))]
