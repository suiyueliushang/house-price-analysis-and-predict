#@author:谢佳锋
from django.shortcuts import render
from .models import Visitor,New_user,New_user_number,Visitor_number,City,House,User,Admin,District_price,City_price
from django.http import HttpResponse
from django.http import JsonResponse
from . import test,model
import random
import json
from django.db.models import Q
import datetime
import pytz
import traceback
import re
import base64

code_dict1={}
code_dict2={}

def sign_in_by_password(request):
    '''
    用户通过账户名密码登陆
    @arg：
        str:request.post[user_name]
        str:request.post[password]
    @return : 
        result:json:
            
    @date:
        2019-8-25
    '''
    _username=request.POST.get('user_name')
    _password=request.POST.get('password')
    response=HttpResponse()
    users=User.objects.all()
    if _username and _password:
        try:
            user=User.objects.filter(user_name=_username)[0]
        except:
            result={'is_success':'1','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if user.password==_password:
            

            now=datetime.datetime.now()
            now=now.replace(tzinfo=None)
            user_sign_in=Visitor(time=now,user_name=_username,user_phone=user.user_phone)
            user_sign_in.save()

            try:
                user_num1=Visitor_number.objects.get(time=now.date())
                user_num1.number+=1
                user_num1.save()
            except:
                i=now.date()
                user_num2=Visitor_number(time=i,number=1)
                user_num2.save()

            user_user={'user_name':user.user_name,'id':user.id}
            result={'is_success':'0','user':user_user}
            response=HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            cookie_key='key'
            cookie_value='cookie12'+str(datetime.datetime.now())+'jfnsdjf'
            response.set_cookie(cookie_key,cookie_value)
            user.session_id=cookie_value
            user.save()
            return response
        else:
            result={'is_success':'2','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def sign_in_by_phone_number(request):
    '''手机号登录
    传递一个正确的11位中国大陆手机号码，和用户出入的验证码

        @args：
            phonenumber，auth_code
        @return：
            result:json
        @date:
            2019-8-25
    '''
    response=HttpResponse()
    _phonenumber=request.POST.get("phone_number")
    _auth_code=request.POST.get("phone_code")
    if _phonenumber and _auth_code:
        try:
            user=User.objects.get(user_phone=_phonenumber)
        except:
            result={'is_success':'1','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if code_dict2[_phonenumber]==_auth_code:

            now=datetime.datetime.now()
            now=now.replace(tzinfo=None)
            user_sign_in=Visitor(time=now,user_name=user.user_name,user_phone=_phonenumber)
            user_sign_in.save()

            try:
                user_num1=Visitor_number.objects.get(time=now.date())
                user_num1.number+=1
                user_num1.save()
            except:
                i=now.date()
                user_num2=Visitor_number(time=i,number=1)
                user_num2.save()
            
            user_user={'user_name':user.user_name,'id':user.session_id}
            result={'is_success':'0','user':user_user}
            response=HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            cookie_key='key'
            cookie_value='cookie12'
            response.set_cookie(cookie_key,cookie_value)
            user.session_id=cookie_value
            user.save()
            return response
        else: 
            result={'is_success':'2','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        return HttpResponse('格式错误')


def reg_phone_number(request):
    '''发送验证码
    传递一个正确的11位中国大陆手机号码
        @args:
            phonenumber
        @return:
            auth_code
        @date:
            2019-8-26
    '''

    _phone_number=request.POST.get('phone_number')
    code=str(random.randint(1000,9999))
    test.auth_code(str(_phone_number),code)
    code_dict1[_phone_number]=code
    return HttpResponse("0")

def get_auth_code(request):
    '''
    用户忘记密码时获取验证码
    发送验证码
    传递一个正确的11位中国大陆手机号码
        @args:
            phonenumber
        @return:
            auth_code
        @date:
            2019-8-26
    '''
    _phone_number=request.POST.get('phone_number')
    users=User.objects.all()

    try:
        user=User.objects.filter(user_phone=str(_phone_number))[0]
    except:
        return HttpResponse('1')    
    code=str(random.randint(1000,9999))
    test.auth_code(str(_phone_number),code)
    code_dict2[_phone_number]=code
    return HttpResponse("0")


def sign_up(request):
    '''注册
    传递用户名，手机号，还有密码,验证码
    @args：
        reg_user_name,reg_phone_number,reg_password,reg_auth_code
    @return 
        bool:判断用户验证码是否正确
    @date:
        2019-8-26
    '''
    _phone_number=request.POST.get('phone_number')
    _auth_code=request.POST.get('reg_phone_code')
    response=HttpResponse()
    if _phone_number.strip() and _auth_code:
        if _phone_number in code_dict1.keys():
            if code_dict1[_phone_number]==_auth_code:  
                _reg_user_name=request.POST.get('reg_user_name')
                _reg_password=request.POST.get('reg_password')

                now=datetime.datetime.now()
                now=now.replace(tzinfo=None)
                try:
                    user_s=User.objects.get(user_name=_reg_user_name)
                    return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")
                except:
                    user_sign_up=New_user(time=now,user_name=_reg_user_name,user_phone=_phone_number)
                    user_sign_up.save()
                try:
                    user_num1=New_user_number.objects.get(time=now.date())
                    user_num1.number+=1
                    user_num1.save()
                except:
                    user_num2=New_user_number(time=now.date(),number=1)
                    user_num2.save()

                u=User(user_name=_reg_user_name,password=_reg_password,user_phone=_phone_number,session_id='123')
                u.save()
                return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
            else:
                return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        return HttpResponse("手机号格式不正确")
    



def forget_password(request):
    '''忘记密码
    用于用户忘记密码通过手机验证码重新设置密码时
    @args
        str:phonenumber，
        str:password，
        str:auth_code
    @return: 
        bool:判断用户输入的验证码是否正确，如果正确，则找回新密码生效
    @date:
        2019-8-27
    '''
    response=HttpResponse()
    _phonenumber=request.POST.get("phone_number")
    _username=request.POST.get('user_name')
    _auth_code=request.POST.get("phone_code")
    _password=request.POST.get("password")
    if _phonenumber and _auth_code:
        try:
            user=User.objects.filter(user_phone=_phonenumber)[0]
        except:
            return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")
        if _phonenumber in code_dict2.keys():
            if code_dict2[_phonenumber]==_auth_code:
                u=User.objects.filter(user_phone=_phonenumber)[0]
                if _username == u.user_name:
                    u.password=_password
                    u.save()
                    return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
                else:
                    return HttpResponse(json.dumps({'is_success':'3'},ensure_ascii=False),content_type="application/json,charset=utf-8")
            else:
                return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")

def change_password(request):
    '''
    @args:
        _user_name:用户名
        _old_name:
        _new_password
        _cookie
    @return:
        result:is_success
    @date:
        2019-8-27
    '''
    _user_name=request.POST.get('change_user_name')
    _old_password=request.POST.get('change_password_1')
    _new_password=request.POST.get('change_password_2')
    _cookie=request.COOKIES.get('key')
    try:
        user=User.objects.filter(Q(user_name=_user_name)&Q(password=_old_password))[0]
        if user.session_id == _cookie:
            user.password=_new_password
            user.save()
            return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")

def admin_change_password(request):
    '''
    管理员修改密码
    @args:
        change_user_name
        change_password_1
        change_password_2
    @return:
        is_success
    @date:
        2019-8-28
    '''
    _user_name=request.POST.get('change_user_name')
    _old_password=request.POST.get('change_password_1')
    _new_password=request.POST.get('change_password_2')
    _cookie=request.COOKIES.get('key')
    try:
        admin=Admin.objects.filter(Q(admin_name=_user_name)&Q(password=_old_password))[0]
        if admin.session_id == _cookie:
            admin.password=_new_password
            admin.save()
            return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")

def query_prices(request):
    '''
    用户点击城市,地区,价格区间来显示该地区的房源
    @args:  str:city
            str:district
            date:time
            int:min
            int:max
    return json数据
            {'is_success':一个数字,0代表成功，1代表失败,houses:一个列表，包含符合条件的所有房源}
    @date:
        2019-8-29
    '''
    _city=request.POST.get('city')
    _page=int(request.POST.get('page'))
    _month=request.POST.get('month')

    _max_area=None
    _max_price=None
    _min_price=None
    _min_area=None
    _district=None

    if request.POST.get('district'):
        _district=request.POST.get('district')
    if request.POST.get('min_price'):
        _min_price=int(request.POST.get('min_price'))
    if request.POST.get('max_price'):
        _max_price=int(request.POST.get('max_price'))
    if request.POST.get('min_area'):
        _min_area=int(request.POST.get('min_area'))
    if request.POST.get('max_area'):
        _max_area=int(request.POST.get('max_area'))

    try:
        city_name=_city.split('市')[0]
        houses=list(House.objects.filter(city=city_name))
        length_1=len(houses)
        housess=[]
        if _min_price and _min_area:
            price=(_min_price+_max_price)/2*10000
            area=(_min_area+_max_area)/2
            average=price/area;
            _min_average=average+2000
            _max_average=average+5000

            _page_num=int(length_1/20+1)
            start=(_page-1)*20
            end=(_page-1)*20+20
            count=0
            for i in range(start,len(houses)):
                if houses[i].area and houses[i].total_price and houses[i].huxing_jiegou and houses[i].direction:
                    area_list=houses[i].area.split(';')
                    total_price_list=houses[i].total_price.split(';')
                    huxing_list=houses[i].house_type.split(';')
                    direction_list=houses[i].direction.split(';')
                else:
                    area_list=[]
                    total_price_list=[]
                    huxing_list=[]
                    direction_list=[]
                if int(houses[i].average_price)> int(_min_average) and int(houses[i].average_price)< int(_max_average):
                    if _district:
                        if _district==houses[i].district:
                            if len(area_list)>0:
                                house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                                housess.append(house_house)
                                count+=1
                                if count>19:
                                    break;
                            else:
                                house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                                housess.append(house_house)
                                count+=1
                                if count>19:
                                    break;
                    else:
                        if len(area_list)>0:
                            house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                            housess.append(house_house)
                            count+=1
                            if count>19:
                                break;
                        else:
                            house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                            housess.append(house_house)
                            count+=1
                            if count>19:
                                break;
                else:
                    pass
            city1=City_price.objects.filter(city=_city)
            city_city=[0]*12
            for city in city1:
                year=str(city.date).split('-')[0]
                if year=='2019':
                    month=int(str(city.date).split('-')[1])
                    city_city[month+2]=city.city_average
                elif year=='2018':
                    month=int(str(city.date).split('-')[1])
                    if month==10 or month==11 or month ==12:
                        city_city[month-10]=city.city_average
            result={'page_num':_page_num,'houses':housess,'one':city_city[0],'two':city_city[1],'three':city_city[2],'four':city_city[3],'five':city_city[4],'six':city_city[5],'seven':city_city[6],'eight':city_city[7],'nine':city_city[8],'ten':city_city[9],'eleven':city_city[10],'twelve':city_city[11]}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            _page_num=int(len(houses)/20+1)
            start=(_page-1)*20
            end=(_page-1)*20+20
            house_s=list(houses)
            housess=[]
            count=0
            for i in range(start,len(houses)):
                if houses[i].area and houses[i].total_price and houses[i].huxing_jiegou and houses[i].direction:
                        area_list=houses[i].area.split(';')
                        total_price_list=houses[i].total_price.split(';')
                        huxing_list=houses[i].house_type.split(';')
                        direction_list=houses[i].direction.split(';')
                else:
                    area_list=[]
                    total_price_list=[]
                    huxing_list=[]
                    direction_list=[]
                if _district:
                    if _district==houses[i].district:
                        if len(area_list)>0:
                            house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                            housess.append(house_house)
                            count+=1
                            if count>19:
                                break;
                        else:
                            house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                            housess.append(house_house)
                            count+=1
                            if count>19:
                                break;
                else:
                    if len(area_list)>0:
                        house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                        housess.append(house_house)
                        count+=1
                        if count>19:
                            break;
                    else:
                        house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                        housess.append(house_house)
                        count+=1
                        if count>19:
                            break;
            city1=City_price.objects.filter(city=_city)
            city_city=[0]*12
            for city in city1:
                year=str(city.date).split('-')[0]
                if year=='2019':
                    month=int(str(city.date).split('-')[1])
                    city_city[month+2]=city.city_average
                elif year=='2018':
                    month=int(str(city.date).split('-')[1])
                    if month==10 or month==11 or month ==12:
                        city_city[month-10]=city.city_average
            result={'page_num':_page_num,'houses':housess,'one':city_city[0],'two':city_city[1],'three':city_city[2],'four':city_city[3],'five':city_city[4],'six':city_city[5],'seven':city_city[6],'eight':city_city[7],'nine':city_city[8],'ten':city_city[9],'eleven':city_city[10],'twelve':city_city[11]}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    
def detail_info(request):
    '''
    用户查询某个具体的房源
    @args:
        id
    @return:
        is_success
    @date:
        2019-8-30
    '''

    _id=request.POST.get('id')
    try:
        house=House.objects.get(id=_id)
        if house.area:
            area_list=house.area.split(';')
        else:
            area_list=[]
        if house.total_price:
            total_price_list=house.total_price.split(';')
        else:
            total_price_list=[]
        if house.house_type:
            huxing_list=house.area.split(';')
        else:
            huxing_list=[]
        if house.direction:
            direction_list=house.area.split(';')
        else:
            direction_list=[]
        house_house={'id':house.id,'address':house.address,'firm_name':house.firm_name,'house_type':huxing_list,'average_price':house.average_price,'total_price':total_price_list,
                    'area':area_list,'height':house.height,'new':house.new,'elevator':house.elevator,'zhuangxiu':house.zhuangxiu,'date':str(house.date),
                    'district':house.district,'direction':direction_list,'huxing_jiegou':house.huxing_jiegou,'jianzhuleixing':house.jianzhuleixing,'nianxian':house.nianxian,
                    'tihu_bili':house.tihu_bili,'zhuangxiu':house.zhuangxiu,'kaipan_shijian':house.kaipan_shijian,'city':house.city}
        result={'is_success':'0','house':house_house}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1','house':''}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

                  
def contrast_house(request):
    '''
    用户对比房源
    @args:
        id
    @return
        result={'is_success':'','house'}
    @date:
        2019-9-1
    '''
    _ids = request.POST.getlist('id')  
    length=int(len(_ids))
    house_list=[]
    for _id in _ids:
        try:
            house=House.objects.get(id=_id)
            if house.area:
                area_list=house.area.split(';')
            else:
                area_list=[]
            if house.total_price:
                total_price_list=house.total_price.split(';')
            else:
                total_price_list=[]
            if house.house_type:
                huxing_list=house.area.split(';')
            else:
                huxing_list=[]
            if house.direction:
                direction_list=house.area.split(';')
            else:
                direction_list=[]
            house_house={'id':house.id,'address':house.address,'firm_name':house.firm_name,'house_type':huxing_list,'average_price':house.average_price,'total_price':total_price_list,
                        'area':area_list,'height':house.height,'new':house.new,'elevator':house.elevator,'zhuangxiu':house.zhuangxiu,'date':str(house.date),
                        'district':house.district,'direction':direction_list,'huxing_jiegou':house.huxing_jiegou,'jianzhuleixing':house.jianzhuleixing,'nianxian':house.nianxian,
                        'tihu_bili':house.tihu_bili,'zhuangxiu':house.zhuangxiu,'kaipan_shijian':house.kaipan_shijian,'city':house.city}
            house_list.append(house_house)
        except:
            pass
    result={'is_success':'0','house':house_list}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            

def contrast_city(request):
    '''
    用户点击房价对比，选择城市来来显对比示某年的区域价格随月份的趋势
    @args:  str:year
            list:['城市名']

    @return 
        {city_name:[该年的所有月份数据]}

    @date:
        2019-9-2
    '''
    _year=request.POST.get('year')
    _city=request.POST.get('city_name').split('市')[0]
    city1=City_price.objects.filter(city=_city)
    city_city=[0]*12
    for city in city1:
        year=str(city.date).split('-')[0]
        if _year==year:
            month=int(str(city.date).split('-')[1])
            city_city[month-1]=city.city_average

    result={'one':city_city[0],'two':city_city[1],'three':city_city[2],'four':city_city[3],'five':city_city[4],'six':city_city[5],'seven':city_city[6],'eight':city_city[7],'nine':city_city[8],'ten':city_city[9],'eleven':city_city[10],'twelve':city_city[11]}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def contrast_district(request):
    '''
    用户点击房价对比，选择城市来来显对比示某年的区域价格随月份的趋势
    @args:  date:year
            list:['区域名']

    @return 
        {district_name:[该年的所有月份数据]}
    @date:
        2019-9-3
    '''
    _year=request.POST.get('year')
    _district=request.POST.get('region_name').split('区')[0]
    district1=District_price.objects.filter(district=_district)
    dis_dis=[0]*12
    for district in district1:
        year=str(district.date).split('-')[0]
        if _year==year:
            month=int(str(district.date).split('-')[1])
            dis_dis[month-1]=district.district_average
    result={'one':dis_dis[0],'two':dis_dis[1],'three':dis_dis[2],'four':dis_dis[3],'five':dis_dis[4],'six':dis_dis[5],'seven':dis_dis[6],'eight':dis_dis[7],'nine':dis_dis[8],'ten':dis_dis[9],'eleven':dis_dis[10],'twelve':dis_dis[11]}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def district_in_city(request):
    '''
    对比一个城市的区域房价
    @args:
        year
        city_name
    @return:
        result={'info':dis_dis}
    @date:
        2019-9-2
    '''

    _year=request.POST.get('year')
    _city=request.POST.get('city_name').split('市')[0]
    _districts=District_price.objects.filter(city=_city)
    dis_dis=[]
    price=[]
    for district1 in _districts:
        year=str(district1.date).split('-')[0]
        month=int(str(district1.date).split('-')[1])
        if _year==year and month==1:
            dis_dis.append({'district':district1.district,'price':district1.district_average})

    result={'info':dis_dis}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def user_session(request):
    _session_id=request.COOKIES.get('key')
    try:
        user=User.objects.filter(session_id=_session_id)[0]
        result={'is_success':'0'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def add_collection(request):
    '''
    用户点击房源的收藏按钮来将该房源收藏到个人收藏夹
    @args:  
        int:id
        cookie
    @return:
        return is_success
    @date:
        2019-9-3
    '''
    _id=request.POST.get('id')
    _session_id=request.COOKIES.get('key')
    try:
        user=User.objects.filter(session_id=_session_id)[0]
        collections=user.collection.split(';')
        collections.append(_id)
        collections=';'.join(collections)
        user.collection=collections
        user.save()
        return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")

def delete_collection(request):
    '''
    用户点击删除按钮来删除收藏的房源
    @args: int:id
            cookie
    @return:
        return json is_success
    @date:
        2019-9-4
    '''
    _id=request.POST.get('id')
    _session_id=request.COOKIES.get('key')
    try:
        user=User.objects.filter(session_id=_session_id)[0]
        collections=user.collection.split(';')
        collections.remove(_id)
        collections=';'.join(collections)
        user.collection=collections
        user.save()
        return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")


def show_collection(request):
    '''
    用户显示收藏夹内容
    @args:
        key
    @return:
        list
    @date:
        2019-9-5
    '''
    _session_id=request.COOKIES.get('key')
    user=User.objects.filter(session_id=_session_id)[0]
    collections=user.collection.split(';')
    l=len(collections)
    house_collections=[]
    try:
        for i in range(1,l):
            house=House.objects.get(id=int(collections[i]))
            if house.area:
                area_list=house.area.split(';')
            else:
                area_list=['无']
            if house.total_price:
                total_price_list=house.total_price.split(';')
            else:
                total_price_list=['无']
            if house.house_type:
                huxing_list=house.area.split(';')
            else:
                huxing_list=['无']
            if house.direction:
                direction_list=house.area.split(';')
            else:
                direction_list=['无']
            house_house={'id':house.id,'firm_name':house.address,'house_type':huxing_list[0],'average_price':house.average_price,'total_price':total_price_list[0],'area':area_list[0],'height':house.height,'new':house.new,'elevator':house.elevator,'zhuangxiu':house.zhuangxiu}
            house_collections.append(house_house)           
        result={'is_success':'0','house':house_collections}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        result={'is_success':'1','house':[]}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def admin_show_collection(request):
    '''
    管理员显示收藏夹内容
    @args:
        key
    @return:
         list
    @date:
        2019-9-5
    '''
    _session_id=request.COOKIES.get('key')
    admin=Admin.objects.filter(session_id=_session_id)[0]
    collections=admin.collection.split(';')
    l=len(collections)
    house_collections=[]
    try:
        for i in range(1,l):
            house=House.objects.get(id=int(collections[i]))
            if house.area:
                area_list=house.area.split(';')
            else:
                area_list=['无']
            if house.total_price:
                total_price_list=house.total_price.split(';')
            else:
                total_price_list=['无']
            if house.house_type:
                huxing_list=house.area.split(';')
            else:
                huxing_list=['无']
            if house.direction:
                direction_list=house.area.split(';')
            else:
                direction_list=['无']
            house_house={'id':house.id,'firm_name':house.address,'house_type':huxing_list[0],'average_price':house.average_price,'total_price':total_price_list[0],'area':area_list[0],'height':house.height,'new':house.new,'elevator':house.elevator,'zhuangxiu':house.zhuangxiu}
            house_collections.append(house_house)           
        result={'is_success':'0','house':house_collections}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        result={'is_success':'1','house':[]}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def admin_sign_in(request):
    '''
    管理员通过用户名密码登录
    @args:  str:admin_name
            str:password
    @return:
        is_success
    @date:
        2019-9-6
    '''
    _admin_name=request.POST.get('admin_name')
    _password=request.POST.get('admin_password')
    if _admin_name and _password:
        try:
            admin=Admin.objects.filter(admin_name=_admin_name)[0]
        except:
            result={'is_success':'1','admin':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if admin.password==_password:
            admin_admin={'admin_name':admin.admin_name,'id':admin.id}
            result={'is_success':'0','admin':admin_admin}
            response=HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            cookie_key='key'
            cookie_value='cookie1'+str(datetime.datetime.now())+'1uiwegfig'
            response.set_cookie(cookie_key,cookie_value)
            admin.session_id=cookie_value
            admin.save()
            return response
        else:
            result={'is_success':'2','admin':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def admin_session(request):
    '''
    检测管理员登录
    @args:
        key
    @reuturn:
        Integer
    @date:
        2019-9-6
    '''
    _session_id=request.COOKIES.get('key')
    try:
        admin=Admin.objects.filter(session_id=_session_id)[0]
        return HttpResponse('0')
    except:
        return HttpResponse('1')

def add_house_info(request):
    '''
    管理员添加
    @return:
        is_success
    @date:
        2019-9-7
    '''
    _city=request.POST.get('city')
    _address=request.POST.get('address')
    _firm_name=request.POST.get('firm_name')
    _house_type=request.POST.get('house_type')
    _average_price=int(request.POST.get('average_price'))
    _area=int(request.POST.get('area'))
    _total_price=int(request.POST.get('total_price'))
    _date=request.POST.get('date')
    _district=request.POST.get('district')
    _direction=request.POST.get('direction')
    _elevator=request.POST.get('elevator')
    _height=request.POST.get('height')
    _huxing_jiegou=request.POST.get('huxing_jiegou')
    _jianzhuleixing=request.POST.get('jianzhuleixing')
    _new=int(request.POST.get('new_h'))
    _nianxian=request.POST.get('nianxian')
    _tihu_bili=request.POST.get('tihu_bili')
    _zhuangxiu=request.POST.get('zhuangxiu')
    _kaipan_shijian=request.POST.get('kaipan_shijian')
    try:
        house=House(city=_city,address=_address,firm_name=_firm_name,house_type=_house_type,average_price=_average_price,
                area=_area,total_price=_total_price,date=_date,district=_district,elevator=_elevator,height=_height,
                huxing_jiegou=_huxing_jiegou,jianzhuleixing=_jianzhuleixing,new=_new,nianxian=_nianxian,tihu_bili=_tihu_bili,
                zhuangxiu=_zhuangxiu,kaipan_shijian=_kaipan_shijian)
        house.save()
        result={'is_success':'0'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        result={'is_success':'1'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def admin_show_house(request):
    '''
    管理员显示房源
    @args:
        district
    @return:
        list
    @date:
        2019-9-7
    '''
    _city=request.POST.get('city')
    _page=int(request.POST.get('page'))
    _month=request.POST.get('month')

    _district=None

    if request.POST.get('district'):
        _district=request.POST.get('district')
    try:
        city_name=_city.split('市')[0]
        houses=list(House.objects.filter(city=city_name))
        length_1=len(houses)

        housess=[]
        _page_num=int(len(houses)/20+1)
        start=(_page-1)*20
        end=(_page-1)*20+20
        house_s=list(houses)
        housess=[]
        for i in range(start,min(len(houses),end)):
            if houses[i].area and houses[i].total_price and houses[i].huxing_jiegou and houses[i].direction:
                    area_list=houses[i].area.split(';')
                    total_price_list=houses[i].total_price.split(';')
                    huxing_list=houses[i].house_type.split(';')
                    direction_list=houses[i].direction.split(';')
            else:
                area_list=[]
                total_price_list=[]
                huxing_list=[]
                direction_list=[]
            if _district:
                if _district==houses[i].district:
                    if len(area_list)>0:
                        house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                        housess.append(house_house)
                    else:
                        house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                        housess.append(house_house)
            else:
                if len(area_list)>0:
                    house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':huxing_list[0],'average_price':houses[i].average_price,'total_price':total_price_list[0],'area':area_list[0],'height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu} 
                    housess.append(house_house)
                else:
                    house_house={'id':houses[i].id,'firm_name':houses[i].address,'house_type':'','average_price':houses[i].average_price,'total_price':'','area':'','height':houses[i].height,'new':houses[i].new,'elevator':houses[i].elevator,'zhuangxiu':houses[i].zhuangxiu}
                    housess.append(house_house)
        city1=[21000,20000,24000,26000,25400,26000,25300,26900,26300,25900,26900,27100]
        result={'page_num':_page_num,'houses':housess,'one':city1[0],'two':city1[1],'three':city1[2],'four':city1[3],'five':city1[4],'six':city1[5],'seven':city1[6],'eight':city1[7],'nine':city1[8],'ten':city1[9],'eleven':city1[10],'twelve':city1[11]}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    

def search_house_info(request):
    '''
    管理员搜索房源
    @date:
        2019-9-8
    '''
    _year=request.POST.get('year')
    _city=request.POST.get('city')
    _district=request.POST.get('district')
    _key=request.POST.get('key')
    house_house=[]
    if _district=='':
        houses=House.objects.filter(city=_city)
        for house in houses:
            year=house.date.split('-')[0]
            if year==_year:
                if _key:
                    if re.search(_key,house.firm_name):
                        house_s={'firm_name':house.firm_name,'total_price':house.total_price}
                        house_house.append(house_s)
                    elif re.search(_key,house.address): 
                        house_s={'firm_name':house.address,'total_price':house.total_price}
                        house_house.append(house_s)
                    else:
                        pass
                else:
                    house_s={'firm_name':house.firm_name,'total_price':house.total_price}
                    house_house.append(house_s)
            else:
                pass
        result={'house':house_house}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        houses=House.objects.filter(city=_city)
        for house in houses:
            year=house.date.split('-')[0]
            if year==_year:
                if _key:
                    if re.search(_key,house.firm_name):
                        house_s={'firm_name':house.firm_name,'total_price':house.total_price}
                        house_house.append(house_s)
                    elif re.search(_key,house.address): 
                        house_s={'firm_name':house.address,'total_price':house.total_price}
                        house_house.append(house_s)
                    else:
                        pass
                else:
                    house_s={'firm_name':house.firm_name,'total_price':house.total_price}
                    house_house.append(house_s)
            else:
                pass  
        result={'house':house_house}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")



def delete_house_info(request):
    '''
    @args   
        int:id
    @return:
        is_success
    @date:
        2019-9-8
    '''
    _id=request.POST.get(_id)
    try:
        house=House.objects.get(_id)
        house.delete()
        result={'is_success':'0'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def add_district_price(request):
    '''
    @date:
        2019-9-8
    '''
    _city=request.POST.get('city')
    _district=request.POST.get('country')
    _district_average=request.POST.get('admin_change_house')
    _year=request.POST.get('time')
    _month=request.POST.get('month')
    if _district:
        try:
            district=District_price(district=_district,district_average=_district_average,date=_year+'-'+_month+'-1')
            district.save()

            result={'is_success':'0'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        except:
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        try:
            city=City_price(city=_city,city_average=_district_average,date=_year+'-'+_month+'-1')
            city.save()
            result={'is_success':'0'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        except:
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
   

def delete_district_price(request):
    '''
    @date:
        2019-9-8
    '''
    _year=request.POST.get('time')
    _month=int(request.POST.get('month'))
    _district=request.POST.get('country')
    _city=request.POST.get('city')
    if _district:
        try:
            district_s=_district.split('区')[0]

            district_prices=District_price.objects.filter(district=district_s)   
            for district_price in district_prices:
                year=str(district_price.date).split('-')[0]
                if _month:
                    month=int(str(district_price.date).split('-')[1])
                    if _year==year and _month==month:
                        district_price.delete()
                        result={'is_success':'0'}
                        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
                else:
                    if _year==year:
                        district_price.delete()
                        result={'is_success':'0'}
                        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        except:
            traceback.print_exc()
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        try:
            city_s=_city.split('市')[0]

            city_prices=City_price.objects.filter(city=city_s)[0]
            for city_price in city_prices:
                year=str(city_price.date).split('-')[0]
                if _month:
                    month=int(city_price.date.split('-')[1])
                    if _year==year and _month==month:
                        city_price.delete()
                        result={'is_success':'0'}
                        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
                else:
                    if _year==year:
                        city_price.delete()
                        result={'is_success':'0'}
                        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        except:
            traceback.print_exc()
            result={'is_success':'1'}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def add_city_price(request):
    '''
    @date:
        2019-9-8
    '''
    _city=request.POST.get('city')
    _city_average=request.POST.get('city_average')
    _date=request.POST.get('date')
    try:
        city=City_price(city=_city,city_average=_city_average,date=_date)
        city.save()
        result={'is_success':'0'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def delete_city_price(request):
    '''
    @date:
        2019-9-8
    '''
    _id=request.POST.get(_id)
    _date=request.POST.get('date')
    _city=request.POST.get('city')
    try:
        city_price=City_price.objects.filter(Q(city=_city)&Q(date=_date))[0]
        city_price.delete()
        result={'is_success':'0'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1'}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def new_sign_up_list(request):
    '''
    @args:   
    @return: 新增注册
    @date:
        2019-9-9
    '''
    users=list(New_user.objects.all())[-3:]
    now=datetime.datetime.now()
    first_delt=str(now-users[2].time.replace(tzinfo=None))
    second_delt=str(now-users[1].time.replace(tzinfo=None))
    third_delt=str(now-users[0].time.replace(tzinfo=None))

    first_time=first_delt.split(":")
    first={'hour':first_time[0],'minute':first_time[1],'user_name':users[2].user_name,'user_phone':users[2].user_phone}
    second_time=second_delt.split(":")
    second={'hour':second_time[0],'minute':second_time[1],'user_name':users[1].user_name,'user_phone':users[1].user_phone}
    third_time=third_delt.split(":")
    third={'hour':third_time[0],'minute':third_time[1],'user_name':users[0].user_name,'user_phone':users[0].user_phone}
    result={'first':first,'second':second,'third':third}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def new_sign_in_list(request):
    '''
    @date:
        2019-9-8
    '''
    users=list(Visitor.objects.all())[-3:]
    now=datetime.datetime.now()
    first_delt=str(now-users[2].time.replace(tzinfo=None))
    second_delt=str(now-users[1].time.replace(tzinfo=None))
    third_delt=str(now-users[0].time.replace(tzinfo=None))
    first_time=first_delt.split(":")
    first={'hour':first_time[0],'minute':first_time[1],'user_name':users[2].user_name,'user_phone':users[2].user_phone}
    second_time=second_delt.split(":")
    second={'hour':second_time[0],'minute':second_time[1],'user_name':users[1].user_name,'user_phone':users[1].user_phone}
    third_time=third_delt.split(":")
    third={'hour':third_time[0],'minute':third_time[1],'user_name':users[0].user_name,'user_phone':users[0].user_phone}
    result={'first':first,'second':second,'third':third}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def new_sign_up(request):
    '''
    @return 新增用户趋势
    '''
    new_sign=list(New_user_number.objects.all())
    new=[]
    for i in range(0,12):
        try:
            new.insert(0,new_sign[-1-i].number)
        except:
            new.insert(0,0)
    result={'new':new}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def new_sign_in(request):
    '''
    @return list
    @date:
        2019-9-7
    '''
    new_sign=list(Visitor_number.objects.all())
    new=[]
    for i in range(0,12):
        try:
            new.insert(0,new_sign[-1-i].number)
        except:
            new.insert(0,0)
    result={'new':new}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def search_member(request):
    '''
    @args: 
        str:search_phone
    @return 
        is_success
    @date:
        2019-9-7
    '''
    _search_phone=request.POST.get('search_phone')
    try:
        user=User.objects.filter(Q(user_phone=_search_phone)|Q(user_name=_search_phone))[0]
        time_s=str(Visitor.objects.filter(Q(user_phone=_search_phone)|Q(user_name=_search_phone))[0].time).split('.')[0]
        user_user={'user_name':user.user_name,'user_phone':user.user_phone,'time':time_s}
        result={'is_success':'0','user':user_user}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        result={'is_success':'1','user':''}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def add_users(request):
    '''
    管理员增加用户
    @args:
        add_user
        add_phone
        add_password
    @return:
        is_success
    @date:
        2019-9-8
    '''
    _user_name=request.POST.get('add_user')
    _user_phone=request.POST.get('add_phone')
    _password=request.POST.get('add_password')
    try:
        user_s=User.objects.filter(user_name=_user_name)[0]
        return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        u=User(user_name=_user_name,user_phone=_user_phone,password=_password,session_id='123')
    try:
        u.save()
        return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")

def delete_users(request):
    '''
    @return 
        0,1
    @date:
        2019-9-8
    '''
    _user_name=request.POST.get('search_user')
    try:
        u=User.objects.filter(user_name=_user_name)[0]
        u.delete()
        return HttpResponse(json.dumps({'is_success':'0'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")


def house_forecast(request):
    '''
    用户进行房价预测
    @args:
        for_year
        for_month
        confidence
    @return:
        list1,list2,list3
    @date:
        2019-9-9
    '''

    _year=int(request.POST.get('for_year'))
    _month=int(request.POST.get('for_month'))
    _district=request.POST.get('country')
    if request.POST.get('confidence'):
        _confidence=float(request.POST.get('confidence'))
    len=_year*4+_month/3
    
    district1=_district.split('区')[0]
    try:
        district_price=District_price.objects.filter(district=district1)
        dis_dis={}
        dis_dis_dis={}
        for district_1 in district_price:
            year=str(district_1.date).split('-')[0]
            month=str(district_1.date).split('-')[1]
            date=int(year+month)
            dis_dis[date]=district_1.district_average
            if int(year)>2018:
                dis_dis_dis[date]=district_1.district_average
        keys=sorted(dis_dis)
        values=[]
        for key in keys:
            values.append(dis_dis[key])
        if request.POST.get('confidence'):
            forecast=model.price_forecast(values,int(len)*3,float(request.POST.get('confidence')))
        else:
            forecast=model.price_forecast(values,int(len)*3,0.95)
        forecast_ss=forecast.to_json()
        forecast_s=json.loads(forecast_ss)
        first=[]
        second=[]
        third=[]
        dic_first=list(forecast_s['0'].values())
        dic_second=list(forecast_s['1'].values())
        dic_third=list(forecast_s['2'].values())
        for i in range(0,int(len)*3):
            if i % 3 ==0:
                first.append(int(dic_first[i]))
                second.append(int(dic_second[i]))
                third.append(int(dic_third[i]))
        result={'is_success':'0','first':first,'second':second,'third':third}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    except:
        traceback.print_exc()
        result={'is_success':'1','first':[],'second':[],'third':[]}
        return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")