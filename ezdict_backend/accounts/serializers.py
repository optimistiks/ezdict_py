from rest_framework import serializers
from accounts.models import MyUser
from rest_framework.reverse import reverse


class UserSerializer(serializers.HyperlinkedModelSerializer):
    tickets = serializers.SerializerMethodField('get_tickets')

    def restore_object(self, attrs, instance=None):
        user = super(UserSerializer, self).restore_object(attrs, instance)
        user.set_password(attrs['password'])
        return user

    def to_native(self, obj):
        ret = super(UserSerializer, self).to_native(obj)
        del ret['password']
        return ret

    def get_tickets(self, obj):
        try:
            return reverse('myuser-tickets', args=[obj.id], request=self.context['request'])
        except AttributeError:
            pass

    class Meta:
        model = MyUser
        fields = ('id', 'nickname', 'email', 'password', 'tickets')
