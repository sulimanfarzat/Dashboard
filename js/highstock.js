/*
 Highstock JS v5.0.11 (2017-05-04)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(L, T) {
    "object" === typeof module && module.exports ? module.exports = L.document ? T(L) : T : L.Highcharts = T(L)
})("undefined" !== typeof window ? window : this, function(L) {
    L = function() {
        var a = window,
            C = a.document,
            B = a.navigator && a.navigator.userAgent || "",
            F = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            E = /(edge|msie|trident)/i.test(B) && !window.opera,
            q = !F,
            f = /Firefox/.test(B),
            t = f && 4 > parseInt(B.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highstock",
            version: "5.0.11",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: t,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: E,
            isWebKit: /AppleWebKit/.test(B),
            isFirefox: f,
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(B),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: F,
            vml: q,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: []
        }
    }();
    (function(a) {
        var C = [],
            B = a.charts,
            F = a.doc,
            E = a.win;
        a.error = function(q, f) {
            q = a.isNumber(q) ? "Highcharts error #" +
                q + ": www.highcharts.com/errors/" + q : q;
            if (f) throw Error(q);
            E.console && console.log(q)
        };
        a.Fx = function(a, f, t) {
            this.options = f;
            this.elem = a;
            this.prop = t
        };
        a.Fx.prototype = {
            dSetter: function() {
                var a = this.paths[0],
                    f = this.paths[1],
                    t = [],
                    p = this.now,
                    y = a.length,
                    u;
                if (1 === p) t = this.toD;
                else if (y === f.length && 1 > p)
                    for (; y--;) u = parseFloat(a[y]), t[y] = isNaN(u) ? a[y] : p * parseFloat(f[y] - u) + u;
                else t = f;
                this.elem.attr("d", t, null, !0)
            },
            update: function() {
                var a = this.elem,
                    f = this.prop,
                    t = this.now,
                    p = this.options.step;
                if (this[f + "Setter"]) this[f +
                    "Setter"]();
                else a.attr ? a.element && a.attr(f, t, null, !0) : a.style[f] = t + this.unit;
                p && p.call(a, t, this)
            },
            run: function(a, f, t) {
                var p = this,
                    q = function(a) {
                        return q.stopped ? !1 : p.step(a)
                    },
                    u;
                this.startTime = +new Date;
                this.start = a;
                this.end = f;
                this.unit = t;
                this.now = this.start;
                this.pos = 0;
                q.elem = this.elem;
                q.prop = this.prop;
                q() && 1 === C.push(q) && (q.timerId = setInterval(function() {
                    for (u = 0; u < C.length; u++) C[u]() || C.splice(u--, 1);
                    C.length || clearInterval(q.timerId)
                }, 13))
            },
            step: function(q) {
                var f = +new Date,
                    t, p = this.options,
                    y = this.elem,
                    u = p.complete,
                    k = p.duration,
                    e = p.curAnim;
                y.attr && !y.element ? q = !1 : q || f >= k + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), t = e[this.prop] = !0, a.objectEach(e, function(a) {
                    !0 !== a && (t = !1)
                }), t && u && u.call(y), q = !1) : (this.pos = p.easing((f - this.startTime) / k), this.now = this.start + (this.end - this.start) * this.pos, this.update(), q = !0);
                return q
            },
            initPath: function(q, f, t) {
                function p(a) {
                    var c, b;
                    for (A = a.length; A--;) c = "M" === a[A] || "L" === a[A], b = /[a-zA-Z]/.test(a[A + 3]), c && b && a.splice(A + 1, 0, a[A + 1], a[A + 2], a[A + 1], a[A + 2])
                }

                function y(a, c) {
                    for (; a.length < l;) {
                        a[0] = c[l - a.length];
                        var d = a.slice(0, b);
                        [].splice.apply(a, [0, 0].concat(d));
                        n && (d = a.slice(a.length - b), [].splice.apply(a, [a.length, 0].concat(d)), A--)
                    }
                    a[0] = "M"
                }

                function u(a, c) {
                    for (var r = (l - a.length) / b; 0 < r && r--;) d = a.slice().splice(a.length / H - b, b * H), d[0] = c[l - b - r * b], x && (d[b - 6] = d[b - 2], d[b - 5] = d[b - 1]), [].splice.apply(a, [a.length / H, 0].concat(d)), n && r--
                }
                f = f || "";
                var k, e = q.startX,
                    g = q.endX,
                    x = -1 < f.indexOf("C"),
                    b = x ? 7 : 3,
                    l, d, A;
                f = f.split(" ");
                t = t.slice();
                var n = q.isArea,
                    H = n ? 2 : 1,
                    r;
                x && (p(f),
                    p(t));
                if (e && g) {
                    for (A = 0; A < e.length; A++)
                        if (e[A] === g[0]) {
                            k = A;
                            break
                        } else if (e[0] === g[g.length - e.length + A]) {
                        k = A;
                        r = !0;
                        break
                    }
                    void 0 === k && (f = [])
                }
                f.length && a.isNumber(k) && (l = t.length + k * H * b, r ? (y(f, t), u(t, f)) : (y(t, f), u(f, t)));
                return [f, t]
            }
        };
        a.extend = function(a, f) {
            var q;
            a || (a = {});
            for (q in f) a[q] = f[q];
            return a
        };
        a.merge = function() {
            var q, f = arguments,
                t, p = {},
                y = function(f, k) {
                    "object" !== typeof f && (f = {});
                    a.objectEach(k, function(e, g) {
                        !a.isObject(e, !0) || a.isClass(e) || a.isDOMElement(e) ? f[g] = k[g] : f[g] = y(f[g] || {}, e)
                    });
                    return f
                };
            !0 === f[0] && (p = f[1], f = Array.prototype.slice.call(f, 2));
            t = f.length;
            for (q = 0; q < t; q++) p = y(p, f[q]);
            return p
        };
        a.pInt = function(a, f) {
            return parseInt(a, f || 10)
        };
        a.isString = function(a) {
            return "string" === typeof a
        };
        a.isArray = function(a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function(q, f) {
            return !!q && "object" === typeof q && (!f || !a.isArray(q))
        };
        a.isDOMElement = function(q) {
            return a.isObject(q) && "number" === typeof q.nodeType
        };
        a.isClass = function(q) {
            var f =
                q && q.constructor;
            return !(!a.isObject(q, !0) || a.isDOMElement(q) || !f || !f.name || "Object" === f.name)
        };
        a.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        a.erase = function(a, f) {
            for (var q = a.length; q--;)
                if (a[q] === f) {
                    a.splice(q, 1);
                    break
                }
        };
        a.defined = function(a) {
            return void 0 !== a && null !== a
        };
        a.attr = function(q, f, t) {
            var p;
            a.isString(f) ? a.defined(t) ? q.setAttribute(f, t) : q && q.getAttribute && (p = q.getAttribute(f)) : a.defined(f) && a.isObject(f) && a.objectEach(f, function(a, f) {
                q.setAttribute(f, a)
            });
            return p
        };
        a.splat =
            function(q) {
                return a.isArray(q) ? q : [q]
            };
        a.syncTimeout = function(a, f, t) {
            if (f) return setTimeout(a, f, t);
            a.call(0, t)
        };
        a.pick = function() {
            var a = arguments,
                f, t, p = a.length;
            for (f = 0; f < p; f++)
                if (t = a[f], void 0 !== t && null !== t) return t
        };
        a.css = function(q, f) {
            a.isMS && !a.svg && f && void 0 !== f.opacity && (f.filter = "alpha(opacity\x3d" + 100 * f.opacity + ")");
            a.extend(q.style, f)
        };
        a.createElement = function(q, f, t, p, y) {
            q = F.createElement(q);
            var u = a.css;
            f && a.extend(q, f);
            y && u(q, {
                padding: 0,
                border: "none",
                margin: 0
            });
            t && u(q, t);
            p && p.appendChild(q);
            return q
        };
        a.extendClass = function(q, f) {
            var t = function() {};
            t.prototype = new q;
            a.extend(t.prototype, f);
            return t
        };
        a.pad = function(a, f, t) {
            return Array((f || 2) + 1 - String(a).length).join(t || 0) + a
        };
        a.relativeLength = function(a, f) {
            return /%$/.test(a) ? f * parseFloat(a) / 100 : parseFloat(a)
        };
        a.wrap = function(a, f, t) {
            var p = a[f];
            a[f] = function() {
                var a = Array.prototype.slice.call(arguments),
                    f = arguments,
                    k = this;
                k.proceed = function() {
                    p.apply(k, arguments.length ? arguments : f)
                };
                a.unshift(p);
                a = t.apply(this, a);
                k.proceed = null;
                return a
            }
        };
        a.getTZOffset = function(q) {
            var f = a.Date;
            return 6E4 * (f.hcGetTimezoneOffset && f.hcGetTimezoneOffset(q) || f.hcTimezoneOffset || 0)
        };
        a.dateFormat = function(q, f, t) {
            if (!a.defined(f) || isNaN(f)) return a.defaultOptions.lang.invalidDate || "";
            q = a.pick(q, "%Y-%m-%d %H:%M:%S");
            var p = a.Date,
                y = new p(f - a.getTZOffset(f)),
                u = y[p.hcGetHours](),
                k = y[p.hcGetDay](),
                e = y[p.hcGetDate](),
                g = y[p.hcGetMonth](),
                x = y[p.hcGetFullYear](),
                b = a.defaultOptions.lang,
                l = b.weekdays,
                d = b.shortWeekdays,
                A = a.pad,
                p = a.extend({
                    a: d ? d[k] : l[k].substr(0, 3),
                    A: l[k],
                    d: A(e),
                    e: A(e, 2, " "),
                    w: k,
                    b: b.shortMonths[g],
                    B: b.months[g],
                    m: A(g + 1),
                    y: x.toString().substr(2, 2),
                    Y: x,
                    H: A(u),
                    k: u,
                    I: A(u % 12 || 12),
                    l: u % 12 || 12,
                    M: A(y[p.hcGetMinutes]()),
                    p: 12 > u ? "AM" : "PM",
                    P: 12 > u ? "am" : "pm",
                    S: A(y.getSeconds()),
                    L: A(Math.round(f % 1E3), 3)
                }, a.dateFormats);
            a.objectEach(p, function(a, b) {
                for (; - 1 !== q.indexOf("%" + b);) q = q.replace("%" + b, "function" === typeof a ? a(f) : a)
            });
            return t ? q.substr(0, 1).toUpperCase() + q.substr(1) : q
        };
        a.formatSingle = function(q, f) {
            var t = /\.([0-9])/,
                p = a.defaultOptions.lang;
            /f$/.test(q) ? (t = (t =
                q.match(t)) ? t[1] : -1, null !== f && (f = a.numberFormat(f, t, p.decimalPoint, -1 < q.indexOf(",") ? p.thousandsSep : ""))) : f = a.dateFormat(q, f);
            return f
        };
        a.format = function(q, f) {
            for (var t = "{", p = !1, y, u, k, e, g = [], x; q;) {
                t = q.indexOf(t);
                if (-1 === t) break;
                y = q.slice(0, t);
                if (p) {
                    y = y.split(":");
                    u = y.shift().split(".");
                    e = u.length;
                    x = f;
                    for (k = 0; k < e; k++) x = x[u[k]];
                    y.length && (x = a.formatSingle(y.join(":"), x));
                    g.push(x)
                } else g.push(y);
                q = q.slice(t + 1);
                t = (p = !p) ? "}" : "{"
            }
            g.push(q);
            return g.join("")
        };
        a.getMagnitude = function(a) {
            return Math.pow(10,
                Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function(q, f, t, p, y) {
            var u, k = q;
            t = a.pick(t, 1);
            u = q / t;
            f || (f = y ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === p && (1 === t ? f = a.grep(f, function(a) {
                return 0 === a % 1
            }) : .1 >= t && (f = [1 / t])));
            for (p = 0; p < f.length && !(k = f[p], y && k * t >= q || !y && u <= (f[p] + (f[p + 1] || f[p])) / 2); p++);
            return k = a.correctFloat(k * t, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function(a, f) {
            var q = a.length,
                p, y;
            for (y = 0; y < q; y++) a[y].safeI = y;
            a.sort(function(a, k) {
                p = f(a, k);
                return 0 === p ?
                    a.safeI - k.safeI : p
            });
            for (y = 0; y < q; y++) delete a[y].safeI
        };
        a.arrayMin = function(a) {
            for (var f = a.length, q = a[0]; f--;) a[f] < q && (q = a[f]);
            return q
        };
        a.arrayMax = function(a) {
            for (var f = a.length, q = a[0]; f--;) a[f] > q && (q = a[f]);
            return q
        };
        a.destroyObjectProperties = function(q, f) {
            a.objectEach(q, function(a, p) {
                a && a !== f && a.destroy && a.destroy();
                delete q[p]
            })
        };
        a.discardElement = function(q) {
            var f = a.garbageBin;
            f || (f = a.createElement("div"));
            q && f.appendChild(q);
            f.innerHTML = ""
        };
        a.correctFloat = function(a, f) {
            return parseFloat(a.toPrecision(f ||
                14))
        };
        a.setAnimation = function(q, f) {
            f.renderer.globalAnimation = a.pick(q, f.options.chart.animation, !0)
        };
        a.animObject = function(q) {
            return a.isObject(q) ? a.merge(q) : {
                duration: q ? 500 : 0
            }
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function(q, f, t, p) {
            q = +q || 0;
            f = +f;
            var y = a.defaultOptions.lang,
                u = (q.toString().split(".")[1] || "").length,
                k, e; - 1 === f ? f = Math.min(u, 20) : a.isNumber(f) || (f = 2);
            e = (Math.abs(q) + Math.pow(10, -Math.max(f, u) - 1)).toFixed(f);
            u = String(a.pInt(e));
            k = 3 < u.length ? u.length % 3 : 0;
            t = a.pick(t, y.decimalPoint);
            p = a.pick(p, y.thousandsSep);
            q = (0 > q ? "-" : "") + (k ? u.substr(0, k) + p : "");
            q += u.substr(k).replace(/(\d{3})(?=\d)/g, "$1" + p);
            f && (q += t + e.slice(-f));
            return q
        };
        Math.easeInOutSine = function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function(q, f, t) {
            if ("width" === f) return Math.min(q.offsetWidth, q.scrollWidth) - a.getStyle(q, "padding-left") - a.getStyle(q, "padding-right");
            if ("height" === f) return Math.min(q.offsetHeight, q.scrollHeight) - a.getStyle(q,
                "padding-top") - a.getStyle(q, "padding-bottom");
            if (q = E.getComputedStyle(q, void 0)) q = q.getPropertyValue(f), a.pick(t, !0) && (q = a.pInt(q));
            return q
        };
        a.inArray = function(a, f) {
            return f.indexOf ? f.indexOf(a) : [].indexOf.call(f, a)
        };
        a.grep = function(a, f) {
            return [].filter.call(a, f)
        };
        a.find = function(a, f) {
            return [].find.call(a, f)
        };
        a.map = function(a, f) {
            for (var q = [], p = 0, y = a.length; p < y; p++) q[p] = f.call(a[p], a[p], p, a);
            return q
        };
        a.offset = function(a) {
            var f = F.documentElement;
            a = a.getBoundingClientRect();
            return {
                top: a.top + (E.pageYOffset ||
                    f.scrollTop) - (f.clientTop || 0),
                left: a.left + (E.pageXOffset || f.scrollLeft) - (f.clientLeft || 0)
            }
        };
        a.stop = function(a, f) {
            for (var q = C.length; q--;) C[q].elem !== a || f && f !== C[q].prop || (C[q].stopped = !0)
        };
        a.each = function(a, f, t) {
            return Array.prototype.forEach.call(a, f, t)
        };
        a.objectEach = function(a, f, t) {
            for (var p in a) a.hasOwnProperty(p) && f.call(t, a[p], p, a)
        };
        a.addEvent = function(q, f, t) {
            function p(a) {
                a.target = a.srcElement || E;
                t.call(q, a)
            }
            var y = q.hcEvents = q.hcEvents || {};
            q.addEventListener ? q.addEventListener(f, t, !1) : q.attachEvent &&
                (q.hcEventsIE || (q.hcEventsIE = {}), q.hcEventsIE[t.toString()] = p, q.attachEvent("on" + f, p));
            y[f] || (y[f] = []);
            y[f].push(t);
            return function() {
                a.removeEvent(q, f, t)
            }
        };
        a.removeEvent = function(q, f, t) {
            function p(a, e) {
                q.removeEventListener ? q.removeEventListener(a, e, !1) : q.attachEvent && (e = q.hcEventsIE[e.toString()], q.detachEvent("on" + a, e))
            }

            function y() {
                var e, x;
                q.nodeName && (f ? (e = {}, e[f] = !0) : e = k, a.objectEach(e, function(a, e) {
                    if (k[e])
                        for (x = k[e].length; x--;) p(e, k[e][x])
                }))
            }
            var u, k = q.hcEvents,
                e;
            k && (f ? (u = k[f] || [], t ? (e = a.inArray(t,
                u), -1 < e && (u.splice(e, 1), k[f] = u), p(f, t)) : (y(), k[f] = [])) : (y(), q.hcEvents = {}))
        };
        a.fireEvent = function(q, f, t, p) {
            var y;
            y = q.hcEvents;
            var u, k;
            t = t || {};
            if (F.createEvent && (q.dispatchEvent || q.fireEvent)) y = F.createEvent("Events"), y.initEvent(f, !0, !0), a.extend(y, t), q.dispatchEvent ? q.dispatchEvent(y) : q.fireEvent(f, y);
            else if (y)
                for (y = y[f] || [], u = y.length, t.target || a.extend(t, {
                        preventDefault: function() {
                            t.defaultPrevented = !0
                        },
                        target: q,
                        type: f
                    }), f = 0; f < u; f++)(k = y[f]) && !1 === k.call(q, t) && t.preventDefault();
            p && !t.defaultPrevented &&
                p(t)
        };
        a.animate = function(q, f, t) {
            var p, y = "",
                u, k, e;
            a.isObject(t) || (e = arguments, t = {
                duration: e[2],
                easing: e[3],
                complete: e[4]
            });
            a.isNumber(t.duration) || (t.duration = 400);
            t.easing = "function" === typeof t.easing ? t.easing : Math[t.easing] || Math.easeInOutSine;
            t.curAnim = a.merge(f);
            a.objectEach(f, function(e, x) {
                a.stop(q, x);
                k = new a.Fx(q, t, x);
                u = null;
                "d" === x ? (k.paths = k.initPath(q, q.d, f.d), k.toD = f.d, p = 0, u = 1) : q.attr ? p = q.attr(x) : (p = parseFloat(a.getStyle(q, x)) || 0, "opacity" !== x && (y = "px"));
                u || (u = e);
                u && u.match && u.match("px") &&
                    (u = u.replace(/px/g, ""));
                k.run(p, u, y)
            })
        };
        a.seriesType = function(q, f, t, p, y) {
            var u = a.getOptions(),
                k = a.seriesTypes;
            u.plotOptions[q] = a.merge(u.plotOptions[f], t);
            k[q] = a.extendClass(k[f] || function() {}, p);
            k[q].prototype.type = q;
            y && (k[q].prototype.pointClass = a.extendClass(a.Point, y));
            return k[q]
        };
        a.uniqueKey = function() {
            var a = Math.random().toString(36).substring(2, 9),
                f = 0;
            return function() {
                return "highcharts-" + a + "-" + f++
            }
        }();
        E.jQuery && (E.jQuery.fn.highcharts = function() {
            var q = [].slice.call(arguments);
            if (this[0]) return q[0] ?
                (new(a[a.isString(q[0]) ? q.shift() : "Chart"])(this[0], q[0], q[1]), this) : B[a.attr(this[0], "data-highcharts-chart")]
        });
        F && !F.defaultView && (a.getStyle = function(q, f) {
            var t = {
                width: "clientWidth",
                height: "clientHeight"
            }[f];
            if (q.style[f]) return a.pInt(q.style[f]);
            "opacity" === f && (f = "filter");
            if (t) return q.style.zoom = 1, Math.max(q[t] - 2 * a.getStyle(q, "padding"), 0);
            q = q.currentStyle[f.replace(/\-(\w)/g, function(a, f) {
                return f.toUpperCase()
            })];
            "filter" === f && (q = q.replace(/alpha\(opacity=([0-9]+)\)/, function(a, f) {
                return f /
                    100
            }));
            return "" === q ? 1 : a.pInt(q)
        });
        Array.prototype.forEach || (a.each = function(a, f, t) {
            for (var p = 0, q = a.length; p < q; p++)
                if (!1 === f.call(t, a[p], p, a)) return p
        });
        Array.prototype.indexOf || (a.inArray = function(a, f) {
            var t, p = 0;
            if (f)
                for (t = f.length; p < t; p++)
                    if (f[p] === a) return p;
            return -1
        });
        Array.prototype.filter || (a.grep = function(a, f) {
            for (var t = [], p = 0, y = a.length; p < y; p++) f(a[p], p) && t.push(a[p]);
            return t
        });
        Array.prototype.find || (a.find = function(a, f) {
            var t, p = a.length;
            for (t = 0; t < p; t++)
                if (f(a[t], t)) return a[t]
        })
    })(L);
    (function(a) {
        var C =
            a.each,
            B = a.isNumber,
            F = a.map,
            E = a.merge,
            q = a.pInt;
        a.Color = function(f) {
            if (!(this instanceof a.Color)) return new a.Color(f);
            this.init(f)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function(a) {
                    return [q(a[1]), q(a[2]), q(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function(a) {
                    return [q(a[1]), q(a[2]), q(a[3]), 1]
                }
            }],
            names: {
                white: "#ffffff",
                black: "#000000"
            },
            init: function(f) {
                var t, p, y, u;
                if ((this.input = f = this.names[f && f.toLowerCase ? f.toLowerCase() : ""] || f) && f.stops) this.stops = F(f.stops, function(k) {
                    return new a.Color(k[1])
                });
                else if (f && "#" === f[0] && (t = f.length, f = parseInt(f.substr(1), 16), 7 === t ? p = [(f & 16711680) >> 16, (f & 65280) >> 8, f & 255, 1] : 4 === t && (p = [(f & 3840) >> 4 | (f & 3840) >> 8, (f & 240) >> 4 | f & 240, (f & 15) << 4 | f & 15, 1])), !p)
                    for (y = this.parsers.length; y-- && !p;) u = this.parsers[y], (t = u.regex.exec(f)) && (p = u.parse(t));
                this.rgba = p || []
            },
            get: function(a) {
                var f = this.input,
                    p = this.rgba,
                    y;
                this.stops ? (y = E(f), y.stops = [].concat(y.stops), C(this.stops, function(f, k) {
                    y.stops[k] = [y.stops[k][0], f.get(a)]
                })) : y = p && B(p[0]) ? "rgb" === a || !a && 1 === p[3] ? "rgb(" + p[0] + "," + p[1] + "," + p[2] + ")" : "a" === a ? p[3] : "rgba(" + p.join(",") + ")" : f;
                return y
            },
            brighten: function(a) {
                var f, p = this.rgba;
                if (this.stops) C(this.stops, function(f) {
                    f.brighten(a)
                });
                else if (B(a) && 0 !== a)
                    for (f = 0; 3 > f; f++) p[f] += q(255 * a), 0 > p[f] && (p[f] = 0), 255 < p[f] && (p[f] = 255);
                return this
            },
            setOpacity: function(a) {
                this.rgba[3] = a;
                return this
            }
        };
        a.color = function(f) {
            return new a.Color(f)
        }
    })(L);
    (function(a) {
        var C, B, F = a.addEvent,
            E = a.animate,
            q = a.attr,
            f = a.charts,
            t = a.color,
            p = a.css,
            y = a.createElement,
            u = a.defined,
            k = a.deg2rad,
            e = a.destroyObjectProperties,
            g = a.doc,
            x = a.each,
            b = a.extend,
            l = a.erase,
            d = a.grep,
            A = a.hasTouch,
            n = a.inArray,
            H = a.isArray,
            r = a.isFirefox,
            J = a.isMS,
            c = a.isObject,
            w = a.isString,
            K = a.isWebKit,
            v = a.merge,
            D = a.noop,
            m = a.objectEach,
            I = a.pick,
            h = a.pInt,
            z = a.removeEvent,
            P = a.stop,
            M = a.svg,
            Q = a.SVG_NS,
            N = a.symbolSizes,
            O = a.win;
        C = a.SVGElement = function() {
            return this
        };
        C.prototype = {
            opacity: 1,
            SVG_NS: Q,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function(a, h) {
                this.element = "span" === h ? y(h) : g.createElementNS(this.SVG_NS, h);
                this.renderer = a
            },
            animate: function(G, h, c) {
                h = a.animObject(I(h, this.renderer.globalAnimation, !0));
                0 !== h.duration ? (c && (h.complete = c), E(this, G, h)) : (this.attr(G, null, c), h.step && h.step.call(this));
                return this
            },
            colorGradient: function(h, c, b) {
                var G = this.renderer,
                    z, d, r, e, w, D, g, M, n, R, l = [],
                    I;
                h.radialGradient ? d = "radialGradient" : h.linearGradient && (d = "linearGradient");
                d && (r = h[d], w = G.gradients, g = h.stops, R = b.radialReference, H(r) && (h[d] =
                    r = {
                        x1: r[0],
                        y1: r[1],
                        x2: r[2],
                        y2: r[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === d && R && !u(r.gradientUnits) && (e = r, r = v(r, G.getRadialAttr(R, e), {
                    gradientUnits: "userSpaceOnUse"
                })), m(r, function(a, h) {
                    "id" !== h && l.push(h, a)
                }), m(g, function(a) {
                    l.push(a)
                }), l = l.join(","), w[l] ? R = w[l].attr("id") : (r.id = R = a.uniqueKey(), w[l] = D = G.createElement(d).attr(r).add(G.defs), D.radAttr = e, D.stops = [], x(g, function(h) {
                    0 === h[1].indexOf("rgba") ? (z = a.color(h[1]), M = z.get("rgb"), n = z.get("a")) : (M = h[1], n = 1);
                    h = G.createElement("stop").attr({
                        offset: h[0],
                        "stop-color": M,
                        "stop-opacity": n
                    }).add(D);
                    D.stops.push(h)
                })), I = "url(" + G.url + "#" + R + ")", b.setAttribute(c, I), b.gradient = l, h.toString = function() {
                    return I
                })
            },
            applyTextOutline: function(h) {
                var G = this.element,
                    c, b, z, m, d; - 1 !== h.indexOf("contrast") && (h = h.replace(/contrast/g, this.renderer.getContrast(G.style.fill)));
                h = h.split(" ");
                b = h[h.length - 1];
                if ((z = h[0]) && "none" !== z && a.svg) {
                    this.fakeTS = !0;
                    h = [].slice.call(G.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    z = z.replace(/(^[\d\.]+)(.*?)$/g, function(a,
                        h, G) {
                        return 2 * h + G
                    });
                    for (d = h.length; d--;) c = h[d], "highcharts-text-outline" === c.getAttribute("class") && l(h, G.removeChild(c));
                    m = G.firstChild;
                    x(h, function(a, h) {
                        0 === h && (a.setAttribute("x", G.getAttribute("x")), h = G.getAttribute("y"), a.setAttribute("y", h || 0), null === h && G.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        q(a, {
                            "class": "highcharts-text-outline",
                            fill: b,
                            stroke: b,
                            "stroke-width": z,
                            "stroke-linejoin": "round"
                        });
                        G.insertBefore(a, m)
                    })
                }
            },
            attr: function(a, h, c, b) {
                var G, z = this.element,
                    d, r = this,
                    v, e;
                "string" === typeof a &&
                    void 0 !== h && (G = a, a = {}, a[G] = h);
                "string" === typeof a ? r = (this[a + "Getter"] || this._defaultGetter).call(this, a, z) : (m(a, function(h, G) {
                        v = !1;
                        b || P(this, G);
                        this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(G) && (d || (this.symbolAttr(a), d = !0), v = !0);
                        !this.rotation || "x" !== G && "y" !== G || (this.doTransform = !0);
                        v || (e = this[G + "Setter"] || this._defaultSetter, e.call(this, h, G, z), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(G) && this.updateShadows(G, h, e))
                    }, this), this.doTransform &&
                    (this.updateTransform(), this.doTransform = !1));
                c && c();
                return r
            },
            updateShadows: function(a, h, c) {
                for (var G = this.shadows, b = G.length; b--;) c.call(G[b], "height" === a ? Math.max(h - (G[b].cutHeight || 0), 0) : "d" === a ? this.d : h, a, G[b])
            },
            addClass: function(a, h) {
                var G = this.attr("class") || ""; - 1 === G.indexOf(a) && (h || (a = (G + (G ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function(a) {
                return -1 !== q(this.element, "class").indexOf(a)
            },
            removeClass: function(a) {
                q(this.element, "class", (q(this.element, "class") ||
                    "").replace(a, ""));
                return this
            },
            symbolAttr: function(a) {
                var h = this;
                x("x y r start end width height innerR anchorX anchorY".split(" "), function(G) {
                    h[G] = I(a[G], h[G])
                });
                h.attr({
                    d: h.renderer.symbols[h.symbolName](h.x, h.y, h.width, h.height, h)
                })
            },
            clip: function(a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function(a, h) {
                var G = this,
                    c = {},
                    b;
                h = h || a.strokeWidth || 0;
                b = Math.round(h) % 2 / 2;
                a.x = Math.floor(a.x || G.x || 0) + b;
                a.y = Math.floor(a.y || G.y || 0) + b;
                a.width = Math.floor((a.width ||
                    G.width || 0) - 2 * b);
                a.height = Math.floor((a.height || G.height || 0) - 2 * b);
                u(a.strokeWidth) && (a.strokeWidth = h);
                m(a, function(a, h) {
                    G[h] !== a && (G[h] = c[h] = a)
                });
                return c
            },
            css: function(a) {
                var G = this.styles,
                    c = {},
                    z = this.element,
                    d, r = "",
                    v, e = !G,
                    w = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                G && m(a, function(a, h) {
                    a !== G[h] && (c[h] = a, e = !0)
                });
                e && (G && (a = b(G, c)), d = this.textWidth = a && a.width && "auto" !== a.width && "text" === z.nodeName.toLowerCase() && h(a.width), this.styles = a, d && !M && this.renderer.forExport && delete a.width,
                    J && !M ? p(this.element, a) : (v = function(a, h) {
                        return "-" + h.toLowerCase()
                    }, m(a, function(a, h) {
                        -1 === n(h, w) && (r += h.replace(/([A-Z])/g, v) + ":" + a + ";")
                    }), r && q(z, "style", r)), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function() {
                return this["stroke-width"] || 0
            },
            on: function(a, h) {
                var G = this,
                    c = G.element;
                A && "click" === a ? (c.ontouchstart = function(a) {
                        G.touchEventFired = Date.now();
                        a.preventDefault();
                        h.call(c, a)
                    },
                    c.onclick = function(a) {
                        (-1 === O.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (G.touchEventFired || 0)) && h.call(c, a)
                    }) : c["on" + a] = h;
                return this
            },
            setRadialReference: function(a) {
                var h = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                h && h.radAttr && h.animate(this.renderer.getRadialAttr(a, h.radAttr));
                return this
            },
            translate: function(a, h) {
                return this.attr({
                    translateX: a,
                    translateY: h
                })
            },
            invert: function(a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function() {
                var a =
                    this.translateX || 0,
                    h = this.translateY || 0,
                    c = this.scaleX,
                    b = this.scaleY,
                    z = this.inverted,
                    m = this.rotation,
                    d = this.element;
                z && (a += this.width, h += this.height);
                a = ["translate(" + a + "," + h + ")"];
                z ? a.push("rotate(90) scale(-1,1)") : m && a.push("rotate(" + m + " " + (d.getAttribute("x") || 0) + " " + (d.getAttribute("y") || 0) + ")");
                (u(c) || u(b)) && a.push("scale(" + I(c, 1) + " " + I(b, 1) + ")");
                a.length && d.setAttribute("transform", a.join(" "))
            },
            toFront: function() {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function(a, h, c) {
                var G,
                    b, z, m, d = {};
                b = this.renderer;
                z = b.alignedObjects;
                var r, v;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = h, !c || w(c)) this.alignTo = G = c || "renderer", l(z, this), z.push(this), c = null
                } else a = this.alignOptions, h = this.alignByTranslate, G = this.alignTo;
                c = I(c, b[G], b);
                G = a.align;
                b = a.verticalAlign;
                z = (c.x || 0) + (a.x || 0);
                m = (c.y || 0) + (a.y || 0);
                "right" === G ? r = 1 : "center" === G && (r = 2);
                r && (z += (c.width - (a.width || 0)) / r);
                d[h ? "translateX" : "x"] = Math.round(z);
                "bottom" === b ? v = 1 : "middle" === b && (v = 2);
                v && (m += (c.height - (a.height || 0)) / v);
                d[h ?
                    "translateY" : "y"] = Math.round(m);
                this[this.placed ? "animate" : "attr"](d);
                this.placed = !0;
                this.alignAttr = d;
                return this
            },
            getBBox: function(a, h) {
                var c, G = this.renderer,
                    z, m = this.element,
                    d = this.styles,
                    r, v = this.textStr,
                    e, w = G.cache,
                    D = G.cacheKeys,
                    g;
                h = I(h, this.rotation);
                z = h * k;
                r = d && d.fontSize;
                void 0 !== v && (g = v.toString(), -1 === g.indexOf("\x3c") && (g = g.replace(/[0-9]/g, "0")), g += ["", h || 0, r, d && d.width, d && d.textOverflow].join());
                g && !a && (c = w[g]);
                if (!c) {
                    if (m.namespaceURI === this.SVG_NS || G.forExport) {
                        try {
                            (e = this.fakeTS && function(a) {
                                x(m.querySelectorAll(".highcharts-text-outline"),
                                    function(h) {
                                        h.style.display = a
                                    })
                            }) && e("none"), c = m.getBBox ? b({}, m.getBBox()) : {
                                width: m.offsetWidth,
                                height: m.offsetHeight
                            }, e && e("")
                        } catch (W) {}
                        if (!c || 0 > c.width) c = {
                            width: 0,
                            height: 0
                        }
                    } else c = this.htmlGetBBox();
                    G.isSVG && (a = c.width, G = c.height, d && "11px" === d.fontSize && 17 === Math.round(G) && (c.height = G = 14), h && (c.width = Math.abs(G * Math.sin(z)) + Math.abs(a * Math.cos(z)), c.height = Math.abs(G * Math.cos(z)) + Math.abs(a * Math.sin(z))));
                    if (g && 0 < c.height) {
                        for (; 250 < D.length;) delete w[D.shift()];
                        w[g] || D.push(g);
                        w[g] = c
                    }
                }
                return c
            },
            show: function(a) {
                return this.attr({
                    visibility: a ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(a) {
                var h = this;
                h.animate({
                    opacity: 0
                }, {
                    duration: a || 150,
                    complete: function() {
                        h.attr({
                            y: -9999
                        })
                    }
                })
            },
            add: function(a) {
                var h = this.renderer,
                    c = this.element,
                    G;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && h.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) G = this.zIndexSetter();
                G || (a ? a.element : h.box).appendChild(c);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function(a) {
                var h = a.parentNode;
                h && h.removeChild(a)
            },
            destroy: function() {
                var a = this,
                    h = a.element || {},
                    c = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
                    b = h.ownerSVGElement;
                h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point = null;
                P(a);
                a.clipPath && b && (x(b.querySelectorAll("[clip-path]"), function(h) {
                    -1 < h.getAttribute("clip-path").indexOf(a.clipPath.element.id + ")") && h.removeAttribute("clip-path")
                }), a.clipPath = a.clipPath.destroy());
                if (a.stops) {
                    for (b = 0; b < a.stops.length; b++) a.stops[b] =
                        a.stops[b].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(h);
                for (a.destroyShadows(); c && c.div && 0 === c.div.childNodes.length;) h = c.parentGroup, a.safeRemoveChild(c.div), delete c.div, c = h;
                a.alignTo && l(a.renderer.alignedObjects, a);
                m(a, function(h, c) {
                    delete a[c]
                });
                return null
            },
            shadow: function(a, h, c) {
                var b = [],
                    z, G, m = this.element,
                    d, r, v, e;
                if (!a) this.destroyShadows();
                else if (!this.shadows) {
                    r = I(a.width, 3);
                    v = (a.opacity || .15) / r;
                    e = this.parentInverted ? "(-1,-1)" : "(" + I(a.offsetX, 1) + ", " + I(a.offsetY, 1) + ")";
                    for (z = 1; z <= r; z++) G =
                        m.cloneNode(0), d = 2 * r + 1 - 2 * z, q(G, {
                            isShadow: "true",
                            stroke: a.color || "#000000",
                            "stroke-opacity": v * z,
                            "stroke-width": d,
                            transform: "translate" + e,
                            fill: "none"
                        }), c && (q(G, "height", Math.max(q(G, "height") - d, 0)), G.cutHeight = d), h ? h.element.appendChild(G) : m.parentNode.insertBefore(G, m), b.push(G);
                    this.shadows = b
                }
                return this
            },
            destroyShadows: function() {
                x(this.shadows || [], function(a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function(a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function(a) {
                a = I(this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function(a, h, c) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                c.setAttribute(h, a);
                this[h] = a
            },
            dashstyleSetter: function(a) {
                var c, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash",
                        "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (c = a.length; c--;) a[c] = h(a[c]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function(a) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[a])
            },
            opacitySetter: function(a, h, c) {
                this[h] = a;
                c.setAttribute(h, a)
            },
            titleSetter: function(a) {
                var h = this.element.getElementsByTagName("title")[0];
                h || (h = g.createElementNS(this.SVG_NS,
                    "title"), this.element.appendChild(h));
                h.firstChild && h.removeChild(h.firstChild);
                h.appendChild(g.createTextNode(String(I(a), "").replace(/<[^>]*>/g, "")))
            },
            textSetter: function(a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(a, h, c) {
                "string" === typeof a ? c.setAttribute(h, a) : a && this.colorGradient(a, h, c)
            },
            visibilitySetter: function(a, h, c) {
                "inherit" === a ? c.removeAttribute(h) : c.setAttribute(h, a)
            },
            zIndexSetter: function(a, c) {
                var b = this.renderer,
                    z = this.parentGroup,
                    m = (z || b).element || b.box,
                    d, r = this.element,
                    G;
                d = this.added;
                var v;
                u(a) && (r.zIndex = a, a = +a, this[c] === a && (d = !1), this[c] = a);
                if (d) {
                    (a = this.zIndex) && z && (z.handleZ = !0);
                    c = m.childNodes;
                    for (v = 0; v < c.length && !G; v++) z = c[v], d = z.zIndex, z !== r && (h(d) > a || !u(a) && u(d) || 0 > a && !u(d) && m !== b.box) && (m.insertBefore(r, z), G = !0);
                    G || m.appendChild(r)
                }
                return G
            },
            _defaultSetter: function(a, h, c) {
                c.setAttribute(h, a)
            }
        };
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter = C.prototype.rotationSetter =
            C.prototype.verticalAlignSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = function(a, h) {
                this[h] = a;
                this.doTransform = !0
            };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function(a, h, c) {
            this[h] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", c), c.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === h && 0 === a && this.hasStroke && (c.removeAttribute("stroke"), this.hasStroke = !1)
        };
        B = a.SVGRenderer = function() {
            this.init.apply(this,
                arguments)
        };
        B.prototype = {
            Element: C,
            SVG_NS: Q,
            init: function(a, h, c, b, z, m) {
                var d;
                b = this.createElement("svg").attr({
                    version: "1.1",
                    "class": "highcharts-root"
                }).css(this.getStyle(b));
                d = b.element;
                a.appendChild(d); - 1 === a.innerHTML.indexOf("xmlns") && q(d, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = d;
                this.boxWrapper = b;
                this.alignedObjects = [];
                this.url = (r || K) && g.getElementsByTagName("base").length ? O.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(g.createTextNode("Created 5.0.11"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = m;
                this.forExport = z;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(h, c, !1);
                var G;
                r && a.getBoundingClientRect && (h = function() {
                    p(a, {
                        left: 0,
                        top: 0
                    });
                    G = a.getBoundingClientRect();
                    p(a, {
                        left: Math.ceil(G.left) - G.left + "px",
                        top: Math.ceil(G.top) - G.top + "px"
                    })
                }, h(), this.unSubPixelFix = F(O, "resize", h))
            },
            getStyle: function(a) {
                return this.style = b({
                        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                        fontSize: "12px"
                    },
                    a)
            },
            setStyle: function(a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function(a) {
                var h = new this.Element;
                h.init(this, a);
                return h
            },
            draw: D,
            getRadialAttr: function(a, h) {
                return {
                    cx: a[0] - a[2] / 2 + h.cx * a[2],
                    cy: a[1] -
                        a[2] / 2 + h.cy * a[2],
                    r: h.r * a[2]
                }
            },
            getSpanWidth: function(a, h) {
                var c = a.getBBox(!0).width;
                !M && this.forExport && (c = this.measureSpanWidth(h.firstChild.data, a.styles));
                return c
            },
            applyEllipsis: function(a, h, c, b) {
                var z = this.getSpanWidth(a, h),
                    m = z > b,
                    z = c,
                    d, r = 0,
                    v = c.length,
                    G = function(a) {
                        h.removeChild(h.firstChild);
                        a && h.appendChild(g.createTextNode(a))
                    };
                if (m) {
                    for (; r <= v;) d = Math.ceil((r + v) / 2), z = c.substring(0, d) + "\u2026", G(z), z = this.getSpanWidth(a, h), r === v ? r = v + 1 : z > b ? v = d - 1 : r = d;
                    0 === v && G("")
                }
                return m
            },
            buildText: function(a) {
                var c =
                    a.element,
                    b = this,
                    z = b.forExport,
                    m = I(a.textStr, "").toString(),
                    r = -1 !== m.indexOf("\x3c"),
                    v = c.childNodes,
                    G, e, w, D, n = q(c, "x"),
                    l = a.styles,
                    J = a.textWidth,
                    A = l && l.lineHeight,
                    k = l && l.textOutline,
                    H = l && "ellipsis" === l.textOverflow,
                    K = l && "nowrap" === l.whiteSpace,
                    f = l && l.fontSize,
                    P, u, y = v.length,
                    l = J && !a.added && this.box,
                    t = function(a) {
                        var z;
                        z = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : f || b.style.fontSize || 12;
                        return A ? h(A) : b.fontMetrics(z, a.getAttribute("style") ? a : c).h
                    };
                P = [m, H, K, A, k, f, J].join();
                if (P !== a.textCache) {
                    for (a.textCache =
                        P; y--;) c.removeChild(v[y]);
                    r || k || H || J || -1 !== m.indexOf(" ") ? (G = /<.*class="([^"]+)".*>/, e = /<.*style="([^"]+)".*>/, w = /<.*href="(http[^"]+)".*>/, l && l.appendChild(c), m = r ? m.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [m], m = d(m, function(a) {
                        return "" !== a
                    }), x(m, function(h, m) {
                        var d, r = 0;
                        h = h.replace(/^\s+|\s+$/g, "").replace(/<span/g,
                            "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        d = h.split("|||");
                        x(d, function(h) {
                            if ("" !== h || 1 === d.length) {
                                var v = {},
                                    l = g.createElementNS(b.SVG_NS, "tspan"),
                                    I, x;
                                G.test(h) && (I = h.match(G)[1], q(l, "class", I));
                                e.test(h) && (x = h.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), q(l, "style", x));
                                w.test(h) && !z && (q(l, "onclick", 'location.href\x3d"' + h.match(w)[1] + '"'), p(l, {
                                    cursor: "pointer"
                                }));
                                h = (h.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e");
                                if (" " !== h) {
                                    l.appendChild(g.createTextNode(h));
                                    r ? v.dx = 0 : m && null !== n && (v.x = n);
                                    q(l, v);
                                    c.appendChild(l);
                                    !r && u && (!M && z && p(l, {
                                        display: "block"
                                    }), q(l, "dy", t(l)));
                                    if (J) {
                                        v = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                        I = 1 < d.length || m || 1 < v.length && !K;
                                        var A = [],
                                            k, f = t(l),
                                            P = a.rotation;
                                        for (H && (D = b.applyEllipsis(a, l, h, J)); !H && I && (v.length || A.length);) a.rotation = 0, k = b.getSpanWidth(a, l), h = k > J, void 0 === D && (D = h), h && 1 !== v.length ? (l.removeChild(l.firstChild), A.unshift(v.pop())) : (v = A, A = [], v.length && !K && (l = g.createElementNS(Q, "tspan"), q(l, {
                                                dy: f,
                                                x: n
                                            }), x && q(l, "style", x), c.appendChild(l)),
                                            k > J && (J = k)), v.length && l.appendChild(g.createTextNode(v.join(" ").replace(/- /g, "-")));
                                        a.rotation = P
                                    }
                                    r++
                                }
                            }
                        });
                        u = u || c.childNodes.length
                    }), D && a.attr("title", a.textStr), l && l.removeChild(c), k && a.applyTextOutline && a.applyTextOutline(k)) : c.appendChild(g.createTextNode(m.replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
                }
            },
            getContrast: function(a) {
                a = t(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function(a, h, c, z, m, d, r, e, w) {
                var G = this.label(a, h, c, w, null, null, null, null, "button"),
                    l = 0;
                G.attr(v({
                    padding: 8,
                    r: 2
                }, m));
                var D, g, n, M;
                m = v({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, m);
                D = m.style;
                delete m.style;
                d = v(m, {
                    fill: "#e6e6e6"
                }, d);
                g = d.style;
                delete d.style;
                r = v(m, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, r);
                n = r.style;
                delete r.style;
                e = v(m, {
                    style: {
                        color: "#cccccc"
                    }
                }, e);
                M = e.style;
                delete e.style;
                F(G.element, J ? "mouseover" : "mouseenter", function() {
                    3 !== l && G.setState(1)
                });
                F(G.element, J ? "mouseout" : "mouseleave", function() {
                    3 !== l && G.setState(l)
                });
                G.setState = function(a) {
                    1 !== a && (G.state = l = a);
                    G.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    G.attr([m, d, r, e][a || 0]).css([D, g, n, M][a || 0])
                };
                G.attr(m).css(b({
                    cursor: "default"
                }, D));
                return G.on("click", function(a) {
                    3 !== l && z.call(G, a)
                })
            },
            crispLine: function(a, h) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
                return a
            },
            path: function(a) {
                var h = {
                    fill: "none"
                };
                H(a) ? h.d =
                    a : c(a) && b(h, a);
                return this.createElement("path").attr(h)
            },
            circle: function(a, h, b) {
                a = c(a) ? a : {
                    x: a,
                    y: h,
                    r: b
                };
                h = this.createElement("circle");
                h.xSetter = h.ySetter = function(a, h, c) {
                    c.setAttribute("c" + h, a)
                };
                return h.attr(a)
            },
            arc: function(a, h, b, z, m, d) {
                c(a) ? (z = a, h = z.y, b = z.r, a = z.x) : z = {
                    innerR: z,
                    start: m,
                    end: d
                };
                a = this.symbol("arc", a, h, b, b, z);
                a.r = b;
                return a
            },
            rect: function(a, h, b, z, m, d) {
                m = c(a) ? a.r : m;
                var r = this.createElement("rect");
                a = c(a) ? a : void 0 === a ? {} : {
                    x: a,
                    y: h,
                    width: Math.max(b, 0),
                    height: Math.max(z, 0)
                };
                void 0 !== d &&
                    (a.strokeWidth = d, a = r.crisp(a));
                a.fill = "none";
                m && (a.r = m);
                r.rSetter = function(a, h, c) {
                    q(c, {
                        rx: a,
                        ry: a
                    })
                };
                return r.attr(a)
            },
            setSize: function(a, h, c) {
                var b = this.alignedObjects,
                    z = b.length;
                this.width = a;
                this.height = h;
                for (this.boxWrapper.animate({
                        width: a,
                        height: h
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: I(c, !0) ? void 0 : 0
                    }); z--;) b[z].align()
            },
            g: function(a) {
                var h = this.createElement("g");
                return a ? h.attr({
                    "class": "highcharts-" + a
                }) : h
            },
            image: function(a, h, c, z,
                m) {
                var d = {
                    preserveAspectRatio: "none"
                };
                1 < arguments.length && b(d, {
                    x: h,
                    y: c,
                    width: z,
                    height: m
                });
                d = this.createElement("image").attr(d);
                d.element.setAttributeNS ? d.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : d.element.setAttribute("hc-svg-href", a);
                return d
            },
            symbol: function(a, h, c, z, m, d) {
                var r = this,
                    v, e = /^url\((.*?)\)$/,
                    w = e.test(a),
                    G = !w && (this.symbols[a] ? a : "circle"),
                    l = G && this.symbols[G],
                    D = u(h) && l && l.call(this.symbols, Math.round(h), Math.round(c), z, m, d),
                    n, M;
                l ? (v = this.path(D), v.attr("fill", "none"),
                    b(v, {
                        symbolName: G,
                        x: h,
                        y: c,
                        width: z,
                        height: m
                    }), d && b(v, d)) : w && (n = a.match(e)[1], v = this.image(n), v.imgwidth = I(N[n] && N[n].width, d && d.width), v.imgheight = I(N[n] && N[n].height, d && d.height), M = function() {
                    v.attr({
                        width: v.width,
                        height: v.height
                    })
                }, x(["width", "height"], function(a) {
                    v[a + "Setter"] = function(a, h) {
                        var c = {},
                            b = this["img" + h],
                            z = "width" === h ? "translateX" : "translateY";
                        this[h] = a;
                        u(b) && (this.element && this.element.setAttribute(h, b), this.alignByTranslate || (c[z] = ((this[h] || 0) - b) / 2, this.attr(c)))
                    }
                }), u(h) && v.attr({
                    x: h,
                    y: c
                }), v.isImg = !0, u(v.imgwidth) && u(v.imgheight) ? M() : (v.attr({
                    width: 0,
                    height: 0
                }), y("img", {
                    onload: function() {
                        var a = f[r.chartIndex];
                        0 === this.width && (p(this, {
                            position: "absolute",
                            top: "-999em"
                        }), g.body.appendChild(this));
                        N[n] = {
                            width: this.width,
                            height: this.height
                        };
                        v.imgwidth = this.width;
                        v.imgheight = this.height;
                        v.element && M();
                        this.parentNode && this.parentNode.removeChild(this);
                        r.imgCount--;
                        if (!r.imgCount && a && a.onload) a.onload()
                    },
                    src: n
                }), this.imgCount++));
                return v
            },
            symbols: {
                circle: function(a, h, c, b) {
                    return this.arc(a +
                        c / 2, h + b / 2, c / 2, b / 2, {
                            start: 0,
                            end: 2 * Math.PI,
                            open: !1
                        })
                },
                square: function(a, h, c, b) {
                    return ["M", a, h, "L", a + c, h, a + c, h + b, a, h + b, "Z"]
                },
                triangle: function(a, h, c, b) {
                    return ["M", a + c / 2, h, "L", a + c, h + b, a, h + b, "Z"]
                },
                "triangle-down": function(a, h, c, b) {
                    return ["M", a, h, "L", a + c, h, a + c / 2, h + b, "Z"]
                },
                diamond: function(a, h, c, b) {
                    return ["M", a + c / 2, h, "L", a + c, h + b / 2, a + c / 2, h + b, a, h + b / 2, "Z"]
                },
                arc: function(a, h, c, b, z) {
                    var m = z.start,
                        d = z.r || c,
                        r = z.r || b || c,
                        v = z.end - .001;
                    c = z.innerR;
                    b = z.open;
                    var e = Math.cos(m),
                        w = Math.sin(m),
                        l = Math.cos(v),
                        v = Math.sin(v);
                    z = z.end - m < Math.PI ? 0 : 1;
                    d = ["M", a + d * e, h + r * w, "A", d, r, 0, z, 1, a + d * l, h + r * v];
                    u(c) && d.push(b ? "M" : "L", a + c * l, h + c * v, "A", c, c, 0, z, 0, a + c * e, h + c * w);
                    d.push(b ? "" : "Z");
                    return d
                },
                callout: function(a, h, c, b, z) {
                    var m = Math.min(z && z.r || 0, c, b),
                        d = m + 6,
                        r = z && z.anchorX;
                    z = z && z.anchorY;
                    var v;
                    v = ["M", a + m, h, "L", a + c - m, h, "C", a + c, h, a + c, h, a + c, h + m, "L", a + c, h + b - m, "C", a + c, h + b, a + c, h + b, a + c - m, h + b, "L", a + m, h + b, "C", a, h + b, a, h + b, a, h + b - m, "L", a, h + m, "C", a, h, a, h, a + m, h];
                    r && r > c ? z > h + d && z < h + b - d ? v.splice(13, 3, "L", a + c, z - 6, a + c + 6, z, a + c, z + 6, a + c, h + b - m) : v.splice(13,
                        3, "L", a + c, b / 2, r, z, a + c, b / 2, a + c, h + b - m) : r && 0 > r ? z > h + d && z < h + b - d ? v.splice(33, 3, "L", a, z + 6, a - 6, z, a, z - 6, a, h + m) : v.splice(33, 3, "L", a, b / 2, r, z, a, b / 2, a, h + m) : z && z > b && r > a + d && r < a + c - d ? v.splice(23, 3, "L", r + 6, h + b, r, h + b + 6, r - 6, h + b, a + m, h + b) : z && 0 > z && r > a + d && r < a + c - d && v.splice(3, 3, "L", r - 6, h, r, h - 6, r + 6, h, c - m, h);
                    return v
                }
            },
            clipRect: function(h, c, b, z) {
                var m = a.uniqueKey(),
                    d = this.createElement("clipPath").attr({
                        id: m
                    }).add(this.defs);
                h = this.rect(h, c, b, z, 0).add(d);
                h.id = m;
                h.clipPath = d;
                h.count = 0;
                return h
            },
            text: function(a, h, c, b) {
                var z = !M && this.forExport,
                    m = {};
                if (b && (this.allowHTML || !this.forExport)) return this.html(a, h, c);
                m.x = Math.round(h || 0);
                c && (m.y = Math.round(c));
                if (a || 0 === a) m.text = a;
                a = this.createElement("text").attr(m);
                z && a.css({
                    position: "absolute"
                });
                b || (a.xSetter = function(a, h, c) {
                    var b = c.getElementsByTagName("tspan"),
                        z, m = c.getAttribute(h),
                        d;
                    for (d = 0; d < b.length; d++) z = b[d], z.getAttribute(h) === m && z.setAttribute(h, a);
                    c.setAttribute(h, a)
                });
                return a
            },
            fontMetrics: function(a, c) {
                a = a || c && c.style && c.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? h(a) : /em/.test(a) ? parseFloat(a) * (c ? this.fontMetrics(null, c.parentNode).f : 16) : 12;
                c = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {
                    h: c,
                    b: Math.round(.8 * c),
                    f: a
                }
            },
            rotCorr: function(a, h, c) {
                var b = a;
                h && c && (b = Math.max(b * Math.cos(h * k), 4));
                return {
                    x: -a / 3 * Math.sin(h * k),
                    y: b
                }
            },
            label: function(h, c, m, d, r, e, w, l, D) {
                var g = this,
                    n = g.g("button" !== D && "label"),
                    M = n.text = g.text("", 0, 0, w).attr({
                        zIndex: 1
                    }),
                    I, J, G = 0,
                    A = 3,
                    k = 0,
                    H, K, f, P, p, Q = {},
                    y, q, t = /^url\((.*?)\)$/.test(d),
                    N = t,
                    R, V, U, O;
                D && n.addClass("highcharts-" + D);
                N = t;
                R = function() {
                    return (y ||
                        0) % 2 / 2
                };
                V = function() {
                    var a = M.element.style,
                        h = {};
                    J = (void 0 === H || void 0 === K || p) && u(M.textStr) && M.getBBox();
                    n.width = (H || J.width || 0) + 2 * A + k;
                    n.height = (K || J.height || 0) + 2 * A;
                    q = A + g.fontMetrics(a && a.fontSize, M).b;
                    N && (I || (n.box = I = g.symbols[d] || t ? g.symbol(d) : g.rect(), I.addClass(("button" === D ? "" : "highcharts-label-box") + (D ? " highcharts-" + D + "-box" : "")), I.add(n), a = R(), h.x = a, h.y = (l ? -q : 0) + a), h.width = Math.round(n.width), h.height = Math.round(n.height), I.attr(b(h, Q)), Q = {})
                };
                U = function() {
                    var a = k + A,
                        h;
                    h = l ? 0 : q;
                    u(H) && J && ("center" ===
                        p || "right" === p) && (a += {
                        center: .5,
                        right: 1
                    }[p] * (H - J.width));
                    if (a !== M.x || h !== M.y) M.attr("x", a), void 0 !== h && M.attr("y", h);
                    M.x = a;
                    M.y = h
                };
                O = function(a, h) {
                    I ? I.attr(a, h) : Q[a] = h
                };
                n.onAdd = function() {
                    M.add(n);
                    n.attr({
                        text: h || 0 === h ? h : "",
                        x: c,
                        y: m
                    });
                    I && u(r) && n.attr({
                        anchorX: r,
                        anchorY: e
                    })
                };
                n.widthSetter = function(h) {
                    H = a.isNumber(h) ? h : null
                };
                n.heightSetter = function(a) {
                    K = a
                };
                n["text-alignSetter"] = function(a) {
                    p = a
                };
                n.paddingSetter = function(a) {
                    u(a) && a !== A && (A = n.padding = a, U())
                };
                n.paddingLeftSetter = function(a) {
                    u(a) && a !== k &&
                        (k = a, U())
                };
                n.alignSetter = function(a) {
                    a = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a];
                    a !== G && (G = a, J && n.attr({
                        x: f
                    }))
                };
                n.textSetter = function(a) {
                    void 0 !== a && M.textSetter(a);
                    V();
                    U()
                };
                n["stroke-widthSetter"] = function(a, h) {
                    a && (N = !0);
                    y = this["stroke-width"] = a;
                    O(h, a)
                };
                n.strokeSetter = n.fillSetter = n.rSetter = function(a, h) {
                    "fill" === h && a && (N = !0);
                    O(h, a)
                };
                n.anchorXSetter = function(a, h) {
                    r = n.anchorX = a;
                    O(h, Math.round(a) - R() - f)
                };
                n.anchorYSetter = function(a, h) {
                    e = n.anchorY = a;
                    O(h, a - P)
                };
                n.xSetter = function(a) {
                    n.x = a;
                    G && (a -= G * ((H || J.width) + 2 *
                        A));
                    f = Math.round(a);
                    n.attr("translateX", f)
                };
                n.ySetter = function(a) {
                    P = n.y = Math.round(a);
                    n.attr("translateY", P)
                };
                var B = n.css;
                return b(n, {
                    css: function(a) {
                        if (a) {
                            var h = {};
                            a = v(a);
                            x(n.textProps, function(c) {
                                void 0 !== a[c] && (h[c] = a[c], delete a[c])
                            });
                            M.css(h)
                        }
                        return B.call(n, a)
                    },
                    getBBox: function() {
                        return {
                            width: J.width + 2 * A,
                            height: J.height + 2 * A,
                            x: J.x - A,
                            y: J.y - A
                        }
                    },
                    shadow: function(a) {
                        a && (V(), I && I.shadow(a));
                        return n
                    },
                    destroy: function() {
                        z(n.element, "mouseenter");
                        z(n.element, "mouseleave");
                        M && (M = M.destroy());
                        I && (I = I.destroy());
                        C.prototype.destroy.call(n);
                        n = g = V = U = O = null
                    }
                })
            }
        };
        a.Renderer = B
    })(L);
    (function(a) {
        var C = a.attr,
            B = a.createElement,
            F = a.css,
            E = a.defined,
            q = a.each,
            f = a.extend,
            t = a.isFirefox,
            p = a.isMS,
            y = a.isWebKit,
            u = a.pInt,
            k = a.SVGRenderer,
            e = a.win,
            g = a.wrap;
        f(a.SVGElement.prototype, {
            htmlCss: function(a) {
                var b = this.element;
                if (b = a && "SPAN" === b.tagName && a.width) delete a.width, this.textWidth = b, this.updateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = f(this.styles, a);
                F(this.element,
                    a);
                return this
            },
            htmlGetBBox: function() {
                var a = this.element;
                "text" === a.nodeName && (a.style.position = "absolute");
                return {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var a = this.renderer,
                        b = this.element,
                        e = this.translateX || 0,
                        d = this.translateY || 0,
                        g = this.x || 0,
                        n = this.y || 0,
                        k = this.textAlign || "left",
                        r = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[k],
                        J = this.styles;
                    F(b, {
                        marginLeft: e,
                        marginTop: d
                    });
                    this.shadows && q(this.shadows, function(a) {
                        F(a, {
                            marginLeft: e + 1,
                            marginTop: d +
                                1
                        })
                    });
                    this.inverted && q(b.childNodes, function(c) {
                        a.invertChild(c, b)
                    });
                    if ("SPAN" === b.tagName) {
                        var c = this.rotation,
                            w = u(this.textWidth),
                            K = J && J.whiteSpace,
                            v = [c, k, b.innerHTML, this.textWidth, this.textAlign].join();
                        v !== this.cTT && (J = a.fontMetrics(b.style.fontSize).b, E(c) && this.setSpanRotation(c, r, J), F(b, {
                            width: "",
                            whiteSpace: K || "nowrap"
                        }), b.offsetWidth > w && /[ \-]/.test(b.textContent || b.innerText) && F(b, {
                            width: w + "px",
                            display: "block",
                            whiteSpace: K || "normal"
                        }), this.getSpanCorrection(b.offsetWidth, J, r, c, k));
                        F(b, {
                            left: g +
                                (this.xCorr || 0) + "px",
                            top: n + (this.yCorr || 0) + "px"
                        });
                        y && (J = b.offsetHeight);
                        this.cTT = v
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(a, b, l) {
                var d = {},
                    g = p ? "-ms-transform" : y ? "-webkit-transform" : t ? "MozTransform" : e.opera ? "-o-transform" : "";
                d[g] = d.transform = "rotate(" + a + "deg)";
                d[g + (t ? "Origin" : "-origin")] = d.transformOrigin = 100 * b + "% " + l + "px";
                F(this.element, d)
            },
            getSpanCorrection: function(a, b, e) {
                this.xCorr = -a * e;
                this.yCorr = -b
            }
        });
        f(k.prototype, {
            html: function(a, b, e) {
                var d = this.createElement("span"),
                    l = d.element,
                    n = d.renderer,
                    k = n.isSVG,
                    r = function(a, c) {
                        q(["opacity", "visibility"], function(b) {
                            g(a, b + "Setter", function(a, b, d, m) {
                                a.call(this, b, d, m);
                                c[d] = b
                            })
                        })
                    };
                d.textSetter = function(a) {
                    a !== l.innerHTML && delete this.bBox;
                    l.innerHTML = this.textStr = a;
                    d.htmlUpdateTransform()
                };
                k && r(d, d.element.style);
                d.xSetter = d.ySetter = d.alignSetter = d.rotationSetter = function(a, c) {
                    "align" === c && (c = "textAlign");
                    d[c] = a;
                    d.htmlUpdateTransform()
                };
                d.attr({
                    text: a,
                    x: Math.round(b),
                    y: Math.round(e)
                }).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize,
                    position: "absolute"
                });
                l.style.whiteSpace = "nowrap";
                d.css = d.htmlCss;
                k && (d.add = function(a) {
                    var c, b = n.box.parentNode,
                        e = [];
                    if (this.parentGroup = a) {
                        if (c = a.div, !c) {
                            for (; a;) e.push(a), a = a.parentGroup;
                            q(e.reverse(), function(a) {
                                var v, m = C(a.element, "class");
                                m && (m = {
                                    className: m
                                });
                                c = a.div = a.div || B("div", m, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, c || b);
                                v = c.style;
                                f(a, {
                                    on: function() {
                                        d.on.apply({
                                                element: e[0].div
                                            },
                                            arguments);
                                        return a
                                    },
                                    translateXSetter: function(c, h) {
                                        v.left = c + "px";
                                        a[h] = c;
                                        a.doTransform = !0
                                    },
                                    translateYSetter: function(c, h) {
                                        v.top = c + "px";
                                        a[h] = c;
                                        a.doTransform = !0
                                    }
                                });
                                r(a, v)
                            })
                        }
                    } else c = b;
                    c.appendChild(l);
                    d.added = !0;
                    d.alignOnAdd && d.htmlUpdateTransform();
                    return d
                });
                return d
            }
        })
    })(L);
    (function(a) {
        var C, B, F = a.createElement,
            E = a.css,
            q = a.defined,
            f = a.deg2rad,
            t = a.discardElement,
            p = a.doc,
            y = a.each,
            u = a.erase,
            k = a.extend;
        C = a.extendClass;
        var e = a.isArray,
            g = a.isNumber,
            x = a.isObject,
            b = a.merge;
        B = a.noop;
        var l = a.pick,
            d = a.pInt,
            A = a.SVGElement,
            n = a.SVGRenderer,
            H = a.win;
        a.svg || (B = {
            docMode8: p && 8 === p.documentMode,
            init: function(a, b) {
                var c = ["\x3c", b, ' filled\x3d"f" stroked\x3d"f"'],
                    d = ["position: ", "absolute", ";"],
                    r = "div" === b;
                ("shape" === b || r) && d.push("left:0;top:0;width:1px;height:1px;");
                d.push("visibility: ", r ? "hidden" : "visible");
                c.push(' style\x3d"', d.join(""), '"/\x3e');
                b && (c = r || "span" === b || "img" === b ? c.join("") : a.prepVML(c), this.element = F(c));
                this.renderer = a
            },
            add: function(a) {
                var b = this.renderer,
                    c = this.element,
                    d = b.box,
                    r = a && a.inverted,
                    d = a ? a.element || a : d;
                a && (this.parentGroup = a);
                r && b.invertChild(c, d);
                d.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                this.className && this.attr("class", this.className);
                return this
            },
            updateTransform: A.prototype.htmlUpdateTransform,
            setSpanRotation: function() {
                var a = this.rotation,
                    b = Math.cos(a * f),
                    c = Math.sin(a * f);
                E(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11\x3d", b, ", M12\x3d", -c, ", M21\x3d", c, ", M22\x3d",
                        b, ", sizingMethod\x3d'auto expand')"
                    ].join("") : "none"
                })
            },
            getSpanCorrection: function(a, b, c, d, e) {
                var r = d ? Math.cos(d * f) : 1,
                    n = d ? Math.sin(d * f) : 0,
                    m = l(this.elemHeight, this.element.offsetHeight),
                    w;
                this.xCorr = 0 > r && -a;
                this.yCorr = 0 > n && -m;
                w = 0 > r * n;
                this.xCorr += n * b * (w ? 1 - c : c);
                this.yCorr -= r * b * (d ? w ? c : 1 - c : 1);
                e && "left" !== e && (this.xCorr -= a * c * (0 > r ? -1 : 1), d && (this.yCorr -= m * c * (0 > n ? -1 : 1)), E(this.element, {
                    textAlign: e
                }))
            },
            pathToVML: function(a) {
                for (var b = a.length, c = []; b--;) g(a[b]) ? c[b] = Math.round(10 * a[b]) - 5 : "Z" === a[b] ? c[b] = "x" :
                    (c[b] = a[b], !a.isArc || "wa" !== a[b] && "at" !== a[b] || (c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1)));
                return c.join(" ") || "x"
            },
            clip: function(a) {
                var b = this,
                    c;
                a ? (c = a.members, u(c, b), c.push(b), b.destroyClip = function() {
                    u(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: b.docMode8 ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: A.prototype.htmlCss,
            safeRemoveChild: function(a) {
                a.parentNode && t(a)
            },
            destroy: function() {
                this.destroyClip && this.destroyClip();
                return A.prototype.destroy.apply(this)
            },
            on: function(a, b) {
                this.element["on" + a] = function() {
                    var a = H.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function(a, b) {
                var c;
                a = a.split(/[ ,]/);
                c = a.length;
                if (9 === c || 11 === c) a[c - 4] = a[c - 2] = d(a[c - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function(a, b, c) {
                var r = [],
                    e, v = this.element,
                    n = this.renderer,
                    m, g = v.style,
                    h, z = v.path,
                    k, M, A, x;
                z && "string" !== typeof z.value && (z = "x");
                M = z;
                if (a) {
                    A = l(a.width, 3);
                    x = (a.opacity || .15) / A;
                    for (e = 1; 3 >= e; e++) k = 2 * A + 1 - 2 * e, c && (M = this.cutOffPath(z.value, k + .5)), h = ['\x3cshape isShadow\x3d"true" strokeweight\x3d"',
                        k, '" filled\x3d"false" path\x3d"', M, '" coordsize\x3d"10 10" style\x3d"', v.style.cssText, '" /\x3e'
                    ], m = F(n.prepVML(h), null, {
                        left: d(g.left) + l(a.offsetX, 1),
                        top: d(g.top) + l(a.offsetY, 1)
                    }), c && (m.cutOff = k + 1), h = ['\x3cstroke color\x3d"', a.color || "#000000", '" opacity\x3d"', x * e, '"/\x3e'], F(n.prepVML(h), null, null, m), b ? b.element.appendChild(m) : v.parentNode.insertBefore(m, v), r.push(m);
                    this.shadows = r
                }
                return this
            },
            updateShadows: B,
            setAttr: function(a, b) {
                this.docMode8 ? this.element[a] = b : this.element.setAttribute(a, b)
            },
            classSetter: function(a) {
                (this.added ? this.element : this).className = a
            },
            dashstyleSetter: function(a, b, c) {
                (c.getElementsByTagName("stroke")[0] || F(this.renderer.prepVML(["\x3cstroke/\x3e"]), null, null, c))[b] = a || "solid";
                this[b] = a
            },
            dSetter: function(a, b, c) {
                var d = this.shadows;
                a = a || [];
                this.d = a.join && a.join(" ");
                c.path = a = this.pathToVML(a);
                if (d)
                    for (c = d.length; c--;) d[c].path = d[c].cutOff ? this.cutOffPath(a, d[c].cutOff) : a;
                this.setAttr(b, a)
            },
            fillSetter: function(a, b, c) {
                var d = c.nodeName;
                "SPAN" === d ? c.style.color = a : "IMG" !==
                    d && (c.filled = "none" !== a, this.setAttr("fillcolor", this.renderer.color(a, c, b, this)))
            },
            "fill-opacitySetter": function(a, b, c) {
                F(this.renderer.prepVML(["\x3c", b.split("-")[0], ' opacity\x3d"', a, '"/\x3e']), null, null, c)
            },
            opacitySetter: B,
            rotationSetter: function(a, b, c) {
                c = c.style;
                this[b] = c[b] = a;
                c.left = -Math.round(Math.sin(a * f) + 1) + "px";
                c.top = Math.round(Math.cos(a * f)) + "px"
            },
            strokeSetter: function(a, b, c) {
                this.setAttr("strokecolor", this.renderer.color(a, c, b, this))
            },
            "stroke-widthSetter": function(a, b, c) {
                c.stroked = !!a;
                this[b] = a;
                g(a) && (a += "px");
                this.setAttr("strokeweight", a)
            },
            titleSetter: function(a, b) {
                this.setAttr(b, a)
            },
            visibilitySetter: function(a, b, c) {
                "inherit" === a && (a = "visible");
                this.shadows && y(this.shadows, function(c) {
                    c.style[b] = a
                });
                "DIV" === c.nodeName && (a = "hidden" === a ? "-999em" : 0, this.docMode8 || (c.style[b] = a ? "visible" : "hidden"), b = "top");
                c.style[b] = a
            },
            xSetter: function(a, b, c) {
                this[b] = a;
                "x" === b ? b = "left" : "y" === b && (b = "top");
                this.updateClipping ? (this[b] = a, this.updateClipping()) : c.style[b] = a
            },
            zIndexSetter: function(a,
                b, c) {
                c.style[b] = a
            }
        }, B["stroke-opacitySetter"] = B["fill-opacitySetter"], a.VMLElement = B = C(A, B), B.prototype.ySetter = B.prototype.widthSetter = B.prototype.heightSetter = B.prototype.xSetter, B = {
            Element: B,
            isIE8: -1 < H.navigator.userAgent.indexOf("MSIE 8.0"),
            init: function(a, b, c) {
                var d, e;
                this.alignedObjects = [];
                d = this.createElement("div").css({
                    position: "relative"
                });
                e = d.element;
                a.appendChild(d.element);
                this.isVML = !0;
                this.box = e;
                this.boxWrapper = d;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(b,
                    c, !1);
                if (!p.namespaces.hcv) {
                    p.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        p.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (v) {
                        p.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function() {
                return !this.box.offsetWidth
            },
            clipRect: function(a, b, c, d) {
                var e = this.createElement(),
                    v = x(a);
                return k(e, {
                    members: [],
                    count: 0,
                    left: (v ? a.x : a) + 1,
                    top: (v ? a.y : b) + 1,
                    width: (v ? a.width : c) - 1,
                    height: (v ? a.height : d) - 1,
                    getCSS: function(a) {
                        var c = a.element,
                            b = c.nodeName,
                            h = a.inverted,
                            z = this.top - ("shape" === b ? c.offsetTop : 0),
                            d = this.left,
                            c = d + this.width,
                            v = z + this.height,
                            z = {
                                clip: "rect(" + Math.round(h ? d : z) + "px," + Math.round(h ? v : c) + "px," + Math.round(h ? c : v) + "px," + Math.round(h ? z : d) + "px)"
                            };
                        !h && a.docMode8 && "DIV" === b && k(z, {
                            width: c + "px",
                            height: v + "px"
                        });
                        return z
                    },
                    updateClipping: function() {
                        y(e.members, function(a) {
                            a.element && a.css(e.getCSS(a))
                        })
                    }
                })
            },
            color: function(b,
                d, c, e) {
                var r = this,
                    v, n = /^rgba/,
                    m, l, h = "none";
                b && b.linearGradient ? l = "gradient" : b && b.radialGradient && (l = "pattern");
                if (l) {
                    var z, g, w = b.linearGradient || b.radialGradient,
                        k, A, x, G, H, f = "";
                    b = b.stops;
                    var J, p = [],
                        u = function() {
                            m = ['\x3cfill colors\x3d"' + p.join(",") + '" opacity\x3d"', x, '" o:opacity2\x3d"', A, '" type\x3d"', l, '" ', f, 'focus\x3d"100%" method\x3d"any" /\x3e'];
                            F(r.prepVML(m), null, null, d)
                        };
                    k = b[0];
                    J = b[b.length - 1];
                    0 < k[0] && b.unshift([0, k[1]]);
                    1 > J[0] && b.push([1, J[1]]);
                    y(b, function(h, b) {
                        n.test(h[1]) ? (v = a.color(h[1]),
                            z = v.get("rgb"), g = v.get("a")) : (z = h[1], g = 1);
                        p.push(100 * h[0] + "% " + z);
                        b ? (x = g, G = z) : (A = g, H = z)
                    });
                    if ("fill" === c)
                        if ("gradient" === l) c = w.x1 || w[0] || 0, b = w.y1 || w[1] || 0, k = w.x2 || w[2] || 0, w = w.y2 || w[3] || 0, f = 'angle\x3d"' + (90 - 180 * Math.atan((w - b) / (k - c)) / Math.PI) + '"', u();
                        else {
                            var h = w.r,
                                q = 2 * h,
                                t = 2 * h,
                                B = w.cx,
                                C = w.cy,
                                E = d.radialReference,
                                S, h = function() {
                                    E && (S = e.getBBox(), B += (E[0] - S.x) / S.width - .5, C += (E[1] - S.y) / S.height - .5, q *= E[2] / S.width, t *= E[2] / S.height);
                                    f = 'src\x3d"' + a.getOptions().global.VMLRadialGradientURL + '" size\x3d"' + q + "," +
                                        t + '" origin\x3d"0.5,0.5" position\x3d"' + B + "," + C + '" color2\x3d"' + H + '" ';
                                    u()
                                };
                            e.added ? h() : e.onAdd = h;
                            h = G
                        }
                    else h = z
                } else n.test(b) && "IMG" !== d.tagName ? (v = a.color(b), e[c + "-opacitySetter"](v.get("a"), c, d), h = v.get("rgb")) : (h = d.getElementsByTagName(c), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = b);
                return h
            },
            prepVML: function(a) {
                var b = this.isIE8;
                a = a.join("");
                b ? (a = a.replace("/\x3e", ' xmlns\x3d"urn:schemas-microsoft-com:vml" /\x3e'), a = -1 === a.indexOf('style\x3d"') ? a.replace("/\x3e", ' style\x3d"display:inline-block;behavior:url(#default#VML);" /\x3e') :
                    a.replace('style\x3d"', 'style\x3d"display:inline-block;behavior:url(#default#VML);')) : a = a.replace("\x3c", "\x3chcv:");
                return a
            },
            text: n.prototype.html,
            path: function(a) {
                var b = {
                    coordsize: "10 10"
                };
                e(a) ? b.d = a : x(a) && k(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function(a, b, c) {
                var d = this.symbol("circle");
                x(a) && (c = a.r, b = a.y, a = a.x);
                d.isCircle = !0;
                d.r = c;
                return d.attr({
                    x: a,
                    y: b
                })
            },
            g: function(a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement("div").attr(b)
            },
            image: function(a, b, c, d, e) {
                var v = this.createElement("img").attr({
                    src: a
                });
                1 < arguments.length && v.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e
                });
                return v
            },
            createElement: function(a) {
                return "rect" === a ? this.symbol(a) : n.prototype.createElement.call(this, a)
            },
            invertChild: function(a, b) {
                var c = this;
                b = b.style;
                var e = "IMG" === a.tagName && a.style;
                E(a, {
                    flip: "x",
                    left: d(b.width) - (e ? d(e.top) : 1),
                    top: d(b.height) - (e ? d(e.left) : 1),
                    rotation: -90
                });
                y(a.childNodes, function(b) {
                    c.invertChild(b, a)
                })
            },
            symbols: {
                arc: function(a, b, c, d, e) {
                    var v = e.start,
                        n = e.end,
                        m = e.r || c || d;
                    c = e.innerR;
                    d = Math.cos(v);
                    var l = Math.sin(v),
                        h = Math.cos(n),
                        z = Math.sin(n);
                    if (0 === n - v) return ["x"];
                    v = ["wa", a - m, b - m, a + m, b + m, a + m * d, b + m * l, a + m * h, b + m * z];
                    e.open && !c && v.push("e", "M", a, b);
                    v.push("at", a - c, b - c, a + c, b + c, a + c * h, b + c * z, a + c * d, b + c * l, "x", "e");
                    v.isArc = !0;
                    return v
                },
                circle: function(a, b, c, d, e) {
                    e && q(e.r) && (c = d = 2 * e.r);
                    e && e.isCircle && (a -= c / 2, b -= d / 2);
                    return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
                },
                rect: function(a, b, c, d, e) {
                    return n.prototype.symbols[q(e) && e.r ? "callout" : "square"].call(0, a, b,
                        c, d, e)
                }
            }
        }, a.VMLRenderer = C = function() {
            this.init.apply(this, arguments)
        }, C.prototype = b(n.prototype, B), a.Renderer = C);
        n.prototype.measureSpanWidth = function(a, b) {
            var c = p.createElement("span");
            a = p.createTextNode(a);
            c.appendChild(a);
            E(c, b);
            this.box.appendChild(c);
            b = c.offsetWidth;
            t(c);
            return b
        }
    })(L);
    (function(a) {
        function C() {
            var f = a.defaultOptions.global,
                u = p.moment;
            if (f.timezone) {
                if (u) return function(a) {
                    return -u.tz(a, f.timezone).utcOffset()
                };
                a.error(25)
            }
            return f.useUTC && f.getTimezoneOffset
        }

        function B() {
            var f =
                a.defaultOptions.global,
                u, k = f.useUTC,
                e = k ? "getUTC" : "get",
                g = k ? "setUTC" : "set";
            a.Date = u = f.Date || p.Date;
            u.hcTimezoneOffset = k && f.timezoneOffset;
            u.hcGetTimezoneOffset = C();
            u.hcMakeTime = function(a, b, e, d, g, n) {
                var l;
                k ? (l = u.UTC.apply(0, arguments), l += q(l)) : l = (new u(a, b, t(e, 1), t(d, 0), t(g, 0), t(n, 0))).getTime();
                return l
            };
            E("Minutes Hours Day Date Month FullYear".split(" "), function(a) {
                u["hcGet" + a] = e + a
            });
            E("Milliseconds Seconds Minutes Hours Date Month FullYear".split(" "), function(a) {
                u["hcSet" + a] = g + a
            })
        }
        var F = a.color,
            E = a.each,
            q = a.getTZOffset,
            f = a.merge,
            t = a.pick,
            p = a.win;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {
                useUTC: !0,
                VMLRadialGradientURL: "http://code.highcharts.com/5.0.11/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: F("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.fritz-gruppe.de",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Fritz-Gruppe.de"
            }
        };
        a.setOptions = function(p) {
            a.defaultOptions = f(!0, a.defaultOptions, p);
            B();
            return a.defaultOptions
        };
        a.getOptions = function() {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        B()
    })(L);
    (function(a) {
        var C = a.correctFloat,
            B = a.defined,
            F = a.destroyObjectProperties,
            E = a.isNumber,
            q = a.merge,
            f = a.pick,
            t = a.deg2rad;
        a.Tick = function(a, f, u, k) {
            this.axis = a;
            this.pos =
                f;
            this.type = u || "";
            this.isNew = !0;
            u || k || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function() {
                var a = this.axis,
                    t = a.options,
                    u = a.chart,
                    k = a.categories,
                    e = a.names,
                    g = this.pos,
                    x = t.labels,
                    b = a.tickPositions,
                    l = g === b[0],
                    d = g === b[b.length - 1],
                    e = k ? f(k[g], e[g], g) : g,
                    k = this.label,
                    b = b.info,
                    A;
                a.isDatetimeAxis && b && (A = t.dateTimeLabelFormats[b.higherRanks[g] || b.unitName]);
                this.isFirst = l;
                this.isLast = d;
                t = a.labelFormatter.call({
                    axis: a,
                    chart: u,
                    isFirst: l,
                    isLast: d,
                    dateTimeLabelFormat: A,
                    value: a.isLog ? C(a.lin2log(e)) : e
                });
                B(k) ? k &&
                    k.attr({
                        text: t
                    }) : (this.labelLength = (this.label = k = B(t) && x.enabled ? u.renderer.text(t, 0, 0, x.useHTML).css(q(x.style)).add(a.labelGroup) : null) && k.getBBox().width, this.rotation = 0)
            },
            getLabelSize: function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            },
            handleOverflow: function(a) {
                var p = this.axis,
                    u = a.x,
                    k = p.chart.chartWidth,
                    e = p.chart.spacing,
                    g = f(p.labelLeft, Math.min(p.pos, e[3])),
                    e = f(p.labelRight, Math.max(p.pos + p.len, k - e[1])),
                    x = this.label,
                    b = this.rotation,
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[p.labelAlign],
                    d = x.getBBox().width,
                    A = p.getSlotWidth(),
                    n = A,
                    H = 1,
                    r, J = {};
                if (b) 0 > b && u - l * d < g ? r = Math.round(u / Math.cos(b * t) - g) : 0 < b && u + l * d > e && (r = Math.round((k - u) / Math.cos(b * t)));
                else if (k = u + (1 - l) * d, u - l * d < g ? n = a.x + n * (1 - l) - g : k > e && (n = e - a.x + n * l, H = -1), n = Math.min(A, n), n < A && "center" === p.labelAlign && (a.x += H * (A - n - l * (A - Math.min(d, n)))), d > n || p.autoRotation && (x.styles || {}).width) r = n;
                r && (J.width = r, (p.options.labels.style || {}).textOverflow || (J.textOverflow = "ellipsis"), x.css(J))
            },
            getPosition: function(a, f, u, k) {
                var e = this.axis,
                    g = e.chart,
                    x = k && g.oldChartHeight || g.chartHeight;
                return {
                    x: a ? e.translate(f + u, null, null, k) + e.transB : e.left + e.offset + (e.opposite ? (k && g.oldChartWidth || g.chartWidth) - e.right - e.left : 0),
                    y: a ? x - e.bottom + e.offset - (e.opposite ? e.height : 0) : x - e.translate(f + u, null, null, k) - e.transB
                }
            },
            getLabelPosition: function(a, f, u, k, e, g, x, b) {
                var l = this.axis,
                    d = l.transA,
                    A = l.reversed,
                    n = l.staggerLines,
                    H = l.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    r = e.y;
                B(r) || (r = 0 === l.side ? u.rotation ? -8 : -u.getBBox().height : 2 === l.side ? H.y + 8 : Math.cos(u.rotation * t) * (H.y - u.getBBox(!1,
                    0).height / 2));
                a = a + e.x + H.x - (g && k ? g * d * (A ? -1 : 1) : 0);
                f = f + r - (g && !k ? g * d * (A ? 1 : -1) : 0);
                n && (u = x / (b || 1) % n, l.opposite && (u = n - u - 1), f += l.labelOffset / n * u);
                return {
                    x: a,
                    y: Math.round(f)
                }
            },
            getMarkPath: function(a, f, u, k, e, g) {
                return g.crispLine(["M", a, f, "L", a + (e ? 0 : -u), f + (e ? u : 0)], k)
            },
            renderGridLine: function(a, f, u) {
                var k = this.axis,
                    e = k.options,
                    g = this.gridLine,
                    x = {},
                    b = this.pos,
                    l = this.type,
                    d = k.tickmarkOffset,
                    A = k.chart.renderer,
                    n = l ? l + "Grid" : "grid",
                    H = e[n + "LineWidth"],
                    r = e[n + "LineColor"],
                    e = e[n + "LineDashStyle"];
                g || (x.stroke = r, x["stroke-width"] =
                    H, e && (x.dashstyle = e), l || (x.zIndex = 1), a && (x.opacity = 0), this.gridLine = g = A.path().attr(x).addClass("highcharts-" + (l ? l + "-" : "") + "grid-line").add(k.gridGroup));
                if (!a && g && (a = k.getPlotLinePath(b + d, g.strokeWidth() * u, a, !0))) g[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: f
                })
            },
            renderMark: function(a, t, u) {
                var k = this.axis,
                    e = k.options,
                    g = k.chart.renderer,
                    x = this.type,
                    b = x ? x + "Tick" : "tick",
                    l = k.tickSize(b),
                    d = this.mark,
                    A = !d,
                    n = a.x;
                a = a.y;
                var H = f(e[b + "Width"], !x && k.isXAxis ? 1 : 0),
                    e = e[b + "Color"];
                l && (k.opposite && (l[0] = -l[0]), A &&
                    (this.mark = d = g.path().addClass("highcharts-" + (x ? x + "-" : "") + "tick").add(k.axisGroup), d.attr({
                        stroke: e,
                        "stroke-width": H
                    })), d[A ? "attr" : "animate"]({
                        d: this.getMarkPath(n, a, l[0], d.strokeWidth() * u, k.horiz, g),
                        opacity: t
                    }))
            },
            renderLabel: function(a, t, u, k) {
                var e = this.axis,
                    g = e.horiz,
                    x = e.options,
                    b = this.label,
                    l = x.labels,
                    d = l.step,
                    A = e.tickmarkOffset,
                    n = !0,
                    H = a.x;
                a = a.y;
                b && E(H) && (b.xy = a = this.getLabelPosition(H, a, b, g, l, A, k, d), this.isFirst && !this.isLast && !f(x.showFirstLabel, 1) || this.isLast && !this.isFirst && !f(x.showLastLabel,
                    1) ? n = !1 : !g || e.isRadial || l.step || l.rotation || t || 0 === u || this.handleOverflow(a), d && k % d && (n = !1), n && E(a.y) ? (a.opacity = u, b[this.isNew ? "attr" : "animate"](a)) : b.attr("y", -9999), this.isNew = !1)
            },
            render: function(a, t, u) {
                var k = this.axis,
                    e = k.horiz,
                    g = this.getPosition(e, this.pos, k.tickmarkOffset, t),
                    x = g.x,
                    b = g.y,
                    k = e && x === k.pos + k.len || !e && b === k.pos ? -1 : 1;
                u = f(u, 1);
                this.isActive = !0;
                this.renderGridLine(t, u, k);
                this.renderMark(g, u, k);
                this.renderLabel(g, t, u, a)
            },
            destroy: function() {
                F(this, this.axis)
            }
        }
    })(L);
    var T = function(a) {
        var C =
            a.addEvent,
            B = a.animObject,
            F = a.arrayMax,
            E = a.arrayMin,
            q = a.color,
            f = a.correctFloat,
            t = a.defaultOptions,
            p = a.defined,
            y = a.deg2rad,
            u = a.destroyObjectProperties,
            k = a.each,
            e = a.extend,
            g = a.fireEvent,
            x = a.format,
            b = a.getMagnitude,
            l = a.grep,
            d = a.inArray,
            A = a.isArray,
            n = a.isNumber,
            H = a.isString,
            r = a.merge,
            J = a.normalizeTickInterval,
            c = a.objectEach,
            w = a.pick,
            K = a.removeEvent,
            v = a.splat,
            D = a.syncTimeout,
            m = a.Tick,
            I = function() {
                this.init.apply(this, arguments)
            };
        a.extend(I.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    },
                    x: 0
                },
                minPadding: .01,
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return a.numberFormat(this.total, -1)
                    },
                    style: {
                        fontSize: "11px",
                        fontWeight: "bold",
                        color: "#000000",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                title: {
                    rotation: 0
                }
            },
            init: function(a, b) {
                var h = b.isX,
                    z = this;
                z.chart = a;
                z.horiz = a.inverted ? !h : h;
                z.isXAxis = h;
                z.coll = z.coll || (h ? "xAxis" : "yAxis");
                z.opposite = b.opposite;
                z.side = b.side || (z.horiz ? z.opposite ? 0 : 2 : z.opposite ? 1 : 3);
                z.setOptions(b);
                var m = this.options,
                    e = m.type;
                z.labelFormatter = m.labels.formatter || z.defaultLabelFormatter;
                z.userOptions = b;
                z.minPixelPadding = 0;
                z.reversed = m.reversed;
                z.visible = !1 !== m.visible;
                z.zoomEnabled = !1 !== m.zoomEnabled;
                z.hasNames = "category" === e || !0 === m.categories;
                z.categories = m.categories || z.hasNames;
                z.names = z.names || [];
                z.plotLinesAndBandsGroups = {};
                z.isLog = "logarithmic" === e;
                z.isDatetimeAxis = "datetime" === e;
                z.positiveValuesOnly = z.isLog && !z.allowNegativeLog;
                z.isLinked = p(m.linkedTo);
                z.ticks = {};
                z.labelEdge = [];
                z.minorTicks = {};
                z.plotLinesAndBands = [];
                z.alternateBands = {};
                z.len = 0;
                z.minRange = z.userMinRange = m.minRange ||
                    m.maxZoom;
                z.range = m.range;
                z.offset = m.offset || 0;
                z.stacks = {};
                z.oldStacks = {};
                z.stacksTouched = 0;
                z.max = null;
                z.min = null;
                z.crosshair = w(m.crosshair, v(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                b = z.options.events; - 1 === d(z, a.axes) && (h ? a.axes.splice(a.xAxis.length, 0, z) : a.axes.push(z), a[z.coll].push(z));
                z.series = z.series || [];
                a.inverted && h && void 0 === z.reversed && (z.reversed = !0);
                c(b, function(a, h) {
                    C(z, h, a)
                });
                z.lin2log = m.linearToLogConverter || z.lin2log;
                z.isLog && (z.val2lin = z.log2lin, z.lin2val = z.lin2log)
            },
            setOptions: function(a) {
                this.options =
                    r(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], r(t[this.coll], a))
            },
            defaultLabelFormatter: function() {
                var h = this.axis,
                    b = this.value,
                    c = h.categories,
                    d = this.dateTimeLabelFormat,
                    m = t.lang,
                    e = m.numericSymbols,
                    m = m.numericSymbolMagnitude || 1E3,
                    v = e && e.length,
                    n, l = h.options.labels.format,
                    h = h.isLog ? Math.abs(b) : h.tickInterval;
                if (l) n = x(l, this);
                else if (c) n = b;
                else if (d) n =
                    a.dateFormat(d, b);
                else if (v && 1E3 <= h)
                    for (; v-- && void 0 === n;) c = Math.pow(m, v + 1), h >= c && 0 === 10 * b % c && null !== e[v] && 0 !== b && (n = a.numberFormat(b / c, -1) + e[v]);
                void 0 === n && (n = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return n
            },
            getSeriesExtremes: function() {
                var a = this,
                    b = a.chart;
                a.hasVisibleSeries = !1;
                a.dataMin = a.dataMax = a.threshold = null;
                a.softThreshold = !a.isXAxis;
                a.buildStacks && a.buildStacks();
                k(a.series, function(h) {
                    if (h.visible || !b.options.chart.ignoreHiddenSeries) {
                        var c = h.options,
                            z = c.threshold,
                            d;
                        a.hasVisibleSeries = !0;
                        a.positiveValuesOnly && 0 >= z && (z = null);
                        if (a.isXAxis) c = h.xData, c.length && (h = E(c), n(h) || h instanceof Date || (c = l(c, function(a) {
                            return n(a)
                        }), h = E(c)), a.dataMin = Math.min(w(a.dataMin, c[0]), h), a.dataMax = Math.max(w(a.dataMax, c[0]), F(c)));
                        else if (h.getExtremes(), d = h.dataMax, h = h.dataMin, p(h) && p(d) && (a.dataMin = Math.min(w(a.dataMin, h), h), a.dataMax = Math.max(w(a.dataMax, d), d)), p(z) && (a.threshold = z), !c.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                    }
                })
            },
            translate: function(a, b, c, d, m,
                e) {
                var h = this.linkedParent || this,
                    z = 1,
                    v = 0,
                    l = d ? h.oldTransA : h.transA;
                d = d ? h.oldMin : h.min;
                var g = h.minPixelPadding;
                m = (h.isOrdinal || h.isBroken || h.isLog && m) && h.lin2val;
                l || (l = h.transA);
                c && (z *= -1, v = h.len);
                h.reversed && (z *= -1, v -= z * (h.sector || h.len));
                b ? (a = (a * z + v - g) / l + d, m && (a = h.lin2val(a))) : (m && (a = h.val2lin(a)), a = z * (a - d) * l + v + z * g + (n(e) ? l * e : 0));
                return a
            },
            toPixels: function(a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function(a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz,
                    null, !0)
            },
            getPlotLinePath: function(a, b, c, d, m) {
                var h = this.chart,
                    z = this.left,
                    e = this.top,
                    v, l, g = c && h.oldChartHeight || h.chartHeight,
                    r = c && h.oldChartWidth || h.chartWidth,
                    D;
                v = this.transB;
                var k = function(a, h, b) {
                    if (a < h || a > b) d ? a = Math.min(Math.max(h, a), b) : D = !0;
                    return a
                };
                m = w(m, this.translate(a, null, null, c));
                a = c = Math.round(m + v);
                v = l = Math.round(g - m - v);
                n(m) ? this.horiz ? (v = e, l = g - this.bottom, a = c = k(a, z, z + this.width)) : (a = z, c = r - this.right, v = l = k(v, e, e + this.height)) : D = !0;
                return D && !d ? null : h.renderer.crispLine(["M", a, v, "L",
                    c, l
                ], b || 1)
            },
            getLinearTickPositions: function(a, b, c) {
                var h, z = f(Math.floor(b / a) * a);
                c = f(Math.ceil(c / a) * a);
                var d = [];
                if (this.single) return [b];
                for (b = z; b <= c;) {
                    d.push(b);
                    b = f(b + a);
                    if (b === h) break;
                    h = b
                }
                return d
            },
            getMinorTickPositions: function() {
                var a = this,
                    b = a.options,
                    c = a.tickPositions,
                    d = a.minorTickInterval,
                    m = [],
                    v = a.pointRangePadding || 0,
                    e = a.min - v,
                    v = a.max + v,
                    n = v - e;
                if (n && n / d < a.len / 3)
                    if (a.isLog) k(this.paddedTicks, function(h, b, c) {
                        b && m.push.apply(m, a.getLogTickPositions(d, c[b - 1], c[b], !0))
                    });
                    else if (a.isDatetimeAxis &&
                    "auto" === b.minorTickInterval) m = m.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), e, v, b.startOfWeek));
                else
                    for (b = e + (c[0] - e) % d; b <= v && b !== m[0]; b += d) m.push(b);
                0 !== m.length && a.trimTicks(m);
                return m
            },
            adjustForMinRange: function() {
                var a = this.options,
                    b = this.min,
                    c = this.max,
                    d, m = this.dataMax - this.dataMin >= this.minRange,
                    v, e, n, l, g, r;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (p(a.min) || p(a.max) ? this.minRange = null : (k(this.series, function(a) {
                    l = a.xData;
                    for (e = g = a.xIncrement ? 1 : l.length - 1; 0 < e; e--)
                        if (n = l[e] -
                            l[e - 1], void 0 === v || n < v) v = n
                }), this.minRange = Math.min(5 * v, this.dataMax - this.dataMin)));
                c - b < this.minRange && (r = this.minRange, d = (r - c + b) / 2, d = [b - d, w(a.min, b - d)], m && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = F(d), c = [b + r, w(a.max, b + r)], m && (c[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), c = E(c), c - b < r && (d[0] = c - r, d[1] = w(a.min, c - r), b = F(d)));
                this.min = b;
                this.max = c
            },
            getClosest: function() {
                var a;
                this.categories ? a = 1 : k(this.series, function(h) {
                    var b = h.closestPointRange,
                        c = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
                    !h.noSharedTooltip && p(b) && c && (a = p(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function(a) {
                var h = A(this.categories),
                    b = h ? this.categories : this.names,
                    c = a.options.x,
                    m;
                a.series.requireSorting = !1;
                p(c) || (c = !1 === this.options.uniqueNames ? a.series.autoIncrement() : d(a.name, b)); - 1 === c ? h || (m = b.length) : m = c;
                void 0 !== m && (this.names[m] = a.name);
                return m
            },
            updateNames: function() {
                var a = this;
                0 < this.names.length && (this.names.length = 0, this.minRange = void 0, k(this.series || [], function(h) {
                    h.xIncrement = null;
                    if (!h.points || h.isDirtyData) h.processData(),
                        h.generatePoints();
                    k(h.points, function(b, c) {
                        var d;
                        b.options && (d = a.nameToX(b), void 0 !== d && d !== b.x && (b.x = d, h.xData[c] = d))
                    })
                }))
            },
            setAxisTranslation: function(a) {
                var h = this,
                    b = h.max - h.min,
                    c = h.axisPointRange || 0,
                    d, m = 0,
                    v = 0,
                    e = h.linkedParent,
                    n = !!h.categories,
                    l = h.transA,
                    g = h.isXAxis;
                if (g || n || c) d = h.getClosest(), e ? (m = e.minPointOffset, v = e.pointRangePadding) : k(h.series, function(a) {
                    var b = n ? 1 : g ? w(a.options.pointRange, d, 0) : h.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    c = Math.max(c, b);
                    h.single || (m = Math.max(m, H(a) ? 0 :
                        b / 2), v = Math.max(v, "on" === a ? 0 : b))
                }), e = h.ordinalSlope && d ? h.ordinalSlope / d : 1, h.minPointOffset = m *= e, h.pointRangePadding = v *= e, h.pointRange = Math.min(c, b), g && (h.closestPointRange = d);
                a && (h.oldTransA = l);
                h.translationSlope = h.transA = l = h.options.staticScale || h.len / (b + v || 1);
                h.transB = h.horiz ? h.left : h.bottom;
                h.minPixelPadding = l * m
            },
            minFromRange: function() {
                return this.max - this.range
            },
            setTickInterval: function(h) {
                var c = this,
                    d = c.chart,
                    m = c.options,
                    v = c.isLog,
                    e = c.log2lin,
                    l = c.isDatetimeAxis,
                    r = c.isXAxis,
                    D = c.isLinked,
                    A = m.maxPadding,
                    I = m.minPadding,
                    x = m.tickInterval,
                    H = m.tickPixelInterval,
                    K = c.categories,
                    u = c.threshold,
                    t = c.softThreshold,
                    q, y, B, C;
                l || K || D || this.getTickAmount();
                B = w(c.userMin, m.min);
                C = w(c.userMax, m.max);
                D ? (c.linkedParent = d[c.coll][m.linkedTo], d = c.linkedParent.getExtremes(), c.min = w(d.min, d.dataMin), c.max = w(d.max, d.dataMax), m.type !== c.linkedParent.options.type && a.error(11, 1)) : (!t && p(u) && (c.dataMin >= u ? (q = u, I = 0) : c.dataMax <= u && (y = u, A = 0)), c.min = w(B, q, c.dataMin), c.max = w(C, y, c.dataMax));
                v && (c.positiveValuesOnly && !h && 0 >= Math.min(c.min,
                    w(c.dataMin, c.min)) && a.error(10, 1), c.min = f(e(c.min), 15), c.max = f(e(c.max), 15));
                c.range && p(c.max) && (c.userMin = c.min = B = Math.max(c.min, c.minFromRange()), c.userMax = C = c.max, c.range = null);
                g(c, "foundExtremes");
                c.beforePadding && c.beforePadding();
                c.adjustForMinRange();
                !(K || c.axisPointRange || c.usePercentage || D) && p(c.min) && p(c.max) && (e = c.max - c.min) && (!p(B) && I && (c.min -= e * I), !p(C) && A && (c.max += e * A));
                n(m.softMin) && (c.min = Math.min(c.min, m.softMin));
                n(m.softMax) && (c.max = Math.max(c.max, m.softMax));
                n(m.floor) && (c.min =
                    Math.max(c.min, m.floor));
                n(m.ceiling) && (c.max = Math.min(c.max, m.ceiling));
                t && p(c.dataMin) && (u = u || 0, !p(B) && c.min < u && c.dataMin >= u ? c.min = u : !p(C) && c.max > u && c.dataMax <= u && (c.max = u));
                c.tickInterval = c.min === c.max || void 0 === c.min || void 0 === c.max ? 1 : D && !x && H === c.linkedParent.options.tickPixelInterval ? x = c.linkedParent.tickInterval : w(x, this.tickAmount ? (c.max - c.min) / Math.max(this.tickAmount - 1, 1) : void 0, K ? 1 : (c.max - c.min) * H / Math.max(c.len, H));
                r && !h && k(c.series, function(a) {
                    a.processData(c.min !== c.oldMin || c.max !==
                        c.oldMax)
                });
                c.setAxisTranslation(!0);
                c.beforeSetTickPositions && c.beforeSetTickPositions();
                c.postProcessTickInterval && (c.tickInterval = c.postProcessTickInterval(c.tickInterval));
                c.pointRange && !x && (c.tickInterval = Math.max(c.pointRange, c.tickInterval));
                h = w(m.minTickInterval, c.isDatetimeAxis && c.closestPointRange);
                !x && c.tickInterval < h && (c.tickInterval = h);
                l || v || x || (c.tickInterval = J(c.tickInterval, null, b(c.tickInterval), w(m.allowDecimals, !(.5 < c.tickInterval && 5 > c.tickInterval && 1E3 < c.max && 9999 > c.max)), !!this.tickAmount));
                this.tickAmount || (c.tickInterval = c.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function() {
                var a = this.options,
                    c, b = a.tickPositions,
                    d = a.tickPositioner,
                    m = a.startOnTick,
                    e = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === a.minorTickInterval && this.tickInterval ? this.tickInterval / 5 : a.minorTickInterval;
                this.single = this.min === this.max && p(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = c = b && b.slice();
                !c && (c = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), c.length > this.len && (c = [c[0], c.pop()]), this.tickPositions = c, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = c = d);
                this.paddedTicks = c.slice(0);
                this.trimTicks(c, m, e);
                this.isLinked || (this.single && (this.min -= .5, this.max += .5), b || d || this.adjustTickAmount())
            },
            trimTicks: function(a, c, b) {
                var h = a[0],
                    d = a[a.length - 1],
                    m = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (c && -Infinity !== h) this.min = h;
                    else
                        for (; this.min - m > a[0];) a.shift();
                    if (b) this.max = d;
                    else
                        for (; this.max + m < a[a.length - 1];) a.pop();
                    0 === a.length && p(h) && a.push((d + h) / 2)
                }
            },
            alignToOthers: function() {
                var a = {},
                    c, b = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === b.alignTicks || this.isLog || k(this.chart[this.coll],
                    function(h) {
                        var b = h.options,
                            b = [h.horiz ? b.left : b.top, b.width, b.height, b.pane].join();
                        h.series.length && (a[b] ? c = !0 : a[b] = 1)
                    });
                return c
            },
            getTickAmount: function() {
                var a = this.options,
                    c = a.tickAmount,
                    b = a.tickPixelInterval;
                !p(a.tickInterval) && this.len < b && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (c = 2);
                !c && this.alignToOthers() && (c = Math.ceil(this.len / b) + 1);
                4 > c && (this.finalTickAmt = c, c = 5);
                this.tickAmount = c
            },
            adjustTickAmount: function() {
                var a = this.tickInterval,
                    c = this.tickPositions,
                    b = this.tickAmount,
                    d = this.finalTickAmt,
                    m = c && c.length;
                if (m < b) {
                    for (; c.length < b;) c.push(f(c[c.length - 1] + a));
                    this.transA *= (m - 1) / (b - 1);
                    this.max = c[c.length - 1]
                } else m > b && (this.tickInterval *= 2, this.setTickPositions());
                if (p(d)) {
                    for (a = b = c.length; a--;)(3 === d && 1 === a % 2 || 2 >= d && 0 < a && a < b - 1) && c.splice(a, 1);
                    this.finalTickAmt = void 0
                }
            },
            setScale: function() {
                var a, c;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                c = this.len !== this.oldAxisLength;
                k(this.series, function(c) {
                    if (c.isDirtyData || c.isDirty ||
                        c.xAxis.isDirty) a = !0
                });
                c || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = c || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks()
            },
            setExtremes: function(a, c, b, d, m) {
                var h = this,
                    v = h.chart;
                b = w(b, !0);
                k(h.series,
                    function(a) {
                        delete a.kdTree
                    });
                m = e(m, {
                    min: a,
                    max: c
                });
                g(h, "setExtremes", m, function() {
                    h.userMin = a;
                    h.userMax = c;
                    h.eventArgs = m;
                    b && v.redraw(d)
                })
            },
            zoom: function(a, c) {
                var h = this.dataMin,
                    b = this.dataMax,
                    d = this.options,
                    m = Math.min(h, w(d.min, h)),
                    d = Math.max(b, w(d.max, b));
                if (a !== this.min || c !== this.max) this.allowZoomOutside || (p(h) && (a < m && (a = m), a > d && (a = d)), p(b) && (c < m && (c = m), c > d && (c = d))), this.displayBtn = void 0 !== a || void 0 !== c, this.setExtremes(a, c, !1, void 0, {
                    trigger: "zoom"
                });
                return !0
            },
            setAxisSize: function() {
                var a = this.chart,
                    c = this.options,
                    b = c.offsets || [0, 0, 0, 0],
                    d = this.horiz,
                    m = w(c.width, a.plotWidth - b[3] + b[1]),
                    e = w(c.height, a.plotHeight - b[0] + b[2]),
                    v = w(c.top, a.plotTop + b[0]),
                    c = w(c.left, a.plotLeft + b[3]),
                    b = /%$/;
                b.test(e) && (e = Math.round(parseFloat(e) / 100 * a.plotHeight));
                b.test(v) && (v = Math.round(parseFloat(v) / 100 * a.plotHeight + a.plotTop));
                this.left = c;
                this.top = v;
                this.width = m;
                this.height = e;
                this.bottom = a.chartHeight - e - v;
                this.right = a.chartWidth - m - c;
                this.len = Math.max(d ? m : e, 0);
                this.pos = d ? c : v
            },
            getExtremes: function() {
                var a = this.isLog,
                    c = this.lin2log;
                return {
                    min: a ? f(c(this.min)) : this.min,
                    max: a ? f(c(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(a) {
                var c = this.isLog,
                    b = this.lin2log,
                    h = c ? b(this.min) : this.min,
                    c = c ? b(this.max) : this.max;
                null === a ? a = h : h > a ? a = h : c < a && (a = c);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function(a) {
                a = (w(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function(a) {
                var c = this.options,
                    b = c[a +
                        "Length"],
                    h = w(c[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (h && b) return "inside" === c[a + "Position"] && (b = -b), [b, h]
            },
            labelMetrics: function() {
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[0] && this.ticks[0].label)
            },
            unsquish: function() {
                var a = this.options.labels,
                    c = this.horiz,
                    b = this.tickInterval,
                    d = b,
                    m = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / b),
                    e, v = a.rotation,
                    n = this.labelMetrics(),
                    l, g = Number.MAX_VALUE,
                    r, D = function(a) {
                        a /= m || 1;
                        a = 1 <
                            a ? Math.ceil(a) : 1;
                        return a * b
                    };
                c ? (r = !a.staggerLines && !a.step && (p(v) ? [v] : m < w(a.autoRotationLimit, 80) && a.autoRotation)) && k(r, function(a) {
                    var c;
                    if (a === v || a && -90 <= a && 90 >= a) l = D(Math.abs(n.h / Math.sin(y * a))), c = l + Math.abs(a / 360), c < g && (g = c, e = a, d = l)
                }) : a.step || (d = D(n.h));
                this.autoRotation = r;
                this.labelRotation = w(e, v);
                return d
            },
            getSlotWidth: function() {
                var a = this.chart,
                    c = this.horiz,
                    b = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    m = a.margin[3];
                return c && 2 > (b.step || 0) && !b.rotation &&
                    (this.staggerLines || 1) * this.len / d || !c && (m && m - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function() {
                var a = this.chart,
                    c = a.renderer,
                    b = this.tickPositions,
                    d = this.ticks,
                    m = this.options.labels,
                    v = this.horiz,
                    e = this.getSlotWidth(),
                    n = Math.max(1, Math.round(e - 2 * (m.padding || 5))),
                    l = {},
                    g = this.labelMetrics(),
                    D = m.style && m.style.textOverflow,
                    w, A = 0,
                    I, x;
                H(m.rotation) || (l.rotation = m.rotation || 0);
                k(b, function(a) {
                    (a = d[a]) && a.labelLength > A && (A = a.labelLength)
                });
                this.maxLabelLength = A;
                if (this.autoRotation) A > n && A > g.h ? l.rotation =
                    this.labelRotation : this.labelRotation = 0;
                else if (e && (w = {
                        width: n + "px"
                    }, !D))
                    for (w.textOverflow = "clip", I = b.length; !v && I--;)
                        if (x = b[I], n = d[x].label) n.styles && "ellipsis" === n.styles.textOverflow ? n.css({
                            textOverflow: "clip"
                        }) : d[x].labelLength > e && n.css({
                            width: e + "px"
                        }), n.getBBox().height > this.len / b.length - (g.h - g.f) && (n.specCss = {
                            textOverflow: "ellipsis"
                        });
                l.rotation && (w = {
                    width: (A > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight) + "px"
                }, D || (w.textOverflow = "ellipsis"));
                if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) l.align =
                    this.labelAlign;
                k(b, function(a) {
                    var c = (a = d[a]) && a.label;
                    c && (c.attr(l), w && c.css(r(w, c.specCss)), delete c.specCss, a.rotation = l.rotation)
                });
                this.tickRotCorr = c.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function() {
                return this.hasVisibleSeries || p(this.min) && p(this.max) && !!this.tickPositions
            },
            addTitle: function(a) {
                var c = this.chart.renderer,
                    b = this.horiz,
                    h = this.opposite,
                    d = this.options.title,
                    m;
                this.axisTitle || ((m = d.textAlign) || (m = (b ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: h ? "right" : "left",
                    middle: "center",
                    high: h ? "left" : "right"
                })[d.align]), this.axisTitle = c.text(d.text, 0, 0, d.useHTML).attr({
                    zIndex: 7,
                    rotation: d.rotation || 0,
                    align: m
                }).addClass("highcharts-axis-title").css(d.style).add(this.axisGroup), this.axisTitle.isNew = !0);
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function(a) {
                var c = this.ticks;
                c[a] ? c[a].addLabel() : c[a] = new m(this, a)
            },
            getOffset: function() {
                var a = this,
                    b = a.chart,
                    d = b.renderer,
                    m = a.options,
                    e = a.tickPositions,
                    v = a.ticks,
                    n = a.horiz,
                    l = a.side,
                    g = b.inverted ? [1, 0, 3, 2][l] : l,
                    r, D, A =
                    0,
                    I, x = 0,
                    f = m.title,
                    H = m.labels,
                    K = 0,
                    J = b.axisOffset,
                    b = b.clipOffset,
                    u = [-1, 1, 1, -1][l],
                    t = m.className,
                    q = a.axisParent,
                    y = this.tickSize("tick");
                r = a.hasData();
                a.showAxis = D = r || w(m.showEmpty, !0);
                a.staggerLines = a.horiz && H.staggerLines;
                a.axisGroup || (a.gridGroup = d.g("grid").attr({
                    zIndex: m.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(q), a.axisGroup = d.g("axis").attr({
                    zIndex: m.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(q), a.labelGroup = d.g("axis-labels").attr({
                    zIndex: H.zIndex ||
                        7
                }).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (t || "")).add(q));
                r || a.isLinked ? (k(e, function(c, b) {
                    a.generateTick(c, b)
                }), a.renderUnsquish(), !1 === H.reserveSpace || 0 !== l && 2 !== l && {
                    1: "left",
                    3: "right"
                }[l] !== a.labelAlign && "center" !== a.labelAlign || k(e, function(a) {
                    K = Math.max(v[a].getLabelSize(), K)
                }), a.staggerLines && (K *= a.staggerLines, a.labelOffset = K * (a.opposite ? -1 : 1))) : c(v, function(a, c) {
                    a.destroy();
                    delete v[c]
                });
                f && f.text && !1 !== f.enabled && (a.addTitle(D), D && !1 !== f.reserveSpace && (a.titleOffset = A = a.axisTitle.getBBox()[n ?
                    "height" : "width"], I = f.offset, x = p(I) ? 0 : w(f.margin, n ? 5 : 10)));
                a.renderLine();
                a.offset = u * w(m.offset, J[l]);
                a.tickRotCorr = a.tickRotCorr || {
                    x: 0,
                    y: 0
                };
                d = 0 === l ? -a.labelMetrics().h : 2 === l ? a.tickRotCorr.y : 0;
                x = Math.abs(K) + x;
                K && (x = x - d + u * (n ? w(H.y, a.tickRotCorr.y + 8 * u) : H.x));
                a.axisTitleMargin = w(I, x);
                J[l] = Math.max(J[l], a.axisTitleMargin + A + u * a.offset, x, r && e.length && y ? y[0] + u * a.offset : 0);
                m = m.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[g] = Math.max(b[g], m)
            },
            getLinePath: function(a) {
                var c = this.chart,
                    b = this.opposite,
                    h = this.offset,
                    d = this.horiz,
                    m = this.left + (b ? this.width : 0) + h,
                    h = c.chartHeight - this.bottom - (b ? this.height : 0) + h;
                b && (a *= -1);
                return c.renderer.crispLine(["M", d ? this.left : m, d ? h : this.top, "L", d ? c.chartWidth - this.right : m, d ? h : c.chartHeight - this.bottom], a)
            },
            renderLine: function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function() {
                var a =
                    this.horiz,
                    c = this.left,
                    b = this.top,
                    d = this.len,
                    m = this.options.title,
                    e = a ? c : b,
                    v = this.opposite,
                    n = this.offset,
                    l = m.x || 0,
                    g = m.y || 0,
                    r = this.chart.renderer.fontMetrics(m.style && m.style.fontSize, this.axisTitle).f,
                    d = {
                        low: e + (a ? 0 : d),
                        middle: e + d / 2,
                        high: e + (a ? d : 0)
                    }[m.align],
                    c = (a ? b + this.height : c) + (a ? 1 : -1) * (v ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? r : 0);
                return {
                    x: a ? d + l : c + (v ? this.width : 0) + n + l,
                    y: a ? c + g - (v ? this.height : 0) + n : d + g
                }
            },
            renderMinorTick: function(a) {
                var c = this.chart.hasRendered && n(this.oldMin),
                    b = this.minorTicks;
                b[a] ||
                    (b[a] = new m(this, a, "minor"));
                c && b[a].isNew && b[a].render(null, !0);
                b[a].render(null, !1, 1)
            },
            renderTick: function(a, c) {
                var b = this.isLinked,
                    h = this.ticks,
                    d = this.chart.hasRendered && n(this.oldMin);
                if (!b || a >= this.min && a <= this.max) h[a] || (h[a] = new m(this, a)), d && h[a].isNew && h[a].render(c, !0, .1), h[a].render(c)
            },
            render: function() {
                var b = this,
                    d = b.chart,
                    e = b.options,
                    v = b.isLog,
                    n = b.lin2log,
                    l = b.isLinked,
                    g = b.tickPositions,
                    r = b.axisTitle,
                    w = b.ticks,
                    A = b.minorTicks,
                    I = b.alternateBands,
                    x = e.stackLabels,
                    f = e.alternateGridColor,
                    H =
                    b.tickmarkOffset,
                    K = b.axisLine,
                    J = b.showAxis,
                    u = B(d.renderer.globalAnimation),
                    p, t;
                b.labelEdge.length = 0;
                b.overlap = !1;
                k([w, A, I], function(a) {
                    c(a, function(a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || l) b.minorTickInterval && !b.categories && k(b.getMinorTickPositions(), function(a) {
                    b.renderMinorTick(a)
                }), g.length && (k(g, function(a, c) {
                    b.renderTick(a, c)
                }), H && (0 === b.min || b.single) && (w[-1] || (w[-1] = new m(b, -1, null, !0)), w[-1].render(-1))), f && k(g, function(c, h) {
                    t = void 0 !== g[h + 1] ? g[h + 1] + H : b.max - H;
                    0 === h % 2 && c < b.max && t <= b.max + (d.polar ?
                        -H : H) && (I[c] || (I[c] = new a.PlotLineOrBand(b)), p = c + H, I[c].options = {
                        from: v ? n(p) : p,
                        to: v ? n(t) : t,
                        color: f
                    }, I[c].render(), I[c].isActive = !0)
                }), b._addedPlotLB || (k((e.plotLines || []).concat(e.plotBands || []), function(a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                k([w, A, I], function(a) {
                    var b, h = [],
                        m = u.duration;
                    c(a, function(a, c) {
                        a.isActive || (a.render(c, !1, 0), a.isActive = !1, h.push(c))
                    });
                    D(function() {
                        for (b = h.length; b--;) a[h[b]] && !a[h[b]].isActive && (a[h[b]].destroy(), delete a[h[b]])
                    }, a !== I && d.hasRendered && m ? m : 0)
                });
                K &&
                    (K[K.isPlaced ? "animate" : "attr"]({
                        d: this.getLinePath(K.strokeWidth())
                    }), K.isPlaced = !0, K[J ? "show" : "hide"](!0));
                r && J && (r[r.isNew ? "attr" : "animate"](b.getTitlePosition()), r.isNew = !1);
                x && x.enabled && b.renderStackTotals();
                b.isDirty = !1
            },
            redraw: function() {
                this.visible && (this.render(), k(this.plotLinesAndBands, function(a) {
                    a.render()
                }));
                k(this.series, function(a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function(a) {
                var b = this,
                    h = b.stacks,
                    m = b.plotLinesAndBands,
                    e;
                a || K(b);
                c(h, function(a, c) {
                    u(a);
                    h[c] = null
                });
                k([b.ticks, b.minorTicks, b.alternateBands], function(a) {
                    u(a)
                });
                if (m)
                    for (a = m.length; a--;) m[a].destroy();
                k("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "), function(a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (e in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[e] = b.plotLinesAndBandsGroups[e].destroy();
                c(b, function(a, c) {
                    -1 === d(c, b.keepProps) && delete b[c]
                })
            },
            drawCrosshair: function(a, c) {
                var b, h = this.crosshair,
                    d = w(h.snap, !0),
                    m, e =
                    this.cross;
                a || (a = this.cross && this.cross.e);
                this.crosshair && !1 !== (p(c) || !d) ? (d ? p(c) && (m = this.isXAxis ? c.plotX : this.len - c.plotY) : m = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos), p(m) && (b = this.getPlotLinePath(c && (this.isXAxis ? c.x : w(c.stackY, c.y)), null, null, null, m) || null), p(b) ? (c = this.categories && !this.isRadial, e || (this.cross = e = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (c ? "category " : "thin ") + h.className).attr({
                    zIndex: w(h.zIndex, 2)
                }).add(), e.attr({
                    stroke: h.color ||
                        (c ? q("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                    "stroke-width": w(h.width, 1)
                }), h.dashStyle && e.attr({
                    dashstyle: h.dashStyle
                })), e.show().attr({
                    d: b
                }), c && !h.width && e.attr({
                    "stroke-width": this.transA
                }), this.cross.e = a) : this.hideCrosshair()) : this.hideCrosshair()
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = I
    }(L);
    (function(a) {
        var C = a.Axis,
            B = a.Date,
            F = a.dateFormat,
            E = a.defaultOptions,
            q = a.defined,
            f = a.each,
            t = a.extend,
            p = a.getMagnitude,
            y = a.getTZOffset,
            u = a.normalizeTickInterval,
            k = a.pick,
            e = a.timeUnits;
        C.prototype.getTimeTicks = function(a, x, b, l) {
            var d = [],
                g = {},
                n = E.global.useUTC,
                H, r = new B(x - Math.max(y(x), y(b))),
                J = B.hcMakeTime,
                c = a.unitRange,
                w = a.count,
                K;
            if (q(x)) {
                r[B.hcSetMilliseconds](c >= e.second ? 0 : w * Math.floor(r.getMilliseconds() / w));
                if (c >= e.second) r[B.hcSetSeconds](c >= e.minute ? 0 : w * Math.floor(r.getSeconds() / w));
                if (c >= e.minute) r[B.hcSetMinutes](c >= e.hour ? 0 : w * Math.floor(r[B.hcGetMinutes]() / w));
                if (c >= e.hour) r[B.hcSetHours](c >= e.day ? 0 : w * Math.floor(r[B.hcGetHours]() / w));
                if (c >= e.day) r[B.hcSetDate](c >=
                    e.month ? 1 : w * Math.floor(r[B.hcGetDate]() / w));
                c >= e.month && (r[B.hcSetMonth](c >= e.year ? 0 : w * Math.floor(r[B.hcGetMonth]() / w)), H = r[B.hcGetFullYear]());
                if (c >= e.year) r[B.hcSetFullYear](H - H % w);
                if (c === e.week) r[B.hcSetDate](r[B.hcGetDate]() - r[B.hcGetDay]() + k(l, 1));
                H = r[B.hcGetFullYear]();
                l = r[B.hcGetMonth]();
                var v = r[B.hcGetDate](),
                    D = r[B.hcGetHours]();
                if (B.hcTimezoneOffset || B.hcGetTimezoneOffset) K = (!n || !!B.hcGetTimezoneOffset) && (b - x > 4 * e.month || y(x) !== y(b)), r = r.getTime(), r = new B(r + y(r));
                n = r.getTime();
                for (x = 1; n < b;) d.push(n),
                    n = c === e.year ? J(H + x * w, 0) : c === e.month ? J(H, l + x * w) : !K || c !== e.day && c !== e.week ? K && c === e.hour ? J(H, l, v, D + x * w) : n + c * w : J(H, l, v + x * w * (c === e.day ? 1 : 7)), x++;
                d.push(n);
                c <= e.hour && 1E4 > d.length && f(d, function(a) {
                    0 === a % 18E5 && "000000000" === F("%H%M%S%L", a) && (g[a] = "day")
                })
            }
            d.info = t(a, {
                higherRanks: g,
                totalRange: c * w
            });
            return d
        };
        C.prototype.normalizeTimeTickInterval = function(a, k) {
            var b = k || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ];
            k = b[b.length - 1];
            var l = e[k[0]],
                d = k[1],
                g;
            for (g = 0; g < b.length && !(k = b[g], l = e[k[0]], d = k[1], b[g + 1] && a <= (l * d[d.length - 1] + e[b[g + 1][0]]) / 2); g++);
            l === e.year && a < 5 * l && (d = [1, 2, 5]);
            a = u(a / l, d, "year" === k[0] ? Math.max(p(a / l), 1) : 1);
            return {
                unitRange: l,
                count: a,
                unitName: k[0]
            }
        }
    })(L);
    (function(a) {
        var C = a.Axis,
            B = a.getMagnitude,
            F = a.map,
            E = a.normalizeTickInterval,
            q = a.pick;
        C.prototype.getLogTickPositions = function(a, t, p, y) {
            var f = this.options,
                k = this.len,
                e = this.lin2log,
                g =
                this.log2lin,
                x = [];
            y || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), x = this.getLinearTickPositions(a, t, p);
            else if (.08 <= a)
                for (var k = Math.floor(t), b, l, d, A, n, f = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; k < p + 1 && !n; k++)
                    for (l = f.length, b = 0; b < l && !n; b++) d = g(e(k) * f[b]), d > t && (!y || A <= p) && void 0 !== A && x.push(A), A > p && (n = !0), A = d;
            else t = e(t), p = e(p), a = f[y ? "minorTickInterval" : "tickInterval"], a = q("auto" === a ? null : a, this._minorAutoInterval, f.tickPixelInterval / (y ? 5 : 1) * (p - t) / ((y ? k / this.tickPositions.length :
                k) || 1)), a = E(a, null, B(a)), x = F(this.getLinearTickPositions(a, t, p), g), y || (this._minorAutoInterval = a / 5);
            y || (this.tickInterval = a);
            return x
        };
        C.prototype.log2lin = function(a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function(a) {
            return Math.pow(10, a)
        }
    })(L);
    (function(a, C) {
        var B = a.arrayMax,
            F = a.arrayMin,
            E = a.defined,
            q = a.destroyObjectProperties,
            f = a.each,
            t = a.erase,
            p = a.merge,
            y = a.pick;
        a.PlotLineOrBand = function(a, k) {
            this.axis = a;
            k && (this.options = k, this.id = k.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function() {
                var f =
                    this,
                    k = f.axis,
                    e = k.horiz,
                    g = f.options,
                    x = g.label,
                    b = f.label,
                    l = g.to,
                    d = g.from,
                    A = g.value,
                    n = E(d) && E(l),
                    H = E(A),
                    r = f.svgElem,
                    J = !r,
                    c = [],
                    w = g.color,
                    K = y(g.zIndex, 0),
                    v = g.events,
                    c = {
                        "class": "highcharts-plot-" + (n ? "band " : "line ") + (g.className || "")
                    },
                    D = {},
                    m = k.chart.renderer,
                    I = n ? "bands" : "lines",
                    h = k.log2lin;
                k.isLog && (d = h(d), l = h(l), A = h(A));
                H ? (c = {
                    stroke: w,
                    "stroke-width": g.width
                }, g.dashStyle && (c.dashstyle = g.dashStyle)) : n && (w && (c.fill = w), g.borderWidth && (c.stroke = g.borderColor, c["stroke-width"] = g.borderWidth));
                D.zIndex = K;
                I +=
                    "-" + K;
                (w = k.plotLinesAndBandsGroups[I]) || (k.plotLinesAndBandsGroups[I] = w = m.g("plot-" + I).attr(D).add());
                J && (f.svgElem = r = m.path().attr(c).add(w));
                if (H) c = k.getPlotLinePath(A, r.strokeWidth());
                else if (n) c = k.getPlotBandPath(d, l, g);
                else return;
                J && c && c.length ? (r.attr({
                    d: c
                }), v && a.objectEach(v, function(a, c) {
                    r.on(c, function(a) {
                        v[c].apply(f, [a])
                    })
                })) : r && (c ? (r.show(), r.animate({
                    d: c
                })) : (r.hide(), b && (f.label = b = b.destroy())));
                x && E(x.text) && c && c.length && 0 < k.width && 0 < k.height && !c.flat ? (x = p({
                    align: e && n && "center",
                    x: e ?
                        !n && 4 : 10,
                    verticalAlign: !e && n && "middle",
                    y: e ? n ? 16 : 10 : n ? 6 : -4,
                    rotation: e && !n && 90
                }, x), this.renderLabel(x, c, n, K)) : b && b.hide();
                return f
            },
            renderLabel: function(a, k, e, g) {
                var x = this.label,
                    b = this.axis.chart.renderer;
                x || (x = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (e ? "band" : "line") + "-label " + (a.className || "")
                }, x.zIndex = g, this.label = x = b.text(a.text, 0, 0, a.useHTML).attr(x).add(), x.css(a.style));
                g = [k[1], k[4], e ? k[6] : k[1]];
                k = [k[2], k[5], e ? k[7] : k[2]];
                e = F(g);
                b = F(k);
                x.align(a, !1, {
                    x: e,
                    y: b,
                    width: B(g) - e,
                    height: B(k) - b
                });
                x.show()
            },
            destroy: function() {
                t(this.axis.plotLinesAndBands, this);
                delete this.axis;
                q(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function(a, k) {
                var e = this.getPlotLinePath(k, null, null, !0),
                    g = this.getPlotLinePath(a, null, null, !0),
                    x = this.horiz,
                    b = 1;
                a = a < this.min && k < this.min || a > this.max && k > this.max;
                g && e ? (a && (g.flat = g.toString() === e.toString(), b = 0), g.push(x && e[4] === g[4] ? e[4] + b : e[4], x || e[5] !== g[5] ? e[5] : e[5] + b, x && e[1] === g[1] ? e[1] + b : e[1], x || e[2] !== g[2] ? e[2] : e[2] + b)) : g = null;
                return g
            },
            addPlotBand: function(a) {
                return this.addPlotBandOrLine(a, "plotBands")
            },
            addPlotLine: function(a) {
                return this.addPlotBandOrLine(a, "plotLines")
            },
            addPlotBandOrLine: function(f, k) {
                var e = (new a.PlotLineOrBand(this, f)).render(),
                    g = this.userOptions;
                e && (k && (g[k] = g[k] || [], g[k].push(f)), this.plotLinesAndBands.push(e));
                return e
            },
            removePlotBandOrLine: function(a) {
                for (var k = this.plotLinesAndBands, e = this.options, g = this.userOptions, x = k.length; x--;) k[x].id === a && k[x].destroy();
                f([e.plotLines || [], g.plotLines || [], e.plotBands || [], g.plotBands || []], function(b) {
                    for (x = b.length; x--;) b[x].id === a && t(b, b[x])
                })
            },
            removePlotBand: function(a) {
                this.removePlotBandOrLine(a)
            },
            removePlotLine: function(a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(L, T);
    (function(a) {
        var C = a.dateFormat,
            B = a.each,
            F = a.extend,
            E = a.format,
            q = a.isNumber,
            f = a.map,
            t = a.merge,
            p = a.pick,
            y = a.splat,
            u = a.syncTimeout,
            k = a.timeUnits;
        a.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function(a, g) {
                this.chart = a;
                this.options = g;
                this.crosshairs = [];
                this.now = {
                    x: 0,
                    y: 0
                };
                this.isHidden = !0;
                this.split = g.split && !a.inverted;
                this.shared = g.shared || this.split
            },
            cleanSplit: function(a) {
                B(this.chart.series, function(e) {
                    var g = e && e.tt;
                    g && (!g.isActive || a ? e.tt = g.destroy() : g.isActive = !1)
                })
            },
            getLabel: function() {
                var a = this.chart.renderer,
                    g = this.options;
                this.label || (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, g.shape || "callout", null, null, g.useHTML, null, "tooltip").attr({
                        padding: g.padding,
                        r: g.borderRadius
                    }), this.label.attr({
                        fill: g.backgroundColor,
                        "stroke-width": g.borderWidth
                    }).css(g.style).shadow(g.shadow)),
                    this.label.attr({
                        zIndex: 8
                    }).add());
                return this.label
            },
            update: function(a) {
                this.destroy();
                t(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, t(!0, this.options, a))
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                clearTimeout(this.hideTimer);
                clearTimeout(this.tooltipTimeout)
            },
            move: function(a, g, k, b) {
                var e = this,
                    d = e.now,
                    A = !1 !== e.options.animation && !e.isHidden && (1 < Math.abs(a - d.x) || 1 < Math.abs(g -
                        d.y)),
                    n = e.followPointer || 1 < e.len;
                F(d, {
                    x: A ? (2 * d.x + a) / 3 : a,
                    y: A ? (d.y + g) / 2 : g,
                    anchorX: n ? void 0 : A ? (2 * d.anchorX + k) / 3 : k,
                    anchorY: n ? void 0 : A ? (d.anchorY + b) / 2 : b
                });
                e.getLabel().attr(d);
                A && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    e && e.move(a, g, k, b)
                }, 32))
            },
            hide: function(a) {
                var e = this;
                clearTimeout(this.hideTimer);
                a = p(a, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = u(function() {
                    e.getLabel()[a ? "fadeOut" : "hide"]();
                    e.isHidden = !0
                }, a))
            },
            getAnchor: function(a, g) {
                var e, b = this.chart,
                    l = b.inverted,
                    d = b.plotTop,
                    k = b.plotLeft,
                    n = 0,
                    H = 0,
                    r, J;
                a = y(a);
                e = a[0].tooltipPos;
                this.followPointer && g && (void 0 === g.chartX && (g = b.pointer.normalize(g)), e = [g.chartX - b.plotLeft, g.chartY - d]);
                e || (B(a, function(a) {
                    r = a.series.yAxis;
                    J = a.series.xAxis;
                    n += a.plotX + (!l && J ? J.left - k : 0);
                    H += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!l && r ? r.top - d : 0)
                }), n /= a.length, H /= a.length, e = [l ? b.plotWidth - H : n, this.shared && !l && 1 < a.length && g ? g.chartY - d : l ? b.plotHeight - n : H]);
                return f(e, Math.round)
            },
            getPosition: function(a, g, k) {
                var b = this.chart,
                    e = this.distance,
                    d = {},
                    A = k.h || 0,
                    n, x = ["y", b.chartHeight, g, k.plotY + b.plotTop, b.plotTop, b.plotTop + b.plotHeight],
                    r = ["x", b.chartWidth, a, k.plotX + b.plotLeft, b.plotLeft, b.plotLeft + b.plotWidth],
                    f = !this.followPointer && p(k.ttBelow, !b.inverted === !!k.negative),
                    c = function(a, c, b, h, v, n) {
                        var m = b < h - e,
                            l = h + e + b < c,
                            g = h - e - b;
                        h += e;
                        if (f && l) d[a] = h;
                        else if (!f && m) d[a] = g;
                        else if (m) d[a] = Math.min(n - b, 0 > g - A ? g : g - A);
                        else if (l) d[a] = Math.max(v, h + A + b > c ? h : h + A);
                        else return !1
                    },
                    w = function(a, c, b, h) {
                        var m;
                        h < e || h > c - e ? m = !1 : d[a] = h < b / 2 ? 1 : h > c - b / 2 ?
                            c - b - 2 : h - b / 2;
                        return m
                    },
                    K = function(a) {
                        var c = x;
                        x = r;
                        r = c;
                        n = a
                    },
                    v = function() {
                        !1 !== c.apply(0, x) ? !1 !== w.apply(0, r) || n || (K(!0), v()) : n ? d.x = d.y = 0 : (K(!0), v())
                    };
                (b.inverted || 1 < this.len) && K();
                v();
                return d
            },
            defaultFormatter: function(a) {
                var e = this.points || y(this),
                    k;
                k = [a.tooltipFooterHeaderFormatter(e[0])];
                k = k.concat(a.bodyFormatter(e));
                k.push(a.tooltipFooterHeaderFormatter(e[0], !0));
                return k
            },
            refresh: function(a, g) {
                var e, b = this.options,
                    l, d = a,
                    k, n = {},
                    f = [];
                e = b.formatter || this.defaultFormatter;
                var n = this.shared,
                    r;
                clearTimeout(this.hideTimer);
                this.followPointer = y(d)[0].series.tooltipOptions.followPointer;
                k = this.getAnchor(d, g);
                g = k[0];
                l = k[1];
                !n || d.series && d.series.noSharedTooltip ? n = d.getLabelConfig() : (B(d, function(a) {
                    a.setState("hover");
                    f.push(a.getLabelConfig())
                }), n = {
                    x: d[0].category,
                    y: d[0].y
                }, n.points = f, d = d[0]);
                this.len = f.length;
                n = e.call(n, this);
                r = d.series;
                this.distance = p(r.tooltipOptions.distance, 16);
                !1 === n ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({
                    opacity: 1
                }).show(), this.split ? this.renderSplit(n, a) : (e.attr({
                    text: n && n.join ?
                        n.join("") : n
                }), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + p(d.colorIndex, r.colorIndex)), e.attr({
                    stroke: b.borderColor || d.color || r.color || "#666666"
                }), this.updatePosition({
                    plotX: g,
                    plotY: l,
                    negative: d.negative,
                    ttBelow: d.ttBelow,
                    h: k[2] || 0
                })), this.isHidden = !1)
            },
            renderSplit: function(e, g) {
                var k = this,
                    b = [],
                    l = this.chart,
                    d = l.renderer,
                    A = !0,
                    n = this.options,
                    f, r = this.getLabel();
                B(e.slice(0, g.length + 1), function(a, c) {
                    c = g[c - 1] || {
                        isHeader: !0,
                        plotX: g[0].plotX
                    };
                    var e = c.series || k,
                        x = e.tt,
                        v = c.series || {},
                        D = "highcharts-color-" + p(c.colorIndex, v.colorIndex, "none");
                    x || (e.tt = x = d.label(null, null, null, "callout").addClass("highcharts-tooltip-box " + D).attr({
                        padding: n.padding,
                        r: n.borderRadius,
                        fill: n.backgroundColor,
                        stroke: c.color || v.color || "#333333",
                        "stroke-width": n.borderWidth
                    }).add(r));
                    x.isActive = !0;
                    x.attr({
                        text: a
                    });
                    x.css(n.style);
                    a = x.getBBox();
                    v = a.width + x.strokeWidth();
                    c.isHeader ? (f = a.height, v = Math.max(0, Math.min(c.plotX + l.plotLeft - v / 2, l.chartWidth - v))) : v = c.plotX + l.plotLeft - p(n.distance, 16) - v;
                    0 > v && (A = !1);
                    a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                    a -= l.plotTop;
                    b.push({
                        target: c.isHeader ? l.plotHeight + f : a,
                        rank: c.isHeader ? 1 : 0,
                        size: e.tt.getBBox().height + 1,
                        point: c,
                        x: v,
                        tt: x
                    })
                });
                this.cleanSplit();
                a.distribute(b, l.plotHeight + f);
                B(b, function(a) {
                    var c = a.point,
                        b = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: A || c.isHeader ? a.x : c.plotX + l.plotLeft + p(n.distance, 16),
                        y: a.pos + l.plotTop,
                        anchorX: c.isHeader ? c.plotX + l.plotLeft : c.plotX + b.xAxis.pos,
                        anchorY: c.isHeader ? a.pos + l.plotTop -
                            15 : c.plotY + b.yAxis.pos
                    })
                })
            },
            updatePosition: function(a) {
                var e = this.chart,
                    k = this.getLabel(),
                    k = (this.options.positioner || this.getPosition).call(this, k.width, k.height, a);
                this.move(Math.round(k.x), Math.round(k.y || 0), a.plotX + e.plotLeft, a.plotY + e.plotTop)
            },
            getDateFormat: function(a, g, f, b) {
                var e = C("%m-%d %H:%M:%S.%L", g),
                    d, A, n = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    x = "millisecond";
                for (A in k) {
                    if (a === k.week && +C("%w", g) === f && "00:00:00.000" === e.substr(6)) {
                        A = "week";
                        break
                    }
                    if (k[A] > a) {
                        A = x;
                        break
                    }
                    if (n[A] &&
                        e.substr(n[A]) !== "01-01 00:00:00.000".substr(n[A])) break;
                    "week" !== A && (x = A)
                }
                A && (d = b[A]);
                return d
            },
            getXDateFormat: function(a, g, k) {
                g = g.dateTimeLabelFormats;
                var b = k && k.closestPointRange;
                return (b ? this.getDateFormat(b, a.x, k.options.startOfWeek, g) : g.day) || g.year
            },
            tooltipFooterHeaderFormatter: function(a, g) {
                var e = g ? "footer" : "header";
                g = a.series;
                var b = g.tooltipOptions,
                    l = b.xDateFormat,
                    d = g.xAxis,
                    k = d && "datetime" === d.options.type && q(a.key),
                    e = b[e + "Format"];
                k && !l && (l = this.getXDateFormat(a, b, d));
                k && l && (e = e.replace("{point.key}",
                    "{point.key:" + l + "}"));
                return E(e, {
                    point: a,
                    series: g
                })
            },
            bodyFormatter: function(a) {
                return f(a, function(a) {
                    var e = a.series.tooltipOptions;
                    return (e.pointFormatter || a.point.tooltipFormatter).call(a.point, e.pointFormat)
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.attr,
            F = a.charts,
            E = a.color,
            q = a.css,
            f = a.defined,
            t = a.doc,
            p = a.each,
            y = a.extend,
            u = a.fireEvent,
            k = a.offset,
            e = a.pick,
            g = a.removeEvent,
            x = a.splat,
            b = a.Tooltip,
            l = a.win;
        a.Pointer = function(a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function(a, l) {
                this.options =
                    l;
                this.chart = a;
                this.runChartClick = l.chart.events && !!l.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                b && l.tooltip.enabled && (a.tooltip = new b(a, l.tooltip), this.followTouchMove = e(l.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            },
            zoomOption: function(a) {
                var b = this.chart,
                    d = b.options.chart,
                    l = d.zoomType || "",
                    b = b.inverted;
                /touch/.test(a.type) && (l = e(d.pinchType, l));
                this.zoomX = a = /x/.test(l);
                this.zoomY = l = /y/.test(l);
                this.zoomHor = a && !b || l && b;
                this.zoomVert = l && !b || a && b;
                this.hasZoom = a || l
            },
            normalize: function(a,
                b) {
                var d, e;
                a = a || l.event;
                a.target || (a.target = a.srcElement);
                e = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = k(this.chart.container));
                void 0 === e.pageX ? (d = Math.max(a.x, a.clientX - b.left), b = a.y) : (d = e.pageX - b.left, b = e.pageY - b.top);
                return y(a, {
                    chartX: Math.round(d),
                    chartY: Math.round(b)
                })
            },
            getCoordinates: function(a) {
                var b = {
                    xAxis: [],
                    yAxis: []
                };
                p(this.chart.axes, function(d) {
                    b[d.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: d,
                        value: d.toValue(a[d.horiz ? "chartX" : "chartY"])
                    })
                });
                return b
            },
            getKDPoints: function(a, b, l) {
                var d = [],
                    n, g, c;
                p(a, function(a) {
                    n = a.noSharedTooltip && b;
                    g = !b && a.directTouch;
                    a.visible && !g && e(a.options.enableMouseTracking, !0) && (c = a.searchPoint(l, !n && 0 > a.options.findNearestPointBy.indexOf("y"))) && c.series && d.push(c)
                });
                d.sort(function(a, c) {
                    var d = a.distX - c.distX,
                        e = a.dist - c.dist,
                        m = (c.series.group && c.series.group.zIndex) - (a.series.group && a.series.group.zIndex);
                    return 0 !== d && b ? d : 0 !== e ? e : 0 !== m ? m : a.series.index > c.series.index ? -1 : 1
                });
                if (b && d[0] && !d[0].series.noSharedTooltip)
                    for (a =
                        d.length; a--;)(d[a].x !== d[0].x || d[a].series.noSharedTooltip) && d.splice(a, 1);
                return d
            },
            getPointFromEvent: function(a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            },
            getHoverData: function(b, l, n, g, r, k) {
                var c = b,
                    d = l,
                    f;
                g ? r ? (f = [], p(n, function(a) {
                        var b = a.noSharedTooltip && r,
                            d = !r && a.directTouch;
                        a.visible && !b && !d && e(a.options.enableMouseTracking, !0) && (a = a.searchKDTree({
                            clientX: c.clientX,
                            plotY: c.plotY
                        }, !b && 1 === a.kdDimensions)) && a.series && f.push(a)
                    }), 0 === f.length && (f = [c])) : f = [c] : d && !d.stickyTracking ?
                    (r || (n = [d]), f = this.getKDPoints(n, r, k), c = a.find(f, function(a) {
                        return a.series === d
                    })) : (b = a.grep(n, function(a) {
                        return a.stickyTracking
                    }), f = this.getKDPoints(b, r, k), d = (c = f[0]) && c.series, r && (f = this.getKDPoints(n, r, k)));
                f.sort(function(a, b) {
                    return a.series.index - b.series.index
                });
                return {
                    hoverPoint: c,
                    hoverSeries: d,
                    hoverPoints: f
                }
            },
            runPointActions: function(b, l) {
                var d = this.chart,
                    g = d.tooltip,
                    r = g ? g.shared : !1,
                    k = l || d.hoverPoint,
                    c = k && k.series || d.hoverSeries;
                l = this.getHoverData(k, c, d.series, !!l || c && c.directTouch, r,
                    b);
                var w, f, k = l.hoverPoint;
                w = (c = l.hoverSeries) && c.tooltipOptions.followPointer;
                f = (r = r && k && !k.series.noSharedTooltip) ? l.hoverPoints : k ? [k] : [];
                if (k && (k !== d.hoverPoint || g && g.isHidden)) {
                    p(d.hoverPoints || [], function(b) {
                        -1 === a.inArray(b, f) && b.setState()
                    });
                    p(f || [], function(a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== c) c.onMouseOver();
                    c && !c.directTouch && (d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut"), k.firePointEvent("mouseOver"));
                    d.hoverPoints = f;
                    d.hoverPoint = k;
                    g && g.refresh(r ? f : k, b)
                } else w && g && !g.isHidden &&
                    (c = g.getAnchor([{}], b), g.updatePosition({
                        plotX: c[0],
                        plotY: c[1]
                    }));
                this.unDocMouseMove || (this.unDocMouseMove = C(t, "mousemove", function(b) {
                    var c = F[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                p(d.axes, function(c) {
                    e(c.crosshair.snap, !0) ? a.find(f, function(a) {
                        return a.series[c.coll] === c
                    }) ? c.drawCrosshair(b, k) : c.hideCrosshair() : c.drawCrosshair(b)
                })
            },
            reset: function(a, b) {
                var d = this.chart,
                    e = d.hoverSeries,
                    l = d.hoverPoint,
                    g = d.hoverPoints,
                    c = d.tooltip,
                    k = c && c.shared ? g : l;
                a && k && p(x(k), function(b) {
                    b.series.isCartesian &&
                        void 0 === b.plotX && (a = !1)
                });
                if (a) c && k && (c.refresh(k), l && (l.setState(l.state, !0), p(d.axes, function(a) {
                    a.crosshair && a.drawCrosshair(null, l)
                })));
                else {
                    if (l) l.onMouseOut();
                    g && p(g, function(a) {
                        a.setState()
                    });
                    if (e) e.onMouseOut();
                    c && c.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    p(d.axes, function(a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = d.hoverPoints = d.hoverPoint = null
                }
            },
            scaleGroups: function(a, b) {
                var d = this.chart,
                    e;
                p(d.series, function(l) {
                    e = a || l.getPlotBox();
                    l.xAxis && l.xAxis.zoomEnabled &&
                        l.group && (l.group.attr(e), l.markerGroup && (l.markerGroup.attr(e), l.markerGroup.clip(b ? d.clipRect : null)), l.dataLabelsGroup && l.dataLabelsGroup.attr(e))
                });
                d.clipRect.attr(b || d.clipBox)
            },
            dragStart: function(a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            },
            drag: function(a) {
                var b = this.chart,
                    d = b.options.chart,
                    e = a.chartX,
                    l = a.chartY,
                    g = this.zoomHor,
                    c = this.zoomVert,
                    k = b.plotLeft,
                    f = b.plotTop,
                    v = b.plotWidth,
                    D = b.plotHeight,
                    m, I = this.selectionMarker,
                    h = this.mouseDownX,
                    z = this.mouseDownY,
                    x = d.panKey && a[d.panKey + "Key"];
                I && I.touch || (e < k ? e = k : e > k + v && (e = k + v), l < f ? l = f : l > f + D && (l = f + D), this.hasDragged = Math.sqrt(Math.pow(h - e, 2) + Math.pow(z - l, 2)), 10 < this.hasDragged && (m = b.isInsidePlot(h - k, z - f), b.hasCartesianSeries && (this.zoomX || this.zoomY) && m && !x && !I && (this.selectionMarker = I = b.renderer.rect(k, f, g ? 1 : v, c ? 1 : D, 0).attr({
                    fill: d.selectionMarkerFill || E("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), I && g && (e -= h, I.attr({
                    width: Math.abs(e),
                    x: (0 < e ? 0 : e) + h
                })), I && c && (e = l - z, I.attr({
                    height: Math.abs(e),
                    y: (0 < e ? 0 : e) + z
                })), m && !I && d.panning && b.pan(a, d.panning)))
            },
            drop: function(a) {
                var b = this,
                    d = this.chart,
                    e = this.hasPinched;
                if (this.selectionMarker) {
                    var l = {
                            originalEvent: a,
                            xAxis: [],
                            yAxis: []
                        },
                        g = this.selectionMarker,
                        c = g.attr ? g.attr("x") : g.x,
                        k = g.attr ? g.attr("y") : g.y,
                        x = g.attr ? g.attr("width") : g.width,
                        v = g.attr ? g.attr("height") : g.height,
                        D;
                    if (this.hasDragged || e) p(d.axes, function(d) {
                        if (d.zoomEnabled && f(d.min) && (e || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[d.coll]])) {
                            var m =
                                d.horiz,
                                h = "touchend" === a.type ? d.minPixelPadding : 0,
                                g = d.toValue((m ? c : k) + h),
                                m = d.toValue((m ? c + x : k + v) - h);
                            l[d.coll].push({
                                axis: d,
                                min: Math.min(g, m),
                                max: Math.max(g, m)
                            });
                            D = !0
                        }
                    }), D && u(d, "selection", l, function(a) {
                        d.zoom(y(a, e ? {
                            animation: !1
                        } : null))
                    });
                    this.selectionMarker = this.selectionMarker.destroy();
                    e && this.scaleGroups()
                }
                d && (q(d.container, {
                    cursor: d._cursor
                }), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(a) {
                a = this.normalize(a);
                this.zoomOption(a);
                a.preventDefault && a.preventDefault();
                this.dragStart(a)
            },
            onDocumentMouseUp: function(b) {
                F[a.hoverChartIndex] && F[a.hoverChartIndex].pointer.drop(b)
            },
            onDocumentMouseMove: function(a) {
                var b = this.chart,
                    d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            },
            onContainerMouseLeave: function(b) {
                var d = F[a.hoverChartIndex];
                d && (b.relatedTarget || b.toElement) && (d.pointer.reset(), d.pointer.chartPosition =
                    null)
            },
            onContainerMouseMove: function(b) {
                var d = this.chart;
                f(a.hoverChartIndex) && F[a.hoverChartIndex] && F[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = d.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === d.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !d.isInsidePlot(b.chartX - d.plotLeft, b.chartY - d.plotTop) || d.openMenu || this.runPointActions(b)
            },
            inClass: function(a, b) {
                for (var d; a;) {
                    if (d = B(a, "class")) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a =
                        a.parentNode
                }
            },
            onTrackerMouseOut: function(a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            },
            onContainerClick: function(a) {
                var b = this.chart,
                    d = b.hoverPoint,
                    e = b.plotLeft,
                    l = b.plotTop;
                a = this.normalize(a);
                b.cancelClick || (d && this.inClass(a.target, "highcharts-tracker") ? (u(d.series, "click", y(a, {
                    point: d
                })), b.hoverPoint && d.firePointEvent("click",
                    a)) : (y(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - e, a.chartY - l) && u(b, "click", a)))
            },
            setDOMEvents: function() {
                var b = this,
                    e = b.chart.container;
                e.onmousedown = function(a) {
                    b.onContainerMouseDown(a)
                };
                e.onmousemove = function(a) {
                    b.onContainerMouseMove(a)
                };
                e.onclick = function(a) {
                    b.onContainerClick(a)
                };
                C(e, "mouseleave", b.onContainerMouseLeave);
                1 === a.chartCount && C(t, "mouseup", b.onDocumentMouseUp);
                a.hasTouch && (e.ontouchstart = function(a) {
                        b.onContainerTouchStart(a)
                    }, e.ontouchmove = function(a) {
                        b.onContainerTouchMove(a)
                    },
                    1 === a.chartCount && C(t, "touchend", b.onDocumentTouchEnd))
            },
            destroy: function() {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                g(b.chart.container, "mouseleave", b.onContainerMouseLeave);
                a.chartCount || (g(t, "mouseup", b.onDocumentMouseUp), g(t, "touchend", b.onDocumentTouchEnd));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function(a, d) {
                    b[d] = null
                })
            }
        }
    })(L);
    (function(a) {
        var C = a.charts,
            B = a.each,
            F = a.extend,
            E = a.map,
            q = a.noop,
            f = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function(a, f, q, u, k, e) {
                this.zoomHor && this.pinchTranslateDirection(!0,
                    a, f, q, u, k, e);
                this.zoomVert && this.pinchTranslateDirection(!1, a, f, q, u, k, e)
            },
            pinchTranslateDirection: function(a, f, q, u, k, e, g, x) {
                var b = this.chart,
                    l = a ? "x" : "y",
                    d = a ? "X" : "Y",
                    A = "chart" + d,
                    n = a ? "width" : "height",
                    H = b["plot" + (a ? "Left" : "Top")],
                    r, p, c = x || 1,
                    w = b.inverted,
                    t = b.bounds[a ? "h" : "v"],
                    v = 1 === f.length,
                    D = f[0][A],
                    m = q[0][A],
                    I = !v && f[1][A],
                    h = !v && q[1][A],
                    z;
                q = function() {
                    !v && 20 < Math.abs(D - I) && (c = x || Math.abs(m - h) / Math.abs(D - I));
                    p = (H - m) / c + D;
                    r = b["plot" + (a ? "Width" : "Height")] / c
                };
                q();
                f = p;
                f < t.min ? (f = t.min, z = !0) : f + r > t.max && (f =
                    t.max - r, z = !0);
                z ? (m -= .8 * (m - g[l][0]), v || (h -= .8 * (h - g[l][1])), q()) : g[l] = [m, h];
                w || (e[l] = p - H, e[n] = r);
                e = w ? 1 / c : c;
                k[n] = r;
                k[l] = f;
                u[w ? a ? "scaleY" : "scaleX" : "scale" + d] = c;
                u["translate" + d] = e * H + (m - e * D)
            },
            pinch: function(a) {
                var p = this,
                    t = p.chart,
                    u = p.pinchDown,
                    k = a.touches,
                    e = k.length,
                    g = p.lastValidTouch,
                    x = p.hasZoom,
                    b = p.selectionMarker,
                    l = {},
                    d = 1 === e && (p.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || p.runChartClick),
                    A = {};
                1 < e && (p.initiated = !0);
                x && p.initiated && !d && a.preventDefault();
                E(k, function(a) {
                    return p.normalize(a)
                });
                "touchstart" === a.type ? (B(k, function(a, b) {
                    u[b] = {
                        chartX: a.chartX,
                        chartY: a.chartY
                    }
                }), g.x = [u[0].chartX, u[1] && u[1].chartX], g.y = [u[0].chartY, u[1] && u[1].chartY], B(t.axes, function(a) {
                    if (a.zoomEnabled) {
                        var b = t.bounds[a.horiz ? "h" : "v"],
                            d = a.minPixelPadding,
                            e = a.toPixels(f(a.options.min, a.dataMin)),
                            c = a.toPixels(f(a.options.max, a.dataMax)),
                            l = Math.max(e, c);
                        b.min = Math.min(a.pos, Math.min(e, c) - d);
                        b.max = Math.max(a.pos + a.len, l + d)
                    }
                }), p.res = !0) : p.followTouchMove && 1 === e ? this.runPointActions(p.normalize(a)) : u.length && (b ||
                    (p.selectionMarker = b = F({
                        destroy: q,
                        touch: !0
                    }, t.plotBox)), p.pinchTranslate(u, k, l, b, A, g), p.hasPinched = x, p.scaleGroups(l, A), p.res && (p.res = !1, this.reset(!1, 0)))
            },
            touch: function(t, p) {
                var q = this.chart,
                    u, k;
                if (q.index !== a.hoverChartIndex) this.onContainerMouseLeave({
                    relatedTarget: !0
                });
                a.hoverChartIndex = q.index;
                1 === t.touches.length ? (t = this.normalize(t), (k = q.isInsidePlot(t.chartX - q.plotLeft, t.chartY - q.plotTop)) && !q.openMenu ? (p && this.runPointActions(t), "touchmove" === t.type && (p = this.pinchDown, u = p[0] ? 4 <= Math.sqrt(Math.pow(p[0].chartX -
                    t.chartX, 2) + Math.pow(p[0].chartY - t.chartY, 2)) : !1), f(u, !0) && this.pinch(t)) : p && this.reset()) : 2 === t.touches.length && this.pinch(t)
            },
            onContainerTouchStart: function(a) {
                this.zoomOption(a);
                this.touch(a, !0)
            },
            onContainerTouchMove: function(a) {
                this.touch(a)
            },
            onDocumentTouchEnd: function(f) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(f)
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.charts,
            F = a.css,
            E = a.doc,
            q = a.extend,
            f = a.noop,
            t = a.Pointer,
            p = a.removeEvent,
            y = a.win,
            u = a.wrap;
        if (!a.hasTouch && (y.PointerEvent || y.MSPointerEvent)) {
            var k = {},
                e = !!y.PointerEvent,
                g = function() {
                    var b = [];
                    b.item = function(a) {
                        return this[a]
                    };
                    a.objectEach(k, function(a) {
                        b.push({
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.target
                        })
                    });
                    return b
                },
                x = function(b, e, d, k) {
                    "touch" !== b.pointerType && b.pointerType !== b.MSPOINTER_TYPE_TOUCH || !B[a.hoverChartIndex] || (k(b), k = B[a.hoverChartIndex].pointer, k[e]({
                        type: d,
                        target: b.currentTarget,
                        preventDefault: f,
                        touches: g()
                    }))
                };
            q(t.prototype, {
                onContainerPointerDown: function(a) {
                    x(a, "onContainerTouchStart", "touchstart", function(a) {
                        k[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(a) {
                    x(a, "onContainerTouchMove", "touchmove", function(a) {
                        k[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget)
                    })
                },
                onDocumentPointerUp: function(a) {
                    x(a, "onDocumentTouchEnd", "touchend", function(a) {
                        delete k[a.pointerId]
                    })
                },
                batchMSEvents: function(a) {
                    a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" :
                        "MSPointerMove", this.onContainerPointerMove);
                    a(E, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            u(t.prototype, "init", function(a, e, d) {
                a.call(this, e, d);
                this.hasZoom && F(e.container, {
                    "-ms-touch-action": "none",
                    "touch-action": "none"
                })
            });
            u(t.prototype, "setDOMEvents", function(a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            u(t.prototype, "destroy", function(a) {
                this.batchMSEvents(p);
                a.call(this)
            })
        }
    })(L);
    (function(a) {
        var C, B = a.addEvent,
            F = a.css,
            E = a.discardElement,
            q = a.defined,
            f = a.each,
            t = a.isFirefox,
            p = a.marginNames,
            y = a.merge,
            u = a.pick,
            k = a.setAnimation,
            e = a.stableSort,
            g = a.win,
            x = a.wrap;
        C = a.Legend = function(a, e) {
            this.init(a, e)
        };
        C.prototype = {
            init: function(a, e) {
                this.chart = a;
                this.setOptions(e);
                e.enabled && (this.render(), B(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }))
            },
            setOptions: function(a) {
                var b = u(a.padding, 8);
                this.options = a;
                this.itemStyle = a.itemStyle;
                this.itemHiddenStyle = y(this.itemStyle, a.itemHiddenStyle);
                this.itemMarginTop = a.itemMarginTop || 0;
                this.padding =
                    b;
                this.initialItemY = b - 5;
                this.itemHeight = this.maxItemWidth = 0;
                this.symbolWidth = u(a.symbolWidth, 16);
                this.pages = []
            },
            update: function(a, e) {
                var b = this.chart;
                this.setOptions(y(!0, this.options, a));
                this.destroy();
                b.isDirtyLegend = b.isDirtyBox = !0;
                u(e, !0) && b.redraw()
            },
            colorizeItem: function(b, e) {
                b.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                var d = this.options,
                    l = b.legendItem,
                    g = b.legendLine,
                    k = b.legendSymbol,
                    r = this.itemHiddenStyle.color,
                    d = e ? d.itemStyle.color : r,
                    f = e ? b.color || r : r,
                    c = b.options &&
                    b.options.marker,
                    w = {
                        fill: f
                    };
                l && l.css({
                    fill: d,
                    color: d
                });
                g && g.attr({
                    stroke: f
                });
                k && (c && k.isMarker && (w = b.pointAttribs(), e || a.objectEach(w, function(a, b) {
                    w[b] = r
                })), k.attr(w))
            },
            positionItem: function(a) {
                var b = this.options,
                    d = b.symbolPadding,
                    b = !b.rtl,
                    e = a._legendItemPos,
                    g = e[0],
                    e = e[1],
                    k = a.checkbox;
                (a = a.legendGroup) && a.element && a.translate(b ? g : this.legendWidth - g - 2 * d - 4, e);
                k && (k.x = g, k.y = e)
            },
            destroyItem: function(a) {
                var b = a.checkbox;
                f(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(b) {
                    a[b] && (a[b] =
                        a[b].destroy())
                });
                b && E(a.checkbox)
            },
            destroy: function() {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }
                f(this.getAllItems(), function(b) {
                    f(["legendItem", "legendGroup"], a, b)
                });
                f("clipRect up down pager nav box title group".split(" "), a, this);
                this.display = null
            },
            positionCheckboxes: function(a) {
                var b = this.group && this.group.alignAttr,
                    d, e = this.clipHeight || this.legendHeight,
                    g = this.titleHeight;
                b && (d = b.translateY, f(this.allItems, function(l) {
                    var k = l.checkbox,
                        n;
                    k && (n = d + g + k.y + (a || 0) + 3, F(k, {
                        left: b.translateX +
                            l.checkboxOffset + k.x - 20 + "px",
                        top: n + "px",
                        display: n > d - 6 && n < d + e - 6 ? "" : "none"
                    }))
                }))
            },
            renderTitle: function() {
                var a = this.options,
                    e = this.padding,
                    d = a.title,
                    g = 0;
                d.text && (this.title || (this.title = this.chart.renderer.label(d.text, e - 3, e - 4, null, null, null, a.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }).css(d.style).add(this.group)), a = this.title.getBBox(), g = a.height, this.offsetWidth = a.width, this.contentGroup.attr({
                    translateY: g
                }));
                this.titleHeight = g
            },
            setText: function(b) {
                var e = this.options;
                b.legendItem.attr({
                    text: e.labelFormat ?
                        a.format(e.labelFormat, b) : e.labelFormatter.call(b)
                })
            },
            renderItem: function(a) {
                var b = this.chart,
                    d = b.renderer,
                    e = this.options,
                    g = "horizontal" === e.layout,
                    k = this.symbolWidth,
                    r = e.symbolPadding,
                    f = this.itemStyle,
                    c = this.itemHiddenStyle,
                    w = this.padding,
                    x = g ? u(e.itemDistance, 20) : 0,
                    v = !e.rtl,
                    D = e.width,
                    m = e.itemMarginBottom || 0,
                    I = this.itemMarginTop,
                    h = a.legendItem,
                    z = !a.series,
                    p = !z && a.series.drawLegendSymbol ? a.series : a,
                    q = p.options,
                    q = this.createCheckboxForItem && q && q.showCheckbox,
                    t = e.useHTML,
                    N = a.options.className;
                h || (a.legendGroup =
                    d.g("legend-item").addClass("highcharts-" + p.type + "-series highcharts-color-" + a.colorIndex + (N ? " " + N : "") + (z ? " highcharts-series-" + a.index : "")).attr({
                        zIndex: 1
                    }).add(this.scrollGroup), a.legendItem = h = d.text("", v ? k + r : -r, this.baseline || 0, t).css(y(a.visible ? f : c)).attr({
                        align: v ? "left" : "right",
                        zIndex: 2
                    }).add(a.legendGroup), this.baseline || (f = f.fontSize, this.fontMetrics = d.fontMetrics(f, h), this.baseline = this.fontMetrics.f + 3 + I, h.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, p.drawLegendSymbol(this,
                        a), this.setItemEvents && this.setItemEvents(a, h, t), q && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                this.setText(a);
                d = h.getBBox();
                k = a.checkboxOffset = e.itemWidth || a.legendItemWidth || k + r + d.width + x + (q ? 20 : 0);
                this.itemHeight = r = Math.round(a.legendItemHeight || d.height || this.symbolHeight);
                g && this.itemX - w + k > (D || b.spacingBox.width - 2 * w - e.x) && (this.itemX = w, this.itemY += I + this.lastLineHeight + m, this.lastLineHeight = 0);
                this.maxItemWidth = Math.max(this.maxItemWidth, k);
                this.lastItemY = I + this.itemY + m;
                this.lastLineHeight =
                    Math.max(r, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                g ? this.itemX += k : (this.itemY += I + r + m, this.lastLineHeight = r);
                this.offsetWidth = D || Math.max((g ? this.itemX - w - x : k) + w, this.offsetWidth)
            },
            getAllItems: function() {
                var a = [];
                f(this.chart.series, function(b) {
                    var d = b && b.options;
                    b && u(d.showInLegend, q(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b)))
                });
                return a
            },
            adjustMargins: function(a, e) {
                var b = this.chart,
                    g = this.options,
                    l = g.align.charAt(0) + g.verticalAlign.charAt(0) +
                    g.layout.charAt(0);
                g.floating || f([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function(d, k) {
                    d.test(l) && !q(a[k]) && (b[p[k]] = Math.max(b[p[k]], b.legend[(k + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][k] * g[k % 2 ? "x" : "y"] + u(g.margin, 12) + e[k]))
                })
            },
            render: function() {
                var a = this,
                    g = a.chart,
                    d = g.renderer,
                    k = a.group,
                    n, x, r, p, c = a.box,
                    w = a.options,
                    q = a.padding;
                a.itemX = q;
                a.itemY = a.initialItemY;
                a.offsetWidth = 0;
                a.lastItemY = 0;
                k || (a.group = k = d.g("legend").attr({
                        zIndex: 7
                    }).add(), a.contentGroup = d.g().attr({
                        zIndex: 1
                    }).add(k),
                    a.scrollGroup = d.g().add(a.contentGroup));
                a.renderTitle();
                n = a.getAllItems();
                e(n, function(a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                w.reversed && n.reverse();
                a.allItems = n;
                a.display = x = !!n.length;
                a.lastLineHeight = 0;
                f(n, function(b) {
                    a.renderItem(b)
                });
                r = (w.width || a.offsetWidth) + q;
                p = a.lastItemY + a.lastLineHeight + a.titleHeight;
                p = a.handleOverflow(p);
                p += q;
                c || (a.box = c = d.rect().addClass("highcharts-legend-box").attr({
                    r: w.borderRadius
                }).add(k), c.isNew = !0);
                c.attr({
                    stroke: w.borderColor,
                    "stroke-width": w.borderWidth || 0,
                    fill: w.backgroundColor || "none"
                }).shadow(w.shadow);
                0 < r && 0 < p && (c[c.isNew ? "attr" : "animate"](c.crisp({
                    x: 0,
                    y: 0,
                    width: r,
                    height: p
                }, c.strokeWidth())), c.isNew = !1);
                c[x ? "show" : "hide"]();
                a.legendWidth = r;
                a.legendHeight = p;
                f(n, function(b) {
                    a.positionItem(b)
                });
                x && k.align(y(w, {
                    width: r,
                    height: p
                }), !0, "spacingBox");
                g.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(a) {
                var b = this,
                    d = this.chart,
                    e = d.renderer,
                    g = this.options,
                    k = g.y,
                    r = this.padding,
                    d = d.spacingBox.height + ("top" === g.verticalAlign ?
                        -k : k) - r,
                    k = g.maxHeight,
                    x, c = this.clipRect,
                    w = g.navigation,
                    p = u(w.animation, !0),
                    v = w.arrowSize || 12,
                    D = this.nav,
                    m = this.pages,
                    I, h = this.allItems,
                    z = function(a) {
                        "number" === typeof a ? c.attr({
                            height: a
                        }) : c && (b.clipRect = c.destroy(), b.contentGroup.clip());
                        b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + r + "px,9999px," + (r + a) + "px,0)" : "auto")
                    };
                "horizontal" !== g.layout || "middle" === g.verticalAlign || g.floating || (d /= 2);
                k && (d = Math.min(d, k));
                m.length = 0;
                a > d && !1 !== w.enabled ? (this.clipHeight = x = Math.max(d - 20 - this.titleHeight -
                    r, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, f(h, function(a, b) {
                    var c = a._legendItemPos[1];
                    a = Math.round(a.legendItem.getBBox().height);
                    var d = m.length;
                    if (!d || c - m[d - 1] > x && (I || c) !== m[d - 1]) m.push(I || c), d++;
                    b === h.length - 1 && c + a - m[d - 1] > x && m.push(c);
                    c !== I && (I = c)
                }), c || (c = b.clipRect = e.clipRect(0, r, 9999, 0), b.contentGroup.clip(c)), z(x), D || (this.nav = D = e.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = e.symbol("triangle", 0, 0, v, v).on("click", function() {
                    b.scroll(-1, p)
                }).add(D), this.pager = e.text("", 15,
                    10).addClass("highcharts-legend-navigation").css(w.style).add(D), this.down = e.symbol("triangle-down", 0, 0, v, v).on("click", function() {
                    b.scroll(1, p)
                }).add(D)), b.scroll(0), a = d) : D && (z(), this.nav = D.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0);
                return a
            },
            scroll: function(a, e) {
                var b = this.pages,
                    g = b.length;
                a = this.currentPage + a;
                var l = this.clipHeight,
                    f = this.options.navigation,
                    r = this.pager,
                    x = this.padding;
                a > g && (a = g);
                0 < a && (void 0 !== e && k(e, this.chart), this.nav.attr({
                        translateX: x,
                        translateY: l + this.padding +
                            7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({
                        "class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), r.attr({
                        text: a + "/" + g
                    }), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === g ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 === a ? f.inactiveColor : f.activeColor
                    }).css({
                        cursor: 1 === a ? "default" : "pointer"
                    }), this.down.attr({
                        fill: a === g ? f.inactiveColor : f.activeColor
                    }).css({
                        cursor: a === g ? "default" : "pointer"
                    }), e = -b[a - 1] + this.initialItemY,
                    this.scrollGroup.animate({
                        translateY: e
                    }), this.currentPage = a, this.positionCheckboxes(e))
            }
        };
        a.LegendSymbolMixin = {
            drawRectangle: function(a, e) {
                var b = a.symbolHeight,
                    g = a.options.squareSymbol;
                e.legendSymbol = this.chart.renderer.rect(g ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, g ? b : a.symbolWidth, b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(e.legendGroup)
            },
            drawLineMarker: function(a) {
                var b = this.options,
                    d = b.marker,
                    e = a.symbolWidth,
                    g = a.symbolHeight,
                    k = g / 2,
                    r = this.chart.renderer,
                    f =
                    this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var c;
                c = {
                    "stroke-width": b.lineWidth || 0
                };
                b.dashStyle && (c.dashstyle = b.dashStyle);
                this.legendLine = r.path(["M", 0, a, "L", e, a]).addClass("highcharts-graph").attr(c).add(f);
                d && !1 !== d.enabled && (b = Math.min(u(d.radius, k), k), 0 === this.symbol.indexOf("url") && (d = y(d, {
                    width: g,
                    height: g
                }), b = 0), this.legendSymbol = d = r.symbol(this.symbol, e / 2 - b, a - b, 2 * b, 2 * b, d).addClass("highcharts-point").add(f), d.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(g.navigator.userAgent) || t) &&
        x(C.prototype, "positionItem", function(a, e) {
            var b = this,
                g = function() {
                    e._legendItemPos && a.call(b, e)
                };
            g();
            setTimeout(g)
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.animate,
            F = a.animObject,
            E = a.attr,
            q = a.doc,
            f = a.Axis,
            t = a.createElement,
            p = a.defaultOptions,
            y = a.discardElement,
            u = a.charts,
            k = a.css,
            e = a.defined,
            g = a.each,
            x = a.extend,
            b = a.find,
            l = a.fireEvent,
            d = a.getStyle,
            A = a.grep,
            n = a.isNumber,
            H = a.isObject,
            r = a.isString,
            J = a.Legend,
            c = a.marginNames,
            w = a.merge,
            K = a.objectEach,
            v = a.Pointer,
            D = a.pick,
            m = a.pInt,
            I = a.removeEvent,
            h = a.seriesTypes,
            z = a.splat,
            P = a.svg,
            M = a.syncTimeout,
            Q = a.win,
            N = a.Renderer,
            O = a.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function(a, b, c) {
            return new O(a, b, c)
        };
        x(O.prototype, {
            callbacks: [],
            getArgs: function() {
                var a = [].slice.call(arguments);
                if (r(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            },
            init: function(b, c) {
                var h, d, m = b.series,
                    e = b.plotOptions || {};
                b.series = null;
                h = w(p, b);
                for (d in h.plotOptions) h.plotOptions[d].tooltip = e[d] && w(e[d].tooltip) || void 0;
                h.tooltip.userOptions = b.chart && b.chart.forExport &&
                    b.tooltip.userOptions || b.tooltip;
                h.series = b.series = m;
                this.userOptions = b;
                b = h.chart;
                d = b.events;
                this.margin = [];
                this.spacing = [];
                this.bounds = {
                    h: {},
                    v: {}
                };
                this.callback = c;
                this.isResizing = 0;
                this.options = h;
                this.axes = [];
                this.series = [];
                this.hasCartesianSeries = b.showAxes;
                var v = this;
                v.index = u.length;
                u.push(v);
                a.chartCount++;
                d && K(d, function(a, b) {
                    C(v, b, a)
                });
                v.xAxis = [];
                v.yAxis = [];
                v.pointCount = v.colorCounter = v.symbolCounter = 0;
                v.firstRender()
            },
            initSeries: function(b) {
                var c = this.options.chart;
                (c = h[b.type || c.type || c.defaultSeriesType]) ||
                a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            },
            orderSeries: function(a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].name || "Series " + (b[a].index + 1))
            },
            isInsidePlot: function(a, b, c) {
                var h = c ? b : a;
                a = c ? a : b;
                return 0 <= h && h <= this.plotWidth && 0 <= a && a <= this.plotHeight
            },
            redraw: function(b) {
                var c = this.axes,
                    h = this.series,
                    d = this.pointer,
                    m = this.legend,
                    e = this.isDirtyLegend,
                    v, k, z = this.hasCartesianSeries,
                    D = this.isDirtyBox,
                    n, r = this.renderer,
                    f = r.isHidden(),
                    w = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                f && this.temporaryDisplay();
                this.layOutTitles();
                for (b = h.length; b--;)
                    if (n = h[b], n.options.stacking && (v = !0, n.isDirty)) {
                        k = !0;
                        break
                    }
                if (k)
                    for (b = h.length; b--;) n = h[b], n.options.stacking && (n.isDirty = !0);
                g(h, function(a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), e = !0);
                    a.isDirtyData && l(a, "updatedData")
                });
                e && m.options.enabled && (m.render(), this.isDirtyLegend = !1);
                v && this.getStacks();
                z && g(c, function(a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                z && (g(c,
                    function(a) {
                        a.isDirty && (D = !0)
                    }), g(c, function(a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, w.push(function() {
                        l(a, "afterSetExtremes", x(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (D || v) && a.redraw()
                }));
                D && this.drawChartBox();
                l(this, "predraw");
                g(h, function(a) {
                    (D || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                d && d.reset(!0);
                r.draw();
                l(this, "redraw");
                l(this, "render");
                f && this.temporaryDisplay(!0);
                g(w, function(a) {
                    a.call()
                })
            },
            get: function(a) {
                function c(b) {
                    return b.id === a || b.options && b.options.id ===
                        a
                }
                var h, d = this.series,
                    m;
                h = b(this.axes, c) || b(this.series, c);
                for (m = 0; !h && m < d.length; m++) h = b(d[m].points || [], c);
                return h
            },
            getAxes: function() {
                var a = this,
                    b = this.options,
                    c = b.xAxis = z(b.xAxis || {}),
                    b = b.yAxis = z(b.yAxis || {});
                g(c, function(a, b) {
                    a.index = b;
                    a.isX = !0
                });
                g(b, function(a, b) {
                    a.index = b
                });
                c = c.concat(b);
                g(c, function(b) {
                    new f(a, b)
                })
            },
            getSelectedPoints: function() {
                var a = [];
                g(this.series, function(b) {
                    a = a.concat(A(b.data || [], function(a) {
                        return a.selected
                    }))
                });
                return a
            },
            getSelectedSeries: function() {
                return A(this.series,
                    function(a) {
                        return a.selected
                    })
            },
            setTitle: function(a, b, c) {
                var h = this,
                    d = h.options,
                    m;
                m = d.title = w({
                    style: {
                        color: "#333333",
                        fontSize: d.isStock ? "16px" : "18px"
                    }
                }, d.title, a);
                d = d.subtitle = w({
                    style: {
                        color: "#666666"
                    }
                }, d.subtitle, b);
                g([
                    ["title", a, m],
                    ["subtitle", b, d]
                ], function(a, b) {
                    var c = a[0],
                        d = h[c],
                        m = a[1];
                    a = a[2];
                    d && m && (h[c] = d = d.destroy());
                    a && a.text && !d && (h[c] = h.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), h[c].update = function(a) {
                        h.setTitle(!b && a, b &&
                            a)
                    }, h[c].css(a.style))
                });
                h.layOutTitles(c)
            },
            layOutTitles: function(a) {
                var b = 0,
                    c, h = this.renderer,
                    d = this.spacingBox;
                g(["title", "subtitle"], function(a) {
                    var c = this[a],
                        m = this.options[a];
                    a = "title" === a ? -3 : m.verticalAlign ? 0 : b + 2;
                    var e;
                    c && (e = m.style.fontSize, e = h.fontMetrics(e, c).b, c.css({
                        width: (m.width || d.width + m.widthAdjust) + "px"
                    }).align(x({
                        y: a + e
                    }, m), !1, "spacingBox"), m.floating || m.verticalAlign || (b = Math.ceil(b + c.getBBox(m.useHTML).height)))
                }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox &&
                    c && (this.isDirtyBox = c, this.hasRendered && D(a, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var b = this.options.chart,
                    c = b.width,
                    b = b.height,
                    h = this.renderTo;
                e(c) || (this.containerWidth = d(h, "width"));
                e(b) || (this.containerHeight = d(h, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || this.containerHeight || 400)
            },
            temporaryDisplay: function(b) {
                var c = this.renderTo;
                if (b)
                    for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle),
                        delete c.hcOrigStyle), c = c.parentNode;
                else
                    for (; c && c.style;) "none" === d(c, "display", !1) && (c.hcOrigStyle = {
                        display: c.style.display,
                        height: c.style.height,
                        overflow: c.style.overflow
                    }, a.css(c, {
                        display: "block",
                        height: 0,
                        overflow: "hidden"
                    }), c.style.setProperty && c.style.setProperty("display", "block", "important")), c = c.parentNode
            },
            setClassName: function(a) {
                this.container.className = "highcharts-container " + (a || "")
            },
            getContainer: function() {
                var b, c = this.options,
                    h = c.chart,
                    d, e;
                b = this.renderTo;
                var v = a.uniqueKey(),
                    g;
                b ||
                    (this.renderTo = b = h.renderTo);
                r(b) && (this.renderTo = b = q.getElementById(b));
                b || a.error(13, !0);
                d = m(E(b, "data-highcharts-chart"));
                n(d) && u[d] && u[d].hasRendered && u[d].destroy();
                E(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                h.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                d = this.chartWidth;
                e = this.chartHeight;
                g = x({
                    position: "relative",
                    overflow: "hidden",
                    width: d + "px",
                    height: e + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, h.style);
                this.container = b = t("div", {
                    id: v
                }, g, b);
                this._cursor = b.style.cursor;
                this.renderer = new(a[h.renderer] || N)(b, d, e, null, h.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(h.className);
                this.renderer.setStyle(h.style);
                this.renderer.chartIndex = this.index
            },
            getMargins: function(a) {
                var b = this.spacing,
                    c = this.margin,
                    h = this.titleOffset;
                this.resetMargins();
                h && !e(c[0]) && (this.plotTop = Math.max(this.plotTop, h + this.options.title.margin + b[0]));
                this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin &&
                    (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.extraTopMargin && (this.plotTop += this.extraTopMargin);
                a || this.getAxisMargins()
            },
            getAxisMargins: function() {
                var a = this,
                    b = a.axisOffset = [0, 0, 0, 0],
                    h = a.margin;
                a.hasCartesianSeries && g(a.axes, function(a) {
                    a.visible && a.getOffset()
                });
                g(c, function(c, d) {
                    e(h[d]) || (a[c] += b[d])
                });
                a.setChartSize()
            },
            reflow: function(a) {
                var b = this,
                    c = b.options.chart,
                    h = b.renderTo,
                    m = e(c.width),
                    v = c.width || d(h, "width"),
                    c = c.height || d(h, "height"),
                    h = a ? a.target :
                    Q;
                if (!m && !b.isPrinting && v && c && (h === Q || h === q)) {
                    if (v !== b.containerWidth || c !== b.containerHeight) clearTimeout(b.reflowTimeout), b.reflowTimeout = M(function() {
                        b.container && b.setSize(void 0, void 0, !1)
                    }, a ? 100 : 0);
                    b.containerWidth = v;
                    b.containerHeight = c
                }
            },
            initReflow: function() {
                var a = this,
                    b;
                b = C(Q, "resize", function(b) {
                    a.reflow(b)
                });
                C(a, "destroy", b)
            },
            setSize: function(b, c, h) {
                var d = this,
                    m = d.renderer;
                d.isResizing += 1;
                a.setAnimation(h, d);
                d.oldChartHeight = d.chartHeight;
                d.oldChartWidth = d.chartWidth;
                void 0 !== b && (d.options.chart.width =
                    b);
                void 0 !== c && (d.options.chart.height = c);
                d.getChartSize();
                b = m.globalAnimation;
                (b ? B : k)(d.container, {
                    width: d.chartWidth + "px",
                    height: d.chartHeight + "px"
                }, b);
                d.setChartSize(!0);
                m.setSize(d.chartWidth, d.chartHeight, h);
                g(d.axes, function(a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                d.isDirtyLegend = !0;
                d.isDirtyBox = !0;
                d.layOutTitles();
                d.getMargins();
                d.redraw(h);
                d.oldChartHeight = null;
                l(d, "resize");
                M(function() {
                    d && l(d, "endResize", null, function() {
                        --d.isResizing
                    })
                }, F(b).duration)
            },
            setChartSize: function(a) {
                var b = this.inverted,
                    c = this.renderer,
                    h = this.chartWidth,
                    d = this.chartHeight,
                    m = this.options.chart,
                    e = this.spacing,
                    v = this.clipOffset,
                    k, l, z, n;
                this.plotLeft = k = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = z = Math.max(0, Math.round(h - k - this.marginRight));
                this.plotHeight = n = Math.max(0, Math.round(d - l - this.marginBottom));
                this.plotSizeX = b ? n : z;
                this.plotSizeY = b ? z : n;
                this.plotBorderWidth = m.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {
                    x: e[3],
                    y: e[0],
                    width: h - e[3] - e[1],
                    height: d - e[0] - e[2]
                };
                this.plotBox =
                    c.plotBox = {
                        x: k,
                        y: l,
                        width: z,
                        height: n
                    };
                h = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(h, v[3]) / 2);
                c = Math.ceil(Math.max(h, v[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: c,
                    width: Math.floor(this.plotSizeX - Math.max(h, v[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY - Math.max(h, v[2]) / 2 - c))
                };
                a || g(this.axes, function(a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var a = this,
                    b = a.options.chart;
                g(["margin", "spacing"], function(c) {
                    var h = b[c],
                        d = H(h) ? h : [h, h, h, h];
                    g(["Top", "Right", "Bottom", "Left"],
                        function(h, m) {
                            a[c][m] = D(b[c + h], d[m])
                        })
                });
                g(c, function(b, c) {
                    a[b] = D(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var a = this.options.chart,
                    b = this.renderer,
                    c = this.chartWidth,
                    h = this.chartHeight,
                    d = this.chartBackground,
                    m = this.plotBackground,
                    e = this.plotBorder,
                    v, g = this.plotBGImage,
                    k = a.backgroundColor,
                    l = a.plotBackgroundColor,
                    z = a.plotBackgroundImage,
                    n, D = this.plotLeft,
                    r = this.plotTop,
                    f = this.plotWidth,
                    w = this.plotHeight,
                    I = this.plotBox,
                    x = this.clipRect,
                    p = this.clipBox,
                    q = "animate";
                d || (this.chartBackground = d = b.rect().addClass("highcharts-background").add(), q = "attr");
                v = a.borderWidth || 0;
                n = v + (a.shadow ? 8 : 0);
                k = {
                    fill: k || "none"
                };
                if (v || d["stroke-width"]) k.stroke = a.borderColor, k["stroke-width"] = v;
                d.attr(k).shadow(a.shadow);
                d[q]({
                    x: n / 2,
                    y: n / 2,
                    width: c - n - v % 2,
                    height: h - n - v % 2,
                    r: a.borderRadius
                });
                q = "animate";
                m || (q = "attr", this.plotBackground = m = b.rect().addClass("highcharts-plot-background").add());
                m[q](I);
                m.attr({
                    fill: l || "none"
                }).shadow(a.plotShadow);
                z && (g ? g.animate(I) : this.plotBGImage =
                    b.image(z, D, r, f, w).add());
                x ? x.animate({
                    width: p.width,
                    height: p.height
                }) : this.clipRect = b.clipRect(p);
                q = "animate";
                e || (q = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add());
                e.attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": a.plotBorderWidth || 0,
                    fill: "none"
                });
                e[q](e.crisp({
                    x: D,
                    y: r,
                    width: f,
                    height: w
                }, -e.strokeWidth()));
                this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var a = this,
                    b = a.options.chart,
                    c, d = a.options.series,
                    m, e;
                g(["inverted", "angular", "polar"], function(v) {
                    c = h[b.type ||
                        b.defaultSeriesType];
                    e = b[v] || c && c.prototype[v];
                    for (m = d && d.length; !e && m--;)(c = h[d[m].type]) && c.prototype[v] && (e = !0);
                    a[v] = e
                })
            },
            linkSeries: function() {
                var a = this,
                    b = a.series;
                g(b, function(a) {
                    a.linkedSeries.length = 0
                });
                g(b, function(b) {
                    var c = b.options.linkedTo;
                    r(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = D(b.options.visible, c.options.visible, b.visible))
                })
            },
            renderSeries: function() {
                g(this.series, function(a) {
                    a.translate();
                    a.render()
                })
            },
            renderLabels: function() {
                var a = this,
                    b = a.options.labels;
                b.items && g(b.items, function(c) {
                    var h = x(b.style, c.style),
                        d = m(h.left) + a.plotLeft,
                        e = m(h.top) + a.plotTop + 12;
                    delete h.left;
                    delete h.top;
                    a.renderer.text(c.html, d, e).attr({
                        zIndex: 2
                    }).css(h).add()
                })
            },
            render: function() {
                var a = this.axes,
                    b = this.renderer,
                    c = this.options,
                    h, d, m;
                this.setTitle();
                this.legend = new J(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                h = this.plotHeight -= 21;
                g(a, function(a) {
                    a.setScale()
                });
                this.getAxisMargins();
                d = 1.1 < c / this.plotWidth;
                m = 1.05 < h / this.plotHeight;
                if (d || m) g(a, function(a) {
                    (a.horiz && d || !a.horiz && m) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && g(a, function(a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({
                    zIndex: 3
                }).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            },
            addCredits: function(a) {
                var b = this;
                a = w(!0, this.options.credits,
                    a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    a.href && (Q.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function(a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function() {
                var b = this,
                    c = b.axes,
                    h = b.series,
                    d = b.container,
                    m, e = d && d.parentNode;
                l(b, "destroy");
                b.renderer.forExport ? a.erase(u, b) : u[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                I(b);
                for (m = c.length; m--;) c[m] = c[m].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (m = h.length; m--;) h[m] = h[m].destroy();
                g("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function(a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                d && (d.innerHTML = "", I(d), e && y(d));
                K(b, function(a, c) {
                    delete b[c]
                })
            },
            isReadyToRender: function() {
                var a =
                    this;
                return P || Q != Q.top || "complete" === q.readyState ? !0 : (q.attachEvent("onreadystatechange", function() {
                    q.detachEvent("onreadystatechange", a.firstRender);
                    "complete" === q.readyState && a.firstRender()
                }), !1)
            },
            firstRender: function() {
                var a = this,
                    b = a.options;
                if (a.isReadyToRender()) {
                    a.getContainer();
                    l(a, "init");
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    g(b.series || [], function(b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    l(a, "beforeRender");
                    v && (a.pointer = new v(a, b));
                    a.render();
                    if (!a.renderer.imgCount &&
                        a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            },
            onload: function() {
                g([this.callback].concat(this.callbacks), function(a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                l(this, "load");
                l(this, "render");
                e(this.index) && !1 !== this.options.chart.reflow && this.initReflow();
                this.onload = null
            }
        })
    })(L);
    (function(a) {
        var C, B = a.each,
            F = a.extend,
            E = a.erase,
            q = a.fireEvent,
            f = a.format,
            t = a.isArray,
            p = a.isNumber,
            y = a.pick,
            u = a.removeEvent;
        C = a.Point = function() {};
        C.prototype = {
            init: function(a, e, g) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(e, g);
                a.options.colorByPoint ? (e = a.options.colors || a.chart.options.colors, this.color = this.color || e[a.colorCounter], e = e.length, g = a.colorCounter, a.colorCounter++, a.colorCounter === e && (a.colorCounter = 0)) : g = a.colorIndex;
                this.colorIndex = y(this.colorIndex, g);
                a.chart.pointCount++;
                return this
            },
            applyOptions: function(a, e) {
                var g = this.series,
                    k = g.options.pointValKey || g.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                k && (this.y = this[k]);
                this.isNull = y(this.isValid && !this.isValid(), null === this.x || !p(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === e && g.xAxis && g.xAxis.hasNames && (this.x = g.xAxis.nameToX(this));
                void 0 === this.x && g && (this.x = void 0 === e ? g.autoIncrement(this) : e);
                return this
            },
            optionsToObject: function(a) {
                var e = {},
                    g = this.series,
                    k = g.options.keys,
                    b = k || g.pointArrayMap || ["y"],
                    l = b.length,
                    d = 0,
                    f = 0;
                if (p(a) || null === a) e[b[0]] = a;
                else if (t(a))
                    for (!k && a.length > l && (g = typeof a[0], "string" === g ? e.name =
                            a[0] : "number" === g && (e.x = a[0]), d++); f < l;) k && void 0 === a[d] || (e[b[f]] = a[d]), d++, f++;
                else "object" === typeof a && (e = a, a.dataLabels && (g._hasPointLabels = !0), a.marker && (g._hasPointMarkers = !0));
                return e
            },
            getClassName: function() {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone &&
                    this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
            },
            getZone: function() {
                var a = this.series,
                    e = a.zones,
                    a = a.zoneAxis || "y",
                    g = 0,
                    f;
                for (f = e[g]; this[a] >= f.value;) f = e[++g];
                f && f.color && !this.options.color && (this.color = f.color);
                return f
            },
            destroy: function() {
                var a = this.series.chart,
                    e = a.hoverPoints,
                    g;
                a.pointCount--;
                e && (this.setState(), E(e, this), e.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) u(this), this.destroyElements();
                this.legendItem &&
                    a.legend.destroyItem(this);
                for (g in this) this[g] = null
            },
            destroyElements: function() {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], e, g = 6; g--;) e = a[g], this[e] && (this[e] = this[e].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(a) {
                var e = this.series,
                    g = e.tooltipOptions,
                    k = y(g.valueDecimals, ""),
                    b = g.valuePrefix || "",
                    l = g.valueSuffix || "";
                B(e.pointArrayMap || ["y"], function(d) {
                    d = "{point." + d;
                    if (b || l) a = a.replace(d + "}", b + d + "}" + l);
                    a = a.replace(d + "}", d + ":,." + k + "f}")
                });
                return f(a, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(a, e, g) {
                var k = this,
                    b = this.series.options;
                (b.point.events[a] || k.options && k.options.events && k.options.events[a]) && this.importEvents();
                "click" === a && b.allowPointSelect && (g = function(a) {
                    k.select && k.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                q(this,
                    a, e, g)
            },
            visible: !0
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.animObject,
            F = a.arrayMax,
            E = a.arrayMin,
            q = a.correctFloat,
            f = a.Date,
            t = a.defaultOptions,
            p = a.defaultPlotOptions,
            y = a.defined,
            u = a.each,
            k = a.erase,
            e = a.extend,
            g = a.fireEvent,
            x = a.grep,
            b = a.isArray,
            l = a.isNumber,
            d = a.isString,
            A = a.merge,
            n = a.objectEach,
            H = a.pick,
            r = a.removeEvent,
            J = a.splat,
            c = a.SVGElement,
            w = a.syncTimeout,
            K = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {
                duration: 1E3
            },
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                radius: 4,
                states: {
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    marker: {}
                }
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function(a, b) {
                var c = this,
                    d, h = a.series,
                    v;
                c.chart = a;
                c.options = b = c.setOptions(b);
                c.linkedSeries = [];
                c.bindAxes();
                e(c, {
                    name: b.name,
                    state: "",
                    visible: !1 !== b.visible,
                    selected: !0 === b.selected
                });
                d = b.events;
                n(d, function(a,
                    b) {
                    C(c, b, a)
                });
                if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                c.getColor();
                c.getSymbol();
                u(c.parallelArrays, function(a) {
                    c[a + "Data"] = []
                });
                c.setData(b.data, !1);
                c.isCartesian && (a.hasCartesianSeries = !0);
                h.length && (v = h[h.length - 1]);
                c._i = H(v && v._i, -1) + 1;
                a.orderSeries(this.insert(h))
            },
            insert: function(a) {
                var b = this.options.index,
                    c;
                if (l(b)) {
                    for (c = a.length; c--;)
                        if (b >= H(a[c].options.index, a[c]._i)) {
                            a.splice(c + 1, 0, this);
                            break
                        } - 1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return H(c, a.length - 1)
            },
            bindAxes: function() {
                var b = this,
                    c = b.options,
                    d = b.chart,
                    e;
                u(b.axisTypes || [], function(h) {
                    u(d[h], function(a) {
                        e = a.options;
                        if (c[h] === e.index || void 0 !== c[h] && c[h] === e.id || void 0 === c[h] && 0 === e.index) b.insert(a.series), b[h] = a, a.isDirty = !0
                    });
                    b[h] || b.optionalAxis === h || a.error(18, !0)
                })
            },
            updateParallelArrays: function(a, b) {
                var c = a.series,
                    d = arguments,
                    h = l(b) ? function(h) {
                        var d = "y" === h && c.toYData ? c.toYData(a) : a[h];
                        c[h + "Data"][b] = d
                    } : function(a) {
                        Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d,
                            2))
                    };
                u(c.parallelArrays, h)
            },
            autoIncrement: function() {
                var a = this.options,
                    b = this.xIncrement,
                    c, d = a.pointIntervalUnit,
                    b = H(b, a.pointStart, 0);
                this.pointInterval = c = H(this.pointInterval, a.pointInterval, 1);
                d && (a = new f(b), "day" === d ? a = +a[f.hcSetDate](a[f.hcGetDate]() + c) : "month" === d ? a = +a[f.hcSetMonth](a[f.hcGetMonth]() + c) : "year" === d && (a = +a[f.hcSetFullYear](a[f.hcGetFullYear]() + c)), c = a - b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function(a) {
                var b = this.chart,
                    c = b.options,
                    d = c.plotOptions,
                    h = (b.userOptions || {}).plotOptions || {},
                    e = d[this.type];
                this.userOptions = a;
                b = A(e, d.series, a);
                this.tooltipOptions = A(t.tooltip, t.plotOptions.series && t.plotOptions.series.tooltip, t.plotOptions[this.type].tooltip, c.tooltip.userOptions, d.series && d.series.tooltip, d[this.type].tooltip, a.tooltip);
                this.stickyTracking = H(a.stickyTracking, h[this.type] && h[this.type].stickyTracking, h.series && h.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : b.stickyTracking);
                null === e.marker && delete b.marker;
                this.zoneAxis = b.zoneAxis;
                a = this.zones =
                    (b.zones || []).slice();
                !b.negativeColor && !b.negativeFillColor || b.zones || a.push({
                    value: b[this.zoneAxis + "Threshold"] || b.threshold || 0,
                    className: "highcharts-negative",
                    color: b.negativeColor,
                    fillColor: b.negativeFillColor
                });
                a.length && y(a[a.length - 1].value) && a.push({
                    color: this.color,
                    fillColor: this.fillColor
                });
                return b
            },
            getCyclic: function(a, b, c) {
                var d, h = this.chart,
                    e = this.userOptions,
                    m = a + "Index",
                    v = a + "Counter",
                    g = c ? c.length : H(h.options.chart[a + "Count"], h[a + "Count"]);
                b || (d = H(e[m], e["_" + m]), y(d) || (h.series.length ||
                    (h[v] = 0), e["_" + m] = d = h[v] % g, h[v] += 1), c && (b = c[d]));
                void 0 !== d && (this[m] = d);
                this[a] = b
            },
            getColor: function() {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || p[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            setData: function(c, e, m, g) {
                var h = this,
                    v = h.points,
                    k = v && v.length || 0,
                    n, f = h.options,
                    r = h.chart,
                    w = null,
                    D = h.xAxis,
                    I = f.turboThreshold,
                    x = this.xData,
                    p = this.yData,
                    q = (n = h.pointArrayMap) && n.length;
                c = c || [];
                n = c.length;
                e = H(e, !0);
                if (!1 !== g && n && k === n && !h.cropped && !h.hasGroupedData && h.visible) u(c, function(a, b) {
                    v[b].update && a !== f.data[b] && v[b].update(a, !1, null, !1)
                });
                else {
                    h.xIncrement = null;
                    h.colorCounter = 0;
                    u(this.parallelArrays, function(a) {
                        h[a + "Data"].length = 0
                    });
                    if (I && n > I) {
                        for (m = 0; null === w && m < n;) w = c[m], m++;
                        if (l(w))
                            for (m = 0; m < n; m++) x[m] = this.autoIncrement(), p[m] = c[m];
                        else if (b(w))
                            if (q)
                                for (m = 0; m < n; m++) w = c[m], x[m] = w[0], p[m] = w.slice(1,
                                    q + 1);
                            else
                                for (m = 0; m < n; m++) w = c[m], x[m] = w[0], p[m] = w[1];
                        else a.error(12)
                    } else
                        for (m = 0; m < n; m++) void 0 !== c[m] && (w = {
                            series: h
                        }, h.pointClass.prototype.applyOptions.apply(w, [c[m]]), h.updateParallelArrays(w, m));
                    d(p[0]) && a.error(14, !0);
                    h.data = [];
                    h.options.data = h.userOptions.data = c;
                    for (m = k; m--;) v[m] && v[m].destroy && v[m].destroy();
                    D && (D.minRange = D.userMinRange);
                    h.isDirty = r.isDirtyBox = !0;
                    h.isDirtyData = !!v;
                    m = !1
                }
                "point" === f.legendType && (this.processData(), this.generatePoints());
                e && r.redraw(m)
            },
            processData: function(b) {
                var c =
                    this.xData,
                    d = this.yData,
                    e = c.length,
                    h;
                h = 0;
                var g, v, k = this.xAxis,
                    l, n = this.options;
                l = n.cropThreshold;
                var f = this.getExtremesFromAll || n.getExtremesFromAll,
                    w = this.isCartesian,
                    n = k && k.val2lin,
                    r = k && k.isLog,
                    x, p;
                if (w && !this.isDirty && !k.isDirty && !this.yAxis.isDirty && !b) return !1;
                k && (b = k.getExtremes(), x = b.min, p = b.max);
                if (w && this.sorted && !f && (!l || e > l || this.forceCrop))
                    if (c[e - 1] < x || c[0] > p) c = [], d = [];
                    else if (c[0] < x || c[e - 1] > p) h = this.cropData(this.xData, this.yData, x, p), c = h.xData, d = h.yData, h = h.start, g = !0;
                for (l = c.length ||
                    1; --l;) e = r ? n(c[l]) - n(c[l - 1]) : c[l] - c[l - 1], 0 < e && (void 0 === v || e < v) ? v = e : 0 > e && this.requireSorting && a.error(15);
                this.cropped = g;
                this.cropStart = h;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = v
            },
            cropData: function(a, b, c, d) {
                var h = a.length,
                    e = 0,
                    m = h,
                    g = H(this.cropShoulder, 1),
                    v;
                for (v = 0; v < h; v++)
                    if (a[v] >= c) {
                        e = Math.max(0, v - g);
                        break
                    }
                for (c = v; c < h; c++)
                    if (a[c] > d) {
                        m = c + g;
                        break
                    }
                return {
                    xData: a.slice(e, m),
                    yData: b.slice(e, m),
                    start: e,
                    end: m
                }
            },
            generatePoints: function() {
                var a = this.options,
                    b = a.data,
                    c = this.data,
                    d, h = this.processedXData,
                    e = this.processedYData,
                    g = this.pointClass,
                    k = h.length,
                    l = this.cropStart || 0,
                    n, f = this.hasGroupedData,
                    a = a.keys,
                    w, r = [],
                    x;
                c || f || (c = [], c.length = b.length, c = this.data = c);
                a && f && (this.options.keys = !1);
                for (x = 0; x < k; x++) n = l + x, f ? (w = (new g).init(this, [h[x]].concat(J(e[x]))), w.dataGroup = this.groupMap[x]) : (w = c[n]) || void 0 === b[n] || (c[n] = w = (new g).init(this, b[n], h[x])), w && (w.index = n, r[x] = w);
                this.options.keys = a;
                if (c && (k !== (d = c.length) || f))
                    for (x = 0; x < d; x++) x !== l || f || (x += k), c[x] && (c[x].destroyElements(),
                        c[x].plotX = void 0);
                this.data = c;
                this.points = r
            },
            getExtremes: function(a) {
                var c = this.yAxis,
                    d = this.processedXData,
                    e, h = [],
                    g = 0;
                e = this.xAxis.getExtremes();
                var v = e.min,
                    k = e.max,
                    n, f, w, r;
                a = a || this.stackedYData || this.processedYData || [];
                e = a.length;
                for (r = 0; r < e; r++)
                    if (f = d[r], w = a[r], n = (l(w, !0) || b(w)) && (!c.positiveValuesOnly || w.length || 0 < w), f = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[r] || f) >= v && (d[r] || f) <= k, n && f)
                        if (n = w.length)
                            for (; n--;) null !== w[n] && (h[g++] = w[n]);
                        else h[g++] = w;
                this.dataMin =
                    E(h);
                this.dataMax = F(h)
            },
            translate: function() {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options,
                    b = a.stacking,
                    c = this.xAxis,
                    d = c.categories,
                    h = this.yAxis,
                    e = this.points,
                    g = e.length,
                    k = !!this.modifyValue,
                    n = a.pointPlacement,
                    w = "between" === n || l(n),
                    f = a.threshold,
                    r = a.startFromThreshold ? f : 0,
                    x, p, t, u, K = Number.MAX_VALUE;
                "between" === n && (n = .5);
                l(n) && (n *= H(a.pointRange || c.pointRange));
                for (a = 0; a < g; a++) {
                    var A = e[a],
                        J = A.x,
                        B = A.y;
                    p = A.low;
                    var C = b && h.stacks[(this.negStacks && B < (r ? 0 : f) ? "-" : "") + this.stackKey],
                        E;
                    h.positiveValuesOnly && null !== B && 0 >= B && (A.isNull = !0);
                    A.plotX = x = q(Math.min(Math.max(-1E5, c.translate(J, 0, 0, 0, 1, n, "flags" === this.type)), 1E5));
                    b && this.visible && !A.isNull && C && C[J] && (u = this.getStackIndicator(u, J, this.index), E = C[J], B = E.points[u.key], p = B[0], B = B[1], p === r && u.key === C[J].base && (p = H(f, h.min)), h.positiveValuesOnly && 0 >= p && (p = null), A.total = A.stackTotal = E.total, A.percentage = E.total && A.y / E.total * 100, A.stackY = B, E.setOffset(this.pointXOffset || 0, this.barW || 0));
                    A.yBottom = y(p) ? h.translate(p, 0, 1, 0, 1) :
                        null;
                    k && (B = this.modifyValue(B, A));
                    A.plotY = p = "number" === typeof B && Infinity !== B ? Math.min(Math.max(-1E5, h.translate(B, 0, 1, 0, 1)), 1E5) : void 0;
                    A.isInside = void 0 !== p && 0 <= p && p <= h.len && 0 <= x && x <= c.len;
                    A.clientX = w ? q(c.translate(J, 0, 0, 0, 1, n)) : x;
                    A.negative = A.y < (f || 0);
                    A.category = d && void 0 !== d[A.x] ? d[A.x] : A.x;
                    A.isNull || (void 0 !== t && (K = Math.min(K, Math.abs(x - t))), t = x);
                    A.zone = this.zones.length && A.getZone()
                }
                this.closestPointRangePx = K
            },
            getValidPoints: function(a, b) {
                var c = this.chart;
                return x(a || this.points || [], function(a) {
                    return b &&
                        !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function(a) {
                var b = this.chart,
                    c = this.options,
                    d = b.renderer,
                    h = b.inverted,
                    e = this.clipBox,
                    g = e || b.clipBox,
                    v = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, c.xAxis, c.yAxis].join(),
                    k = b[v],
                    l = b[v + "m"];
                k || (a && (g.width = 0, b[v + "m"] = l = d.clipRect(-99, h ? -b.plotLeft : -b.plotTop, 99, h ? b.chartWidth : b.chartHeight)), b[v] = k = d.clipRect(g), k.count = {
                    length: 0
                });
                a && !k.count[this.index] && (k.count[this.index] = !0, k.count.length += 1);
                !1 !== c.clip &&
                    (this.group.clip(a || e ? k : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = v);
                a || (k.count[this.index] && (delete k.count[this.index], --k.count.length), 0 === k.count.length && v && b[v] && (e || (b[v] = b[v].destroy()), b[v + "m"] && (b[v + "m"] = b[v + "m"].destroy())))
            },
            animate: function(a) {
                var b = this.chart,
                    c = B(this.options.animation),
                    d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX
                }, c), b[d + "m"] && b[d + "m"].animate({
                    width: b.plotSizeX + 99
                }, c), this.animate = null)
            },
            afterAnimate: function() {
                this.setClip();
                g(this, "afterAnimate")
            },
            drawPoints: function() {
                var a = this.points,
                    b = this.chart,
                    c, d, h, e, g = this.options.marker,
                    k, n, f, w, r = this[this.specialGroup] || this.markerGroup,
                    x = H(g.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= 2 * g.radius);
                if (!1 !== g.enabled || this._hasPointMarkers)
                    for (d = 0; d < a.length; d++) h = a[d], c = h.plotY, e = h.graphic, k = h.marker || {}, n = !!h.marker, f = x && void 0 === k.enabled || k.enabled, w = h.isInside, f && l(c) && null !== h.y ? (c = H(k.symbol, this.symbol), h.hasImage = 0 === c.indexOf("url"), f = this.markerAttribs(h,
                        h.selected && "select"), e ? e[w ? "show" : "hide"](!0).animate(f) : w && (0 < f.width || h.hasImage) && (h.graphic = e = b.renderer.symbol(c, f.x, f.y, f.width, f.height, n ? k : g).add(r)), e && e.attr(this.pointAttribs(h, h.selected && "select")), e && e.addClass(h.getClassName(), !0)) : e && (h.graphic = e.destroy())
            },
            markerAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a.marker || {},
                    h = H(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], h = H(b && b.radius, c && c.radius, h + (c && c.radiusPlus || 0)));
                a.hasImage && (h = 0);
                a = {
                    x: Math.floor(a.plotX) -
                        h,
                    y: a.plotY - h
                };
                h && (a.width = a.height = 2 * h);
                return a
            },
            pointAttribs: function(a, b) {
                var c = this.options.marker,
                    d = a && a.options,
                    h = d && d.marker || {},
                    e = this.color,
                    g = d && d.color,
                    v = a && a.color,
                    d = H(h.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                e = g || a || v || e;
                a = h.fillColor || c.fillColor || e;
                e = h.lineColor || c.lineColor || e;
                b && (c = c.states[b], b = h.states && h.states[b] || {}, d = H(b.lineWidth, c.lineWidth, d + H(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, e = b.lineColor || c.lineColor || e);
                return {
                    stroke: e,
                    "stroke-width": d,
                    fill: a
                }
            },
            destroy: function() {
                var a = this,
                    b = a.chart,
                    d = /AppleWebKit\/533/.test(K.navigator.userAgent),
                    e, h, l = a.data || [],
                    f, w;
                g(a, "destroy");
                r(a);
                u(a.axisTypes || [], function(b) {
                    (w = a[b]) && w.series && (k(w.series, a), w.isDirty = w.forceRedraw = !0)
                });
                a.legendItem && a.chart.legend.destroyItem(a);
                for (h = l.length; h--;)(f = l[h]) && f.destroy && f.destroy();
                a.points = null;
                clearTimeout(a.animationTimeout);
                n(a, function(a, b) {
                    a instanceof c && !a.survive && (e = d && "group" === b ? "hide" : "destroy", a[e]())
                });
                b.hoverSeries === a && (b.hoverSeries =
                    null);
                k(b.series, a);
                b.orderSeries();
                n(a, function(b, c) {
                    delete a[c]
                })
            },
            getGraphPath: function(a, b, c) {
                var d = this,
                    h = d.options,
                    e = h.step,
                    m, g = [],
                    k = [],
                    v;
                a = a || d.points;
                (m = a.reversed) && a.reverse();
                (e = {
                    right: 1,
                    center: 2
                }[e] || e && 3) && m && (e = 4 - e);
                !h.connectNulls || b || c || (a = this.getValidPoints(a));
                u(a, function(m, l) {
                    var n = m.plotX,
                        f = m.plotY,
                        w = a[l - 1];
                    (m.leftCliff || w && w.rightCliff) && !c && (v = !0);
                    m.isNull && !y(b) && 0 < l ? v = !h.connectNulls : m.isNull && !b ? v = !0 : (0 === l || v ? l = ["M", m.plotX, m.plotY] : d.getPointSpline ? l = d.getPointSpline(a,
                        m, l) : e ? (l = 1 === e ? ["L", w.plotX, f] : 2 === e ? ["L", (w.plotX + n) / 2, w.plotY, "L", (w.plotX + n) / 2, f] : ["L", n, w.plotY], l.push("L", n, f)) : l = ["L", n, f], k.push(m.x), e && k.push(m.x), g.push.apply(g, l), v = !1)
                });
                g.xMap = k;
                return d.graphPath = g
            },
            drawGraph: function() {
                var a = this,
                    b = this.options,
                    c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [
                        ["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]
                    ];
                u(this.zones, function(c, e) {
                    d.push(["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (c.className || ""), c.color ||
                        a.color, c.dashStyle || b.dashStyle
                    ])
                });
                u(d, function(d, e) {
                    var h = d[0],
                        m = a[h];
                    m ? (m.endX = c.xMap, m.animate({
                        d: c
                    })) : c.length && (a[h] = a.chart.renderer.path(c).addClass(d[1]).attr({
                        zIndex: 1
                    }).add(a.group), m = {
                        stroke: d[2],
                        "stroke-width": b.lineWidth,
                        fill: a.fillGraph && a.color || "none"
                    }, d[3] ? m.dashstyle = d[3] : "square" !== b.linecap && (m["stroke-linecap"] = m["stroke-linejoin"] = "round"), m = a[h].attr(m).shadow(2 > e && b.shadow));
                    m && (m.startX = c.xMap, m.isArea = c.isArea)
                })
            },
            applyZones: function() {
                var a = this,
                    b = this.chart,
                    c = b.renderer,
                    d = this.zones,
                    h, e, g = this.clips || [],
                    k, l = this.graph,
                    n = this.area,
                    f = Math.max(b.chartWidth, b.chartHeight),
                    w = this[(this.zoneAxis || "y") + "Axis"],
                    r, x, p = b.inverted,
                    q, A, t, K, J = !1;
                d.length && (l || n) && w && void 0 !== w.min && (x = w.reversed, q = w.horiz, l && l.hide(), n && n.hide(), r = w.getExtremes(), u(d, function(d, m) {
                    h = x ? q ? b.plotWidth : 0 : q ? 0 : w.toPixels(r.min);
                    h = Math.min(Math.max(H(e, h), 0), f);
                    e = Math.min(Math.max(Math.round(w.toPixels(H(d.value, r.max), !0)), 0), f);
                    J && (h = e = w.toPixels(r.max));
                    A = Math.abs(h - e);
                    t = Math.min(h, e);
                    K = Math.max(h,
                        e);
                    w.isXAxis ? (k = {
                        x: p ? K : t,
                        y: 0,
                        width: A,
                        height: f
                    }, q || (k.x = b.plotHeight - k.x)) : (k = {
                        x: 0,
                        y: p ? K : t,
                        width: f,
                        height: A
                    }, q && (k.y = b.plotWidth - k.y));
                    p && c.isVML && (k = w.isXAxis ? {
                        x: 0,
                        y: x ? t : K,
                        height: k.width,
                        width: b.chartWidth
                    } : {
                        x: k.y - b.plotLeft - b.spacingBox.x,
                        y: 0,
                        width: k.height,
                        height: b.chartHeight
                    });
                    g[m] ? g[m].animate(k) : (g[m] = c.clipRect(k), l && a["zone-graph-" + m].clip(g[m]), n && a["zone-area-" + m].clip(g[m]));
                    J = d.value > r.max
                }), this.clips = g)
            },
            invertGroups: function(a) {
                function b() {
                    u(["group", "markerGroup"], function(b) {
                        c[b] &&
                            (d.renderer.isVML && c[b].attr({
                                width: c.yAxis.len,
                                height: c.xAxis.len
                            }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }
                var c = this,
                    d = c.chart,
                    h;
                c.xAxis && (h = C(d, "resize", b), C(c, "destroy", h), b(a), c.invertGroups = b)
            },
            plotGroup: function(a, b, c, d, h) {
                var e = this[a],
                    m = !e;
                m && (this[a] = e = this.chart.renderer.g().attr({
                    zIndex: d || .1
                }).add(h));
                e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series highcharts-color-" + this.colorIndex + " " + (this.options.className || ""), !0);
                e.attr({
                    visibility: c
                })[m ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function() {
                var a = this.chart,
                    b = this.xAxis,
                    c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {
                    translateX: b ? b.left : a.plotLeft,
                    translateY: c ? c.top : a.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var a = this,
                    b = a.chart,
                    c, d = a.options,
                    h = !!a.animate && b.renderer.isSVG && B(d.animation).duration,
                    e = a.visible ? "inherit" : "hidden",
                    g = d.zIndex,
                    k = a.hasRendered,
                    l = b.seriesGroup,
                    n = b.inverted;
                c = a.plotGroup("group", "series", e, g, l);
                a.markerGroup =
                    a.plotGroup("markerGroup", "markers", e, g, l);
                h && a.animate(!0);
                c.inverted = a.isCartesian ? n : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(n);
                !1 === d.clip || a.sharedClipKey || k || c.clip(b.clipRect);
                h && a.animate();
                k || (a.animationTimeout = w(function() {
                    a.afterAnimate()
                }, h));
                a.isDirty = !1;
                a.hasRendered = !0
            },
            redraw: function() {
                var a = this.chart,
                    b = this.isDirty || this.isDirtyData,
                    c = this.group,
                    d = this.xAxis,
                    h = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({
                    translateX: H(d && d.left, a.plotLeft),
                    translateY: H(h && h.top, a.plotTop)
                }));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(a, b) {
                var c = this.xAxis,
                    d = this.yAxis,
                    h = this.chart.inverted;
                return this.searchKDTree({
                    clientX: h ? c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: h ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function() {
                function a(c,
                    d, e) {
                    var h, m;
                    if (m = c && c.length) return h = b.kdAxisArray[d % e], c.sort(function(a, b) {
                        return a[h] - b[h]
                    }), m = Math.floor(m / 2), {
                        point: c[m],
                        left: a(c.slice(0, m), d + 1, e),
                        right: a(c.slice(m + 1), d + 1, e)
                    }
                }
                this.buildingKdTree = !0;
                var b = this,
                    c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                w(function() {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ? 0 : 1)
            },
            searchKDTree: function(a, b) {
                function c(a, b, m, k) {
                    var l = b.point,
                        n = d.kdAxisArray[m % k],
                        w, f, v = l;
                    f = y(a[h]) && y(l[h]) ?
                        Math.pow(a[h] - l[h], 2) : null;
                    w = y(a[e]) && y(l[e]) ? Math.pow(a[e] - l[e], 2) : null;
                    w = (f || 0) + (w || 0);
                    l.dist = y(w) ? Math.sqrt(w) : Number.MAX_VALUE;
                    l.distX = y(f) ? Math.sqrt(f) : Number.MAX_VALUE;
                    n = a[n] - l[n];
                    w = 0 > n ? "left" : "right";
                    f = 0 > n ? "right" : "left";
                    b[w] && (w = c(a, b[w], m + 1, k), v = w[g] < v[g] ? w : l);
                    b[f] && Math.sqrt(n * n) < v[g] && (a = c(a, b[f], m + 1, k), v = a[g] < v[g] ? a : v);
                    return v
                }
                var d = this,
                    h = this.kdAxisArray[0],
                    e = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree ||
                    this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(L);
    (function(a) {
        function C(a, e, g, f, b) {
            var k = a.chart.inverted;
            this.axis = a;
            this.isNegative = g;
            this.options = e;
            this.x = f;
            this.total = null;
            this.points = {};
            this.stack = b;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
                align: e.align || (k ? g ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (k ? "middle" : g ? "bottom" : "top"),
                y: u(e.y, k ? 4 : g ? 14 : -6),
                x: u(e.x, k ? g ? -6 : 6 : 0)
            };
            this.textAlign = e.textAlign || (k ? g ? "right" : "left" : "center")
        }
        var B = a.Axis,
            F = a.Chart,
            E = a.correctFloat,
            q = a.defined,
            f = a.destroyObjectProperties,
            t = a.each,
            p = a.format,
            y = a.objectEach,
            u = a.pick;
        a = a.Series;
        C.prototype = {
            destroy: function() {
                f(this, this.axis)
            },
            render: function(a) {
                var e = this.options,
                    g = e.format,
                    g = g ? p(g, this) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: g,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(g, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(a)
            },
            setOffset: function(a, e) {
                var g = this.axis,
                    k =
                    g.chart,
                    b = k.inverted,
                    l = g.reversed,
                    l = this.isNegative && !l || !this.isNegative && l,
                    d = g.translate(g.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    g = g.translate(0),
                    g = Math.abs(d - g);
                a = k.xAxis[0].translate(this.x) + a;
                var f = k.plotHeight,
                    b = {
                        x: b ? l ? d : d - g : a,
                        y: b ? f - a - e : l ? f - d - g : f - d,
                        width: b ? g : e,
                        height: b ? e : g
                    };
                if (e = this.label) e.align(this.alignOptions, null, b), b = e.alignAttr, e[!1 === this.options.crop || k.isInsidePlot(b.x, b.y) ? "show" : "hide"](!0)
            }
        };
        F.prototype.getStacks = function() {
            var a = this;
            t(a.yAxis, function(a) {
                a.stacks && a.hasVisibleSeries &&
                    (a.oldStacks = a.stacks)
            });
            t(a.series, function(e) {
                !e.options.stacking || !0 !== e.visible && !1 !== a.options.chart.ignoreHiddenSeries || (e.stackKey = e.type + u(e.options.stack, ""))
            })
        };
        B.prototype.buildStacks = function() {
            var a = this.series,
                e, g = u(this.options.reversedStacks, !0),
                f = a.length,
                b;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (b = f; b--;) a[g ? b : f - b - 1].setStackedPoints();
                for (b = f; b--;) e = a[g ? b : f - b - 1], e.setStackCliffs && e.setStackCliffs();
                if (this.usePercentage)
                    for (b = 0; b < f; b++) a[b].setPercentStacks()
            }
        };
        B.prototype.renderStackTotals =
            function() {
                var a = this.chart,
                    e = a.renderer,
                    g = this.stacks,
                    f = this.stackTotalGroup;
                f || (this.stackTotalGroup = f = e.g("stack-labels").attr({
                    visibility: "visible",
                    zIndex: 6
                }).add());
                f.translate(a.plotLeft, a.plotTop);
                y(g, function(a) {
                    y(a, function(a) {
                        a.render(f)
                    })
                })
            };
        B.prototype.resetStacks = function() {
            var a = this,
                e = a.stacks;
            a.isXAxis || y(e, function(e) {
                y(e, function(g, b) {
                    g.touched < a.stacksTouched ? (g.destroy(), delete e[b]) : (g.total = null, g.cum = null)
                })
            })
        };
        B.prototype.cleanStacks = function() {
            var a;
            this.isXAxis || (this.oldStacks &&
                (a = this.stacks = this.oldStacks), y(a, function(a) {
                    y(a, function(a) {
                        a.cum = a.total
                    })
                }))
        };
        a.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var a = this.processedXData,
                    e = this.processedYData,
                    g = [],
                    f = e.length,
                    b = this.options,
                    l = b.threshold,
                    d = b.startFromThreshold ? l : 0,
                    p = b.stack,
                    b = b.stacking,
                    n = this.stackKey,
                    t = "-" + n,
                    r = this.negStacks,
                    J = this.yAxis,
                    c = J.stacks,
                    w = J.oldStacks,
                    K, v, D, m, I, h, z;
                J.stacksTouched += 1;
                for (I = 0; I < f; I++) h = a[I], z = e[I],
                    K = this.getStackIndicator(K, h, this.index), m = K.key, D = (v = r && z < (d ? 0 : l)) ? t : n, c[D] || (c[D] = {}), c[D][h] || (w[D] && w[D][h] ? (c[D][h] = w[D][h], c[D][h].total = null) : c[D][h] = new C(J, J.options.stackLabels, v, h, p)), D = c[D][h], null !== z && (D.points[m] = D.points[this.index] = [u(D.cum, d)], q(D.cum) || (D.base = m), D.touched = J.stacksTouched, 0 < K.index && !1 === this.singleStacks && (D.points[m][0] = D.points[this.index + "," + h + ",0"][0])), "percent" === b ? (v = v ? n : t, r && c[v] && c[v][h] ? (v = c[v][h], D.total = v.total = Math.max(v.total, D.total) + Math.abs(z) ||
                        0) : D.total = E(D.total + (Math.abs(z) || 0))) : D.total = E(D.total + (z || 0)), D.cum = u(D.cum, d) + (z || 0), null !== z && (D.points[m].push(D.cum), g[I] = D.cum);
                "percent" === b && (J.usePercentage = !0);
                this.stackedYData = g;
                J.oldStacks = {}
            }
        };
        a.prototype.setPercentStacks = function() {
            var a = this,
                e = a.stackKey,
                g = a.yAxis.stacks,
                f = a.processedXData,
                b;
            t([e, "-" + e], function(e) {
                for (var d = f.length, k, l; d--;)
                    if (k = f[d], b = a.getStackIndicator(b, k, a.index, e), k = (l = g[e] && g[e][k]) && l.points[b.key]) l = l.total ? 100 / l.total : 0, k[0] = E(k[0] * l), k[1] = E(k[1] * l),
                        a.stackedYData[d] = k[1]
            })
        };
        a.prototype.getStackIndicator = function(a, e, g, f) {
            !q(a) || a.x !== e || f && a.key !== f ? a = {
                x: e,
                index: 0,
                key: f
            } : a.index++;
            a.key = [g, e, a.index].join();
            return a
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.animate,
            F = a.Axis,
            E = a.createElement,
            q = a.css,
            f = a.defined,
            t = a.each,
            p = a.erase,
            y = a.extend,
            u = a.fireEvent,
            k = a.inArray,
            e = a.isNumber,
            g = a.isObject,
            x = a.isArray,
            b = a.merge,
            l = a.objectEach,
            d = a.pick,
            A = a.Point,
            n = a.Series,
            H = a.seriesTypes,
            r = a.setAnimation,
            J = a.splat;
        y(a.Chart.prototype, {
            addSeries: function(a, b,
                e) {
                var c, g = this;
                a && (b = d(b, !0), u(g, "addSeries", {
                    options: a
                }, function() {
                    c = g.initSeries(a);
                    g.isDirtyLegend = !0;
                    g.linkSeries();
                    b && g.redraw(e)
                }));
                return c
            },
            addAxis: function(a, e, g, k) {
                var c = e ? "xAxis" : "yAxis",
                    m = this.options;
                a = b(a, {
                    index: this[c].length,
                    isX: e
                });
                new F(this, a);
                m[c] = J(m[c] || {});
                m[c].push(a);
                d(g, !0) && this.redraw(k)
            },
            showLoading: function(a) {
                var b = this,
                    c = b.options,
                    d = b.loadingDiv,
                    e = c.loading,
                    m = function() {
                        d && q(d, {
                            left: b.plotLeft + "px",
                            top: b.plotTop + "px",
                            width: b.plotWidth + "px",
                            height: b.plotHeight + "px"
                        })
                    };
                d || (b.loadingDiv = d = E("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, b.container), b.loadingSpan = E("span", {
                    className: "highcharts-loading-inner"
                }, null, d), C(b, "redraw", m));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                q(d, y(e.style, {
                    zIndex: 10
                }));
                q(b.loadingSpan, e.labelStyle);
                b.loadingShown || (q(d, {
                    opacity: 0,
                    display: ""
                }), B(d, {
                    opacity: e.style.opacity || .5
                }, {
                    duration: e.showDuration || 0
                }));
                b.loadingShown = !0;
                m()
            },
            hideLoading: function() {
                var a = this.options,
                    b =
                    this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", B(b, {
                    opacity: 0
                }, {
                    duration: a.loading.hideDuration || 100,
                    complete: function() {
                        q(b, {
                            display: "none"
                        })
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions tooltip".split(" "),
            update: function(a, g) {
                var c = this,
                    n = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle"
                    },
                    w = a.chart,
                    m, r;
                if (w) {
                    b(!0, c.options.chart, w);
                    "className" in w && c.setClassName(w.className);
                    if ("inverted" in w || "polar" in w) c.propFromSeries(), m = !0;
                    "alignTicks" in w && (m = !0);
                    l(w, function(a, b) {
                        -1 !== k("chart." + b, c.propsRequireUpdateSeries) && (r = !0); - 1 !== k(b, c.propsRequireDirtyBox) && (c.isDirtyBox = !0)
                    });
                    "style" in w && c.renderer.setStyle(w.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions && b(!0, this.options.plotOptions,
                    a.plotOptions);
                l(a, function(a, b) {
                    if (c[b] && "function" === typeof c[b].update) c[b].update(a, !1);
                    else if ("function" === typeof c[n[b]]) c[n[b]](a);
                    "chart" !== b && -1 !== k(b, c.propsRequireUpdateSeries) && (r = !0)
                });
                t("xAxis yAxis zAxis series colorAxis pane".split(" "), function(b) {
                    a[b] && t(J(a[b]), function(a, d) {
                        (d = f(a.id) && c.get(a.id) || c[b][d]) && d.coll === b && d.update(a, !1)
                    })
                });
                m && t(c.axes, function(a) {
                    a.update({}, !1)
                });
                r && t(c.series, function(a) {
                    a.update({}, !1)
                });
                a.loading && b(!0, c.options.loading, a.loading);
                m = w && w.width;
                w = w && w.height;
                e(m) && m !== c.chartWidth || e(w) && w !== c.chartHeight ? c.setSize(m, w) : d(g, !0) && c.redraw()
            },
            setSubtitle: function(a) {
                this.setTitle(void 0, a)
            }
        });
        y(A.prototype, {
            update: function(a, b, e, k) {
                function c() {
                    m.applyOptions(a);
                    null === m.y && h && (m.graphic = h.destroy());
                    g(a, !0) && (h && h.element && a && a.marker && a.marker.symbol && (m.graphic = h.destroy()), a && a.dataLabels && m.dataLabel && (m.dataLabel = m.dataLabel.destroy()));
                    f = m.index;
                    l.updateParallelArrays(m, f);
                    w.data[f] = g(w.data[f], !0) || g(a, !0) ? m.options : a;
                    l.isDirty = l.isDirtyData = !0;
                    !l.fixedBox && l.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === w.legendType && (n.isDirtyLegend = !0);
                    b && n.redraw(e)
                }
                var m = this,
                    l = m.series,
                    h = m.graphic,
                    f, n = l.chart,
                    w = l.options;
                b = d(b, !0);
                !1 === k ? c() : m.firePointEvent("update", {
                    options: a
                }, c)
            },
            remove: function(a, b) {
                this.series.removePoint(k(this, this.series.data), a, b)
            }
        });
        y(n.prototype, {
            addPoint: function(a, b, e, g) {
                var c = this.options,
                    m = this.data,
                    k = this.chart,
                    h = this.xAxis,
                    h = h && h.hasNames && h.names,
                    l = c.data,
                    f, n, w = this.xData,
                    r, v;
                b = d(b, !0);
                f = {
                    series: this
                };
                this.pointClass.prototype.applyOptions.apply(f, [a]);
                v = f.x;
                r = w.length;
                if (this.requireSorting && v < w[r - 1])
                    for (n = !0; r && w[r - 1] > v;) r--;
                this.updateParallelArrays(f, "splice", r, 0, 0);
                this.updateParallelArrays(f, r);
                h && f.name && (h[v] = f.name);
                l.splice(r, 0, a);
                n && (this.data.splice(r, 0, null), this.processData());
                "point" === c.legendType && this.generatePoints();
                e && (m[0] && m[0].remove ? m[0].remove(!1) : (m.shift(), this.updateParallelArrays(f, "shift"), l.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && k.redraw(g)
            },
            removePoint: function(a, b, e) {
                var c = this,
                    g = c.data,
                    m = g[a],
                    k = c.points,
                    h = c.chart,
                    l = function() {
                        k && k.length === g.length && k.splice(a, 1);
                        g.splice(a, 1);
                        c.options.data.splice(a, 1);
                        c.updateParallelArrays(m || {
                            series: c
                        }, "splice", a, 1);
                        m && m.destroy();
                        c.isDirty = !0;
                        c.isDirtyData = !0;
                        b && h.redraw()
                    };
                r(e, h);
                b = d(b, !0);
                m ? m.firePointEvent("remove", null, l) : l()
            },
            remove: function(a, b, e) {
                function c() {
                    g.destroy();
                    m.isDirtyLegend = m.isDirtyBox = !0;
                    m.linkSeries();
                    d(a, !0) && m.redraw(b)
                }
                var g = this,
                    m = g.chart;
                !1 !== e ? u(g, "remove", null, c) : c()
            },
            update: function(a, e) {
                var c = this,
                    g = c.chart,
                    k = c.userOptions,
                    m =
                    c.oldType || c.type,
                    l = a.type || k.type || g.options.chart.type,
                    h = H[m].prototype,
                    f = ["group", "markerGroup", "dataLabelsGroup"],
                    n;
                if (l && l !== m || void 0 !== a.zIndex) f.length = 0;
                t(f, function(a) {
                    f[a] = c[a];
                    delete c[a]
                });
                a = b(k, {
                    animation: !1,
                    index: c.index,
                    pointStart: c.xData[0]
                }, {
                    data: c.options.data
                }, a);
                c.remove(!1, null, !1);
                for (n in h) c[n] = void 0;
                y(c, H[l || m].prototype);
                t(f, function(a) {
                    c[a] = f[a]
                });
                c.init(g, a);
                c.oldType = m;
                g.linkSeries();
                d(e, !0) && g.redraw(!1)
            }
        });
        y(F.prototype, {
            update: function(a, e) {
                var c = this.chart;
                a = c.options[this.coll][this.options.index] =
                    b(this.userOptions, a);
                this.destroy(!0);
                this.init(c, y(a, {
                    events: void 0
                }));
                c.isDirtyBox = !0;
                d(e, !0) && c.redraw()
            },
            remove: function(a) {
                for (var b = this.chart, c = this.coll, e = this.series, g = e.length; g--;) e[g] && e[g].remove(!1);
                p(b.axes, this);
                p(b[c], this);
                x(b.options[c]) ? b.options[c].splice(this.options.index, 1) : delete b.options[c];
                t(b[c], function(a, b) {
                    a.options.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                d(a, !0) && b.redraw()
            },
            setTitle: function(a, b) {
                this.update({
                    title: a
                }, b)
            },
            setCategories: function(a, b) {
                this.update({
                        categories: a
                    },
                    b)
            }
        })
    })(L);
    (function(a) {
        var C = a.color,
            B = a.each,
            F = a.map,
            E = a.pick,
            q = a.Series,
            f = a.seriesType;
        f("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function() {
                var f = [],
                    p = [],
                    q = this.xAxis,
                    u = this.yAxis,
                    k = u.stacks[this.stackKey],
                    e = {},
                    g = this.points,
                    x = this.index,
                    b = u.series,
                    l = b.length,
                    d, A = E(u.options.reversedStacks, !0) ? 1 : -1,
                    n;
                if (this.options.stacking) {
                    for (n = 0; n < g.length; n++) e[g[n].x] = g[n];
                    a.objectEach(k, function(a, b) {
                        null !== a.total && p.push(b)
                    });
                    p.sort(function(a, b) {
                        return a - b
                    });
                    d = F(b,
                        function() {
                            return this.visible
                        });
                    B(p, function(a, b) {
                        var g = 0,
                            c, r;
                        if (e[a] && !e[a].isNull) f.push(e[a]), B([-1, 1], function(g) {
                            var f = 1 === g ? "rightNull" : "leftNull",
                                w = 0,
                                m = k[p[b + g]];
                            if (m)
                                for (n = x; 0 <= n && n < l;) c = m.points[n], c || (n === x ? e[a][f] = !0 : d[n] && (r = k[a].points[n]) && (w -= r[1] - r[0])), n += A;
                            e[a][1 === g ? "rightCliff" : "leftCliff"] = w
                        });
                        else {
                            for (n = x; 0 <= n && n < l;) {
                                if (c = k[a].points[n]) {
                                    g = c[1];
                                    break
                                }
                                n += A
                            }
                            g = u.translate(g, 0, 1, 0, 1);
                            f.push({
                                isNull: !0,
                                plotX: q.translate(a, 0, 0, 0, 1),
                                x: a,
                                plotY: g,
                                yBottom: g
                            })
                        }
                    })
                }
                return f
            },
            getGraphPath: function(a) {
                var f =
                    q.prototype.getGraphPath,
                    t = this.options,
                    u = t.stacking,
                    k = this.yAxis,
                    e, g, x = [],
                    b = [],
                    l = this.index,
                    d, A = k.stacks[this.stackKey],
                    n = t.threshold,
                    H = k.getThreshold(t.threshold),
                    r, t = t.connectNulls || "percent" === u,
                    J = function(c, e, g) {
                        var f = a[c];
                        c = u && A[f.x].points[l];
                        var r = f[g + "Null"] || 0;
                        g = f[g + "Cliff"] || 0;
                        var m, w, f = !0;
                        g || r ? (m = (r ? c[0] : c[1]) + g, w = c[0] + g, f = !!r) : !u && a[e] && a[e].isNull && (m = w = n);
                        void 0 !== m && (b.push({
                            plotX: d,
                            plotY: null === m ? H : k.getThreshold(m),
                            isNull: f,
                            isCliff: !0
                        }), x.push({
                            plotX: d,
                            plotY: null === w ? H : k.getThreshold(w),
                            doCurve: !1
                        }))
                    };
                a = a || this.points;
                u && (a = this.getStackPoints());
                for (e = 0; e < a.length; e++)
                    if (g = a[e].isNull, d = E(a[e].rectPlotX, a[e].plotX), r = E(a[e].yBottom, H), !g || t) t || J(e, e - 1, "left"), g && !u && t || (b.push(a[e]), x.push({
                        x: e,
                        plotX: d,
                        plotY: r
                    })), t || J(e, e + 1, "right");
                e = f.call(this, b, !0, !0);
                x.reversed = !0;
                g = f.call(this, x, !0, !0);
                g.length && (g[0] = "L");
                g = e.concat(g);
                f = f.call(this, b, !1, t);
                g.xMap = e.xMap;
                this.areaPath = g;
                return f
            },
            drawGraph: function() {
                this.areaPath = [];
                q.prototype.drawGraph.apply(this);
                var a = this,
                    f = this.areaPath,
                    y = this.options,
                    u = [
                        ["area", "highcharts-area", this.color, y.fillColor]
                    ];
                B(this.zones, function(f, e) {
                    u.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + f.className, f.color || a.color, f.fillColor || y.fillColor])
                });
                B(u, function(k) {
                    var e = k[0],
                        g = a[e];
                    g ? (g.endX = f.xMap, g.animate({
                        d: f
                    })) : (g = a[e] = a.chart.renderer.path(f).addClass(k[1]).attr({
                        fill: E(k[3], C(k[2]).setOpacity(E(y.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), g.isArea = !0);
                    g.startX = f.xMap;
                    g.shiftUnit = y.step ? 2 : 1
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function(a, F, E) {
                var q = F.plotX,
                    f = F.plotY,
                    t = a[E - 1];
                E = a[E + 1];
                var p, y, u, k;
                if (t && !t.isNull && !1 !== t.doCurve && !F.isCliff && E && !E.isNull && !1 !== E.doCurve && !F.isCliff) {
                    a = t.plotY;
                    u = E.plotX;
                    E = E.plotY;
                    var e = 0;
                    p = (1.5 * q + t.plotX) / 2.5;
                    y = (1.5 * f + a) / 2.5;
                    u = (1.5 * q + u) / 2.5;
                    k = (1.5 * f + E) / 2.5;
                    u !== p && (e = (k - y) * (u - q) / (u - p) + f - k);
                    y += e;
                    k += e;
                    y > a && y > f ? (y = Math.max(a, f), k = 2 * f - y) : y < a && y < f && (y = Math.min(a, f), k = 2 * f - y);
                    k > E && k > f ? (k = Math.max(E, f), y = 2 * f - k) : k < E && k < f &&
                        (k = Math.min(E, f), y = 2 * f - k);
                    F.rightContX = u;
                    F.rightContY = k
                }
                F = ["C", C(t.rightContX, t.plotX), C(t.rightContY, t.plotY), C(p, q), C(y, f), q, f];
                t.rightContX = t.rightContY = null;
                return F
            }
        })
    })(L);
    (function(a) {
        var C = a.seriesTypes.area.prototype,
            B = a.seriesType;
        B("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            setStackCliffs: C.setStackCliffs,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(L);
    (function(a) {
        var C = a.animObject,
            B = a.color,
            F = a.each,
            E = a.extend,
            q = a.isNumber,
            f = a.merge,
            t = a.pick,
            p = a.Series,
            y = a.seriesType,
            u = a.svg;
        y("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1,
                    shadow: !1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                p.prototype.init.apply(this, arguments);
                var a = this,
                    e = a.chart;
                e.hasRendered && F(e.series, function(e) {
                    e.type === a.type && (e.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var a = this,
                    e = a.options,
                    g = a.xAxis,
                    f = a.yAxis,
                    b = g.reversed,
                    l, d = {},
                    p = 0;
                !1 === e.grouping ? p = 1 : F(a.chart.series, function(b) {
                    var c = b.options,
                        e = b.yAxis,
                        g;
                    b.type === a.type && b.visible && f.len === e.len && f.pos === e.pos && (c.stacking ? (l = b.stackKey, void 0 === d[l] && (d[l] = p++),
                        g = d[l]) : !1 !== c.grouping && (g = p++), b.columnIndex = g)
                });
                var n = Math.min(Math.abs(g.transA) * (g.ordinalSlope || e.pointRange || g.closestPointRange || g.tickInterval || 1), g.len),
                    q = n * e.groupPadding,
                    r = (n - 2 * q) / (p || 1),
                    e = Math.min(e.maxPointWidth || g.len, t(e.pointWidth, r * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (r - e) / 2 + (q + ((a.columnIndex || 0) + (b ? 1 : 0)) * r - n / 2) * (b ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function(a, e, g, f) {
                var b = this.chart,
                    l = this.borderWidth,
                    d = -(l % 2 ? .5 : 0),
                    l = l % 2 ? .5 : 1;
                b.inverted && b.renderer.isVML &&
                    (l += 1);
                this.options.crisp && (g = Math.round(a + g) + d, a = Math.round(a) + d, g -= a);
                f = Math.round(e + f) + l;
                d = .5 >= Math.abs(e) && .5 < f;
                e = Math.round(e) + l;
                f -= e;
                d && f && (--e, f += 1);
                return {
                    x: a,
                    y: e,
                    width: g,
                    height: f
                }
            },
            translate: function() {
                var a = this,
                    e = a.chart,
                    g = a.options,
                    f = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    f = a.borderWidth = t(g.borderWidth, f ? 0 : 1),
                    b = a.yAxis,
                    l = a.translatedThreshold = b.getThreshold(g.threshold),
                    d = t(g.minPointLength, 5),
                    q = a.getColumnMetrics(),
                    n = q.width,
                    u = a.barW = Math.max(n, 1 + 2 * f),
                    r = a.pointXOffset = q.offset;
                e.inverted && (l -= .5);
                g.pointPadding && (u = Math.ceil(u));
                p.prototype.translate.apply(a);
                F(a.points, function(g) {
                    var c = t(g.yBottom, l),
                        f = 999 + Math.abs(c),
                        f = Math.min(Math.max(-f, g.plotY), b.len + f),
                        k = g.plotX + r,
                        v = u,
                        x = Math.min(f, c),
                        m, p = Math.max(f, c) - x;
                    Math.abs(p) < d && d && (p = d, m = !b.reversed && !g.negative || b.reversed && g.negative, x = Math.abs(x - l) > d ? c - d : l - (m ? d : 0));
                    g.barX = k;
                    g.pointWidth = n;
                    g.tooltipPos = e.inverted ? [b.len + b.pos - e.plotLeft - f, a.xAxis.len - k - v / 2, p] : [k + v / 2, f + b.pos - e.plotTop, p];
                    g.shapeType = "rect";
                    g.shapeArgs = a.crispCol.apply(a,
                        g.isNull ? [k, l, v, 0] : [k, x, v, p])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(a, e) {
                var g = this.options,
                    k, b = this.pointAttrToOptions || {};
                k = b.stroke || "borderColor";
                var l = b["stroke-width"] || "borderWidth",
                    d = a && a.color || this.color,
                    p = a[k] || g[k] || this.color || d,
                    n = a[l] || g[l] || this[l] || 0,
                    b = g.dashStyle;
                a && this.zones.length && (d = a.getZone(), d = a.options.color || d && d.color || this.color);
                e && (a = f(g.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, d = a.color || void 0 !== e && B(d).brighten(a.brightness).get() || d, p = a[k] || p, n = a[l] || n, b = a.dashStyle || b);
                k = {
                    fill: d,
                    stroke: p,
                    "stroke-width": n
                };
                g.borderRadius && (k.r = g.borderRadius);
                b && (k.dashstyle = b);
                return k
            },
            drawPoints: function() {
                var a = this,
                    e = this.chart,
                    g = a.options,
                    x = e.renderer,
                    b = g.animationLimit || 250,
                    l;
                F(a.points, function(d) {
                    var k = d.graphic;
                    if (q(d.plotY) && null !== d.y) {
                        l = d.shapeArgs;
                        if (k) k[e.pointCount < b ? "animate" : "attr"](f(l));
                        else d.graphic = k = x[d.shapeType](l).add(d.group || a.group);
                        k.attr(a.pointAttribs(d, d.selected && "select")).shadow(g.shadow, null, g.stacking && !g.borderRadius);
                        k.addClass(d.getClassName(), !0)
                    } else k && (d.graphic = k.destroy())
                })
            },
            animate: function(a) {
                var e = this,
                    g = this.yAxis,
                    f = e.options,
                    b = this.chart.inverted,
                    l = {};
                u && (a ? (l.scaleY = .001, a = Math.min(g.pos + g.len, Math.max(g.pos, g.toPixels(f.threshold))), b ? l.translateX = a - g.len : l.translateY = a, e.group.attr(l)) : (l[b ? "translateX" : "translateY"] = g.pos, e.group.animate(l, E(C(e.options.animation), {
                    step: function(a, b) {
                        e.group.attr({
                            scaleY: Math.max(.001, b.pos)
                        })
                    }
                })), e.animate = null))
            },
            remove: function() {
                var a = this,
                    e = a.chart;
                e.hasRendered && F(e.series, function(e) {
                    e.type === a.type && (e.isDirty = !0)
                });
                p.prototype.remove.apply(a, arguments)
            }
        })
    })(L);
    (function(a) {
        a = a.seriesType;
        a("bar", "column", null, {
            inverted: !0
        })
    })(L);
    (function(a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(L);
    (function(a) {
        var C = a.pick,
            B = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function() {
                var a = this.options,
                    E = this.chart,
                    q = 2 * (a.slicedOffset || 0),
                    f = E.plotWidth - 2 * q,
                    E = E.plotHeight - 2 * q,
                    t = a.center,
                    t = [C(t[0], "50%"), C(t[1], "50%"), a.size || "100%", a.innerSize || 0],
                    p = Math.min(f, E),
                    y, u;
                for (y = 0; 4 > y; ++y) u = t[y], a = 2 > y || 2 === y && /%$/.test(u), t[y] = B(u, [f, E, p, t[2]][y]) + (a ? q : 0);
                t[3] > t[2] && (t[3] = t[2]);
                return t
            }
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.defined,
            F = a.each,
            E = a.extend,
            q = a.inArray,
            f = a.noop,
            t = a.pick,
            p = a.Point,
            y = a.Series,
            u = a.seriesType,
            k = a.setAnimation;
        u("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function(a) {
                var e = this,
                    f = e.points,
                    b = e.startAngleRad;
                a || (F(f, function(a) {
                    var d = a.graphic,
                        g = a.shapeArgs;
                    d && (d.attr({
                        r: a.startR || e.center[3] / 2,
                        start: b,
                        end: b
                    }), d.animate({
                        r: g.r,
                        start: g.start,
                        end: g.end
                    }, e.options.animation))
                }), e.animate = null)
            },
            updateTotals: function() {
                var a, g = 0,
                    f = this.points,
                    b = f.length,
                    l, d = this.options.ignoreHiddenPoint;
                for (a = 0; a < b; a++) l = f[a], g += d && !l.visible ? 0 : l.isNull ? 0 : l.y;
                this.total = g;
                for (a = 0; a < b; a++) l = f[a], l.percentage = 0 < g && (l.visible || !d) ? l.y / g * 100 : 0, l.total = g
            },
            generatePoints: function() {
                y.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function(a) {
                this.generatePoints();
                var e = 0,
                    f = this.options,
                    b = f.slicedOffset,
                    l = b + (f.borderWidth || 0),
                    d, k, n, p = f.startAngle || 0,
                    r = this.startAngleRad = Math.PI / 180 * (p - 90),
                    p = (this.endAngleRad = Math.PI / 180 * (t(f.endAngle, p + 360) - 90)) - r,
                    q = this.points,
                    c, w = f.dataLabels.distance,
                    f = f.ignoreHiddenPoint,
                    u, v = q.length,
                    D;
                a || (this.center = a = this.getCenter());
                this.getX = function(b, c, d) {
                    n = Math.asin(Math.min((b - a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(n) * (a[2] / 2 + d.labelDistance)
                };
                for (u = 0; u < v; u++) {
                    D = q[u];
                    D.labelDistance = t(D.options.dataLabels &&
                        D.options.dataLabels.distance, w);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, D.labelDistance);
                    d = r + e * p;
                    if (!f || D.visible) e += D.percentage / 100;
                    k = r + e * p;
                    D.shapeType = "arc";
                    D.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * d) / 1E3,
                        end: Math.round(1E3 * k) / 1E3
                    };
                    n = (k + d) / 2;
                    n > 1.5 * Math.PI ? n -= 2 * Math.PI : n < -Math.PI / 2 && (n += 2 * Math.PI);
                    D.slicedTranslation = {
                        translateX: Math.round(Math.cos(n) * b),
                        translateY: Math.round(Math.sin(n) * b)
                    };
                    k = Math.cos(n) * a[2] / 2;
                    c = Math.sin(n) * a[2] / 2;
                    D.tooltipPos = [a[0] +
                        .7 * k, a[1] + .7 * c
                    ];
                    D.half = n < -Math.PI / 2 || n > Math.PI / 2 ? 1 : 0;
                    D.angle = n;
                    d = Math.min(l, D.labelDistance / 5);
                    D.labelPos = [a[0] + k + Math.cos(n) * D.labelDistance, a[1] + c + Math.sin(n) * D.labelDistance, a[0] + k + Math.cos(n) * d, a[1] + c + Math.sin(n) * d, a[0] + k, a[1] + c, 0 > D.labelDistance ? "center" : D.half ? "right" : "left", n]
                }
            },
            drawGraph: null,
            drawPoints: function() {
                var a = this,
                    g = a.chart.renderer,
                    f, b, l, d, k = a.options.shadow;
                k && !a.shadowGroup && (a.shadowGroup = g.g("shadow").add(a.group));
                F(a.points, function(e) {
                    if (!e.isNull) {
                        b = e.graphic;
                        d = e.shapeArgs;
                        f = e.getTranslate();
                        var n = e.shadowGroup;
                        k && !n && (n = e.shadowGroup = g.g("shadow").add(a.shadowGroup));
                        n && n.attr(f);
                        l = a.pointAttribs(e, e.selected && "select");
                        b ? b.setRadialReference(a.center).attr(l).animate(E(d, f)) : (e.graphic = b = g[e.shapeType](d).setRadialReference(a.center).attr(f).add(a.group), e.visible || b.attr({
                            visibility: "hidden"
                        }), b.attr(l).attr({
                            "stroke-linejoin": "round"
                        }).shadow(k, n));
                        b.addClass(e.getClassName())
                    }
                })
            },
            searchPoint: f,
            sortByAngle: function(a, g) {
                a.sort(function(a, b) {
                    return void 0 !== a.angle &&
                        (b.angle - a.angle) * g
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: a.CenteredSeriesMixin.getCenter,
            getSymbol: f
        }, {
            init: function() {
                p.prototype.init.apply(this, arguments);
                var a = this,
                    g;
                a.name = t(a.name, "Slice");
                g = function(e) {
                    a.slice("select" === e.type)
                };
                C(a, "select", g);
                C(a, "unselect", g);
                return a
            },
            isValid: function() {
                return a.isNumber(this.y, !0) && 0 <= this.y
            },
            setVisible: function(a, g) {
                var e = this,
                    b = e.series,
                    f = b.chart,
                    d = b.options.ignoreHiddenPoint;
                g = t(g, d);
                a !== e.visible && (e.visible = e.options.visible =
                    a = void 0 === a ? !e.visible : a, b.options.data[q(e, b.data)] = e.options, F(["graphic", "dataLabel", "connector", "shadowGroup"], function(b) {
                        if (e[b]) e[b][a ? "show" : "hide"](!0)
                    }), e.legendItem && f.legend.colorizeItem(e, a), a || "hover" !== e.state || e.setState(""), d && (b.isDirty = !0), g && f.redraw())
            },
            slice: function(a, g, f) {
                var b = this.series;
                k(f, b.chart);
                t(g, !0);
                this.sliced = this.options.sliced = B(a) ? a : !this.sliced;
                b.options.data[q(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(a) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + a, e.r + a, {
                    innerR: this.shapeArgs.r,
                    start: e.start,
                    end: e.end
                })
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.arrayMax,
            F = a.defined,
            E = a.each,
            q = a.extend,
            f = a.format,
            t = a.map,
            p = a.merge,
            y = a.noop,
            u = a.pick,
            k = a.relativeLength,
            e = a.Series,
            g = a.seriesTypes,
            x = a.stableSort;
        a.distribute = function(a, e) {
            function b(a,
                b) {
                return a.target - b.target
            }
            var g, f = !0,
                l = a,
                k = [],
                p;
            p = 0;
            for (g = a.length; g--;) p += a[g].size;
            if (p > e) {
                x(a, function(a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (p = g = 0; p <= e;) p += a[g].size, g++;
                k = a.splice(g - 1, a.length)
            }
            x(a, b);
            for (a = t(a, function(a) {
                    return {
                        size: a.size,
                        targets: [a.target]
                    }
                }); f;) {
                for (g = a.length; g--;) f = a[g], p = (Math.min.apply(0, f.targets) + Math.max.apply(0, f.targets)) / 2, f.pos = Math.min(Math.max(0, p - f.size / 2), e - f.size);
                g = a.length;
                for (f = !1; g--;) 0 < g && a[g - 1].pos + a[g - 1].size > a[g].pos && (a[g - 1].size += a[g].size,
                    a[g - 1].targets = a[g - 1].targets.concat(a[g].targets), a[g - 1].pos + a[g - 1].size > e && (a[g - 1].pos = e - a[g - 1].size), a.splice(g, 1), f = !0)
            }
            g = 0;
            E(a, function(a) {
                var b = 0;
                E(a.targets, function() {
                    l[g].pos = a.pos + b;
                    b += l[g].size;
                    g++
                })
            });
            l.push.apply(l, k);
            x(l, b)
        };
        e.prototype.drawDataLabels = function() {
            var b = this,
                e = b.options,
                d = e.dataLabels,
                g = b.points,
                k, q, r = b.hasRendered || 0,
                x, c, w = u(d.defer, !0),
                t = b.chart.renderer;
            if (d.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(d), c = b.plotGroup("dataLabelsGroup", "data-labels",
                w && !r ? "hidden" : "visible", d.zIndex || 6), w && (c.attr({
                opacity: +r
            }), r || C(b, "afterAnimate", function() {
                b.visible && c.show(!0);
                c[e.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), q = d, E(g, function(g) {
                var l, m = g.dataLabel,
                    n, h, r = g.connector,
                    w = !m,
                    v;
                k = g.dlOptions || g.options && g.options.dataLabels;
                if (l = u(k && k.enabled, q.enabled) && null !== g.y) d = p(q, k), n = g.getLabelConfig(), x = d.format ? f(d.format, n) : d.formatter.call(n, d), v = d.style, n = d.rotation, v.color = u(d.color, v.color, b.color, "#000000"), "contrast" === v.color &&
                    (g.contrastColor = t.getContrast(g.color || b.color), v.color = d.inside || 0 > u(g.labelDistance, d.distance) || e.stacking ? g.contrastColor : "#000000"), e.cursor && (v.cursor = e.cursor), h = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: n,
                        padding: d.padding,
                        zIndex: 1
                    }, a.objectEach(h, function(a, b) {
                        void 0 === a && delete h[b]
                    });
                !m || l && F(x) ? l && F(x) && (m ? h.text = x : (m = g.dataLabel = t[n ? "text" : "label"](x, 0, -9999, d.shape, null, null, d.useHTML, null, "data-label"), m.addClass("highcharts-data-label-color-" +
                    g.colorIndex + " " + (d.className || "") + (d.useHTML ? "highcharts-tracker" : ""))), m.attr(h), m.css(v).shadow(d.shadow), m.added || m.add(c), b.alignDataLabel(g, m, d, null, w)) : (g.dataLabel = m = m.destroy(), r && (g.connector = r.destroy()))
            })
        };
        e.prototype.alignDataLabel = function(a, e, d, g, f) {
            var b = this.chart,
                l = b.inverted,
                k = u(a.plotX, -9999),
                c = u(a.plotY, -9999),
                n = e.getBBox(),
                p, v = d.rotation,
                x = d.align,
                m = this.visible && (a.series.forceDL || b.isInsidePlot(k, Math.round(c), l) || g && b.isInsidePlot(k, l ? g.x + 1 : g.y + g.height - 1, l)),
                t = "justify" ===
                u(d.overflow, "justify");
            if (m && (p = d.style.fontSize, p = b.renderer.fontMetrics(p, e).b, g = q({
                    x: l ? b.plotWidth - c : k,
                    y: Math.round(l ? b.plotHeight - k : c),
                    width: 0,
                    height: 0
                }, g), q(d, {
                    width: n.width,
                    height: n.height
                }), v ? (t = !1, k = b.renderer.rotCorr(p, v), k = {
                    x: g.x + d.x + g.width / 2 + k.x,
                    y: g.y + d.y + {
                        top: 0,
                        middle: .5,
                        bottom: 1
                    }[d.verticalAlign] * g.height
                }, e[f ? "attr" : "animate"](k).attr({
                    align: x
                }), c = (v + 720) % 360, c = 180 < c && 360 > c, "left" === x ? k.y -= c ? n.height : 0 : "center" === x ? (k.x -= n.width / 2, k.y -= n.height / 2) : "right" === x && (k.x -= n.width, k.y -= c ?
                    0 : n.height)) : (e.align(d, null, g), k = e.alignAttr), t ? a.isLabelJustified = this.justifyDataLabel(e, d, k, n, g, f) : u(d.crop, !0) && (m = b.isInsidePlot(k.x, k.y) && b.isInsidePlot(k.x + n.width, k.y + n.height)), d.shape && !v)) e[f ? "attr" : "animate"]({
                anchorX: l ? b.plotWidth - a.plotY : a.plotX,
                anchorY: l ? b.plotHeight - a.plotX : a.plotY
            });
            m || (e.attr({
                y: -9999
            }), e.placed = !1)
        };
        e.prototype.justifyDataLabel = function(a, e, d, g, f, k) {
            var b = this.chart,
                l = e.align,
                c = e.verticalAlign,
                n, p, v = a.box ? 0 : a.padding || 0;
            n = d.x + v;
            0 > n && ("right" === l ? e.align = "left" :
                e.x = -n, p = !0);
            n = d.x + g.width - v;
            n > b.plotWidth && ("left" === l ? e.align = "right" : e.x = b.plotWidth - n, p = !0);
            n = d.y + v;
            0 > n && ("bottom" === c ? e.verticalAlign = "top" : e.y = -n, p = !0);
            n = d.y + g.height - v;
            n > b.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = b.plotHeight - n, p = !0);
            p && (a.placed = !k, a.align(e, null, f));
            return p
        };
        g.pie && (g.pie.prototype.drawDataLabels = function() {
                var b = this,
                    g = b.data,
                    d, f = b.chart,
                    k = b.options.dataLabels,
                    p = u(k.connectorPadding, 10),
                    r = u(k.connectorWidth, 1),
                    x = f.plotWidth,
                    c = f.plotHeight,
                    w, q = b.center,
                    v = q[2] /
                    2,
                    t = q[1],
                    m, I, h, z, y = [
                        [],
                        []
                    ],
                    M, C, N, O, G = [0, 0, 0, 0];
                b.visible && (k.enabled || b._hasPointLabels) && (E(g, function(a) {
                        a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({
                            width: "auto"
                        }).css({
                            width: "auto",
                            textOverflow: "clip"
                        }), a.dataLabel.shortened = !1)
                    }), e.prototype.drawDataLabels.apply(b), E(g, function(a) {
                        a.dataLabel && a.visible && (y[a.half].push(a), a.dataLabel._pos = null)
                    }), E(y, function(e, g) {
                        var l, n, r = e.length,
                            w = [],
                            u;
                        if (r)
                            for (b.sortByAngle(e, g - .5), 0 < b.maxLabelDistance && (l = Math.max(0, t - v - b.maxLabelDistance),
                                    n = Math.min(t + v + b.maxLabelDistance, f.plotHeight), E(e, function(a) {
                                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, t - v - a.labelDistance), a.bottom = Math.min(t + v + a.labelDistance, f.plotHeight), u = a.dataLabel.getBBox().height || 21, a.positionsIndex = w.push({
                                            target: a.labelPos[1] - a.top + u / 2,
                                            size: u,
                                            rank: a.y
                                        }) - 1)
                                    }), a.distribute(w, n + u - l)), O = 0; O < r; O++) d = e[O], n = d.positionsIndex, h = d.labelPos, m = d.dataLabel, N = !1 === d.visible ? "hidden" : "inherit", l = h[1], w && F(w[n]) ? void 0 === w[n].pos ? N = "hidden" : (z = w[n].size, C = d.top + w[n].pos) :
                                C = l, delete d.positionIndex, M = k.justify ? q[0] + (g ? -1 : 1) * (v + d.labelDistance) : b.getX(C < d.top + 2 || C > d.bottom - 2 ? l : C, g, d), m._attr = {
                                    visibility: N,
                                    align: h[6]
                                }, m._pos = {
                                    x: M + k.x + ({
                                        left: p,
                                        right: -p
                                    }[h[6]] || 0),
                                    y: C + k.y - 10
                                }, h.x = M, h.y = C, null === b.options.size && (I = m.getBBox().width, l = null, M - I < p ? (l = Math.round(I - M + p), G[3] = Math.max(l, G[3])) : M + I > x - p && (l = Math.round(M + I - x + p), G[1] = Math.max(l, G[1])), 0 > C - z / 2 ? G[0] = Math.max(Math.round(-C + z / 2), G[0]) : C + z / 2 > c && (G[2] = Math.max(Math.round(C + z / 2 - c), G[2])), m.sideOverflow = l)
                    }), 0 === B(G) || this.verifyDataLabelOverflow(G)) &&
                    (this.placeDataLabels(), r && E(this.points, function(a) {
                        var c;
                        w = a.connector;
                        if ((m = a.dataLabel) && m._pos && a.visible && 0 < a.labelDistance) {
                            N = m._attr.visibility;
                            if (c = !w) a.connector = w = f.renderer.path().addClass("highcharts-data-label-connector highcharts-color-" + a.colorIndex).add(b.dataLabelsGroup), w.attr({
                                "stroke-width": r,
                                stroke: k.connectorColor || a.color || "#666666"
                            });
                            w[c ? "attr" : "animate"]({
                                d: b.connectorPath(a.labelPos)
                            });
                            w.attr("visibility", N)
                        } else w && (a.connector = w.destroy())
                    }))
            }, g.pie.prototype.connectorPath =
            function(a) {
                var b = a.x,
                    d = a.y;
                return u(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), d, "C", b, d, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), d, "L", a[2], a[3], "L", a[4], a[5]]
            }, g.pie.prototype.placeDataLabels = function() {
                E(this.points, function(a) {
                    var b = a.dataLabel;
                    b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                        width: b._attr.width + "px",
                        textOverflow: "ellipsis"
                    }), b.shortened = !0), b.attr(b._attr), b[b.moved ?
                        "animate" : "attr"](a), b.moved = !0) : b && b.attr({
                        y: -9999
                    }))
                }, this)
            }, g.pie.prototype.alignDataLabel = y, g.pie.prototype.verifyDataLabelOverflow = function(a) {
                var b = this.center,
                    d = this.options,
                    e = d.center,
                    g = d.minSize || 80,
                    f, r;
                null !== e[0] ? f = Math.max(b[2] - Math.max(a[1], a[3]), g) : (f = Math.max(b[2] - a[1] - a[3], g), b[0] += (a[3] - a[1]) / 2);
                null !== e[1] ? f = Math.max(Math.min(f, b[2] - Math.max(a[0], a[2])), g) : (f = Math.max(Math.min(f, b[2] - a[0] - a[2]), g), b[1] += (a[0] - a[2]) / 2);
                f < b[2] ? (b[2] = f, b[3] = Math.min(k(d.innerSize || 0, f), f), this.translate(b),
                    this.drawDataLabels && this.drawDataLabels()) : r = !0;
                return r
            });
        g.column && (g.column.prototype.alignDataLabel = function(a, g, d, f, k) {
            var b = this.chart.inverted,
                n = a.series,
                l = a.dlBox || a.shapeArgs,
                c = u(a.below, a.plotY > u(this.translatedThreshold, n.yAxis.len)),
                w = u(d.inside, !!this.options.stacking);
            l && (f = p(l), 0 > f.y && (f.height += f.y, f.y = 0), l = f.y + f.height - n.yAxis.len, 0 < l && (f.height -= l), b && (f = {
                x: n.yAxis.len - f.y - f.height,
                y: n.xAxis.len - f.x - f.width,
                width: f.height,
                height: f.width
            }), w || (b ? (f.x += c ? 0 : f.width, f.width = 0) : (f.y +=
                c ? f.height : 0, f.height = 0)));
            d.align = u(d.align, !b || w ? "center" : c ? "right" : "left");
            d.verticalAlign = u(d.verticalAlign, b || w ? "middle" : c ? "top" : "bottom");
            e.prototype.alignDataLabel.call(this, a, g, d, f, k);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({
                color: a.contrastColor
            })
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            B = a.each,
            F = a.pick,
            E = a.addEvent;
        C.prototype.callbacks.push(function(a) {
            function f() {
                var f = [];
                B(a.series || [], function(a) {
                    var p = a.options.dataLabels,
                        q = a.dataLabelCollections || ["dataLabel"];
                    (p.enabled ||
                        a._hasPointLabels) && !p.allowOverlap && a.visible && B(q, function(k) {
                        B(a.points, function(a) {
                            a[k] && (a[k].labelrank = F(a.labelrank, a.shapeArgs && a.shapeArgs.height), f.push(a[k]))
                        })
                    })
                });
                a.hideOverlappingLabels(f)
            }
            f();
            E(a, "redraw", f)
        });
        C.prototype.hideOverlappingLabels = function(a) {
            var f = a.length,
                q, p, y, u, k, e, g, x, b, l = function(a, b, e, g, f, k, c, l) {
                    return !(f > a + e || f + c < a || k > b + g || k + l < b)
                };
            for (p = 0; p < f; p++)
                if (q = a[p]) q.oldOpacity = q.opacity, q.newOpacity = 1;
            a.sort(function(a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (p =
                0; p < f; p++)
                for (y = a[p], q = p + 1; q < f; ++q)
                    if (u = a[q], y && u && y !== u && y.placed && u.placed && 0 !== y.newOpacity && 0 !== u.newOpacity && (k = y.alignAttr, e = u.alignAttr, g = y.parentGroup, x = u.parentGroup, b = 2 * (y.box ? 0 : y.padding), k = l(k.x + g.translateX, k.y + g.translateY, y.width - b, y.height - b, e.x + x.translateX, e.y + x.translateY, u.width - b, u.height - b)))(y.labelrank < u.labelrank ? y : u).newOpacity = 0;
            B(a, function(a) {
                var b, d;
                a && (d = a.newOpacity, a.oldOpacity !== d && a.placed && (d ? a.show(!0) : b = function() {
                    a.hide()
                }, a.alignAttr.opacity = d, a[a.isOld ? "animate" :
                    "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.Chart,
            F = a.createElement,
            E = a.css,
            q = a.defaultOptions,
            f = a.defaultPlotOptions,
            t = a.each,
            p = a.extend,
            y = a.fireEvent,
            u = a.hasTouch,
            k = a.inArray,
            e = a.isObject,
            g = a.Legend,
            x = a.merge,
            b = a.pick,
            l = a.Point,
            d = a.Series,
            A = a.seriesTypes,
            n = a.svg,
            H;
        H = a.TrackerMixin = {
            drawTrackerPoint: function() {
                var a = this,
                    b = a.chart.pointer,
                    c = function(a) {
                        var c = b.getPointFromEvent(a);
                        if (void 0 !== c) c.onMouseOver(a)
                    };
                t(a.points, function(a) {
                    a.graphic && (a.graphic.element.point =
                        a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (t(a.trackerGroups, function(d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function(a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (u) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(E).css({
                            cursor: a.options.cursor
                        })
                    }
                }), a._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var a = this,
                    b = a.options,
                    c = b.trackByArea,
                    d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length,
                    g = a.chart,
                    f = g.pointer,
                    m =
                    g.renderer,
                    k = g.options.tooltip.snap,
                    h = a.tracker,
                    l, p = function() {
                        if (g.hoverSeries !== a) a.onMouseOver()
                    },
                    x = "rgba(192,192,192," + (n ? .0001 : .002) + ")";
                if (e && !c)
                    for (l = e + 1; l--;) "M" === d[l] && d.splice(l + 1, 0, d[l + 1] - k, d[l + 2], "L"), (l && "M" === d[l] || l === e) && d.splice(l, 0, "L", d[l - 2] + k, d[l - 1]);
                h ? h.attr({
                    d: d
                }) : a.graph && (a.tracker = m.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: x,
                    fill: c ? x : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * k),
                    zIndex: 2
                }).add(a.group), t([a.tracker, a.markerGroup],
                    function(a) {
                        a.addClass("highcharts-tracker").on("mouseover", p).on("mouseout", function(a) {
                            f.onTrackerMouseOut(a)
                        });
                        b.cursor && a.css({
                            cursor: b.cursor
                        });
                        if (u) a.on("touchstart", p)
                    }))
            }
        };
        A.column && (A.column.prototype.drawTracker = H.drawTrackerPoint);
        A.pie && (A.pie.prototype.drawTracker = H.drawTrackerPoint);
        A.scatter && (A.scatter.prototype.drawTracker = H.drawTrackerPoint);
        p(g.prototype, {
            setItemEvents: function(a, b, c) {
                var d = this,
                    e = d.chart.renderer.boxWrapper,
                    g = "highcharts-legend-" + (a.series ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function() {
                    a.setState("hover");
                    e.addClass(g);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function() {
                    b.css(x(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    e.removeClass(g);
                    a.setState()
                }).on("click", function(b) {
                    var c = function() {
                        a.setVisible && a.setVisible()
                    };
                    b = {
                        browserEvent: b
                    };
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : y(a, "legendItemClick", b, c)
                })
            },
            createCheckboxForItem: function(a) {
                a.checkbox = F("input", {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    },
                    this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function(b) {
                    y(a.series || a, "checkboxClick", {
                        checked: b.target.checked,
                        item: a
                    }, function() {
                        a.select()
                    })
                })
            }
        });
        q.legend.itemStyle.cursor = "pointer";
        p(B.prototype, {
            showResetZoom: function() {
                var a = this,
                    b = q.lang,
                    c = a.options.chart.resetZoomButton,
                    d = c.theme,
                    e = d.states,
                    g = "chart" === c.relativeTo ? null : "plotBox";
                this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function() {
                    a.zoomOut()
                }, d, e && e.hover).attr({
                    align: c.position.align,
                    title: b.resetZoomTitle
                }).addClass("highcharts-reset-zoom").add().align(c.position, !1, g)
            },
            zoomOut: function() {
                var a = this;
                y(a, "selection", {
                    resetSelection: !0
                }, function() {
                    a.zoom()
                })
            },
            zoom: function(a) {
                var d, c = this.pointer,
                    g = !1,
                    f;
                !a || a.resetSelection ? t(this.axes, function(a) {
                    d = a.zoom()
                }) : t(a.xAxis.concat(a.yAxis), function(a) {
                    var b = a.axis;
                    c[b.isXAxis ? "zoomX" : "zoomY"] && (d = b.zoom(a.min, a.max), b.displayBtn && (g = !0))
                });
                f = this.resetZoomButton;
                g && !f ? this.showResetZoom() : !g && e(f) && (this.resetZoomButton = f.destroy());
                d && this.redraw(b(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function(a, b) {
                var c = this,
                    d = c.hoverPoints,
                    e;
                d && t(d, function(a) {
                    a.setState()
                });
                t("xy" === b ? [1, 0] : [1], function(b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz,
                        g = a[d ? "chartX" : "chartY"],
                        d = d ? "mouseDownX" : "mouseDownY",
                        f = c[d],
                        h = (b.pointRange || 0) / 2,
                        k = b.getExtremes(),
                        l = b.toValue(f - g, !0) + h,
                        h = b.toValue(f + b.len - g, !0) - h,
                        n = h < l,
                        f = n ? h : l,
                        l = n ? l : h,
                        h = Math.min(k.dataMin, b.toValue(b.toPixels(k.min) - b.minPixelPadding)),
                        n = Math.max(k.dataMax, b.toValue(b.toPixels(k.max) + b.minPixelPadding)),
                        r;
                    r = h - f;
                    0 < r && (l += r, f = h);
                    r = l - n;
                    0 < r &&
                        (l = n, f -= r);
                    b.series.length && f !== k.min && l !== k.max && (b.setExtremes(f, l, !1, !1, {
                        trigger: "pan"
                    }), e = !0);
                    c[d] = g
                });
                e && c.redraw(!1);
                E(c.container, {
                    cursor: "move"
                })
            }
        });
        p(l.prototype, {
            select: function(a, d) {
                var c = this,
                    e = c.series,
                    g = e.chart;
                a = b(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {
                    accumulate: d
                }, function() {
                    c.selected = c.options.selected = a;
                    e.options.data[k(c, e.data)] = c.options;
                    c.setState(a && "select");
                    d || t(g.getSelectedPoints(), function(a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, e.options.data[k(a,
                            e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(a) {
                var b = this.series.chart.pointer;
                this.firePointEvent("mouseOver");
                b.runPointActions(a, this)
            },
            onMouseOut: function() {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                t(a.hoverPoints || [], function(a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var b = this,
                        d = x(b.series.options.point, b.options).events;
                    b.events = d;
                    a.objectEach(d, function(a, d) {
                        C(b, d, a)
                    });
                    this.hasImportedEvents = !0
                }
            },
            setState: function(a, d) {
                var c = Math.floor(this.plotX),
                    e = this.plotY,
                    g = this.series,
                    k = g.options.states[a] || {},
                    l = f[g.type].marker && g.options.marker,
                    m = l && !1 === l.enabled,
                    n = l && l.states && l.states[a] || {},
                    h = !1 === n.enabled,
                    r = g.stateMarkerGraphic,
                    x = this.marker || {},
                    q = g.chart,
                    u = g.halo,
                    t, y = l && g.markerAttribs;
                a = a || "";
                if (!(a === this.state && !d || this.selected && "select" !== a || !1 === k.enabled || a && (h || m && !1 === n.enabled) || a && x.states && x.states[a] && !1 === x.states[a].enabled)) {
                    y && (t = g.markerAttribs(this,
                        a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.attr(g.pointAttribs(this, a)), t && this.graphic.animate(t, b(q.options.chart.animation, n.animation, l.animation)), r && r.hide();
                    else {
                        if (a && n) {
                            l = x.symbol || g.symbol;
                            r && r.currentSymbol !== l && (r = r.destroy());
                            if (r) r[d ? "animate" : "attr"]({
                                x: t.x,
                                y: t.y
                            });
                            else l && (g.stateMarkerGraphic = r = q.renderer.symbol(l, t.x, t.y, t.width, t.height).add(g.markerGroup), r.currentSymbol =
                                l);
                            r && r.attr(g.pointAttribs(this, a))
                        }
                        r && (r[a && q.isInsidePlot(c, e, q.inverted) ? "show" : "hide"](), r.element.point = this)
                    }(c = k.halo) && c.size ? (u || (g.halo = u = q.renderer.path().add(y ? g.markerGroup : g.group)), u[d ? "animate" : "attr"]({
                        d: this.haloPath(c.size)
                    }), u.attr({
                        "class": "highcharts-halo highcharts-color-" + b(this.colorIndex, g.colorIndex)
                    }), u.point = this, u.attr(p({
                        fill: this.color || g.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : u && u.point && u.point.haloPath && u.animate({
                        d: u.point.haloPath(0)
                    });
                    this.state =
                        a
                }
            },
            haloPath: function(a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        p(d.prototype, {
            onMouseOver: function() {
                var a = this.chart,
                    b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && y(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            },
            onMouseOut: function() {
                var a = this.options,
                    b = this.chart,
                    c = b.tooltip,
                    d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && y(this, "mouseOut");
                !c || this.stickyTracking ||
                    c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            },
            setState: function(a) {
                var d = this,
                    c = d.options,
                    e = d.graph,
                    g = c.states,
                    f = c.lineWidth,
                    c = 0;
                a = a || "";
                if (d.state !== a && (t([d.group, d.markerGroup, d.dataLabelsGroup], function(b) {
                        b && (d.state && b.removeClass("highcharts-series-" + d.state), a && b.addClass("highcharts-series-" + a))
                    }), d.state = a, !g[a] || !1 !== g[a].enabled) && (a && (f = g[a].lineWidth || f + (g[a].lineWidthPlus || 0)), e && !e.dashstyle))
                    for (f = {
                            "stroke-width": f
                        }, e.animate(f, b(d.chart.options.chart.animation, g[a] &&
                            g[a].animation)); d["zone-graph-" + c];) d["zone-graph-" + c].attr(f), c += 1
            },
            setVisible: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = c.legendItem,
                    g, f = d.options.chart.ignoreHiddenSeries,
                    m = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !m : a) ? "show" : "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function(a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && t(d.series,
                    function(a) {
                        a.options.stacking && a.visible && (a.isDirty = !0)
                    });
                t(c.linkedSeries, function(b) {
                    b.setVisible(a, !1)
                });
                f && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                y(c, g)
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                y(this, a ? "select" : "unselect")
            },
            drawTracker: H.drawTrackerGraph
        })
    })(L);
    (function(a) {
        var C = a.Chart,
            B = a.each,
            F = a.inArray,
            E = a.isArray,
            q = a.isObject,
            f = a.pick,
            t = a.splat;
        C.prototype.setResponsive =
            function(f) {
                var p = this.options.responsive,
                    q = [],
                    k = this.currentResponsive;
                p && p.rules && B(p.rules, function(e) {
                    void 0 === e._id && (e._id = a.uniqueKey());
                    this.matchResponsiveRule(e, q, f)
                }, this);
                var e = a.merge.apply(0, a.map(q, function(e) {
                        return a.find(p.rules, function(a) {
                            return a._id === e
                        }).chartOptions
                    })),
                    q = q.toString() || void 0;
                q !== (k && k.ruleIds) && (k && this.update(k.undoOptions, f), q ? (this.currentResponsive = {
                    ruleIds: q,
                    mergedOptions: e,
                    undoOptions: this.currentOptions(e)
                }, this.update(e, f)) : this.currentResponsive = void 0)
            };
        C.prototype.matchResponsiveRule = function(a, q) {
            var p = a.condition;
            (p.callback || function() {
                return this.chartWidth <= f(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= f(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= f(p.minWidth, 0) && this.chartHeight >= f(p.minHeight, 0)
            }).call(this) && q.push(a._id)
        };
        C.prototype.currentOptions = function(f) {
            function p(f, e, g, x) {
                var b;
                a.objectEach(f, function(a, d) {
                    if (!x && -1 < F(d, ["series", "xAxis", "yAxis"]))
                        for (f[d] = t(f[d]), g[d] = [], b = 0; b < f[d].length; b++) e[d][b] && (g[d][b] = {}, p(a[b],
                            e[d][b], g[d][b], x + 1));
                    else q(a) ? (g[d] = E(a) ? [] : {}, p(a, e[d] || {}, g[d], x + 1)) : g[d] = e[d] || null
                })
            }
            var u = {};
            p(f, this.options, u, 0);
            return u
        }
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.Axis,
            F = a.Chart,
            E = a.css,
            q = a.dateFormat,
            f = a.defined,
            t = a.each,
            p = a.extend,
            y = a.noop,
            u = a.timeUnits,
            k = a.wrap;
        k(a.Series.prototype, "init", function(a) {
            var e;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            (e = this.xAxis) && e.options.ordinal && C(this, "updatedData", function() {
                delete e.ordinalIndex
            })
        });
        k(B.prototype, "getTimeTicks", function(a,
            g, k, b, l, d, p, n) {
            var e = 0,
                r, x, c = {},
                w, t, v, D = [],
                m = -Number.MAX_VALUE,
                I = this.options.tickPixelInterval;
            if (!this.options.ordinal && !this.options.breaks || !d || 3 > d.length || void 0 === k) return a.call(this, g, k, b, l);
            t = d.length;
            for (r = 0; r < t; r++) {
                v = r && d[r - 1] > b;
                d[r] < k && (e = r);
                if (r === t - 1 || d[r + 1] - d[r] > 5 * p || v) {
                    if (d[r] > m) {
                        for (x = a.call(this, g, d[e], d[r], l); x.length && x[0] <= m;) x.shift();
                        x.length && (m = x[x.length - 1]);
                        D = D.concat(x)
                    }
                    e = r + 1
                }
                if (v) break
            }
            a = x.info;
            if (n && a.unitRange <= u.hour) {
                r = D.length - 1;
                for (e = 1; e < r; e++) q("%d", D[e]) !== q("%d",
                    D[e - 1]) && (c[D[e]] = "day", w = !0);
                w && (c[D[0]] = "day");
                a.higherRanks = c
            }
            D.info = a;
            if (n && f(I)) {
                n = a = D.length;
                r = [];
                var h;
                for (w = []; n--;) e = this.translate(D[n]), h && (w[n] = h - e), r[n] = h = e;
                w.sort();
                w = w[Math.floor(w.length / 2)];
                w < .6 * I && (w = null);
                n = D[a - 1] > b ? a - 1 : a;
                for (h = void 0; n--;) e = r[n], b = Math.abs(h - e), h && b < .8 * I && (null === w || b < .8 * w) ? (c[D[n]] && !c[D[n + 1]] ? (b = n + 1, h = e) : b = n, D.splice(b, 1)) : h = e
            }
            return D
        });
        p(B.prototype, {
            beforeSetTickPositions: function() {
                var a, g = [],
                    f = !1,
                    b, k = this.getExtremes(),
                    d = k.min,
                    p = k.max,
                    n, q = this.isXAxis &&
                    !!this.options.breaks,
                    k = this.options.ordinal,
                    r = this.chart.options.chart.ignoreHiddenSeries;
                if (k || q) {
                    t(this.series, function(b, c) {
                        if (!(r && !1 === b.visible || !1 === b.takeOrdinalPosition && !q) && (g = g.concat(b.processedXData), a = g.length, g.sort(function(a, b) {
                                return a - b
                            }), a))
                            for (c = a - 1; c--;) g[c] === g[c + 1] && g.splice(c, 1)
                    });
                    a = g.length;
                    if (2 < a) {
                        b = g[1] - g[0];
                        for (n = a - 1; n-- && !f;) g[n + 1] - g[n] !== b && (f = !0);
                        !this.options.keepOrdinalPadding && (g[0] - d > b || p - g[g.length - 1] > b) && (f = !0)
                    }
                    f ? (this.ordinalPositions = g, b = this.ordinal2lin(Math.max(d,
                        g[0]), !0), n = Math.max(this.ordinal2lin(Math.min(p, g[g.length - 1]), !0), 1), this.ordinalSlope = p = (p - d) / (n - b), this.ordinalOffset = d - b * p) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = void 0
                }
                this.isOrdinal = k && f;
                this.groupIntervalFactor = null
            },
            val2lin: function(a, g) {
                var e = this.ordinalPositions;
                if (e) {
                    var b = e.length,
                        f, d;
                    for (f = b; f--;)
                        if (e[f] === a) {
                            d = f;
                            break
                        }
                    for (f = b - 1; f--;)
                        if (a > e[f] || 0 === f) {
                            a = (a - e[f]) / (e[f + 1] - e[f]);
                            d = f + a;
                            break
                        }
                    g = g ? d : this.ordinalSlope * (d || 0) + this.ordinalOffset
                } else g = a;
                return g
            },
            lin2val: function(a,
                g) {
                var e = this.ordinalPositions;
                if (e) {
                    var b = this.ordinalSlope,
                        f = this.ordinalOffset,
                        d = e.length - 1,
                        k;
                    if (g) 0 > a ? a = e[0] : a > d ? a = e[d] : (d = Math.floor(a), k = a - d);
                    else
                        for (; d--;)
                            if (g = b * d + f, a >= g) {
                                b = b * (d + 1) + f;
                                k = (a - g) / (b - g);
                                break
                            } return void 0 !== k && void 0 !== e[d] ? e[d] + (k ? k * (e[d + 1] - e[d]) : 0) : a
                }
                return a
            },
            getExtendedPositions: function() {
                var a = this.chart,
                    g = this.series[0].currentDataGrouping,
                    f = this.ordinalIndex,
                    b = g ? g.count + g.unitName : "raw",
                    k = this.getExtremes(),
                    d, p;
                f || (f = this.ordinalIndex = {});
                f[b] || (d = {
                    series: [],
                    chart: a,
                    getExtremes: function() {
                        return {
                            min: k.dataMin,
                            max: k.dataMax
                        }
                    },
                    options: {
                        ordinal: !0
                    },
                    val2lin: B.prototype.val2lin,
                    ordinal2lin: B.prototype.ordinal2lin
                }, t(this.series, function(b) {
                    p = {
                        xAxis: d,
                        xData: b.xData,
                        chart: a,
                        destroyGroupedData: y
                    };
                    p.options = {
                        dataGrouping: g ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [
                                [g.unitName, [g.count]]
                            ]
                        } : {
                            enabled: !1
                        }
                    };
                    b.processData.apply(p);
                    d.series.push(p)
                }), this.beforeSetTickPositions.apply(d), f[b] = d.ordinalPositions);
                return f[b]
            },
            getGroupIntervalFactor: function(a, g, f) {
                var b;
                f = f.processedXData;
                var e = f.length,
                    d = [];
                b =
                    this.groupIntervalFactor;
                if (!b) {
                    for (b = 0; b < e - 1; b++) d[b] = f[b + 1] - f[b];
                    d.sort(function(a, b) {
                        return a - b
                    });
                    d = d[Math.floor(e / 2)];
                    a = Math.max(a, f[0]);
                    g = Math.min(g, f[e - 1]);
                    this.groupIntervalFactor = b = e * d / (g - a)
                }
                return b
            },
            postProcessTickInterval: function(a) {
                var e = this.ordinalSlope;
                return e ? this.options.breaks ? this.closestPointRange : a / (e / this.closestPointRange) : a
            }
        });
        B.prototype.ordinal2lin = B.prototype.val2lin;
        k(F.prototype, "pan", function(a, g) {
            var e = this.xAxis[0],
                b = g.chartX,
                f = !1;
            if (e.options.ordinal && e.series.length) {
                var d =
                    this.mouseDownX,
                    k = e.getExtremes(),
                    n = k.dataMax,
                    p = k.min,
                    r = k.max,
                    q = this.hoverPoints,
                    c = e.closestPointRange,
                    d = (d - b) / (e.translationSlope * (e.ordinalSlope || c)),
                    w = {
                        ordinalPositions: e.getExtendedPositions()
                    },
                    c = e.lin2val,
                    u = e.val2lin,
                    v;
                w.ordinalPositions ? 1 < Math.abs(d) && (q && t(q, function(a) {
                    a.setState()
                }), 0 > d ? (q = w, v = e.ordinalPositions ? e : w) : (q = e.ordinalPositions ? e : w, v = w), w = v.ordinalPositions, n > w[w.length - 1] && w.push(n), this.fixedRange = r - p, d = e.toFixedRange(null, null, c.apply(q, [u.apply(q, [p, !0]) + d, !0]), c.apply(v, [u.apply(v, [r, !0]) + d, !0])), d.min >= Math.min(k.dataMin, p) && d.max <= Math.max(n, r) && e.setExtremes(d.min, d.max, !0, !1, {
                    trigger: "pan"
                }), this.mouseDownX = b, E(this.container, {
                    cursor: "move"
                })) : f = !0
            } else f = !0;
            f && a.apply(this, Array.prototype.slice.call(arguments, 1))
        })
    })(L);
    (function(a) {
        function C() {
            return Array.prototype.slice.call(arguments, 1)
        }

        function B(a) {
            a.apply(this);
            this.drawBreaks(this.xAxis, ["x"]);
            this.drawBreaks(this.yAxis, F(this.pointArrayMap, ["y"]))
        }
        var F = a.pick,
            E = a.wrap,
            q = a.each,
            f = a.extend,
            t = a.isArray,
            p = a.fireEvent,
            y = a.Axis,
            u = a.Series;
        f(y.prototype, {
            isInBreak: function(a, e) {
                var g = a.repeat || Infinity,
                    f = a.from,
                    b = a.to - a.from;
                e = e >= f ? (e - f) % g : g - (f - e) % g;
                return a.inclusive ? e <= b : e < b && 0 !== e
            },
            isInAnyBreak: function(a, e) {
                var g = this.options.breaks,
                    f = g && g.length,
                    b, k, d;
                if (f) {
                    for (; f--;) this.isInBreak(g[f], a) && (b = !0, k || (k = F(g[f].showPoints, this.isXAxis ? !1 : !0)));
                    d = b && e ? b && !k : b
                }
                return d
            }
        });
        E(y.prototype, "setTickPositions", function(a) {
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (this.options.breaks) {
                var e = this.tickPositions,
                    g = this.tickPositions.info,
                    f = [],
                    b;
                for (b = 0; b < e.length; b++) this.isInAnyBreak(e[b]) || f.push(e[b]);
                this.tickPositions = f;
                this.tickPositions.info = g
            }
        });
        E(y.prototype, "init", function(a, e, g) {
            var f = this;
            g.breaks && g.breaks.length && (g.ordinal = !1);
            a.call(this, e, g);
            a = this.options.breaks;
            f.isBroken = t(a) && !!a.length;
            f.isBroken && (f.val2lin = function(a) {
                    var b = a,
                        d, e;
                    for (e = 0; e < f.breakArray.length; e++)
                        if (d = f.breakArray[e], d.to <= a) b -= d.len;
                        else if (d.from >= a) break;
                    else if (f.isInBreak(d, a)) {
                        b -= a - d.from;
                        break
                    }
                    return b
                }, f.lin2val =
                function(a) {
                    var b, d;
                    for (d = 0; d < f.breakArray.length && !(b = f.breakArray[d], b.from >= a); d++) b.to < a ? a += b.len : f.isInBreak(b, a) && (a += b.len);
                    return a
                }, f.setExtremes = function(a, e, d, g, f) {
                    for (; this.isInAnyBreak(a);) a -= this.closestPointRange;
                    for (; this.isInAnyBreak(e);) e -= this.closestPointRange;
                    y.prototype.setExtremes.call(this, a, e, d, g, f)
                }, f.setAxisTranslation = function(a) {
                    y.prototype.setAxisTranslation.call(this, a);
                    a = f.options.breaks;
                    var b = [],
                        d = [],
                        e = 0,
                        g, k, r = f.userMin || f.min,
                        t = f.userMax || f.max,
                        c = F(f.pointRangePadding,
                            0),
                        w, u;
                    q(a, function(a) {
                        k = a.repeat || Infinity;
                        f.isInBreak(a, r) && (r += a.to % k - r % k);
                        f.isInBreak(a, t) && (t -= t % k - a.from % k)
                    });
                    q(a, function(a) {
                        w = a.from;
                        for (k = a.repeat || Infinity; w - k > r;) w -= k;
                        for (; w < r;) w += k;
                        for (u = w; u < t; u += k) b.push({
                            value: u,
                            move: "in"
                        }), b.push({
                            value: u + (a.to - a.from),
                            move: "out",
                            size: a.breakSize
                        })
                    });
                    b.sort(function(a, b) {
                        return a.value === b.value ? ("in" === a.move ? 0 : 1) - ("in" === b.move ? 0 : 1) : a.value - b.value
                    });
                    g = 0;
                    w = r;
                    q(b, function(a) {
                        g += "in" === a.move ? 1 : -1;
                        1 === g && "in" === a.move && (w = a.value);
                        0 === g && (d.push({
                            from: w,
                            to: a.value,
                            len: a.value - w - (a.size || 0)
                        }), e += a.value - w - (a.size || 0))
                    });
                    f.breakArray = d;
                    f.unitLength = t - r - e + c;
                    p(f, "afterBreaks");
                    f.options.staticScale ? f.transA = f.options.staticScale : f.unitLength && (f.transA *= (t - f.min + c) / f.unitLength);
                    c && (f.minPixelPadding = f.transA * f.minPointOffset);
                    f.min = r;
                    f.max = t
                })
        });
        E(u.prototype, "generatePoints", function(a) {
            a.apply(this, C(arguments));
            var e = this.xAxis,
                g = this.yAxis,
                f = this.points,
                b, k = f.length,
                d = this.options.connectNulls,
                p;
            if (e && g && (e.options.breaks || g.options.breaks))
                for (; k--;) b =
                    f[k], p = null === b.y && !1 === d, p || !e.isInAnyBreak(b.x, !0) && !g.isInAnyBreak(b.y, !0) || (f.splice(k, 1), this.data[k] && this.data[k].destroyElements())
        });
        a.Series.prototype.drawBreaks = function(a, e) {
            var g = this,
                f = g.points,
                b, k, d, t;
            a && q(e, function(e) {
                b = a.breakArray || [];
                k = a.isXAxis ? a.min : F(g.options.threshold, a.min);
                q(f, function(g) {
                    t = F(g["stack" + e.toUpperCase()], g[e]);
                    q(b, function(b) {
                        d = !1;
                        if (k < b.from && t > b.to || k > b.from && t < b.from) d = "pointBreak";
                        else if (k < b.from && t > b.from && t < b.to || k > b.from && t > b.to && t < b.from) d = "pointInBreak";
                        d && p(a, d, {
                            point: g,
                            brk: b
                        })
                    })
                })
            })
        };
        a.Series.prototype.gappedPath = function() {
            var a = this.options.gapSize,
                e = this.points.slice(),
                g = e.length - 1;
            if (a && 0 < g)
                for (; g--;) e[g + 1].x - e[g].x > this.closestPointRange * a && e.splice(g + 1, 0, {
                    isNull: !0
                });
            return this.getGraphPath(e)
        };
        E(a.seriesTypes.column.prototype, "drawPoints", B);
        E(a.Series.prototype, "drawPoints", B)
    })(L);
    (function(a) {
        var C = a.arrayMax,
            B = a.arrayMin,
            F = a.Axis,
            E = a.defaultPlotOptions,
            q = a.defined,
            f = a.each,
            t = a.extend,
            p = a.format,
            y = a.isNumber,
            u = a.merge,
            k = a.pick,
            e = a.Point,
            g = a.Tooltip,
            x = a.wrap,
            b = a.Series.prototype,
            l = b.processData,
            d = b.generatePoints,
            A = b.destroy,
            n = {
                approximation: "average",
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e",
                        "-%A, %b %e, %Y"
                    ],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            H = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    approximation: "sum",
                    groupPixelWidth: 10
                },
                arearange: {
                    approximation: "range"
                },
                areasplinerange: {
                    approximation: "range"
                },
                columnrange: {
                    approximation: "range",
                    groupPixelWidth: 10
                },
                candlestick: {
                    approximation: "ohlc",
                    groupPixelWidth: 10
                },
                ohlc: {
                    approximation: "ohlc",
                    groupPixelWidth: 5
                }
            },
            r = a.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ],
            J = {
                sum: function(a) {
                    var b = a.length,
                        c;
                    if (!b && a.hasNulls) c = null;
                    else if (b)
                        for (c = 0; b--;) c += a[b];
                    return c
                },
                average: function(a) {
                    var b = a.length;
                    a = J.sum(a);
                    y(a) && b && (a /= b);
                    return a
                },
                averages: function() {
                    var a = [];
                    f(arguments, function(b) {
                        a.push(J.average(b))
                    });
                    return a
                },
                open: function(a) {
                    return a.length ? a[0] : a.hasNulls ? null : void 0
                },
                high: function(a) {
                    return a.length ? C(a) : a.hasNulls ? null : void 0
                },
                low: function(a) {
                    return a.length ?
                        B(a) : a.hasNulls ? null : void 0
                },
                close: function(a) {
                    return a.length ? a[a.length - 1] : a.hasNulls ? null : void 0
                },
                ohlc: function(a, b, d, e) {
                    a = J.open(a);
                    b = J.high(b);
                    d = J.low(d);
                    e = J.close(e);
                    if (y(a) || y(b) || y(d) || y(e)) return [a, b, d, e]
                },
                range: function(a, b) {
                    a = J.low(a);
                    b = J.high(b);
                    if (y(a) || y(b)) return [a, b]
                }
            };
        b.groupData = function(a, b, d, e) {
            var c = this.data,
                g = this.options.data,
                k = [],
                h = [],
                l = [],
                p = a.length,
                w, r, v = !!b,
                q = [];
            e = "function" === typeof e ? e : J[e] || H[this.type] && J[H[this.type].approximation] || J[n.approximation];
            var t = this.pointArrayMap,
                u = t && t.length,
                x = 0;
            r = 0;
            var A, K;
            u ? f(t, function() {
                q.push([])
            }) : q.push([]);
            A = u || 1;
            for (K = 0; K <= p && !(a[K] >= d[0]); K++);
            for (K; K <= p; K++) {
                for (; void 0 !== d[x + 1] && a[K] >= d[x + 1] || K === p;) {
                    w = d[x];
                    this.dataGroupInfo = {
                        start: r,
                        length: q[0].length
                    };
                    r = e.apply(this, q);
                    void 0 !== r && (k.push(w), h.push(r), l.push(this.dataGroupInfo));
                    r = K;
                    for (w = 0; w < A; w++) q[w].length = 0, q[w].hasNulls = !1;
                    x += 1;
                    if (K === p) break
                }
                if (K === p) break;
                if (t) {
                    w = this.cropStart + K;
                    var B = c && c[w] || this.pointClass.prototype.applyOptions.apply({
                            series: this
                        }, [g[w]]),
                        C;
                    for (w =
                        0; w < u; w++) C = B[t[w]], y(C) ? q[w].push(C) : null === C && (q[w].hasNulls = !0)
                } else w = v ? b[K] : null, y(w) ? q[0].push(w) : null === w && (q[0].hasNulls = !0)
            }
            return [k, h, l]
        };
        b.processData = function() {
            var a = this.chart,
                d = this.options.dataGrouping,
                e = !1 !== this.allowDG && d && k(d.enabled, a.options.isStock),
                g = this.visible || !a.options.chart.ignoreHiddenSeries,
                f;
            this.forceCrop = e;
            this.groupPixelWidth = null;
            this.hasProcessed = !0;
            if (!1 !== l.apply(this, arguments) && e) {
                this.destroyGroupedData();
                var m = this.processedXData,
                    n = this.processedYData,
                    h = a.plotSizeX,
                    a = this.xAxis,
                    p = a.options.ordinal,
                    t = this.groupPixelWidth = a.getGroupPixelWidth && a.getGroupPixelWidth();
                if (t) {
                    this.isDirty = f = !0;
                    var u = a.getExtremes(),
                        e = u.min,
                        u = u.max,
                        p = p && a.getGroupIntervalFactor(e, u, this) || 1,
                        h = t * (u - e) / h * p,
                        t = a.getTimeTicks(a.normalizeTimeTickInterval(h, d.units || r), Math.min(e, m[0]), Math.max(u, m[m.length - 1]), a.options.startOfWeek, m, this.closestPointRange),
                        m = b.groupData.apply(this, [m, n, t, d.approximation]),
                        n = m[0],
                        p = m[1];
                    if (d.smoothed) {
                        d = n.length - 1;
                        for (n[d] = Math.min(n[d], u); d-- &&
                            0 < d;) n[d] += h / 2;
                        n[0] = Math.max(n[0], e)
                    }
                    this.currentDataGrouping = t.info;
                    this.closestPointRange = t.info.totalRange;
                    this.groupMap = m[2];
                    q(n[0]) && n[0] < a.dataMin && g && (a.min === a.dataMin && (a.min = n[0]), a.dataMin = n[0]);
                    this.processedXData = n;
                    this.processedYData = p
                } else this.currentDataGrouping = this.groupMap = null;
                this.hasGroupedData = f
            }
        };
        b.destroyGroupedData = function() {
            var a = this.groupedData;
            f(a || [], function(b, c) {
                b && (a[c] = b.destroy ? b.destroy() : null)
            });
            this.groupedData = null
        };
        b.generatePoints = function() {
            d.apply(this);
            this.destroyGroupedData();
            this.groupedData = this.hasGroupedData ? this.points : null
        };
        x(e.prototype, "update", function(b) {
            this.dataGroup ? a.error(24) : b.apply(this, [].slice.call(arguments, 1))
        });
        x(g.prototype, "tooltipFooterHeaderFormatter", function(b, d, e) {
            var c = d.series,
                g = c.tooltipOptions,
                f = c.options.dataGrouping,
                k = g.xDateFormat,
                h, n = c.xAxis,
                l = a.dateFormat;
            return n && "datetime" === n.options.type && f && y(d.key) ? (b = c.currentDataGrouping, f = f.dateTimeLabelFormats, b ? (n = f[b.unitName], 1 === b.count ? k = n[0] : (k = n[1], h = n[2])) :
                !k && f && (k = this.getXDateFormat(d, g, n)), k = l(k, d.key), h && (k += l(h, d.key + b.totalRange - 1)), p(g[(e ? "footer" : "header") + "Format"], {
                    point: t(d.point, {
                        key: k
                    }),
                    series: c
                })) : b.call(this, d, e)
        });
        b.destroy = function() {
            for (var a = this.groupedData || [], b = a.length; b--;) a[b] && a[b].destroy();
            A.apply(this)
        };
        x(b, "setOptions", function(a, b) {
            a = a.call(this, b);
            var c = this.type,
                d = this.chart.options.plotOptions,
                e = E[c].dataGrouping;
            H[c] && (e || (e = u(n, H[c])), a.dataGrouping = u(e, d.series && d.series.dataGrouping, d[c].dataGrouping, b.dataGrouping));
            this.chart.options.isStock && (this.requireSorting = !0);
            return a
        });
        x(F.prototype, "setScale", function(a) {
            a.call(this);
            f(this.series, function(a) {
                a.hasProcessed = !1
            })
        });
        F.prototype.getGroupPixelWidth = function() {
            var a = this.series,
                b = a.length,
                d, e = 0,
                g = !1,
                f;
            for (d = b; d--;)(f = a[d].options.dataGrouping) && (e = Math.max(e, f.groupPixelWidth));
            for (d = b; d--;)(f = a[d].options.dataGrouping) && a[d].hasProcessed && (b = (a[d].processedXData || a[d].data).length, a[d].groupPixelWidth || b > this.chart.plotSizeX / e || b && f.forced) && (g = !0);
            return g ?
                e : 0
        };
        F.prototype.setDataGrouping = function(a, b) {
            var c;
            b = k(b, !0);
            a || (a = {
                forced: !1,
                units: null
            });
            if (this instanceof F)
                for (c = this.series.length; c--;) this.series[c].update({
                    dataGrouping: a
                }, !1);
            else f(this.chart.options.series, function(b) {
                b.dataGrouping = a
            }, !1);
            b && this.chart.redraw()
        }
    })(L);
    (function(a) {
        var C = a.each,
            B = a.Point,
            F = a.seriesType,
            E = a.seriesTypes;
        F("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eOpen: {point.open}\x3cbr/\x3eHigh: {point.high}\x3cbr/\x3eLow: {point.low}\x3cbr/\x3eClose: {point.close}\x3cbr/\x3e'
            },
            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            stickyTracking: !0
        }, {
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(a) {
                return [a.open, a.high, a.low, a.close]
            },
            pointValKey: "close",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            pointAttribs: function(a, f) {
                f = E.column.prototype.pointAttribs.call(this, a, f);
                var q = this.options;
                delete f.fill;
                !a.options.color && q.upColor && a.open < a.close && (f.stroke = q.upColor);
                return f
            },
            translate: function() {
                var a = this,
                    f = a.yAxis,
                    t = !!a.modifyValue,
                    p = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                E.column.prototype.translate.apply(a);
                C(a.points, function(q) {
                    C([q.open, q.high, q.low, q.close, q.low], function(u, k) {
                        null !== u && (t && (u = a.modifyValue(u)), q[p[k]] = f.toPixels(u, !0))
                    });
                    q.tooltipPos[1] = q.plotHigh + f.pos - a.chart.plotTop
                })
            },
            drawPoints: function() {
                var a = this,
                    f = a.chart;
                C(a.points, function(q) {
                    var p, t, u, k, e = q.graphic,
                        g, x = !e;
                    void 0 !== q.plotY && (e || (q.graphic = e = f.renderer.path().add(a.group)), e.attr(a.pointAttribs(q, q.selected && "select")), t = e.strokeWidth() %
                        2 / 2, g = Math.round(q.plotX) - t, u = Math.round(q.shapeArgs.width / 2), k = ["M", g, Math.round(q.yBottom), "L", g, Math.round(q.plotHigh)], null !== q.open && (p = Math.round(q.plotOpen) + t, k.push("M", g, p, "L", g - u, p)), null !== q.close && (p = Math.round(q.plotClose) + t, k.push("M", g, p, "L", g + u, p)), e[x ? "attr" : "animate"]({
                            d: k
                        }).addClass(q.getClassName(), !0))
                })
            },
            animate: null
        }, {
            getClassName: function() {
                return B.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    })(L);
    (function(a) {
        var C =
            a.defaultPlotOptions,
            B = a.each,
            F = a.merge,
            E = a.seriesType,
            q = a.seriesTypes;
        E("candlestick", "ohlc", F(C.column, {
            states: {
                hover: {
                    lineWidth: 2
                }
            },
            tooltip: C.ohlc.tooltip,
            threshold: null,
            lineColor: "#000000",
            lineWidth: 1,
            upColor: "#ffffff",
            stickyTracking: !0
        }), {
            pointAttribs: function(a, t) {
                var f = q.column.prototype.pointAttribs.call(this, a, t),
                    y = this.options,
                    u = a.open < a.close,
                    k = y.lineColor || this.color;
                f["stroke-width"] = y.lineWidth;
                f.fill = a.options.color || (u ? y.upColor || this.color : this.color);
                f.stroke = a.lineColor || (u ? y.upLineColor ||
                    k : k);
                t && (a = y.states[t], f.fill = a.color || f.fill, f.stroke = a.lineColor || f.stroke, f["stroke-width"] = a.lineWidth || f["stroke-width"]);
                return f
            },
            drawPoints: function() {
                var a = this,
                    q = a.chart;
                B(a.points, function(f) {
                    var p = f.graphic,
                        t, k, e, g, x, b, l, d = !p;
                    void 0 !== f.plotY && (p || (f.graphic = p = q.renderer.path().add(a.group)), p.attr(a.pointAttribs(f, f.selected && "select")).shadow(a.options.shadow), x = p.strokeWidth() % 2 / 2, b = Math.round(f.plotX) - x, t = f.plotOpen, k = f.plotClose, e = Math.min(t, k), t = Math.max(t, k), l = Math.round(f.shapeArgs.width /
                        2), k = Math.round(e) !== Math.round(f.plotHigh), g = t !== f.yBottom, e = Math.round(e) + x, t = Math.round(t) + x, x = [], x.push("M", b - l, t, "L", b - l, e, "L", b + l, e, "L", b + l, t, "Z", "M", b, e, "L", b, k ? Math.round(f.plotHigh) : e, "M", b, t, "L", b, g ? Math.round(f.yBottom) : t), p[d ? "attr" : "animate"]({
                        d: x
                    }).addClass(f.getClassName(), !0))
                })
            }
        })
    })(L);
    (function(a) {
        var C = a.addEvent,
            B = a.each,
            F = a.merge,
            E = a.noop,
            q = a.Renderer,
            f = a.seriesType,
            t = a.seriesTypes,
            p = a.TrackerMixin,
            y = a.VMLRenderer,
            u = a.SVGRenderer.prototype.symbols,
            k = a.stableSort;
        f("flags", "column", {
            pointRange: 0,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}\x3cbr/\x3e"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: a.Series.prototype.init,
            pointAttribs: function(a, f) {
                var e = this.options,
                    b = a && a.color || this.color,
                    g = e.lineColor,
                    d = a && a.lineWidth;
                a = a && a.fillColor || e.fillColor;
                f && (a = e.states[f].fillColor, g = e.states[f].lineColor, d = e.states[f].lineWidth);
                return {
                    fill: a || b,
                    stroke: g || b,
                    "stroke-width": d || e.lineWidth || 0
                }
            },
            translate: function() {
                t.column.prototype.translate.apply(this);
                var a = this.options,
                    f = this.chart,
                    p = this.points,
                    b = p.length - 1,
                    l, d, q = a.onSeries;
                l = q && f.get(q);
                var a = a.onKey || "y",
                    q = l && l.options.step,
                    n = l && l.points,
                    u = n && n.length,
                    r = this.xAxis,
                    y = this.yAxis,
                    c = r.getExtremes(),
                    w = 0,
                    K, v, D;
                if (l && l.visible && u)
                    for (w = (l.pointXOffset || 0) + (l.barW || 0) /
                        2, l = l.currentDataGrouping, v = n[u - 1].x + (l ? l.totalRange : 0), k(p, function(a, b) {
                            return a.x - b.x
                        }), a = "plot" + a[0].toUpperCase() + a.substr(1); u-- && p[b] && !(l = p[b], K = n[u], K.x <= l.x && void 0 !== K[a] && (l.x <= v && (l.plotY = K[a], K.x < l.x && !q && (D = n[u + 1]) && void 0 !== D[a] && (l.plotY += (l.x - K.x) / (D.x - K.x) * (D[a] - K[a]))), b--, u++, 0 > b)););
                B(p, function(a, b) {
                    var e;
                    void 0 === a.plotY && (a.x >= c.min && a.x <= c.max ? a.plotY = f.chartHeight - r.bottom - (r.opposite ? r.height : 0) + r.offset - y.top : a.shapeArgs = {});
                    a.plotX += w;
                    (d = p[b - 1]) && d.plotX === a.plotX && (void 0 ===
                        d.stackIndex && (d.stackIndex = 0), e = d.stackIndex + 1);
                    a.stackIndex = e
                })
            },
            drawPoints: function() {
                var e = this.points,
                    f = this.chart,
                    k = f.renderer,
                    b, l, d = this.options,
                    p = d.y,
                    n, q, r, t, c, w, u, v = this.yAxis;
                for (q = e.length; q--;) r = e[q], u = r.plotX > this.xAxis.len, b = r.plotX, t = r.stackIndex, n = r.options.shape || d.shape, l = r.plotY, void 0 !== l && (l = r.plotY + p - (void 0 !== t && t * d.stackDistance)), c = t ? void 0 : r.plotX, w = t ? void 0 : r.plotY, t = r.graphic, void 0 !== l && 0 <= b && !u ? (t || (t = r.graphic = k.label("", null, null, n, null, null, d.useHTML).attr(this.pointAttribs(r)).css(F(d.style,
                    r.style)).attr({
                    align: "flag" === n ? "left" : "center",
                    width: d.width,
                    height: d.height,
                    "text-align": d.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), r.graphic.div && (r.graphic.div.point = r), t.shadow(d.shadow)), 0 < b && (b -= t.strokeWidth() % 2), t.attr({
                    text: r.options.title || d.title || "A",
                    x: b,
                    y: l,
                    anchorX: c,
                    anchorY: w
                }), r.tooltipPos = f.inverted ? [v.len + v.pos - f.plotLeft - l, this.xAxis.len - b] : [b, l + v.pos - f.plotTop]) : t && (r.graphic = t.destroy());
                d.useHTML && a.wrap(this.markerGroup, "on", function(b) {
                    return a.SVGElement.prototype.on.apply(b.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function() {
                var a = this.points;
                p.drawTrackerPoint.apply(this);
                B(a, function(e) {
                    var f = e.graphic;
                    f && C(f.element, "mouseover", function() {
                        0 < e.stackIndex && !e.raised && (e._y = f.y, f.attr({
                            y: e._y - 8
                        }), e.raised = !0);
                        B(a, function(a) {
                            a !== e && a.raised && a.graphic && (a.graphic.attr({
                                y: a._y
                            }), a.raised = !1)
                        })
                    })
                })
            },
            animate: E,
            buildKDTree: E,
            setClip: E
        });
        u.flag = function(a, f, k, b, l) {
            return ["M", l && l.anchorX || a, l && l.anchorY || f, "L", a, f + b, a, f, a + k, f, a + k, f + b, a, f + b, "Z"]
        };
        B(["circle", "square"], function(a) {
            u[a + "pin"] = function(e, f, b, k, d) {
                var g = d && d.anchorX;
                d = d && d.anchorY;
                "circle" === a && k > b && (e -= Math.round((k - b) / 2), b = k);
                e = u[a](e, f, b, k);
                g && d && e.push("M", g, f > d ? f : f + k, "L", g, d);
                return e
            }
        });
        q === y && B(["flag", "circlepin", "squarepin"], function(a) {
            y.prototype.symbols[a] = u[a]
        })
    })(L);
    (function(a) {
        function C(a, b, d) {
            this.init(a, b, d)
        }
        var B = a.addEvent,
            F = a.Axis,
            E = a.correctFloat,
            q = a.defaultOptions,
            f = a.defined,
            t = a.destroyObjectProperties,
            p = a.doc,
            y = a.each,
            u = a.fireEvent,
            k = a.hasTouch,
            e = a.isTouchDevice,
            g = a.merge,
            x = a.pick,
            b = a.removeEvent,
            l = a.wrap,
            d, A = {
                height: e ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: a.svg && !e,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            };
        q.scrollbar = g(!0, A, q.scrollbar);
        a.swapXY = d = function(a, b) {
            var d =
                a.length,
                e;
            if (b)
                for (b = 0; b < d; b += 3) e = a[b + 1], a[b + 1] = a[b + 2], a[b + 2] = e;
            return a
        };
        C.prototype = {
            init: function(a, b, d) {
                this.scrollbarButtons = [];
                this.renderer = a;
                this.userOptions = b;
                this.options = g(A, b);
                this.chart = d;
                this.size = x(this.options.size, this.options.height);
                b.enabled && (this.render(), this.initEvents(), this.addEvents())
            },
            render: function() {
                var a = this.renderer,
                    b = this.options,
                    e = this.size,
                    f;
                this.group = f = a.g("scrollbar").attr({
                    zIndex: b.zIndex,
                    translateY: -99999
                }).add();
                this.track = a.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: b.trackBorderRadius || 0,
                    height: e,
                    width: e
                }).add(f);
                this.track.attr({
                    fill: b.trackBackgroundColor,
                    stroke: b.trackBorderColor,
                    "stroke-width": b.trackBorderWidth
                });
                this.trackBorderWidth = this.track.strokeWidth();
                this.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });
                this.scrollbarGroup = a.g().add(f);
                this.scrollbar = a.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: e,
                    width: e,
                    r: b.barBorderRadius || 0
                }).add(this.scrollbarGroup);
                this.scrollbarRifles = a.path(d(["M", -3, e / 4, "L", -3, 2 * e / 3, "M", 0, e / 4, "L", 0, 2 * e / 3, "M",
                    3, e / 4, "L", 3, 2 * e / 3
                ], b.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup);
                this.scrollbar.attr({
                    fill: b.barBackgroundColor,
                    stroke: b.barBorderColor,
                    "stroke-width": b.barBorderWidth
                });
                this.scrollbarRifles.attr({
                    stroke: b.rifleColor,
                    "stroke-width": 1
                });
                this.scrollbarStrokeWidth = this.scrollbar.strokeWidth();
                this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2);
                this.drawScrollbarButton(0);
                this.drawScrollbarButton(1)
            },
            position: function(a, b, d, e) {
                var c =
                    this.options.vertical,
                    f = 0,
                    g = this.rendered ? "animate" : "attr";
                this.x = a;
                this.y = b + this.trackBorderWidth;
                this.width = d;
                this.xOffset = this.height = e;
                this.yOffset = f;
                c ? (this.width = this.yOffset = d = f = this.size, this.xOffset = b = 0, this.barWidth = e - 2 * d, this.x = a += this.options.margin) : (this.height = this.xOffset = e = b = this.size, this.barWidth = d - 2 * e, this.y += this.options.margin);
                this.group[g]({
                    translateX: a,
                    translateY: this.y
                });
                this.track[g]({
                    width: d,
                    height: e
                });
                this.scrollbarButtons[1][g]({
                    translateX: c ? 0 : d - b,
                    translateY: c ? e - f : 0
                })
            },
            drawScrollbarButton: function(a) {
                var b = this.renderer,
                    e = this.scrollbarButtons,
                    f = this.options,
                    c = this.size,
                    g;
                g = b.g().add(this.group);
                e.push(g);
                g = b.rect().addClass("highcharts-scrollbar-button").add(g);
                g.attr({
                    stroke: f.buttonBorderColor,
                    "stroke-width": f.buttonBorderWidth,
                    fill: f.buttonBackgroundColor
                });
                g.attr(g.crisp({
                    x: -.5,
                    y: -.5,
                    width: c + 1,
                    height: c + 1,
                    r: f.buttonBorderRadius
                }, g.strokeWidth()));
                g = b.path(d(["M", c / 2 + (a ? -1 : 1), c / 2 - 3, "L", c / 2 + (a ? -1 : 1), c / 2 + 3, "L", c / 2 + (a ? 2 : -2), c / 2], f.vertical)).addClass("highcharts-scrollbar-arrow").add(e[a]);
                g.attr({
                    fill: f.buttonArrowColor
                })
            },
            setRange: function(a, b) {
                var d = this.options,
                    e = d.vertical,
                    c = d.minWidth,
                    g = this.barWidth,
                    k, n, l = this.rendered && !this.hasDragged ? "animate" : "attr";
                f(g) && (a = Math.max(a, 0), k = Math.ceil(g * a), this.calculatedWidth = n = E(g * Math.min(b, 1) - k), n < c && (k = (g - c + n) * a, n = c), c = Math.floor(k + this.xOffset + this.yOffset), g = n / 2 - .5, this.from = a, this.to = b, e ? (this.scrollbarGroup[l]({
                        translateY: c
                    }), this.scrollbar[l]({
                        height: n
                    }), this.scrollbarRifles[l]({
                        translateY: g
                    }), this.scrollbarTop = c, this.scrollbarLeft =
                    0) : (this.scrollbarGroup[l]({
                    translateX: c
                }), this.scrollbar[l]({
                    width: n
                }), this.scrollbarRifles[l]({
                    translateX: g
                }), this.scrollbarLeft = c, this.scrollbarTop = 0), 12 >= n ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(!0), !1 === d.showFull && (0 >= a && 1 <= b ? this.group.hide() : this.group.show()), this.rendered = !0)
            },
            initEvents: function() {
                var a = this;
                a.mouseMoveHandler = function(b) {
                    var d = a.chart.pointer.normalize(b),
                        e = a.options.vertical ? "chartY" : "chartX",
                        c = a.initPositions;
                    !a.grabbedCenter || b.touches && 0 === b.touches[0][e] ||
                        (d = a.cursorToScrollbarPosition(d)[e], e = a[e], e = d - e, a.hasDragged = !0, a.updatePosition(c[0] + e, c[1] + e), a.hasDragged && u(a, "changed", {
                            from: a.from,
                            to: a.to,
                            trigger: "scrollbar",
                            DOMType: b.type,
                            DOMEvent: b
                        }))
                };
                a.mouseUpHandler = function(b) {
                    a.hasDragged && u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMType: b.type,
                        DOMEvent: b
                    });
                    a.grabbedCenter = a.hasDragged = a.chartX = a.chartY = null
                };
                a.mouseDownHandler = function(b) {
                    b = a.chart.pointer.normalize(b);
                    b = a.cursorToScrollbarPosition(b);
                    a.chartX = b.chartX;
                    a.chartY = b.chartY;
                    a.initPositions = [a.from, a.to];
                    a.grabbedCenter = !0
                };
                a.buttonToMinClick = function(b) {
                    var d = E(a.to - a.from) * a.options.step;
                    a.updatePosition(E(a.from - d), E(a.to - d));
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.buttonToMaxClick = function(b) {
                    var d = (a.to - a.from) * a.options.step;
                    a.updatePosition(a.from + d, a.to + d);
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                };
                a.trackClick = function(b) {
                    var d = a.chart.pointer.normalize(b),
                        e = a.to - a.from,
                        c = a.y + a.scrollbarTop,
                        f = a.x + a.scrollbarLeft;
                    a.options.vertical && d.chartY > c || !a.options.vertical && d.chartX > f ? a.updatePosition(a.from + e, a.to + e) : a.updatePosition(a.from - e, a.to - e);
                    u(a, "changed", {
                        from: a.from,
                        to: a.to,
                        trigger: "scrollbar",
                        DOMEvent: b
                    })
                }
            },
            cursorToScrollbarPosition: function(a) {
                var b = this.options,
                    b = b.minWidth > this.calculatedWidth ? b.minWidth : 0;
                return {
                    chartX: (a.chartX - this.x - this.xOffset) / (this.barWidth - b),
                    chartY: (a.chartY - this.y - this.yOffset) / (this.barWidth - b)
                }
            },
            updatePosition: function(a, b) {
                1 < b && (a = E(1 - E(b - a)), b = 1);
                0 > a && (b = E(b - a), a = 0);
                this.from = a;
                this.to = b
            },
            update: function(a) {
                this.destroy();
                this.init(this.chart.renderer, g(!0, this.options, a), this.chart)
            },
            addEvents: function() {
                var a = this.options.inverted ? [1, 0] : [0, 1],
                    b = this.scrollbarButtons,
                    d = this.scrollbarGroup.element,
                    e = this.mouseDownHandler,
                    c = this.mouseMoveHandler,
                    f = this.mouseUpHandler,
                    a = [
                        [b[a[0]].element, "click", this.buttonToMinClick],
                        [b[a[1]].element, "click", this.buttonToMaxClick],
                        [this.track.element, "click", this.trackClick],
                        [d, "mousedown", e],
                        [p, "mousemove", c],
                        [p, "mouseup", f]
                    ];
                k && a.push([d, "touchstart", e], [p, "touchmove", c], [p, "touchend", f]);
                y(a, function(a) {
                    B.apply(null, a)
                });
                this._events = a
            },
            removeEvents: function() {
                y(this._events, function(a) {
                    b.apply(null, a)
                });
                this._events.length = 0
            },
            destroy: function() {
                var a = this.chart.scroller;
                this.removeEvents();
                y(["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"], function(a) {
                    this[a] && this[a].destroy && (this[a] = this[a].destroy())
                }, this);
                a && this === a.scrollbar && (a.scrollbar = null, t(a.scrollbarButtons))
            }
        };
        l(F.prototype, "init", function(a) {
            var b =
                this;
            a.apply(b, Array.prototype.slice.call(arguments, 1));
            b.options.scrollbar && b.options.scrollbar.enabled && (b.options.scrollbar.vertical = !b.horiz, b.options.startOnTick = b.options.endOnTick = !1, b.scrollbar = new C(b.chart.renderer, b.options.scrollbar, b.chart), B(b.scrollbar, "changed", function(a) {
                var d = Math.min(x(b.options.min, b.min), b.min, b.dataMin),
                    c = Math.max(x(b.options.max, b.max), b.max, b.dataMax) - d,
                    e;
                b.horiz && !b.reversed || !b.horiz && b.reversed ? (e = d + c * this.to, d += c * this.from) : (e = d + c * (1 - this.from), d += c * (1 -
                    this.to));
                b.setExtremes(d, e, !0, !1, a)
            }))
        });
        l(F.prototype, "render", function(a) {
            var b = Math.min(x(this.options.min, this.min), this.min, this.dataMin),
                d = Math.max(x(this.options.max, this.max), this.max, this.dataMax),
                e = this.scrollbar,
                c = this.titleOffset || 0;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            if (e) {
                this.horiz ? (e.position(this.left, this.top + this.height + 2 + this.chart.scrollbarsOffsets[1] + (this.opposite ? 0 : c + this.axisTitleMargin + this.offset), this.width, this.height), c = 1) : (e.position(this.left + this.width +
                    2 + this.chart.scrollbarsOffsets[0] + (this.opposite ? c + this.axisTitleMargin + this.offset : 0), this.top, this.width, this.height), c = 0);
                if (!this.opposite && !this.horiz || this.opposite && this.horiz) this.chart.scrollbarsOffsets[c] += this.scrollbar.size + this.scrollbar.options.margin;
                isNaN(b) || isNaN(d) || !f(this.min) || !f(this.max) ? e.setRange(0, 0) : (c = (this.min - b) / (d - b), b = (this.max - b) / (d - b), this.horiz && !this.reversed || !this.horiz && this.reversed ? e.setRange(c, b) : e.setRange(1 - b, 1 - c))
            }
        });
        l(F.prototype, "getOffset", function(a) {
            var b =
                this.horiz ? 2 : 1,
                d = this.scrollbar;
            a.apply(this, Array.prototype.slice.call(arguments, 1));
            d && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[b] += d.size + d.options.margin)
        });
        l(F.prototype, "destroy", function(a) {
            this.scrollbar && (this.scrollbar = this.scrollbar.destroy());
            a.apply(this, Array.prototype.slice.call(arguments, 1))
        });
        a.Scrollbar = C
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var B = a.addEvent,
            F = a.Axis,
            E = a.Chart,
            q = a.color,
            f = a.defaultOptions,
            t = a.defined,
            p = a.destroyObjectProperties,
            y = a.doc,
            u =
            a.each,
            k = a.erase,
            e = a.error,
            g = a.extend,
            x = a.grep,
            b = a.hasTouch,
            l = a.isNumber,
            d = a.isObject,
            A = a.merge,
            n = a.pick,
            H = a.removeEvent,
            r = a.Scrollbar,
            J = a.Series,
            c = a.seriesTypes,
            w = a.wrap,
            K = a.swapXY,
            v = [].concat(a.defaultDataGroupingUnits),
            D = function(a) {
                var b = x(arguments, l);
                if (b.length) return Math[a].apply(0, b)
            };
        v[4] = ["day", [1, 2, 3, 4]];
        v[5] = ["week", [1, 2, 3]];
        c = void 0 === c.areaspline ? "line" : "areaspline";
        g(f, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: q("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: c,
                    color: "#335cad",
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: v
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    pointRange: 0,
                    shadow: !1,
                    threshold: null
                },
                xAxis: {
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        });
        C.prototype = {
            drawHandle: function(a, b, c, d) {
                this.handles[b][d](c ? {
                    translateX: Math.round(this.left + this.height / 2 - 8),
                    translateY: Math.round(this.top + parseInt(a, 10) + .5)
                } : {
                    translateX: Math.round(this.left + parseInt(a, 10)),
                    translateY: Math.round(this.top +
                        this.height / 2 - 8)
                })
            },
            getHandlePath: function(a) {
                return K(["M", -4.5, .5, "L", 3.5, .5, "L", 3.5, 15.5, "L", -4.5, 15.5, "L", -4.5, .5, "M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12], a)
            },
            drawOutline: function(a, b, c, d) {
                var e = this.navigatorOptions.maskInside,
                    h = this.outline.strokeWidth(),
                    f = h / 2,
                    h = h % 2 / 2,
                    g = this.outlineHeight,
                    m = this.scrollbarHeight,
                    k = this.size,
                    l = this.left - m,
                    n = this.top;
                c ? (l -= f, c = n + b + h, b = n + a + h, a = ["M", l + g, n - m - h, "L", l + g, c, "L", l, c, "L", l, b, "L", l + g, b, "L", l + g, n + k + m].concat(e ? ["M", l + g, c - f, "L", l + g, b + f] : [])) : (a += l + m - h, b +=
                    l + m - h, n += f, a = ["M", l, n, "L", a, n, "L", a, n + g, "L", b, n + g, "L", b, n, "L", l + k + 2 * m, n].concat(e ? ["M", a - f, n, "L", b + f, n] : []));
                this.outline[d]({
                    d: a
                })
            },
            drawMasks: function(a, b, c, d) {
                var e = this.left,
                    h = this.top,
                    f = this.height,
                    g, m, k, l;
                c ? (k = [e, e, e], l = [h, h + a, h + b], m = [f, f, f], g = [a, b - a, this.size - b]) : (k = [e, e + a, e + b], l = [h, h, h], m = [a, b - a, this.size - b], g = [f, f, f]);
                u(this.shades, function(a, b) {
                    a[d]({
                        x: k[b],
                        y: l[b],
                        width: m[b],
                        height: g[b]
                    })
                })
            },
            renderElements: function() {
                var a = this,
                    b = a.navigatorOptions,
                    c = b.maskInside,
                    d = a.chart,
                    e = d.inverted,
                    f =
                    d.renderer,
                    g;
                a.navigatorGroup = g = f.g("navigator").attr({
                    zIndex: 8,
                    visibility: "hidden"
                }).add();
                var k = {
                    cursor: e ? "ns-resize" : "ew-resize"
                };
                u([!c, c, !c], function(c, d) {
                    a.shades[d] = f.rect().addClass("highcharts-navigator-mask" + (1 === d ? "-inside" : "-outside")).attr({
                        fill: c ? b.maskFill : "transparent"
                    }).css(1 === d && k).add(g)
                });
                a.outline = f.path().addClass("highcharts-navigator-outline").attr({
                    "stroke-width": b.outlineWidth,
                    stroke: b.outlineColor
                }).add(g);
                u([0, 1], function(c) {
                    a.handles[c] = f.path(a.getHandlePath(e)).attr({
                        zIndex: 7 -
                            c
                    }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][c]).add(g);
                    var d = b.handles;
                    a.handles[c].attr({
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": 1
                    }).css(k)
                })
            },
            update: function(a) {
                this.destroy();
                A(!0, this.chart.options.navigator, this.options, a);
                this.init(this.chart)
            },
            render: function(a, b, c, d) {
                var e = this.chart,
                    h, f, g = this.scrollbarHeight,
                    m, k = this.xAxis;
                h = k.fake ? e.xAxis[0] : k;
                var p = this.navigatorEnabled,
                    q, v = this.rendered;
                f = e.inverted;
                var w = e.xAxis[0].minRange;
                if (!this.hasDragged || t(c)) {
                    if (!l(a) || !l(b))
                        if (v) c = 0, d = k.width;
                        else return;
                    this.left = n(k.left, e.plotLeft + g + (f ? e.plotWidth : 0));
                    this.size = q = m = n(k.len, (f ? e.plotHeight : e.plotWidth) - 2 * g);
                    e = f ? g : m + 2 * g;
                    c = n(c, k.toPixels(a, !0));
                    d = n(d, k.toPixels(b, !0));
                    l(c) && Infinity !== Math.abs(c) || (c = 0, d = e);
                    a = k.toValue(c, !0);
                    b = k.toValue(d, !0);
                    if (Math.abs(b - a) < w)
                        if (this.grabbedLeft) c = k.toPixels(b - w, !0);
                        else if (this.grabbedRight) d = k.toPixels(a + w, !0);
                    else return;
                    this.zoomedMax = Math.min(Math.max(c, d, 0), q);
                    this.zoomedMin = Math.min(Math.max(this.fixedWidth ?
                        this.zoomedMax - this.fixedWidth : Math.min(c, d), 0), q);
                    this.range = this.zoomedMax - this.zoomedMin;
                    q = Math.round(this.zoomedMax);
                    c = Math.round(this.zoomedMin);
                    p && (this.navigatorGroup.attr({
                        visibility: "visible"
                    }), v = v && !this.hasDragged ? "animate" : "attr", this.drawMasks(c, q, f, v), this.drawOutline(c, q, f, v), this.drawHandle(c, 0, f, v), this.drawHandle(q, 1, f, v));
                    this.scrollbar && (f ? (f = this.top - g, h = this.left - g + (p ? 0 : (h.titleOffset || 0) + h.axisTitleMargin), g = m + 2 * g) : (f = this.top + (p ? this.height : -g), h = this.left - g), this.scrollbar.position(h,
                        f, e, g), this.scrollbar.setRange(this.zoomedMin / m, this.zoomedMax / m));
                    this.rendered = !0
                }
            },
            addMouseEvents: function() {
                var a = this,
                    c = a.chart,
                    d = c.container,
                    e = [],
                    f, g;
                a.mouseMoveHandler = f = function(b) {
                    a.onMouseMove(b)
                };
                a.mouseUpHandler = g = function(b) {
                    a.onMouseUp(b)
                };
                e = a.getPartsEvents("mousedown");
                e.push(B(d, "mousemove", f), B(y, "mouseup", g));
                b && (e.push(B(d, "touchmove", f), B(y, "touchend", g)), e.concat(a.getPartsEvents("touchstart")));
                a.eventsToUnbind = e;
                a.series && a.series[0] && e.push(B(a.series[0].xAxis, "foundExtremes",
                    function() {
                        c.navigator.modifyNavigatorAxisExtremes()
                    }))
            },
            getPartsEvents: function(a) {
                var b = this,
                    c = [];
                u(["shades", "handles"], function(d) {
                    u(b[d], function(e, h) {
                        c.push(B(e.element, a, function(a) {
                            b[d + "Mousedown"](a, h)
                        }))
                    })
                });
                return c
            },
            shadesMousedown: function(a, b) {
                a = this.chart.pointer.normalize(a);
                var c = this.chart,
                    d = this.xAxis,
                    e = this.zoomedMin,
                    f = this.left,
                    g = this.size,
                    m = this.range,
                    k = a.chartX,
                    l;
                c.inverted && (k = a.chartY, f = this.top);
                1 === b ? (this.grabbedCenter = k, this.fixedWidth = m, this.dragOffset = k - e) : (a = k - f - m /
                    2, 0 === b ? a = Math.max(0, a) : 2 === b && a + m >= g && (a = g - m, l = this.getUnionExtremes().dataMax), a !== e && (this.fixedWidth = m, b = d.toFixedRange(a, a + m, null, l), c.xAxis[0].setExtremes(Math.min(b.min, b.max), Math.max(b.min, b.max), !0, null, {
                        trigger: "navigator"
                    })))
            },
            handlesMousedown: function(a, b) {
                this.chart.pointer.normalize(a);
                a = this.chart;
                var c = a.xAxis[0],
                    d = a.inverted && !c.reversed || !a.inverted && c.reversed;
                0 === b ? (this.grabbedLeft = !0, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = d ? c.min : c.max) : (this.grabbedRight = !0, this.otherHandlePos =
                    this.zoomedMin, this.fixedExtreme = d ? c.max : c.min);
                a.fixedRange = null
            },
            onMouseMove: function(a) {
                var b = this,
                    c = b.chart,
                    d = b.left,
                    e = b.navigatorSize,
                    f = b.range,
                    g = b.dragOffset,
                    m = c.inverted;
                a.touches && 0 === a.touches[0].pageX || (a = c.pointer.normalize(a), c = a.chartX, m && (d = b.top, c = a.chartY), b.grabbedLeft ? (b.hasDragged = !0, b.render(0, 0, c - d, b.otherHandlePos)) : b.grabbedRight ? (b.hasDragged = !0, b.render(0, 0, b.otherHandlePos, c - d)) : b.grabbedCenter && (b.hasDragged = !0, c < g ? c = g : c > e + g - f && (c = e + g - f), b.render(0, 0, c - g, c - g + f)), b.hasDragged &&
                    b.scrollbar && b.scrollbar.options.liveRedraw && (a.DOMType = a.type, setTimeout(function() {
                        b.onMouseUp(a)
                    }, 0)))
            },
            onMouseUp: function(a) {
                var b = this.chart,
                    c = this.xAxis,
                    d = this.scrollbar,
                    e, f, g = a.DOMEvent || a;
                (!this.hasDragged || d && d.hasDragged) && "scrollbar" !== a.trigger || (this.zoomedMin === this.otherHandlePos ? e = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (f = this.fixedExtreme), this.zoomedMax === this.size && (f = this.getUnionExtremes().dataMax), c = c.toFixedRange(this.zoomedMin, this.zoomedMax, e, f), t(c.min) &&
                    b.xAxis[0].setExtremes(Math.min(c.min, c.max), Math.max(c.min, c.max), !0, this.hasDragged ? !1 : null, {
                        trigger: "navigator",
                        triggerOp: "navigator-drag",
                        DOMEvent: g
                    }));
                "mousemove" !== a.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null)
            },
            removeEvents: function() {
                this.eventsToUnbind && (u(this.eventsToUnbind, function(a) {
                    a()
                }), this.eventsToUnbind = void 0);
                this.removeBaseSeriesEvents()
            },
            removeBaseSeriesEvents: function() {
                var a =
                    this.baseSeries || [];
                this.navigatorEnabled && a[0] && !1 !== this.navigatorOptions.adaptToUpdatedData && (u(a, function(a) {
                    H(a, "updatedData", this.updatedDataHandler)
                }, this), a[0].xAxis && H(a[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
            },
            init: function(a) {
                var b = a.options,
                    c = b.navigator,
                    d = c.enabled,
                    e = b.scrollbar,
                    f = e.enabled,
                    b = d ? c.height : 0,
                    g = f ? e.height : 0;
                this.handles = [];
                this.shades = [];
                this.chart = a;
                this.setBaseSeries();
                this.height = b;
                this.scrollbarHeight = g;
                this.scrollbarEnabled = f;
                this.navigatorEnabled = d;
                this.navigatorOptions =
                    c;
                this.scrollbarOptions = e;
                this.outlineHeight = b + g;
                this.opposite = n(c.opposite, !d && a.inverted);
                var k = this,
                    e = k.baseSeries,
                    f = a.xAxis.length,
                    m = a.yAxis.length,
                    l = e && e[0] && e[0].xAxis || a.xAxis[0];
                a.extraMargin = {
                    type: k.opposite ? "plotTop" : "marginBottom",
                    value: (d || !a.inverted ? k.outlineHeight : 0) + c.margin
                };
                a.inverted && (a.extraMargin.type = k.opposite ? "marginRight" : "plotLeft");
                a.isDirtyBox = !0;
                k.navigatorEnabled ? (k.xAxis = new F(a, A({
                        breaks: l.options.breaks,
                        ordinal: l.options.ordinal
                    }, c.xAxis, {
                        id: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        isX: !0,
                        type: "datetime",
                        index: f,
                        offset: 0,
                        keepOrdinalPadding: !0,
                        startOnTick: !1,
                        endOnTick: !1,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        offsets: [g, 0, -g, 0],
                        width: b
                    } : {
                        offsets: [0, -g, 0, g],
                        height: b
                    })), k.yAxis = new F(a, A(c.yAxis, {
                        id: "navigator-y-axis",
                        alignTicks: !1,
                        offset: 0,
                        index: m,
                        zoomEnabled: !1
                    }, a.inverted ? {
                        width: b
                    } : {
                        height: b
                    })), e || c.series.data ? k.addBaseSeries() : 0 === a.series.length && w(a, "redraw", function(b, c) {
                        0 < a.series.length && !k.series && (k.setBaseSeries(), a.redraw = b);
                        b.call(a, c)
                    }), k.renderElements(),
                    k.addMouseEvents()) : k.xAxis = {
                    translate: function(b, c) {
                        var d = a.xAxis[0],
                            e = d.getExtremes(),
                            f = d.len - 2 * g,
                            h = D("min", d.options.min, e.dataMin),
                            d = D("max", d.options.max, e.dataMax) - h;
                        return c ? b * d / f + h : f * (b - h) / d
                    },
                    toPixels: function(a) {
                        return this.translate(a)
                    },
                    toValue: function(a) {
                        return this.translate(a, !0)
                    },
                    toFixedRange: F.prototype.toFixedRange,
                    fake: !0
                };
                a.options.scrollbar.enabled && (a.scrollbar = k.scrollbar = new r(a.renderer, A(a.options.scrollbar, {
                    margin: k.navigatorEnabled ? 0 : 10,
                    vertical: a.inverted
                }), a), B(k.scrollbar,
                    "changed",
                    function(b) {
                        var c = k.size,
                            d = c * this.to,
                            c = c * this.from;
                        k.hasDragged = k.scrollbar.hasDragged;
                        k.render(0, 0, c, d);
                        (a.options.scrollbar.liveRedraw || "mousemove" !== b.DOMType) && setTimeout(function() {
                            k.onMouseUp(b)
                        })
                    }));
                k.addBaseSeriesEvents();
                k.addChartEvents()
            },
            getUnionExtremes: function(a) {
                var b = this.chart.xAxis[0],
                    c = this.xAxis,
                    d = c.options,
                    e = b.options,
                    f;
                a && null === b.dataMin || (f = {
                    dataMin: n(d && d.min, D("min", e.min, b.dataMin, c.dataMin, c.min)),
                    dataMax: n(d && d.max, D("max", e.max, b.dataMax, c.dataMax, c.max))
                });
                return f
            },
            setBaseSeries: function(a) {
                var b = this.chart,
                    c;
                a = a || b.options && b.options.navigator.baseSeries || 0;
                this.series && (this.removeBaseSeriesEvents(), u(this.series, function(a) {
                    a.destroy()
                }));
                c = this.baseSeries = [];
                u(b.series || [], function(b, d) {
                    (b.options.showInNavigator || (d === a || b.options.id === a) && !1 !== b.options.showInNavigator) && c.push(b)
                });
                this.xAxis && !this.xAxis.fake && this.addBaseSeries()
            },
            addBaseSeries: function() {
                var a = this,
                    b = a.chart,
                    c = a.series = [],
                    d = a.baseSeries,
                    e, f, g = a.navigatorOptions.series,
                    k,
                    l = {
                        enableMouseTracking: !1,
                        index: null,
                        group: "nav",
                        padXAxis: !1,
                        xAxis: "navigator-x-axis",
                        yAxis: "navigator-y-axis",
                        showInLegend: !1,
                        stacking: !1,
                        isInternal: !0,
                        visible: !0
                    };
                d ? u(d, function(d, h) {
                    l.name = "Navigator " + (h + 1);
                    e = d.options || {};
                    k = e.navigatorOptions || {};
                    f = A(e, l, g, k);
                    h = k.data || g.data;
                    a.hasNavigatorData = a.hasNavigatorData || !!h;
                    f.data = h || e.data && e.data.slice(0);
                    d.navigatorSeries = b.initSeries(f);
                    c.push(d.navigatorSeries)
                }) : (f = A(g, l), f.data = g.data, a.hasNavigatorData = !!f.data, c.push(b.initSeries(f)));
                this.addBaseSeriesEvents()
            },
            addBaseSeriesEvents: function() {
                var a = this,
                    b = a.baseSeries || [];
                b[0] && b[0].xAxis && B(b[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes);
                !1 !== this.navigatorOptions.adaptToUpdatedData && u(b, function(b) {
                    b.xAxis && B(b, "updatedData", this.updatedDataHandler);
                    B(b, "remove", function() {
                        this.navigatorSeries && (k(a.series, this.navigatorSeries), this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                    })
                }, this)
            },
            modifyNavigatorAxisExtremes: function() {
                var a = this.xAxis,
                    b;
                a.getExtremes && (!(b = this.getUnionExtremes(!0)) ||
                    b.dataMin === a.min && b.dataMax === a.max || (a.min = b.dataMin, a.max = b.dataMax))
            },
            modifyBaseAxisExtremes: function() {
                var a = this.chart.navigator,
                    b = this.getExtremes(),
                    c = b.dataMin,
                    d = b.dataMax,
                    b = b.max - b.min,
                    e = a.stickToMin,
                    f = a.stickToMax,
                    g, k, n = a.series && a.series[0],
                    p = !!this.setExtremes;
                this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger || (e && (k = c, g = k + b), f && (g = d, e || (k = Math.max(g - b, n && n.xData ? n.xData[0] : -Number.MAX_VALUE))), p && (e || f) && l(k) && (this.min = this.userMin = k, this.max = this.userMax = g));
                a.stickToMin =
                    a.stickToMax = null
            },
            updatedDataHandler: function() {
                var a = this.chart.navigator,
                    b = this.navigatorSeries;
                a.stickToMin = l(this.xAxis.min) && this.xAxis.min <= this.xData[0];
                a.stickToMax = Math.round(a.zoomedMax) >= Math.round(a.size);
                b && !a.hasNavigatorData && (b.options.pointStart = this.xData[0], b.setData(this.options.data, !1, null, !1))
            },
            addChartEvents: function() {
                B(this.chart, "redraw", function() {
                    var a = this.navigator,
                        b = a && (a.baseSeries && a.baseSeries[0] && a.baseSeries[0].xAxis || a.scrollbar && this.xAxis[0]);
                    b && a.render(b.min,
                        b.max)
                })
            },
            destroy: function() {
                this.removeEvents();
                this.xAxis && (k(this.chart.xAxis, this.xAxis), k(this.chart.axes, this.xAxis));
                this.yAxis && (k(this.chart.yAxis, this.yAxis), k(this.chart.axes, this.yAxis));
                u(this.series || [], function(a) {
                    a.destroy && a.destroy()
                });
                u("series xAxis yAxis shades outline scrollbarTrack scrollbarRifles scrollbarGroup scrollbar navigatorGroup rendered".split(" "), function(a) {
                    this[a] && this[a].destroy && this[a].destroy();
                    this[a] = null
                }, this);
                u([this.handles], function(a) {
                    p(a)
                }, this)
            }
        };
        a.Navigator = C;
        w(F.prototype, "zoom", function(a, b, c) {
            var d = this.chart,
                e = d.options,
                f = e.chart.zoomType,
                h = e.navigator,
                e = e.rangeSelector,
                g;
            this.isXAxis && (h && h.enabled || e && e.enabled) && ("x" === f ? d.resetZoomButton = "blocked" : "y" === f ? g = !1 : "xy" === f && (d = this.previousZoom, t(b) ? this.previousZoom = [this.min, this.max] : d && (b = d[0], c = d[1], delete this.previousZoom)));
            return void 0 !== g ? g : a.call(this, b, c)
        });
        w(E.prototype, "init", function(a, b, c) {
            B(this, "beforeRender", function() {
                var a = this.options;
                if (a.navigator.enabled || a.scrollbar.enabled) this.scroller =
                    this.navigator = new C(this)
            });
            a.call(this, b, c)
        });
        w(E.prototype, "setChartSize", function(a) {
            var b = this.legend,
                c = this.navigator,
                d, e, f, g;
            a.apply(this, [].slice.call(arguments, 1));
            c && (e = b.options, f = c.xAxis, g = c.yAxis, d = c.scrollbarHeight, this.inverted ? (c.left = c.opposite ? this.chartWidth - d - c.height : this.spacing[3] + d, c.top = this.plotTop + d) : (c.left = this.plotLeft + d, c.top = c.navigatorOptions.top || this.chartHeight - c.height - d - this.spacing[2] - ("bottom" === e.verticalAlign && e.enabled && !e.floating ? b.legendHeight + n(e.margin,
                10) : 0)), f && g && (this.inverted ? f.options.left = g.options.left = c.left : f.options.top = g.options.top = c.top, f.setAxisSize(), g.setAxisSize()))
        });
        w(J.prototype, "addPoint", function(a, b, c, f, g) {
            var h = this.options.turboThreshold;
            h && this.xData.length > h && d(b, !0) && this.chart.navigator && e(20, !0);
            a.call(this, b, c, f, g)
        });
        w(E.prototype, "addSeries", function(a, b, c, d) {
            a = a.call(this, b, !1, d);
            this.navigator && this.navigator.setBaseSeries();
            n(c, !0) && this.redraw();
            return a
        });
        w(J.prototype, "update", function(a, b, c) {
            a.call(this, b, !1);
            this.chart.navigator && this.chart.navigator.setBaseSeries();
            n(c, !0) && this.chart.redraw()
        });
        E.prototype.callbacks.push(function(a) {
            var b = a.navigator;
            b && (a = a.xAxis[0].getExtremes(), b.render(a.min, a.max))
        })
    })(L);
    (function(a) {
        function C(a) {
            this.init(a)
        }
        var B = a.addEvent,
            F = a.Axis,
            E = a.Chart,
            q = a.css,
            f = a.createElement,
            t = a.dateFormat,
            p = a.defaultOptions,
            y = p.global.useUTC,
            u = a.defined,
            k = a.destroyObjectProperties,
            e = a.discardElement,
            g = a.each,
            x = a.extend,
            b = a.fireEvent,
            l = a.Date,
            d = a.isNumber,
            A = a.merge,
            n = a.pick,
            H =
            a.pInt,
            r = a.splat,
            J = a.wrap;
        x(p, {
            rangeSelector: {
                buttonTheme: {
                    "stroke-width": 0,
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                height: 35,
                inputPosition: {
                    align: "right"
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        });
        p.lang = A(p.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        });
        C.prototype = {
            clickButton: function(a, b) {
                var c = this,
                    e = c.chart,
                    f = c.buttonOptions[a],
                    k = e.xAxis[0],
                    l = e.scroller && e.scroller.getUnionExtremes() || k || {},
                    h = l.dataMin,
                    p = l.dataMax,
                    q, t = k && Math.round(Math.min(k.max, n(p, k.max))),
                    w = f.type,
                    u, l = f._range,
                    x, A, C, E = f.dataGrouping;
                if (null !== h && null !== p) {
                    e.fixedRange = l;
                    E && (this.forcedDataGrouping = !0, F.prototype.setDataGrouping.call(k || {
                        chart: this.chart
                    }, E, !1));
                    if ("month" === w || "year" === w) k ? (w = {
                        range: f,
                        max: t,
                        dataMin: h,
                        dataMax: p
                    }, q = k.minFromRange.call(w), d(w.newMax) && (t = w.newMax)) : l = f;
                    else if (l) q = Math.max(t - l, h), t = Math.min(q + l, p);
                    else if ("ytd" === w)
                        if (k) void 0 === p && (h = Number.MAX_VALUE, p = Number.MIN_VALUE, g(e.series, function(a) {
                                a = a.xData;
                                h = Math.min(a[0], h);
                                p = Math.max(a[a.length - 1], p)
                            }), b = !1), t =
                            c.getYTDExtremes(p, h, y), q = x = t.min, t = t.max;
                        else {
                            B(e, "beforeRender", function() {
                                c.clickButton(a)
                            });
                            return
                        }
                    else "all" === w && k && (q = h, t = p);
                    c.setSelected(a);
                    k ? k.setExtremes(q, t, n(b, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: f
                    }) : (u = r(e.options.xAxis)[0], C = u.range, u.range = l, A = u.min, u.min = x, B(e, "load", function() {
                        u.range = C;
                        u.min = A
                    }))
                }
            },
            setSelected: function(a) {
                this.selected = this.options.selected = a
            },
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            }],
            init: function(a) {
                var c = this,
                    d = a.options.rangeSelector,
                    e = d.buttons || [].concat(c.defaultButtons),
                    f = d.selected,
                    k = function() {
                        var a = c.minInput,
                            d = c.maxInput;
                        a && a.blur && b(a, "blur");
                        d && d.blur && b(d, "blur")
                    };
                c.chart = a;
                c.options = d;
                c.buttons = [];
                a.extraTopMargin = d.height;
                c.buttonOptions = e;
                this.unMouseDown = B(a.container, "mousedown", k);
                this.unResize = B(a, "resize", k);
                g(e, c.computeButtonRange);
                void 0 !== f && e[f] && this.clickButton(f, !1);
                B(a, "load", function() {
                    B(a.xAxis[0], "setExtremes", function(b) {
                        this.max - this.min !== a.fixedRange && "rangeSelectorButton" !== b.trigger && "updatedData" !== b.trigger && c.forcedDataGrouping && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function() {
                var a = this.chart,
                    b = a.xAxis[0],
                    e = Math.round(b.max - b.min),
                    f = !b.hasVisibleSeries,
                    a = a.scroller && a.scroller.getUnionExtremes() || b,
                    k = a.dataMin,
                    m = a.dataMax,
                    a = this.getYTDExtremes(m, k, y),
                    l = a.min,
                    h = a.max,
                    n = this.selected,
                    p = d(n),
                    q = this.options.allButtonsEnabled,
                    t = this.buttons;
                g(this.buttonOptions, function(a, c) {
                    var d = a._range,
                        g = a.type,
                        v = a.count || 1;
                    a = t[c];
                    var r = 0;
                    c = c === n;
                    var w = d > m - k,
                        u = d < b.minRange,
                        x = !1,
                        z = !1,
                        d = d === e;
                    ("month" === g || "year" === g) && e >= 864E5 * {
                        month: 28,
                        year: 365
                    }[g] * v && e <= 864E5 * {
                        month: 31,
                        year: 366
                    }[g] * v ? d = !0 : "ytd" === g ? (d = h - l === e, x = !c) : "all" === g && (d = b.max - b.min >= m - k, z = !c && p && d);
                    g = !q && (w || u || z || f);
                    d = c && d || d && !p && !x;
                    g ? r = 3 : d && (p = !0, r = 2);
                    a.state !== r && a.setState(r)
                })
            },
            computeButtonRange: function(a) {
                var b = a.type,
                    c = a.count || 1,
                    d = {
                        millisecond: 1,
                        second: 1E3,
                        minute: 6E4,
                        hour: 36E5,
                        day: 864E5,
                        week: 6048E5
                    };
                if (d[b]) a._range = d[b] * c;
                else if ("month" === b || "year" === b) a._range = 864E5 * {
                    month: 30,
                    year: 365
                }[b] * c
            },
            setInputValue: function(a, b) {
                var c = this.chart.options.rangeSelector,
                    d = this[a + "Input"];
                u(b) && (d.previousValue = d.HCTime, d.HCTime = b);
                d.value = t(c.inputEditDateFormat || "%Y-%m-%d", d.HCTime);
                this[a + "DateBox"].attr({
                    text: t(c.inputDateFormat || "%b %e, %Y", d.HCTime)
                })
            },
            showInput: function(a) {
                var b = this.inputGroup,
                    c = this[a + "DateBox"];
                q(this[a + "Input"], {
                    left: b.translateX + c.x + "px",
                    top: b.translateY +
                        "px",
                    width: c.width - 2 + "px",
                    height: c.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(a) {
                q(this[a + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                });
                this.setInputValue(a)
            },
            drawInput: function(a) {
                function b() {
                    var a = t.value,
                        b = (l.inputDateParser || Date.parse)(a),
                        f = e.xAxis[0],
                        g = e.scroller && e.scroller.xAxis ? e.scroller.xAxis : f,
                        h = g.dataMin,
                        g = g.dataMax;
                    b !== t.previousValue && (t.previousValue = b, d(b) || (b = a.split("-"), b = Date.UTC(H(b[0]), H(b[1]) - 1, H(b[2]))), d(b) && (y || (b += 6E4 * (new Date).getTimezoneOffset()),
                        n ? b > c.maxInput.HCTime ? b = void 0 : b < h && (b = h) : b < c.minInput.HCTime ? b = void 0 : b > g && (b = g), void 0 !== b && f.setExtremes(n ? b : f.min, n ? f.max : b, void 0, void 0, {
                            trigger: "rangeSelectorInput"
                        })))
                }
                var c = this,
                    e = c.chart,
                    g = e.renderer.style || {},
                    k = e.renderer,
                    l = e.options.rangeSelector,
                    h = c.div,
                    n = "min" === a,
                    t, r, u = this.inputGroup;
                this[a + "Label"] = r = k.label(p.lang[n ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(u);
                u.offset += r.width + 5;
                this[a + "DateBox"] = k = k.label("",
                    u.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: l.inputBoxWidth || 90,
                    height: l.inputBoxHeight || 17,
                    stroke: l.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1,
                    "text-align": "center"
                }).on("click", function() {
                    c.showInput(a);
                    c[a + "Input"].focus()
                }).add(u);
                u.offset += k.width + (n ? 10 : 0);
                this[a + "Input"] = t = f("input", {
                    name: a,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: e.plotTop + "px"
                }, h);
                r.css(A(g, l.labelStyle));
                k.css(A({
                    color: "#333333"
                }, g, l.inputStyle));
                q(t, x({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: g.fontSize,
                    fontFamily: g.fontFamily,
                    left: "-9em"
                }, l.inputStyle));
                t.onfocus = function() {
                    c.showInput(a)
                };
                t.onblur = function() {
                    c.hideInput(a)
                };
                t.onchange = b;
                t.onkeypress = function(a) {
                    13 === a.keyCode && b()
                }
            },
            getPosition: function() {
                var a = this.chart,
                    b = a.options.rangeSelector,
                    a = n((b.buttonPosition || {}).y, a.plotTop - a.axisOffset[0] - b.height);
                return {
                    buttonTop: a,
                    inputTop: a - 10
                }
            },
            getYTDExtremes: function(a, b, d) {
                var c = new l(a),
                    e = c[l.hcGetFullYear]();
                d = d ? l.UTC(e,
                    0, 1) : +new l(e, 0, 1);
                b = Math.max(b || 0, d);
                c = c.getTime();
                return {
                    max: Math.min(a || c, c),
                    min: b
                }
            },
            render: function(a, b) {
                var c = this,
                    d = c.chart,
                    e = d.renderer,
                    k = d.container,
                    l = d.options,
                    h = l.exporting && !1 !== l.exporting.enabled && l.navigation && l.navigation.buttonOptions,
                    q = l.rangeSelector,
                    t = c.buttons,
                    l = p.lang,
                    r = c.div,
                    r = c.inputGroup,
                    w = q.buttonTheme,
                    y = q.buttonPosition || {},
                    A = q.inputEnabled,
                    B = w && w.states,
                    C = d.plotLeft,
                    E, F = this.getPosition(),
                    H = c.group,
                    J = c.rendered;
                !1 !== q.enabled && (J || (c.group = H = e.g("range-selector-buttons").add(),
                    c.zoomText = e.text(l.rangeSelectorZoom, n(y.x, C), 15).css(q.labelStyle).add(H), E = n(y.x, C) + c.zoomText.getBBox().width + 5, g(c.buttonOptions, function(a, b) {
                        t[b] = e.button(a.text, E, 0, function() {
                            c.clickButton(b);
                            c.isActive = !0
                        }, w, B && B.hover, B && B.select, B && B.disabled).attr({
                            "text-align": "center"
                        }).add(H);
                        E += t[b].width + n(q.buttonSpacing, 5)
                    }), !1 !== A && (c.div = r = f("div", null, {
                            position: "relative",
                            height: 0,
                            zIndex: 1
                        }), k.parentNode.insertBefore(r, k), c.inputGroup = r = e.g("input-group").add(), r.offset = 0, c.drawInput("min"),
                        c.drawInput("max"))), c.updateButtonStates(), H[J ? "animate" : "attr"]({
                    translateY: F.buttonTop
                }), !1 !== A && (r.align(x({
                    y: F.inputTop,
                    width: r.offset,
                    x: h && F.inputTop < (h.y || 0) + h.height - d.spacing[0] ? -40 : 0
                }, q.inputPosition), !0, d.spacingBox), u(A) || (d = H.getBBox(), r[r.alignAttr.translateX < d.x + d.width + 10 ? "hide" : "show"]()), c.setInputValue("min", a), c.setInputValue("max", b)), c.rendered = !0)
            },
            update: function(a) {
                var b = this.chart;
                A(!0, b.options.rangeSelector, a);
                this.destroy();
                this.init(b)
            },
            destroy: function() {
                var b = this,
                    d = b.minInput,
                    f = b.maxInput;
                b.unMouseDown();
                b.unResize();
                k(b.buttons);
                d && (d.onfocus = d.onblur = d.onchange = null);
                f && (f.onfocus = f.onblur = f.onchange = null);
                a.objectEach(b, function(a, c) {
                    a && "chart" !== c && (a.destroy ? a.destroy() : a.nodeType && e(this[c]));
                    a !== C.prototype[c] && (b[c] = null)
                }, this)
            }
        };
        F.prototype.toFixedRange = function(a, b, e, f) {
            var c = this.chart && this.chart.fixedRange;
            a = n(e, this.translate(a, !0, !this.horiz));
            b = n(f, this.translate(b, !0, !this.horiz));
            e = c && (b - a) / c;
            .7 < e && 1.3 > e && (f ? a = b - c : b = a + c);
            d(a) || (a = b = void 0);
            return {
                min: a,
                max: b
            }
        };
        F.prototype.minFromRange = function() {
            var a = this.range,
                b = {
                    month: "Month",
                    year: "FullYear"
                }[a.type],
                e, f = this.max,
                g, k, l = function(a, c) {
                    var d = new Date(a),
                        e = d["get" + b]();
                    d["set" + b](e + c);
                    e === d["get" + b]() && d.setDate(0);
                    return d.getTime() - a
                };
            d(a) ? (e = f - a, k = a) : (e = f + l(f, -a.count), this.chart && (this.chart.fixedRange = f - e));
            g = n(this.dataMin, Number.MIN_VALUE);
            d(e) || (e = g);
            e <= g && (e = g, void 0 === k && (k = l(e, a.count)), this.newMax = Math.min(e + k, this.dataMax));
            d(f) || (e = void 0);
            return e
        };
        J(E.prototype, "init",
            function(a, b, d) {
                B(this, "init", function() {
                    this.options.rangeSelector.enabled && (this.rangeSelector = new C(this))
                });
                a.call(this, b, d)
            });
        E.prototype.callbacks.push(function(a) {
            function b() {
                c = a.xAxis[0].getExtremes();
                d(c.min) && e.render(c.min, c.max)
            }
            var c, e = a.rangeSelector,
                f, g;
            e && (g = B(a.xAxis[0], "afterSetExtremes", function(a) {
                e.render(a.min, a.max)
            }), f = B(a, "redraw", b), b());
            B(a, "destroy", function() {
                e && (f(), g())
            })
        });
        a.RangeSelector = C
    })(L);
    (function(a) {
        var C = a.arrayMax,
            B = a.arrayMin,
            F = a.Axis,
            E = a.Chart,
            q = a.defined,
            f = a.each,
            t = a.extend,
            p = a.format,
            y = a.grep,
            u = a.inArray,
            k = a.isNumber,
            e = a.isString,
            g = a.map,
            x = a.merge,
            b = a.pick,
            l = a.Point,
            d = a.Renderer,
            A = a.Series,
            n = a.splat,
            H = a.SVGRenderer,
            r = a.VMLRenderer,
            J = a.wrap,
            c = A.prototype,
            w = c.init,
            K = c.processData,
            v = l.prototype.tooltipFormatter;
        a.StockChart = a.stockChart = function(c, d, f) {
            var h = e(c) || c.nodeName,
                k = arguments[h ? 1 : 0],
                l = k.series,
                m = a.getOptions(),
                p, q = b(k.navigator && k.navigator.enabled, m.navigator.enabled, !0),
                t = q ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null,
                r = {
                    marker: {
                        enabled: !1,
                        radius: 2
                    }
                },
                u = {
                    shadow: !1,
                    borderWidth: 0
                };
            k.xAxis = g(n(k.xAxis || {}), function(a) {
                return x({
                    minPadding: 0,
                    maxPadding: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, m.xAxis, a, {
                    type: "datetime",
                    categories: null
                }, t)
            });
            k.yAxis = g(n(k.yAxis || {}), function(a) {
                p = b(a.opposite, !0);
                return x({
                    labels: {
                        y: -2
                    },
                    opposite: p,
                    showLastLabel: !1,
                    title: {
                        text: null
                    }
                }, m.yAxis, a)
            });
            k.series = null;
            k = x({
                chart: {
                    panning: !0,
                    pinchType: "x"
                },
                navigator: {
                    enabled: q
                },
                scrollbar: {
                    enabled: b(m.scrollbar.enabled, !0)
                },
                rangeSelector: {
                    enabled: b(m.rangeSelector.enabled, !0)
                },
                title: {
                    text: null
                },
                tooltip: {
                    shared: !0,
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                },
                plotOptions: {
                    line: r,
                    spline: r,
                    area: r,
                    areaspline: r,
                    arearange: r,
                    areasplinerange: r,
                    column: u,
                    columnrange: u,
                    candlestick: u,
                    ohlc: u
                }
            }, k, {
                isStock: !0
            });
            k.series = l;
            return h ? new E(c, k, f) : new E(k, d)
        };
        J(F.prototype, "autoLabelAlign", function(a) {
            var b = this.chart,
                c = this.options,
                b = b._labelPanes = b._labelPanes || {},
                d = this.options.labels;
            return this.chart.options.isStock && "yAxis" === this.coll && (c = c.top + "," + c.height, !b[c] && d.enabled) ? (15 === d.x &&
                (d.x = 0), void 0 === d.align && (d.align = "right"), b[c] = this, "right") : a.call(this, [].slice.call(arguments, 1))
        });
        J(F.prototype, "destroy", function(a) {
            var b = this.chart,
                c = this.options && this.options.top + "," + this.options.height;
            c && b._labelPanes && b._labelPanes[c] === this && delete b._labelPanes[c];
            return a.call(this, Array.prototype.slice.call(arguments, 1))
        });
        J(F.prototype, "getPlotLinePath", function(c, d, l, h, n, p) {
            var m = this,
                t = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                r = m.chart,
                v = r.renderer,
                w =
                m.left,
                x = m.top,
                z, y, D, A, B = [],
                C = [],
                E, I;
            if ("colorAxis" === m.coll) return c.apply(this, [].slice.call(arguments, 1));
            C = function(a) {
                var b = "xAxis" === a ? "yAxis" : "xAxis";
                a = m.options[b];
                return k(a) ? [r[b][a]] : e(a) ? [r.get(a)] : g(t, function(a) {
                    return a[b]
                })
            }(m.coll);
            f(m.isXAxis ? r.yAxis : r.xAxis, function(a) {
                if (q(a.options.id) ? -1 === a.options.id.indexOf("navigator") : 1) {
                    var b = a.isXAxis ? "yAxis" : "xAxis",
                        b = q(a.options[b]) ? r[b][a.options[b]] : r[b][0];
                    m === b && C.push(a)
                }
            });
            E = C.length ? [] : [m.isXAxis ? r.yAxis[0] : r.xAxis[0]];
            f(C, function(b) {
                -1 !==
                    u(b, E) || a.find(E, function(a) {
                        return a.pos === b.pos && a.len && b.len
                    }) || E.push(b)
            });
            I = b(p, m.translate(d, null, null, h));
            k(I) && (m.horiz ? f(E, function(a) {
                var b;
                y = a.pos;
                A = y + a.len;
                z = D = Math.round(I + m.transB);
                if (z < w || z > w + m.width) n ? z = D = Math.min(Math.max(w, z), w + m.width) : b = !0;
                b || B.push("M", z, y, "L", D, A)
            }) : f(E, function(a) {
                var b;
                z = a.pos;
                D = z + a.len;
                y = A = Math.round(x + m.height - I);
                if (y < x || y > x + m.height) n ? y = A = Math.min(Math.max(x, y), m.top + m.height) : b = !0;
                b || B.push("M", z, y, "L", D, A)
            }));
            return 0 < B.length ? v.crispPolyLine(B, l || 1) :
                null
        });
        F.prototype.getPlotBandPath = function(a, b) {
            b = this.getPlotLinePath(b, null, null, !0);
            a = this.getPlotLinePath(a, null, null, !0);
            var c = [],
                d;
            if (a && b)
                if (a.toString() === b.toString()) c = a, c.flat = !0;
                else
                    for (d = 0; d < a.length; d += 6) c.push("M", a[d + 1], a[d + 2], "L", a[d + 4], a[d + 5], b[d + 4], b[d + 5], b[d + 1], b[d + 2], "z");
            else c = null;
            return c
        };
        H.prototype.crispPolyLine = function(a, b) {
            var c;
            for (c = 0; c < a.length; c += 6) a[c + 1] === a[c + 4] && (a[c + 1] = a[c + 4] = Math.round(a[c + 1]) - b % 2 / 2), a[c + 2] === a[c + 5] && (a[c + 2] = a[c + 5] = Math.round(a[c + 2]) + b % 2 /
                2);
            return a
        };
        d === r && (r.prototype.crispPolyLine = H.prototype.crispPolyLine);
        J(F.prototype, "hideCrosshair", function(a, b) {
            a.call(this, b);
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        });
        J(F.prototype, "drawCrosshair", function(a, c, d) {
            var e, f;
            a.call(this, c, d);
            if (q(this.crosshair.label) && this.crosshair.label.enabled && this.cross) {
                a = this.chart;
                var g = this.options.crosshair.label,
                    k = this.horiz;
                e = this.opposite;
                f = this.left;
                var l = this.top,
                    m = this.crossLabel,
                    n, r = g.format,
                    u = "",
                    v = "inside" === this.options.tickPosition,
                    w = !1 !== this.crosshair.snap,
                    x = 0;
                c || (c = this.cross && this.cross.e);
                n = k ? "center" : e ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center";
                m || (m = this.crossLabel = a.renderer.label(null, null, null, g.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                    align: g.align || n,
                    padding: b(g.padding, 8),
                    r: b(g.borderRadius, 3),
                    zIndex: 2
                }).add(this.labelGroup), m.attr({
                    fill: g.backgroundColor || this.series[0] && this.series[0].color ||
                        "#666666",
                    stroke: g.borderColor || "",
                    "stroke-width": g.borderWidth || 0
                }).css(t({
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontSize: "11px",
                    textAlign: "center"
                }, g.style)));
                k ? (n = w ? d.plotX + f : c.chartX, l += e ? 0 : this.height) : (n = e ? this.width + f : 0, l = w ? d.plotY + l : c.chartY);
                r || g.formatter || (this.isDatetimeAxis && (u = "%b %d, %Y"), r = "{value" + (u ? ":" + u : "") + "}");
                c = w ? d[this.isXAxis ? "x" : "y"] : this.toValue(k ? c.chartX : c.chartY);
                m.attr({
                    text: r ? p(r, {
                        value: c
                    }) : g.formatter.call(this, c),
                    x: n,
                    y: l,
                    visibility: "visible"
                });
                c = m.getBBox();
                if (k) {
                    if (v &&
                        !e || !v && e) l = m.y - c.height
                } else l = m.y - c.height / 2;
                k ? (e = f - c.x, f = f + this.width - c.x) : (e = "left" === this.labelAlign ? f : 0, f = "right" === this.labelAlign ? f + this.width : a.chartWidth);
                m.translateX < e && (x = e - m.translateX);
                m.translateX + c.width >= f && (x = -(m.translateX + c.width - f));
                m.attr({
                    x: n + x,
                    y: l,
                    anchorX: k ? n : this.opposite ? 0 : a.chartWidth,
                    anchorY: k ? this.opposite ? a.chartHeight : 0 : l + c.height / 2
                })
            }
        });
        c.init = function() {
            w.apply(this, arguments);
            this.setCompare(this.options.compare)
        };
        c.setCompare = function(a) {
            this.modifyValue = "value" ===
                a || "percent" === a ? function(b, c) {
                    var d = this.compareValue;
                    if (void 0 !== b && void 0 !== d) return b = "value" === a ? b - d : b / d * 100 - (100 === this.options.compareBase ? 0 : 100), c && (c.change = b), b
                } : null;
            this.userOptions.compare = a;
            this.chart.hasRendered && (this.isDirty = !0)
        };
        c.processData = function() {
            var a, b = -1,
                c, d, e, f;
            K.apply(this, arguments);
            if (this.xAxis && this.processedYData)
                for (c = this.processedXData, d = this.processedYData, e = d.length, this.pointArrayMap && (b = u("close", this.pointArrayMap), -1 === b && (b = u(this.pointValKey || "y", this.pointArrayMap))),
                    a = 0; a < e - 1; a++)
                    if (f = d[a] && -1 < b ? d[a][b] : d[a], k(f) && c[a + 1] >= this.xAxis.min && 0 !== f) {
                        this.compareValue = f;
                        break
                    }
        };
        J(c, "getExtremes", function(a) {
            var b;
            a.apply(this, [].slice.call(arguments, 1));
            this.modifyValue && (b = [this.modifyValue(this.dataMin), this.modifyValue(this.dataMax)], this.dataMin = B(b), this.dataMax = C(b))
        });
        F.prototype.setCompare = function(a, c) {
            this.isXAxis || (f(this.series, function(b) {
                b.setCompare(a)
            }), b(c, !0) && this.chart.redraw())
        };
        l.prototype.tooltipFormatter = function(c) {
            c = c.replace("{point.change}",
                (0 < this.change ? "+" : "") + a.numberFormat(this.change, b(this.series.tooltipOptions.changeDecimals, 2)));
            return v.apply(this, [c])
        };
        J(A.prototype, "render", function(a) {
            this.chart.is3d && this.chart.is3d() || this.chart.polar || !this.xAxis || this.xAxis.isRadial || (!this.clipBox && this.animate ? (this.clipBox = x(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] ? this.chart[this.sharedClipKey].attr({
                    width: this.xAxis.len,
                    height: this.yAxis.len
                }) : this.clipBox &&
                (this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len));
            a.call(this)
        });
        J(E.prototype, "getSelectedPoints", function(a) {
            var b = a.call(this);
            f(this.series, function(a) {
                a.hasGroupedData && (b = b.concat(y(a.points || [], function(a) {
                    return a.selected
                })))
            });
            return b
        });
        J(E.prototype, "update", function(a, b) {
            "scrollbar" in b && this.navigator && (x(!0, this.options.scrollbar, b.scrollbar), this.navigator.update({}, !1), delete b.scrollbar);
            return a.apply(this, Array.prototype.slice.call(arguments, 1))
        })
    })(L);
    return L
});