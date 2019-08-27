"""web_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path
from django.conf.urls import url
from . import view
from .import settings
from .sign_in_up import sign_in_up_view
urlpatterns = [
    url('^$', view.main_page),
    url('^sign_in_by_password.*',sign_in_up_view.sign_in_by_password),
    url('^sign_in_by_phone_number.*',sign_in_up_view.sign_in_by_phone_number),
]
