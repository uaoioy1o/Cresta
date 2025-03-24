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

var _createClass = function() {
    function e(e, t) {
        for (var o = 0; o < t.length; o++) {
            var n = t[o];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), 
            Object.defineProperty(e, n.key, n);
        }
    }
    return function(t, o, n) {
        return o && e(t.prototype, o), n && e(t, n), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), CreateStore = function(e) {
    function t() {
        var e, o, n, r;
        _classCallCheck(this, t);
        for (var a = arguments.length, p = Array(a), l = 0; l < a; l++) p[l] = arguments[l];
        return o = n = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(p))), 
        n.props = {
            show: {
                type: Boolean,
                default: !1
            },
            syncRule: {}
        }, n.data = {
            show: !1,
            menu: [ {
                name: "店铺转让",
                icon: "apply_1",
                url: "/pages/store/apply?type=2",
                tip: "让更多找店人看到"
            }, {
                name: "店铺出租",
                icon: "apply_2",
                url: "/pages/store/apply?type=1",
                tip: "店铺出租更快"
            }, {
                name: "我要找店",
                icon: "apply_3",
                url: "/pages/store/applyQz",
                tip: "找店功能全部免费"
            } ]
        }, n.methods = {
            close: function() {
                this.show = !1, this.$apply();
            },
            open: function() {
                this.show = !0, this.$apply();
            },
            apply: function(e) {
                this.show = !1, this.$apply(), _wepy2.default.navigateTo({
                    url: e.url
                });
            }
        }, n.events = {
            handleGetInfo: function(e) {
                console.log("model父组件传过来的值ruleModal", e), this.show = e, this.$apply();
            }
        }, r = o, _possibleConstructorReturn(n, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    } ]), t;
}(_wepy2.default.component);

exports.default = CreateStore;