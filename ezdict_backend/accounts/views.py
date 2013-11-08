from accounts.models import MyUser
from tickets.models import Ticket, TicketCollection
from accounts.serializers import UserSerializer
from tickets.serializers import TicketCollectionSerializer
from rest_framework import generics


class UserList(generics.ListAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer


class TicketsByUserList(generics.ListAPIView):
    model = Ticket
    serializer_class = TicketCollectionSerializer

    def get_queryset(self):
        user_pk = self.kwargs.get('user_pk', None)
        if user_pk is not None:
            return [TicketCollection(Ticket.objects.filter(user=user_pk))]
        return []