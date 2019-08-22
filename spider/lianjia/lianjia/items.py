# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class LianjiaItem(scrapy.Item):

    City=scrapy.Field()
    District=scrapy.Field()
    Detailed_address=scrapy.Field()
    Company=scrapy.Field()
    Model=scrapy.Field()
    Average_price=scrapy.Field()
    Area=scrapy.Field()
    #Total_price=scrapy.Field()

