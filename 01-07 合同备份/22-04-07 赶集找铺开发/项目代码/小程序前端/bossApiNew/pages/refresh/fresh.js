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
            var s = t[i];
            s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), 
            Object.defineProperty(e, s.key, s);
        }
    }
    return function(t, i, s) {
        return i && e(t.prototype, i), s && e(t, s), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _idcardVerify = require("./../../utils/idcardVerify.js"), _util = require("./../../utils/util.js"), _api = require("./../../api/api.js"), Refresh = function(e) {
    function t() {
        var e, i, s, a;
        _classCallCheck(this, t);
        for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
        return i = s = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(r))), 
        s.config = {
            navigationBarTitleText: "店铺刷新"
        }, s.components = {}, s.data = {
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
            amount: 0,
            price: 1,
            dataSource: [ {
                id: 7,
                price: 288,
                extendPrice: 9.8,
                msg: "同步刷新58安居客赶集网"
            } ],
            currentId: 0,
            totalMoney: 1,
            isSync: !1,
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, s.computed = {}, s.methods = {
            chooseArea: function() {
                this.selectCity = !this.selectCity, this.$apply();
            },
            handleSync: function() {
                this.isSync = !this.isSync, this.isSync ? this.totalMoney = this.totalMoney + 5 : this.totalMoney = this.totalMoney - 5, 
                this.$apply();
            },
            inputValueChanged: function(e) {
                var t = e.currentTarget.dataset.name;
                "shop_lable" == t ? (this.shopIndex = e.detail.value, this.params.shop_lable = this.addParams.shop_type[e.detail.value].value) : "trade_id" == t ? (this.shopTradeIndex = e.detail.value, 
                this.params.trade_id = this.addParams.shop_trade.first[e.detail.value].value) : "area" == t ? (this.region = e.detail.code, 
                this.regionName = e.detail.value.join("-"), this.params.province_id = e.detail.code[0], 
                this.params.city_id = e.detail.code[1], this.params.area_id = e.detail.code[2]) : this.params[t] = e.detail.value, 
                this.$apply();
            },
            min: function() {
                if (1 == this.num) return !1;
                this.num--, this.totalMoney = this.price * this.num, this.isSync && (this.totalMoney = this.totalMoney + 5), 
                this.$apply();
            },
            plus: function() {
                this.num++, this.$apply(), this.totalMoney = this.price * this.num, this.isSync && (this.totalMoney = this.totalMoney + 5);
            },
            submit: function() {
                var e = this.num, t = this.amount, i = this.id, s = this.shop_type, a = this.totalMoney, n = this.isSync;
                (0, _api.buyRefreshPoint)({
                    refresh_point: t,
                    times: e,
                    shop_id: i,
                    type: s,
                    amount: a,
                    is_sync: n ? 1 : 0
                }).then(function(e) {
                    36999 == e.status ? _tip2.default.success("购买成功", 1e3).then(function() {
                        wx.navigateBack();
                    }) : 0 == e.status && wx.requestPayment({
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
        }, a = i, _possibleConstructorReturn(s, a);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function(e) {
            var t = this;
            this.shop_type = e.type || 1, this.id = e.id || 0, this.$apply(), (0, _api.getRefreshPoint)().then(function(e) {
                t.amount = e.result.refresh_point, t.$apply();
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Refresh, "pages/mine/refresh"));