// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        usrInfoGet: false,
        userinfor: {},
        nickName: '',
        avatarUrl: '',
        icon: [{
            title: "刷新",
            icon: "icon_1",
            url: "/pages/refresh/refresh?type=1",
            requireLogin: !0
        }, {
            title: "匹配",
            icon: "icon_3",
            url: "/pages/refresh/refresh?type=2",
            requireLogin: !0
        }, {
            title: "置顶",
            icon: "icon_4",
            url: "/pages/refresh/refresh?type=3",
            requireLogin: !0
        }],

        column: [
            [{
                title: "服务记录",
                icon: "mine_icon_1",
                url: "/pages/mine/service",
                tip: "查看进展",
                requireLogin: !0
            }, {
                title: "我的消息",
                url: "/pages/mine/message",
                icon: "mine_icon_2",
                tip: "查看未读消息",
                requireLogin: !0
            }, {
                title: "我的咨询",
                url: "/pages/mine/chatList",
                icon: "mine_icon_7",
                requireLogin: !0
            }, {
                title: "投诉与反馈",
                url: "/pages/mine/feedback",
                icon: "mine_icon_3",
                requireLogin: !0
            }],
            [{
                title: "邀请好友",
                url: "",
                icon: "mine_icon_4",
                tip: "",
                requireLogin: !1
            }, {
                title: "联系客服",
                url: "/pages/mine/service",
                icon: "mine_icon_5",
                tip: "9:30-11:30 14:00-17:30(周六,周日休息)",
                requireLogin: !0
            }, {
                title: "关于我们",
                url: "/pages/mine/aboutus",
                icon: "mine_icon_6",
                requireLogin: !0
            }]
        ],

        banner2: [{
            image_src: "banner_03.png"
        }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
        this.setData({
            nickName: wx.getStorageSync('nickName'),
            avatarUrl: wx.getStorageSync('avatarUrl'),
        })

        // 如果wx.getStorageSync('nickName')获取失败，跳转到authorize页面
        if (!this.data.nickName) {
            wx.redirectTo({
                url: '/pages/authorize/authorize',
            })
        }
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