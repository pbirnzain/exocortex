# Generated by Django 2.0.6 on 2019-03-06 09:38

from django.db import migrations, models


def initializeWeights(apps, schema_editor):
    TextChunk = apps.get_model('store', 'TextChunk')

    for chunk in TextChunk.objects.all():
        chunk.weight = chunk.id
        chunk.save()


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0017_textchunk_weight'),
    ]

    operations = [
        migrations.RunPython(initializeWeights),
        migrations.AlterField(
            model_name='textchunk',
            name='weight',
            field=models.FloatField(),
        ),
    ]
