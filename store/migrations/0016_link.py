# Generated by Django 2.1.4 on 2019-02-26 18:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0015_topic_importance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='outgoing_links', to='store.Topic')),
                ('to_topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='incomint_links', to='store.Topic')),
            ],
        ),
    ]