from rest_framework import serializers
from cashapp.models import  User, Transaction, Wallet

class UserSerializer(serializers.ModelSerializer):
    class Meta:
    
        model = User
        fields = '__all__'


class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'



class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

