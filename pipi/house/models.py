from django.db import models

class User(models.Model):

    user_name=models.CharField(max_length=20,null=False)
    password=models.CharField(max_length=100,null=False)
    user_phone=models.CharField(max_length=20,null=False)
    session_id=models.CharField(max_length=50,null=False,default=0)
    collection=models.CharField(max_length=200)

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
    date=models.CharField(max_length=10)
    district=models.CharField(max_length=20)
    direction=models.CharField(max_length=100,null=True)
    elevator=models.CharField(max_length=10,default='暂无数据')
    height=models.CharField(max_length=20,null=True)
    huxing_jiegou=models.CharField(max_length=20,default='暂无数据')
    jianzhuleixing=models.CharField(max_length=10,default='暂无数据')
    new=models.IntegerField(default=1)
    nianxian=models.CharField(max_length=10,default='70')
    tihu_bili=models.CharField(max_length=15,default='暂无数据')
    zhuangxiu=models.CharField(max_length=15,default='暂无数据')
    kaipan_shijian=models.CharField(max_length=10,default='暂无数据')

    class Meta:
        db_table="house"

class City(models.Model):
    
    city=models.CharField(max_length=10)
    average_price=models.IntegerField()
    year=models.CharField(max_length=5)
    month=models.CharField(max_length=5)

    class Meta:
        db_table="city_average_price"


class Admin(models.Model):

    admin_name=models.CharField(max_length=20,null=False)
    password=models.CharField(max_length=100,null=False)
    session_id=models.CharField(max_length=50,null=False,default=0)

    class Meta:
        db_table="admin"

class New_user(models.Model):

    time=models.DateTimeField()
    user_name=models.CharField(max_length=20)
    user_phone=models.CharField(max_length=20)

    class Meta:
        db_table='new_users'

class Visitor(models.Model):
    time=models.DateTimeField()
    user_name=models.CharField(max_length=20)
    user_phone=models.CharField(max_length=20)

    class Meta:
        db_table='visitor'

class New_user_number(models.Model):
    time=models.DateField()
    number=models.IntegerField()
    class Meta:
        db_table='new_number'

class Visitor_number(models.Model):
    time=models.DateField()
    number=models.IntegerField()
    class Meta:
        db_table='visitor_number'

class District_price(models.Model):
    district=models.CharField(max_length=20)
    district_average=models.IntegerField()
    date=models.DateField()
    city=models.CharField(max_length=20)
    class Meta:
        db_table='district_price'

class City_price(models.Model):
    city=models.CharField(max_length=20)
    city_average=models.IntegerField()
    date=models.DateField()
    class Meta:
        db_table='city_price'

class P_C_D(models.Model):
    province=models.CharField(max_length=10)
    city=models.CharField(max_length=15)
    region=models.CharField(max_length=20)
    class Meta:
        db_table='pro_cit_reg'
