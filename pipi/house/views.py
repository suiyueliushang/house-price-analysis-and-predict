﻿from django.shortcuts import render
from .models import User
from .models import House
from .models import City
from django.http import HttpResponse
from django.http import JsonResponse
from . import test
import random
import json

code_dict1={'17714209247':'7777'}
code_dict2={'17714209247':'3333'}

def sign_in_by_password(request):
    '''登录传输的用户名和密码
    @arg：str:request.post[user_name]
          str:request.post[password]
          
    @return : sessionid 为空表示用户名或密码错误
    @date:2019.8.25
    '''
    username=request.POST.get('user_name')
    password=request.POST.get('password')
    response=HttpResponse()
    print(request.POST)
    print("用户名："+str(username))
    print('密码：'+str(password))
    users=User.objects.all()
    print(users)
    if username and password:
        try:
            user=User.objects.get(user_name=username)
        except:
            result={'is_success':'1','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if user.password==password:
            response.set_cookie("text","cookie11")
            user_user={'user_name':user.user_name,'id':user.session_id}
            result={'is_success':'0','user':user_user}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        else:
            result={'is_success':'2','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def is_resgistered_phone(request):
    '''注册和登录时使用
    传手机号码，判断用户是否已经注册过
    @args:phonenumber
    @return bool手机号是否被注册过
    @date:2019.8.25
    '''

def is_resgistered_username(request):
    '''判断用户名是否被注册过
    @args：user_name
    @return:bool 
    '''

def sign_in_by_phone_number(request):
    '''手机号登录
    传递一个正确的11位中国大陆手机号码，和用户出入的验证码
        @args：phonenumber，auth_code
        @return：sessionid，为空，则表示用户输入验证码错误
    '''
    response=HttpResponse()
    _phonenumber=request.POST.get("phone_number")
    _auth_code=request.POST.get("phone_code")
    print(code_dict2)
    print(_phonenumber)
    print(_auth_code)
    if _phonenumber and _auth_code:
        try:
            user=User.objects.get(user_phone=_phonenumber)
        except:
            result={'is_success':'1','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if code_dict2[_phonenumber]==_auth_code:
            response.set_cookie("text","cookie11")
            user_user={'user_name':user.user_name,'id':user.session_id}
            result={'is_success':'0','user':user_user}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        else: 
            result={'is_success':'2','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        return HttpResponse('格式错误')


def reg_phone_number(request):
    '''发送验证码
    传递一个正确的11位中国大陆手机号码
        @args:phonenumber
        @return:auth_code
    '''

    _phone_number=request.POST.get('phone_number')
    #print(request.POST)
    #print(request)
    #print(str(_phone_number))
    code=str(random.randint(1000,9999))
    test.auth_code(str(_phone_number),code)
    code_dict1[_phone_number]=code
    return HttpResponse("0")

def get_auth_code(request):
    '''
    用户忘记密码时获取验证码
    发送验证码
    传递一个正确的11位中国大陆手机号码
        @args:phonenumber
        @return:auth_code
    '''
    _phone_number=request.POST.get('phone_number')
    print(request.POST)
    print(request)
    print(str(_phone_number))
    users=User.objects.all()
    print(users[3].user_phone)
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
    @args：reg_user_name,reg_phone_number,reg_password,reg_auth_code
    @return bool，判断用户验证码是否正确
    '''
    _phone_number=request.POST.get('phone_number')
    _auth_code=request.POST.get('reg_phone_code')
    print(request.POST)
    print(code_dict1)
    response=HttpResponse()
    if _phone_number.strip() and _auth_code:
        if _phone_number in code_dict1.keys():
            if code_dict1[_phone_number]==_auth_code:
                _reg_user_name=request.POST.get('reg_user_name')
                _reg_password=request.POST.get('reg_password')
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
    @args:str:phonenumber，
        str:password，
        str:auth_code
    @return: bool,判断用户输入的验证码是否正确，如果正确，则找回新密码生效
    @date:
    '''
    response=HttpResponse()
    _phonenumber=request.POST.get("phone_number")
    _username=request.POST.get('user_name')
    _auth_code=request.POST.get("phone_code")
    _password=request.POST.get("password")
    print(code_dict2)
    if _phonenumber and _auth_code:
        try:
            user=User.objects.filter(user_phone=_phonenumber)[0]
        except:
            print(2)
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
            print(22)
            return HttpResponse(json.dumps({'is_success':'2'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    else:
        print(222)
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
    '''
    _city=request.POST.get('city')
    _district=request.POST.get('district')
    _date=request.POST.get('date')
    _min=request.POST.get('min')
    _max=request.POST.get('max')
    try:
        houses=House.objects.filter(city=_city,district=_district)
    except:
        return HttpResponse(json.dumps({'is_success':'1'},ensure_ascii=False),content_type="application/json,charset=utf-8")
    for house in houses:
        if house.price > max or house.price < min:
            houses.remove(house)
        else:
            pass
    result={'is_success':0,'houses':houses}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def contrast_city(request):
    '''
    用户点击房价对比，选择城市来来显对比示某年的区域价格随月份的趋势
    @args:  str:year
            list:['城市名']

            return {city_name:[该年的所有月份数据]}
    '''
    _year=request.POST.get('year')
    _city=request.POST.get('city_name')#_city是一个list
    print(_year,_city)
    #city1=City.objects.filter(city='nanjing')
    city1=[21000,20000,24000,26000,25400,26000,25300,26900,26300,25900,26900,27100]
    #result={'one':city1[0].average_price,'two':city1[1].average_price,'three':city1[2].average_price,'four':city1[3].average_price,'five':city1[4].average_price,'six':city1[5].average_price,'seven':city1[6].average_price,'eight':city1[7].average_price,'nine':city1[8].average_price,'ten':city1[9].average_price,'eleven':city1[10].average_price,'twelve':city1[11].average_price}
    result={'one':city1[0],'two':city1[1],'three':city1[2],'four':city1[3],'five':city1[4],'six':city1[5],'seven':city1[6],'eight':city1[7],'nine':city1[8],'ten':city1[9],'eleven':city1[10],'twelve':city1[11]}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")

def contrast_district(request):
    '''
    用户点击房价对比，选择城市来来显对比示某年的区域价格随月份的趋势
    @args:  date:year
            list:['区域名']

            return {district_name:[该年的所有月份数据]}
    '''
    _year=request.POST.get('year')
    _district=request.POST.get('city_name')#_city是一个list
    print(_year,_district)
    #city1=City.objects.filter(city='nanjing')
    city1=[21000,20000,240000,26000,254000,26000,253000,269000,26300,259000,269000,27100]
    #result={'one':city1[0].average_price,'two':city1[1].average_price,'three':city1[2].average_price,'four':city1[3].average_price,'five':city1[4].average_price,'six':city1[5].average_price,'seven':city1[6].average_price,'eight':city1[7].average_price,'nine':city1[8].average_price,'ten':city1[9].average_price,'eleven':city1[10].average_price,'twelve':city1[11].average_price}
    result={'one':city1[0],'two':city1[1],'three':city1[2],'four':city1[3],'five':city1[4],'six':city1[5],'seven':city1[6],'eight':city1[7],'nine':city1[8],'ten':city1[9],'eleven':city1[10],'twelve':city1[11]}
    return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")


def province_average(request):
    '''
    用户点击省份来显示近几个月的房价走势
    @args:  str:province
    '''


def city_average(request):
    '''
    用户点击城市来显示近几个月的房价走势
    @args:  str:city
    '''

def district_average(request):
    '''
    用户点击区域来显示近几个月的房价走势
    @args:  str:district
    '''

def add_collection(request):
    '''
    用户点击房源的收藏按钮来将该房源收藏到个人收藏夹
    @args:  int:id
            cookie
    '''

def delete_collection(request):
    '''
    用户点击删除按钮来删除收藏的房源
    @args: int:id
            cookie
    '''

def admin_sign_in(request):
    '''
    管理员通过用户名密码登录
    @args:  str:admin_name
            str:password
    '''

def add_house_info(request):
    '''
    管理员添加

'''
'''
    return
def login(request):
    #user_name=request.pos
    return HttpResponse('login')

def index(request):
    u=User(user_name='1234',password='1234',user_phone='123',user_mail='123',session_id='123')
    print(u,'1123123')
    u.save()
    return HttpResponse('sucess')

def first(request):
    context={}
    return HttpResponse("helloworld")
    '''

def index(request):
    c1=City(city="nanjing",average_price=25000,year='2018',month='1')
    c2=City(city="nanjing",average_price=25000,year='2018',month='2')
    c3=City(city="nanjing",average_price=25000,year='2018',month='3')
    c4=City(city='nanjing',average_price=25000,year='2018',month='4')
    c5=City(city='nanjing',average_price=25000,year='2018',month='5')
    c6=City(city='nanjing',average_price=25000,year='2018',month='6')
    c7=City(city='nanjing',average_price=25000,year='2018',month='7')
    c8=City(city='nanjing',average_price=25000,year='2018',month='8')
    c9=City(city='nanjing',average_price=25000,year='2018',month='9')
    c10=City(city='nanjing',average_price=25000,year='2018',month='10')
    c11=City(city='nanjing',average_price=25000,year='2018',month='11')
    c12=City(city='nanjing',average_price=25000,year='2018',month='12')
    print(c1,'1')
    c1.save()
    c2.save()
    c3.save()
    c4.save()
    c5.save()
    c6.save()
    c7.save()
    c8.save()
    c9.save()
    c10.save()
    c11.save()
    c12.save()
    return HttpResponse('sucess')