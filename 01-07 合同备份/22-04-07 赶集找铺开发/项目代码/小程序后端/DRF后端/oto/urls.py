from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from oto.views import *

router = routers.DefaultRouter()
router.register('author', AuthorViewSet, basename='author')
router.register('wife', WifeViewSet, basename='wife')
router.register('imageupload', ImageUploadViewSet, basename='imageupload')
router.register('publisher', PublisherViewSet, basename='publisher')
router.register('book', BookViewSet, basename='book')

urlpatterns = [

]

urlpatterns += router.urls