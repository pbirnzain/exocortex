# Generated by Django 2.2.2 on 2019-06-12 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0018_auto_20190306_0938'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='private',
            field=models.BooleanField(default=False),
        ),
    ]
