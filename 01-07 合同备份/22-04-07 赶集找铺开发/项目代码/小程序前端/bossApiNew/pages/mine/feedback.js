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
        for (var a = 0; a < t.length; a++) {
            var i = t[a];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(t, a, i) {
        return a && e(t.prototype, a), i && e(t, i), t;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _api = require("./../../api/api.js"), _authorize = require("./../../mixins/authorize.js"), _authorize2 = _interopRequireDefault(_authorize), _imageUtil = require("./../../utils/imageUtil.js"), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), Info = function(e) {
    function t() {
        var e, a, i, r;
        _classCallCheck(this, t);
        for (var n = arguments.length, o = Array(n), s = 0; s < n; s++) o[s] = arguments[s];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(o))), 
        i.config = {
            navigationBarTitleText: "投诉/建议"
        }, i.data = {
            feedbacktitle: "",
            feedbackinfo: "",
            isDisBtn: !1,
            feedCount: 0,
            shop_images: [],
            uploadParams: {}
        }, i.mixins = [ _authorize2.default ], i.methods = {
            chooseImage: function(e) {
                var t = this;
                (0, _imageUtil.chooseImage)(3 - t.shop_images.length, function(e) {
                    t.handleUploadImage(e);
                });
            },
            viewImages: function(e) {
                var t = [ e ];
                wx.previewImage({
                    urls: t
                });
            },
            deleteImage: function(e) {
                var t = this.shop_images;
                if (0 == t.length) return !1;
                t = t.filter(function(t, a) {
                    return a != e;
                }), this.shop_images = t, this.$apply();
            },
            inputValueChanged: function(e) {
                this[e.target.id] = e.detail.value, this.$apply();
            },
            handleFeedback: function() {
                var e = this, t = this, a = t.suggest, i = t.contact_info;
                return a ? i ? (t.isDisBtn = !0, t.$apply(), (0, _api.addSuggestion)({
                    image: t.shop_images,
                    suggest: a,
                    contact_info: i
                }).then(function(a) {
                    0 == a.status ? (_tip2.default.success("反馈成功"), wx.navigateBack({
                        delta: 1
                    })) : (_tip2.default.error("反馈失败"), t.feedback_title = "", t.feedback_info = "", 
                    t.isDisBtn = !1, e.$apply());
                }), void 0) : void _tip2.default.error("联系方式不能为空") : void _tip2.default.error("反馈内容不能为空");
            }
        }, r = a, _possibleConstructorReturn(i, r);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "handleGetUploadParams",
        value: function() {
            var e = this;
            (0, _api.getAlAccessKey)().then(function(t) {
                e.uploadParams = t.result.data, e.$apply();
            });
        }
    }, {
        key: "handleUploadImage",
        value: function(e) {
            var t = this;
            if (0 == e.length) return !1;
            var a = this.shop_images, i = this.uploadParams, r = i.host, n = i.dir, o = i.policy, s = i.signature, u = i.accessid;
            e.forEach(function(e) {
                var i = e.replace(/http:\/\//, "");
                wx.uploadFile({
                    url: r,
                    filePath: e,
                    name: "file",
                    formData: {
                        key: n + i,
                        policy: o,
                        OSSAccessKeyId: u,
                        signature: s
                    },
                    success: function(e) {
                        204 === e.statusCode && (a.push(r + "/" + n + i), t.shop_images = a, t.$apply());
                    }
                });
            });
        }
    }, {
        key: "onLoad",
        value: function() {
            this.handleGetUploadParams();
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(Info, "pages/mine/feedback"));