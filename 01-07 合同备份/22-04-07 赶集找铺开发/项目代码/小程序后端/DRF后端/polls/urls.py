from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from rest_framework import routers
from polls.views import *

# simpleRouter 则没有
router = routers.DefaultRouter()

# router.register('test', TestViewSet, basename='test')

router.register(r'tips', TipsViewSet, basename='tips')
router.register(r'order', OrderViewSet, basename='order')
router.register(r'member', MemberViewSet, basename='member')
router.register(r'banner', BannerViewSet, basename='banner')
router.register(r'bindphone', BindPhoneViewSet, basename='bindphone')
router.register(r'imageupload', ImageUploadViewSet, basename='image')
router.register(r'statistical', StatisticalViewSet, basename='statistical')
router.register(r'shoplist', ShopListViewSet, basename='shoplist')
router.register(r'shopimage', ShopImageViewSet, basename='shopimage')
router.register(r'complainlist', ComplainListViewSet, basename='complainlist')
router.register(r'complainimage', ComplainImageViewSet, basename='complainImage')


urlpatterns = [
    url(r"^file/", upload_image),
    url(r"^handleimage/", handle_uploaded_file),
    # url(r'^admin/', admin.site.urls),
]

urlpatterns += router.urls
