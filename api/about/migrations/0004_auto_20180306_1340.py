# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-06 13:40
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0003_auto_20180306_1309'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='aboutmodel',
            options={'verbose_name': 'О компании'},
        ),
    ]