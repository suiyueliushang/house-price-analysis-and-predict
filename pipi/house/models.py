from django.db import models

class User(models.Model):

    user_name=models.CharField(max_length=20,null=False)
    password=models.CharField(max_length=100,null=False)
    user_phone=models.CharField(max_length=20,null=False)
    user_mail=models.CharField(max_length=30,null=False,default=0)
    session_id=models.CharField(max_length=50,null=False,default=0)

    class Meta:
        db_table="user_info"

#class House(models.Model):
    
    #city=models.CharField(max_length=30,null=False)
    #address=models.CharField(max_length=50,null=False)
    #firm_name=models.CharField(max_length=50,null=False)
    #house_type
