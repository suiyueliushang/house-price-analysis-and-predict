## web前后端接口
>使用说明：前端使用接口时，url='/+函数名',参数名需与函数中参数名保持一致，否则后端无法解析

#### 登录&&注册：
```python
def sign_up_by_password(request):
    '''登录传输的用户名和密码
    @arg：str:request.post[user_name]
          str:request.post[password]
          
    @return : sessionid 为空表示用户名或密码错误
    '''

def is_resgistered(request):
    '''注册和登录时使用
    传手机号码，判断用户是否已经注册过
    @args:phonenumber
    @return bool手机号是否被注册过
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
```
# 12057076610