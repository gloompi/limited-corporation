# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-04-05 11:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('take_access', '0011_auto_20180329_0519'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='account_resource',
            field=models.FloatField(default=0, verbose_name='Баланс'),
        ),
    ]
