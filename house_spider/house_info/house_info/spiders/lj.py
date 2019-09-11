# -*- coding: utf-8 -*-
'''@author:李鑫
@data:2019/8/30
爬取链家上的房源信息，具体字段详见HouseInfoItem
'''
import scrapy
import pinyin
import re
from ..items import HouseInfoItem
import time
import json
import csv

class city_url:
    
    def __init__(self,urls):
        self.urls=urls


class lj(scrapy.Spider):
    '''@author:李鑫\n
    @data:2019/8/31\n
    从链家上爬取具体房源信息，具体字段见items.HouseInfoItem
    '''
    name = 'lj'
    citys=['aq', 'cz', 'hf', 'mas', 'bj', 'fz', 'ly', 'sm', 'dg', 'fs', 'gz', 'qy', 'sz', 'zh', 'zs', 'gy', 'bh', 'fcg', 'gl', 'nn', 'lz', 'hg', 'wh', 'xy', 'xn', 'cs', 'yy', 'bd', 'hd', 'hs', 'lf', 'qhd', 'sjz', 'ts', 'xt', 'zjk', 'bt', 'cm', 'dz', 'da', 'hk', 'lg', 'ld', 'ls', 'qh', 'qz', 'wzs', 'wc', 'wn', 'kf', 'xc', 'zz', 'heb', 'ha', 'ks', 'nj', 'nt', 'sz', 'wx', 'xz', 'yc', 'zj', 'cc', 'nc', 'sr', 'dl', 'dd', 'sy', 'hhht', 'nx', 'sh', 'cd', 'dy', 'ms', 'jn', 'qd', 'wf',\
    'yt', 'zb', 'xa', 'jz', 'ty', 'tj', 'km', 'xsbn', 'hz', 'jx', 'jh', 'nb', 'sx', 'wz', 'wuhu', 'cq', 'quanzhou', 'zhangzhou', 'huizhou', 'jiangmen', '', 'zhanjiang', 'liuzhou', 'huangshi', 'yichang', 'changde', 'zhuzhou', 'chengde', 'san', 'luoyang', 'xinxiang', 'changzhou', 'ganzhou', 'jiujiang', 'jian', 'yinchuan', 'dazhou', 'leshan', 'liangshan', 'mianyang', 'nanchong', 'linyi', 'weihai', 'baoji', 'hanzhong', 'xianyang', 'dali', 'huzhou', 'taizhou']
    #start_urls=["https://%s.lianjia.com/ershoufang/rs/"%i for i in citys]
    
    def start_requests(self):
        '''@author:李鑫
        @data:2019/8/31
        从detail获得具体房源的url并请求页面
        '''
        urls=[]
        with open("detail_url.csv","r",encoding="utf8") as read:
            csv_reader=csv.reader(read)  
            head=next(csv_reader) 
            for row in csv_reader:
                urls.append(row[0])
        for j in urls:
            yield scrapy.Request(j,self.parse)

    """
    def parse(self,response):
        '''@author:李鑫\n
        @data:2019/8/31\n
        @args:response\n
        产生具体房源的url，并保存到detail_url.csv
        '''
        max_page_html=response.xpath('//*[@id="content"]/div[1]/div[8]/div[2]/div').extract_first()
        max_page=int(re.search(r'totalPage":(.*?),"',max_page_html).group(1))
        i=1
        while i<=max_page:
            if i==1:
                yield {
                    "URL":response.url
                }
            else:
                yield{
                    "URL":re.sub('rs/','pg%d'%i,response.url)
                }
            i=i+1
        time.sleep(1)       
        #yield scrapy.Request(url=response.url,callback=self.get_house_html,dont_filter=True)
        #i=1
        #while i<=max_page:
            #i=i+1
            #yield scrapy.Request(url=re.sub('rs/','pg%d'%i,response.url),callback=self.get_house_html,dont_filter=True)
            except Exception:
            print(Exception.__cause__)
            print("exception happened at parse "+response.url)
    
    def parse(self,response):
            i=1
            while i<=30:
                try:
                    print("get_house_html: "+response.url)
                    res=response.xpath('//*[@id="content"]/div[1]/ul/li[%d]/a/@href'%i).extract_first()
                    yield {
                        "url":res
                    }
                except Exception:
                    print("exception happened at get_house_html %d"%i)
                    continue
                i=i+1
    """    

    def parse(self,response):
        '''@author:李鑫\n
        @data:2019/8/31\n
        @args:response\n
        解析http响应文本内容，获得相关字段并以csv格式输出到house.csv
        '''
        #print("get_detail: "+response.url)
        try:
            item=HouseInfoItem()
            str=response.text
            try:
                item['city']= re.match(r'(.*)二手房',response.xpath('/html/body/div[4]/div/div/a[2]/text()').extract_first()).group(1)
            except Exception:
                item['city']="暂无数据" 

            try:
                item['region']=re.match(r'(.*)二手房',response.xpath('/html/body/div[4]/div/div/a[3]/text()').extract_first()).group(1)
            except Exception:
                item['region']="暂无数据"        

            try:
                res=re.search(r'所在区域</span><span class="info"><a href=".*?" target="_blank">(.*?)</a>&nbsp;<a href=".*?" target="_blank">(.*?)</a>&nbsp;',str)
                item['address']=res.group(1)+res.group(2)
            except Exception:
                item['address']="暂无数据"

            try:
                item['firm_name']=response.xpath('/html/body/div[5]/div[2]/div[3]/div[1]/a[1]/text()').extract_first()
            except Exception:
                item['firm_name']="暂无数据"

            try:
                item['house_type']=re.search(r'<div class="mainInfo">(.*?)</div>',str).group(1)
            except Exception:
                item['house_type']="暂无数据"

            try:
                item['average_price']=re.search(r' price:\'(\d+)\',',str).group(1)
            except Exception:
                item['average_price']="10000"

            try:
                item['area']=re.search(r' area:\'([.0-9]+)\',',str).group(1)
            except Exception:
                item['area']="100"

            try:  
                item['total_price']=re.search(r'totalPrice:\'(\d+)\'',str).group(1)
            except Exception:
                item['total_price']="100"

            try:
                item['direction']=re.search(r'房屋朝向</span>(.*?)</li>',str).group(1)
            except Exception:    
                item['direction']="暂无数据"

            try:
                item['height']=re.search(r'所在楼层</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['height']="暂无数据"

            try:
                item['zhuangxiu']=re.search(r'装修情况</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['zhuangxiu']="暂无数据"    

            try:
                item['huxing_jiegou']=re.search(r'户型结构</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['huxing_jiegou']="暂无数据" 

            try:
                item['jianzhuleixing']=re.search(r'建筑类型</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['jianzhuleixing']="暂无数据"   

            try:
                item['tihu_bili']=re.search(r'梯户比例</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['tihu_bili']="暂无数据"     

            #item['gongnuan']=re.search(r'',str).group(1)
            try:
                item['elevator']=re.search(r'配备电梯</span>(.*?)</li>',str).group(1)
            except Exception:  
                item['elevator']="暂无数据"    

            try:
                item['image_url']=response.xpath('//*[@id="thumbnail2"]/ul/li[1]/img/@src').extract_first()
            except Exception:  
                item['image_url']=""

            item['nianxian']=70            
            #item['jiancheng_niandai']=response.xpath('//*[@id="resblockCardContainer"]/div/div/div[2]/div/div[2]/label/text()').extract_first()
            #item['xiaoqujunjia']=re.match(r'([.0-9]*)元/',response.xpath('//*[@id="resblockCardContainer"]/div/div/div[2]/div/div[1]/span/text()').extract_first()).group(1)
            #item['loudong_zongshu']=response.xpath('//*[@id="resblockCardContainer"]/div/div/div[2]/div/div[4]/span/text()').extract_first()
            #item['fangwu_zongshu']=response.xpath('//*[@id="resblockCardContainer"]/div/div/div[2]/div/div[5]/span/text()').extract_first()
            #item['bus_station']=response.xpath('//*[@id="mapListContainer"]/ul/li/text()').extract_first()
            #item['subway']=response.xpath('/text()').extract_first()
            #item['canyin']=response.xpath('/text()').extract_first()
            #item['shop']=response.xpath('/text()').extract_first()
            #item['hospital']=response.xpath('/text()').extract_first()
            #item['school']=response.xpath('/text()').extract_first()
            #item['garden']=response.xpath('/text()').extract_first()
            #item['cinema']=response.xpath('/text()').extract_first()
            #item['sport']=response.xpath('/text()').extract_first()
            #item['bank']=response.xpath('/text()').extract_first()
            item['new']=0
            item['date']='2019-8'
            item['url']=response.url
            yield item
        except Exception:
            pass
        
