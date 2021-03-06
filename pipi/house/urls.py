from django.urls import path
from . import views

urlpatterns = [
    path('sign_in_by_password',views.sign_in_by_password),#√
    path('sign_in_by_phone_number',views.sign_in_by_phone_number),#√
    path('reg_phone_number',views.reg_phone_number),#√
    path('sign_up',views.sign_up),#√
    path('forget_password',views.forget_password),#√
    path('change_password_func',views.change_password),#√
    path('get_auth_code',views.get_auth_code),#√
    path('query_prices',views.query_prices),
    path('contrast_city',views.contrast_city),#√
    path('contrast_district',views.contrast_district),#√
    path('new_sign_up',views.new_sign_up),#√
    path('new_sign_in',views.new_sign_in),#√
    path('new_sign_in_list',views.new_sign_in_list),#√
    path('new_sign_up_list',views.new_sign_up_list),#√
    path('admin_sign_in',views.admin_sign_in),#√
    path('admin_session',views.admin_session),#√
    path('user_session',views.user_session),#√
    path('add_house_info',views.add_house_info),#√
    path('search_house_info',views.search_house_info),
    path('delete_house_info',views.delete_house_info),
    path('add_district_price',views.add_district_price),#√
    path('delete_district_price',views.delete_district_price),#√
    path('add_city_price',views.add_city_price),#√
    path('delete_city_price',views.delete_city_price),#√
    path('district_in_city',views.district_in_city),#√
    path('add_collection',views.add_collection),#√
    path('show_collection',views.show_collection),#√
    path('delete_collection',views.delete_collection),#√
    path('detail_info',views.detail_info),#√
    path('contrast_house',views.contrast_house),#√
    path('add_users',views.add_users),#√
    path('search_member',views.search_member),#√
    path('delete_users',views.delete_users),#√
    path('house_forecast',views.house_forecast),
    path('admin_change_password_func',views.admin_change_password),#√
    path('admin_show_collection',views.show_collection),#√

]
