/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-devicemotion_deviceorientation-setclasses !*/
!function (e, n, o) {
    function s(e) {
        var n = f.className, o = Modernizr._config.classPrefix || "";
        if (c && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var s = new RegExp("(^|\\s)" + o + "no-js(\\s|$)");
            n = n.replace(s, "$1" + o + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + o + e.join(" " + o), c ? f.className.baseVal = n : f.className = n)
    }

    function a(e, n) {
        return typeof e === n
    }

    function i() {
        var e, n, o, s, i, f, r;
        for (var c in l) if (l.hasOwnProperty(c)) {
            if (e = [], n = l[c], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length)) for (o = 0; o < n.options.aliases.length; o++) e.push(n.options.aliases[o].toLowerCase());
            for (s = a(n.fn, "function") ? n.fn() : n.fn, i = 0; i < e.length; i++) f = e[i], r = f.split("."), 1 === r.length ? Modernizr[r[0]] = s : (!Modernizr[r[0]] || Modernizr[r[0]] instanceof Boolean || (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])), Modernizr[r[0]][r[1]] = s), t.push((s ? "" : "no-") + r.join("-"))
        }
    }

    var t = [], f = n.documentElement, l = [], r = {
        _version: "3.6.0",
        _config: {classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0},
        _q: [],
        on: function (e, n) {
            var o = this;
            setTimeout(function () {
                n(o[e])
            }, 0)
        },
        addTest: function (e, n, o) {
            l.push({name: e, fn: n, options: o})
        },
        addAsyncTest: function (e) {
            l.push({name: null, fn: e})
        }
    }, Modernizr = function () {
    };
    Modernizr.prototype = r, Modernizr = new Modernizr, Modernizr.addTest("devicemotion", "DeviceMotionEvent" in e), Modernizr.addTest("deviceorientation", "DeviceOrientationEvent" in e);
    var c = "svg" === f.nodeName.toLowerCase();
    i(), s(t), delete r.addTest, delete r.addAsyncTest;
    for (var d = 0; d < Modernizr._q.length; d++) Modernizr._q[d]();
    e.Modernizr = Modernizr
}(window, document);