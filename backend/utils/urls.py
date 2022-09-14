from django.urls import path
from django.conf.urls import include
from rest_framework.routers import DefaultRouter

from .views import MUIIconViewSet

router = DefaultRouter()
router.register('mui_icons', MUIIconViewSet)

urlpatterns = [
    path('', include(router.urls))
]
