function getCurrentTime() {
    var t = new Date(), r = t.getFullYear(), e = t.getMonth() + 1;
    return e = e < 10 ? "0" + e : e, r + "" + e + (t.getDate() < 10 ? "0" + t.getDate() : t.getDate()) + (t.getHours() < 10 ? "0" + t.getHours() : t.getHours()) + (t.getMinutes() < 10 ? "0" + t.getMinutes() : t.getMinutes()) + (t.getSeconds() < 10 ? "0" + t.getSeconds() : t.getSeconds());
}

function objLength(t) {
    var r = toString(t), e = 0;
    if ("[object Object]" !== r) ; else for (var n in t) "number" !== n && e++;
    return e;
}

function vailPhone(t) {
    var r = !0, e = /^((1[3-9]{1}[0-9]{1})+\d{8})$/;
    return 11 === t.length && e.test(t) || (r = !1), r;
}

function ifSpanish(t) {
    var r = !0, e = /^([6|7|9]{1}(\d+){8})$/;
    return 9 === t.length && e.test(t) || (r = !1), r;
}

function div(t, r) {
    var e = void 0, n = void 0, i = void 0, o = void 0;
    try {
        i = t.toString().split(".")[1].length;
    } catch (t) {}
    try {
        o = r.toString().split(".")[1].length;
    } catch (t) {}
    return e = Number(t.toString().replace(".", "")), n = Number(r.toString().replace(".", "")), 
    mul(e / n, Math.pow(10, o - i));
}

function accAdd(t, r) {
    var e = void 0, n = void 0, i = void 0;
    try {
        e = t.toString().split(".")[1].length;
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        e = 0;
    }
    try {
        n = r.toString().split(".")[1].length;
    } catch (t) {
        t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
        n = 0;
    }
    return i = Math.pow(10, Math.max(e, n)), ((t * i + r * i) / i).toFixed(2);
}

function mul(t, r) {
    var e = 0, n = t.toString(), i = r.toString();
    try {
        e += t.toString().split(".")[1].length;
    } catch (t) {}
    try {
        e += r.toString().split(".")[1].length;
    } catch (t) {}
    return Number(n.replace(".", "")) * Number(i.replace(".", "")) / Math.pow(10, e);
}

function displayProp(t) {
    var r = "";
    for (var e in t) r += e + t[e];
    return r;
}

function sTrim(t) {
    return t.replace(/\s/g, "");
}

function replaceColon(t) {
    return t.replace(/:/g, "");
}

function convertStarArray(t) {
    for (var r = [], e = 1; e <= 5; e++) t >= e ? r.push(1) : t > e - 1 && t < e + 1 ? r.push(2) : r.push(0);
    return r;
}

module.exports = {
    getCurrentTime: getCurrentTime,
    objLength: objLength,
    displayProp: displayProp,
    sTrim: sTrim,
    replaceColon: replaceColon,
    vailPhone: vailPhone,
    ifSpanish: ifSpanish,
    div: div,
    mul: mul,
    accAdd: accAdd,
    convertStarArray: convertStarArray
};