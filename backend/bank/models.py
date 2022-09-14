from django.contrib.auth import get_user_model
from django.db.models import Model, ForeignKey, CASCADE, TextField, PROTECT, DateField, CharField, IntegerField
from rest_framework.exceptions import ValidationError

from utils.models import MUIIcon

User = get_user_model()


class BankAccount(Model):
    owner = ForeignKey(User, on_delete=CASCADE, default=User.objects.first().pk)
    name = CharField(max_length=32, blank=False, null=False)
    description = TextField(max_length=128, blank=False, null=False)
    IBAN = CharField(max_length=32, blank=False, null=False)

    def __str__(self):
        return self.owner.username + ': ' + self.name


class BankTransactionCategory(Model):
    owner = ForeignKey(User, on_delete=CASCADE)
    name = CharField(max_length=32, blank=False, null=False)
    description = TextField(max_length=128, blank=False, null=False)
    icon = ForeignKey(MUIIcon, on_delete=PROTECT)

    def __str__(self):
        return self.name


class BankTransaction(Model):
    bank_account = ForeignKey(BankAccount, on_delete=CASCADE)
    date = DateField(blank=False, null=False)
    amount = IntegerField(blank=False, null=False)
    serial_number = IntegerField(blank=False, null=False)
    counter_party = TextField()
    balance_after = IntegerField(blank=False, null=False)
    description = TextField()
    category = ForeignKey(BankTransactionCategory, on_delete=PROTECT)

    def clean(self):
        if self.bank_account.owner != self.category.owner:
            raise ValidationError('Category owner is not equal to the bank account owner')

    def __str__(self):
        return self.bank_account.owner.username + ', ' + self.bank_account.name + ': ' + str(self.date)
