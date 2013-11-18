from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from ez_tickets.components import YandexDict, YandexTranslate


class EzDictTicket(APIView):

    def get(self, request):
        word = request.QUERY_PARAMS.get('word')
        if word is None:
            raise ParseError('Parameter "word" is required')

        ydict = YandexDict(word)
        ticket = ydict.lookup()

        return Response(ticket)


class EzTranslateTicket(APIView):
    def get(self, request):
        word = request.QUERY_PARAMS.get('word')
        if word is None:
            raise ParseError('Parameter "word" is required')

        ytrans = YandexTranslate(word)
        ticket = ytrans.translate()

        return Response(ticket)