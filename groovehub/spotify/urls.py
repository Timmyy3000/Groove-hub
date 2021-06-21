from django.urls import path
from .views import *

#url paterns

urlpatterns = [
    path('get-auth-url/', AuthURL.as_view()),
    path('redirect/', spotify_callback),
    path('is-authenticated/', IsAuthenticated.as_view())
]
