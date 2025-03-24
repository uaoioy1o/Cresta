// pages/publish/publish.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
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
        regionName: "",
        addParams: {
            area: {},
            shop_type: [],
            shop_trade: {
                first: []
            },
            shop_lable: []
        },
        selectCity: !1,
        shopType: [],
        shopIndex: 0,
        shopTrade: [],
        shopTypeValue: [],
        shopTradeValue: [],
        shopTradeIndex: 0,
        amount: 0,
        pay_amount: 0,
        active_name: "平台优惠",
        active_discount: 0,
        active2_name: "新用户补贴",
        active2_discount: 0,
        isChecked: !1,
        title: "",
        stepIndex: 0,
        showConfirm: !1,
        showWarn: !1,
        displayTime: ["03", ":00", ":00"],
        timeOut: 18e3,
        transferType: [
            "店铺转让",
            "店铺出租",
        ],
        priceDetail: [{
            title: "服务到成功转出"
        }, {
            title: "平台首页置顶展示"
        }, {
            title: "跟进回访洽谈转让费"
        }, {
            title: "信息同步在各大网站"
        }, {
            title: "店铺24小时全网自动推广"
        }, {
            title: "负责联系意向客户到店面谈"
        }, {
            title: "客服一对一联系精准意向客户"
        }],
        statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
        headerHeight: 40,
        activeItem: "",
        userInfo: {},
        showMsg: !1,
        animationData: {},
        animation: {},
        userCount: parseInt(new Date().getMilliseconds() / 2),
        uploadParams: {},
        selectedCoupon: {},
        shop_id: 0,
        is_active: 0,
        status: "",
        recommend_user_list: [],
        days: 7
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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