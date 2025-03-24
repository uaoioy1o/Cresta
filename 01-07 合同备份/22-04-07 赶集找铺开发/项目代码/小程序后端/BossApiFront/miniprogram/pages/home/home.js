// pages/home/home.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tips: [],
        navState: 0,
        shop_list: [],
        statistic: [],
        showMoreIcon: !1,

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
            url: "/pages/store/list?type=2",
            requireLogin: !1
        }, {
            name: "出租信息",
            icon: "nav_02",
            url: "/pages/store/list?type=1",
            requireLogin: !1
        }, 
        // {
        //     name: "求租信息",
        //     icon: "nav_03",
        //     url: "/pages/store/list?type=3",
        //     requireLogin: !1
        // }, 
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        wx.showLoading({
            title: '数据加载中',
        })
        // tips 轮播请求
        wx.request({
            url: 'http://api.gjzhaopu.top:8089/api/tips/?format=json',
            data: {},
            success: res => {
                console.log(res.data.results)
                this.setData({
                    tips: res.data.results
                })
            }
        })

        wx.request({
            url: 'http://api.gjzhaopu.top:8089/api/shoplist/?format=json',
            data: {},
            success: res => {
                for (let i = 0; i < res.data.results.length; i++) {
                    // 取createTime前10位
                    res.data.results[i].createTime = res.data.results[i].createTime.substring(0, 10);
                    // label_list 逗号分隔
                    var str="";
                    str+=res.data.results[i].lable_list;
                    // console.log(str)
                    var strs=str.split(",");
                    res.data.results[i].lable_list=strs;
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