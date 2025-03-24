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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _idcardVerify = require("./../../utils/idcardVerify.js"), _util = require("./../../utils/util.js"), _api = require("./../../api/api.js"), Top = function(e) {
    function t() {
        var e, i, n, a;
        _classCallCheck(this, t);
        for (var r = arguments.length, s = Array(r), o = 0; o < r; o++) s[o] = arguments[o];
        return i = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(s))), 
        n.config = {
            navigationBarTitleText: "店铺置顶"
        }, n.components = {}, n.data = {
            isEdit: !1,
            id: 0,
            num: 1,
            region: [],
            regionName: "",
            shop_type: "",
            amount: 0,
            dataSource: [ {
                id: 7,
                price: 288,
                extendPrice: 9.8,
                msg: "￥9.8购买58安居客赶集网置顶1天"
            }, {
                id: 15,
                price: 488,
                extendPrice: 9.8,
                msg: "￥9.8购买58安居客赶集网置顶1天"
            }, {
                id: 30,
                price: 888,
                extendPrice: 9.8,
                msg: "￥9.8购买58安居客赶集网置顶1天"
            } ],
            currentId: 0,
            selectedCoupon: {},
            ossHost: _wepy2.default.$appConfig.baseConfig.ossHost
        }, n.methods = {
            navDetail: function(e) {
                this.currentId = e, this.$apply();
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
                this.num--, this.$apply();
            },
            plus: function() {
                this.num++, this.$apply();
            },
            submit: function() {
                var e = (this.num, this.amount, this.id), t = this.shop_type, i = this.dataSource, n = this.currentId, a = this.selectedCoupon;
                (0, _api.buyTopShop)({
                    amount: i[n].price,
                    days: i[n].id,
                    shop_id: e,
                    type: t,
                    discount_voucher_sn: a.discount_sn
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
            },
            handleCoupon: function() {
                var e = "";
                this.selectedCoupon && this.selectedCoupon.discount_sn && (e = this.selectedCoupon.discount_sn), 
                wx.navigateTo({
                    url: "/pages/mine/coupon/index?sn=" + e + "&type=2"
                });
            },
            confirmCoupon: function(e) {
                2 == e.type || 1 == e.type && this.pay_amount > e.amount ? this.selectedCoupon = e : this.selectedCoupon = {}, 
                this.$apply();
            }
        }, a = i, _possibleConstructorReturn(n, a);
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

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Top, "pages/mine/top"));