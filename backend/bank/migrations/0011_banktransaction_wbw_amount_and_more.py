# Generated by Django 4.0.6 on 2023-07-10 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0010_alter_paymentrequest_bank_account'),
    ]

    operations = [
        migrations.AddField(
            model_name='banktransaction',
            name='wbw_amount',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='paymentrequest',
            name='amount_paid',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
    ]
