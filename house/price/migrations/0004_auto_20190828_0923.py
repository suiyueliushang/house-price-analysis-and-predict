# Generated by Django 2.2.4 on 2019-08-28 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('price', '0003_auto_20190827_1450'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterModelTable(
            name='user',
            table='user_info',
        ),
    ]
