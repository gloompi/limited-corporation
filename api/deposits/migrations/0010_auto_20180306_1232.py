# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-06 12:32
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('deposits', '0009_auto_20180226_1320'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profitmodel',
            options={'verbose_name': 'Валюта', 'verbose_name_plural': 'Валюты'},
        ),
        migrations.AlterField(
            model_name='depositsmodel',
            name='profit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='profits', to='deposits.ProfitModel', verbose_name='Валюта'),
        ),
        migrations.AlterField(
            model_name='profitmodel',
            name='amount_ceil',
            field=models.FloatField(max_length=150, verbose_name='Сумма депозита до'),
        ),
        migrations.AlterField(
            model_name='profitmodel',
            name='amount_floor',
            field=models.FloatField(max_length=150, verbose_name='Сумма депозита от'),
        ),
    ]
