from django.forms import model_to_dict
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import BankAccount, \
    BankCategory, BankTransaction

from .serializers import BankAccountSerializer, \
    BankCategorySerializer, BankTransactionSerializer
from .utils import select_info
from utils.models import MUIIcon


class BankAccountViewSet(ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['GET'])
    def info(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)
        info_data = [select_info(bank_account, self.request.user) for bank_account in serializer.data]
        return Response(info_data)


class BankCategoryViewSet(ModelViewSet):
    queryset = BankCategory.objects.all()
    serializer_class = BankCategorySerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankCategory.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BankTransactionViewSet(ModelViewSet):
    queryset = BankTransaction.objects.all()
    serializer_class = BankTransactionSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankTransaction.objects.filter(bank_account__owner=user)
