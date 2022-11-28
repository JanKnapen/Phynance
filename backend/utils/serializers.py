from rest_framework.serializers import ModelSerializer

from .models import MUIIcon, Currency


class MUIIconSerializer(ModelSerializer):
    class Meta:
        model = MUIIcon
        fields = ["id", "mui_name"]


class CurrencySerializer(ModelSerializer):
    class Meta:
        model = Currency
        fields = ["id", "name", "symbol"]
