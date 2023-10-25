# Generated by Django 4.2.6 on 2023-10-24 20:46

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('questions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='marks',
            field=models.ManyToManyField(blank=True, related_name='marks', to=settings.AUTH_USER_MODEL),
        ),
    ]
