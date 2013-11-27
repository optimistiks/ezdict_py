from django.db import models
from django.conf import settings


class Text(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    text = models.TextField()

    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='texts')

    class Meta:
        ordering = ('-id',)