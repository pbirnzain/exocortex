# Generated by Django 2.0 on 2018-08-19 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='datachunk',
            name='related',
            field=models.ManyToManyField(null=True, related_name='_datachunk_related_+', to='store.DataChunk'),
        ),
        migrations.AlterField(
            model_name='datachunk',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]
