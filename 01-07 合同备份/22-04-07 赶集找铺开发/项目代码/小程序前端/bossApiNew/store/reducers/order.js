Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(r) {
    for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (r[o] = t[o]);
    }
    return r;
}, _reduxActions = require("./../../npm/redux-actions/lib/index.js"), _order = require("./../types/order.js"), orderResult = {
    0: "待支付",
    1: "待确认",
    2: "待入住",
    3: "已完成",
    4: "退款中",
    5: "已退款",
    6: "已取消"
}, initialState = {
    orderList: {
        count: 0,
        order_list: []
    },
    orderDetail: {}
}, actions = {};

actions[_order.GET_ORDER_DETAIL] = function(r, e) {
    var t = e.payload ? e.payload.result : null;
    return t && (t.order_result = orderResult[t.order_status]), _extends({}, r, {
        orderDetail: t
    });
}, actions[_order.GET_ORDER_LIST] = function(r, e) {
    var t = e.payload, o = [];
    if (t && t.result) {
        var s = t.result.order_list && t.result.order_list.map(function(r) {
            return _extends({}, r, {
                order_result: orderResult[r.order_status]
            });
        });
        o = t.params.page > 1 ? r.orderList.order_list.concat(s) : s;
    }
    return _extends({}, r, {
        orderList: {
            count: t && t.count || 0,
            order_list: o
        }
    });
}, exports.default = (0, _reduxActions.handleActions)(actions, initialState);