from django.shortcuts import render
from rest_framework import viewsets
from django.conf import settings
from django.http import HttpResponse
from polls.models import *
from polls.serializers import *

# 示例上传图片页面
def upload_image(request):
    return render(request,"polls/upload_image.html")

# 处理图片保存到media文件夹
def handle_uploaded_file(request):
    image = request.FILES.get("image") 
    # 图片名 
    image_name = image.name 
    # 图片内容 
    image_content = image.chunks() 
    # 写入文件 
    path = "%s/polls/%s"%(settings.MEDIA_ROOT,image_name)
    with open(path,"wb") as fs: 
        for temp in image_content: 
            fs.write(temp)
    # 图片路径名写入数据库 
    PictureInfo.objects.create(picture="polls/%s"%image_name) 
    return HttpResponse("OK")

# 返回图片接口

# class TestViewSet(viewsets.ModelViewSet):
#     # filter_class = TestFilter
#     queryset = Test.objects.all()  
#     serializer_class = TestSerializer

class ImageUploadViewSet(viewsets.ModelViewSet):
    queryset = ImageUpload.objects.all()  
    serializer_class = ImageUploadSerializer

class TipsViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = Tips.objects.all()
    serializer_class = TipsSerializer

class StatisticalViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = Statistical.objects.all()
    serializer_class = StatisticalSerializer

class BannerViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer

class OrderViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class MemberViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class BindPhoneViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = BindPhone.objects.all()
    serializer_class = BindPhoneSerializer

class ComplainImageViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = ComplainImage.objects.all()
    serializer_class = ComplainImageSerializer

class ComplainListViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = ComplainList.objects.all()
    serializer_class = ComplainListSerializer

class ShopImageViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = ShopImage.objects.all()
    serializer_class = ShopImageSerializer

class ShopListViewSet(viewsets.ModelViewSet):
    # filter_class = TestFilter
    queryset = ShopList.objects.all()
    serializer_class = ShopListSerializer
