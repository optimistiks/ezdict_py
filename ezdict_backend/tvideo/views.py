from django.http import HttpResponse
from tvideo.tasks import stream


def stream_response(request):
    task = stream.delay({})
    return HttpResponse(task.id)
