# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-26 04:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deposits', '0006_auto_20180225_0958'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profitmodel',
            name='description',
        ),
        migrations.AddField(
            model_name='profitmodel',
            name='amount',
            field=models.CharField(default='', max_length=150, verbose_name='Сумма депозита'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='profitmodel',
            name='duration',
            field=models.IntegerField(default=0, verbose_name='Период начислений'),
        ),
        migrations.AddField(
            model_name='profitmodel',
            name='pay_off',
            field=models.CharField(default='В конце срока', max_length=150, verbose_name='Возврат депозита'),
        ),
    ]
