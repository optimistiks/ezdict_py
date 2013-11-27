from rest_framework import generics
from texts.models import Text
from texts.serializers import TextSerializer, TextListSerializer
from tickets.permissions import UpdDelByOwnerOrAdminOtherMethodsForAuthenticated


class TextList(generics.ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TextListSerializer
        else:
            return TextSerializer

    def get_queryset(self):
        queryset = Text.objects.all()

        query = self.request.QUERY_PARAMS.get('query', None)
        if query is not None:
            queryset = queryset.filter(title__icontains=query)

        offset = int(self.request.QUERY_PARAMS.get('offset', 0))
        queryset = queryset[offset:]

        limit = self.request.QUERY_PARAMS.get('limit', None)

        if limit is not None and int(limit) > 0:
            queryset = queryset[:int(limit)]

        return queryset

    def pre_save(self, obj):
        obj.user = self.request.user


class TextDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (UpdDelByOwnerOrAdminOtherMethodsForAuthenticated,)
    queryset = Text.objects.all()
    serializer_class = TextSerializer

    def pre_save(self, obj):
        obj.user = self.request.user