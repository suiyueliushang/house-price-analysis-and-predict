'''@author:李鑫
@data:2019/8/31
定义了几个爬虫要爬取的字段
'''
# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class HouseInfoItem(scrapy.Item):
    '''@author:李鑫
    @data:2019/8/31
    定义了二手房需要爬取的一些属性
    '''
    # define the Fields for your item here like:
    # name = scrapy.Field()
    city= scrapy.Field()
    region= scrapy.Field()
    address= scrapy.Field()
    firm_name= scrapy.Field()
    house_type= scrapy.Field()
    average_price= scrapy.Field()
    area= scrapy.Field()
    total_price= scrapy.Field()
    direction= scrapy.Field()
    height= scrapy.Field()
    zhuangxiu= scrapy.Field()
    huxing_jiegou= scrapy.Field()
    jianzhuleixing= scrapy.Field()
    tihu_bili= scrapy.Field()
    #gongnuan= scrapy.Field()
    elevator= scrapy.Field()
    nianxian= scrapy.Field()
    #jiancheng_niandai= scrapy.Field()
    #xiaoqujunjia= scrapy.Field()
    #loudong_zongshu= scrapy.Field()
    #fangwu_zongshu= scrapy.Field()
    #wuye_fare= scrapy.Field()
    #bus_station= scrapy.Field()
    #subway= scrapy.Field()
    #canyin= scrapy.Field()
    #shop= scrapy.Field()
    #hospital= scrapy.Field()
    #school= scrapy.Field()
    #garden= scrapy.Field()
    #cinema= scrapy.Field()
    #sport= scrapy.Field()
    #bank= scrapy.Field()
    new= scrapy.Field()
    date= scrapy.Field()
    image_url=scrapy.Field()
    image_path =scrapy.Field()
    url=scrapy.Field()

class new_house_info(scrapy.Item):
    '''@author:李鑫
    @data:2019/8/31
    定义了新房房需要爬取的一些属性
    '''
    city= scrapy.Field()
    region= scrapy.Field()
    address= scrapy.Field()
    firm_name= scrapy.Field()
    average_price= scrapy.Field()
    house_type= scrapy.Field()
    area= scrapy.Field()
    total_price= scrapy.Field()
    direction=scrapy.Field()
    new= scrapy.Field()
    kaipan_shijian=scrapy.Field()
    date= scrapy.Field()
    image_url=scrapy.Field()
    image_path =scrapy.Field()
    url=scrapy.Field()

class house_img(scrapy.Item):
    img_path=scrapy.Field()
    img_url=scrapy.Field()
    url=scrapy.Field()