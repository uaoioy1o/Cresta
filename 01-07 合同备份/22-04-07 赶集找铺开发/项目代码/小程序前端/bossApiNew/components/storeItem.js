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
}), exports.default = void 0;

var _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _api = require("./../api/api.js"), StoreItem = function(e) {
    function t() {
        var e, n, o, i;
        _classCallCheck(this, t);
        for (var p = arguments.length, a = Array(p), r = 0; r < p; r++) a[r] = arguments[r];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        o.props = {
            item: {
                type: Object,
                default: {}
            },
            bottom: {
                type: String,
                default: "show"
            },
            btnType: {
                type: String,
                default: ""
            }
        }, o.data = {
            appName: _wepy2.default.$appConfig.baseConfig.name
        }, o.methods = {
            navDetail: function(e) {
                if (3 == e.shop_type) return !e.chat && (_wepy2.default.navigateTo({
                    url: "/pages/store/chat?content=" + e.content + "&shop_type=" + e.shop_type + "&date_at=" + e.date_at + "&phone=" + e.phone + "&title=" + e.title + "&name=" + e.name + "&head_image=" + e.head_image
                }), !1);
                _wepy2.default.navigateTo({
                    url: "/pages/store/detail?id=" + e.id + "&type=" + e.shop_type
                });
            },
            openProfile: function(e) {
                wx.navigateTo({
                    url: "/pages/mine/profile?openid=" + e.open_id
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
            handleMatch: function(e) {
                wx.navigateTo({
                    url: "/pages/mine/shopList2?service=speed&recommend_shop_id=" + e.id
                });
            },
            handlePay: function(e) {
                _wepy2.default.navigateTo({
                    url: "/pages/store/apply?id=" + e.id + "&status=repay&type=" + e.shop_type
                });
            },
            handleDelete: function(e) {
                var t = this;
                _tip2.default.confirm("确认删除该店铺吗").then(function() {
                    (0, _api.deleteShopInfo)({
                        shop_id: e.id,
                        shop_type: e.shop_type
                    }).then(function(e) {
                        if (0 != e.status) return !1;
                        _tip2.default.success("编辑成功", 500), t.$emit("handleGetList");
                    });
                });
            },
            handleService: function(e, t) {
                wx.navigateTo({
                    url: "/pages/mine/" + e + "?id=" + t.id + "&type=" + t.shop_type
                });
            },
            handleUp: function(e) {
                var t = this;
                (0, _api.updateShopInfo)({
                    shop_id: e.id,
                    shop_type: e.shop_type,
                    type: 1
                }).then(function(e) {
                    if (0 != e.status) return !1;
                    _tip2.default.success("编辑成功", 500), t.$emit("handleGetList");
                });
            },
            handleCancel: function(e) {
                this.$emit("handleCancelFollow", e);
            },
            handleEdit: function(e) {
                3 == e.shop_type ? _wepy2.default.navigateTo({
                    url: "/pages/store/applyQz?id=" + e.id + "&type=" + e.shop_type
                }) : _wepy2.default.navigateTo({
                    url: "/pages/store/apply?id=" + e.id + "&type=" + e.shop_type
                });
            }
        }, i = n, _possibleConstructorReturn(o, i);
    }
    return _inherits(t, e), t;
}(_wepy2.default.component);

exports.default = StoreItem;