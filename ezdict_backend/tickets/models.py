from django.db import models


class Ticket(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    word = models.CharField(max_length=255)
    transcription = models.CharField(max_length=255)
    translation = models.TextField()
    liked = models.IntegerField()

    class Meta:
        ordering = ('created',)