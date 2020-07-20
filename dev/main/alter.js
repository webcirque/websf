"use strict";

// If an array has...
Array.prototype.withCount = function () {
    var act = 0;
    for (var pt = 0; pt < arguments.length; pt ++) {
        if (this.indexOf(arguments[pt]) != -1) {
            act ++;
        };
    };
    return act;
};
Array.prototype.withAny = function () {
    var ans = false;
    for (var pt = 0; pt < arguments.length; pt ++) {
        if (this.indexOf(arguments[pt]) != -1) {
            ans = true;
        };
        if (ans == true) {
            continue;
        };
    };
    return ans;
};
Array.prototype.withAll = function () {
    var act = 0;
    for (var pt = 0; pt < arguments.length; pt ++) {
        if (this.indexOf(arguments[pt]) != -1) {
            act ++;
        };
    };
    return (act == arguments.length);
};
Array.prototype.matchAny = function (args) {
    var a1 = this, a2 = args, ans = false;
    if (a1.length < a2.length) {
        var a3 = a1;
        a1 = a2;
        a2 = a3;
    };
    for (var pt = 0; pt1 < a2.length; pt ++) {
        if (a1.indexOf(a2[pt]) != -1) {
            ans = true;
        };
    };
    return ans;
};

// Batch type comparison, one array-based, one argument-based
try {
    var Compare = function () {
        this.type = function (dType, args) {
            var count = 0;
            for (var pt = 0; pt < args.length; pt ++) {
                if (!(!(args[pt]))) {
                    if (args[pt].constructor == dType) {
                        count ++;
                    };
                };
            };
            return count;
        };
        this.able = function (args) {
            var count = 0;
            for (var pt = 0; pt < args.length; pt ++) {
                if (!(!(args[pt]))) {
                    count ++;
                };
            };
            return count;
        };
    };
    Compare = new Compare();
} catch (err) {};
try {
    var Compard = function () {
        this.type = function () {
            var dType = arguments[0];
            var args = Array.from(arguments).slice(1, arguments.length - 1);
            return Compare.type(dType, args);
        };
        this.able = function () {
            return Compare.able(arguments);
        };
    };
    Compard = new Compard();
} catch (err) {};

/* function wAlter (text, map) {
	let wtAr = Array.from(text);
	let wlist = [];
	let wstart = 0;
	let wname = "";
	let wmode = 0; //0 for $ searching, 1 for ${ confirm, 2 for ${} name add
	let wres = "";
	wtAr.forEach((e, i) => {
		//console.warn(i);
		switch (wmode) {
			case 0: {
				if (e == "$") {
					wmode = 1;
				};
				break;
			};
			case 1: {
				if (e == "{") {
					wstart = i - 1;
					wmode = 2;
				} else {
					wmode = 0;
				};
				break;
			};
			case 2: {
				if (e == "}") {
					wstart ++;
					wlist.push(new wAlter.alterItem(wstart, wname, ""));
					wstart = 0;
					wname = "";
					wmode = 0;
				} else {
					wname += e;
				};
				break;
			};
			default: {
				throw(new Error("Unknown mode $1 encountered at index $2.".replace("$1", wmode))).replace("$2", i);
			};
		};
	});
	let stOffset = 0;
	wlist.forEach((e) => {
		let wstart = e.start;
		let wname = e.name;
		console.log([wstart, wname]);
		wtAr.splice(wstart - 1 - stOffset, wname.length + 3);
		console.log(e.start);
		e.start -= stOffset;
		console.log(e.start);
		stOffset += wname.length + 3;
		console.log(wtAr);
	});
	stOffset = 0;
	wlist.forEach((e) => {
		let value = map[e.name];
		if (map[e.name] == undefined || map[e.name] == null) {
			e.value = Array.from("ERR_NULL");
		} else {
			let value = map[e.name];
			if (value.constructor == String) {
				e.value = Array.from(value);
			} else if (value.constructor == Number || value.constructor == BigInt) {
				e.value = Array.from(value.toString());
			} else {
				throw(new TypeError("Value \"$1\" must not be an explicit object.").replace("$1", e.name));
			};
		};
		wtAr.splice(e.start - 1 + stOffset, 0, ...e.value);
		stOffset += e.value.length;
	});
	console.log(wlist);
	wtAr.forEach((e) => {
		wres += e;
	});
	return (wres);
};
wAlter.alterItem = function (start, name, value) {
	if (start.constructor == Number) {
		this.start = start;
	} else {
		throw(new TypeError("Value \"start\" must be a Number."));
	};
	if (name.constructor == String) {
		this.name = name;
	} else {
		throw(new TypeError("Value \"name\" must be a String."));
	};
	if (value.constructor == String) {
		this.value = Array.from(value);
	} else if (value.constructor == Number || value.constructor == BigInt) {
		this.value = Array.from(value.toString());
	} else {
		throw(new TypeError("Value \"value\" must not be an explicit object."));
	};
};*/
