Object.defineProperty(exports, "__esModule", {
    value: !0
});

var _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
    }
    return t;
}, _reduxActions = require("./../../npm/redux-actions/lib/index.js"), _hotel = require("./../types/hotel.js"), now = new Date(), Endtimes = now.getTime() + 864e5, startMonth = now.getMonth() + 1, endMonth = new Date(Endtimes).getMonth() + 1, tmpStart = now.getFullYear() + "-" + (startMonth > 9 ? startMonth : "0" + startMonth) + "-" + now.getDate(), tmpEnd = new Date(Endtimes).getFullYear() + "-" + (endMonth > 9 ? endMonth : "0" + endMonth) + "-" + new Date(Endtimes).getDate(), initialState = {
    adData: {},
    bannerList: [],
    hotelList: {
        count: 0,
        hotel_list: []
    },
    hotelDetail: {},
    roomList: {
        list: [],
        startTime: "",
        endTime: ""
    },
    roomDetail: {},
    roomPrice: [],
    myCoupon: {
        coupons: [],
        optimal: {},
        others: []
    },
    currentCoupon: {
        current: {},
        noUse: !1
    },
    contacts: [ {
        id: "",
        uid: "",
        phone: "",
        idcard: "",
        name: ""
    } ],
    agreement: {},
    checkDate: {
        startTime: tmpStart,
        endTime: tmpEnd,
        during: 1
    },
    roomModalShow: {
        show: !1
    },
    selectRoom: [],
    tourDetail: {},
    footerIndex: 0
}, actions = {};

actions[_hotel.GET_AD] = function(t, e) {
    return _extends({}, t, {
        adData: e.data
    });
}, actions[_hotel.GET_BANNER_LIST] = function(t, e) {
    return _extends({}, t, {
        bannerList: e.payload ? e.payload.result : []
    });
}, actions[_hotel.GET_HOTEL_LIST] = function(t, e) {
    var n = e.payload, o = [];
    return n && n.result && (o = n.params.page > 1 ? t.hotelList.hotel_list.concat(n.result.hotel_list) : n.result.hotel_list), 
    _extends({}, t, {
        hotelList: {
            count: n.count,
            hotel_list: o
        }
    });
}, actions[_hotel.GET_HOTEL_DETAIL] = function(t, e) {
    return _extends({}, t, {
        hotelDetail: e.payload.result
    });
}, actions[_hotel.GET_ROOM_LIST] = function(t, e) {
    var n = e.payload ? e.payload.result : {}, o = n.list;
    return _extends({}, t, {
        roomList: {
            list: o,
            startTime: n.start_time,
            endTime: n.end_time
        }
    });
}, actions[_hotel.GET_ROOM_DETAIL] = function(t, e) {
    return _extends({}, t, {
        roomDetail: e.payload.result
    });
}, actions[_hotel.GET_ROOM_PRICE] = function(t, e) {
    return _extends({}, t, {
        roomPrice: e.payload.result
    });
}, actions[_hotel.GET_COUPON] = function(t, e) {
    return console.log("action", e.payload), _extends({}, t, {
        myCoupon: e.payload.result
    });
}, actions[_hotel.SET_CURCOUPON] = function(t, e) {
    return _extends({}, t, {
        currentCoupon: e.payload
    });
}, actions[_hotel.GET_AGREEMENT] = function(t, e) {
    return _extends({}, t, {
        agreement: e.payload.result
    });
}, actions[_hotel.SET_CHECKDATE] = function(t, e) {
    return _extends({}, t, {
        checkDate: e.payload
    });
}, actions[_hotel.SET_INITCHECKDATE] = function(t, e) {
    e.payload, t.checkDate;
    return _extends({}, t, {
        checkDate: {
            startTime: tmpStart,
            endTime: tmpEnd,
            during: 1
        }
    });
}, actions[_hotel.SET_ROOMMODAL] = function(t, e) {
    return _extends({}, t, {
        roomModalShow: e.payload
    });
}, actions[_hotel.SET_SELECTROOM] = function(t, e) {
    return _extends({}, t, {
        selectRoom: t.roomPrice.filter(function(e, n) {
            return new Date(e.date) >= new Date(t.checkDate.startTime) && new Date(e.date) < new Date(t.checkDate.endTime);
        })
    });
}, actions[_hotel.SET_CONTACT] = function(t, e) {
    var n = e.payload, o = t.contacts;
    return o[n.index] = n.item, _extends({}, t, {
        contacts: o
    });
}, actions[_hotel.CREATE_HOTEL_ORDER] = function(t, e) {
    return _extends({}, t, {
        contacts: e.payload ? [ {
            id: "",
            uid: "",
            phone: "",
            idcard: "",
            name: ""
        } ] : t.contacts
    });
}, actions[_hotel.ADD_CONTACT_ARR] = function(t, e) {
    return _extends({}, t, {
        contacts: t.contacts.concat(e.payload)
    });
}, actions[_hotel.RESET_CONTACT] = function(t, e) {
    return _extends({}, t, {
        contacts: e.payload
    });
}, actions[_hotel.SET_FOOT_BAR] = function(t, e) {
    var n = e.payload;
    return _extends({}, t, {
        footerIndex: n.index
    });
}, actions[_hotel.GET_TOUR_INFO] = function(t, e) {
    return _extends({}, t, {
        tourDetail: e.payload ? e.payload.result : {}
    });
}, exports.default = (0, _reduxActions.handleActions)(actions, initialState);