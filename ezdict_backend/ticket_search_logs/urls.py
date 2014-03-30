from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from ticket_search_logs import views

URL_PART = 'api/ticket_search_logs'

urlpatterns = format_suffix_patterns(patterns('ticket_search_logs.views',
    url(r'^'+URL_PART,
        views.TicketSearchLogView.as_view(),
        name='ticket-search-log'),
))