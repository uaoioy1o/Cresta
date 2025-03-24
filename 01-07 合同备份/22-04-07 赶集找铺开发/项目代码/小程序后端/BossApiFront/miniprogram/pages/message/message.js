// pages/message/message.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsType: [{
            name: "消息",
            value: 1
        }, {
            name: "通知",
            value: 2
        }, {
            name: "投诉建议",
            value: 3
        }],
        currentType: 1,
        pageSize: 10,
        currentPage: 1,
        dataSource: [],
        isBottom: !1,
        navState: 0,
    },

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