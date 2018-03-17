# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-25 09:46
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('take_access', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='deposits',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='deposits_list', to='deposits.DepositsModel', verbose_name='Депозиты'),
        ),
    ]
