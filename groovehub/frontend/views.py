from django.shortcuts import render

# index template view

def index ( request ):
    return render(request, 'frontend/index.html')