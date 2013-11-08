from rest_framework import serializers
from accounts.models import MyUser
from rest_framework.reverse import reverse


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tickets = serializers.SerializerMethodField('get_tickets')

    def get_tickets(self, obj):
        return reverse('myuser-tickets', args=[obj.id], request=self.context['request'])

    class Meta:
        model = MyUser
        fields = ('id', 'nickname', 'email', 'tickets')
