from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from .views import UserViewSet
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register('users', UserViewSet)

urlpatterns = [
    path('login/', obtain_auth_token),
    path('', include(router.urls)),
]
