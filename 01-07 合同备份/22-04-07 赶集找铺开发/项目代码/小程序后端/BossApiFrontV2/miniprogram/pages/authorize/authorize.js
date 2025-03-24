// pages/authorize/authorize.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        envId: '',
        title: '赶集找铺',
        openId: '',
        userinfor: {},
    },

    getUserInfor(e) {
        wx.getUserProfile({
            desc: '用来完善用户个人信息', //展示的消息
            success: (res) => {
                this.setData({
                    //将信息保存到定义的容器里
                    userinfor: res.userInfo
                })
                const usrData = JSON.stringify(res.userInfo)
                // console.log('/pages/mine/mine?usrData=' +
                wx.setStorage({
                    key: 'nickName',
                    data: res.userInfo.nickName
                })
                wx.setStorage({
                    key: 'avatarUrl',
                    data: res.userInfo.avatarUrl
                })
                wx.switchTab({
                    url: '/pages/mine/mine?nickName=' + res.userInfo.nickName+'&avatarUrl='+res.userInfo.avatarUrl,
                })
            }
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