from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^signup', views.signup, name='signup'),
	url(r'^signin', views.signin, name='signin'),
	url(r'^signout', views.signout, name='signout'),
	url(r'^addmeeting', views.addmeeting, name='addmeeting'),
	url(r'^viewmeeting', views.viewmeeting, name='viewmeeting'),
	url(r'^view', views.viewmeetingsfromcouchbase, name='view'),
	url(r'^add', views.addmeetingtocouchbase, name='add')
]