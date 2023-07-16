
from django.contrib import admin
from django.urls import path
from data.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('coupons/', coupon_list, name='coupon-list'),
    path('coupons/<int:pk>/', coupon_detail, name='coupon-detail'),
    path('verify/', coupon_verify, name='coupon_verify'),
]

