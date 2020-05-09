#!/usr/bin/env python
#coding=utf-8

from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
client = AcsClient('********', '***********************', 'default')

def auth_code(phonenumber,code):
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('dysmsapi.aliyuncs.com')
    request.set_method('POST')
    request.set_protocol_type('https') # https | http
    request.set_version('2017-05-25')
    request.set_action_name('SendSms')

    request.add_query_param('RegionId', "default")
    #要发送的手机号
    request.add_query_param('PhoneNumbers', phonenumber)
    request.add_query_param('SignName', "PPHouse")
    request.add_query_param('TemplateCode', "SMS_172883971")
    #发送的验证码
    request.add_query_param('TemplateParam', {"code":code})

    response = client.do_action(request)
    # python2:  print(response) 
    print(str(response, encoding = 'utf-8'))
