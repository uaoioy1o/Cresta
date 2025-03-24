from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from oto.serializers import *
# Create your views here.

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class WifeViewSet(viewsets.ModelViewSet):
    queryset = Wife.objects.all()
    serializer_class = WifeSerializer

class ImageUploadViewSet(viewsets.ModelViewSet):
    queryset = ImageUpload.objects.all()
    serializer_class = ImageUploadSerializer

# ----------------------------------------------------

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer