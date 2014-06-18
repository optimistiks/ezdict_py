from ticket_search_logs.models import TicketSearchLog
from ticket_search_logs.serializers import TicketSearchLogSerializer
from rest_framework.views import APIView
from rest_framework.exceptions import ParseError
from rest_framework.response import Response
from django.http import Http404
import subprocess
from django.http import HttpResponse
import datetime
import time, os
from django.http import StreamingHttpResponse


def stream_response(request):
    resp = StreamingHttpResponse(stream_response_generator(), mimetype='video/mp4')
    return resp


def stream_response_generator():
    process = subprocess.Popen(['btcat',
                                '"https://yts.re/download/start/344E74A9B07EC8D3F00627A38F45483A3DB08A04.torrent"',
                                '0'], stdout=subprocess.PIPE)
    content = None
    c = 0
    while content != '':
        content = process.stdout.read(1)
        yield content
        if c == 0:
            yield " " * 1024    # Encourage browser to render incrementally (either 1024 or 1024-7{length of "chunk 1"} = 1017)
            c += 1

        time.sleep(1)


def chunked_res():
    yield "Chunk 1"
    yield " " * 1024    # Encourage browser to render incrementally (either 1024 or 1024-7{length of "chunk 1"} = 1017)

    stop = time.time() + 5    # wait for 5 seconds
    while time.time() < stop:
        pass

    yield "Chunk 2"


def myview(request):
    g = chunked_res()
    return HttpResponse(g)
