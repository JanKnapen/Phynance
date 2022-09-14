from django.contrib import admin

from .models import BankAccount, BankTransactionCategoryIcon, BankTransactionCategory, BankTransaction

admin.site.register(BankAccount)
admin.site.register(BankTransactionCategoryIcon)
admin.site.register(BankTransactionCategory)
admin.site.register(BankTransaction)
