# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-06 13:09
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('about', '0002_aboutmodel_title'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aboutmodel',
            name='title',
        ),
        migrations.AddField(
            model_name='aboutmodel',
            name='slug',
            field=models.SlugField(default=datetime.datetime(2018, 3, 6, 13, 9, 37, 406222, tzinfo=utc), unique=True),
            preserve_default=False,
        ),
    ]