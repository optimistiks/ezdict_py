from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from ez_tickets import views

urlpatterns = format_suffix_patterns(patterns('tickets.views',
    url(r'^ez_tickets/dict/$',
        views.EzDictTicket.as_view(),
        name='ez_ticket-dict'),
    url(r'^ez_tickets/translate/$',
        views.EzTranslateTicket.as_view(),
        name='ez_ticket-translate'),
))