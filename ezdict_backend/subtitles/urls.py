from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from subtitles import views

URL_PART = 'api/subtitles'

urlpatterns = format_suffix_patterns(patterns('subtitles.views',
    url(r'^'+URL_PART,
        views.SubtitlesView.as_view(),
        name='subtitles'),
))