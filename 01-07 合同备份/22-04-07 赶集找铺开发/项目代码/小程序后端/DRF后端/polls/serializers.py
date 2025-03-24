from pyexpat import model
from turtle import update
from django.forms import ModelChoiceField
from rest_framework import serializers
from polls.models import *

# class TestSerializer(serializers.ModelSerializer):
#     class Meta:
#         # 与test表对应
#         model = Test
#         # 取全部字段
#         fields = '__all__'
#         # 级联查询
#         depath = 1

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = ImageUpload
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class TipsSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = Tips
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class StatisticalSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = Statistical
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = Banner
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = Order
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = Member
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class BindPhoneSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = BindPhone
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

# -------------------------------------------------

class ComplainImageSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    image = serializers.ImageField()
    # complain = ComplainListSerializer(required=False)
    class Meta:
        # 与test表对应
        model = ComplainImage
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

class ComplainListSerializer(serializers.ModelSerializer):
    complainimage_set = ComplainImageSerializer(many=True, read_only=True)
    class Meta:
        # 与test表对应
        model = ComplainList
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

    # def create(self, validated_data):
    #     complainimage_data = validated_data.pop('complainimage_set')
    #     complain = ComplainList.objects.create(**validated_data)
    #     for complainimage_data in complainimage_data:
    #         complainimage = ComplainImage.objects.create(complain=complain, **complainimage_data)
    #     return complain

class ShopImageSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = ShopImage
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1
    
class ShopListSerializer(serializers.ModelSerializer):
    shopimage_set = ShopImageSerializer(many=True, read_only=True)
    class Meta:
        # 与test表对应
        model = ShopList
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

