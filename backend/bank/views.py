from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import BankAccount, \
    BankCategory, BankTransaction

from .serializers import BankAccountSerializer, \
    BankCategorySerializer, BankTransactionSerializer
from .utils import select_info, get_balance, transaction_exists, suggest_category, get_expenses_and_income, \
    get_transactions_by_period, get_expenses_and_income_period


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

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        bank_account = serializer.data
        bank_account['balance'] = get_balance(bank_account)
        bank_account['expenses'], bank_account['income'] = get_expenses_and_income(bank_account)
        return Response(bank_account)

    @action(detail=False, methods=['GET'])
    def info(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        serializer = self.get_serializer(queryset, many=True)
        info_data = [select_info(bank_account) for bank_account in serializer.data]
        return Response(info_data)


class TransactionsPeriodViewSet(ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(owner=user)

    def list(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        bank_account = serializer.data
        period = request.data['period']
        date_range = request.data['dateRange']
        transactions = get_transactions_by_period(bank_account, period, date_range)
        return Response(transactions.values())


class OverviewPeriodViewSet(ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer
    authentication_classes = [TokenAuthentication, ]
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return BankAccount.objects.filter(owner=user)

    def list(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        bank_account = serializer.data
        date_range = request.data['dateRange']
        bank_account['expenses'], bank_account['income'] = get_expenses_and_income_period(bank_account, date_range)
        return Response(bank_account)


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

    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        serializer_class = self.get_serializer_class()
        kwargs.setdefault('context', self.get_serializer_context())
        return serializer_class(*args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        return BankTransaction.objects.filter(bank_account__owner=user)

    @action(detail=False, methods=['POST'])
    def process(self, request, *args, **kwargs):
        transactions = request.data
        new_transactions = [suggest_category(transaction) for transaction in transactions if not transaction_exists(transaction)]
        return Response(new_transactions)
