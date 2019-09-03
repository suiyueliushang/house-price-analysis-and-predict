from django.db import models

class User(models.Model):

    user_name=models.CharField(max_length=20,null=False)
    password=models.CharField(max_length=100,null=False)
    user_phone=models.CharField(max_length=20,null=False)
    session_id=models.CharField(max_length=50,null=False,default=0)

    class Meta:
        db_table="user_info"

class House(models.Model):
    
    city=models.CharField(max_length=30)
    address=models.CharField(max_length=50)
    firm_name=models.CharField(max_length=50)
    house_type=models.CharField(max_length=20)
    average_price=models.IntegerField()
    area=models.IntegerField()
    total_price=models.IntegerField()
    date=models.DateField()
    district=models.CharField(max_length=20)

    class Meta:
        db_table="house"

class City(models.Model):
    
    city=models.CharField(max_length=10)
    average_price=models.IntegerField()
    year=models.CharField(max_length=5)
    month=models.CharField(max_length=5)

    class Meta:
        db_table="city_average_price"

class new_user(models.Model):
    time=models.DateField()
    user_name=models.CharField(max_length=20)
    user_phone=models.CharField(max_length=20)

    class Meta:
        db_table='new_users'

class Visitor(models.Model):
    time=models.DateField()
    user_name=models.CharField(max_length=20)
    user_phone=models.CharField(max_length=20)

    class Meta:
        db_table='visitor'

class new_user_number(models.Model):
    time=models.DateField()
    number=models.IntegerField()
    class Meta:
        db_table='new_number'


class Admin(models.Model):

    admin_name=models.CharField(max_length=20,null=False)
    password=models.CharField(max_length=100,null=False)
    session_id=models.CharField(max_length=50,null=False,default=0)

    class Meta:
        db_table="admin_info"