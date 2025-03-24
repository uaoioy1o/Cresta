function validateIdCard(r) {
    var e = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
    };
    return "" !== r && (!1 !== isCardNo(r) && (!1 !== checkProvince(r, e) && (!1 !== checkBirthday(r) && !1 !== checkParity(r))));
}

function isCardNo(r) {
    return !1 !== /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(r);
}

function checkProvince(r, e) {
    return void 0 != e[r.substr(0, 2)];
}

function checkBirthday(r) {
    var e = r.length;
    if ("15" == e) {
        var t = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/, n = r.match(t), a = n[2], i = n[3], d = n[4], u = new Date("19" + a + "/" + i + "/" + d);
        return verifyBirthday("19" + a, i, d, u);
    }
    if ("18" == e) {
        var c = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/, n = r.match(c), a = n[2], i = n[3], d = n[4], u = new Date(a + "/" + i + "/" + d);
        return verifyBirthday(a, i, d, u);
    }
    return !1;
}

function verifyBirthday(r, e, t, n) {
    var a = new Date(), i = a.getFullYear();
    if (n.getFullYear() == r && n.getMonth() + 1 == e && n.getDate() == t) {
        var d = i - r;
        return d >= 0 && d <= 100;
    }
    return !1;
}

function checkParity(r) {
    if (r = changeFivteenToEighteen(r), "18" == r.length) {
        var e, t = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), n = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), a = 0;
        for (e = 0; e < 17; e++) a += r.substr(e, 1) * t[e];
        return n[a % 11] == r.substr(17, 1).toLocaleUpperCase();
    }
    return !1;
}

function changeFivteenToEighteen(r) {
    if ("15" == r.length) {
        var e, t = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2), n = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"), a = 0;
        for (r = r.substr(0, 6) + "19" + r.substr(6, r.length - 6), e = 0; e < 17; e++) a += r.substr(e, 1) * t[e];
        return r += n[a % 11];
    }
    return r;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.validateIdCard = validateIdCard;