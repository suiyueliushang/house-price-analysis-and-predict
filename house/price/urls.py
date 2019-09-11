from django.urls import path
from . import views


urlpatterns = [
    path('sign_in_by_password',views.sign_in_by_password),
    path('sign_in_by_phone_number',views.sign_in_by_phone_number),
    
    
    path('input/',views.index,name="index"),
    path('login',views.login)
]

