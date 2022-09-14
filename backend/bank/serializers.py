from rest_framework import serializers

from .models import BankAccount, BankTransactionCategoryIcon, BankTransactionCategory, BankTransaction


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ['id', 'owner', 'name', 'description', 'IBAN']


class BankTransactionCategoryIconSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankTransactionCategoryIcon
        fields = ['id', 'mui_name']


class BankTransactionCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BankTransactionCategory
        fields = ['id', 'owner', 'name', 'description', 'icon']


class BankTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankTransaction
        fields = ['id', 'bank_account', 'date', 'amount', 'serial_number', 'counter_party', 'balance_after',
                  'description', 'category']
