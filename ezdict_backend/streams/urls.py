from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from streams import views

URL_PART = 'api/streams'

urlpatterns = format_suffix_patterns(patterns('streams.views',
    url(r'^'+URL_PART+'/start$',
        views.Start.as_view(),
        name='stream-start'),
    url(r'^'+URL_PART+'/stop',
        views.Stop.as_view(),
        name='stream-stop'),
))