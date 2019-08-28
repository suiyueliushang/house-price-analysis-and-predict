from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .. import dbconnect



def sign_in_by_password(request):
    '''登录传输的用户名和密码
    @arg：str:request.post[user_name]
          str:request.post[password]
          
    @return : sessionid 为空表示用户名或密码错误
    @date:2019.8.25
    '''
    print("用户名："+str(request.POST.get('user_name')))
    print('密码：'+str(request.POST.get('password')))
    return HttpResponse('1')

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
        @args：phone_number，auth_code
        @return：sessionid，为空，则表示用户输入验证码错误
        '''    
    print("用户名："+str(request.POST.get('phone_number')))
    print('密码：'+str(request.POST.get('password')))
    return HttpResponse('hello,world')


def sign_up(request):
    '''注册
    传递用户名，手机号，还有密码,验证码
    @args：reg_user_name,reg_phone_number,reg_password,reg_auth_code
    @return bool，判断用户验证码是否正确
    '''
    print("用户名："+str(request.POST.get('reg_user_name')))
    print("手机号："+str(request.POST.get('reg_phone_number')))
    print('密码：'+str(request.POST.get('reg_password')))
    return HttpResponse('hello,world')

def forget_password(request):
    '''忘记密码
    用于用户忘记密码通过手机验证码重新设置密码时
    @args:str:phonenumber，
        str:password，
        str:auth_code
    @return: bool,判断用户输入的验证码马是否正确，如果正确，则找回新密码生效
    @date:
    '''
