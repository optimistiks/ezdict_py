from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from ez_tickets import views

urlpatterns = format_suffix_patterns(patterns('tickets.views',
    url(r'^ezDict_tickets/$',
        views.EzDictTicket.as_view(),
        name='ezDict-ticket'),
    url(r'^ezTranslate_tickets/$',
        views.EzTranslateTicket.as_view(),
        name='ezTranslate-ticket'),
))