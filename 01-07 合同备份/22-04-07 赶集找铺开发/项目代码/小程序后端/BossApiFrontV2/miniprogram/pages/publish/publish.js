// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        area: '',
        shop_title: '',
        tfType: '',
        shop_province: '',
        shop_city: '',
        shop_cityarea: '',
        regionName: '',
        shopTypeTag: '',
        shopIndustryTag: '',
        tagcounter: 0,
        shop_lable_list: [],
        shop_area: '',
        shop_rent_price: '',
        shop_transfer_price: '',
        shop_content: '',
        user_name: '',
        user_phone: '',
        isChecked: false,
        imageLst: [],


        shop_lable: [{
            tag: '临街',
            id: 1,
            selected: false
        }, {
            tag: '可明火',
            id: 2,
            selected: false
        }, {
            tag: '上水',
            id: 3,
            selected: false
        },
        {
            tag: '下水',
            id: 4,
            selected: false
        },
        {
            tag: '可餐饮',
            id: 5,
            selected: false
        },
        {
            tag: '380v',
            id: 6,
            selected: false
        }],
        recommend_user_list: [],
        isEdit: !1,
        id: 0,
        params: {
            shop_type: 1,
            address: "",
            shop_images: [],
            lable_ids: [],
            phone: "",
            lat: "",
            lng: ""
        },
        showMoreTag: !1,
        region: [],
        addParams: {
            // area: {},
            shop_type: [],
            shop_trade: {
                first: []
            }
        },
        selectCity: !1,
        shopType: ['商业街店铺', '写字楼配套', '社区底商', '临街门面', '档口摊位', '购物百货中心', '其他'],
        shopIndex: 0,
        shopTrade: ['不限', '餐饮美食', '美容美发', '服饰鞋包', '专柜转让', '休闲娱乐', '百货超市', '生活服务', '电器通讯', '汽修美容', '医疗器械', '家居建材', '培训机构', '酒店宾馆', '公司工厂', '冷门行业', '冷饮甜品', '建材家具', '休闲娱乐', '生活服务', '其他'],
        shopTypeValue: [],
        shopTradeValue: [],
        shopTradeIndex: 0,
        amount: 378,
        amountType: 1,
        new_amount: 338.1,
        new_amount2: 298.1,
        pay_amount: 0,
        active_name: "平台限时优惠",
        active_discount: 49.9,
        active2_name: "新用户补贴",
        active2_discount: 30,
        isChecked: !1,
        stepIndex: 0,
        showConfirm: !1,
        showWarn: !1,
        displayTime: ["03", ":00", ":00"],
        timeOut: 18e3,
        userInfo: [{
            nick_name: '王先生',
            times: '1'
        }, {
            nick_name: '李女士',
            times: '5'
        }, {
            nick_name: '张先生',
            times: '3'
        }, {
            nick_name: '刘女士',
            times: '2'
        }, {
            nick_name: '汪先生',
            times: '1'
        }, {
            nick_name: '周女士',
            times: '7'
        }, {
            nick_name: '陈先生',
            times: '1'
        }
        ],
        transferType: [
            "店铺转让",
            "店铺出租",
        ],
        priceDetail: [{
            title: "负责服务到转让成功为止"
        }, {
            title: "店铺优先展示和匹配服务"
        }, {
            title: "跟进回访洽谈转让费促成合作"
        }, {
            title: "客服24小时一对一精准推荐意向客户"
        }, {
            title: "负责联系意向客户到店面谈"
        }, {
            title: "店铺信息同步线上线下各大平台，全区域推广"
        }],
        statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
        headerHeight: 40,
        activeItem: "",
        showMsg: !1,
        animationData: {},
        animation: {},
        userCount: parseInt(new Date().getMilliseconds() / 2),
        uploadParams: {},
        selectedCoupon: {},
        shop_id: 0,
        is_active: 0,
        status: "",
        days: 7
    },

    chooseImage(e) {
        // 用户选择图片，图片路径加入imageLst
        let that = this;
        let imageLst = that.data.imageLst;

        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                imageLst.push(res.tempFilePaths);
                that.setData({
                    imageLst: imageLst
                });
                console.log("add"+res.tempFilePaths);
                console.log("imageLst"+that.data.imageLst);
            }
        })

    },

    deleteImage(e) {
        // 从imageLst中删除对应index的图片
        let that = this;
        let imageLst = that.data.imageLst;
        let index = e.currentTarget.dataset.index;
        imageLst.splice(index, 1);
        that.setData({
            imageLst: imageLst
        });
        console.log("delete"+that.data.imageLst);
    },

    handleClickTag(e) {
        let selected = e.currentTarget.dataset.selected;
        let id = e.currentTarget.dataset.id;
        let shop_lable = this.data.shop_lable;
        let shop_lable_list = [];

        // selected 取反放回数组
        shop_lable.map(item => {
            if (item.id == id) {
                item.selected = !selected;
            }
        });

        // 如果shop_lable中的selected为true，则放入shop_lable_list
        shop_lable.map(item => {
            if (item.selected) {
                shop_lable_list.push(item.tag);
            }
        });

        this.setData({
            tagcounter: this.data.tagcounter + (selected ? -1 : 1),
            shop_lable: shop_lable,
            shop_lable_list: shop_lable_list
        })
        console.log(this.data.shop_lable_list);
    },

    handleGetActive2(e) {
        let that = this;
        // 弹窗询问是否退出
        wx.showModal({
            title: '红包领取成功',
            content: '恭喜您获得新用户补贴，请点击确定查看',
            success: function (res) {
                if (res.confirm) {
                    that.setData({
                        amountType: 2,
                        payAmount: that.data.new_amount2
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    handleCheckBox(e) {
        // 每次点击后isChecked取反
        this.setData({
            isChecked: !this.data.isChecked
        })
    },

    goBack(e) {
        // 弹窗询问是否退出
        wx.showModal({
            title: '店铺即将发布失败',
            content: '温馨提示:转店越早，损失越小。您真的要退出吗？暂无法把您的店铺转让信息发布给本市潜在客户',
            confirmText: "立即发布",
            cancelText: "放弃转店",
            success: function (res) {
                if (res.confirm) {
                    console.log('用户点击取消')
                } else if (res.cancel) {
                    wx.switchTab({
                        url: '/pages/home/home',
                        success: (result) => {
                            console.log("成功" + result)
                        },
                        fail: () => { },
                        complete: () => { }
                    });
                }
            }
        })
    },

    testpost(e) {
        // 通过post请求提交数据到https://api.gjzhaopu.top/api/shoplist/
        let that = this;
        // 获取时间戳后10位
        let timestamp = new Date().getTime();
        timestamp = timestamp.toString().substr(6, 10);
        let shop_id = '0122' + timestamp;
        // type_id如果tfType是店铺转让是1，否则是2
        let type_id = (this.data.tfType == '店铺转让' ? 1 : 2);
        console.log(shop_id);
        let data = {
            // 根据时间随机id
            "shop_id": Number(shop_id),
            "area_id": 0,
            "area_name": this.data.shop_cityarea,
            "area_size": Number(this.data.shop_area),
            "city_id": 0,
            "city_name": this.data.shop_city,
            "consultant_count": Number(Math.floor(Math.random() * 100 + 8)),
            "consultant_list": Number(Math.floor(Math.random() * 100 + 8)),
            "consultants_numbers": Number(Math.floor(Math.random() * 100 + 8)),
            "is_new": 1,
            "is_recommend": 0,
            "lable_ids": "null",
            "lable_list": String(this.data.shop_lable_list),
            "province_id": "0",
            "province_name": String(this.data.shop_province),
            "rent_money": Number(this.data.shop_rent_price),
            "shop_type": String(this.data.shopTypeTag),
            "title": String(this.data.title),
            "transfer_fee": Number(this.data.shop_transfer_price),
            "type_id": Number(type_id),
        }
        wx.request({
            url: 'https://api.gjzhaopu.top/api/shoplist/',
            method: 'POST',
            data: data,
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
            }
        }),
            // 把imageLst每张图片分别传到https://api.gjzhaopu.top/api/shopimage/
            this.data.imageLst.map(item => {
                wx.uploadFile({
                    url: 'https://api.gjzhaopu.top/api/shopimage/',
                    filePath: item[0],
                    method: "POST",
                    name: 'image',
                    formData: {
                        'image': item,
                        'shop': 1228364558
                    },
                    success: function (res) {
                        console.log(res);
                    },
                    fail: function (res) {
                        console.log(res);
                    }
                })
            })
    },

    stepIndexNav(e) {
        // 如果isChecked 为true 则跳转到下一步，否则提示用户
        if (this.data.isChecked) {
            this.setData({
                stepIndex: 2
            })
        }
        else {
            wx.showToast({
                title: '请先阅读并同意《店铺转让协议》',
                icon: 'none',
                duration: 2000
            })
        }
    },

    stepIndexNavBack(e) {
        this.setData({
            stepIndex: 0
        })
    },

    testfunc(e) {
        console.log("dsags");
    },

    testfunc2(e) {
        let that = this;
        console.log("dsags2");
        that.testfunc();
    },

    submit(e) {

        var payAmount = Number(this.data.amountType) == 1 ? 33810 : 29810;
        let that = this;
        // console.log('提交'+Number(payAmount) * 100);
        wx.cloud.callFunction({
            name: 'pay',
            data: {
                totalFee: Number(payAmount),
            },
            success: res => {
                const payment = res.result.payment
                wx.requestPayment({
                    ...payment,
                    success(res) {
                        console.log('pay success', res)
                        console.log('get success', event.totalFee)
                        console.log('get success', totalFee)
                        // 调用testpost方法
                        that.testpost();
                    },
                    fail(err) {
                        console.error('pay fail', err)
                        wx.showModal({
                            title: '支付失败',
                            content: '支付失败，请重新支付',
                            showCancel: false,
                            success: function (res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        })
                    }
                })
            },
            fail: console.error,
        })
    },

    PickerChangeType(e) {
        console.log(e.detail.value)
        // console.log(this.data.index)
        this.setData({
            tfType: this.data.transferType[e.detail.value]
        })
        console.log(this.data.transferType[e.detail.value])
    },

    PickerChangeArea(e) {
        console.log(e.detail.value)
        this.setData({
            regionName: e.detail.value[0] + ' ' + e.detail.value[1] + ' ' + e.detail.value[2],
            shop_province: e.detail.value[0],
            shop_city: e.detail.value[1],
            shop_cityarea: e.detail.value[2]
        })
    },

    PickerShopTypeChanged(e) {
        console.log(e.detail.value)
        // console.log(value)
        this.setData({
            shopTypeTag: this.data.shopType[e.detail.value]
        })
    },

    PickerIndustryChanged(e) {
        console.log(e.detail.value)
        // console.log(value)
        this.setData({
            shopIndustryTag: this.data.shopTrade[e.detail.value]
        })
    },

    chooseTitle(e) {
        this.setData({
            activeItem: 'title'
        })
    },

    chooseType(e) {
        this.setData({
            activeItem: 'transfer_type'
        })
    },

    chooseArea(e) {
        this.setData({
            activeItem: 'province_id'
        })
    },

    chooseLocation(e) {
        this.setData({
            activeItem: 'address'
        })
    },

    chooseShopType(e) {
        this.setData({
            activeItem: 'shop_type'
        })
    },

    chooseIndustry(e) {
        this.setData({
            activeItem: 'industry'
        })
    },

    chooseShopArea(e) {
        this.setData({
            activeItem: 'shop_area'
        })
    },

    chooseRentMoney(e) {
        this.setData({
            activeItem: 'rent_money'
        })
    },

    chooseTransferMoney(e) {
        this.setData({
            activeItem: 'transfer_money'
        })
    },

    chooseName(e) {
        this.setData({
            activeItem: 'name'
        })
    },

    choosePhone(e) {
        this.setData({
            activeItem: 'phone'
        })
    },

    inputTitleChanged(e) {
        this.setData({
            shop_title: e.detail.value
        })
    },

    inputAreaChanged(e) {
        this.setData({
            area: e.detail.value
        })
    },

    inputShopAreaChanged(e) {
        this.setData({
            shop_area: e.detail.value
        })
    },

    inputRentMoneyChanged(e) {
        this.setData({
            shop_rent_price: e.detail.value
        })
    },

    inputTransferMoneyChanged(e) {
        this.setData({
            shop_transfer_price: e.detail.value
        })
    },

    inputContentChanged(e) {
        this.setData({
            shop_content: e.detail.value
        })
    },

    inputNameChanged(e) {
        this.setData({
            user_name: e.detail.value
        })
    },

    inputPhoneChanged(e) {
        this.setData({
            user_phone: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            // 天数随机7-15
            days: Math.floor(Math.random() * (15 - 7 + 1) + 7),
        })
        var that = this;
        wx.request({
            url: 'https://apiv2.gjzhaopu.top/api/recommentuser/',
            header: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data.results)
                that.setData({
                    recommend_user_list: res.data.results
                })
            }
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})