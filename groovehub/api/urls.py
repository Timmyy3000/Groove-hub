from django.urls import path
from .views import *

#url paterns

urlpatterns = [
    path('api/', RoomView.as_view())
]
