from tickets.models import Ticket, TicketCollection
from tickets.serializers import TicketSerializer, TicketCollectionSerializer
from rest_framework import generics
from rest_framework import permissions
from tickets.permissions import IsOwnerOrReadOnly


class TicketList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_serializer_class(self):
        serializer_class = TicketSerializer
        if self.request.method == 'GET':
            serializer_class = TicketCollectionSerializer
        return serializer_class

    def get_queryset(self):
        queryset = Ticket.objects.all()

        own = self.request.QUERY_PARAMS.get('own', None)
        if own is not None:
            if own.lower() == 'true':
                queryset = queryset.filter(user=self.request.user)
            else:
                queryset = queryset.exclude(user=self.request.user)

        word = self.request.QUERY_PARAMS.get('word', None)
        if word is not None:
            queryset = queryset.filter(word=word)

        offset = int(self.request.QUERY_PARAMS.get('offset', 0))
        queryset = queryset[offset:]

        limit = self.request.QUERY_PARAMS.get('limit', None)

        if limit is not None and int(limit) > 0:
            queryset = queryset[:int(limit)]

        if self.request.method == 'GET':
            queryset = [TicketCollection(queryset)]

        return queryset

    def pre_save(self, obj):
        obj.user = self.request.user


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def pre_save(self, obj):
        obj.user = self.request.user