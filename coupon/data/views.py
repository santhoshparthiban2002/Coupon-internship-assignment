from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Coupon
from .serializers import CouponSerializer
from django.utils import timezone

@csrf_exempt
def coupon_list(request):
    if request.method == 'GET':
        coupons = Coupon.objects.all()
        serializer = CouponSerializer(coupons, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CouponSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)
@csrf_exempt
def coupon_detail(request, pk):
    try:
        coupon = Coupon.objects.get(pk=pk)
    except Coupon.DoesNotExist:
        return JsonResponse({'error': 'Coupon does not exist'}, status=404)

    if request.method == 'GET':
        serializer = CouponSerializer(coupon)
        return JsonResponse(serializer.data)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CouponSerializer(coupon, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        coupon.delete()
        return JsonResponse({'message': 'Coupon deleted successfully'}, status=204)



@csrf_exempt
def coupon_verify(request):
    if request.method == 'POST':
        try:
            data = JSONParser().parse(request)
            coupon = Coupon.objects.get(couponCode=data['couponCode'])
            
            if coupon.used:
                return JsonResponse({"error": "Coupon already used"}, status=400)
            if coupon.expirationDate < timezone.now().date():
                return JsonResponse({"error": "Coupon is expired"}, status=400)
            
            serializer = CouponSerializer(coupon)
            return JsonResponse(serializer.data, safe=False)
        except Coupon.DoesNotExist:
            return JsonResponse({"error": "Invalid couponCode"}, status=400)

