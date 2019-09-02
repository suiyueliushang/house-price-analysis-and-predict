# Generated by Django 2.2.4 on 2019-08-31 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='City',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=10)),
                ('average_price', models.IntegerField()),
                ('year', models.CharField(max_length=5)),
                ('month', models.CharField(max_length=5)),
            ],
            options={
                'db_table': 'city_average_price',
            },
        ),
        migrations.CreateModel(
            name='House',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('city', models.CharField(max_length=30)),
                ('address', models.CharField(max_length=50)),
                ('firm_name', models.CharField(max_length=50)),
                ('house_type', models.CharField(max_length=20)),
                ('average_price', models.IntegerField()),
                ('area', models.IntegerField()),
                ('total_price', models.IntegerField()),
                ('date', models.DateField()),
                ('district', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'house',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=100)),
                ('user_phone', models.CharField(max_length=20)),
                ('session_id', models.CharField(default=0, max_length=50)),
            ],
            options={
                'db_table': 'user_info',
            },
        ),
    ]
