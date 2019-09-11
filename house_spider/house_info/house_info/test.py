'''@author:李鑫
@data:2019/8/31
对城市处理，产生链家上对应城市的url
'''
import pinyin
import json

citys=["安庆","滁州","合肥","马鞍山","芜湖","北京","重庆","福州","龙岩","泉州","厦门","漳州","东莞","佛山","广州","惠州","江门","清远","深圳","珠海","湛江","中山","贵阳","北海","防城港","桂林","柳州","南宁","兰州","黄石","黄冈","武汉","襄阳","咸宁","宜昌","长沙","常德","岳阳","株洲","保定","承德","邯郸","衡水","廊坊","秦皇岛","石家庄","唐山","邢台","张家口","保亭","澄迈","儋州","定安","海口","临高","乐东","陵水","琼海","琼中","三亚","五指山","文昌","万宁","开封","洛阳","新乡","许昌","郑州","哈尔滨","常州","淮安","昆山","南京","南通","苏州","无锡","徐州","盐城","镇江","长春","赣州","九江","吉安","南昌","上饶","大连","丹东","沈阳","呼和浩特","宁夏","银川","上海","成都","德阳","达州","乐山","凉山","绵阳","眉山","南充","济南","临沂","青岛","潍坊","威海","烟台","淄博","宝鸡","汉中","西安","咸阳","晋中","太原","天津","大理","昆明","西双版纳","杭州","湖州","嘉兴","金华","宁波","绍兴","台州","温州"]
sp_city=["芜湖","重庆","泉州","漳州","惠州","江门","","湛江","柳州","黄石","宜昌","常德","株洲","承德","三亚","洛阳","新乡","常州","赣州","九江","吉安","银川","达州","乐山","凉山","绵阳","南充","临沂","威海","宝鸡","汉中","咸阳","大理","湖州","台州"]
city_pin=[]


def get_pinyin_(citys, sp_city):
    '''@author:李鑫
    @data:2019/8/31
    获得城市的全拼
    '''
    for i in citys: 
        if i not in sp_city:
            city_pin.append(pinyin.get_initial(i, delimiter=''))

def get_shoupin(sp_city):
    '''@author:李鑫
    @data:2019/8/31
    获得某些城市的首拼
    '''
    for i in sp_city:
        if i=="重庆":
            city_pin.append("cq")
        elif i=="三亚":
            city_pin.append("san")
        else:
            city_pin.append(pinyin.get(i,delimiter='',format='strip'))

def remove_same():
    '''@author:李鑫
    @data:2019/8/31
    删除冗余项
    '''
    url_set=set()
    with open('E:/github/house_price_analysis/house-price-analysis-and-predict/house_spider/house_info/house_info/spiders/detail_url.json','r',encoding="utf8") as r:
        read=json.load(r)
        for i in read:
            url_set.add(i['url'])
        url_list=list(url_set)
    with open('E:/github/house_price_analysis/house-price-analysis-and-predict/house_spider/house_info/house_info/spiders/detail.json','w',encoding='utf8') as w:
        json.dump(url_list,w)
        

if __name__=="__main__":
    remove_same()
