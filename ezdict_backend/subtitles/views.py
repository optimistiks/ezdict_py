from subtitles.models import Subtitles
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from django.http import Http404


class SubtitlesView(APIView):
    def get(self, request, format=None):
        imdbCode = request.QUERY_PARAMS.get('imdbCode')
        if imdbCode is None:
            raise ParseError('Parameter "imdbCode" is required')
        subtitles = Subtitles().get(imdbCode)
        subtitles.unzip()
        return Response({"url": subtitles.url, "imdbCode": subtitles.imdbCode})
