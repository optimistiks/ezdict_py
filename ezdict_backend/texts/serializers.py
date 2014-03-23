from rest_framework import serializers
from texts.models import Text


class TextSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Text
        fields = ('id', 'user', 'title', 'source', 'text', 'created', 'updated',)


class TextListSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Text
        fields = ('id', 'user', 'title', 'source', 'created', 'updated',)
