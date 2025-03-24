// pages/homerent/homerent.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageNum: 1,
        shop_list: [],
        banner: [{
            image_src: "banner_02.png"
        },
        {
            image_src: "banner_01.png"
        }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
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