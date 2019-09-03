# Generated by Django 2.2.4 on 2019-09-03 07:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        
        
        migrations.CreateModel(
            name='New_user',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('user_name', models.CharField(max_length=20)),
                ('user_phone', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'new_users',
            },
        ),
        migrations.CreateModel(
            name='New_user_number',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateField()),
                ('number', models.IntegerField()),
            ],
            options={
                'db_table': 'new_number',
            },
        ),
        
        migrations.CreateModel(
            name='Visitor',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField()),
                ('user_name', models.CharField(max_length=20)),
                ('user_phone', models.CharField(max_length=20)),
            ],
            options={
                'db_table': 'visitor',
            },
        ),
        migrations.CreateModel(
            name='Visitor_number',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateField()),
                ('number', models.IntegerField()),
            ],
            options={
                'db_table': 'visitor_number',
            },
        ),
    ]
