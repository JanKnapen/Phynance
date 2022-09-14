from rest_framework.serializers import ModelSerializer

from .models import BankAccount, BankTransactionCategory, BankTransaction


class BankAccountSerializer(ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['id', 'owner', 'name', 'description', 'IBAN']


class BankTransactionCategorySerializer(ModelSerializer):
    class Meta:
        model = BankTransactionCategory
        fields = ['id', 'owner', 'name', 'description', 'icon']


class BankTransactionSerializer(ModelSerializer):
    class Meta:
        model = BankTransaction
        fields = ['id', 'bank_account', 'date', 'amount', 'serial_number', 'counter_party', 'balance_after',
                  'description', 'category']
