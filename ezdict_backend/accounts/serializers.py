from rest_framework import serializers
from accounts.models import MyUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'nickname', 'email', 'tickets')