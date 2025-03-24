from pyexpat import model
from turtle import update
from django.forms import ModelChoiceField
from rest_framework import serializers
from polls.models import *

class recommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        # 与test表对应
        model = recommentUser
        # 取全部字段
        fields = '__all__'
        # 级联查询
        depath = 1

