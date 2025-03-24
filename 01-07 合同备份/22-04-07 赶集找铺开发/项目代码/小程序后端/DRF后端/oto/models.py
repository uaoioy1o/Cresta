from django.db import models

# 一对一
class Author(models.Model):
    name=models.CharField('姓名',max_length=20)

class Wife(models.Model):
    name=models.CharField('姓名',max_length=20)
    author=models.OneToOneField(Author,on_delete=models.CASCADE)

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='images/')
# ----------------------------------------------------

# 一对多
class Publisher(models.Model):
    name=models.CharField('姓名',max_length=20)

class Book(models.Model):
    name=models.CharField('姓名',max_length=20)
    publisher=models.ForeignKey(Publisher,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='images/')

'''

In [1]: from oto.models import*

In [2]: pub1=Publisher.objects.first()

In [3]: pub1.name
Out[3]: 'zhangsan'

In [4]: blist=pub1.book_set.all()

In [5]: blist[0].name
Out[5]: 'JAVA'

In [6]: blist[1].name
Out[6]: 'C++'

In [7]: exit()
'''

# ----------------------------------------------------

# 多对多
class Author2(models.Model):
    name=models.CharField('姓名',max_length=20) 

class PublishBook(models.Model):
    name=models.CharField('姓名',max_length=20)
    author=models.ManyToManyField(Author2)

'''
In [1]: from oto.models import *

In [2]: au1=Author2.objects.create(name="zhangsan")

In [3]: au2=Author2.objects.create(name="lisi")

In [4]: bo1=au1.publishbook_set.create(name="python")

In [5]: au2.publishbook_set.add(bo1)

# 反向查询
In [7]: aulst=au1.publishbook_set.all()

In [8]: aulst
Out[8]: <QuerySet [<PublishBook: PublishBook object (3)>]>

In [9]: aulst[0].name
Out[9]: 'python'

# 正向查询
In [13]: bo1.author.all()
Out[13]: <QuerySet [<Author2: Author2 object (3)>, <Author2: Author2 object (4)>]>

'''