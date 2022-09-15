from rest_framework.mixins import RetrieveModelMixin, ListModelMixin
from rest_framework.viewsets import GenericViewSet

from .models import MUIIcon
from .serializers import MUIIconSerializer


class MUIIconViewSet(RetrieveModelMixin, ListModelMixin, GenericViewSet):
    queryset = MUIIcon.objects.all()
    serializer_class = MUIIconSerializer
