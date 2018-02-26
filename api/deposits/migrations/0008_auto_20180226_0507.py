# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-26 05:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('deposits', '0007_auto_20180226_0452'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='depositsmodel',
            options={'ordering': ['date_added'], 'verbose_name': 'Депозит', 'verbose_name_plural': 'Депозиты'},
        ),
        migrations.RemoveField(
            model_name='depositsmodel',
            name='slug',
        ),
        migrations.AddField(
            model_name='depositsmodel',
            name='date_added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Дата добавления'),
            preserve_default=False,
        ),
    ]
