from django.shortcuts import render
from .models import User
from django.http import HttpResponse
from django.http import JsonResponse
from . import test
import random
import json

code_dict={}

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
    _phonenumber=request.POST.get("phonenumber")
    _auth_code=request.POST.get("auth_code")
    print(code_dict)
    if _phonenumber and _auth_code:
        try:
            user=User.objects.get(user_phone=_phonenumber)
        except:
            result={'is_success':'1','user':''}
            return HttpResponse(json.dumps(result,ensure_ascii=False),content_type="application/json,charset=utf-8")
        if code_dict[_phonenumber]==_auth_code:
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
    print(request.POST)
    print(request)
    print(str(_phone_number))
    code=str(random.randint(1000,9999))
    test.auth_code(str(_phone_number),code)
    code_dict[_phone_number]=code
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
    print(code_dict)
    response=HttpResponse()
    if _phone_number.strip() and _auth_code:
        if _phone_number in code_dict.keys():
            if code_dict[_phone_number]==_auth_code:
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
    @return: bool,判断用户输入的验证码马是否正确，如果正确，则找回新密码生效
    @date:
    '''
    response=HttpResponse()
    _phonenumber=request.POST.get("phonenumber")
    _auth_code=request.POST.get("_auth_code")
    _password=request.POST.get("password")
    if _phonenumber and _auth_code:
        if code_dict.has_key(_phonenumber):
            if code_dict[_phonenumber]==_auth_code:
                response.write('修改密码成功')
                u=User.obiects.get(user_phone=_phonenumber)
                u.password=_password
                u.save()
                return response
            else:
                response.write('验证码错误')
                return response
        else:
            response.write('验证码错误')
            return response
    else:
        response.write('格式错误')
        return response

def query_prices(request):
    '''
    用户点击城市,地区,价格区间来显示该地区的房源
    @args:  str:ciy
            str:district
            date:time
            int:min
            int:max
    '''

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