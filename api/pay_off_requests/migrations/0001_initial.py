# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-03-28 07:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PayOffModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(default=0, verbose_name='Сумма')),
                ('date_added', models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')),
                ('agregator', models.CharField(choices=[('QW', 'Qiwi Кошелек'), ('BC', 'Банковская карта'), ('YM', 'Яндекс Деньги'), ('PP', 'Paypal Кошелек'), ('CW', 'Крипто Кошелек')], default='QW', max_length=2, verbose_name='Платежная система')),
                ('comment', models.CharField(default='', max_length=50, verbose_name='Коментарий')),
                ('status', models.CharField(default=False, max_length=10, verbose_name='Статус')),
            ],
            options={
                'ordering': ['-date_added'],
                'verbose_name_plural': 'Заявки на выплату',
                'verbose_name': 'Заявка на выплату',
            },
        ),
    ]