from django import forms

class StockExchangeForm(forms.Form):
    StockExchanges = [("BSE", "BSE"), ("NSE", "NSE"),("Nasdaq","Nasdaq") ]
    exchange = forms.ChoiceField(choices=StockExchanges)