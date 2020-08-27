/* axios v0.19.2 | (c) 2020 by Matt Zabriskie */
!(function(e, t) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define([], t)
        : "object" == typeof exports
        ? (exports.axios = t())
        : (e.axios = t());
})(this, function() {
    return (function(e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = (n[r] = { exports: {}, id: r, loaded: !1 });
            return (
                e[r].call(o.exports, o, o.exports, t),
                (o.loaded = !0),
                o.exports
            );
        }
        var n = {};
        return (t.m = e), (t.c = n), (t.p = ""), t(0);
    })([
        function(e, t, n) {
            e.exports = n(1);
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                var t = new s(e),
                    n = i(s.prototype.request, t);
                return o.extend(n, s.prototype, t), o.extend(n, t), n;
            }
            var o = n(2),
                i = n(3),
                s = n(4),
                a = n(22),
                u = n(10),
                c = r(u);
            (c.Axios = s),
                (c.create = function(e) {
                    return r(a(c.defaults, e));
                }),
                (c.Cancel = n(23)),
                (c.CancelToken = n(24)),
                (c.isCancel = n(9)),
                (c.all = function(e) {
                    return Promise.all(e);
                }),
                (c.spread = n(25)),
                (e.exports = c),
                (e.exports.default = c);
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                return "[object Array]" === j.call(e);
            }
            function o(e) {
                return "undefined" == typeof e;
            }
            function i(e) {
                return (
                    null !== e &&
                    !o(e) &&
                    null !== e.constructor &&
                    !o(e.constructor) &&
                    "function" == typeof e.constructor.isBuffer &&
                    e.constructor.isBuffer(e)
                );
            }
            function s(e) {
                return "[object ArrayBuffer]" === j.call(e);
            }
            function a(e) {
                return "undefined" != typeof FormData && e instanceof FormData;
            }
            function u(e) {
                var t;
                return (t =
                    "undefined" != typeof ArrayBuffer && ArrayBuffer.isView
                        ? ArrayBuffer.isView(e)
                        : e && e.buffer && e.buffer instanceof ArrayBuffer);
            }
            function c(e) {
                return "string" == typeof e;
            }
            function f(e) {
                return "number" == typeof e;
            }
            function p(e) {
                return null !== e && "object" == typeof e;
            }
            function d(e) {
                return "[object Date]" === j.call(e);
            }
            function l(e) {
                return "[object File]" === j.call(e);
            }
            function h(e) {
                return "[object Blob]" === j.call(e);
            }
            function m(e) {
                return "[object Function]" === j.call(e);
            }
            function y(e) {
                return p(e) && m(e.pipe);
            }
            function g(e) {
                return (
                    "undefined" != typeof URLSearchParams &&
                    e instanceof URLSearchParams
                );
            }
            function v(e) {
                return e.replace(/^\s*/, "").replace(/\s*$/, "");
            }
            function x() {
                return (
                    ("undefined" == typeof navigator ||
                        ("ReactNative" !== navigator.product &&
                            "NativeScript" !== navigator.product &&
                            "NS" !== navigator.product)) &&
                    "undefined" != typeof window &&
                        "undefined" != typeof document
                );
            }
            function w(e, t) {
                if (null !== e && "undefined" != typeof e)
                    if (("object" != typeof e && (e = [e]), r(e)))
                        for (var n = 0, o = e.length; n < o; n++)
                            t.call(null, e[n], n, e);
                    else
                        for (var i in e)
                            Object.prototype.hasOwnProperty.call(e, i) &&
                                t.call(null, e[i], i, e);
            }
            function b() {
                function e(e, n) {
                    "object" == typeof t[n] && "object" == typeof e
                        ? (t[n] = b(t[n], e))
                        : (t[n] = e);
                }
                for (var t = {}, n = 0, r = arguments.length; n < r; n++)
                    w(arguments[n], e);
                return t;
            }
            function E() {
                function e(e, n) {
                    "object" == typeof t[n] && "object" == typeof e
                        ? (t[n] = E(t[n], e))
                        : "object" == typeof e
                        ? (t[n] = E({}, e))
                        : (t[n] = e);
                }
                for (var t = {}, n = 0, r = arguments.length; n < r; n++)
                    w(arguments[n], e);
                return t;
            }
            function S(e, t, n) {
                return (
                    w(t, function(t, r) {
                        n && "function" == typeof t
                            ? (e[r] = C(t, n))
                            : (e[r] = t);
                    }),
                    e
                );
            }
            var C = n(3),
                j = Object.prototype.toString;
            e.exports = {
                isArray: r,
                isArrayBuffer: s,
                isBuffer: i,
                isFormData: a,
                isArrayBufferView: u,
                isString: c,
                isNumber: f,
                isObject: p,
                isUndefined: o,
                isDate: d,
                isFile: l,
                isBlob: h,
                isFunction: m,
                isStream: y,
                isURLSearchParams: g,
                isStandardBrowserEnv: x,
                forEach: w,
                merge: b,
                deepMerge: E,
                extend: S,
                trim: v
            };
        },
        function(e, t) {
            "use strict";
            e.exports = function(e, t) {
                return function() {
                    for (
                        var n = new Array(arguments.length), r = 0;
                        r < n.length;
                        r++
                    )
                        n[r] = arguments[r];
                    return e.apply(t, n);
                };
            };
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                (this.defaults = e),
                    (this.interceptors = {
                        request: new s(),
                        response: new s()
                    });
            }
            var o = n(2),
                i = n(5),
                s = n(6),
                a = n(7),
                u = n(22);
            (r.prototype.request = function(e) {
                "string" == typeof e
                    ? ((e = arguments[1] || {}), (e.url = arguments[0]))
                    : (e = e || {}),
                    (e = u(this.defaults, e)),
                    e.method
                        ? (e.method = e.method.toLowerCase())
                        : this.defaults.method
                        ? (e.method = this.defaults.method.toLowerCase())
                        : (e.method = "get");
                var t = [a, void 0],
                    n = Promise.resolve(e);
                for (
                    this.interceptors.request.forEach(function(e) {
                        t.unshift(e.fulfilled, e.rejected);
                    }),
                        this.interceptors.response.forEach(function(e) {
                            t.push(e.fulfilled, e.rejected);
                        });
                    t.length;

                )
                    n = n.then(t.shift(), t.shift());
                return n;
            }),
                (r.prototype.getUri = function(e) {
                    return (
                        (e = u(this.defaults, e)),
                        i(e.url, e.params, e.paramsSerializer).replace(
                            /^\?/,
                            ""
                        )
                    );
                }),
                o.forEach(["delete", "get", "head", "options"], function(e) {
                    r.prototype[e] = function(t, n) {
                        return this.request(
                            o.merge(n || {}, { method: e, url: t })
                        );
                    };
                }),
                o.forEach(["post", "put", "patch"], function(e) {
                    r.prototype[e] = function(t, n, r) {
                        return this.request(
                            o.merge(r || {}, { method: e, url: t, data: n })
                        );
                    };
                }),
                (e.exports = r);
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                return encodeURIComponent(e)
                    .replace(/%40/gi, "@")
                    .replace(/%3A/gi, ":")
                    .replace(/%24/g, "$")
                    .replace(/%2C/gi, ",")
                    .replace(/%20/g, "+")
                    .replace(/%5B/gi, "[")
                    .replace(/%5D/gi, "]");
            }
            var o = n(2);
            e.exports = function(e, t, n) {
                if (!t) return e;
                var i;
                if (n) i = n(t);
                else if (o.isURLSearchParams(t)) i = t.toString();
                else {
                    var s = [];
                    o.forEach(t, function(e, t) {
                        null !== e &&
                            "undefined" != typeof e &&
                            (o.isArray(e) ? (t += "[]") : (e = [e]),
                            o.forEach(e, function(e) {
                                o.isDate(e)
                                    ? (e = e.toISOString())
                                    : o.isObject(e) && (e = JSON.stringify(e)),
                                    s.push(r(t) + "=" + r(e));
                            }));
                    }),
                        (i = s.join("&"));
                }
                if (i) {
                    var a = e.indexOf("#");
                    a !== -1 && (e = e.slice(0, a)),
                        (e += (e.indexOf("?") === -1 ? "?" : "&") + i);
                }
                return e;
            };
        },
        function(e, t, n) {
            "use strict";
            function r() {
                this.handlers = [];
            }
            var o = n(2);
            (r.prototype.use = function(e, t) {
                return (
                    this.handlers.push({ fulfilled: e, rejected: t }),
                    this.handlers.length - 1
                );
            }),
                (r.prototype.eject = function(e) {
                    this.handlers[e] && (this.handlers[e] = null);
                }),
                (r.prototype.forEach = function(e) {
                    o.forEach(this.handlers, function(t) {
                        null !== t && e(t);
                    });
                }),
                (e.exports = r);
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                e.cancelToken && e.cancelToken.throwIfRequested();
            }
            var o = n(2),
                i = n(8),
                s = n(9),
                a = n(10);
            e.exports = function(e) {
                r(e),
                    (e.headers = e.headers || {}),
                    (e.data = i(e.data, e.headers, e.transformRequest)),
                    (e.headers = o.merge(
                        e.headers.common || {},
                        e.headers[e.method] || {},
                        e.headers
                    )),
                    o.forEach(
                        [
                            "delete",
                            "get",
                            "head",
                            "post",
                            "put",
                            "patch",
                            "common"
                        ],
                        function(t) {
                            delete e.headers[t];
                        }
                    );
                var t = e.adapter || a.adapter;
                return t(e).then(
                    function(t) {
                        return (
                            r(e),
                            (t.data = i(
                                t.data,
                                t.headers,
                                e.transformResponse
                            )),
                            t
                        );
                    },
                    function(t) {
                        return (
                            s(t) ||
                                (r(e),
                                t &&
                                    t.response &&
                                    (t.response.data = i(
                                        t.response.data,
                                        t.response.headers,
                                        e.transformResponse
                                    ))),
                            Promise.reject(t)
                        );
                    }
                );
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(2);
            e.exports = function(e, t, n) {
                return (
                    r.forEach(n, function(n) {
                        e = n(e, t);
                    }),
                    e
                );
            };
        },
        function(e, t) {
            "use strict";
            e.exports = function(e) {
                return !(!e || !e.__CANCEL__);
            };
        },
        function(e, t, n) {
            "use strict";
            function r(e, t) {
                !i.isUndefined(e) &&
                    i.isUndefined(e["Content-Type"]) &&
                    (e["Content-Type"] = t);
            }
            function o() {
                var e;
                return (
                    "undefined" != typeof XMLHttpRequest
                        ? (e = n(12))
                        : "undefined" != typeof process &&
                          "[object process]" ===
                              Object.prototype.toString.call(process) &&
                          (e = n(12)),
                    e
                );
            }
            var i = n(2),
                s = n(11),
                a = { "Content-Type": "application/x-www-form-urlencoded" },
                u = {
                    adapter: o(),
                    transformRequest: [
                        function(e, t) {
                            return (
                                s(t, "Accept"),
                                s(t, "Content-Type"),
                                i.isFormData(e) ||
                                i.isArrayBuffer(e) ||
                                i.isBuffer(e) ||
                                i.isStream(e) ||
                                i.isFile(e) ||
                                i.isBlob(e)
                                    ? e
                                    : i.isArrayBufferView(e)
                                    ? e.buffer
                                    : i.isURLSearchParams(e)
                                    ? (r(
                                          t,
                                          "application/x-www-form-urlencoded;charset=utf-8"
                                      ),
                                      e.toString())
                                    : i.isObject(e)
                                    ? (r(t, "application/json;charset=utf-8"),
                                      JSON.stringify(e))
                                    : e
                            );
                        }
                    ],
                    transformResponse: [
                        function(e) {
                            if ("string" == typeof e)
                                try {
                                    e = JSON.parse(e);
                                } catch (e) {}
                            return e;
                        }
                    ],
                    timeout: 0,
                    xsrfCookieName: "XSRF-TOKEN",
                    xsrfHeaderName: "X-XSRF-TOKEN",
                    maxContentLength: -1,
                    validateStatus: function(e) {
                        return e >= 200 && e < 300;
                    }
                };
            (u.headers = {
                common: { Accept: "application/json, text/plain, */*" }
            }),
                i.forEach(["delete", "get", "head"], function(e) {
                    u.headers[e] = {};
                }),
                i.forEach(["post", "put", "patch"], function(e) {
                    u.headers[e] = i.merge(a);
                }),
                (e.exports = u);
        },
        function(e, t, n) {
            "use strict";
            var r = n(2);
            e.exports = function(e, t) {
                r.forEach(e, function(n, r) {
                    r !== t &&
                        r.toUpperCase() === t.toUpperCase() &&
                        ((e[t] = n), delete e[r]);
                });
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(2),
                o = n(13),
                i = n(5),
                s = n(16),
                a = n(19),
                u = n(20),
                c = n(14);
            e.exports = function(e) {
                return new Promise(function(t, f) {
                    var p = e.data,
                        d = e.headers;
                    r.isFormData(p) && delete d["Content-Type"];
                    var l = new XMLHttpRequest();
                    if (e.auth) {
                        var h = e.auth.username || "",
                            m = e.auth.password || "";
                        d.Authorization = "Basic " + btoa(h + ":" + m);
                    }
                    var y = s(e.baseURL, e.url);
                    if (
                        (l.open(
                            e.method.toUpperCase(),
                            i(y, e.params, e.paramsSerializer),
                            !0
                        ),
                        (l.timeout = e.timeout),
                        (l.onreadystatechange = function() {
                            if (
                                l &&
                                4 === l.readyState &&
                                (0 !== l.status ||
                                    (l.responseURL &&
                                        0 === l.responseURL.indexOf("file:")))
                            ) {
                                var n =
                                        "getAllResponseHeaders" in l
                                            ? a(l.getAllResponseHeaders())
                                            : null,
                                    r =
                                        e.responseType &&
                                        "text" !== e.responseType
                                            ? l.response
                                            : l.responseText,
                                    i = {
                                        data: r,
                                        status: l.status,
                                        statusText: l.statusText,
                                        headers: n,
                                        config: e,
                                        request: l
                                    };
                                o(t, f, i), (l = null);
                            }
                        }),
                        (l.onabort = function() {
                            l &&
                                (f(c("Request aborted", e, "ECONNABORTED", l)),
                                (l = null));
                        }),
                        (l.onerror = function() {
                            f(c("Network Error", e, null, l)), (l = null);
                        }),
                        (l.ontimeout = function() {
                            var t = "timeout of " + e.timeout + "ms exceeded";
                            e.timeoutErrorMessage &&
                                (t = e.timeoutErrorMessage),
                                f(c(t, e, "ECONNABORTED", l)),
                                (l = null);
                        }),
                        r.isStandardBrowserEnv())
                    ) {
                        var g = n(21),
                            v =
                                (e.withCredentials || u(y)) && e.xsrfCookieName
                                    ? g.read(e.xsrfCookieName)
                                    : void 0;
                        v && (d[e.xsrfHeaderName] = v);
                    }
                    if (
                        ("setRequestHeader" in l &&
                            r.forEach(d, function(e, t) {
                                "undefined" == typeof p &&
                                "content-type" === t.toLowerCase()
                                    ? delete d[t]
                                    : l.setRequestHeader(t, e);
                            }),
                        r.isUndefined(e.withCredentials) ||
                            (l.withCredentials = !!e.withCredentials),
                        e.responseType)
                    )
                        try {
                            l.responseType = e.responseType;
                        } catch (t) {
                            if ("json" !== e.responseType) throw t;
                        }
                    "function" == typeof e.onDownloadProgress &&
                        l.addEventListener("progress", e.onDownloadProgress),
                        "function" == typeof e.onUploadProgress &&
                            l.upload &&
                            l.upload.addEventListener(
                                "progress",
                                e.onUploadProgress
                            ),
                        e.cancelToken &&
                            e.cancelToken.promise.then(function(e) {
                                l && (l.abort(), f(e), (l = null));
                            }),
                        void 0 === p && (p = null),
                        l.send(p);
                });
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(14);
            e.exports = function(e, t, n) {
                var o = n.config.validateStatus;
                !o || o(n.status)
                    ? e(n)
                    : t(
                          r(
                              "Request failed with status code " + n.status,
                              n.config,
                              null,
                              n.request,
                              n
                          )
                      );
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(15);
            e.exports = function(e, t, n, o, i) {
                var s = new Error(e);
                return r(s, t, n, o, i);
            };
        },
        function(e, t) {
            "use strict";
            e.exports = function(e, t, n, r, o) {
                return (
                    (e.config = t),
                    n && (e.code = n),
                    (e.request = r),
                    (e.response = o),
                    (e.isAxiosError = !0),
                    (e.toJSON = function() {
                        return {
                            message: this.message,
                            name: this.name,
                            description: this.description,
                            number: this.number,
                            fileName: this.fileName,
                            lineNumber: this.lineNumber,
                            columnNumber: this.columnNumber,
                            stack: this.stack,
                            config: this.config,
                            code: this.code
                        };
                    }),
                    e
                );
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(17),
                o = n(18);
            e.exports = function(e, t) {
                return e && !r(t) ? o(e, t) : t;
            };
        },
        function(e, t) {
            "use strict";
            e.exports = function(e) {
                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
            };
        },
        function(e, t) {
            "use strict";
            e.exports = function(e, t) {
                return t
                    ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "")
                    : e;
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(2),
                o = [
                    "age",
                    "authorization",
                    "content-length",
                    "content-type",
                    "etag",
                    "expires",
                    "from",
                    "host",
                    "if-modified-since",
                    "if-unmodified-since",
                    "last-modified",
                    "location",
                    "max-forwards",
                    "proxy-authorization",
                    "referer",
                    "retry-after",
                    "user-agent"
                ];
            e.exports = function(e) {
                var t,
                    n,
                    i,
                    s = {};
                return e
                    ? (r.forEach(e.split("\n"), function(e) {
                          if (
                              ((i = e.indexOf(":")),
                              (t = r.trim(e.substr(0, i)).toLowerCase()),
                              (n = r.trim(e.substr(i + 1))),
                              t)
                          ) {
                              if (s[t] && o.indexOf(t) >= 0) return;
                              "set-cookie" === t
                                  ? (s[t] = (s[t] ? s[t] : []).concat([n]))
                                  : (s[t] = s[t] ? s[t] + ", " + n : n);
                          }
                      }),
                      s)
                    : s;
            };
        },
        function(e, t, n) {
            "use strict";
            var r = n(2);
            e.exports = r.isStandardBrowserEnv()
                ? (function() {
                      function e(e) {
                          var t = e;
                          return (
                              n && (o.setAttribute("href", t), (t = o.href)),
                              o.setAttribute("href", t),
                              {
                                  href: o.href,
                                  protocol: o.protocol
                                      ? o.protocol.replace(/:$/, "")
                                      : "",
                                  host: o.host,
                                  search: o.search
                                      ? o.search.replace(/^\?/, "")
                                      : "",
                                  hash: o.hash ? o.hash.replace(/^#/, "") : "",
                                  hostname: o.hostname,
                                  port: o.port,
                                  pathname:
                                      "/" === o.pathname.charAt(0)
                                          ? o.pathname
                                          : "/" + o.pathname
                              }
                          );
                      }
                      var t,
                          n = /(msie|trident)/i.test(navigator.userAgent),
                          o = document.createElement("a");
                      return (
                          (t = e(window.location.href)),
                          function(n) {
                              var o = r.isString(n) ? e(n) : n;
                              return (
                                  o.protocol === t.protocol && o.host === t.host
                              );
                          }
                      );
                  })()
                : (function() {
                      return function() {
                          return !0;
                      };
                  })();
        },
        function(e, t, n) {
            "use strict";
            var r = n(2);
            e.exports = r.isStandardBrowserEnv()
                ? (function() {
                      return {
                          write: function(e, t, n, o, i, s) {
                              var a = [];
                              a.push(e + "=" + encodeURIComponent(t)),
                                  r.isNumber(n) &&
                                      a.push(
                                          "expires=" + new Date(n).toGMTString()
                                      ),
                                  r.isString(o) && a.push("path=" + o),
                                  r.isString(i) && a.push("domain=" + i),
                                  s === !0 && a.push("secure"),
                                  (document.cookie = a.join("; "));
                          },
                          read: function(e) {
                              var t = document.cookie.match(
                                  new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
                              );
                              return t ? decodeURIComponent(t[3]) : null;
                          },
                          remove: function(e) {
                              this.write(e, "", Date.now() - 864e5);
                          }
                      };
                  })()
                : (function() {
                      return {
                          write: function() {},
                          read: function() {
                              return null;
                          },
                          remove: function() {}
                      };
                  })();
        },
        function(e, t, n) {
            "use strict";
            var r = n(2);
            e.exports = function(e, t) {
                t = t || {};
                var n = {},
                    o = ["url", "method", "params", "data"],
                    i = ["headers", "auth", "proxy"],
                    s = [
                        "baseURL",
                        "url",
                        "transformRequest",
                        "transformResponse",
                        "paramsSerializer",
                        "timeout",
                        "withCredentials",
                        "adapter",
                        "responseType",
                        "xsrfCookieName",
                        "xsrfHeaderName",
                        "onUploadProgress",
                        "onDownloadProgress",
                        "maxContentLength",
                        "validateStatus",
                        "maxRedirects",
                        "httpAgent",
                        "httpsAgent",
                        "cancelToken",
                        "socketPath"
                    ];
                r.forEach(o, function(e) {
                    "undefined" != typeof t[e] && (n[e] = t[e]);
                }),
                    r.forEach(i, function(o) {
                        r.isObject(t[o])
                            ? (n[o] = r.deepMerge(e[o], t[o]))
                            : "undefined" != typeof t[o]
                            ? (n[o] = t[o])
                            : r.isObject(e[o])
                            ? (n[o] = r.deepMerge(e[o]))
                            : "undefined" != typeof e[o] && (n[o] = e[o]);
                    }),
                    r.forEach(s, function(r) {
                        "undefined" != typeof t[r]
                            ? (n[r] = t[r])
                            : "undefined" != typeof e[r] && (n[r] = e[r]);
                    });
                var a = o.concat(i).concat(s),
                    u = Object.keys(t).filter(function(e) {
                        return a.indexOf(e) === -1;
                    });
                return (
                    r.forEach(u, function(r) {
                        "undefined" != typeof t[r]
                            ? (n[r] = t[r])
                            : "undefined" != typeof e[r] && (n[r] = e[r]);
                    }),
                    n
                );
            };
        },
        function(e, t) {
            "use strict";
            function n(e) {
                this.message = e;
            }
            (n.prototype.toString = function() {
                return "Cancel" + (this.message ? ": " + this.message : "");
            }),
                (n.prototype.__CANCEL__ = !0),
                (e.exports = n);
        },
        function(e, t, n) {
            "use strict";
            function r(e) {
                if ("function" != typeof e)
                    throw new TypeError("executor must be a function.");
                var t;
                this.promise = new Promise(function(e) {
                    t = e;
                });
                var n = this;
                e(function(e) {
                    n.reason || ((n.reason = new o(e)), t(n.reason));
                });
            }
            var o = n(23);
            (r.prototype.throwIfRequested = function() {
                if (this.reason) throw this.reason;
            }),
                (r.source = function() {
                    var e,
                        t = new r(function(t) {
                            e = t;
                        });
                    return { token: t, cancel: e };
                }),
                (e.exports = r);
        },
        function(e, t) {
            "use strict";
            e.exports = function(e) {
                return function(t) {
                    return e.apply(null, t);
                };
            };
        }
    ]);
});
//# sourceMappingURL=axios.min.map
