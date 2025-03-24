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
}(), _wepy = require("./../../npm/wepy/lib/wepy.js"), _wepy2 = _interopRequireDefault(_wepy), _tip = require("./../../utils/tip.js"), _tip2 = _interopRequireDefault(_tip), _idcardVerify = require("./../../utils/idcardVerify.js"), _util = require("./../../utils/util.js"), _imageUtil = require("./../../utils/imageUtil.js"), _step = require("./../../components/step.js"), _step2 = _interopRequireDefault(_step), _CustomHeader = require("./../../components/CustomHeader.js"), _CustomHeader2 = _interopRequireDefault(_CustomHeader), _api = require("./../../api/api.js"), interval = null, timeval = null, timeval2 = null, StoreApply = function(e) {
    function t() {
        var e, a, i, s;
        _classCallCheck(this, t);
        for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
        return a = i = _possibleConstructorReturn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [ this ].concat(r))), 
        i.config = {
            navigationBarTitleText: "发布店铺",
            navigationStyle: "custom"
        }, i.$repeat = {}, i.$props = {
            step: {
                "xmlns:wx": "",
                "xmlns:v-bind": "",
                "v-bind:currentIndex.sync": "stepIndex"
            }
        }, i.$events = {}, i.components = {
            step: _step2.default,
            custom_header: _CustomHeader2.default
        }, i.data = {
            isEdit: !1,
            id: 0,
            params: {
                shop_type: 1,
                address: "",
                shop_images: [],
                lable_ids: [],
                phone: "",
                lat: "",
                lng: ""
            },
            showMoreTag: !1,
            region: [],
            regionName: "",
            addParams: {
                area: {},
                shop_type: [],
                shop_trade: {
                    first: []
                },
                shop_lable: []
            },
            selectCity: !1,
            shopType: [],
            shopIndex: 0,
            shopTrade: [],
            shopTypeValue: [],
            shopTradeValue: [],
            shopTradeIndex: 0,
            amount: 0,
            pay_amount: 0,
            active_name: "平台优惠",
            active_discount: 0,
            active2_name: "新用户补贴",
            active2_discount: 0,
            isChecked: !1,
            title: "",
            stepIndex: 0,
            showConfirm: !1,
            showWarn: !1,
            displayTime: [ "03", ":00", ":00" ],
            timeOut: 18e3,
            priceDetail: [ {
                title: "服务到成功转出"
            }, {
                title: "平台首页置顶展示"
            }, {
                title: "跟进回访洽谈转让费"
            }, {
                title: "信息同步在各大网站"
            }, {
                title: "店铺24小时全网自动推广"
            }, {
                title: "负责联系意向客户到店面谈"
            }, {
                title: "客服一对一联系精准意向客户"
            } ],
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight,
            headerHeight: 40,
            activeItem: "",
            userInfo: {},
            showMsg: !1,
            animationData: {},
            animation: {},
            userCount: parseInt(new Date().getMilliseconds() / 2),
            uploadParams: {},
            selectedCoupon: {},
            shop_id: 0,
            is_active: 0,
            status: "",
            recommend_user_list: [],
            days: 7
        }, i.methods = {
            handleCheckBox: function() {
                this.isChecked = !this.isChecked, this.$apply();
            },
            handleShowMoreTags: function() {
                this.showMoreTag = !this.showMoreTag, this.$apply();
            },
            handleClickTag: function(e) {
                if (this.params.lable_ids.indexOf(e.value) >= 0) this.params.lable_ids = this.params.lable_ids.filter(function(t) {
                    return t != e.value;
                }); else {
                    if (this.params.lable_ids.length >= 3) return !1;
                    this.params.lable_ids.push(e.value);
                }
                this.$apply();
            },
            chooseArea: function() {
                this.selectCity = !this.selectCity, this.$apply();
            },
            chooseImage: function(e) {
                var t = this;
                (0, _imageUtil.chooseImage)(6 - t.params.shop_images.length, function(e) {
                    t.handleUploadImage(e);
                });
            },
            handleXieyi: function(e) {
                wx.navigateTo({
                    url: e
                });
            },
            viewImages: function(e) {
                var t = [ e ];
                wx.previewImage({
                    urls: t
                });
            },
            deleteImage: function(e) {
                var t = this.params.shop_images;
                if (0 == t.length) return !1;
                t = t.filter(function(t, a) {
                    return a != e;
                }), this.params.shop_images = t, this.$apply();
            },
            inputValueChanged: function(e) {
                var t = e.currentTarget.dataset.name;
                "shop_lable" == t ? (this.shopIndex = e.detail.value, this.params.shop_lable = this.addParams.shop_type[e.detail.value].value) : "trade_id" == t ? (this.shopTradeIndex = e.detail.value, 
                this.params.trade_id = this.addParams.shop_trade.first[e.detail.value].value) : "area" == t ? (this.region = e.detail.code, 
                this.regionName = e.detail.value.join("-"), this.params.province_id = e.detail.code[0], 
                this.params.select_city_id = e.detail.code[1], this.params.area_id = e.detail.code[2], 
                this.handleGetAmount(this.params.select_city_id)) : this.params[t] = e.detail.value, 
                this.activeItem = "", this.$apply();
            },
            chooseLocation: function() {
                var e = this;
                wx.chooseLocation({
                    success: function(t) {
                        e.params.address = t.address, e.params.lat = t.latitude, e.params.lng = t.longitude, 
                        e.$apply();
                    }
                });
            },
            next: function() {
                var e = this.params, t = (e.shop_type, e.title), a = e.shop_images, i = e.province_id, s = e.address, n = (e.city_id, 
                e.area_id, e.shop_lable, e.trade_id, e.lable_ids), r = e.area_size, o = e.rent_money, p = e.transfer_fee2, l = e.details, u = e.name, h = e.phone;
                return 0 == a.length ? (wx.pageScrollTo({
                    scrollTop: 0
                }), _tip2.default.error("请上传店铺图片"), this.activeItem = "shop_images", void this.$apply()) : (this.activeItem = "", 
                this.$apply(), t ? (this.activeItem = "", this.$apply(), i ? (this.activeItem = "", 
                this.$apply(), s ? (this.activeItem = "", this.$apply(), 0 == n.length ? (_tip2.default.error("请选择店铺标签"), 
                this.activeItem = "lable_ids", wx.pageScrollTo({
                    scrollTop: 500
                }), void this.$apply()) : (this.activeItem = "", this.$apply(), r ? (this.activeItem = "", 
                this.$apply(), o ? (this.activeItem = "", this.$apply(), p ? (this.activeItem = "", 
                this.$apply(), l ? (this.activeItem = "", this.$apply(), u ? (this.activeItem = "", 
                this.$apply(), (0, _util.vailPhone)(h) ? (this.activeItem = "", this.$apply(), this.isChecked ? void this.handleAdd() : (_tip2.default.error("请阅读服务协议"), 
                !1)) : (_tip2.default.error("请填写正确的手机号码"), this.activeItem = "phone", void this.$apply())) : (_tip2.default.error("请填写联系人名称"), 
                this.activeItem = "name", void this.$apply())) : (_tip2.default.error("请填写详情介绍"), 
                this.activeItem = "details", void this.$apply())) : (_tip2.default.error("请填写店铺转让费"), 
                this.activeItem = "transfer_fee", void this.$apply())) : (_tip2.default.error("请填写店铺租金"), 
                this.activeItem = "rent_money", void this.$apply())) : (_tip2.default.error("请填写店铺面积"), 
                this.activeItem = "area_size", void this.$apply()))) : (_tip2.default.error("请填写店铺地址"), 
                this.activeItem = "address", wx.pageScrollTo({
                    scrollTop: 300
                }), void this.$apply())) : (_tip2.default.error("请选择店铺区域"), this.activeItem = "province_id", 
                wx.pageScrollTo({
                    scrollTop: 250
                }), void this.$apply())) : (_tip2.default.error("请填写标题"), this.activeItem = "title", 
                wx.pageScrollTo({
                    scrollTop: 120
                }), void this.$apply()));
            },
            goBack: function() {
                this.showWarn = !0, this.$apply();
            },
            handleGetActive2: function() {
                this.is_active = 1, this.$apply();
            },
            submit: function() {
                var e = this.params, t = (e.shop_type, e.title, e.shop_images, e.province_id, e.city_id, 
                e.area_id, e.shop_lable, e.trade_id, e.lable_ids, e.area_size, e.rent_money, e.transfer_fee2, 
                e.details, e.name, e.phone);
                if (!(0, _util.vailPhone)(t)) return void _tip2.default.error("请填写正确的手机号码");
                if (!this.isChecked) return _tip2.default.error("请阅读服务协议"), !1;
                this.shop_id > 0 ? this.handlePay() : this.params.id > 0 ? (this.params.transfer_fee = 1e4 * this.params.transfer_fee2, 
                (0, _api.updateShopInfo)(Object.assign({}, this.params, {
                    shop_id: this.params.id,
                    shop_type: this.params.shop_type,
                    type: 2
                })).then(function(e) {
                    if (0 != e.status) return !1;
                    _tip2.default.success("编辑成功", 1e3).then(function() {
                        wx.navigateBack();
                    });
                })) : this.handleAdd();
            },
            confirm: function() {
                this.showConfirm = !this.showConfirm, this.stepIndex = 0, this.showConfirm ? this.handleTimeOut() : (clearTimeout(timeval2), 
                clearTimeout(timeval)), this.$apply();
            },
            handleCoupon: function() {
                var e = "";
                this.selectedCoupon && this.selectedCoupon.discount_sn && (e = this.selectedCoupon.discount_sn), 
                wx.navigateTo({
                    url: "/pages/mine/coupon/index?sn=" + e + "&price=" + (this.pay_amount || "") + "&type=1"
                });
            },
            handleShowWarn: function() {
                var e = getCurrentPages();
                this.showWarn = !1, this.$apply(), 1 == e.length ? wx.navigateTo({
                    url: "/pages/home/index"
                }) : wx.navigateBack({
                    delta: 1
                });
            },
            handleCloseWarn: function() {
                this.showWarn = !1, this.$apply();
            },
            confirmCoupon: function(e) {
                2 == e.type || 1 == e.type && this.pay_amount > e.amount ? this.selectedCoupon = e : this.selectedCoupon = {}, 
                this.$apply();
            }
        }, s = a, _possibleConstructorReturn(i, s);
    }
    return _inherits(t, e), _createClass(t, [ {
        key: "handlePay",
        value: function() {
            var e = this;
            (0, _api.addShopPay)({
                shop_id: this.shop_id,
                is_active: this.is_active
            }).then(function(t) {
                wx.requestPayment({
                    timeStamp: t.result.timeStamp,
                    nonceStr: t.result.nonceStr,
                    package: t.result.package,
                    signType: t.result.signType,
                    paySign: t.result.paySign,
                    success: function(t) {
                        if ("requestPayment:ok" != t.errMsg) return !1;
                        e.handleSearchCoupon();
                    }
                });
            });
        }
    }, {
        key: "handleAdd",
        value: function() {
            var e = this;
            this.params.transfer_fee = 1e4 * this.params.transfer_fee2, this.params.discount_voucher_sn = this.selectedCoupon.discount_sn, 
            "repay" == this.status && (this.params.shop_id = this.params.id), (0, _api.addShop)(Object.assign({}, this.params)).then(function(t) {
                if (0 != t.status) return !1;
                e.shop_id = t.result.shop_id, e.stepIndex = 2, e.showWarn = !1, e.$apply(), e.handleGetNewMark();
            });
        }
    }, {
        key: "handleReceiveCoupon",
        value: function(e) {
            (0, _api.receiveCoupon)({
                discount_id: e.id
            }).then(function(e) {
                _tip2.default.success("发布成功", 1e3).then(function() {
                    wx.redirectTo({
                        url: "/pages/mine/shopList"
                    });
                });
            });
        }
    }, {
        key: "handleSearchCoupon",
        value: function() {
            var e = this;
            (0, _api.getCoupon)({
                type: 1
            }).then(function(t) {
                var a = e;
                if (!t.result.title) return _tip2.default.success("发布成功", 1e3).then(function() {
                    wx.redirectTo({
                        url: "/pages/mine/shopList"
                    });
                }), !1;
                wx.showModal({
                    title: "店铺发布成功",
                    content: "恭喜获得【" + t.result.title + "】优惠券",
                    cancelText: "取消",
                    confirmText: "立即领取",
                    confirmColor: "#d81e06",
                    success: function(e) {
                        e.confirm ? a.handleReceiveCoupon(t.result) : e.cancel && (wx.redirectTo({
                            url: "/pages/mine/shopList"
                        }), console.log("用户点击取消"));
                    }
                });
            });
        }
    }, {
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
            var t = this, a = this.uploadParams, i = a.host, s = a.dir, n = a.policy, r = a.signature, o = a.accessid;
            if (0 == e.length) return !1;
            var p = this.params.shop_images;
            e.forEach(function(e) {
                var a = e.replace(/http:\/\//, "");
                wx.uploadFile({
                    url: i,
                    filePath: e,
                    name: "file",
                    formData: {
                        key: s + a,
                        policy: n,
                        OSSAccessKeyId: o,
                        signature: r
                    },
                    success: function(e) {
                        204 === e.statusCode && (console.log("上传成功", e), p.push(i + "/" + s + a), t.params.shop_images = p, 
                        t.activeItem = "", t.$apply());
                    }
                });
            });
        }
    }, {
        key: "onLoad",
        value: function(e) {
            this.params.shop_type = e.type || 1, this.params.id = e.id || 0, this.status = e.status, 
            this.title = _wepy2.default.$appConfig.baseConfig.name, this.days = parseInt(100 * Math.random()) % 13 + 7, 
            this.params.id > 0 && this.handleGetShopInfo(), this.$apply();
        }
    }, {
        key: "handleGetShopInfo",
        value: function() {
            var e = this;
            (0, _api.myShopInfo)({
                id: this.params.id,
                type: this.params.shop_type
            }).then(function(t) {
                e.params = t.result, e.params.transfer_fee2 = e.params.transfer_fee / 1e4, e.params.select_city_id = e.params.city_id, 
                e.params.lable_ids = JSON.parse(t.result.lable_ids), e.shopTradeIndex = e.shopTradeValue.indexOf(e.params.trade_id) || 0, 
                e.shopIndex = e.params.shop_lable ? e.shopTypeValue.indexOf(e.params.shop_lable) : 0, 
                e.regionName = e.params.province_name + "-" + e.params.city_name + "-" + e.params.area_name, 
                e.region = [ e.params.province_id + "", e.params.city_id + "", e.params.area_id + "" ], 
                e.$apply(), e.handleGetAmount(e.params.city_id);
            });
        }
    }, {
        key: "handleGetAmount",
        value: function(e) {
            var t = this;
            (0, _api.getShopAmount)({
                area_id: e,
                type: 1
            }).then(function(e) {
                t.amount = e.result.amount, t.pay_amount = e.result.pay_amount, t.active_name = e.result.active_name, 
                t.active_discount = e.result.active_discount, t.active2_name = e.result.active2_name, 
                t.active2_discount = e.result.active2_discount, t.recommend_user_list = e.result.recommend_user_list, 
                t.$apply();
            });
        }
    }, {
        key: "onUnload",
        value: function() {
            clearInterval(interval), clearTimeout(timeval), clearTimeout(timeval2);
        }
    }, {
        key: "handleGetNewMark",
        value: function() {
            var e = this, t = this;
            (0, _api.getNewMark)().then(function(a) {
                e.userInfo = a.result, e.animation.translateX(-100).step().translateX(0).opacity(1).step(), 
                e.animationData = e.animation.export(), t.$apply(), timeval = setTimeout(function() {
                    t.handleGetNewMark();
                }, 1e4), timeval2 = setTimeout(function() {
                    t.animation.opacity(0).step(), t.animationData = t.animation.export(), t.$apply();
                }, 5e3);
            });
        }
    }, {
        key: "handleTimeOut",
        value: function() {
            var e = this;
            interval = setInterval(function() {
                if (0 == e.timeOut) return e.$apply(), clearInterval(interval), !1;
                e.timeOut = e.timeOut - 1;
                var t = parseInt(e.timeOut / 6e3), a = parseInt((e.timeOut - 6e3 * t) / 100), i = e.timeOut - 6e3 * t - 100 * a;
                e.displayTime = [ "0" + t + ":", (a > 9 ? a : "0" + a) + ":", i ], console.log("that.timeOut", e.timeOut), 
                e.$apply();
            }, 10);
        }
    }, {
        key: "handleAnimation",
        value: function() {
            var e = wx.createAnimation({
                duration: 500,
                timingFunction: "ease"
            });
            this.animation = e, this.animationData = e.export();
        }
    }, {
        key: "onShow",
        value: function(e) {
            var t = this;
            wx.getStorageSync("currentCity");
            (0, _api.getAddParam)().then(function(e) {
                if (0 != e.status) return !1;
                t.addParams = e.result, t.shopType = e.result.shop_type.map(function(e) {
                    return e.name;
                }), t.shopTrade = e.result.shop_trade.first.map(function(e) {
                    return e.name;
                }), t.shopTypeValue = e.result.shop_type.map(function(e) {
                    return e.value;
                }), t.shopTradeValue = e.result.shop_trade.first.map(function(e) {
                    return e.value;
                }), t.params.shop_lable = e.result.shop_lable[0].value, t.params.trade_id = e.result.shop_trade.first[0].value, 
                t.$apply();
            }), this.handleAnimation(), this.handleGetUploadParams();
        }
    } ]), t;
}(_wepy2.default.page);

Page(require("./../../npm/wepy/lib/wepy.js").default.$createPage(StoreApply, "pages/store/apply"));