# Generated by Django 3.2.12 on 2022-04-14 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oto', '0005_author2_publishbook'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageUpload',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
    ]
