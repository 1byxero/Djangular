from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^signup', views.signup, name='signup'),
	url(r'^signin', views.signin, name='signin'),
	url(r'^signout', views.signout, name='signout'),
	url(r'^apiaddmeet', views.apiaddmeet, name='apiaddmeet'),
	url(r'^apiviewmeetings', views.apiviewmeetings, name='apiviewmeetings'),
	url(r'^view', views.viewmeetingsfromcouchbase, name='view'),
	url(r'^add', views.addmeetingtocouchbase, name='add'),
]