from django.forms import widgets
from rest_framework import serializers
from tickets.models import Ticket


class TicketSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    liked = serializers.Field(source='liked')
    tr = serializers.CharField(source='transcription')
    text = serializers.CharField(widget=widgets.Textarea, source='translation')

    class Meta:
        model = Ticket
        fields = ('id', 'user', 'word', 'tr', 'text', 'liked', 'created', 'updated',)


