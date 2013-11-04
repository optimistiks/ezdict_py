from django.db import models
from django.conf import settings


class Ticket(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    word = models.CharField(max_length=255)
    transcription = models.CharField(max_length=255)
    translation = models.TextField()
    liked = models.IntegerField(default=0)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='tickets')

    class Meta:
        ordering = ('created',)