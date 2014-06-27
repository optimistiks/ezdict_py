from rest_framework import serializers
from streams.models import Stream


class StreamSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Stream
        fields = ('id', 'url', 'created', 'closed')
