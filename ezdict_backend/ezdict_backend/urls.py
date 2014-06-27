from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('tickets.urls')),
    url(r'^', include('accounts.urls')),
    url(r'^', include('texts.urls')),
    url(r'^', include('ticket_search_logs.urls')),
    url(r'^', include('streams.urls')),
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
    # Examples:
    # url(r'^$', 'ezdict_backend.views.home', name='home'),
    # url(r'^ezdict_backend/', include('ezdict_backend.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
