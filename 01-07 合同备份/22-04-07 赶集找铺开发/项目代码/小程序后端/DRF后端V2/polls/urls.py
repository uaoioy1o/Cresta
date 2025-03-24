from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from polls.views import *

# simpleRouter 则没有
router = routers.DefaultRouter()

# router.register('test', TestViewSet, basename='test')

router.register('recommentuser', recommentUserViewSet, basename='recommentuser')

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
]

urlpatterns += router.urls
