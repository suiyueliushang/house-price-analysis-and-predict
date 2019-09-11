'''@author:李鑫
@data:2019/9/3
将爬取到的数据上传到数据库
'''
import pymysql
import csv
import pandas as pd
conn=pymysql.connect(
    host="pipihouse.com",
    port=3306,
    user='root',
    password='P1i2p3i4@house',
    database='HOUSE_INFO'
)

cur=conn.cursor()
list=[]

def push_to_db():
    '''@author:李鑫
    @data:2019/9/3
    将爬取到的二手房上传到数据库
    '''
    with open("E:\\github\\house_price_analysis\\house-price-analysis-and-predict\\house_spider\\house_info\\house_info\\spiders\\house.csv",'r',encoding='utf8') as r:
        csv_reader=csv.reader(r)
        header=next(csv_reader)
        i=2070
        for row in csv_reader:
            list.append((int(i),row[3],row[0],row[7],row[9],row[2],row[1],row[18],row[4],row[16],row[5],row[6],row[8],row[10],row[13],0,row[15],row[17],row[20]))
            i+=1
        try:
            cur.executemany('insert into house(id,city,address, firm_name, house_type, average_price, \
                area, total_price, date, district, direction, elevator, height, huxing_jiegou, \
                    jianzhuleixing, new, nianxian, tihu_bili, zhuangxiu) \
                values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',list)
            conn.commit()
        except Exception as err:
            print(err)
        finally:
            cur.close()
            conn.close()

def push_new_to_db():
    '''@author:李鑫
    @data:2019/9/3
    将爬取到的新房上传到数据库
    '''
    with open("house_info\\house_info\\spiders\\new_house.csv",'r',encoding='utf8') as r:
        csv_reader=csv.reader(r)
        header=next(csv_reader)
        i=279491
        for row in csv_reader:                
            house_type=";".join(row[7].split(';')[0:5])
            direction=";".join(row[5].split(';')[0:5])
            area=";".join(row[1].split(';')[0:5])
            total_price=";".join(row[13].split(';')[0:5])
            list.append((int(i),row[3],row[0],row[6],house_type,row[2],area, total_price,row[4],row[12],direction,1,70,row[10]))
            i+=1
            print(row[10])
        try:
            cur.executemany('insert into house(id,city,address, firm_name, house_type, average_price, \
                area, total_price, date, district, direction, new, nianxian, kaipan_shijian) \
                values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',list)
            conn.commit()
        except Exception as err:
            print(err)
        finally:
            cur.close()
            conn.close()

def process_img():
    '''@author:李鑫
    @data:2019/9/9
    处理图片
    '''
    house=pd.read_csv('E:\\github\\house_price_analysis\\house-price-analysis-and-predict\\house_spider\\house_info\\house_info\\spiders\\house.csv',index_col=19)
    img=pd.read_csv('E:\\github\\house_price_analysis\\house-price-analysis-and-predict\\house_spider\\house_info\\1.csv',index_col=2)
    res=pd.merge(house,img,left_index=True,right_index=True)
    res.to_csv('2.csv')
def export_image():
    '''@author:李鑫
    @data:2019/9/3
    将爬取到的图片上传到数据库
    '''
    img=pd.read_csv('E:\\github\\house_price_analysis\\house-price-analysis-and-predict\\house_spider\\2.csv')
    for i in range(0,45550):
        list.append([img.loc[i,'img_path'],img.loc[i,'address'],str(img.loc[i,'area']),str(img.loc[i,'average_price'])])
    cur.executemany('update house set img_path=%s where address=%s and area=%s and average_price=%s',list)  
    conn.commit()      
    cur.close()
    conn.close()
if __name__=="__main__":
    export_image()
