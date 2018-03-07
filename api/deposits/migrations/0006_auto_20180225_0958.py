# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-25 09:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('deposits', '0005_auto_20180225_0953'),
    ]

    operations = [
        migrations.AddField(
            model_name='depositsmodel',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='related_user', to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.AlterField(
            model_name='depositsmodel',
            name='profit',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='profits', to='deposits.ProfitModel', verbose_name='Выгода'),
        ),
    ]