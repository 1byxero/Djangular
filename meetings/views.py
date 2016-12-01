from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db import IntegrityError
from .models import Meeting
# Create your views here.

def index(request):
	return HttpResponse("Hello")

def signup(request):
	username = request.GET.get("username")
	password = request.GET.get("password")
	if username is None or password is None:
		return HttpResponse("Username or password missing")
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
		return HttpResponse(status)

def signin(request):
	username = request.GET.get("username")
	password = request.GET.get("password")
	if username is None or password is None:
		return HttpResponse("Username or password missing")
	else:
		user = authenticate(username=username, password=password)
		if user is None:
			return HttpResponse("wrong username or password")
		else:
			login(request, user)
			return HttpResponse("Logged in successfully")

def addmeeting(request):
	if request.user.is_authenticated():
		# createdon = models.DateField(auto_now_add=True)
		meetdate = request.GET.get("meetdate")
		meettime = request.GET.get("meettime")
		location = request.GET.get("location")
		meetingfor = request.GET.get("meetingfor")
		if meetdate is None or meetdate is None or meetdate is None or meetdate is None:
			return HttpResponse("One or more fields missing")
		else:
			meetinginst = Meeting(meetdate=meetdate, meettime=meettime, location=location, meetingfor=meetingfor)
			meetinginst.save()
			return HttpResponse("Meeting successfully created")
	else:
		return HttpResponse("Signin to create new meeting")

def viewmeeting(request):
	if request.user.is_authenticated():
		all_meetings = Meeting.objects.all()
		num = 1
		output = "<table><tr><th>ID</th><th>Date</th><th>Time</th><th>Location</th><th>Meeting for</th><tr>"
		for i in all_meetings:
			temp = "<tr><td>"+str(num) +"</td><td>"+ str(i.meetdate) +"</td><td>"+ str(i.meettime) +"</td><td>"+ str(i.location) +"</td><td>"+ str(i.meetingfor) + "</td></tr>"
			output+= temp
			num+=1
		output+="</table>"
		return HttpResponse(output)
	else:
		return HttpResponse("Signin to view meeting")	
