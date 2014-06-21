from django.http import HttpResponse
from tvideo.tasks import start


def stream_response(request):
    task = start.delay({})
    return HttpResponse(task.id)
