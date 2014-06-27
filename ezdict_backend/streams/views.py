from streams.tasks import start
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from streams.serializers import StreamSerializer
from streams.models import Stream


class Start(APIView):
    def post(self, request, format=None):
        movieId = request.DATA.get('id')
        user = request.user
        task = start.delay(movieId, user)
        stream = task.get()
        serializer = StreamSerializer(stream, context={'request': request})
        return Response(serializer.data)


class Stop(APIView):
    def post(self, request, format=None):
        streamId = request.DATA.get('id')
        if streamId is None:
            raise ParseError('Parameter "id" is required')

        stream = Stream.objects.get(pk=streamId)
        stream.stop()

        serializer = StreamSerializer(stream, context={'request': request})
        return Response(serializer.data)
