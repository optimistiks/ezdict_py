from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from tickets import views

URL_PART = 'api/tickets/'

urlpatterns = format_suffix_patterns(patterns('tickets.views',
    url(r'^'+URL_PART+'$',
        views.TicketList.as_view(),
        name='ticket-list'),
    url(r'^'+URL_PART+'(?P<pk>[0-9]+)/$',
        views.TicketDetail.as_view(),
        name='ticket-detail'),
))