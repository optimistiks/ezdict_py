from tickets.models import Ticket
from tickets.serializers import TicketSerializer
from rest_framework import generics
from rest_framework import permissions
from tickets.permissions import IsOwnerOrReadOnly


class TicketList(generics.ListCreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def pre_save(self, obj):
        obj.user = self.request.user


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)
    
    def pre_save(self, obj):
        obj.user = self.request.user