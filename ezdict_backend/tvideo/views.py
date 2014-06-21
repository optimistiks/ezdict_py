from django.http import HttpResponse
from tvideo.tasks import start
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from django.http import Http404


class StartStream(APIView):

    def post(self, request):
        task = start.delay({})
        url = task.get(timeout=10)
        return Response({'url': url})
