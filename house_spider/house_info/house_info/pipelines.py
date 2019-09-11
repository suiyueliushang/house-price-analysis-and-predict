'''@author:李鑫
@data:2019/9/2
定义了图片url的处理方式：
    下载图片并保存图片地址，
    图片地址用于上传到数据库
'''
# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
from scrapy.pipelines.images import ImagesPipeline
import scrapy
from scrapy.exceptions import DropItem
from . import settings
    
class imagePipeline(ImagesPipeline):
    '''@author:李鑫
    @data:2019/9/2
    继承了scrapy的ImagesPipeline类，处理图片
        下载图片并保存图片地址，
        图片地址用于上传到数据库
    '''
    def get_media_requests(self, item, info):
        for image_url in item['img_url']:
            if image_url!=None:
                yield scrapy.Request(image_url)

    def item_completed(self, results, item, info):
        image_paths = [x['path'] for ok, x in results if ok]      # ok判断是否下载成功
        if not image_paths:
            raise DropItem("Item contains no images")
        item['img_path']=image_paths
        return item