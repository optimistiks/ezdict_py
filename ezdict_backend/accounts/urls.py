from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from accounts import views

urlpatterns = format_suffix_patterns(patterns('accounts.views',
    url(r'^users/$',
        views.UserList.as_view(),
        name='myuser-list'),
    url(r'^users/(?P<pk>[0-9]+)/$',
        views.UserDetail.as_view(),
        name='myuser-detail'),
    url(r'^users/(?P<user_pk>\d+)/tickets/$',
        views.TicketsByUserList.as_view(),
        name='myuser-tickets'),
))