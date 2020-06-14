"use strict";

/*
This script is for checking the environment which the script is running. It uses environment-specific checks and userAgent string to check. It will also tell if the userAgent string is forged or not.
Thanks to @mumuy on GitHub for mumuy/browser, and @RobW on StackOverflow for his/her amazing answer!
*/

// Collects information to help decide the type and version of the environment
var wenv = {};

var WEnv = function () {
    var cfeat = [], docEntries = [];
    cfeat.w = function (text) {
        return (cfeat.indexOf(text) != -1);
    };
    // If window is not defined, then the script is not running in a page document
    try {
        window;
        cfeat.push("window");
    } catch (err) {
        self.window = self;
    };
    // If self is not defined, then the script must be running in a obsolete environment
    try {
        self;
        cfeat.push("self");
    } catch (err) {
        window.self = window;
    };
    // If let announces are allowed (ES6)
    try {
        let r1 = "things";
        cfeat.push("let");
    } catch (err) {};
    // If arrow functions are allowed (ES6)
    try {
        var r1 = () => {};
        r1 = undefined;
        cfeat.push("arrowFunction");
    } catch (err) {};
    // If objects allow new kind of accessing (ES6)
    try {
        var r1 = {a: 1, b: 2};
        r1["a"];
        cfeat.push("objectAccess");
        for (var name in document) {
            docEntries.push(name);
        };
    } catch (err) {};
    // If async and await can be used (ES2017+)
    try {
        var r1 = async function () {
            await new Promise((p) => {p();});
        };
        r1 = undefined;
        cfeat.push("asyncFunction")
    } catch (err) {};
    // If ImageCapture API is present (Chrome 59+)
    try {
        if (ImageCapture.constructor == Function) {
            cfeat.push("imageCapture")
        };
    } catch (err) {};
    // If object rest is supported (Chrome 60+)
    try {
        var r1 = {a: 1, b: 2};
        var r2 = eval("({...r1})");
        var r3 = {c: 3, d: 4};
        var r4 = eval("({...r2, ...r4})");
        cfeat.push("objectRest");
    } catch (err) {};
    // If Network Information is usable (Chrome 61+)
    try {
        if (navigator.connection.constructor == NetworkInformation) {
            cfeat.push("netInfo");
        };
    } catch (err) {};
    // If page lifecycle is readable (Chrome 68+)
    try {
        if (docEntries.indexOf("onfreeze") != -1) {
            cfeat.push("pageLife");
        };
    } catch (err) {};
    // If Web Locks is usable (Chrome 69+)
    try {
        if (navigator.locks.constructor == LockManager) {
            cfeat.push("webLocks");
        };
    } catch (err) {};
    // If relative time is usable (Chrome 71+, Firefox 65+)
    try {
        if (Intl.RelativeTimeFormat) {
            cfeat.push("intlRelaTime");
        };
    } catch (err) {};
    // If Intl.format is supported (Chrome 72+, Firefox unsupported)
    try {
        if (Intl.format) {
            cfeat.push("intlFormat");
        };
    } catch (err) {};
    // If matchAll is supported (Chrmoe 73+, Firefox 67+)
    try {
        var a = "";
        if (a.matchAll.constructor == Function) {
            cfeat.push("stringMatchAll");
        }
    } catch (err) {};
    
    // Decides the environment and version
    this.ecma = 0;
    if (cfeat.w("let") && cfeat.w("arrowFunction") && cfeat.w("objectAccess")) {
        this.ecma = 1;
        if (cfeat.w("asyncFunction")) {
            this.ecma = 2;
        };
    };
    // If in worker or a document
    if (!cfeat.w("window") && cfeat.w("self")) {
        this.doc = "worker";
    } else {
        this.doc = "page";
    };
    // Environment detect
    this.env = {};
    if ((!!window.opr && !!opr.addons) || !!window.opera) {
        this.env.main = "opera";
        this.env.sub = "opera";
    };
    if (window.chrome) {
        this.env.sub = "chrome";
        this.env.main = "chrome";
    };
    if (typeof InstallTrigger !== 'undefined') {
        this.env.main = "firefox";
        this.env.sub = "firefox";
    };
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification))) {//From StackOverflow by RobW
        this.env.main = "safari";
        this.env.sub = "safari";
    };
    if (/*@cc_on!@*/false || !!document.documentMode) {//From StackOverflow by RobW
        this.env.main = "ie";
        this.env.sub = "ie";
    };
    if (this.env.sub != "ie" && !!window.StyleMedia) {
        this.env.main = "edge";
        this.env.sub = "edge";
    };
    // Distinguish Chrome, OperaChromium, EdgeChromium and Electron
    if (this.env.main == "chrome") {
        if (self.process) {
            if (process.versions.electron) {
                this.env.sub = "electron";
            };
        };
        navigator.userAgent.indexOf("Edg") != -1 && (this.env.sub = "edge");
        navigator.userAgent.indexOf(' OPR/') != -1 && (this.env.sub = "opera");
    };
    // Use checked features to help determine browser version
    var verStrategy = "max"; // Allows max, mid and min. Default is max. Once used by trustVersion, it should be deleted
    var minVersion = 0;
    
    // Detect if the environment is faking version
    this.env.trust = true;
    this.env.trustver = true;
    this.env.ver = [];
    var pmode = 0;
    var pidx = 0;
    var pkey = [[""]];
    var uastr = navigator.userAgent || "NoGUI";
    for (var cp = 0; cp < uastr.length; cp ++) {
        var e = uastr[cp];
        switch (pmode) {
            case 0: {
                // Enters environment name
                if (e != "/") {
                    pkey[pidx][0] += e;
                } else {
                    pmode = 1;
                    pkey[pidx][1] = "";
                };
                break;
            };
            case 1: {
                // Ignores one character
                if (e != " ") {
                    //Merge the key
                    pkey[pidx][1] += e;
                } else {
                    pmode = 2;
                };
                break;
            };
            case 2: {
                if (e == "(") {
                    pkey[pidx][2] = "";
                    pmode = 3;
                } else {
                    pidx ++;
                    pkey[pidx] = [];
                    pkey[pidx][0] = e;
                    pmode = 0;
                };
                break;
            };
            case 3: {
                if (e != ")") {
                    pkey[pidx][2] += e;
                } else {
                    pidx ++;
                    pkey[pidx] = [];
                    pkey[pidx][0] = "";
                    pmode = 4;
                };
                break;
            };
            case 4: {
                pmode = 0;
                break;
            };
        };
    };
    console.info(pkey);
    if (this.env.main == "chrome" || this.env.main == "safari") {
        if (uastr.indexOf("MSIE") != -1 || uastr.indexOf("Chrom") == -1 || uastr.indexOf("Triden") != -1) {
            this.env.trust = false;
            this.env.trustver = false;
            this.env.truever = minVersion;
        } else {
            if (this.env.main == "chrome") {
                for (var cp = 0; cp < pkey.length; cp ++) {
                    var e = pkey[cp];
                    e[0].indexOf("Chrom") != -1 && (this.env.ver = e[1].split("."));
                    for (var cq = 0; cq < this.env.ver.length; cq ++) {
                        var f = this.env.ver[cq];
                        this.env.ver[cq] = parseInt(f);
                    };
                };
            } else if (this.env.main == "safari") {
                for (var cp = 0; cp < pkey.length; cp ++) {
                    var e = pkey[cp];
                    e[0].indexOf("Safari") != -1 && (this.env.ver = e[1].split("."));
                    for (var cq = 0; cq < this.env.ver.length; cq ++) {
                        var f = this.env.ver[cq];
                        this.env.ver[cq] = parseInt(f);
                    };
                };
            };
        };
    } else {
        if (uastr.indexOf("Chrom") != -1) {
            this.env.trust = false;
            this.env.trustver = false;
            this.env.truever = minVersion;
        } else {
            if (this.env.main == "ie") {
                for (var cp = 0; cp < pkey.length; cp ++) {
                    var e = pkey[cp];
                    if (e[0].indexOf("Mozilla") != -1) {
                        this.env.ver = e[2].split("; ");
                    };
                    for (var co = 0; co < this.env.ver.length; co ++) {
                        var g = this.env.ver[co];
                        if (g.constructor == String) {
                            if (g.indexOf("MSIE ") != -1) {
                                this.env.ver = g.replace("MSIE ","").split(".");
                            } else if (g == "Trident/7.0") {
                                this.env.ver = ["11", "0"];
                            };
                        };
                    };
                    for (var cq = 0; cq < this.env.ver.length; cq ++) {
                        var f = this.env.ver[cq];
                        this.env.ver[cq] = parseInt(f);
                    };
                };
            } else {
                for (var cp = 0; cp < pkey.length; cp ++) {
                    var e = pkey[cp];
                    e[0].indexOf("Firefox") != -1 && (this.env.ver = e[1].split("."));
                    for (var cq = 0; cq < this.env.ver.length; cq ++) {
                        var f = this.env.ver[cq];
                        this.env.ver[cq] = parseInt(f);
                    };
                };
            };
        };
    };
    // Distinguish dangerous browsers
    /* Most Chinese closed-source browsers have eavesdropping modules planted in without users acknowledgement.
       Most of them still use Chrome 59, which is the last version that still supports Windows XP.
       Some of them might switch to Chrome 69, and that made detection somewhat hard. */
    this.env.danger = false;
    // var dangerNameList = ["qq", "uc", "360", "baidu", "maxthon", "sogou", "liebao", "2345", "115", "theWorld", "xiaoMi", "quark", "qiyu", "alibaba", "weibo", "douban", "suning", "iQiYi", "huaWei"];
    var dangerUA = ["qh", "qihoo", "360ee", "360se", "uc", "ubrowser", "qq", "baidu", "bidu", "maxthon", "metasr", "sogou", "lbbr", "2345e", "2345b", "115b", "world", "miuib", "quark", "qiyu", "micromess", "aliapp", "weibo", "douban", "snebuy", "iqiyi", "dingtalk", "huawei"];
    var dangerList = ["mod_360", "mod_2345", "mod_cn"];
    var tmpus = uastr.toLowerCase();
    for (var ci = 0; ci < dangerUA.length; ci ++) {
        if (tmpus.indexOf(dangerUA[ci]) > -1) {
            this.env.danger = true;
            this.env.sub = "mod_cn";
        };
    };
    // Get mimeTypes out
    var mimeTypes = [];
    if (self.navigator) {
        if (navigator.mimeTypes) {
            for (var cb = 0; cb < navigator.mimeTypes.length; cb ++) {
                mimeTypes.push(navigator.mimeTypes[cb].type);
            };
        };
    };
    // Gift to 360 and 2345
    var navTop = window.screenTop - window.screenY;
    if (this.env.main == "ie" || this.env.main == "edge") {
        switch(navTop){
            case 71: 
            case 99: 
            case 102: 
            case 75: 
            case 105: 
            case 104: {
                this.env.danger = true;
                this.env.sub = "mod_360";
                break;
            };
        };
    } else if (this.env.main == "chrome") {
        if ((mimeTypes.indexOf("application/360softmgrplugin") > -1) || (mimeTypes.indexOf("application/mozilla-npqihooquicklogin") > -1) || (this.env.ver[0] > 45 && mimeTypes.indexOf("application/vnd.chromium.remoting-viewer") > -1) || (this.env.ver[0] > 58 && mimeTypes.indexOf("application/asx") > -1) || (this.env.ver[0] > 36 && self.showModalDialog)) {
            this.env.danger = true;
            this.env.sub = "mod_360";
        };
        if (chrome.adblock2345 || chrome.common2345) {
            this.env.danger = true;
            this.env.sub = "mod_2345";
        };
        if ((mimeTypes.indexOf("application/npqqwebgame") > -1)) {
            this.env.danger = true;
        };
    };
    // Apply checkedFeatures to wenv
    this._features = cfeat;
};
wenv = new WEnv();
