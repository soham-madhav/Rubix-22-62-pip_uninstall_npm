from .models import UserFraudAdvisor
# from curses.ascii import HT
from pyqrcode import QRCode
import png
import pyqrcode
import re
from django.http import HttpResponse
from django.shortcuts import render
from pkg_resources import ResolutionError
# import HttpResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Wallet, Transaction
from django.core.exceptions import ObjectDoesNotExist
from .serializers import UserSerializer, WalletSerializer, TransactionSerializer

# Create your views here.


def index(request):
    return HttpResponse("HELLO")


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        # 'List': '/subject-list/',
        # 'Detail View': '/subject-detail/<str:pk>/',
        # 'Create': '/subject-create/',
        # 'Update': '/subject-update/<str:pk>/',
        # 'Delete': '/subject-delete/<str:pk>/',
    }

    return Response(api_urls)


@ api_view(['GET'])
def userLogin(request, phoneNo, password):
    try:
        print('username=', phoneNo, 'password=', password)
        user = User.objects.get(phoneNumber=phoneNo)
    except ObjectDoesNotExist:
        return Response(False)
    except(Exception):
        print("EXCEPTION")
        print(Exception)
        return Response(False)

    if(user.userPassword == password):
        print("Password right")
        serializer = UserSerializer(user)
        if(serializer.is_valid):
            return Response(serializer.data)
        else:
            print("SERIALIZER NOT VALID")
    else:
        print("Password wrong")
        return Response(False)
    return Response(True)
    # http://127.0.0.1:8000/user-login/phoneNo=8888888888/password=yash/
    # {
    #     "id": 1,
    #     "phoneNumber": 8888888888,
    #     "userEmail": "yash@gmail.com",
    #     "userName": "yash12",
    #     "userPassword": "yash"
    # }

# TODO regisytation react router


@ api_view(['POST'])
def userRegistration(request):
    import json
    data = request.data
    data = list(data.keys())[0]
    data = json.loads(data)
    print(data)
    # data=json.loads(request.body)

    # return HttpResponse("HELLO")
# {"phoneNumber": 8888888881,"userEmail": "yash@gmail.com","userName":"yash12","userPassword": "yash"}
    # serializer = UserSerializer(data={"phoneNumber": 8888888881,"userEmail": "yash@gmail.com","userName":"yash12","userPassword": "yash"})
    serializer = UserSerializer(data=data)
    print(serializer)
    if serializer.is_valid():
        serializer.save()

        # initializing userWaller
        phoneNo = serializer.data['phoneNumber']
        wallet = Wallet(user=User.objects.get(
            phoneNumber=phoneNo), walletBal=0)
        wallet.save()
        UserFraudAdvisor.objects.create(user=User.objects.get(
            phoneNumber=phoneNo)).save()

    else:
        print("SERIALIZER VALID:", serializer.is_valid())
        print("SERIA", serializer.errors)

    return Response(serializer.data)
# http://127.0.0.1:8000/user-register/
# {

#         "phoneNumber": "8888888881",
#         "userEmail": "yash@gmail.com",
#         "userName": "yash12",
#         "userPassword": "yash"
#     }


@ api_view(['GET'])
def getTransactions(request, phoneNo):
    transactions = Transaction.objects.filter(
        user=User.objects.get(phoneNumber=phoneNo))
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


# {
#     "userId": 1,
#    "phoneNo": 8888888881,
#     "walletTransaction": true,  // true for wallet transaction, false for transaction
#     "transactionAmount": 100,
#     "transactionTimeStamp": "2019-11-11T11:11:11",
#     "transactionDescription": "test",
#     "transactionType": "CR",
#     "transactionCategory": "Food"

# }
# {
#  {
#    "phoneNo": "8888888881",
#     "walletTransaction": "true",
#     "transactionAmount": "100",
#     "transactionTimeStamp": "2019-11-11T11:11:11",
#     "transactionDescription": "test",
#     "transactionType": "CR",
#     "transactionCategory": "Food"

# }
@ api_view(['POST'])
def fraudCheck(request):
# {"phoneNo":"8888888881", "userLocation":"Mumbai","walletTransaction": "true", "transactionAmount": "100", "transactionTimeStamp":"2022-01-18 20:00:51", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}
    
    # FRAUD CHECK
    import json
    data = request.data
    data = list(data.keys())[0]
    print(data)
    data = json.loads(data)
    print(data)
    data["user"] = User.objects.get(phoneNumber=data["phoneNo"]).id
    user = data["user"]
    transactionVal = data["transactionAmount"]
    transactionTimeStamp = data["transactionTimeStamp"]
    isFraudDetector = UserFraudAdvisor.objects.get(user=user)
    isFraud = False
    if(isFraudDetector.maxAmount < int(transactionVal)):
        isFraud = True
    if(isFraudDetector.lastTransactionAmount == int(transactionVal)):
        isFraud = True
    from datetime import datetime
    print(type(isFraudDetector.lastTransactionTS), isFraudDetector.lastTransactionTS)
    transactionTimeStamp = datetime. strptime(transactionTimeStamp, '%Y-%m-%d %H:%M:%S')
    if(transactionTimeStamp - isFraudDetector.lastTransactionTS).seconds <= 120:
        isFraud = True
    if(data['userLocation']!=User.objects.get(phoneNumber=data["phoneNo"]).userLocation):
        isFraud = True

    return Response(isFraud)

# if is fraud

@ api_view(['GET'])
def verifyUser(request, phoneNo, password ):

    if(User.objects.get(phoneNumber=phoneNo).userPassword == password):
        return Response(True)
    return Response(False)

@ api_view(['POST'])
def addTransaction(request):

    import json
    data = request.data
    data = list(data.keys())[0]
    print(data)
    data = json.loads(data)
    print(data)
    data["user"] = User.objects.get(phoneNumber=data["phoneNo"]).id
    del data["phoneNo"]
# {"phoneNo":"8888888881", "walletTransaction": "true", "transactionAmount": "100", "transactionTimeStamp":"2019-11-11T11:11:11", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}






    serializer = TransactionSerializer(data=data)
    # return Response(request.data)
    if serializer.is_valid():
        serializer.save()
        walBal = Wallet.objects.get(user=data["user"]).walletBal
        if(serializer.data['walletTransaction']):
            if(serializer.data['transactionType'] == 'CR'):
                walBal = walBal + float(serializer.data['transactionAmount'])
            else:
                walBal = walBal - float(serializer.data['transactionAmount'])
            Wallet.objects.filter(user=data["user"]).update(walletBal=walBal)
            transactionVal = data["transactionAmount"]
            transactionTimeStamp = data["transactionTimeStamp"]

            isFraudDetector = UserFraudAdvisor.objects.get(user=data["user"])
            UserFraudAdvisor.objects.filter(user=data["user"]).update(lastTransactionAmount=transactionVal, lastTransactionTS=transactionTimeStamp, maxAmount=max(isFraudDetector.maxAmount, (isFraudDetector.maxAmount+int(transactionVal))/2))
        return Response(serializer.data)
    else:
        print("SERIALIZER VALID:", serializer.is_valid())
        print("SERIA", serializer.errors)
    return Response(serializer.data)


# TODO intergeate frontend
# @ api_view(['GET'])


def getQRCode(request, phoneNo, amount):

    reacturl = "http://127.0.0.1:8000"
    finalUrl = reacturl+"/sendMoney/amount="+amount+"/phoneNo="+phoneNo
# String which represents the QR code
    s = ""

    # Generate QR code
    url = pyqrcode.create(finalUrl)

    # Create and save the svg file naming "myqr.svg"
    url.svg("myqr.svg", scale=8)

    # Create and save the png file naming "myqr.png"
    url.png('myqr.png', scale=6)
    # html = r"<img src='C:\Users\JaiParmani\OneDrive\Desktop\rubix\cashflow\myqr.png'>"
    return HttpResponse("HELLo")


@ api_view(['GET'])
def transferMoney(request, amount, phoneNo, receiverPhoneNo):
    if(not User.objects.filter(phoneNumber=receiverPhoneNo).exists()):
        return Response(False)
    sender = User.objects.get(phoneNumber=phoneNo)
    walBal = Wallet.objects.get(user=sender).walletBal
    if(walBal < float(amount)):
        return Response(False)
    walBal = walBal - float(amount)
    Wallet.objects.filter(user=sender).update(walletBal=walBal)

    receiver = User.objects.get(phoneNumber=receiverPhoneNo)
    walBal = Wallet.objects.get(user=receiver).walletBal
    walBal = walBal + float(amount)
    Wallet.objects.filter(user=receiver).update(walletBal=walBal)
    return Response(True)


def addMoneyToWallet(request, phoneNo, amount):
    user = User.objects.get(phoneNumber=phoneNo)
    # PAYMENT GATEWAY integration
    # FAKE PAYMENT GATEWAY AT REACT
    # razorpay integration
#     from django.shortcuts import render
# import razorpay
# from django.conf import settings
# from django.views.decorators.csrf import csrf_exempt
# from django.http import HttpResponseBadRequest


# # authorize razorpay client with API Keys.
# razorpay_client = razorpay.Client(
# 	auth=(settings.RAZOR_KEY_ID, settings.RAZOR_KEY_SECRET))


# def homepage(request):
# 	currency = 'INR'
# 	amount = 20000 # Rs. 200

# 	# Create a Razorpay Order
# 	razorpay_order = razorpay_client.order.create(dict(amount=amount,
# 													currency=currency,
# 													payment_capture='0'))

# 	# order id of newly created order.
# 	razorpay_order_id = razorpay_order['id']
# 	callback_url = 'paymenthandler/'

# 	# we need to pass these details to frontend.
# 	context = {}
# 	context['razorpay_order_id'] = razorpay_order_id
# 	context['razorpay_merchant_key'] = settings.RAZOR_KEY_ID
# 	context['razorpay_amount'] = amount
# 	context['currency'] = currency
# 	context['callback_url'] = callback_url

# 	return render(request, 'index.html', context=context)


# # we need to csrf_exempt this url as
# # POST request will be made by Razorpay
# # and it won't have the csrf token.
# @csrf_exempt
# def paymenthandler(request):

# 	# only accept POST request.
# 	if request.method == "POST":
# 		try:

# 			# get the required parameters from post request.
# 			payment_id = request.POST.get('razorpay_payment_id', '')
# 			razorpay_order_id = request.POST.get('razorpay_order_id', '')
# 			signature = request.POST.get('razorpay_signature', '')
# 			params_dict = {
# 				'razorpay_order_id': razorpay_order_id,
# 				'razorpay_payment_id': payment_id,
# 				'razorpay_signature': signature
# 			}

# 			# verify the payment signature.
# 			result = razorpay_client.utility.verify_payment_signature(
# 				params_dict)
# 			if result is None:
# 				amount = 20000 # Rs. 200
# 				try:

# 					# capture the payemt
# 					razorpay_client.payment.capture(payment_id, amount)

# 					# render success page on successful caputre of payment
# 					return render(request, 'paymentsuccess.html')
# 				except:

# 					# if there is an error while capturing payment.
# 					return render(request, 'paymentfail.html')
# 			else:

# 				# if signature verification fails.
# 				return render(request, 'paymentfail.html')
# 		except:

# 			# if we don't find the required parameters in POST data
# 			return HttpResponseBadRequest()
# 	else:
# 	# if other than POST request is made.
# 		return HttpResponseBadRequest()

    walBal = Wallet.objects.get(user=user).walletBal
    walBal = walBal + float(amount)
    Wallet.objects.filter(user=user).update(walletBal=walBal)
    return Response(True)


def extratData(request):
    import requests
    modelid = "eb0c8084-3e95-4dc9-99ec-714fb1d31bfd"
    # url = 'https://app.nanonets.com/api/v2/Inferences/Model/' + modelid #+ '/ImageLevelInferences?start_day_interval={start_day}&current_batch_day={end_day}'

    url = 'https://app.nanonets.com/api/v2/OCR/Model/'+modelid+'/LabelFile/'

    data = {'file': open('reciept.jpg', 'rb')}

    response = requests.post(url, auth=requests.auth.HTTPBasicAuth(
        '3MjnNJP7BOApdrHAUKMbeaRIVJn43Kn2', ''), files=data)

    txt = response.text
    print(type(txt))
    import json
    # for i in txt:
    # print(i)

    txt = (json.loads(txt))['result'][0]['prediction']
    # print(type(txt[0]))
    # for i in txt:
    # print(i)
    dict1 = {
        'amount': 0,
        'date': '',
        'merchant_adr': '',
        'merchant_name': ''
    }
    # print(txt)
    for i in txt:
        if(i['label'] == "Total_Amount"):
            dict1['amount'] = i['ocr_text']
        if(i['label'] == "Date"):
            dict1['date'] = i['ocr_text']
        if(i['label'] == "Merchant_Address"):
            dict1['merchant_adr'] = i['ocr_text']
        if(i['label'] == "Merchant_Name"):
            dict1['merchant_name'] = i['ocr_text']

    return response(dict1)


from .forms import StockExchangeForm
import requests

def stockList(request):
    if(request.method=="POST"):
        form = StockExchangeForm(request.POST)
        if(form.is_valid()):
            # StockExchange
            exchange=form.data["exchange"]
            print(exchange)
            print("https://api.twelvedata.com/stocks?exchange="+exchange+"&outputsize=12&source=docs")
            url="https://api.twelvedata.com/stocks?exchange="+exchange+"&outputsize=12&source=docs"
            print(url   )
            response = requests.get(url)
        # print(response.json())
            
            stocks = response.json()
            # print(stocks)
            return render(request, "stockList.html" ,{"stocks":stocks["data"],"form":form})   
        else:
            print("FORM is not valid")
    else:

        form = StockExchangeForm()
        response = requests.get("https://api.twelvedata.com/stocks?exchange=BSE&outputsize=12&source=docs")
        stocks = response.json()

        return render(request, "stockList.html" ,{"stocks":stocks["data"], "form":form})  



def stockDetail(request, symbol):
    request.session['user'] = "someEmail@gmail.com"
    if(request.method=="POST"):
        print("Clicked")
        if('user' not in request.session):
            redirect("login")
        user = User.objects.get(email=request.session['user'])
        obj = FavStock(user = user, symbol=symbol)
        obj.save()
        
        
    
    # response = requests.get("https://api.twelvedata.com/stocks?symbol={}&exchange=BSE&outputsize=12&source=docs".format(symbol))
    # print("https://api.twelvedata.com/stocks?symbol={}&exchange=BSE&outputsize=12&source=docs".format(symbol))
    # print(response)
    # stock = response.json()

    # print(response)
    # for i in response:
    #     print(i)
    # return HttpResponse(response)
    from twelvedata import TDClient
    # td = TDClient(apikey="d44fa7950a544ef799b5d5353c54feb9")
    # ts = td.time_series(
    # symbol=symbol   ,
    # interval="5min"
    # ).as_json() 

    response = requests.get("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE%3A{}&apikey=ERBV9KAAJRYRXOVG".format(symbol))
    print("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE%3A{}&apikey=ERBV9KAAJRYRXOVG".format(symbol))
    print(response)
    stock = response.json()
    # for i in stocks:
    #     print(i)
    # print(stock['Time Series (Daily)'])
    data = stock['Time Series (Daily)']
    import plotly.graph_objects as go

    import pandas as pd
    from datetime import datetime

    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')
    
    fig = go.Figure(data=[go.Candlestick(x=[x for x in data.keys()],
                    open=[data[x]["1. open"] for x in data.keys()],
                    high=[data[x]["2. high"] for x in data.keys()],
                    low=[data[x]["3. low"] for x in data.keys()],
                    close=[data[x]["4. close"] for x in data.keys()])])

    import plotly.offline as opy
    div = opy.plot(fig, auto_open=False, output_type='div')
    
    graph = fig.to_html(full_html=False, default_height=500, default_width=700)
    context = {'graph': graph}

    print("HELLO")
    print([data[x]["4. close"] for x in data.keys()])
    

    import matplotlib.pyplot as plt

    ypoints = sorted([data[x]["4. close"] for x in data.keys()])
    xpoints = sorted(data.keys())

    plt.plot(xpoints, ypoints)
    import matplotlib.pyplot as plt
    import base64
    from io import BytesIO

    fig = plt.figure()
    #plot sth

    tmpfile = BytesIO()
    fig.savefig(tmpfile, format='png')
    encoded = base64.b64encode(tmpfile.getvalue()).decode('utf-8')

    html = 'Some html head' + '<img src=\'data:image/png;base64,{}\'>'.format(encoded) + 'Some more html'

    with open('test.html','w') as f:
        f.write(html)

 #line graph 
 
    
    import matplotlib.pyplot as plt

    BOX = 5
    START = 365
    changes = (8, -3, 4, -4, 12, -3, 7, -3, 5, -9, 3)

    # one way to force dimensions is to set the figure size:
    fig = plt.figure(figsize=(5, 10))

    # another way is to control the axes dimensions
    # for axes to have specific dimensions:
    #                  [ x0,  y0,   w,   h]  in figure units, from 0 to 1
    #ax = fig.add_axes([.15, .15, .7*.5, .7])
    ax = fig.add_axes([.15, .15, .7, .7])

    def sign(val):
        return val / abs(val)

    pointChanges = []
    
    for chg in changes:
        pointChanges += [sign(chg)] * abs(chg)

    symbol = {-1:'o',
            1:'x'}

    chgStart = START
    for ichg, chg in enumerate(changes):
        x = [ichg+1] * abs(chg)
        y = [chgStart + i * BOX * sign(chg) for i in range(abs(chg))] 
        chgStart += BOX * sign(chg) * (abs(chg)-2)
        ax.scatter(x, y,
                marker=symbol[sign(chg)],
                s=175)   #<----- control size of scatter symbol

    ax.set_xlim(0, len(changes)+1)
    fig.savefig('pointandfigure.png')
    # return HttpResponse(stock["Time Series (Daily)"])
    return render(request, "candleStickGraph.html" , context) #"stock":stock["data"][0]})   


    # https://api.polygon.io/v1/open-close/AAPL/2021-04-06?unadjusted=true&apiKey=uYgWTptpQgbpghz5Kvap0x9ElJG3O8Pq


    # https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE%3APAISALO&apikey=ZT190HZDN99BS851









