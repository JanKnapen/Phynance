from django.contrib.auth import get_user_model
from django.db.models import (
    Model,
    ForeignKey,
    CASCADE,
    TextField,
    PROTECT,
    DateField,
    CharField,
    IntegerField,
    FloatField,
)
from rest_framework.exceptions import ValidationError

from utils.models import Currency, MUIIcon

User = get_user_model()


class BankAccount(Model):
    owner = ForeignKey(User, on_delete=CASCADE)
    name = CharField(max_length=32, blank=False, null=False, unique=True)
    description = TextField(max_length=128, blank=False, null=False)
    IBAN = CharField(max_length=32, blank=False, null=False)
    currency = ForeignKey(Currency, on_delete=PROTECT, default=Currency.objects.first().id)

    def __str__(self):
        return self.owner.username + ": " + self.name


class BankCategory(Model):
    owner = ForeignKey(User, on_delete=CASCADE)
    name = CharField(max_length=32, blank=False, null=False)
    description = TextField(max_length=128, blank=False, null=False)
    icon = ForeignKey(MUIIcon, on_delete=PROTECT, default=MUIIcon.objects.first().id)

    def __str__(self):
        return self.name


class BankTransaction(Model):
    bank_account = ForeignKey(BankAccount, on_delete=CASCADE)
    date = DateField(blank=False, null=False)
    amount = FloatField(blank=False, null=False)
    serial_number = IntegerField(blank=False, null=False, primary_key=True)
    counter_party_IBAN = TextField(blank=True, null=True)
    counter_party_name = TextField(blank=True, null=True)
    balance_after = FloatField(blank=False, null=False)
    description = TextField()
    category = ForeignKey(BankCategory, on_delete=PROTECT)
    wbw_amount = FloatField(blank=False, null=False, default=0)

    def clean(self):
        if self.bank_account.owner != self.category.owner:
            raise ValidationError(
                "Category owner is not equal to the bank account owner"
            )

    def __str__(self):
        return (
            self.bank_account.owner.username
            + ", "
            + self.bank_account.name
            + ": "
            + str(self.date)
        )


class PaymentRequest(Model):
    bank_account = ForeignKey(BankAccount, on_delete=CASCADE)
    amount = FloatField(blank=False, null=False)
    amount_paid = FloatField(blank=False, null=False, default=0)
    original_bank_transaction = ForeignKey(BankTransaction, on_delete=CASCADE)

    def __str__(self):
        return (
            self.bank_account.owner.username
            + ", "
            + self.bank_account.name
            + ": "
            + str(self.original_bank_transaction.date)
        )
