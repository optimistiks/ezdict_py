from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from ez_tickets.components import YandexDict, YandexTranslate


class EzTicket(APIView):

    def getWord(self, request):
        word = request.QUERY_PARAMS.get('word')
        if word is None:
            raise ParseError('Parameter "word" is required')
        return word


class EzDictTicket(EzTicket):

    def get(self, request):
        ydict = YandexDict(self.getWord(request))
        ticket = ydict.lookup()
        return Response(ticket)


class EzTranslateTicket(EzTicket):

    def get(self, request):
        ytrans = YandexTranslate(self.getWord(request))
        ticket = ytrans.translate()
        return Response(ticket)