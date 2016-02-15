(function () {
    function p() {
        window.requestAnimFrame(p), a = d(0, 360), s.globalCompositeOperation = "destination-out", s.fillStyle = "rgba(0, 0, 0, 0.5)", s.fillRect(0, 0, e, t), s.globalCompositeOperation = "source-over";
        var n = u.length;
        while (n--) u[n].draw(), u[n].update(n)
    }

    function d(e, t) {
        return Math.random() * (t - e) + e
    }

    function v() {
        i = $('<canvas/>').appendTo(n).css({
            position: "absolute",
            left: -20,
            top: -44,
            zIndex: 999,
            pointerEvents: "none"
        }), s = i[0].getContext("2d"), r = $("<div />").appendTo(n).css({
            fontSize: "16px",
            fontFamily: "arial",
            height: 1,
            position: "absolute",
            left: 15,
            top: 50,
            zIndex: 0,
            visibility: "hidden",
            whiteSpace: "nowrap"
        })
    }

    if (/msie/i.test(navigator.userAgent)) return;

    var e = 600,
        t = 100,
        n = $("body"),
        r = null,
        i = null,
        s = null,
        o = !1,
        u = [],
        a = 120,
        f = 10,
        l = 0,
        c = 0,
        h = function (e, t, n) {
            var r = this;
            r.x = e, r.y = t, r.dir = n, r.coord = {}, r.angle = d(0, -Math.PI), r.speed = d(2, 8), r.friction = .95, r.gravity = 1, r.hue = d(a - 10, a + 10), r.brightness = d(50, 80), r.alpha = 1, r.decay = d(.03, .05), r.init()
        };
    h.prototype = {
        init: function () {
            var e = this;
            e.coord = {
                x: e.x,
                y: e.y
            }
        },
        update: function (e) {
            var t = this;
            t.coord = {
                x: t.x,
                y: t.y
            }, t.speed *= t.friction, t.x += Math.cos(t.angle) * t.speed + t.dir, t.y += Math.sin(t.angle) * t.speed + t.gravity, t.alpha -= t.decay, t.alpha <= t.decay && u.splice(e, 1)
        },
        draw: function () {
            var e = this;
            s.fillStyle = "hsla(" + e.hue + ", 100%, " + e.brightness + "%, " + e.alpha + ")", s.beginPath(), s.arc(e.coord.x, e.coord.y, 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill()
        }
    }, window.requestAnimFrame = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || function (e) {
                window.setTimeout(e, 1e3 / 60)
            }
    }();



    $(".input_key").focus(function () {
        o || (v(), o = !0, p());
        var n = $(this).offset().top;
        var t = $(this).offset().left;
        var w = $(this).width();
        var h = $(this).height();
        var e = $("body");
        i.appendTo(e), e.attr("name") == "f3" && ($("body").hasClass("layout1") ? t = 97 : t = -20), i.css({
            left: t,
            top: n
        });

        i.attr("width",parseInt(w) + 100);
        i.attr("height",h+50);


        h = i.height();
        t = $(this).height();
        n = n - (h - t) / 2;
        i.css({
            top: n
        });
    });

    $(".input_key").on("keydown", function (e) {
        var t = $("form");
        if (!(this.selectionStart >= 0 && r)) return;
        var n = this.selectionStart,
            i = this.value.substring(0, n).replace(/ /g, "&nbsp;"),
            s = r.html(i).width(),
            o = 0;
            r.css("max-width","1820px");
            r.css("overflow","hidden");
        i.length > c ? o = -2 : o = 2, c = i.length, s >= 500 && (s = 500);
        var a = f;
        while (a--) u.push(new h(s + 50, 60, o));
        t.css({
            "-webkit-transform": "translate(-1px, 1px)",
            "-moz-transform": "translate(-1px, 1px)",
            "-o-transform": "translate(-1px, 1px)",
            transform: "translate(-1px, 1px)"
        }), setTimeout(function () {
            t.css({
                "-webkit-transform": "none",
                "-moz-transform": "none",
                "-o-transform": "none",
                transform: "none"
            })
        }, 10);
    });
})();