# Generated by Django 2.2.4 on 2019-08-27 06:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('price', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='House',
            new_name='User',
        ),
        migrations.RenameField(
            model_name='user',
            old_name='user_email',
            new_name='user_mail',
        ),
        migrations.AlterModelTable(
            name='user',
            table='user_info',
        ),
    ]
