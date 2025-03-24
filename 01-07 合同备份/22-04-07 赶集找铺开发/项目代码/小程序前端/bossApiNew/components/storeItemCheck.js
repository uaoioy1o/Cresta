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
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _api = require("./../api/api.js"), storeItemCheck = function(e) {
    function t() {
        var e, n, r, o;
        _classCallCheck(this, t);
        for (var i = arguments.length, p = Array(i), a = 0; a < i; a++) p[a] = arguments[a];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(p))), 
        r.props = {
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
        }, r.data = {
            currentId: 0
        }, r.methods = {
            navDetail: function(e) {
                this.currentId != e.id ? this.currentId = e.id : this.currentId = 0, this.$emit("handleSelectStore", this.currentId, e.shop_type), 
                this.$apply();
            },
            openProfile: function(e) {
                wx.navigateTo({
                    url: "/pages/mine/profile?openid=" + e.open_id
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
        }, o = n, _possibleConstructorReturn(r, o);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {}
    } ]), t;
}(_wepy2.default.component);

exports.default = storeItemCheck;