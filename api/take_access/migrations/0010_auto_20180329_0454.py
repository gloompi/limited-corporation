# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-29 04:54
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('take_access', '0009_customuser_partners'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='partners',
            new_name='partner',
        ),
    ]
