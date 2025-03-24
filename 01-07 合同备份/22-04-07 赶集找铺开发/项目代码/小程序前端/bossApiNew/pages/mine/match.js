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
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, i, n) {
        return i && e(t.prototype, i), n && e(t, n), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _idcardVerify = require("./../../utils/idcardVerify.js"), _util = require("./../../utils/util.js"), _api = require("./../../api/api.js"), Match = function(e) {
    function t() {
        var e, i, n, r;
        _classCallCheck(this, t);
        for (var s = arguments.length, a = Array(s), o = 0; o < s; o++) a[o] = arguments[o];
        return i = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(a))), 
        n.config = {
            navigationBarTitleText: "店铺匹配"
        }, n.components = {}, n.data = {
            isEdit: !1,
            id: 0,
            num: 1,
            region: [],
            regionName: "",
            shop_type: "",
            addParams: {
                area: {},
                shop_type: [],
                shop_trade: {
                    first: []
                }
            },
            selectCity: !1,
            shopType: [],
            shopIndex: 0,
            shopTrade: [],
            shopTradeIndex: 0,
            shopTypeValue: [],
            shopTradeValue: [],
            amount: 88,
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, n.computed = {}, n.events = {}, n.methods = {
            chooseArea: function() {
                this.selectCity = !this.selectCity, this.$apply();
            },
            inputValueChanged: function(e) {
                this[e.currentTarget.dataset.name] = e.detail.value, this.$apply();
            },
            min: function() {
                if (1 == this.num) return !1;
                this.num--, this.$apply();
            },
            plus: function() {
                this.num++, this.$apply();
            },
            submit: function() {
                var e = this.num, t = this.amount, i = this.id, n = this.shop_type;
                (0, _api.buyMatchShop)({
                    times: e,
                    shop_id: i,
                    type: n,
                    amount: t * e
                }).then(function(e) {
                    if (0 != e.status) return !1;
                    wx.requestPayment({
                        timeStamp: e.result.timeStamp,
                        nonceStr: e.result.nonceStr,
                        package: e.result.package,
                        signType: e.result.signType,
                        paySign: e.result.paySign,
                        success: function(e) {
                            "requestPayment:ok" == e.errMsg && _tip2.default.success("购买成功", 1e3).then(function() {
                                wx.navigateBack();
                            });
                        },
                        fail: function(e) {}
                    });
                });
            }
        }, r = i, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            this.shop_type = e.type || 1, this.id = e.id || 0, this.$apply();
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Match, "pages/mine/match"));