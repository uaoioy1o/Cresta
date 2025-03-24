// pages/refresh/refresh.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: '',
        amount: '',
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
    },

    postMoney() { // 点击确认充值
        console.log("金额大小："+this.data.amount),
        wx.cloud.callFunction({
            name: 'pay',
            data: {
                totalFee: Number(this.data.amount*100),
            },
            success: res => {
                const payment = res.result.payment
                wx.requestPayment({
                    ...payment,
                    success(res) {
                        console.log('pay success', res)
                        console.log('get success', event.totalFee)
                        console.log('get success', totalFee)
                    },
                    fail(err) {
                        console.error('pay fail', err)
                    }
                })
            },
            fail: console.error,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            type: options.type
        })
        if(options.type==1){
            this.setData({
                amount: '5'
            })
        } else if(options.type==2){
            this.setData({
                amount: '128'
            })
        } else if(options.type==3){
            this.setData({
                amount: '588'
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