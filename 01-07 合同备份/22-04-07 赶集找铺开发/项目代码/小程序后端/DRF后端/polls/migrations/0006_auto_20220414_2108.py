# Generated by Django 3.2.12 on 2022-04-14 13:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0005_shopimage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='shopimage',
            options={'verbose_name': '商铺图片', 'verbose_name_plural': '商铺图片'},
        ),
        migrations.AlterModelTable(
            name='shopimage',
            table='polls_shop_image',
        ),
        migrations.AlterModelTable(
            name='shoplist',
            table='polls_shop_list',
        ),
    ]
