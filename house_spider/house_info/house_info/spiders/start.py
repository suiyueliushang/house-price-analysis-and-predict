'''@author:李鑫
@data:2019/9/2
爬取链家上新房楼盘数据
'''
import pinyin
import scrapy
from .. import items
import re
import time

new_city=["保定","保亭","北京","承德","长春","滁州","长沙","澄迈","重庆","成都","大连","东莞","儋州","东方","定安","德阳","大理","佛山","广州","桂林","贵阳","邯郸","衡水","呼和浩特","杭州","湖州","合肥","黄冈","惠州","海口","晋中","嘉兴","济南","昆明","廊坊","龙岩","临高","乐东","陵水","乐山","眉山","南京","南通","宁波","南昌","南宁","秦皇岛","泉州","青岛","清远","琼海","琼中","石家庄","沈阳","上海","苏州","绍兴","深圳","三亚","天津","太原","无锡","威海","武汉","五指山","文昌","万宁","邢台","徐州","厦门","咸宁","西双版纳","西安","烟台","张家口","镇江","漳州","郑州","珠海","中山"]
sp_city=["芜湖","重庆","泉州","漳州","惠州","江门","湛江","柳州","黄石","宜昌","常德","株洲","承德","三亚","洛阳","新乡","常州","赣州","九江","吉安","银川","达州","乐山","凉山","绵阳","南充","临沂","威海","宝鸡","汉中","咸阳","大理","湖州","台州"]

special=["承德"]
def get_url(new_city,sp_city):
    '''@author:李鑫
    @data:2019/9/2
    生成链家上具有新房楼盘城市的url
    '''
    new_url=[]
    for i in new_city:
        if i not in sp_city:
            new_url.append("https://%s.fang.lianjia.com/loupan"%pinyin.get_initial(i,delimiter=''))
        elif i=='重庆':
            new_url.append("https://cq.fang.lianjia.com/loupan")
        elif i=='三亚':
            new_url.append("https://san.fang.lianjia.com/loupan")
        else:
            new_url.append("https://%s.fang.lianjia.com/loupan"%pinyin.get(i, format='strip'))
    print(new_url)
    return new_url

class new_spiders(scrapy.Spider):
    '''@author:李鑫
    @data:2019/9/2
    定义爬取新房信息的爬虫
    '''
    name="new_spiders"
    start_urls=['https://bd.fang.lianjia.com/loupan', 'https://bt.fang.lianjia.com/loupan', 'https://bj.fang.lianjia.com/loupan', 'https://chengde.fang.lianjia.com/loupan', 'https://cc.fang.lianjia.com/loupan', 'https://cz.fang.lianjia.com/loupan', 'https://cs.fang.lianjia.com/loupan',
    'https://cm.fang.lianjia.com/loupan', 'https://cq.fang.lianjia.com/loupan', 'https://cd.fang.lianjia.com/loupan', 'https://dl.fang.lianjia.com/loupan', 'https://dg.fang.lianjia.com/loupan', 'https://dz.fang.lianjia.com/loupan', 'https://df.fang.lianjia.com/loupan', 'https://da.fang.lianjia.com/loupan', 'https://dy.fang.lianjia.com/loupan', 'https://dali.fang.lianjia.com/loupan', 'https://fs.fang.lianjia.com/loupan', 'https://gz.fang.lianjia.com/loupan', 'https://gl.fang.lianjia.com/loupan', 'https://gy.fang.lianjia.com/loupan', 'https://hd.fang.lianjia.com/loupan', 'https://hs.fang.lianjia.com/loupan', 'https://hhht.fang.lianjia.com/loupan', 'https://hz.fang.lianjia.com/loupan', 'https://huzhou.fang.lianjia.com/loupan', 'https://hf.fang.lianjia.com/loupan', 'https://hg.fang.lianjia.com/loupan', 'https://huizhou.fang.lianjia.com/loupan', 'https://hk.fang.lianjia.com/loupan', 'https://jz.fang.lianjia.com/loupan', 'https://jx.fang.lianjia.com/loupan', 'https://jn.fang.lianjia.com/loupan', 'https://km.fang.lianjia.com/loupan', 'https://lf.fang.lianjia.com/loupan', 'https://ly.fang.lianjia.com/loupan', 'https://lg.fang.lianjia.com/loupan', 'https://ld.fang.lianjia.com/loupan', 'https://ls.fang.lianjia.com/loupan', 'https://leshan.fang.lianjia.com/loupan', 'https://ms.fang.lianjia.com/loupan', 'https://nj.fang.lianjia.com/loupan', 'https://nt.fang.lianjia.com/loupan', 'https://nb.fang.lianjia.com/loupan', 'https://nc.fang.lianjia.com/loupan', 'https://nn.fang.lianjia.com/loupan', 'https://qhd.fang.lianjia.com/loupan', 'https://quanzhou.fang.lianjia.com/loupan', 'https://qd.fang.lianjia.com/loupan', 'https://qy.fang.lianjia.com/loupan', 'https://qh.fang.lianjia.com/loupan', 'https://qz.fang.lianjia.com/loupan', 'https://sjz.fang.lianjia.com/loupan', 'https://sy.fang.lianjia.com/loupan', 'https://sh.fang.lianjia.com/loupan', 'https://sz.fang.lianjia.com/loupan', 'https://sx.fang.lianjia.com/loupan', 'https://sz.fang.lianjia.com/loupan', 'https://san.fang.lianjia.com/loupan', 'https://tj.fang.lianjia.com/loupan',
    'https://ty.fang.lianjia.com/loupan', 'https://wx.fang.lianjia.com/loupan', 'https://weihai.fang.lianjia.com/loupan', 'https://wh.fang.lianjia.com/loupan', 'https://wzs.fang.lianjia.com/loupan', 'https://wc.fang.lianjia.com/loupan', 'https://wn.fang.lianjia.com/loupan', 'https://xt.fang.lianjia.com/loupan', 'https://xz.fang.lianjia.com/loupan', 'https://sm.fang.lianjia.com/loupan', 'https://xn.fang.lianjia.com/loupan', 'https://xsbn.fang.lianjia.com/loupan', 'https://xa.fang.lianjia.com/loupan', 'https://yt.fang.lianjia.com/loupan', 'https://zjk.fang.lianjia.com/loupan', 'https://zj.fang.lianjia.com/loupan', 'https://zhangzhou.fang.lianjia.com/loupan', 'https://zz.fang.lianjia.com/loupan', 'https://zh.fang.lianjia.com/loupan', 'https://zs.fang.lianjia.com/loupan']


    def parse(self,response):
        total_house=re.search(r'data-total-count="(\d+?)">',response.xpath('/html/body/div[5]').extract_first()).group(1)
        a=int(total_house)/10
        if a>1:
            total_page=int(total_house)//10
        else:
            total_page=int(total_house)//10+1
        yield scrapy.Request(response.url,self.get_detail)
        i=2
        while i<=total_page:
            yield scrapy.Request(response.url+'/pg%d/'%i,self.get_house_url)
            i+=1

    def get_house_url(self,response):
        detail_url=[]
        for i in range(1,11):
            try:
                detail_url.append(re.match(r'(.*)/loupan.*',response.url).group(1)+response.xpath('/html/body/div[4]/ul[2]/li[%d]/a/@href'%i).extract_first())
            except Exception:
                break    
        for i in detail_url:
            yield scrapy.Request(i,self.get_detail)

    def get_detail(self,response):
        item=items.new_house_info()
        try:
            item['city']=re.match(r'(.*)新房',response.xpath('/html/body/div[2]/div[2]/div[3]/div/a[2]/text()').extract_first()).group(1)
        except Exception:
            item['city']='暂无数据'
        
        try:
            item['region']=re.match(r'(.*)楼盘',response.xpath('/html/body/div[2]/div[2]/div[3]/div/a[4]/text()').extract_first()).group(1)
        except Exception:
            item['region']='暂无数据'
        
        try:
            item['address']=re.match(r'项目地址：(.*)',response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[2]/div/p[3]/span/text()').extract_first()).group(1)
        except Exception:
            item['address']='暂无数据'
        
        try:
            item['firm_name']=response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[1]/div/a/h1/text()').extract_first()
        except Exception:
            item['firm_name']='暂无数据'
        
        try:
            item['average_price']=response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[1]/p[1]/span[2]/text()').extract_first()
        except Exception:
            item['average_price']='暂无数据'
            
        try:
            res=re.findall(r'<span>建面 (.*)m²</span>',response.text)
            item['area']=";".join(res)
        except Exception:
            item['area']='暂无数据'
                    
        try:
            item['total_price']=";".join(re.findall(r'<p class="p2">均价 <span>(.*?)</span> 万/套',response.text))
        except Exception:
            item['total_price']='暂无数据'
                    
        try:
            item['house_type']=";".join(re.findall(r'<p class="p1">(.*?) <span>建面 ',response.text))
        except Exception:
            item['house_type']='暂无数据'                    

        try:
            item['direction']=";".join(re.findall(r'<span class="p1-orientation ">（.*?）</span>',response.text))
        except Exception:
            item['direction']='暂无数据'
        item['new']=1
                    
        try:
            item['kaipan_shijian']=response.xpath('/html/body/div[2]/div[2]/div[4]/div[2]/div[2]/div/div[1]/p/span[2]/text()').extract_first()
        except Exception:
            item['kaipan_shijian']='暂无数据'
                    
        try:
            item['date']=time.strftime("%Y-%m", time.localtime())
        except Exception:
            item['date']='暂无数据'
        try:
            item['image_url']=response.xpath('//*[@id="estate-album"]/div/div[1]/a/img/@src').extract_first()
        except Exception:
            item['image_url']=''
        item['url']=response.url
        yield item
     