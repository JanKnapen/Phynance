# Generated by Django 4.0.6 on 2022-09-12 12:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank_portfolio', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bankaccount',
            name='IBAN',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='bankaccount',
            name='name',
            field=models.CharField(max_length=32),
        ),
    ]
