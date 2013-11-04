from accounts.models import MyUser
from accounts.serializers import UserSerializer
from rest_framework import generics


class UserList(generics.ListAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer