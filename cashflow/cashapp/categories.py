from nltk.corpus import wordnet

# entertainment
entertainment = []
for syn in wordnet.synsets("entertainment"):
    for l in syn.lemmas():
        entertainment.append(l.name())

l = ['happy', 'hotel', 'room', 'park', 'movie', 'cinema']
entertainment = entertainment+l

# home utility
home_utility = []
for syn in wordnet.synsets("home"):
    for l in syn.lemmas():
        home_utility.append(l.name())
l2 = ['internet', 'telephone', 'elecricity', 'meter', 'wifi', 'broadband',
      'consumer', 'reading', 'gas', 'water', 'postpaid', 'prepaid']
home_utility += l2

# food
food = []

for syn in wordnet.synsets("restaurant"):
    for l in syn.lemmas():
        food.append(l.name())
for syn in wordnet.synsets("food"):
    for l in syn.lemmas():
        food.append(l.name())
l3 = ['bigbasket', 'milk', 'atta', 'sugar', 'restaurent','veg', 'non-veg','non veg', 'nonveg' ,  'suflower', 'oil', 'bread', 'vegetabe',
      'fruit', 'salt', 'paneer', 'restaurant', 'food', 'kitchen', 'popcorn', 'combo meal']
food += l3

# investment
investment = []
for syn in wordnet.synsets("investment"):
    for l in syn.lemmas():
        investment.append(l.name())
l1 = ['endowment', 'grant', 'loan', 'applicant', 'income', 'expenditure', 'profit',
      'interest', 'expense', 'finance', 'property', 'money', 'fixed', 'deposit', 'kissan', 'vikas']
investment = investment+l1

#travel and transportation
transport = []
for syn in wordnet.synsets("car"):
    for l in syn.lemmas():
        transport.append(l.name())
l4 = ['cab', 'ola', 'uber', 'autorickshaw', 'railway', 'air',
      'emirates', 'aerofloat', 'taxi', 'booking', 'road', 'highway']
transport += l4

# shopping
shopping = []
for syn in wordnet.synsets("dress"):
    for l in syn.lemmas():
        shopping.append(l.name())
l4 = ['iphone', 'laptop', 'saree', 'max', 'pantaloons', 'westside', 'vedic', 'makeup',
      'lipstick', 'cosmetics', 'mac', 'facewash', 'heels', 'crocs', 'footwear', 'purse']
shopping += l4
