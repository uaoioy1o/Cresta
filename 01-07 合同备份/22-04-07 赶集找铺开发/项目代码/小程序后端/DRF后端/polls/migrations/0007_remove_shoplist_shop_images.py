# Generated by Django 3.2.12 on 2022-04-14 13:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0006_auto_20220414_2108'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoplist',
            name='shop_images',
        ),
    ]
