# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-28 07:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pay_off_requests', '0002_auto_20180328_0724'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payoffmodel',
            name='status',
            field=models.BooleanField(choices=[(True, 'Оплачен'), (False, 'Не оплачен')], default=False, max_length=10, verbose_name='Статус'),
        ),
    ]
