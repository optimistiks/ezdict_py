from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from stream import views

URL_PART = 'api/stream'

urlpatterns = format_suffix_patterns(patterns('stream.views',
    url(r'^'+URL_PART+'/start$',
        views.Start.as_view(),
        name='stream-start'),
))