from django.contrib.auth import get_user_model
from django.db import models
from rest_framework.exceptions import ValidationError

User = get_user_model()


class BankAccount(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=User.objects.first().pk)
    name = models.CharField(max_length=32, blank=False, null=False)
    description = models.TextField(max_length=128, blank=False, null=False)
    IBAN = models.CharField(max_length=32, blank=False, null=False)

    def __str__(self):
        return self.owner.username + ': ' + self.name


class BankTransactionCategoryIcon(models.Model):
    mui_name = models.CharField(max_length=32, blank=False, null=False)

    def __str__(self):
        return self.mui_name


class BankTransactionCategory(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32, blank=False, null=False)
    description = models.TextField(max_length=128, blank=False, null=False)
    icon = models.ForeignKey(BankTransactionCategoryIcon, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


class BankTransaction(models.Model):
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE)
    date = models.DateField(blank=False, null=False)
    amount = models.IntegerField(blank=False, null=False)
    serial_number = models.IntegerField(blank=False, null=False)
    counter_party = models.TextField()
    balance_after = models.IntegerField(blank=False, null=False)
    description = models.TextField()
    category = models.ForeignKey(BankTransactionCategory, on_delete=models.PROTECT)

    def clean(self):
        if self.bank_account.owner != self.category.owner:
            raise ValidationError('Category owner is not equal to the bank account owner')

    def __str__(self):
        return self.bank_account.owner.username + ', ' + self.bank_account.name + ': ' + str(self.date)
