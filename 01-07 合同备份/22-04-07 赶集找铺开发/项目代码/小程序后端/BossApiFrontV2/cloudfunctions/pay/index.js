// 云函数代码
const cloud = require('wx-server-sdk')
cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async (event, context) => {
    console.log(event.totalFee)
    const res = await cloud.cloudPay.unifiedOrder({
        "body": "赶集找铺",
        "outTradeNo": "19055" + new Date().getTime(), //32个字符
        "spbillCreateIp": "127.0.0.1",
        "subMchId": "1624520238", //商户号
        "totalFee": event.totalFee, //金额
        "envId": "ganjizhaopu-2g9x6n5v705fe363", //环境ID
        "functionName": "pay_cb"
    })
    return res
}