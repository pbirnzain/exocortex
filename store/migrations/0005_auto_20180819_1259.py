# Generated by Django 2.0 on 2018-08-19 12:59

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0004_auto_20180819_1256'),
    ]

    operations = [
        migrations.AddField(
            model_name='datachunk',
            name='added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='datachunk',
            name='modified',
            field=models.DateTimeField(auto_now=True),
        ),
    ]