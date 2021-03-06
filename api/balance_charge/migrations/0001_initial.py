# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-04-05 12:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BalanceCharge',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0, max_length=500000, verbose_name='Сумма')),
                ('date_added', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')),
                ('agregator', models.CharField(default='', max_length=50, verbose_name='Платежная система')),
            ],
            options={
                'verbose_name': 'Пополнение',
                'ordering': ['date_added'],
                'verbose_name_plural': 'Пополнения',
            },
        ),
    ]
