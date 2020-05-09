# Generated by Django 2.2.4 on 2019-09-05 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=100)),
                ('user_phone', models.CharField(max_length=20)),
                ('session_id', models.CharField(default=0, max_length=50)),
                ('collection', models.CharField(default='', max_length=200)),
            ],
            options={
                'db_table': 'user_info',
            },
        ),
    ]