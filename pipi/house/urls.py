from django.urls import path
from . import views

urlpatterns = [
    path('sign_in_by_password',views.sign_in_by_password),
    path('sign_in_by_phone_number',views.sign_in_by_phone_number),
    path('reg_phone_number',views.reg_phone_number),
    path('sign_up',views.sign_up),
    path('forget_password',views.forget_password),
    path('get_auth_code',views.get_auth_code),
    path('query_prices',views.query_prices),
    path('contrast_city',views.contrast_city),
    path('contrast_district',views.contrast_district),
    path('input',views.index,name="index"),
    path('new_sign_up',views.new_sign_up),

    path('add_users',views.add_users),
    path('search_member',views.search_member),
    path('delete_users',views.delete_users)
    #path('',views.login)
]
