from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import BankAccount, \
    BankTransactionCategory, BankTransaction

from .serializers import BankAccountSerializer, \
    BankTransactionCategorySerializer, BankTransactionSerializer


class BankAccountViewSet(ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(owner=user)


class BankTransactionCategoryViewSet(ModelViewSet):
    queryset = BankTransactionCategory.objects.all()
    serializer_class = BankTransactionCategorySerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankTransactionCategory.objects.filter(owner=user)


class BankTransactionViewSet(ModelViewSet):
    queryset = BankTransaction.objects.all()
    serializer_class = BankTransactionSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankTransaction.objects.filter(bank_account__owner=user)
