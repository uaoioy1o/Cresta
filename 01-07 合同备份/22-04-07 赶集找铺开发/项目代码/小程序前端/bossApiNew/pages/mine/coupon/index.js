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
        for (var n = 0; n < t.length; n++) {
            var o = t[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
            Object.defineProperty(e, o.key, o);
        }
    }
    return function(t, n, o) {
        return n && e(t.prototype, n), o && e(t, o), t;
    };
}(), _wepy = require("./../../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../../api/api.js"), _couponItem = require("./../../../components/couponItem.js"), _couponItem2 = _interopRequireDefault(_couponItem), _authorize = require("./../../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _empty = require("./../../../components/empty.js"), _empty2 = _interopRequireDefault(_empty), CouponList = function(e) {
    function t() {
        var e, n, o, r;
        _classCallCheck(this, t);
        for (var i = arguments.length, u = Array(i), p = 0; p < i; p++) u[p] = arguments[p];
        return n = o = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(u))), 
        o.config = {
            navigationBarTitleText: "优惠券"
        }, o.$repeat = {}, o.$props = {
            couponItem: {
                "xmlns:v-on": "",
                "xmlns:v-bind": "",
                "v-bind:showType.sync": "1",
                "v-bind:payAmount.sync": "pay_amount",
                "v-bind:selectedCoupon.sync": "selectedCoupon",
                "v-bind:type.sync": "type",
                "v-bind:item.sync": "item"
            },
            empty: {
                title: "暂无优惠券"
            }
        }, o.$events = {
            couponItem: {
                "v-on:handleSelect": "handleSelect"
            }
        }, o.components = {
            couponItem: _couponItem2.default,
            empty: _empty2.default
        }, o.data = {
            currentType: 0,
            triggered: !1,
            couponList: [],
            selectedCoupon: {},
            pay_amount: 0,
            type: ""
        }, o.mixins = [ _authorize2.default ], o.methods = {
            openPage: function(e) {
                this.currentType = e, this.$apply(), this.reloadCoupons();
            },
            handlePulling: function() {
                this.triggered = !0, this.reloadCoupons(), this.$apply();
            },
            handleSelect: function(e) {
                this.selectedCoupon = e, this.$apply();
            },
            handleConfirm: function() {
                var e = getCurrentPages(), t = e[e.length - 2];
                console.log("this.selectedCoupon", this.selectedCoupon), t && t.confirmCoupon && t.confirmCoupon(this.selectedCoupon), 
                wx.navigateBack();
            },
            handleCancelConpon: function() {
                this.selectedCoupon = {}, this.$apply();
            }
        }, r = n, _possibleConstructorReturn(o, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "reloadCoupons",
        value: function() {
            var e = this;
            (0, _api.getUserCoupon)().then(function(t) {
                t && 0 == t.status && t.result ? e.couponList = t.result : e.couponList = [], e.triggered = !1, 
                e.$apply();
            });
        }
    }, {
        key: "onShow",
        value: function() {
            this.reloadCoupons();
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.pay_amount = e.price, this.type = e.type;
            var t = {
                discount_sn: e.sn
            };
            this.selectedCoupon = t, this.$apply();
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../../npm/wepy/lib/wepy.js").default.$createPage(CouponList, "pages/mine/coupon/index"));