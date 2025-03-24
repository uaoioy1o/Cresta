function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t;
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var i = t[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, o, i) {
        return o && e(t.prototype, o), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _CustomHeader = require("./../../components/CustomHeader.js"), _CustomHeader2 = _interopRequireDefault(_CustomHeader), _api = require("./../../api/api.js"), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), StoreDetail = function(e) {
    function t() {
        var e, o, i, n;
        _classCallCheck(this, t);
        for (var a = arguments.length, r = Array(a), s = 0; s < a; s++) r[s] = arguments[s];
        return o = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(r))), 
        i.config = {
            navigationStyle: "custom"
        }, i.data = {
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            tourDetail: {},
            open_time: "",
            close_time: "",
            is_reservation: 0,
            tourStatus: {},
            title: "",
            bgcolor: "",
            icon: "arrow_left",
            isAuth: "no",
            isLogin: !1,
            code: "",
            consult: "",
            id: "",
            name: _wepy2.default.$appConfig.baseConfig.name
        }, i.mixins = [ _authorize2.default ], i.computed = {}, i.$repeat = {}, i.$props = {
            custom_header: {
                "xmlns:v-bind": "",
                "v-bind:icon.sync": "icon",
                "v-bind:title.sync": "title",
                "v-bind:backgroundColor.sync": "bgcolor"
            },
            store_item: {
                "v-bind:item.sync": "item"
            }
        }, i.$events = {}, i.components = {
            custom_header: _CustomHeader2.default,
            store_item: _storeItem2.default
        }, i.methods = {
            getPhoneNumber: function(e) {
                var t = this;
                "getPhoneNumber:ok" == e.detail.errMsg && (0, _api.getUserPhone)({
                    method: "POST",
                    code: encodeURIComponent(t.code),
                    iv: encodeURIComponent(e.detail.iv),
                    data: encodeURIComponent(e.detail.encryptedData)
                }).then(function(e) {
                    e && 0 == e.status && (wx.setStorageSync("tenglv_phone", e.result.phone), t.isAuth = "yes", 
                    t.$apply());
                }, function(e) {
                    t.handleGetCode();
                });
            },
            handleCallPhone: function(e) {
                (0, _api.callPhone)().then(function(e) {
                    if (0 != e.status) return !1;
                    wx.makePhoneCall({
                        phoneNumber: e.result.phone
                    });
                });
            },
            handleFollow: function() {
                var e = this;
                1 == this.tourDetail.is_follow ? (0, _api.cancleFollow)({
                    id: this.id
                }).then(function(t) {
                    if (0 != t.status) return !1;
                    e.tourDetail.is_follow = 0, e.$apply(), _tip2.default.toast("取消成功");
                }) : (0, _api.addFollow)({
                    shop_id: this.id,
                    type: this.tourDetail.shop_type || 1
                }).then(function(t) {
                    if (0 != t.status) return !1;
                    e.tourDetail.is_follow = 1, e.$apply(), _tip2.default.toast("关注成功");
                });
            },
            bindTextAreaBlur: function(e) {
                this.consult = e.detail.value, this.$apply();
            },
            handleSaveConsult: function() {
                var e = this;
                if (!this.consult) return void _tip2.default.error("请输入咨询内容");
                (0, _api.saveConsult)({
                    msg: this.consult,
                    shop_id: this.id,
                    type: this.tourDetail.shop_type || 1
                }).then(function(t) {
                    if (0 != t.status) return !1;
                    e.consult = "", e.$apply(), _tip2.default.toast("提交成功");
                });
            },
            openMap: function() {
                wx.openLocation({
                    latitude: parseFloat(this.tourDetail.coord_y),
                    longitude: parseFloat(this.tourDetail.coord_x),
                    scale: 13,
                    name: this.tourDetail.name,
                    address: this.tourDetail.detail_address
                });
            },
            openProfile: function() {
                wx.navigateTo({
                    url: "/pages/mine/profile?openid=" + this.tourDetail.release_opend_id
                });
            },
            openHomePage: function() {
                wx.redirectTo({
                    url: "/pages/home/index"
                });
            },
            handleChat: function() {
                wx.navigateTo({
                    url: "/pages/store/chat?id=" + this.id
                });
            }
        }, n = o, _possibleConstructorReturn(i, n);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onPageScroll",
        value: function(e) {
            var t = e.scrollTop;
            this.tabIndex = t > 530 ? 1 : 0, this.$apply();
        }
    }, {
        key: "handleGetInfo",
        value: function() {
            var e = this, t = this.id;
            3 == this.type ? (0, _api.getQiuzuInfo)({
                id: t
            }).then(function(t) {
                e.tourDetail = t.result, e.bgcolor = "#fff", e.title = "求租详情", e.icon = "arrow_left_gray", 
                e.$apply();
            }) : (0, _api.getTourDetail)({
                id: t
            }).then(function(t) {
                e.tourDetail = t.result, e.$apply();
            });
        }
    }, {
        key: "onShow",
        value: function() {
            this.handleGetInfo();
        }
    }, {
        key: "onLoad",
        value: function(e) {
            var t = e.id, o = e.type;
            this.id = t, this.type = o;
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (e) {}
            wx.getStorageSync("tenglv_phone") && (this.isAuth = "yes"), this.$apply(), this.handleGetCode();
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            var e = this;
            return {
                title: e.tourDetail.title,
                imageUrl: e.tourDetail.shop_images.length > 0 ? e.tourDetail.shop_images[0] : "",
                path: "/pages/store/detail?id=" + e.tourDetail.id + "&type=" + e.tourDetail.shop_type
            };
        }
    }, {
        key: "handleGetCode",
        value: function() {
            var e = this;
            wx.login({
                success: function(t) {
                    e.code = t.code, e.$apply();
                }
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(StoreDetail, "pages/store/detail"));