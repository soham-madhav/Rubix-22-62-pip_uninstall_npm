"""cashflow URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# import include
from django.urls import include

from cashapp import views
from pred_app.views import redirect_root, search

urlpatterns = [
    path('', include('cashapp.urls')),
    path('admin/', admin.site.urls),
    #   path('', redirect_root),
    # /pred_app/index
    path('payments/', include('payments.urls')),

	path('pred_app/', include('pred_app.urls')),
    path('search/<str:se>/<str:stock_symbol>/', search, name='predict_stock'),
]
