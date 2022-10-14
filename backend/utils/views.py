from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet

from .models import MUIIcon, Currency
from .serializers import MUIIconSerializer, CurrencySerializer


class MUIIconViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    queryset = MUIIcon.objects.all()
    serializer_class = MUIIconSerializer


class CurrencyViewSet(ListModelMixin, GenericViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
