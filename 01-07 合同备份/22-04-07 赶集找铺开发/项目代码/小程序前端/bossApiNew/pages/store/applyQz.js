function _interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function _classCallCheck(e, a) {
    if (!(e instanceof a)) throw new TypeError("Cannot call a class as a function");
}

function _possibleConstructorReturn(e, a) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !a || "object" != typeof a && "function" != typeof a ? e : a;
}

function _inherits(e, a) {
    if ("function" != typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + typeof a);
    e.prototype = Object.create(a && a.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(e, a) : e.__proto__ = a);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _createClass = function() {
    function e(e, a) {
        for (var t = 0; t < a.length; t++) {
            var i = a[t];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), 
            Object.defineProperty(e, i.key, i);
        }
    }
    return function(a, t, i) {
        return t && e(a.prototype, t), i && e(a, i), a;
    };
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _idcardVerify = require("./../../utils/idcardVerify.js"), _util = require("./../../utils/util.js"), _imageUtil = require("./../../utils/imageUtil.js"), _pickerCity = require("./../../components/pickerCity.js"), _pickerCity2 = _interopRequireDefault(_pickerCity), _api = require("./../../api/api.js"), StoreApplyQz = function(e) {
    function a() {
        var e, t, i, s;
        _classCallCheck(this, a);
        for (var r = arguments.length, p = Array(r), n = 0; n < r; n++) p[n] = arguments[n];
        return t = i = _possibleConstructorReturn(this, (e = a.__proto__ || Object.getPrototypeOf(a)).call.apply(e, [ this ].concat(p))), 
        i.config = {
            navigationBarTitleText: "发布求租信息"
        }, i.components = {
            picker_city: _pickerCity2.default
        }, i.data = {
            isEdit: !1,
            id: 0,
            showMoreTag: !1,
            params: {
                shop_type: 1,
                address: "",
                shop_images: [],
                lable_ids: [],
                phone: ""
            },
            region: [],
            regionName: "",
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
            isChecked: !1,
            title: ""
        }, i.methods = {
            handleCheckBox: function() {
                this.isChecked = !this.isChecked, this.$apply();
            },
            handleShowMoreTags: function() {
                this.showMoreTag = !this.showMoreTag, this.$apply();
            },
            handleClickTag: function(e) {
                this.params.lable_ids.indexOf(e.value) >= 0 ? this.params.lable_ids = this.params.lable_ids.filter(function(a) {
                    return a != e.value;
                }) : this.params.lable_ids.push(e.value), this.$apply();
            },
            handleXieyi: function(e) {
                wx.navigateTo({
                    url: e
                });
            },
            chooseArea: function() {
                this.selectCity = !this.selectCity, this.$apply();
            },
            chooseImage: function(e) {
                var a = this;
                (0, _imageUtil.chooseImage)(1, function(e) {
                    a.handleUploadImage(e);
                });
            },
            viewImages: function(e) {
                var a = [ e ];
                wx.previewImage({
                    urls: a
                });
            },
            deleteImage: function(e) {
                var a = this.params.shop_images;
                if (0 == a.length) return !1;
                a = a.filter(function(a, t) {
                    return t != e;
                }), this.params.shop_images = a, this.$apply();
            },
            inputValueChanged: function(e) {
                var a = e.currentTarget.dataset.name;
                "shop_lable" == a ? (this.shopIndex = e.detail.value, this.params.shop_lable = this.addParams.shop_type[e.detail.value].value) : "trade_id" == a ? (this.shopTradeIndex = e.detail.value, 
                this.params.trade_id = this.addParams.shop_trade.first[e.detail.value].value) : "area" == a ? (this.region = e.detail.code, 
                this.regionName = e.detail.value.join("-"), this.params.province_id = e.detail.code[0], 
                this.params.select_city_id = e.detail.code[1], this.params.area_id = e.detail.code[2]) : this.params[a] = e.detail.value, 
                this.$apply();
            },
            chooseLocation: function() {
                var e = this;
                wx.chooseLocation({
                    success: function(a) {
                        e.params.address = a.address, e.$apply();
                    }
                });
            },
            submit: function() {
                var e = this.params, a = (e.shop_type, e.title, e.shop_images, e.province_id, e.city_id, 
                e.area_id, e.shop_lable, e.trade_id, e.lable_ids, e.area_size, e.rent_money, e.transfer_fee, 
                e.details, e.name, e.phone);
                if (!this.isChecked) return _tip2.default.error("请阅读服务协议"), !1;
                if (!(0, _util.vailPhone)(a)) return void _tip2.default.error("请输入正确的手机号码");
                this.params.id > 0 ? (0, _api.updateShopInfo)(Object.assign({}, this.params, {
                    shop_id: this.params.id,
                    shop_type: this.params.shop_type,
                    type: 2
                })).then(function(e) {
                    if (0 != e.status) return !1;
                    _tip2.default.success("编辑成功", 1e3).then(function() {
                        wx.navigateBack();
                    });
                }) : (0, _api.addQiuzi)(Object.assign({}, this.params)).then(function(e) {
                    if (0 != e.status) return !1;
                    _tip2.default.success("提交成功", 1e3).then(function() {
                        wx.redirectTo({
                            url: "/pages/mine/shopList"
                        });
                    });
                });
            }
        }, s = t, _possibleConstructorReturn(i, s);
    }
    return _inherits(a, e), _createClass(a, [ {
        key: "handleUploadImage",
        value: function(e) {
            var a = this;
            if (0 == e.length) return !1;
            var t = this.params.shop_images;
            (0, _api.uploadImage)({
                imageData: e[0],
                extend: "jpeg",
                method: "post"
            }).then(function(e) {
                e && 0 == e.status && (t.push(e.result.src), a.params.shop_images = t, a.$apply());
            });
        }
    }, {
        key: "handleGetShopInfo",
        value: function() {
            var e = this;
            (0, _api.myShopInfo)({
                id: this.params.id,
                type: this.params.shop_type
            }).then(function(a) {
                e.params = a.result, e.params.select_city_id = e.params.city_id, e.params.lable_ids = JSON.parse(a.result.lable_ids), 
                e.shopTradeIndex = e.shopTradeValue.indexOf(e.params.trade_id) || 0, e.shopIndex = e.params.shop_lable ? e.shopTypeValue.indexOf(e.params.shop_lable) : 0, 
                e.regionName = e.params.province_name + "-" + e.params.city_name + "-" + e.params.area_name, 
                e.region = [ e.params.province_id + "", e.params.city_id + "", e.params.area_id + "" ], 
                e.$apply();
            });
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.params.shop_type = e.type || 1, this.params.id = e.id || 0, this.title = _wepy2.default.$appConfig.baseConfig.name, 
            this.$apply();
        }
    }, {
        key: "onShow",
        value: function(e) {
            var a = this;
            (0, _api.getAddParam)().then(function(e) {
                if (0 != e.status) return !1;
                a.addParams = e.result, a.shopType = e.result.shop_type.map(function(e) {
                    return e.name;
                }), a.shopTrade = e.result.shop_trade.first.map(function(e) {
                    return e.name;
                }), a.shopTypeValue = e.result.shop_type.map(function(e) {
                    return e.value;
                }), a.shopTradeValue = e.result.shop_trade.first.map(function(e) {
                    return e.value;
                }), a.params.shop_lable = e.result.shop_lable[0].value, a.params.trade_id = e.result.shop_trade.first[0].value, 
                a.$apply(), a.params.id > 0 && a.handleGetShopInfo();
            });
        }
    } ]), a;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(StoreApplyQz, "pages/store/applyQz"));