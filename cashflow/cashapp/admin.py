from django.contrib import admin
from .models import User, Transaction, Wallet, UserFraudAdvisor
# Register your models here.

admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(Wallet)
admin.site.register(UserFraudAdvisor)
