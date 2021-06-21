from django.urls import path
from .views import *

#url paterns

urlpatterns = [
    path('', index),
    path('home/', index),
    path('join-room/', index),
    path('create-room/', index),
    path('room/<str:roomCode>/', index),
    path('room/<str:roomCode>/settings/', index)
]
