from django.db import models
from django.conf import settings


class TicketSearchLog(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    word = models.CharField(max_length=255)
    count = models.IntegerField(default=1)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='ticket_search_logs')

    def incrementSearchCount(self):
        self.count += 1
        self.save()