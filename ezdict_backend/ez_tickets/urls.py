from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from ez_tickets import views

URL_PART = 'api/ez_tickets/'

urlpatterns = format_suffix_patterns(patterns('ez_tickets.views',
    url(r'^'+URL_PART+'dict/$',
        views.EzDictTicket.as_view(),
        name='ez_ticket-dict'),
    url(r'^'+URL_PART+'translate/$',
        views.EzTranslateTicket.as_view(),
        name='ez_ticket-translate'),
))