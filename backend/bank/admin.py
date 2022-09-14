from django.contrib import admin

from .models import BankAccount, BankTransactionCategory, BankTransaction

admin.site.register(BankAccount)
admin.site.register(BankTransactionCategory)
admin.site.register(BankTransaction)
