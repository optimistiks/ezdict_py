from rest_framework import generics
from tickets.models import Ticket
from tickets.serializers import TicketSerializer
from tickets.permissions import UpdDelByOwnerOrAdminOtherMethodsForAuthenticated


class TicketList(generics.ListCreateAPIView):
    serializer_class = TicketSerializer

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

        return queryset

    def pre_save(self, obj):
        obj.user = self.request.user


class TicketDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (UpdDelByOwnerOrAdminOtherMethodsForAuthenticated,)
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def pre_save(self, obj):
        obj.user = self.request.user