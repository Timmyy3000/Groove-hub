from django.urls import path
from rest_framework.generics import CreateAPIView
from .views import *

# url paterns

urlpatterns = [
    path('room/', RoomView.as_view()),
    path('create-room/', CreateRoomView.as_view())
]
