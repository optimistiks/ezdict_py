from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from tickets import views

urlpatterns = patterns('',
    url(r'^tickets/$', views.TicketList.as_view()),
    url(r'^tickets/(?P<pk>[0-9]+)/$', views.TicketDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)