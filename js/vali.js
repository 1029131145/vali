/*!
 * Copyright 2015, Lu Kang
 * WeChat：lukangdaye
 * https://github.com/1029131145/vali
 */

(function ($) {
    var vali_current = 0;
    $.fn.vali = function (A) {
        if (!this.is("form")) {
            console.error("Not is Form");
            return false;
        }

        var _, _id, _o, _v, _x, _y, _Rep, _r, _e, _s, _top, _left, _prompt, _err, _validate, _custom, _c;

        _custom = new Array();
        _r = new Array();
        _r[0] = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        _r[1] = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        _r[2] = /^\d{19}|\d{18}|\d{17}|\d{16}|\d{15}$/;
        _r[3] = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

        _prompt = {
            "Success": "Success",
            "email": "Please enter the correct email address",
            "phone": "Please enter the correct cell phone number",
            "max": "Can not exceed ｛0｝ characters",
            "min": "Not less than ｛0｝ characters",
            "bank": "Please enter the correct bank card number",
            "only": "Contain only",
            "must": "Must contain",
            "first_must": "The first must be：",
            "first_cannot": "The first cannot be：",
            "number": "Please enter a number",
            "idcard": "Please enter the correct ID number",
            "equally": "Must be the same",
            "cannot": "cannot is ｛0｝",
            "date": "Please enter the correct date",
            "value0": "Chinese",                    //汉字
            "value1": "Letter",                     //字母
            "value2": "Number",                     //数字
            "value3": "Space"                       //空格字符
        };

        try {
            var ifs = vali_prompt;
            _prompt = ifs;
        } catch (e) {
            console.log("No prompt");
        }

        _c = function () {
            this._ele = null;
            this._fun = null;
            this._err = null;
        };

        _validate = function () {
            this._email = false;
            this._phone = false;
            this._max = false;
            this._min = false;
            this._bank = false;
            this._only = false;
            this._must = false;
            this._first_must = false;
            this._first_cannot = false;
            this._number = false;
            this._idcard = false;
            this._equally = false;
            this._cannot = false;
            this._custom = false;
            this._date = false;
            var _this = this;
            this.setAttr = function (obj) {
                _this._email = obj.attr("email");
                _this._phone = obj.attr("phone");
                _this._max = obj.attr("max");
                _this._min = obj.attr("min");
                _this._bank = obj.attr("bank");
                _this._only = obj.attr("only");
                _this._must = obj.attr("must");
                _this._first_must = obj.attr("first_must");
                _this._first_cannot = obj.attr("first_cannot");
                _this._number = obj.attr("number");
                _this._idcard = obj.attr("idcard");
                _this._equally = obj.attr("equally");
                _this._cannot = obj.attr("cannot");
                _this._custom = obj.attr("custom");
                _this._date = obj.attr("date");
            }
        };

        _ = $(this), _id = 0, _err = 0, _e = "" , _s = "";
        _id = vali_current;
        var _A = {
            "vali": "vali",
            "disparityH": 8,
            "disparityW": 0,
            "prompt_width": true,
            "prompt_log": false,
            "success_show": false,
            "icon_show": true,
            "icon_img": false,
            "icon_img_eu": "",
            "icon_img_su": "",
            "decimal_places": 2,
            "custom": null
        };
        $.extend(_A, A);

        if (_A["icon_show"]) {
            _e = ' <i class="fa fa-remove"></i>';
            _s = ' <i class="fa fa-check"></i>';
            if (_A["icon_img"]) {
                _e = '<img src="' + _A["icon_img_eu"] + '" >';
                _s = '<img src="' + _A["icon_img_su"] + '" >';
            }
        }

        var init, code, input_focus, input_blur, prompt_log, validate_error, validate_success, se_switch, err_validate, custom;

        se_switch = function (p, i) {
            if (i) {
                p.removeClass("error");
                p.addClass("success")
            } else {
                p.removeClass("success");
                p.addClass("error")
            }

        };

        prompt_log = function (f) {
            if (_A["prompt_log"]) {
                var date = new Date();
                console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "-->" + f);
            }
        };

        init = function (obj) {
            _id++;
            vali_current++;
            _o = obj;
            _top = obj.offset().top;
            _left = obj.offset().left;
            _x = obj.width();
            _y = obj.height();
        };

        code = function () {
            _o.attr("valiid", +_id);
            $("body").prepend('<label class="validate_label_prompt" id="valiid' + _id + '"></label>');
            $("#valiid" + _id).css({
                "top": (_top - 1 + _y + _A["disparityH"] + 1) + "px",
                "left": (_left - 1 + _A["disparityW"] + 1) + "px"
            });

            if (_A["prompt_width"]) {
                $("#valiid" + _id).css("width", _x);
            }

        };

        input_focus = function (id) {
            var prompt = $("#valiid" + id);
            _o.focus(function () {
                prompt.hide();
            });
        };

        input_blur = function (id) {
            var validate = new _validate();
            validate.setAttr(_o);
            var prompt = $("#valiid" + id);
            _o.blur(function () {
                _o = $(this);
                _err = 0;
                _v = $(this).val();
                if (err_validate(validate, prompt) == false) {
                    prompt_log("input_blur is Error");
                }
                if (_err == 0) {
                    validate_success(prompt);
                }
            });
        };


        err_validate = function (validate, prompt) {


            validate._email ? input_email(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._phone ? input_phone(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._max ? input_max(prompt, validate._max) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._min ? input_min(prompt, validate._min) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._bank ? input_bank(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._only ? input_only(prompt, validate._only) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._must ? input_must(prompt, validate._must) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._first_must ? input_first_must(prompt, validate._first_must) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._first_cannot ? input_first_cannot(prompt, validate._first_cannot) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._number ? input_number(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._idcard ? input_idcard(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._equally ? input_equally(prompt, validate._equally) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._cannot ? input_cannot(prompt, validate._cannot) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._custom ? input_custom(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }
            validate._date ? input_date(prompt) : prompt_log("Not");
            if (_err != 0) {
                return false;
            }

            return true;

        };

        validate_error = function (p) {
            se_switch(p, false);
            p.fadeIn(500);
        };

        validate_success = function (p) {
            prompt_log("validate Success!");
            se_switch(p, true);
            p.html(_prompt["Success"]);
            p.append(_s);
            _A["success_show"] ? p.fadeIn(500) : p.hide();
        };

        var input_email, input_phone, input_max, input_min, input_bank, input_only, input_must, input_first_must, input_first_cannot, input_number, input_idcard, input_equally, input_cannot, input_custom, input_date;

        input_email = function (p) {
            _Rep = _r[0];
            p.html(_prompt["email"]);
            p.append(_e);
            _Rep.test(_v) ? prompt_log("input_email-->Success") : validate_error(p);
            _Rep.test(_v) ? _err = 0 : _err = 1;
        };


        input_date = function (p) {
            var _ifs = _v.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
            p.html(_prompt["date"]);
            p.append(_e);
            _ifs != null ? prompt_log("input_email-->Success") : validate_error(p);
            _ifs != null ? _err = 0 : _err = 1;
        };

        input_cannot = function (p, a) {
            p.html(_prompt["cannot"].replace("｛0｝", a));
            p.append(_e);
            if (_v == a) {
                validate_error(p);
                _err = 1;
            }
        };

        input_idcard = function (p) {
            _Rep = _r[3];
            p.html(_prompt["idcard"]);
            p.append(_e);
            _Rep.test(_v) ? prompt_log("input_email-->Success") : validate_error(p);
            _Rep.test(_v) ? _err = 0 : _err = 1;
        };

        input_equally = function (p, a) {

            if ($(a).size() == 0) {
                p.html("没有找到：" + a);
                p.append(_e);
                validate_error(p);
                _err = 1;
                return false;
            }

            if (_v != $(a).eq(0).val()) {
                p.html(_prompt["equally"]);
                p.append(_e);
                validate_error(p);
                _err = 1;
            }
        };

        input_number = function (p) {
            p.html(_prompt["number"]);
            p.append(_e);
            var num = parseFloat(_v);
            if (isNaN(num)) {
                validate_error(p);
                _err = 1;
            } else {
                _o.val(num.toFixed(_A["decimal_places"]));
            }
        };

        input_phone = function (p) {
            _Rep = _r[1];
            p.html(_prompt["phone"]);
            p.append(_e);
            _Rep.test(_v) ? prompt_log("input_phone-->Success") : validate_error(p);
            return _Rep.test(_v) ? _err = 0 : _err = 1;
        };

        input_max = function (p, num) {
            if (isNaN(parseInt(num)) || num < 0) {
                return prompt_log("Max is NaN and <0");
            }
            p.html(_prompt["max"].replace("｛0｝", num));
            p.append(_e);
            _v.length <= num ? prompt_log("input_max-->Success") : validate_error(p);
            return _v.length <= num ? _err = 0 : _err = 1;
        };

        input_min = function (p, num) {
            if (isNaN(parseInt(num))) {
                return prompt_log("Min is NaN");
            }
            p.html(_prompt["min"].replace("｛0｝", num));
            p.append(_e);
            _v.length >= num ? prompt_log("input_min-->Success") : validate_error(p);
            return _v.length >= num ? _err = 0 : _err = 1;
        };

        input_bank = function (p) {
            _Rep = _r[2];
            p.html(_prompt["bank"]);
            p.append(_e);
            _Rep.test(_v) ? prompt_log("input_bank-->Success") : validate_error(p);
            return _Rep.test(_v) ? _err = 0 : _err = 1;
        };
        input_must = function (p, num) {
            var pr = _prompt["must"];
            var n = num.split(",");
            for (var i = 0; i < n.length; i++) {
                if (n[i] == "0") {
                    _Rep = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                    if (!_Rep.test(_v)) {
                        _err = 1;
                    }
                    pr = pr + "，" + _prompt["value0"];
                } else if (n[i] == "1") {
                    _Rep = new RegExp("[a-zA-Z]+", "g");
                    if (!_Rep.test(_v)) {
                        _err = 1;
                    }
                    pr = pr + "，" + _prompt["value1"];
                } else if (n[i] == "2") {
                    _Rep = new RegExp("[0-9]+", "g");
                    if (!_Rep.test(_v)) {
                        _err = 1;
                    }
                    pr = pr + "，" + _prompt["value2"];
                } else if (n[i] == "3") {
                    _Rep = new RegExp("[\\s]+", "g");
                    if (!_Rep.test(_v)) {
                        _err = 1;
                    }
                    pr = pr + "，" + _prompt["value3"];
                } else {
                    _Rep = new RegExp("[" + n[i] + "]+", "g");
                    if (!_Rep.test(_v)) {
                        _err = 1;
                    }
                    pr = pr + "，" + n[i];
                }
            }
            p.html(pr);
            p.append(_e);
            if (_err != 0) {
                validate_error(p);
                return false;
            }
            0 == 0 ? prompt_log("input_only-->Success") : validate_error(p);
            0 == 0 ? _err = 0 : _err = 1;
        };

        input_only = function (p, num) {
            var _v_rep = "";
            var pr = _prompt["only"];
            var n = num.split(",");
            for (var i = 0; i < n.length; i++) {
                if (n[i] == "0") {
                    _v_rep = _v_rep + "\u4e00-\u9fa5";
                    pr = pr + "，" + _prompt["value0"];
                } else if (n[i] == "1") {
                    _v_rep = _v_rep + "a-zA-Z";
                    pr = pr + "，" + _prompt["value1"];
                } else if (n[i] == "2") {
                    _v_rep = _v_rep + "0-9";
                    pr = pr + "，" + _prompt["value2"];
                } else if (n[i] == "3") {
                    _v_rep = _v_rep + "\\s";
                    pr = pr + "，" + _prompt["value3"];
                } else {
                    _v_rep = _v_rep + n[i];
                    pr = pr + "，" + n[i];
                }

            }
            p.html(pr);
            p.append(_e);
            _Rep = new RegExp("^[" + _v_rep + "]+$");
            _Rep.test(_v) ? prompt_log("input_only-->Success") : validate_error(p);
            _Rep.test(_v) ? _err = 0 : _err = 1;
        };


        input_first_must = function (p, num) {
            var pr = _prompt["first_must"];
            var fm = "";
            _v == "" || _v == undefined || _v == null ? _err = 1 : fm = _v.substring(0, 1);

            if (num == "0") {
                _Rep = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (!_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value0"];
            } else if (num == "1") {
                _Rep = new RegExp("[a-zA-Z]+", "g");
                if (!_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value1"];
            } else if (num == "2") {
                _Rep = new RegExp("[0-9]+", "g");
                if (!_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value2"];
            } else if (num == "3") {
                _Rep = new RegExp("[\\s]+", "g");
                if (!_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value3"];
            } else {
                _Rep = new RegExp("[" + num + "]+", "g");
                if (!_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + num;
            }
            p.html(pr);
            p.append(_e);
            _err == 0 ? prompt_log("input_first_must-->Success") : validate_error(p);

        };


        input_first_cannot = function (p, num) {
            var pr = _prompt["first_cannot"];
            var fm = "";
            _v == "" || _v == undefined || _v == null ? _err = 1 : fm = _v.substring(0, 1);
            if (num == "0") {
                _Rep = new RegExp("[\\u4E00-\\u9FFF]+", "g");
                if (_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value0"];
            } else if (num == "1") {
                _Rep = new RegExp("[a-zA-Z]+", "g");
                if (_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value1"];
            } else if (num == "2") {
                _Rep = new RegExp("[0-9]+", "g");
                if (_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value2"];
            } else if (num == "3") {
                _Rep = new RegExp("[\\s]+", "g");
                if (_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + _prompt["value3"];
            } else {
                _Rep = new RegExp("[" + num + "]+", "g");
                if (_Rep.test(fm)) {
                    _err = 1;
                }
                pr = pr + "，" + num;
            }
            p.html(pr);
            p.append(_e);
            _err == 0 ? prompt_log("input_first_must-->Success") : validate_error(p);

        };

        input_custom = function (p) {
            var ele = _o.attr("ele");
            var _cus = null;
            $.each(_custom, function (a) {
                if (_custom[a]._ele == ele) {
                    _cus = _custom[a];
                }
            });

            if (_cus == null) {
                p.html("Custom Error");
                p.append(_e);
                validate_error(p);
                _err = 1;
                return false;
            }

            p.html(_cus._err);
            p.append(_e);
            var ifs = _cus._fun(_o);
            ifs ? _err = 0 : validate_error(p);
            ifs ? _err = 0 : _err = 1;

        };

        custom = function (c) {
            $.each(c, function (a, validate) {
                _custom[a] = new _c();
                $.each(validate, function (n, v) {
                    if (n == "ele") {
                        _custom[a]._ele = v;
                    }
                    if (n == "fun") {
                        _custom[a]._fun = v;
                    }
                    if (n == "err") {
                        _custom[a]._err = v;
                    }
                });
            });
        };
        _A["custom"] == null ? _A["custom"] = null : custom(_A["custom"]);

        _.each(function () {
            var _validate = $(this).find("*[" + _A["vali"] + "]");
            _validate.each(function () {
                init($(this));
                code();
                if (_o.is("input[type='text']") || _o.is("input[type='password']") || _o.is("textarea") || _o.is("select")) {
                    input_focus(_o.attr("valiid"));
                    input_blur(_o.attr("valiid"));
                }
            });

            $(this).on("submit", function () {
                _validate.each(function () {
                    $(this).blur();
                    if (_err != 0) {
                        return false;
                    }
                });
                if (_err != 0) {
                    return false;
                }
            });
        });
    };
})(jQuery);