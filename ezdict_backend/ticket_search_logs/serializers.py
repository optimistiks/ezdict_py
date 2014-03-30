from rest_framework import serializers
from ticket_search_logs.models import TicketSearchLog


class TicketSearchLogSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = TicketSearchLog
        fields = ('id', 'user', 'word', 'count', 'created', 'updated',)
