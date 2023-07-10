from django.contrib import admin

from .models import BankAccount, BankCategory, BankTransaction, PaymentRequest

admin.site.register(BankAccount)
admin.site.register(BankCategory)
admin.site.register(BankTransaction)
admin.site.register(PaymentRequest)
