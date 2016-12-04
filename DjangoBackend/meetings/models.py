from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Meeting(models.Model):
	id = models.AutoField(primary_key=True)
	createdon = models.DateField(auto_now_add=True)
	meetdate = models.DateField(auto_now_add=False,auto_now=False)
	meettime = models.TimeField(auto_now=False, auto_now_add=False)
	location = models.CharField(max_length=50)
	meetingfor = models.CharField(max_length=150)