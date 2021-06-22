from django.shortcuts import render

# index template view

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')