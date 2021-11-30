from django.shortcuts import render
from .models import Order
from product.models import Product
from user.models import Customer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
import json
# Create your views here.


def returnJson(data=None, errorCode=0):
	if data is None:
		data = []
	return JsonResponse({'errorCode': errorCode, 'data': data})


def getOrderList(request):
	orders = Order.objects.all()
	return returnJson([dict(order.body()) for order in orders])


def getLatestOrderListByPage(request, pageNum):
	orders = Order.objects.all().order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


def getLatestCustomerOrderListByPage(request, customerId, pageNum):
	try:
		customer = Customer.objects.get(id=customerId)
	except Customer.DoesNotExist:
		return returnJson([],404)

	orders = Order.objects.filter(customer=customer).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


def getLatestProductOrderListByPage(request, productId, pageNum):
	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],404)

	orders = Order.objects.filter(product=product).order_by('-id')[((pageNum-1)*10):(pageNum*10)]
	return returnJson([dict(order.body()) for order in orders])


@login_required
def createOrder(request):
	if request.COOKIES["user"] != "Customer":
		return returnJson([],403)

	try:
		customer = Customer.objects.get(username=request.COOKIES["username"])
	except Customer.DoesNotExist:
		return returnJson([],404)

	try:
		product = Product.objects.get(id=productId)
	except Product.DoesNotExist:
		return returnJson([],404)

	data = json.loads(request.body)
	order = Order.objects.create()
	order.quantity = data["quantity"]
	order.totalPrice = data["totalPrice"]
	order.address = data["address"]
	if order.address == '':
		order.address = customer.address
	order.phoneNumber = data["phoneNumber"]
	if order.phoneNumber == '':
		order.phoneNumber = customer.phoneNumber
	order.save()
	product.soldAmount += 1

	return returnJson([dict(order.body())])

@login_required
def getOrder(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if request.user is not order.customer and request.user is not order.product.seller:
		return returnJson([],403)

	return returnJson([dict(order.body())])

@login_required
def editOrder(request,orderId):
	try:
		order = Order.objects.get(id=orderId)
	except Order.DoesNotExist:
		return returnJson([],404)

	if request.user is not order.customer:
		return returnJson([],403)
	
	if request.method == 'PUT':
		data = json.loads(request.body)
		order.quantity = data["quantity"]
		order.totalPrice = data["totalPrice"]
		order.address = data["address"]
		order.phoneNumber = data["phoneNumber"]
		order.save()

		return returnJson([dict(order.body())])
	elif request.method == 'PUT':
		order.delete()
		return returnJson()


