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
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(e, r.key, r);
        }
    }
    return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), ChatList = function(e) {
    function t() {
        var e, n, r, i;
        _classCallCheck(this, t);
        for (var a = arguments.length, o = Array(a), u = 0; u < a; u++) o[u] = arguments[u];
        return n = r = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        r.config = {
            navigationBarTitleText: "店铺咨询"
        }, r.data = {
            feedMsgList: [],
            pageSize: 10,
            currentPage: 1
        }, r.mixins = [ _authorize2.default ], r.methods = {
            openPage: function(e, t) {
                wx.navigateTo({
                    url: "/pages/store/chat?content=" + e.content + "&shop_type=3&date_at=" + e.date_at + "&phone=" + e.phone + "&title=" + e.title + "&name=" + e.name + "&shop_consult_id=" + t
                });
            }
        }, i = n, _possibleConstructorReturn(r, i);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "onLoad",
        value: function() {
            this.handleData();
        }
    }, {
        key: "onShow",
        value: function() {}
    }, {
        key: "onReachBottom",
        value: function() {
            this.isBottom || (this.currentPage++, this.$apply(), this.handleData());
        }
    }, {
        key: "handleData",
        value: function() {
            var e = this;
            (0, _api.getMsgList)({
                method: "POST",
                page_index: this.currentPage
            }).then(function(t) {
                t && 0 == t.status && (e.feedMsgList = t.result, e.$apply());
            });
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(ChatList, "pages/mine/chatList"));