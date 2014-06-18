from ticket_search_logs.models import TicketSearchLog
from ticket_search_logs.serializers import TicketSearchLogSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from django.http import Http404


class TVideoView(APIView):
    def get(self, request):
        return Response({'test': 'test'})
