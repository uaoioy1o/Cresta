from matplotlib import image
from oto.models import *
from rest_framework import serializers

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Author
        fields='__all__'
        depath = 1

class WifeSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    author = AuthorSerializer(required=False)
    class Meta:
        model=Wife
        fields='__all__'
        depath = 1

    def create(self, validated_data):
        author_data = validated_data.pop('author')
        author = Author.objects.create(**author_data)
        wife = Wife.objects.create(author=author, **validated_data)
        return wife

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model=ImageUpload
        fields='__all__'
        depath = 1

# ----------------------------------------------------
class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Publisher
        fields='__all__'
        depath = 1


class BookSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    publisher = PublisherSerializer(required=False)
    image = serializers.ImageField()
    
    class Meta:
        model=Book
        fields='__all__'
        depath = 1

class PublisherSerializer(serializers.ModelSerializer):
    book_set = BookSerializer(many=True, read_only=True)
    class Meta:
        model=Publisher
        fields='__all__'
        depath = 1