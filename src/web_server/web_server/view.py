from django.shortcuts import render

#加载主页面相关方法
def main_page(request):
    return render(request,"index.html")
