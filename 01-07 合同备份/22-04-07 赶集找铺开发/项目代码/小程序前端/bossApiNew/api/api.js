function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.getVip = exports.getPrivate = exports.getMarket = exports.getXieyi = exports.getAboutUs = exports.getMsgDetail = exports.getMsgList = exports.addMsgFlag = exports.addMsg = exports.buyVip = exports.updateRead = exports.getShopSuggestion = exports.addShopPay = exports.getAlAccessKey = exports.getHandleTips = exports.getCoupon = exports.receiveCoupon = exports.getUserCoupon = exports.getNewMark = exports.buySpeedShop = exports.locationCity = exports.deleteShopInfo = exports.getDefaultArea = exports.getBanner = exports.callPhone = exports.buyTopShop = exports.buyMatchShop = exports.buyRefreshPoint = exports.getMyHome = exports.getRefreshPoint = exports.getShopHome = exports.getRecommendInfo = exports.accumulateFindShop = exports.accumulateTransferList = exports.accumulateWechatList = exports.getShopMessage = exports.serviceList = exports.footPrintList = exports.myShopInfo = exports.updateShopInfo = exports.getQiuzuInfo = exports.myShopList = exports.addQiuzi = exports.addShop = exports.getShopAmount = exports.uploadAnyImage = exports.uploadImage = exports.getAddParam = exports.getTourDetail = exports.getShopTrade = exports.getRegion = exports.getRecommend = exports.addSuggestion = exports.followList = exports.cancleFollow = exports.addFollow = exports.saveConsult = exports.getQzShopList = exports.getShopList = exports.getHomeData = exports.userLogin = exports.getUserPhone = void 0;

var _wxRequest = require("./../utils/wxRequest.js"), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), apiMall = _wepy2.default.$appConfig.prod ? _wepy2.default.$appConfig.baseConfig.api : "https://zdcs.wuhanwanxin.cn/api/", agreement = _wepy2.default.$appConfig.baseConfig.agreement, getUserPhone = exports.getUserPhone = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/bind_phone");
}, userLogin = exports.userLogin = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/login");
}, getHomeData = exports.getHomeData = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/home");
}, getShopList = exports.getShopList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/shop_list");
}, getQzShopList = exports.getQzShopList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/qiuzu_list");
}, saveConsult = exports.saveConsult = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/save_consult");
}, addFollow = exports.addFollow = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_follow");
}, cancleFollow = exports.cancleFollow = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/cancle_follow");
}, followList = exports.followList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/follow_list");
}, addSuggestion = exports.addSuggestion = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_suggestion");
}, getRecommend = exports.getRecommend = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/recommend");
}, getRegion = exports.getRegion = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_region");
}, getShopTrade = exports.getShopTrade = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_trade");
}, getTourDetail = exports.getTourDetail = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_info");
}, getAddParam = exports.getAddParam = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_add_param");
}, uploadImage = exports.uploadImage = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/upload_image");
}, uploadAnyImage = exports.uploadAnyImage = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/upload_any_image");
}, getShopAmount = exports.getShopAmount = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_amount");
}, addShop = exports.addShop = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_shop");
}, addQiuzi = exports.addQiuzi = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_qiuzi");
}, myShopList = exports.myShopList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/my_shop_list");
}, getQiuzuInfo = exports.getQiuzuInfo = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_qiuzu_info");
}, updateShopInfo = exports.updateShopInfo = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/update_shop_info");
}, myShopInfo = exports.myShopInfo = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/my_shop_info");
}, footPrintList = exports.footPrintList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/footprint_list");
}, serviceList = exports.serviceList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_service");
}, getShopMessage = exports.getShopMessage = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_message");
}, accumulateWechatList = exports.accumulateWechatList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/accumulate_wechat_list");
}, accumulateTransferList = exports.accumulateTransferList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/accumulate_transfer_list");
}, accumulateFindShop = exports.accumulateFindShop = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/accumulate_find_shop");
}, getRecommendInfo = exports.getRecommendInfo = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_recommend_info");
}, getShopHome = exports.getShopHome = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_home");
}, getRefreshPoint = exports.getRefreshPoint = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_refresh_point");
}, getMyHome = exports.getMyHome = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/my_home");
}, buyRefreshPoint = exports.buyRefreshPoint = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/buy_refresh_point");
}, buyMatchShop = exports.buyMatchShop = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/buy_match_shop");
}, buyTopShop = exports.buyTopShop = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/buy_top_shop");
}, callPhone = exports.callPhone = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/call_phone");
}, getBanner = exports.getBanner = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_banner");
}, getDefaultArea = exports.getDefaultArea = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_default_area");
}, deleteShopInfo = exports.deleteShopInfo = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/delete_shop_info");
}, locationCity = exports.locationCity = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/locationCity");
}, buySpeedShop = exports.buySpeedShop = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/buy_speed_shop");
}, getNewMark = exports.getNewMark = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_new_mark");
}, getUserCoupon = exports.getUserCoupon = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_user_coupon");
}, receiveCoupon = exports.receiveCoupon = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/receive_coupon");
}, getCoupon = exports.getCoupon = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_coupon");
}, getHandleTips = exports.getHandleTips = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_handle_tips");
}, getAlAccessKey = exports.getAlAccessKey = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_al_accessKey");
}, addShopPay = exports.addShopPay = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_shop_pay");
}, getShopSuggestion = exports.getShopSuggestion = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_suggestion");
}, updateRead = exports.updateRead = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/update_read");
}, buyVip = exports.buyVip = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/buy_shop_vip");
}, addMsg = exports.addMsg = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/add_shop_consult");
}, addMsgFlag = exports.addMsgFlag = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/flag_shop_consult");
}, getMsgList = exports.getMsgList = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_consult");
}, getMsgDetail = exports.getMsgDetail = function(e) {
    return (0, _wxRequest.wxRequest)(e, apiMall + "zd/get_shop_consult_info");
}, getAboutUs = exports.getAboutUs = function(e) {
    return (0, _wxRequest.wxRequest)(e, agreement + e.app + "/about.json");
}, getXieyi = exports.getXieyi = function(e) {
    return (0, _wxRequest.wxRequest)(e, agreement + e.app + "/xieyi.json");
}, getMarket = exports.getMarket = function(e) {
    return (0, _wxRequest.wxRequest)(e, agreement + e.app + "/market.json");
}, getPrivate = exports.getPrivate = function(e) {
    return (0, _wxRequest.wxRequest)(e, agreement + e.app + "/private.json");
}, getVip = exports.getVip = function(e) {
    return (0, _wxRequest.wxRequest)(e, agreement + e.app + "/vip.json");
};