from django.db import models
# Create your models here.
class User(models.Model):
    phoneNumber = models.IntegerField()
    userEmail = models.EmailField()
    userName = models.CharField(max_length=100)
    userPassword = models.CharField(max_length=100)
    userLocation = models.CharField(max_length=100, default="Mumbai") 
    
    def __str__(self):
        return self.userName

class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    walletBal =  models.FloatField(default=0)
    def __str__(self):
        return self.user.userName+" = "+str(self.walletBal)

class Transaction(models.Model):
    import datetime
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    walletTransaction = models.BooleanField(default=False)
    transactionAmount = models.FloatField(default=0)
    transactionTimeStamp = models.DateTimeField(default = datetime.datetime.now())
    transactionDescription = models.CharField(max_length=100)
    transactionType = models.CharField(choices=[('CR', 'Credit'), ('DR', 'Debit')], max_length=2)
    transactionCategory = models.CharField(
        # choices=[('FOOD', 'Food'), ('ENTERTAINMENT', 'Entertainment'), ('SHOPPING', 'Shopping'), ('OTHER', 'Other')], 
        max_length=100)

    def __str__(self):
        return self.user.userName+" = "+self.transactionDescription

import datetime
class UserFraudAdvisor(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    maxAmount = models.IntegerField(default=10_000)
    maxNumberOfTransactionsInADay = models.IntegerField(default=5)
    lastTransactionTS = models.DateTimeField(default = datetime.datetime.now())
    lastTransactionAmount = models.IntegerField(default=0)
    def __str__(self):
        return self.user.userName