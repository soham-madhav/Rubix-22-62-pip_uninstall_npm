from twilio.rest import Client

client = Client()

client.messages.create(body="HLLO", from_="+917021888491", to="+917021888491")