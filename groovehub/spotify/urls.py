from django.urls import path
from .views import *

#url paterns

urlpatterns = [
    path('get-auth-utl/', AuthURL.as_view())
]
