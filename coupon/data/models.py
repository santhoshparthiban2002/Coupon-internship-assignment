import uuid
from django.db import models

def generate_coupon_code():
    coupon_code = str(uuid.uuid4().hex.upper()[:15])
    return coupon_code


class Coupon(models.Model):
    couponCode = models.CharField(max_length=500, unique=True,default=generate_coupon_code)
    expirationDate = models.DateField()
    discountAmount = models.IntegerField()
    used = models.BooleanField(default=False)

    def __str__(self):
        return self.couponCode

