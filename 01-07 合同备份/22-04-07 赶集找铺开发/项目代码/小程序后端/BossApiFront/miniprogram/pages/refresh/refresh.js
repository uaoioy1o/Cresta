// pages/refresh/refresh.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    postMoney() { // 点击确认充值
        wx.showLoading({
            title: '加载中',
        })
        let that = this
        app.http.getData({ //第一步请求后台接口，获取发起支付所需要的数据
            amount: that.data.orderId // 我这里发起请求传过去的是订单编号
        }).then((res1) => {
            if (res1.code == 200) {
                wx.requestPayment({ // 这一步是调起微信支付
                    "appId": res1.appId,
                    "timeStamp": res1.timeStamp,
                    "nonceStr": res1.nonceStr,
                    "package": res1.package,
                    "signType": res1.signType,
                    "paySign": res1.paySign,
                    "success": function (res) {
                        wx.hideLoading({})
                        app.ShowToast('充值成功')
                    },
                    "fail": function (res) {
                        app.ShowToast('支付失败');
                    },
                    "complete": function (res) {
                        app.ShowToast('取消支付');
                    }
                })
            } else {
                wx.hideLoading({})
                app.ShowToast('支付失败')
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            type: options.type,
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