# Generated by Django 2.0 on 2018-08-19 12:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0003_auto_20180819_1255'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datachunk',
            name='related',
            field=models.ManyToManyField(blank=True, related_name='_datachunk_related_+', to='store.DataChunk'),
        ),
    ]
