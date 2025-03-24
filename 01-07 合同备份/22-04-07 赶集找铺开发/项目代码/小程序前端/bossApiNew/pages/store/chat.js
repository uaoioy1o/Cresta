function _interopRequireDefault(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

function _defineProperty(t, e, o) {
    return e in t ? Object.defineProperty(t, e, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = o, t;
}

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !e || "object" != typeof e && "function" != typeof e ? t : e;
}

function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function t(t, e) {
        for (var o = 0; o < e.length; o++) {
            var i = e[o];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(t, i.key, i);
        }
    }
    return function(e, o, i) {
        return o && t(e.prototype, o), i && t(e, i), e;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _CustomHeader = require("./../../components/CustomHeader.js"), _CustomHeader2 = _interopRequireDefault(_CustomHeader), _api = require("./../../api/api.js"), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _storeItem = require("./../../components/storeItem.js"), _storeItem2 = _interopRequireDefault(_storeItem), Chat = function(t) {
    function e() {
        var t, o, i, n;
        _classCallCheck(this, e);
        for (var a = arguments.length, s = Array(a), r = 0; r < a; r++) s[r] = arguments[r];
        return o = i = _possibleConstructorReturn(this, (t = e.__proto__ || Object.getPrototypeOf(e)).call.apply(t, [ this ].concat(s))), 
        i.config = {
            navigationBarTitleText: "店铺咨询"
        }, i.data = _defineProperty({
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
            name: _wepy2.default.$appConfig.baseConfig.name,
            marginBttom: 30,
            placeholder: "",
            deviceInfo: {},
            autoFocus: !1,
            showBar: !1,
            content: "",
            shop_consult_id: 0,
            commitList: [],
            is_flag: 0
        }, "icon", [ {
            title: "换电话",
            icon: "phone1"
        }, {
            title: "换微信",
            icon: "wechat1"
        }, {
            title: "标记",
            icon: "flag1"
        } ]), i.mixins = [ _authorize2.default ], i.$repeat = {}, i.$props = {
            store_item: {
                bottom: "hide",
                "xmlns:v-bind": "",
                "v-bind:item.sync": "tourDetail"
            }
        }, i.$events = {}, i.components = {
            custom_header: _CustomHeader2.default,
            store_item: _storeItem2.default
        }, i.methods = {
            bindfocus: function(t) {
                this.marginBttom = t.detail.height, this.autoFocus = !0, this.$apply();
            },
            bindconfirm: function() {
                this.handleCommit();
            },
            handleFlag: function(t) {
                if ("flag1" != t.icon) return !1;
                this.handleFollow();
            },
            bindinput: function(t) {
                this.consult = t.detail.value, this.$apply();
            },
            bindblur: function(t) {
                this.marginBttom = 30, this.autoFocus = !1, this.consult = "", this.commitPid = 0, 
                this.recordId = 0, this.$apply();
            },
            getPhoneNumber: function(t) {
                var e = this;
                "getPhoneNumber:ok" == t.detail.errMsg && (0, _api.getUserPhone)({
                    method: "POST",
                    code: encodeURIComponent(e.code),
                    iv: encodeURIComponent(t.detail.iv),
                    data: encodeURIComponent(t.detail.encryptedData)
                }).then(function(t) {
                    t && 0 == t.status && (wx.setStorageSync("tenglv_phone", t.result.phone), e.isAuth = "yes", 
                    e.$apply());
                }, function(t) {
                    e.handleGetCode();
                });
            },
            handleCallPhone: function(t) {
                (0, _api.callPhone)().then(function(t) {
                    if (0 != t.status) return !1;
                    wx.makePhoneCall({
                        phoneNumber: t.result.phone
                    });
                });
            },
            handleSaveConsult: function() {
                var t = this;
                if (!this.consult) return void _tip2.default.error("请输入咨询内容");
                (0, _api.addMsg)(Object.assign({}, this.tourDetail, {
                    msg: this.consult,
                    shop_consult_id: this.shop_consult_id
                })).then(function(e) {
                    if (10011 == e.status && wx.navigateTo({
                        url: "/pages/mine/vip"
                    }), 0 != e.status) return !1;
                    t.marginBttom = 30, t.content = "", t.placeholder = "说点什么...", t.autoFocus = !1, 
                    t.consult = "", t.commitList = e.result.list, t.$apply();
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
            }
        }, n = o, _possibleConstructorReturn(i, n);
    }
    return _inherits(e, t), _createClass(e, [ {
        key: "onPageScroll",
        value: function(t) {
            var e = t.scrollTop;
            this.tabIndex = e > 530 ? 1 : 0, this.$apply();
        }
    }, {
        key: "handleFollow",
        value: function() {
            var t = this;
            1 == this.is_flag ? (0, _api.addMsgFlag)(Object.assign({}, this.tourDetail, {
                type: 2,
                shop_consult_id: this.shop_consult_id
            })).then(function(e) {
                if (0 != e.status) return !1;
                t.is_flag = 2, t.$apply(), _tip2.default.toast("取消成功");
            }) : (0, _api.addMsgFlag)(Object.assign({}, this.tourDetail, {
                type: 1,
                shop_consult_id: this.shop_consult_id
            })).then(function(e) {
                if (0 != e.status) return !1;
                t.is_flag = 1, t.$apply(), _tip2.default.toast("标记成功");
            });
        }
    }, {
        key: "handleGetInfo",
        value: function() {
            var t = this, e = this.id;
            3 == this.type ? (0, _api.getQiuzuInfo)({
                id: e
            }).then(function(e) {
                t.tourDetail = e.result, t.bgcolor = "#fff", t.title = "求租详情", t.icon = "arrow_left_gray", 
                t.$apply();
            }) : (0, _api.getTourDetail)({
                id: e
            }).then(function(e) {
                t.tourDetail = e.result, t.$apply();
            });
        }
    }, {
        key: "onShow",
        value: function() {}
    }, {
        key: "onLoad",
        value: function(t) {
            var e = this, o = this, i = t.id, n = t.type, a = t.content, s = t.shop_type, r = t.date_at, u = t.phone, l = t.title, p = t.name, c = t.shop_consult_id, h = t.head_image;
            this.id = i, this.type = n, this.shop_consult_id = c;
            var d = [ "刚刚活跃", "前一日活跃", "前三日活跃", "前七日活跃", "前一个月活跃", "前三个月活跃", "前半年活跃" ];
            this.tourDetail = {
                content: decodeURIComponent(a),
                shop_type: s,
                date_at: r,
                name: decodeURIComponent(p),
                phone: u,
                title: decodeURIComponent(l),
                head_image: h,
                dateItem: d[parseInt(1e4 * Math.random()) % 7],
                chat: !0
            };
            try {
                this.headerHeight = wx.getMenuButtonBoundingClientRect().height + 2 * (wx.getMenuButtonBoundingClientRect().top - wx.getSystemInfoSync().safeArea.top);
            } catch (t) {}
            wx.getSystemInfo({
                success: function(t) {
                    o.deviceInfo = t.platform;
                }
            }), this.$apply(), 3 != s && this.handleGetInfo(), c && (0, _api.getMsgDetail)({
                shop_consult_id: c
            }).then(function(t) {
                e.commitList = t.result.list, e.is_flag = t.result.is_flag, e.tourDetail = Object.assign(e.tourDetail, t.result.shop_info), 
                e.$apply();
            });
        }
    }, {
        key: "onShareAppMessage",
        value: function() {
            var t = this;
            return {
                title: t.tourDetail.title,
                imageUrl: t.tourDetail.shop_images.length > 0 ? t.tourDetail.shop_images[0] : "",
                path: "/pages/store/detail?id=" + t.tourDetail.id + "&type=" + t.tourDetail.shop_type
            };
        }
    }, {
        key: "handleGetCode",
        value: function() {
            var t = this;
            wx.login({
                success: function(e) {
                    t.code = e.code, t.$apply();
                }
            });
        }
    } ]), e;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Chat, "pages/store/chat"));