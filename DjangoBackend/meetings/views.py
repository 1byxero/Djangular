from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.core import serializers
import json, requests, jwt
from .models import Token
import time

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

def index(request):
	response = "Hello"
	data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apisignup(request):
	if request.method == "POST":
		username = request.POST.get("username")
		password = request.POST.get("password")
		if username is None or password is None:
			response = "Username or password missing"
			data = json.dumps(response)
		else: 
			mail = request.POST.get("mail")
			firstname = request.POST.get("name")
			lastname = request.POST.get("lastname")
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
				status = "User created successfully"	
			data = json.dumps(status)
	else:
		data = "Invalid request method"
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apisignin(request):
	if request.method == "POST":
		username = request.POST.get("username")
		password = request.POST.get("password")
		if username is None or password is None:
			response = "Username or password missing"
			data = json.dumps(response)
		else:
			user = authenticate(username=username, password=password)
			if user is None:
				response = "wrong username or password"
				data = json.dumps(response)
			else:
				#create token model
				tokentoadd = jwt.encode({'username': user.username}, 'secret', algorithm='HS256')
				tokeninst = Token(user=user,token=tokentoadd)
				tokeninst.save()
				responsetext = "User Authenticated"
				response = {"msg": responsetext, "token":tokentoadd}
				data = json.dumps(response)	
	else:
		response = "Invalid request method" 
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apisignout(request):
	if request.method == "POST":
		username = request.POST.get("username")
		token = request.POST.get("token")
		if username is None or token is None:
			response = "Invalid request" 
			data = json.dumps(response)
		else:
			try:
				tokeninst = Token.objects.get(token=token)
				tokeninst.delete()
				response = "Signed out"
				data = json.dumps(response)
			except Token.DoesNotExist:
				response = "Session does not exist"
				data = json.dumps(response)
	else:
		response = "Invalid request method" 
		data = json.dumps(response)
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apiaddmeet(request):
	if request.method=="POST":
		username = request.POST.get("username")
		# password = request.POST.get("password")
		token = request.POST.get("token")
		# if username is None or password is None:
		if username is None or token is None:
			data = "Invalid request format"
		else:
			# user = authenticate(username=username,password=password)
			# if user is None:
			try:
   				tokeninst = Token.objects.get(token=token)
   				if tokeninst.user.username == username:
	   				meetdate = request.POST.get("meetdate")
					meettime = request.POST.get("meettime")
					location = request.POST.get("location")
					meetingfor = request.POST.get("agenda")
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
							'username':username,
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
					#user and token dont match
					response = "Invalid authentication"
					data = json.dumps(response)
			except Token.DoesNotExist:
				data = json.dumps("Invalid authentication")
	else:
		data = json.dumps("Invalid request method")
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apiviewmeetings(request):
	if request.method=="POST":
		username = request.POST.get("username")
		# password = request.POST.get("password")
		token = request.POST.get("token")
		# if username is None or password is None:
		if username is None or token is None:
			data = "Invalid request format"
		else:
			# user = authenticate(username=username,password=password)
			# if user is None:
			try:
   				tokeninst = Token.objects.get(token=token)
   				if tokeninst.user.username == username:
   					host = "http://localhost:4984/"
					db = "meetinggw/"
					filter = "_changes?filter=sync_gateway/bychannel&channels="
					query = str(username)
					url = host+db+filter+str(query)
					r = requests.get(url)
					#fetchdata
					if r.status_code == 200:
						raw_json = r.json()#json.loads(r.text)
						documents = []
						docsmetadata = raw_json["results"]
						requesteddocs = []
						for i in docsmetadata:
							if i["id"] != "_user/GUEST":
								tempid = {"id": i["id"]}
								requesteddocs.append(tempid)

						#this is inefficient method 
						
						for i in docsmetadata:
							if i["id"] != "_user/GUEST":
								fetchid = i["id"]
								fetchhost = "http://localhost:4984/"
								fetchdb = "meetinggw/"
								fetchurl = fetchhost+fetchdb+str(fetchid)
								fetchret =requests.get(fetchurl)
								if fetchret.status_code == 200:
									# tempdoc = {'doc': fetchret.json()}
									# documents.append(json.loads(fetchret.text))
									# documents.append(tempdoc)
									documents.append(fetchret.json())
						#trying efficient method here
						# requestdata = {"docs": requesteddocs}
						# fetchrequrl = host+db+'_bulk_get'
						# headers = {'content-type': 'application/json'}
						# fetchreq = requests.post(fetchrequrl, data=json.dumps(requestdata), headers=headers)
						
						# if fetchreq.status_code == 200:
						# 	split_data = fetchreq.text.split("Content-Type: application/json")
						# 	for i in split_data:
						# 		split_at_hypen = i.split("--")
						# 		tempdoc = {"doc": split_at_hypen[0].strip()}					
						# 		documents.append(tempdoc)
						# 	next_last_sequence = raw_json["last_seq"] # for sync purpose
						# 	# data = json.dumps(documents) this not needed here as documents are already json encoded
							
						# 	documentsdict = {}
						# 	documentsdict['documents'] = documents
						# 	last_seqdict = {}
						# 	last_seqdict['last_seq'] = next_last_sequence
						# 	datadump = [documentsdict, last_seqdict] 
						# 	data = datadump
						
						docsdump = json.dumps(documents)
						next_last_sequence = raw_json["last_seq"] # for sync purpose
			 			
						data = json.dumps({
							"last_seq": next_last_sequence,
							"documents": documents
						})

					else:
						data = json.dumps("Error fetching data")
				else:
					#user and token dont match
					response = "Invalid authentication"
					data = json.dumps(response)
			except Token.DoesNotExist:
				data = json.dumps("Invalid authentication")
	else:
		data = "Invalid request method"
	return HttpResponse(data, content_type = "application/json")

@csrf_exempt
def apifetchlatest(request):
	if request.method=="POST":
		username = request.POST.get("username")
		token = request.POST.get("token")
		sequence = request.POST.get("last_seq")
		if sequence is not None:
			host = "http://localhost:4984/"
			db = "meetinggw/"
			filter = "_changes?filter=sync_gateway/bychannel&channels="
			query = str(username)
			current_last_seq = "&since="+str(sequence)
			url = host+db+filter+query+current_last_seq
			response = "will update this to fetch latest docs using sequence number"
			data = json.dumps(response)
			r = requests.get(url)
			#fetchdata
			if r.status_code == 200:
				raw_json = r.json()#json.loads(r.text)
				documents = []
				docsmetadata = raw_json["results"]
				requesteddocs = []
				for i in docsmetadata:
					if i["id"] != "_user/GUEST":
						tempid = {"id": i["id"]}
						requesteddocs.append(tempid)

				#this is inefficient method 
				
				for i in docsmetadata:
					if i["id"] != "_user/GUEST":
						fetchid = i["id"]
						fetchhost = "http://localhost:4984/"
						fetchdb = "meetinggw/"
						fetchurl = fetchhost+fetchdb+str(fetchid)
						fetchret =requests.get(fetchurl)
						if fetchret.status_code == 200:
							documents.append(fetchret.json())
				docsdump = json.dumps(documents)
				next_last_sequence = raw_json["last_seq"] # for sync purpose
	 			data = json.dumps({
					"last_seq": next_last_sequence,
					"documents": documents
				})
				time.sleep(3)
			else:
				data = json.dumps("Error fetching data")
		else:
			data = json.dumps("Invalid request")
	else:
		data = json.dumps("Invalid request method")
	return HttpResponse(data, content_type = "application/json")


def viewmeetingsfromcouchbase(request):
	if request.user.is_authenticated():
		#make request to get metadata
		host = "http://localhost:4984/"
		db = "meetinggw/"
		filter = "_changes?filter=sync_gateway/bychannel&channels="
		query = str(request.user.username)
		url = host+db+filter+str(query)
		r = requests.get(url)
		#fetchdata
		if r.status_code == 200:
			raw_json = r.json()#json.loads(r.text)
			documents = []
			docsmetadata = raw_json["results"]
			requesteddocs = []
			for i in docsmetadata:
				if i["id"] != "_user/GUEST":
					tempid = {"id": i["id"]}
					requesteddocs.append(tempid)

			#this is inefficient method 
			
			for i in docsmetadata:
				if i["id"] != "_user/GUEST":
					fetchid = i["id"]
					fetchhost = "http://localhost:4984/"
					fetchdb = "meetinggw/"
					fetchurl = fetchhost+fetchdb+str(fetchid)
					fetchret =requests.get(fetchurl)
					if fetchret.status_code == 200:
						# tempdoc = {'doc': fetchret.json()}
						# documents.append(json.loads(fetchret.text))
						# documents.append(tempdoc)
						documents.append(fetchret.json())
			#trying efficient method here
			# requestdata = {"docs": requesteddocs}
			# fetchrequrl = host+db+'_bulk_get'
			# headers = {'content-type': 'application/json'}
			# fetchreq = requests.post(fetchrequrl, data=json.dumps(requestdata), headers=headers)
			
			# if fetchreq.status_code == 200:
			# 	split_data = fetchreq.text.split("Content-Type: application/json")
			# 	for i in split_data:
			# 		split_at_hypen = i.split("--")
			# 		tempdoc = {"doc": split_at_hypen[0].strip()}					
			# 		documents.append(tempdoc)
			# 	next_last_sequence = raw_json["last_seq"] # for sync purpose
			# 	# data = json.dumps(documents) this not needed here as documents are already json encoded
				
			# 	documentsdict = {}
			# 	documentsdict['documents'] = documents
			# 	last_seqdict = {}
			# 	last_seqdict['last_seq'] = next_last_sequence
			# 	datadump = [documentsdict, last_seqdict] 
			# 	data = datadump
			
			docsdump = json.dumps(documents)
			next_last_sequence = raw_json["last_seq"] # for sync purpose
 			
			data = json.dumps({
				"last_seq": next_last_sequence,
				"documents": documents
			})

		else:
			data = json.dumps("Error fetching data")
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