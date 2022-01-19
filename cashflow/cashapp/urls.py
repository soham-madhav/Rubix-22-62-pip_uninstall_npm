from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    # path('subject-detail/user_id=<str:user>/subject_id=<int:id>',
    # #      views.subjectDetail, name="subject-detail"),
    # path('post-list/username=<str:username>/',
    #      views.postList, name="post-list"),

    # path('user-recommend/user name=<str:username>/', views.recommendUsers, name="recommendUsers"),
    path('user-login/phoneNo=<str:phoneNo>/password=<str:password>/',         # >/password=<str:password>'
         views.userLogin, name="user-login"),

    # # # path('subject-detail/<str:pk>/', views.subjectDetail, name="subject-detail"),
    path('addTransaction/',     views.addTransaction, name="addTransaction"),
    path('fraudCheck/',     views.fraudCheck, name="fraudCheck"),
    path('verifyUser',     views.verifyUser, name="verifyUser"),
    path('getTransactions/phoneNo=<str:phoneNo>/',     views.getTransactions, name="getTransactions"),
    path('user-register/', views.userRegistration, name="user-registration"),
    # path('user-follow/', views.userFollow, name="user-follow"),
    path('getQR/phoneNo=<str:phoneNo>/amount=<str:amount>/', views.getQRCode, name="getQR"),
    path("stockDetail/<str:symbol>", views.stockDetail),
    path("stockList", views.stockList, name="stockList")
    # # path('subject-update/user=<str:user>/subject_id=<int:id>',
    # #      views.subjectUpdate, name="subject-update"),
    # # path('subject-delete/subjectId=<str:subjectId>/',
    # #      views.subjectDelete, name="subject-delete"),
]
