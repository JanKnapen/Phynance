from rest_framework.serializers import ModelSerializer

from .models import MUIIcon


class MUIIconSerializer(ModelSerializer):
    class Meta:
        model = MUIIcon
        fields = ['id', 'mui_name']
