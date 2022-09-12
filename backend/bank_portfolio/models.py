from django.db import models


class BankAccount(models.Model):
    name = models.CharField(max_length=32, blank=False, null=False)
    description = models.TextField(max_length=128, blank=False, null=False)
    IBAN = models.CharField(max_length=32, blank=False, null=False)
