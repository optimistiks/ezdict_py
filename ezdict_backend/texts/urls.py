from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from texts import views

urlpatterns = format_suffix_patterns(patterns('texts.views',
    url(r'^texts/$',
        views.TextList.as_view(),
        name='text-list'),
    url(r'^texts/(?P<pk>[0-9]+)/$',
        views.TextDetail.as_view(),
        name='text-detail'),
))