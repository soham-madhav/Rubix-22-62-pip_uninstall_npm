from .categories import entertainment, home_utility, food, investment, transport, shopping
import razorpay
import requests
from .forms import StockExchangeForm
import nltk
from django.http import HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from datetime import datetime
from .models import UserFraudAdvisor, Reminder
# from curses.ascii import HT
from pyqrcode import QRCode
import png
import pyqrcode
import re
from django.http import HttpResponse
from django.shortcuts import render
from pkg_resources import ResolutionError
# import HttpResponse
from django.http import HttpResponse
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User, Wallet, Transaction
from django.core.exceptions import ObjectDoesNotExist
from .serializers import UserSerializer, WalletSerializer, TransactionSerializer, ReminderSerializer

from twilio.rest import Client
from cashflow.settings import TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN


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
def getTransactions(request, phoneNo, timeDuration):
    import datetime
    print(datetime.timedelta(days=int(timeDuration)))
    transactions = Transaction.objects.filter(
        user=User.objects.get(phoneNumber=phoneNo))

    transactions.filter(transactionTimeStamp__gte=datetime.datetime.now(
    )-datetime.timedelta(days=int(timeDuration)))
    transactions = [x for x in transactions if x.transactionTimeStamp >=
                    datetime.datetime.now()-datetime.timedelta(days=int(timeDuration))]
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)


@ api_view(['GET'])
def getWalletBalance(request, phoneNo):
    try:
        wallet = Wallet.objects.get(
            user=User.objects.get(phoneNumber=phoneNo))
        serializer = WalletSerializer(wallet)
    except ObjectDoesNotExist:
        return Response(False)
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
    print(type(isFraudDetector.lastTransactionTS),
          isFraudDetector.lastTransactionTS)
    transactionTimeStamp = datetime. strptime(
        transactionTimeStamp, '%Y-%m-%d %H:%M:%S')
    if(transactionTimeStamp - isFraudDetector.lastTransactionTS).seconds <= 120:
        isFraud = True
    if(data['userLocation'] != User.objects.get(phoneNumber=data["phoneNo"]).userLocation):
        isFraud = True

    return Response(isFraud)

# if is fraud


@ api_view(['GET'])
def verifyUser(request, phoneNo, password):

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
    import datetime
    data["transactionTimeStamp"] = datetime.datetime.now()
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
            UserFraudAdvisor.objects.filter(user=data["user"]).update(lastTransactionAmount=transactionVal, lastTransactionTS=transactionTimeStamp, maxAmount=max(
                isFraudDetector.maxAmount, (isFraudDetector.maxAmount+int(transactionVal))/2))
        return Response(serializer.data)
    else:
        print("SERIALIZER VALID:", serializer.is_valid())
        print("SERIA", serializer.errors)
    return Response(serializer.data)


# TODO intergeate frontend
# @ api_view(['GET'])

@ api_view(['GET'])
def getQRCode(request, phoneNo, amount):

    reacturl = "http://127.0.0.1:8000"
    finalUrl = reacturl+"/sendMoney/amount="+amount+"/phoneNo="+phoneNo
# String which represents the QR code
    s = ""

    # Generate QR code
    url = pyqrcode.create(finalUrl)

    # Create and save the svg file naming "myqr.svg"
    url.svg(r"C:\Users\JaiParmani\OneDrive\Desktop\rubix\frontend\src\assets\QR\myqr.svg", scale=8)

    # Create and save the png file naming "myqr.png"
    url.png(r'C:\Users\JaiParmani\OneDrive\Desktop\rubix\frontend\src\assets\QR\myqr.png', scale=6)
    # html = r"<img src='C:\Users\JaiParmani\OneDrive\Desktop\rubix\cashflow\myqr.png'>"
    return HttpResponse(r"C:\Users\JaiParmani\OneDrive\Desktop\rubix\frontend\src\assets\QR\myqr.png")


@ api_view(['POST'])
def transferMoney(request):
    # {"phoneNo":"1", "receiverPhoneNo":2, "walletTransaction": "true", "transactionAmount": "100", "transactionTimeStamp":"2019-11-11T11:11:11", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}
    print("MAKE TRANSFER HAS BEEN CALLED")
    import json
    data = request.data
    data = list(data.keys())[0]
    print(data)
    data = json.loads(data)
    print(data)
    data["user"] = User.objects.get(phoneNumber=data["phoneNo"]).id
    phoneNo = data["phoneNo"]
    del data["phoneNo"]
    amount = data["transactionAmount"]
    receiverPhoneNo = data["receiverPhoneNo"]
    if(not User.objects.filter(phoneNumber=data["receiverPhoneNo"]).exists()):
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
            import datetime
            transactionTimeStamp = datetime.datetime.now()
            # data["transactionTimeStamp"]

            isFraudDetector = UserFraudAdvisor.objects.get(user=data["user"])
            UserFraudAdvisor.objects.filter(user=data["user"]).update(lastTransactionAmount=transactionVal, lastTransactionTS=transactionTimeStamp, maxAmount=max(
                isFraudDetector.maxAmount, (isFraudDetector.maxAmount+int(transactionVal))/2))
        return Response(serializer.data)
    else:
        print("SERIALIZER VALID:", serializer.is_valid())
        print("SERIA", serializer.errors)
    print("MAKE TRANSFER HAS BEEN CALLED")
    return Response(serializer.data)

    return Response(True)


razorpay_client = razorpay.Client(auth=(settings.RAZOR_KEY_ID,
                                        settings.RAZOR_KEY_SECRET))


def addMoneyToWallet(request):

    currency = 'INR'
    amount = 1  # Rs. 200

    # Create a Razorpay Order
    razorpay_order = razorpay_client.order.create(
        dict(amount=amount, currency=currency, payment_capture='0'))

    # order id of newly created order.
    razorpay_order_id = razorpay_order['id']
    callback_url = 'paymenthandler/'

    # we need to pass these details to frontend.
    context = {}
    context['razorpay_order_id'] = razorpay_order_id
    context['razorpay_merchant_key'] = settings.RAZOR_KEY_ID
    context['razorpay_amount'] = amount
    context['currency'] = currency
    context['callback_url'] = callback_url

    return render(request, 'index.html', context=context)


# we need to csrf_exempt this url as
# POST request will be made by Razorpay
# and it won't have the csrf token.
@csrf_exempt
def paymenthandler(request):

    # only accept POST request.
    if request.method == "POST":
        try:

            # get the required parameters from post request.
            payment_id = request.POST.get('razorpay_payment_id', '')
            razorpay_order_id = request.POST.get('razorpay_order_id', '')
            signature = request.POST.get('razorpay_signature', '')
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': payment_id,
                'razorpay_signature': signature
            }

            # verify the payment signature.
            result = razorpay_client.utility.verify_payment_signature(
                params_dict)
            if result is None:
                amount = 1  # Rs. 200
                try:

                    # capture the payemt
                    razorpay_client.payment.capture(payment_id, amount)

                    # user = User.objects.get(phoneNumber=phoneNo)
                    # walBal = Wallet.objects.get(user=user).walletBal
                    # walBal = walBal + float(amount/100)
                    # Wallet.objects.filter(user=user).update(walletBal=walBal)
                    # render success page on successful caputre of payment
                    return render(request, '<h>success</h1>')
                except:

                    # if there is an error while capturing payment.
                    return render(request, '<h>failure</h1>')
            else:

                # if signature verification fails.
                return render(request, '<h>failure</h1>')
        except:

            # if we don't find the required parameters in POST data
            return HttpResponseBadRequest()
    else:
        # if other than POST request is made.
        return HttpResponseBadRequest()


def categorize(text):
    text = text.lower()
    nltk.download('wordnet')
    words = nltk.tokenize.word_tokenize(text)
    stop_words = set(nltk.corpus.stopwords.words('english'))
    print(text)
    filtered_list = [w for w in words if w not in stop_words]
    e = f = inv = t = s = h = False
    for word in filtered_list:
        if word in entertainment:
            e = True
            break
        elif word in investment:
            inv = True
            break
        elif word in food:
            f = True
            break
        elif word in shopping:
            s = True
            break
        elif word in transport:
            t = True
            break
        elif word in home_utility:
            h = True
            break

    if(e):
        print("entertainment category")
        return 'entertainment'
    elif(inv):
        print("investment category")
        return 'investment'
    elif(s):
        print("shopping category")
        return 'shopping'
    elif(f):
        print("food category")
        return 'food'
    elif(t):
        print("transport category")
        return 'transport'
    elif(h):
        print("home utility category")
        return 'home utility'
    else:
        print("others")
        return 'others'


@api_view(['GET'])
def extractData(request, path):
    import requests
    modelid = "eb0c8084-3e95-4dc9-99ec-714fb1d31bfd"
    # url = 'https://app.nanonets.com/api/v2/Inferences/Model/' + modelid #+ '/ImageLevelInferences?start_day_interval={start_day}&current_batch_day={end_day}'

    url = 'https://app.nanonets.com/api/v2/OCR/Model/'+modelid+'/LabelFile/'
    path = r"C:\Users\JaiParmani\OneDrive\Desktop\reciept.jpg"
    data = {'file': open(path, 'rb')}

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
            dict1['merchant_adr'] = dict1['merchant_adr'].replace("\n", " ")
        if(i['label'] == "Merchant_Name"):
            dict1['merchant_name'] = i['ocr_text']

    dict1['category'] = categorize(
        dict1['merchant_name']+dict1['merchant_adr'])
    return Response(dict1)


def stockList(request):
    if(request.method == "POST"):
        form = StockExchangeForm(request.POST)
        if(form.is_valid()):
            # StockExchange
            exchange = form.data["exchange"]
            print(exchange)
            print("https://api.twelvedata.com/stocks?exchange=" +
                  exchange+"&outputsize=12&source=docs")
            url = "https://api.twelvedata.com/stocks?exchange=" + \
                exchange+"&outputsize=12&source=docs"
            print(url)
            response = requests.get(url)
        # print(response.json())

            stocks = response.json()
            # print(stocks)
            return render(request, "stockList.html", {"stocks": stocks["data"], "form": form})
        else:
            print("FORM is not valid")
    else:

        form = StockExchangeForm()
        response = requests.get(
            "https://api.twelvedata.com/stocks?exchange=BSE&outputsize=12&source=docs")
        stocks = response.json()

        return render(request, "stockList.html", {"stocks": stocks["data"], "form": form})


def stockDetail(request, symbol):
    request.session['user'] = "someEmail@gmail.com"
    if(request.method == "POST"):
        print("Clicked")
        if('user' not in request.session):
            redirect("login")
        user = User.objects.get(email=request.session['user'])
        obj = FavStock(user=user, symbol=symbol)
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

    response = requests.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE%3A{}&apikey=ERBV9KAAJRYRXOVG".format(symbol))
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

    df = pd.read_csv(
        'https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv')

    fig = go.Figure(data=[go.Candlestick(x=[x for x in data.keys()],
                                         open=[data[x]["1. open"]
                                               for x in data.keys()],
                                         high=[data[x]["2. high"]
                                               for x in data.keys()],
                                         low=[data[x]["3. low"]
                                              for x in data.keys()],
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
    # plot sth

    tmpfile = BytesIO()
    fig.savefig(tmpfile, format='png')
    encoded = base64.b64encode(tmpfile.getvalue()).decode('utf-8')

    html = 'Some html head' + \
        '<img src=\'data:image/png;base64,{}\'>'.format(
            encoded) + 'Some more html'

    with open('test.html', 'w') as f:
        f.write(html)

 # line graph

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

    symbol = {-1: 'o',
              1: 'x'}

    chgStart = START
    for ichg, chg in enumerate(changes):
        x = [ichg+1] * abs(chg)
        y = [chgStart + i * BOX * sign(chg) for i in range(abs(chg))]
        chgStart += BOX * sign(chg) * (abs(chg)-2)
        ax.scatter(x, y,
                   marker=symbol[sign(chg)],
                   s=175)  # <----- control size of scatter symbol

    ax.set_xlim(0, len(changes)+1)
    fig.savefig('pointandfigure.png')
    # return HttpResponse(stock["Time Series (Daily)"])
    # "stock":stock["data"][0]})
    return render(request, "candleStickGraph.html", context)

    # https://api.polygon.io/v1/open-close/AAPL/2021-04-06?unadjusted=true&apiKey=uYgWTptpQgbpghz5Kvap0x9ElJG3O8Pq

    # https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE%3APAISALO&apikey=ZT190HZDN99BS851


@api_view(['POST'])
def requestMoney(request):

    import json
    data = request.data
    data = list(data.keys())[0]
    print(data)
    data = json.loads(data)
    print(data)
    data["user"] = User.objects.get(phoneNumber=data["phoneNo"]).id
    # del data["phoneNo"]
# {"phoneNo":"8888888881", "walletTransaction": "true", senderPhoneNo"transactionAmount": "100", "transactionTimeStamp":"2019-11-11T11:11:11", "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}
# {"phoneNo":"1", "walletTransaction": "true", "senderPhoneNo":"2","transactionAmount": "100",  "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD"}
# {"phoneNo":"1", "walletTransaction": "true", "senderPhoneNo":"2","transactionAmount": "100",  "transactionDescription": "test", "transactionType": "CR", "transactionCategory": "FOOD", "reminderType":"Reminder"}

    import datetime
    sender = User.objects.get(phoneNumber=data["senderPhoneNo"])
    reciever = User.objects.get(phoneNumber=data["phoneNo"])
    obj = Reminder(user=sender, sendToUser=reciever, reminderType=data['transactionCategory'],
                   reminderDescription=data['transactionDescription'],
                   reminderCategory=data['transactionCategory'],  reminderTimeStamp=datetime.datetime.now(), reminderAmount=data['transactionAmount'],
                   reminderTitle="Pay money",
                   )
    # data['reminderTitle'])

    obj.save()
    return HttpResponse("True")


@api_view(['GET'])
def getReminders(request, phoneNo):
    user = User.objects.get(phoneNumber=phoneNo)
    reminders = Reminder.objects.filter(user=user)
    # serialize reminders
    serializer = ReminderSerializer(reminders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getDateWiseSpendings(request, phoneNo, duration):
    user = User.objects.get(phoneNumber=phoneNo)
    import datetime
    from datetime import timedelta

    today = datetime.datetime.now()
    if duration == "day":
        start = today - timedelta(days=1)
    elif duration == "week":
        start = today - timedelta(days=7)
    elif duration == "month":
        start = datetime.datetime.today().replace(day=1)

        # start = today - timedelta(days=30)
    elif duration == "year":
        start = today - timedelta(days=365)
    else:
        start = today - timedelta(days=1)
    end = today
    print(start, end)
    transactions = Transaction.objects.filter(
        user=user, transactionTimeStamp__range=(start, end))
    print(transactions)
    dict1 = {}
    for i in transactions:
        if(str(i.transactionTimeStamp.date()) not in dict1):
            dict1[str(i.transactionTimeStamp.date())] = {}
            if(i.transactionCategory not in dict1[str(i.transactionTimeStamp.date())]):
                dict1[str(i.transactionTimeStamp.date())
                      ][i.transactionCategory] = i.transactionAmount
            else:
                dict1[str(i.transactionTimeStamp.date())
                      ][i.transactionCategory] += i.transactionAmount
        else:
            if(i.transactionCategory not in dict1):
                dict1[str(i.transactionTimeStamp.date())
                      ][i.transactionCategory] = i.transactionAmount
            else:
                dict1[str(i.transactionTimeStamp.date())
                      ][i.transactionCategory] += i.transactionAmount
    print(dict1)

    # serialize reminders
    serializer = TransactionSerializer(dict1, many=True)
    print(dict1)
    # for i in serializer.data:
    # print(i)
    return Response(dict1)


@api_view(['GET'])
def getQuarterlyData(request, phoneNo):
    user = User.objects.get(phoneNumber=phoneNo)
    import datetime
    from datetime import timedelta
    thisMonth = datetime.datetime.today().replace(day=1)
    start = thisMonth - timedelta(days=70)
    start = start.replace(day=1)
    end = thisMonth.replace(day=28)

    transactions = Transaction.objects.filter(
        user=user, transactionTimeStamp__range=(start, end))
    dict1 = {}
    for i in transactions:
        if(i.transactionTimeStamp.month not in dict1):
            dict1[i.transactionTimeStamp.month] = {}
            if(i.transactionCategory not in dict1[i.transactionTimeStamp.month]):
                dict1[i.transactionTimeStamp.month][i.transactionCategory] = i.transactionAmount
            else:
                dict1[i.transactionTimeStamp.month][i.transactionCategory] += i.transactionAmount
        else:
            if(i.transactionCategory not in dict1):
                dict1[i.transactionTimeStamp.month][i.transactionCategory] = i.transactionAmount
            else:
                dict1[i.transactionTimeStamp.month][i.transactionCategory] += i.transactionAmount
    print(dict1)

    return Response(dict1)


@api_view(['GET'])
def budgetAnalyzer(request, phoneNo):
    budget = 10_000
    import datetime             
    user = User.objects.get(phoneNumber=phoneNo)
    transactions = Transaction.objects.filter(user=user)
    


    spent = 0
    transactions = [x for x in transactions if x.transactionTimeStamp.date() >= datetime.datetime.today().replace(day=1)]
    monthPercentage = datetime.datetime.today().day/30*100
    budget = budget*monthPercentage/100

    for i in transactions:
        spent += i.transactionAmount
    print(spent)
    warning = False
    if(spent > budget):
        warning = True
    if(warning == True):

        # need to reduce spending by
        reduceBy = (1/budget - spent)*100
        return Response({'warning': warning, 'reduceBy': reduceBy})
    return Response({'warning': warning})        
            




# PAYTM_MERCHANT_ID = 'DIY12386817555501617'
# PAYTM_SECRET_KEY = 'bKMfNxPPf_QdZppa'
# PAYTM_WEBSITE = 'EZBill'
# PAYTM_CHANNEL_ID = 'WEB'
# PAYTM_INDUSTRY_TYPE_ID = 'Retail'
# import PaytmChecksum 


# def initiate_payment(request):
#     if request.method == "GET":
#         return render(request, 'payments/pay.html')
#     try:
#         amount = int(request.POST['amount'])
#     except:
#         return render(request, 'payments/pay.html', context={'error': 'Wrong Accound Details or amount'})

#     merchant_key = PAYTM_SECRET_KEY

#     params = (
#         ('MID', PAYTM_MERCHANT_ID),
#         ('TXN_AMOUNT', str(amount)),
#         ('CHANNEL_ID', PAYTM_CHANNEL_ID),
#         ('WEBSITE', PAYTM_WEBSITE),
#         # ('EMAIL', request.user.email),
#         # ('MOBILE_N0', '9911223388'),
#         ('INDUSTRY_TYPE_ID', PAYTM_INDUSTRY_TYPE_ID),
#         ('CALLBACK_URL', 'http://127.0.0.1:8000/callback/'),
#         # ('PAYMENT_MODE_ONLY', 'NO'),
#     )

#     paytm_params = dict(params)
    

#     paytmParams = {}


#     checksum = PaytmChecksum.generateSignature(paytmParams, merchant_key)
#     print("generateSignature Returns:" + str(checksum))


#     paytm_params['CHECKSUMHASH'] = checksum
#     print('SENT: ', checksum)
#     return render(request, 'redirect.html', context=paytm_params)

# @csrf_exempt
# def callback(request):
#     if request.method == 'POST':
#         received_data = dict(request.POST)
#         paytm_params = {}
#         paytm_checksum = received_data['CHECKSUMHASH'][0]
#         for key, value in received_data.items():
#             if key == 'CHECKSUMHASH':
#                 paytm_checksum = value[0]
#             else:
#                 paytm_params[key] = str(value[0])
#         # Verify checksum
#         merchant_key = PAYTM_SECRET_KEY
#         # import checksum generation utility

#         paytmParams = dict()
#         paytmParams = request.form.to_dict()
#         paytmChecksum = paytmParams['CHECKSUMHASH']
#         paytmParams.pop('CHECKSUMHASH', None)

#         # Verify checksum
#         # Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
#         is_valid_checksum = PaytmChecksum.verifySignature(paytm_params, merchant_key, str(paytm_checksum))
#         if is_valid_checksum:
#             received_data['message'] = "Checksum Matched"
#         else:
#             received_data['message'] = "Checksum Mismatched"
#             return render(request, 'callback.html', context=received_data)
#         return render(request, 'callback.html', context=received_data)



# whatsapp api

order_details = {
    'amount': '5kg',
    'item': 'Tomatoes',
    'date_of_delivery': '03/04/2021',
    'address': 'No 1, Ciroma Chukwuma Adekunle Street, Ikeja, Lagos'
}
# @api_view(['POST'])
def send_notification(request):
    client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
    if(1):
    # if request.method == 'POST':
        user_whatsapp_number = "7021888491" # request.POST['user_number']
        message = client.messages.create(
            from_='whatsapp:+91680335799',
            body='Your {} order of {} has shipped and should be delivered on {}. Details: {}'.format(
                order_details['amount'], order_details['item'], order_details['date_of_delivery'],
                order_details['address']),
            to='whatsapp:{}'.format(user_whatsapp_number)
        )

        print(user_whatsapp_number)
        print(message.sid)
        return HttpResponse('Great! Expect a message...')

    return render(request, 'phone.html')


# from django.shortcuts import render
# from django.contrib.auth import authenticate, login as auth_login
# from django.conf import settings
# from .models import Transaction
# from .paytm import generate_checksum, verify_checksum


# def initiate_payment(request):
#     if request.method == "GET":
#         return render(request, 'payments/pay.html')
#     try:
#         username = request.POST['username']
#         password = request.POST['password']
#         amount = int(request.POST['amount'])
#         user = authenticate(request, username=username, password=password)
#         if user is None:
#             raise ValueError
#         auth_login(request=request, user=user)
#     except:
#         return render(request, 'payments/pay.html', context={'error': 'Wrong Accound Details or amount'})

#     transaction = Transaction.objects.create(made_by=user, amount=amount)
#     transaction.save()
#     merchant_key = settings.PAYTM_SECRET_KEY

#     params = (
#         ('MID', settings.PAYTM_MERCHANT_ID),
#         ('ORDER_ID', str(transaction.order_id)),
#         ('CUST_ID', str(transaction.made_by.email)),
#         ('TXN_AMOUNT', str(transaction.amount)),
#         ('CHANNEL_ID', settings.PAYTM_CHANNEL_ID),
#         ('WEBSITE', settings.PAYTM_WEBSITE),
#         # ('EMAIL', request.user.email),
#         # ('MOBILE_N0', '9911223388'),
#         ('INDUSTRY_TYPE_ID', settings.PAYTM_INDUSTRY_TYPE_ID),
#         ('CALLBACK_URL', 'http://127.0.0.1:8000/callback/'),
#         # ('PAYMENT_MODE_ONLY', 'NO'),
#     )
    
#     paytm_params = dict(params)
#     checksum = generate_checksum(paytm_params, merchant_key)

#     transaction.checksum = checksum
#     transaction.save()

#     paytm_params['CHECKSUMHASH'] = checksum
#     print('SENT: ', checksum)
#     return render(request, 'payments/redirect.html', context=paytm_params)

# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def callback(request):
#     if request.method == 'POST':
#         received_data = dict(request.POST)
#         paytm_params = {}
#         paytm_checksum = received_data['CHECKSUMHASH'][0]
#         for key, value in received_data.items():
#             if key == 'CHECKSUMHASH':
#                 paytm_checksum = value[0]
#             else:
#                 paytm_params[key] = str(value[0])
#         # Verify checksum
#         is_valid_checksum = verify_checksum(paytm_params, settings.PAYTM_SECRET_KEY, str(paytm_checksum))
#         if is_valid_checksum:
#             received_data['message'] = "Checksum Matched"
#         else:
#             received_data['message'] = "Checksum Mismatched"
#             return render(request, 'payments/callback.html', context=received_data)
#         return render(request, 'payments/callback.html', context=received_data)



