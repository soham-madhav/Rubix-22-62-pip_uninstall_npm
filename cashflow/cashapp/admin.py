from django.contrib import admin
from .models import User, Transaction, Wallet, UserFraudAdvisor, Reminder
# Register your models here.
admin.site.register(Reminder)
admin.site.register(User)
admin.site.register(Transaction)
admin.site.register(Wallet)
admin.site.register(UserFraudAdvisor)
