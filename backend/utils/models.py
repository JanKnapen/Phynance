from django.db import models


class MUIIcon(models.Model):
    mui_name = models.CharField(max_length=32, blank=False, null=False)

    def __str__(self):
        return self.mui_name


class Currency(models.Model):
    name = models.CharField(max_length=3, blank=False, null=False)
    symbol = models.CharField(max_length=3, blank=False, null=False)

    def __str__(self):
        return self.name
