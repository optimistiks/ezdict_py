from django.forms import widgets
from rest_framework import serializers
from tickets.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    user = serializers.Field(source='user.nickname')
    liked = serializers.Field(source='liked')

    class Meta:
        model = Ticket
        fields = ('id', 'word', 'transcription', 'translation', 'liked', 'created', 'updated', 'user')