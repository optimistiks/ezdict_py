from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from tvideo import views

URL_PART = 'api/tvideo'

urlpatterns = format_suffix_patterns(patterns('tvideo.views',
    url(r'^'+URL_PART,
        views.StartStream.as_view(),
        name='tvideo-view'),
))