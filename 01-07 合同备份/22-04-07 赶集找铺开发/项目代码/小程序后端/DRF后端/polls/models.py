from venv import create
from anyio import create_capacity_limiter
from django.db import models

# Create your models here.
class Test(models.Model):
    name = models.CharField(max_length=20)  

    class Meta:
        db_table = 'polls_test'
        verbose_name = '测试'
        verbose_name_plural = '测试'    

    def __str__(self):
        return self.name

'''
name: 张三
'''

class PictureInfo(models.Model):
    picture = models.CharField(max_length=100)
    class Meta:
        # 图片上传接口
        db_table = 'polls_pictureinfo'
        verbose_name = '图片'
        verbose_name_plural = '图片'
    def __str__(self):
        return self.picture


class ImageUpload(models.Model):
    img_src = models.ImageField(upload_to='img/')
    class Meta:
        # 图片上传接口
        db_table = 'polls_imageupload'
        verbose_name = '图片上传'
        verbose_name_plural = '图片上传'

class Tips(models.Model):
    id=models.AutoField(primary_key=True)
    msg=models.CharField(max_length=255)

    class Meta:
        db_table = 'polls_tips'
        verbose_name = '提示消息'
        verbose_name_plural = '提示消息'
    def __str__(self):
        return self.msg

class Statistical(models.Model):
    find_shop=models.IntegerField(default=0,verbose_name='查找店铺人数')
    find_shop_yesterday=models.IntegerField(default=0,verbose_name='昨日查找店铺人数')
    is_redirect=models.IntegerField(default=0)
    login_num=models.IntegerField(default=0,verbose_name='登录人数')
    login_num_yesterday=models.IntegerField(default=0,verbose_name='昨日登录人数')
    transfer_shop=models.IntegerField(default=0,verbose_name='转让店铺人数')
    transfer_shop_yester=models.IntegerField(default=0,verbose_name='昨日转让店铺人数')

    class Meta:
        db_table = 'polls_statistical'
        verbose_name = '首页统计数据'
        verbose_name_plural = '首页统计数据'

    def __str__(self):
        return str(self.find_shop)

class Banner(models.Model):
    href=models.CharField(max_length=255,default='')
    image_src=models.CharField(max_length=255,default='')

    class Meta:
        db_table = 'polls_banner'
        verbose_name = '轮播图'
        verbose_name_plural = 'banner'
    def __str__(self):
        return self.href

class Order(models.Model):
    wechatID = models.IntegerField('微信ID',default=0)
    orderType = models.CharField('订单类型',max_length=20)
    orderNumber = models.CharField('订单号',default=0,max_length=255)
    wechatOrderNumber = models.CharField('微信订单号',default=0,max_length=255)
    status = models.CharField('状态',max_length=20)
    orderAmount = models.IntegerField('订单金额',default=0)
    payAmount = models.IntegerField('支付金额',default=0)
    renewPoint = models.IntegerField('消费刷新点',default=0)
    # 同步状态
    syncStatus = models.CharField('是否同步',max_length=20)
    # 退款金额
    refundAmount = models.IntegerField('退款金额',default=0)
    createTime = models.DateTimeField('创建时间',auto_now_add=True)

    class Meta:
        db_table = 'polls_order'
        verbose_name = '订单'
        verbose_name_plural = '订单'
    
    def __str__(self):
        return self.orderNumber
        
class Member(models.Model):
    wechatID = models.CharField('微信ID',max_length=255)
    phoneNumber = models.CharField('手机号',max_length=255)
    renewPoint = models.IntegerField('消费刷新点',default=0)
    isPublished = models.IntegerField('是否发过店铺',default=0)
    createTime = models.DateTimeField('创建时间',default=0)
    updateTime = models.DateTimeField('更新时间',default=0)

    class Meta:
        db_table = 'polls_member'
        verbose_name = '会员'
        verbose_name_plural = '会员'
    
    def __str__(self):
        return self.phoneNumber

class BindPhone(models.Model):
    open_id=models.CharField(max_length=64)
    phone=models.CharField(max_length=11)
    create_time=models.DateField()
    update_time=models.DateField()

    class Meta:
        db_table = 'polls_bind_phone'
        verbose_name = '绑定手机号'
        verbose_name_plural = '绑定手机号'
    
    def __str__(self):
        return self.phone
# -----------------------------------------------------------

class ComplainList(models.Model):
    id = models.IntegerField(primary_key=True)
    complainTel = models.CharField(max_length=11)
    complainContent = models.CharField(max_length=255)
    createTime = models.DateTimeField(u'创建时间', auto_now_add=True)
    updateTime = models.DateTimeField(u'更新时间', auto_now=True)

    class Meta:
        db_table = 'polls_complain_list'
        verbose_name = '投诉列表'
        verbose_name_plural = '投诉列表'
    
    def __str__(self):
        return self.complainContent

class ComplainImage(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(verbose_name='图片', upload_to=f'complain/')
    complain = models.ForeignKey(ComplainList, on_delete=models.CASCADE, verbose_name='投诉')
    
    class Meta:
        db_table = 'polls_complain_image'
        verbose_name = '投诉图片'
        verbose_name_plural = '投诉图片'
    
    def __str__(self):
        return self.image.url


class ShopList(models.Model):
    shop_id = models.IntegerField(u'店铺ID', primary_key=True)
    area_id=models.IntegerField()
    area_name=models.CharField(max_length=64)
    area_size=models.IntegerField()
    city_id=models.IntegerField()
    city_name=models.CharField(max_length=64)
    consultant_count=models.CharField(max_length=64)
    consultant_list=models.TextField()
    consultants_numbers=models.CharField(max_length=64)
    is_new=models.IntegerField()
    is_recommend=models.IntegerField()
    lable_ids=models.CharField(max_length=64)
    lable_list=models.TextField()
    province_id=models.IntegerField()
    province_name=models.CharField(max_length=64)
    rent_money=models.IntegerField()
    shop_type=models.CharField(max_length=64)
    title=models.CharField(max_length=64)
    transfer_fee=models.IntegerField()
    type_id=models.IntegerField()
    createTime=models.DateTimeField(u'创建时间', auto_now=True)

    class Meta:
        db_table = 'polls_shop_list'
        verbose_name = '商铺列表'
        verbose_name_plural = '商铺列表'
    
    def __str__(self):
        return str(self.title)

'''
area_id: 410611
area_name: "淇滨区"
area_size: 200
city_id: 410600
city_name: "鹤壁市"
consultant_count: 5080
consultant_list: [{open_id: "of03P5cGHApb7qL6fsP1vrFeEZtQ",…}, {open_id: "of03P5a2l6JfPkPtbojVistWdlKk",…},…]
consultants_numbers: 5080
shop_id: 148681
is_new: 1
is_recommend: 0
lable_ids: "[1]"
lable_list: ["临街"]
province_id: 410000
province_name: "河南省"
rent_money: 4000
shop_images: [,…]
shop_type: 2
title: "(转让) 周围有成熟社区 小学 中学等配套设施"
transfer_fee: 200000
type: 1
updated_at: "2022-04-11"
'''

class ShopImage(models.Model):
    id=models.AutoField(primary_key=True)
    image=models.ImageField(verbose_name='图片',upload_to=f'shop/')
    shop=models.ForeignKey(ShopList,on_delete=models.CASCADE,verbose_name='商铺')
    
    class Meta:
        db_table = 'polls_shop_image'
        verbose_name = '商铺图片'
        verbose_name_plural = '商铺图片'
    def __str__(self):
        return self.image