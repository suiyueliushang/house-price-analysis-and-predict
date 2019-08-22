# -*- coding: utf-8 -*-
import scrapy
from ..items import LianjiaItem

class LianjiaspiderSpider(scrapy.Spider):
    name = 'lianjiaspider'
    allowed_domains = ['nj.fang.lianjia.com']
    start_urls = ['https://nj.fang.lianjia.com/loupan/p_hfnabjohl/']
    b_url='https://nj.fang.lianjia.com'
    base_url='https://nj.fang.lianjia.com/loupan/'
    
    def start_requests(self):
        district=['gulou','jianye','qinhuai','xuanwu','yuhuatai','qixia'
        ,'jiangning','fukou','liuhe','lishui','gaochun',
                'jurong','laianxian','hexian','nanqiaoqu',]
        for elem in district:
            district_url = self.base_url + elem
            yield scrapy.Request(district_url,callback=self.parse)

    def parse(self,response):
        print("进入")
        try:
            #specific_urls=response.xpath('/html/body/div[4]/ul[@class=resblock-list-wrapper]//a[@class="resblock-img-wrapper"]/@href').extract()
            specific_urls=response.xpath('/html/body/div[4]/ul[2]/li/a/@href').extract()
            print(specific_urls)
            for url in specific_urls:
                specific_url=self.b_url+url
                yield scrapy.Request(specific_url,callback=self.getinfo)
        except:
            print("错误")

        #next_url=response.xpath('//div[@class="page-box"]//a[@class="next"/text')

    def getinfo(self,response):
        print("开始存储数据")
        huxings=response.xpath('//*[@id="house-online"]/div[3]/div/ul/li[2]/p[1]/text()').extract()
        #areas=response.xpath('//*[@id="house-online"]/div[3]/div[1]/ul/li[2]/p[1]/span[1]').extract()
        print("户型：",len(huxings))
        for x in range(len(huxings)):
            print('x:',x)
            m=str(x+1)
            item=LianjiaItem()
            item['City']=response.xpath('/html/body/div[1]/div/div[1]/a[2]/text()').extract()[0]
            item['Detailed_address']=response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[2]/div/p[3]/span/@title').extract()[0]
            item['District']=response.xpath('/html/body/div[2]/div[2]/div[3]/div/a[4]/text()').extract()[0]
            item['Company']=response.xpath('//*[@id="house-details"]/div/p[4]/span[2]/text()').extract()[0]
            item['Model']=response.xpath('//*[@id="house-online"]/div[3]/div/ul['+ m +']/li[2]/p[1]/text()').extract()[0]
            item['Average_price']=response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[1]/p[1]/span[2]/text()').extract()[0]
            item['Area']=response.xpath('//*[@id="house-online"]/div[3]/div[1]/ul['+ m +']/li[2]/p[1]/span[1]/text()').extract()[0]
            #item['Total_price']=response.xpath('//*[@id="house-online"]/div[3]/div[1]/ul[1]/li[2]/p[2]/span[1]').extract()[0]
            print(item)  
            yield item


        
