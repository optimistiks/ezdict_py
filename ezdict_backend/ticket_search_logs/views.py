from ticket_search_logs.models import TicketSearchLog
from ticket_search_logs.serializers import TicketSearchLogSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from django.http import Http404


class TicketSearchLogView(APIView):
    def getLog(self, word):
        try:
            ticketSearchLog = TicketSearchLog.objects.get(user__exact=self.request.user.id,
                                                          word__iexact=word)
        except TicketSearchLog.DoesNotExist:
            ticketSearchLog = None
        return ticketSearchLog

    def get(self, request):
        word = request.QUERY_PARAMS.get('word')
        if word is None:
            raise ParseError('Parameter "word" is required')
        ticketSearchLog = self.getLog(word)
        if ticketSearchLog is not None:
            serializer = TicketSearchLogSerializer(ticketSearchLog, context={'request': request})
            return Response(serializer.data)
        else:
            raise Http404('Log not found')

    def post(self, request):
        word = request.DATA.get('word')
        if word is None:
            raise ParseError('Parameter "word" is required')
        word = word.strip().lower()
        ticketSearchLog = self.getLog(word)
        if ticketSearchLog is not None:
            ticketSearchLog.incrementSearchCount()
            status = 200
        else:
            ticketSearchLog = TicketSearchLog(word=word, user=self.request.user)
            ticketSearchLog.save()
            status = 201

        serializer = TicketSearchLogSerializer(ticketSearchLog, context={'request': request})
        return Response(serializer.data, status)
