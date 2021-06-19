from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
# api view
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

