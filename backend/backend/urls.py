from django.contrib import admin
from django.urls import path
from django.conf.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('bank_portfolio/', include('bank_portfolio.urls')),
    path('auth/', include('authentication.urls')),
]
