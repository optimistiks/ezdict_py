from django.db import models
from django.conf import settings
from celery.task.control import revoke
from datetime import datetime
import os
import signal


class Stream(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    closed = models.DateTimeField(null=True, default=None)
    task_id = models.CharField(max_length=255)
    p_id = models.IntegerField()
    movie_id = models.IntegerField()
    url = models.CharField(max_length=255)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='streams')

    def stop(self):
        revoke(self.task_id, terminate=True)
        try:
            os.kill(self.p_id, signal.SIGKILL)
        except OSError:
            pass
        self.closed = datetime.now()
        self.save()

