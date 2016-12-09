from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^apisignup', views.apisignup, name='apisignup'),
	url(r'^apisignin', views.apisignin, name='apisignin'),
	url(r'^apisignout', views.apisignout, name='apisignout'),
	url(r'^apiaddmeet', views.apiaddmeet, name='apiaddmeet'),
	url(r'^apiviewmeetings', views.apiviewmeetings, name='apiviewmeetings'),
	url(r'^view', views.viewmeetingsfromcouchbase, name='view'),
	url(r'^add', views.addmeetingtocouchbase, name='add'),
]