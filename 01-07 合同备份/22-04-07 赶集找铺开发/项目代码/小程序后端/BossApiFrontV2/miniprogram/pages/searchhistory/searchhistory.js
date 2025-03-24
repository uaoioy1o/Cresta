// pages/searchhistory/searchhistory.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    btnsearchhistory(e) {
        // 获取input的值
        let search = e.detail.value;

        // 判断是否为空
        if (search == '') {
            wx.showToast({
                title: '请输入搜索内容',
                icon: 'none',
                duration: 2000
            })
        } else {
            console.log(search);
            // 存储搜索记录
            wx.setStorageSync('search', search);
            // // 跳转到搜索页面
            // wx.navigateTo({
            //     url: '/pages/search/search',
            // })
            wx.showToast({
                title: '暂无相关内容',
                icon: 'success',
                duration: 2000

            })
        }
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