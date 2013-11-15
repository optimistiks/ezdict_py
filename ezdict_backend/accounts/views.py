from accounts.models import MyUser
from tickets.models import Ticket
from accounts.serializers import UserSerializer
from tickets.serializers import TicketSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import ParseError, AuthenticationFailed
from rest_framework.permissions import AllowAny
from accounts.permissions import AllowCreateForAnyoneButAuthenticateList
from django.contrib import auth


class UserLogin(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        username = request.DATA.get('username')
        password = request.DATA.get('password')

        if username is None or password is None:
            raise ParseError('Either username or password is not provided')
        else:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    auth.login(request, user)
                    serializer = UserSerializer(user, context={'request': request})
                    return Response(serializer.data)
                else:
                    raise AuthenticationFailed('User is not active')
            else:
                raise AuthenticationFailed('Incorrect login or password')


class UserList(generics.ListCreateAPIView):
    permission_classes = (AllowCreateForAnyoneButAuthenticateList,)
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class TicketsByUserList(generics.ListAPIView):
    model = Ticket
    serializer_class = TicketSerializer

    def get_queryset(self):
        user_pk = self.kwargs.get('user_pk', None)
        if user_pk is not None:
            return Ticket.objects.filter(user=user_pk)
        return []