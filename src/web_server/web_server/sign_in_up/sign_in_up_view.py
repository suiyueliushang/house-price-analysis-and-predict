from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .. import dbconnect


@csrf_exempt
def sign_up_by_password(request):
    '''登录传输的用户名和密码
    @arg：str:request.post[user_name]
          str:request.post[password]
          
    @return : sessionid 为空表示用户名或密码错误
    @date:2019.8.25
    '''
    print("用户名："+request.POST.get('user_name'))
    print('密码：'+request.POST.get('password'))
    return HttpResponse('hello,world')

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
def sign_up_by_phone_number(request):
    '''手机号登录
    传递一个正确的11位中国大陆手机号码，和用户出入的验证码
        @args：phonenumber，auth_code
        @return：sessionid，为空，则表示用户输入验证码错误
    '''

def sign_in(request):
    '''注册
    传递用户名，手机号，还有密码,验证码
    @args：user_name,phone_number,password,auth_code
    @return bool，判断用户验证码是否正确
    '''
