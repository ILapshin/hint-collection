# Generated by Django 4.2.6 on 2023-10-28 18:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('topics', '0002_alter_topic_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='topic',
            name='slug',
            field=models.SlugField(blank=True, unique=True),
        ),
    ]
