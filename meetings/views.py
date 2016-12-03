from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from .models import Meeting
from django.core import serializers
import json, requests
# Create your views here.

def index(request):
	response = "Hello"
	data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

def signup(request):
	username = request.GET.get("username")
	password = request.GET.get("password")
	if username is None or password is None:
		response = "Username or password missing"
		data = json.dumps(response)
	else: 
		mail = request.GET.get("mail")
		firstname = request.GET.get("firstname")
		lastname = request.GET.get("lastname")
		try:
			user = User.objects.create_user(username=username, password=password)
		except IntegrityError:
			status = "unable to add user, such user already exists"
		else:
			user.is_active = True
			user.is_staff = False
			if firstname is not None:
				user.first_name = firstname
			if lastname is not None:
				user.last_name = lastname
			if mail is not None:
				user.email = mail
			user.save()
			status = "User with username "+username+" saved successfully"	
		data = json.dumps(status)
	return HttpResponse(data, content_type = "application/json")

def signin(request):
	username = request.GET.get("username")
	password = request.GET.get("password")
	if username is None or password is None:
		response = "Username or password missing"
		data = json.dumps(response)
	else:
		user = authenticate(username=username, password=password)
		if user is None:
			response = "wrong username or password"
			data = json.dumps(response)
		else:
			login(request, user)
			response = "Logged in successfully"
			data = json.dumps(response)
	return HttpResponse(data,content_type= "application/json")


def signout(request):
	if request.user.is_authenticated():
		logout(request)
		response = "Successfully logged out"
		data = json.dumps(response)
	else:
		response = "No loggedin user"
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

def addmeeting(request):
	if request.user.is_authenticated():
		# createdon = models.DateField(auto_now_add=True)
		meetdate = request.GET.get("meetdate")
		meettime = request.GET.get("meettime")
		location = request.GET.get("location")
		meetingfor = request.GET.get("meetingfor")
		if meetdate is None or meettime is None or location is None or meetingfor is None:
			response = "One or more fields missing"
			data = json.dumps(response)
		else:
			meetinginst = Meeting(meetdate=meetdate, meettime=meettime, location=location, meetingfor=meetingfor)
			meetinginst.save()
			response = "Meeting successfully created"
			data = json.dumps(response)
	else:
		response = "Signin to create new meeting"
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")


def viewmeeting(request):
	if request.user.is_authenticated():
		all_meetings = Meeting.objects.all()
		data = serializers.serialize("json", all_meetings)
	else:
		response = "Signin to view meeting"
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

def viewmeetingsfromcouchbase(request):
	if request.user.is_authenticated():
		#make request

		host = "http://localhost:4984/"
		db = "meetinggw/"
		filter = "_changes?filter=sync_gateway/bychannel&channels="
		query = str(request.user.username)

		sequence = request.GET.get("last_seq")
		if sequence is not None:
			last_seq = "&since="+str(sequence)
			url = host+db+filter+query+last_seq
		else:
			url = host+db+filter+str(query)
		r = requests.get(url)
		#fetchdata
		if r.status_code == 200:
			return HttpResponse(r, content_type = "application/json")
		else:
			r = json.dumps("Error fetching data")
			return HttpResponse(r, content_type = "application/json")
	else:
		response = "Signin to view meeting"
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

def addmeetingtocouchbase(request):
	if request.user.is_authenticated():
		# createdon = models.DateField(auto_now_add=True)
		meetdate = request.GET.get("meetdate")
		meettime = request.GET.get("meettime")
		location = request.GET.get("location")
		meetingfor = request.GET.get("meetingfor")
		if meetdate is None or meettime is None or location is None or meetingfor is None:
			response = "One or more fields missing"
			data = json.dumps(response)
		else:
			#create request
				#url
				#header
				#data
			url = 'http://localhost:4984/meetinggw/' 
			#data -d
			# data = '{"type": "user", "username": "mychannel4"}'
			payload = {
				'username':request.user.username,
				'meetdate':meetdate,
				'meettime':meettime,
				'location':location,
				'meetingfor':meetingfor
			}
			headers = {'content-type': 'application/json'}
			
			#make request
			r = requests.post(url, data=json.dumps(payload), headers=headers)
			# r = requests.post(url, data=data, headers=headers)
			if r.status_code == 200:
				response = "Meeting successfully created"
			else:
				response = "Something went wrong"
			#show response
				
			data = json.dumps(response)
	else:
		response = "Signin to create new meeting"
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")		