from scrapy import Spider
import csv
import scrapy
from ..items import house_img
class img(Spider):
    name='pic'
    def start_requests(self):
        urls=[]
        with open('E:\\github\\house_price_analysis\\house-price-analysis-and-predict\\house_spider\\house_info\\house_info\\spiders\\detail_url.csv','r',encoding='utf8') as r:
            csv_reader=csv.reader(r)
            next(csv_reader)
            for row in csv_reader:
                urls.append(row[0])
        u=urls[48966:]
        for i in u:
            yield scrapy.Request(url=i,callback=self.parse)

    def parse(self, response):
        item=house_img()
        list=[]
        try:
            if response.xpath('/html/body/div[7]/div[1]/div[4]/div/div[1]/div/div[1]/img/@src').extract_first()!=None:
                list.append(response.xpath('/html/body/div[7]/div[1]/div[4]/div/div[1]/div/div[1]/img/@src').extract_first())
                list.append(response.xpath('/html/body/div[7]/div[1]/div[4]/div/div[1]/div/div[2]/img/@src').extract_first())
                list.append(response.xpath('/html/body/div[7]/div[1]/div[4]/div/div[1]/div/div[3]/img/@src').extract_first())
            else:
                list.append(response.xpath('/html/body/div[7]/div[1]/div[5]/div/div[1]/div/div[1]/img/@src').extract_first())
                list.append(response.xpath('/html/body/div[7]/div[1]/div[5]/div/div[1]/div/div[2]/img/@src').extract_first())
                list.append(response.xpath('/html/body/div[7]/div[1]/div[5]/div/div[1]/div/div[3]/img/@src').extract_first())
            item['img_url']=list      
        except Exception:
            pass
        item['url']=response.url
        yield item