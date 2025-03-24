// pages/home/home.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        tips: [],
        navState: 0,
        shop_list: [],
        statistic: [],
        showMoreIcon: !1,
        user_location: '',

        banner: [{
            image_src: "banner_02.png"
        },
        {
            image_src: "banner_01.png"
        }
        ],

        banner2: [{
            image_src: "banner_03.png"
        }],

        navData: [{
            name: "转让信息",
            icon: "nav_01",
            url: "/pages/hometransfer/hometransfer",
            requireLogin: !1
        }, {
            name: "出租信息",
            icon: "nav_02",
            url: "/pages/homerent/homerent",
            requireLogin: !1
        },
        {
            name: "常见问题",
            icon: "nav_03",
            url: "/pages/commonq/commonq",
            requireLogin: !1
        },
        {
            name: "特色类别",
            icon: "nav_04",
            url: "/pages/scenic/list",
            requireLogin: !1
        }],
    },

    //监听滑块
    bindchange(e) {
        console.log(e.detail.current)
        let index = e.detail.current;
        this.setData({
            navState: index
        })
    },

    //点击导航
    navSwitch: function (e) {
        console.log(e.currentTarget.dataset.index)
        let index = e.currentTarget.dataset.index;
        this.setData({
            navState: index
        })
    },

    navigateToPublish(e) {
        wx.showModal({
            title: '您还未发布店铺，请先发布',
            icon: 'none',
            duration: 2000,
            confirmText: "立即发布",
            cancelText: "放弃转店",
            success: function (res) {
                if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/publish/publish',
                        success: (result) => {
                            console.log("成功" + result)
                        },
                        fail: () => { },
                        complete: () => { }
                    });

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.setNavigationBarColor({
            backgroundColor: '#F7513B',
            frontColor: '#F7513B',
        })

        // // 判断是否存在options.city
        // if (options.city) {
        //     this.setData({
        //         user_location: options.city
        //     })
        // } else {

        // 判断wx.getStorageSync('locateCity')是否存在
        // 不存在则跳转到choosecity页面，存在则赋值给data.user_location
        if (!wx.getStorageSync('locateCity')) {
            wx.showModal({
                title: '提示',
                content: '请先选择您的城市',
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/choosecity/choosecity',
                        })
                    }
                },
                cancel: function () {
                    wx.setData({
                        user_location: '定位'
                    })
                }
            })
        } else {
            this.setData({
                user_location: wx.getStorageSync('locateCity')
            })
        }

        wx.showLoading({
            title: '数据加载中',
        })
        // tips 轮播请求
        wx.request({
            url: 'https://api.gjzhaopu.top/api/tips/?format=json',
            data: {},
            success: res => {
                console.log(res.data.results)
                this.setData({
                    tips: res.data.results
                })
            }
        })

        wx.request({
            url: 'https://api.gjzhaopu.top/api/shoplist/?format=json',
            data: {},
            success: res => {
                for (let i = 0; i < res.data.results.length; i++) {
                    // 取createTime前10位
                    res.data.results[i].createTime = res.data.results[i].createTime.substring(0, 10);
                    // label_list 逗号分隔
                    var str = "";
                    str += res.data.results[i].lable_list;
                    // console.log(str)
                    var strs = str.split(",");
                    console.log(strs)
                    res.data.results[i].lable_list = strs;
                }
                this.setData({
                    shop_list: res.data.results
                })
                console.log(this.data.shop_list)
            }
        })

        // 统计数据请求
        // wx.request({
        //     url: 'http://api.gjzhaopu.top:8089/api/statistical/',
        //     data: {},
        //     success: res => {
        //         console.log(res.data.results),
        //             this.setData({
        //                 statistic: res.data.results
        //             })
        //     }
        // })

        // 加载动画，定时器做的
        wx.hideLoading({
            success: (res) => { },
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
        if (!wx.getStorage('locateCity')) {
            wx.showModal({
                title: '提示',
                content: '请先选择您的城市',
                success: function (res) {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/choosecity/choosecity',
                        })
                    }
                },
                cancel: function () {
                    wx.setData({
                        user_location: '定位'
                    })
                }
            })
        } else {
            this.setData({
                user_location: wx.getStorageSync('locateCity')
            })
        }
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
        wx.showModal({
            title: '您还未发布店铺，请先发布',
            icon: 'none',
            duration: 2000,
            confirmText: "立即发布",
            cancelText: "放弃转店",
            success: function (res) {
                if (res.confirm) {
                    wx.switchTab({
                        url: '/pages/publish/publish',
                        success: (result) => {
                            console.log("成功" + result)
                        },
                        fail: () => { },
                        complete: () => { }
                    });

                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
        // 每次下拉触底，把pageNum+1
        this.setData({
            pageNum: this.data.pageNum + 1
        })
        console.log(this.data.pageNum)
        let that = this;
        wx.request({
            url: 'https://api.gjzhaopu.top/api/shoplist/?format=json&page=' + this.data.pageNum,
            data: {},
            success: res => {
                for (let i = 0; i < res.data.results.length; i++) {
                    // 取createTime前10位
                    res.data.results[i].createTime = res.data.results[i].createTime.substring(0, 10);
                    // label_list 逗号分隔
                    var str = "";
                    str += res.data.results[i].lable_list;
                    // console.log(str)
                    var strs = str.split(",");
                    console.log(strs)
                    res.data.results[i].lable_list = strs;
                }
                // shop_list 数组合并
                this.setData({
                    shop_list: this.data.shop_list.concat(res.data.results)
                })
                console.log(this.
                    data.shop_list)
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})