from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from accounts import views

URL_PART = 'api/users/'

urlpatterns = format_suffix_patterns(patterns('accounts.views',
    url(r'^'+URL_PART+'$', views.UserList.as_view(), name='myuser-list'),
    url(r'^'+URL_PART+'(?P<pk>[0-9]+)/$', views.UserDetail.as_view(), name='myuser-detail'),
    url(r'^'+URL_PART+'(?P<user_pk>\d+)/tickets/$', views.TicketsByUserList.as_view(), name='myuser-tickets'),
    url(r'^'+URL_PART+'login/$', views.UserLogin.as_view(), name='myuser-login'),
    url(r'^'+URL_PART+'isAuthenticated/$', views.UserIsAuthenticated.as_view(), name='myuser-isAuthenticated'),
    url(r'^'+URL_PART+'logout/$', views.UserLogout.as_view(), name='myuser-logout'),
))