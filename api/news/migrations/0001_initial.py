# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-02-20 09:02
from __future__ import unicode_literals

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import news.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Title')),
                ('slug', models.SlugField()),
                ('cover_picture', models.ImageField(blank=True, upload_to=news.models.upload_path, verbose_name='Cover picture')),
                ('announce', ckeditor.fields.RichTextField(verbose_name='Announce')),
                ('content', ckeditor.fields.RichTextField(verbose_name='Content')),
                ('meta_title', models.CharField(max_length=250, null=True, verbose_name='SEO/Meta title')),
                ('meta_description', models.TextField(null=True, verbose_name='SEO/Meta description')),
                ('date_added', models.DateTimeField(auto_now_add=True, verbose_name='Date added')),
                ('is_published', models.BooleanField(choices=[(True, 'Published'), (False, 'Draft')], default=False, verbose_name='Is published?')),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Author')),
            ],
            options={
                'verbose_name': 'News',
                'ordering': ['-date_added'],
                'verbose_name_plural': 'News',
            },
        ),
    ]
