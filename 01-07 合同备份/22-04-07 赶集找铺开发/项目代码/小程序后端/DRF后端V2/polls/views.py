from django.shortcuts import render
from rest_framework import viewsets
from django.conf import settings
from django.http import HttpResponse
from polls.models import *
from polls.serializers import *

class recommentUserViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = recommentUser.objects.all()
    serializer_class = recommentUserSerializer
