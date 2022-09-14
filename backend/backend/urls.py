from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bank/', include('bank.urls')),
    path('auth/', include('authentication.urls')),
    path('utils/', include('utils.urls')),
]
