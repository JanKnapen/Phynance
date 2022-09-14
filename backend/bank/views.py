from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import BankAccount, BankTransactionCategoryIcon, \
    BankTransactionCategory, BankTransaction

from .serializers import BankAccountSerializer, BankTransactionCategoryIconSerializer, \
    BankTransactionCategorySerializer, BankTransactionSerializer


class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(owner=user)


class BankTransactionCategoryIconViewSet(mixins.RetrieveModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = BankTransactionCategoryIcon.objects.all()
    serializer_class = BankTransactionCategoryIconSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]


class BankTransactionCategoryViewSet(viewsets.ModelViewSet):
    queryset = BankTransactionCategory.objects.all()
    serializer_class = BankTransactionCategorySerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankTransactionCategory.objects.filter(owner=user)


class BankTransactionViewSet(viewsets.ModelViewSet):
    queryset = BankTransaction.objects.all()
    serializer_class = BankTransactionSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankTransaction.objects.filter(bank_account__owner=user)
