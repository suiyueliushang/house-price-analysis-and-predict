from django.db import models

# Create your models here.
class house(models.Model):
    def __init__(self,city,region,address,form_name,picture,house_style,average_price,area,total_price):
        self.city=city
        self.region=region
        self.address=address
        self.form_name=form_name
        self.picture=picture
        self.house_style=house_style
        self.average_price=average_price
        self.area=area
        self.totla_price=total_price
    
    city=models.CharField(max_length=20)
    region=models.CharField(max_length=30)
    address=models.CharField(max_length=80)
    form_name=models.CharField(max_length=50)
    picture=models.CharField(max_length=200)
    house_style=models.CharField(max_length=30)
    average_price=models.CharField(max_length=20)
    area=models.CharField(max_length=30)
    total_price=models.CharField(max_length=30)

    
    