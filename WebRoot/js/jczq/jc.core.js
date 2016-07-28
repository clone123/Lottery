/**
 * Created with IntelliJ IDEA.
 * User: clone
 * QQ: 351354135
 * Date: 14-1-2
 * Time: 下午6:41
 * To change this template use File | Settings | File Templates.
 */

(function(window){
    var J = function(val){
            return new J.init(val);
        },
        undefined = window.undefined;
    var toString = Object.prototype.toString,
        push = Array.prototype.push,
        slice = Array.prototype.slice;

    J.init = function( val ){
        if (typeof val === "object"){
            this[0] = val;
        } else {
            this[0] = document.getElementById( val );
        }
        return this;
    }


    J.prototype = J.init.prototype = {
        version:"1.0",
        html: function( val ){
            return J.html( this[0] , val );
        }
    }

    J.fn = {
        //取得ID
        id:function(id){
            return document.getElementById(id);
        },
        //取得tag
        tag:function(tag){
            return document.getElementsByTagName(tag);
        },
        //数组扩展方法
        array:{
            //返回数组中指定字符串的索引
            indexof:function(a,s){
                for(var i = 0;i < a.length;i++){
                    if(a[i] == s) return i;
                }
            },
            //在数组任意索引处删除N项
            delIndex:function(a,i,n){
                return a.splice(i,n||1);
            },
            //删除数组中为s的数据
            del:function(a,s){
                var arr=[];
                for (var i=0; i<a.length ; i++){
                    if (a[i] != s) arr.push(a[i]);
                }
                return arr;
            },
            //返回数组中最大项
            max:function(a){
                return Math.max.apply({},a);
            },
            //返回数组中最小项
            min:function(a){
                return Math.min.apply({},a);
            },
            isIn:function (arr,val){
                for (var i=0;i<=arr.length;i++){
                    if (arr[i]==val) return true;
                }
                return false;
            },
            isLess :function(m,arr){
                var f = false ;
                 for(var i= 0,len=arr.length;i<len;i++){
                       var n = Number(arr[i]);
                       if(m > n){
                            f= true ;
                            break ;
                       }
                 }
                return f ;
            }
        },
        //字符串处理方法
        string:{
            //得到有汉字字符串的长度
            len:function(s){
                var len = 0;
                for(i = 0;i < s.length;i++){
                    s.charCodeAt(i) > 255?len += 2:len++;
                }
                return len;
            },
            //去除字符串首尾空格
            trim:function(s){
                var reg = /^\s*(.*?)\s*$/gim;
                return s.replace(reg,"$1");
            },
            //去除任意HTML标签,不写标签名代表所有标签
            trimHtml: function(tag){
                tag ? reg = new RegExp("<\/?"+tag+"(?:(.|\s)*?)>","gi"):reg = /<(?:.|\s)*?>/gi;
                return this.replace(reg,"");
            },
            //数字处理方法
            number: {
                format: function(num,opt){
                    return opt?parseInt(num).toLocaleString():parseInt(num).toLocaleString().split(".")[0];
                },
                fact:function(val){
                    var num = Math.floor(this);
                    if(num<0)return NaN;
                    if(num==0 || num==1) return 1;
                    else return (num*(num-1).fact());
                }
            },
            lottery: {
                //字符串开奖号码 转换为球
                toHtml: function(val,opt){
                    var opt= opt || {},RB=opt.RB||"RB",BB=opt.BB||"BB",OB=opt.OB||"OB",tag=opt.tag||"li";
                    var str=val.replace(/(\#|\:)/g,"+").replace(/(\ )/g,",");
                    var getStr=function(arr,css){
                        var t="";
                        for(var i=0;i<arr.length;i++){
                            t+='<'+tag+' class="'+css+'">'+arr[i]+'</'+tag+'>\r';
                        }
                        return t;
                    }
                    var tmp=str.indexOf("+")==-1?
                        getStr(str.split(','),OB):
                        getStr(str.split('+')[0].split(','),RB)+getStr(str.split('+')[1].split(','),BB);
                    return tmp;
                },
                //字符串开奖号码 转换为数组
                toArray: function(val){
                    if ( typeof val !== "string" ) return false;
                    var val=val.replace(/(\#|\:)/g,"+").replace(/(\ )/g,",");
                    if ( val.indexOf( "+" ) == -1 ) return [val.split( "," ) , ];
                    var arr = val.split( "+" );
                    return [arr[0].split( "," ) , arr[1].split( "," )];
                }
            },
            isObject:function( val ){
                return toString.call( val ) === "[object Object]";
            },
            isArray:function( val ){
                return toString.call( val ) === "[object Array]";
            },
            isFunction:function( val ){
                return toString.call( val ) === "[object Function]";
            },
            isString:function( val ){
                return toString.call( val ) === "[object String]";
            },
            isNumber:function( val ){
                return toString.call( val ) === "[object Number]";
            },
            isDate:function( val ){
                return toString.call( val ) === "[object Date]";
            },
            isBoolean:function( value ){
                return toString.call( val ) === "[object Boolean]";
            },
            //写入/读取html
            html: function( obj , val ){
                return val ? obj.innerHTML = val : obj.innerHTML;
            },
            //转换json
            toJSON : function(obj) {
                switch (typeof(obj)) {
                    case 'object':
                        var result = [];
                        if (obj instanceof Array) {
                            for (var i = 0, len = obj.length; i < len; i++) {
                                result.push(J.str.toJSON(obj[i]));
                            }
                            return '[' + result.toString(',') + ']';
                        } else if (obj instanceof RegExp) {
                            return obj.toString();
                        } else {
                            for (var attribute in obj) {
                                result.push(attribute + ':' + J.str.toJSON(obj[attribute]));
                            }
                            return '{' + result.join(',') + '}';
                        }
                    case 'function': return 'function(){}';
                    case 'number':return obj.toString();
                    case 'string':return  '"' +obj.replace(/(\\|\")/g, '\\$1')
                        .replace(/\n|\r|\t/g,function(a) { return ('\n' == a) ? '\\n':('\r' == a) ? '\\r':('\t' == a) ? '\\t': '';}) +'"';
                    case 'boolean':return obj.toString();
                    default: return obj.toString();
                }
            }
        },
        //url/对象互转
        url: function( val ){
            if ( typeof val !== "object" ){
                var url = val || location.href,json = {};
                url.replace( /[\?\&](\w+)=(\w+)/g, function( s , s1 , s2 ){ json[s1] = s2 } );
                return json;
            }else{
                var arr = [];
                for ( var i in val ){
                    arr.push( i+" = "+val[i] );
                }
                return arr.join( "&" );
            }
        },

        queryUrl : function(url,key){
            var url = location.href.replace(/^[^?=]*\?/ig, '').split('#')[0];	//去除网址与hash信息
            var json = {};

            url.replace(/(^|&)([^&=]+)=([^&]*)/g, function (a, b, key , value){
                try {
                    key = decodeURIComponent(key);
                } catch(e) {}

                try {
                    value = decodeURIComponent(value);
                } catch(e) {}

                if (!(key in json)) {
                    json[key] = /\[\]$/.test(key) ? [value] : value;
                }
                else if (json[key] instanceof Array) {
                    json[key].push(value);
                }
                else {
                    json[key] = [json[key], value];
                }
            });
            return key ? json[key] : json;
        },
        //滚动
        scroll: function( obj , opt ){
            var opt = opt || {} , boxH = opt.boxH || 30 , trH = opt.trH || 30 ,
                intervalTime = opt.intervalTime || 10, stopTime = opt.stopTime || 1500, play = true;
            obj.style.height = boxH + "px";
            obj.style.lineHeight = trH + "px";
            obj.style.overflow = "hidden";
            obj.innerHTML+=obj.innerHTML;
            obj.onmouseover=function(){play=false};
            obj.onmouseout=function(){play=true};
            (function (){
                var stop=obj.scrollTop%trH==0&&!play;
                if(!stop)obj.scrollTop==parseInt(obj.scrollHeight/2)?obj.scrollTop=0:obj.scrollTop++;
                setTimeout(arguments.callee,obj.scrollTop%trH?intervalTime:stopTime);
            })()
        },
        //随机数
        random: function( m,n ){
            return Math.floor( Math.random() * ( n || 9999 ) + ( m || 1 ) );
        },
        //
        cookie: function(name, value, options){
            if (typeof value != 'undefined') {
                options = options || {};
                if (value === null) {
                    value = '';
                    options.expires = -1;
                }
                var expires = '';
                if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                    var date;
                    if (typeof options.expires == 'number') {
                        date = new Date();
                        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                    } else {
                        date = options.expires;
                    }
                    expires = '; expires=' + date.toUTCString();
                }
                var path = options.path ? '; path=' + (options.path) : '';
                var domain = options.domain ? '; domain=' + (options.domain) : '';
                var secure = options.secure ? '; secure' : '';
                document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
            }else{
                var cookieValue = null;
                if (document.cookie && document.cookie != '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        if (cookie.substring(0, name.length + 1) == (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
            }
            return cookieValue;
        },
        //得到日期及星期，val是否取得星期
        getDate:function(val) {
            return new Date().toLocaleDateString()+" 星期"+"日一二三四五六".charAt( new Date().getDay() );
        },
        //弹出对象的各个属性
        alert:function (obj,n){
            if (typeof obj !== "object") return alert(obj);
            var arr = [];
            for (var i in obj) arr.push(i+" = "+obj[i]);
            return alert(arr.join(n||"\n\r"));
        }
    }
    J.extend = function ( obj ) {
        for (var i in obj ) J[ i ] = obj[ i ];
    }
    J.extend(J.fn);
    //简写
    J.a=J.alert;
    J.r=J.random;
    J.arr=J.array;
    J.coo=J.cookie;
    J.str=J.string;
    J.num=J.number;
    J.lot=J.lottery;
    window.J = J;
    window['Dyc'] = window.J;
})(window)

/*
 *  Mask Class
 *@ /style/css/common.css
 *@ jQuery.js
 *call: jQuery.alert(), jQuery.alertOk(), jQuery.confirm()
 */
var Mask = function () {
    this.__Sysini = {};
    this.ie = $.browser.msie ? parseInt($.browser.version) : 0;
    this.addNoop = function (namelist) {
        var _this = this;
        return $.each(namelist.replace(/\s/g, '').split(','), function (i, f) {
            _this[f] = (f in _this) ? _this[f] : _this._noop // ont over
        })
    };
    this._noop = function (arg) {
        return arg;
    }
    this.g = function (a, b) {
        var r, len = arguments.length, __Sysini = this.__Sysini;
        r = len == 0 ? __Sysini : (len == 1 ? __Sysini[a] : (__Sysini[a] = b));
        return r
    };
    this.setTopmost = function (el, offset) {//el jquery
        var z = this.g('-sys-topmoust-z');
        offset = ~~offset || 1;
        if (!z) {
            this.g('-sys-topmoust-z', z = 50 * 1000)
        }
        z += offset;
        el.css('z-index', z);
        if (offset > 0) {
            this.g('-sys-topmoust-z', z);
        }
        return z;
    }
    this.aop = function () {
        var Slice = Array.prototype.slice, F = $.grep(Slice.call(arguments), function (el, i) {
            return el instanceof Function
        });
        return function () {
            var re, args = Slice.call(arguments);
            for (var i = 0, j = F.length; i < j; i++) {
                re = F[i].apply(this, args.concat(re));
                if (false === re) {
                    break
                }
            }
            return re
        }
    };
}
var MaskBg = {
    init:function (opacity, color) {
        Mask.call(this);
        if ($('#tipMask').length == 0) {
            this.panel = $('<div id="tipMask" tabIndex="-1" class="tip_mask" style="display: none"></div>').appendTo($("body"));
            this.panel.css('opacity', opacity);
            if (color) {
                this.panel.css('background-color', color);
            }
        } else {
            this.panel = $('#tipMask');
        }
        this.layList = [];
        this.addNoop('onshow,onhide,onclick');
        return this;
    },
    show:function (lay) {
        this.panel.show();
        this.isshow = true;
        this.panel.focus();
        if (this.ie == 6) {
            $('body').addClass('ie6_mask_hide_select')
        }
        this.currentLay = lay = $(lay);
        if ($.inArray(lay, this.layList) == -1) {
            this.layList.push(lay);
        }
        this.panel.css('z-index', lay.css('z-index') - 1);
        this.onshow(lay);
        return this;
    },
    hide:function (time) {
        this.isshow = false;
        this.layList.pop();
        if (this.layList.length) {
            this.show(this.layList[this.layList.length - 1])//move to last element
        } else {
            if (this.ie == 6) {
                $('body').removeClass('ie6_mask_hide_select')
            }
            time ? this.panel.fadeTo(0, function () {
                this.panel.hide().fade(.3)
            }, time) : this.panel.hide();
            this.currentLay = false;
            this.onhide()
        }
        return this;
    }
}

var MaskLay = function () {
    Mask.call(this);
}
MaskLay.prototype = {
    init:function (panel) {
        this.mask = MaskBg.init(.5);
        this.addNoop('onpop,onclose,onchange,onsubmit');
        this.closeUI = [];
        if (panel) {// import panel
            this._setPanel.apply(this, arguments)
        } else {// create panel and content
            this.panel = $('<div style="position:absolute;z-index:500000;left:-99999px"></div>').appendTo('body');
            // this.panel = this.createNode('DIV', document.body);
            this.content = $('<div style="min-width:120px;_width:120px;text-align:center;font: 12px/1.5 verdana;color:#333;"></div>').appendTo(this.panel);
        }
        this.panel.Drag({
            handler:this.title
        });
        return this;
    },
    _setPanel:function (panel, content, title, frame) {
        this.panel = $(panel).css('position', 'absolute');
        if (this.ie < 7) {
            $('select', this.panel).addClass('ie6_mask_nohide_select');
        }
        this.content = $(content);
        this.title = $(title);
        this.framebox = $(frame)
        return this
    },
    setFun:function () {
        var Slice = Array.prototype.slice, args = Slice.call(arguments), F = $.grep(args, function (el, i) {
            return typeof el == 'object'
        });
        for (var i = 0 , l = F.length; i < l; i++) {
            var O = F[i];
            for (var a in O) {
                var f = O[a];
                if (f instanceof Function && this['on' + a]) {
                    this['on' + a] = (function (s, a) {
                        return  function () {
                            f.apply(s, a);
                        }
                    })(this, Slice.call(args, 1))
                }
            }
        }
    },
    html:function (html) {
        this.content.html(html).css({'padding':'5px 10px', 'width':0, 'height':0}).setCenter();
        this.iframe = null;
        this.onchange();
        return this
    },
    addClose:function () {// addClose('#google','#baidu ul',node)
        var _this = this;
        this.closer = null;
        return $.each(Array.prototype.slice.call(arguments), function (i, selector) {
            var o = $(selector);
            o.is('input') && _this.closeUI.push(selector);
            o.mousedown(function (e) {
                return false
            });
            o.click($.proxy(_close, _this));
        });
        function _close(e) {
            var s = $(e.target);
            this.close(s, e);
            return false
        }
    },
    open:function (url, ini, c) {// show iframe
        var w, h, scroll, guid, tip;
        w = parseInt(ini.width) || 400;
        h = parseInt(ini.height) || 200;
        scroll = ini.scroll ? 'yes' : 'no';
        guid = 'iframe' + (+new Date);
        tip = ini.tip || guid;
        this.content.parent().hide();
        if (!this.iframe) {
            this.iframe = this.framebox.find('iframe:eq(0)');
            if (this.iframe.length == 0) {
                this.iframe = $('<iframe id="' + tip + '_iframe" src="about:blank" allowTransparency="true" frameborder="no" scrolling="' + scroll + '" style="width:' + w + 'px;height:' + h + 'px;display:none"></iframe>').appendTo(this.framebox.css('margin', '0 auto'))
            }
            this.iframe.attr('src', url);
        }
        this.framebox.css({
            width:w + 'px',
            height:h + 'px'
        }).show();
        this.iframe.show();
        if (ini.title) {
            this.proxytitle = $('<h2>' + ini.title + '</h2>').insertAfter(this.title.find('h2:eq(0)').hide())
        }
        return this.pop(0, 0, c);
    },
    pop:function (html, fn, _ishideClose) {
        if (this.isshow) {
            this.close({}, {})
        }
        this.isshow = true;
        if (html) {
            this.content.html(html);
            this.onchange()
        }
        this.setTopmost(this.panel.show().setCenter());
        if (_ishideClose) {
            $(this.closeUI.join(',')).hide()
        }
        if (!this.noMask) {
            this.mask.show(this.panel);
        }
        this.oldonclose = this.onclose;
        this.onclose = this.aop(function () {
            this.onclose = this.oldonclose;
            if (_ishideClose) {
                $(this.closeUI.join(',')).show();
            }
        }, this.onclose, fn)
        this.onpop()
    },
    close:function (sender, e) {
        if (this.iframe) {
            this.iframe.attr('src', 'about:blank').hide();
            this.iframe = false;
            this.content.parent().show();
            if (this.proxytitle) {
                this.proxytitle.remove();
                this.title.find('h2').show();
                this.proxytitle = false
            }
            this.framebox.hide();
        }
        this.panel.css('left', '-10000px');
        if (!this.noMask && this.isshow) {
            this.mask.hide(this.closeTime);
        }
        this.isshow = false;
        if (this.exceptbtn) {
            $(this.closeUI.join(',')).show();
            if (e && e.target == this.exceptbtn[0]) this.onsubmit();
        } else {
            this.onclose(e, sender);
        }
    }
};

//公共弹出层
var MaskInit = {
    init:function () {
        var _alert, _confirm, _open;
        if ($('#winalert').length == 0) this.createHtml()
        _alert = new MaskLay().init('#winalert', '#winalert_content', '#winalert_title', '#winalert_iframe');
        _alert.addClose('#winalert_close', '#winalert_ok');
        _confirm = new MaskLay().init('#winconfirm', '#winconfirm_content', '#winconfirm_title');
        _confirm.addClose('#winconfirm_close', '#winconfirm_no', '#winconfirm_ok');
        _open = _alert;
        $.extend({'alert':function (a, b, c, noMask) {// txt, callback, nobtn, nomask
            _alert.noMask = noMask;
            if (_alert.exceptbtn) {
                _alert.exceptbtn.parent().remove();
                _alert.exceptbtn = false;
            }
            _alert.content.parent('div.state').attr('class', _alert.isok ? 'state ok' : _alert.isCon ? 'state confirm' : 'state error');
            _alert.pop(a, b, c);
            return _alert;
        },
            'alertOk':function () {
                _alert.isok = true;
                this.alert.apply(this, arguments);
                _alert.isok = false;
            },
            'alertConfirm':function () {
                _alert.isCon = true;
                this.alert.apply(this, arguments);
                _alert.isCon = false;
            },
            'confirm':function (html, fn, title, noMask) {// txt, callback, title, nomask
                var callback;
                if (title) {
                    _confirm.title.html(title)
                }
                if (noMask) {
                    _confirm.noMask = true
                }
                if ($.isFunction(fn)) {
                    callback = function (e, btn) {
                        if (btn.attr('id') == 'winconfirm_ok') {
                            fn.call(_confirm)
                        }
                    }
                }
                _confirm.pop.call(_confirm, html, callback);
                _confirm.panel.find('#winconfirm_ok').focus();
                return _confirm
            },
            'conclose':function () {
                _confirm.close()
            },
            'alertNote':function (a, b, c, noMask) {
                if (!_alert.exceptbtn)_alert.exceptbtn = $('<div><a class="notedf" href="javascript:void 0" id="note_df"></a><a href="javascript:void 0" style="margin-left:30px" class="notecancel" id="note_close"/></a></div>').insertAfter(_alert.panel.find('#winalert_ok').hide()).find('#note_df');
                _alert.noMask = noMask;
                _alert.content.parent('div.state').attr('class', 'state confirm');
                _alert.setFun({'submit':b});
                _alert.addClose('#note_close', '#note_df');
                _alert.pop(a, '', 1);
                return _alert;
            },
            'alertClose':function () {
                _alert.close();
                if (_alert.exceptbtn) {
                    _alert.exceptbtn.parent().remove();
                    _alert.exceptbtn = false;
                }
                return _alert;
            },
            'openUrl':function (url, nobtn, noMask, p, t, u, w, h, scroll) {//url, nobtn,nomask,tip,title,isunload,width,height,isscroll
                if (noMask) _open.noMask = true
                _open.open(url, {
                    tip:p,
                    title:t,
                    width:w,
                    height:h,
                    scroll:scroll,
                    isUnload:u !== false
                }, nobtn);
                return _open;
            },
            'closeUrl':function () {
                _open.close()
                return _open
            }
        });
        return this;
    },
    createHtml:function () {
        var dialogHtml = "<div class=\"tips_win\" id=\"winalert\" style=\"display: none\"> " + " <div class=\"tips_wrap\"> " + "  <div class=\"tips_box\">" + "   <div class=\"tips_title\" id=\"winalert_title\" style=\"zoom: 1; cursor: move; \">  " + "    <h2 id=\"tips_notice\" id=\"winalert_title\">温馨提示</h2>           " + "    <span class=\"close\" id=\"winalert_close\" style=\"display: inline; \"><a href=\"javascript:void 0\" title=\"关闭\">关闭</a></span>   " + "   </div> " + "  <div class=\"tip_des\"> " + "   <div class=\"state error\"> " + "    <div class=\"tips_text\" id=\"winalert_content\"></div> " + "     </div><div id=\"winalert_iframe\" style=\"display: none\"></div>" + "  </div>" + "  <div class=\"tips_sbt\"> " + "   <input type=\"button\" value=\"确 定\" class=\"btn\" id=\"winalert_ok\" style=\"display: inline-block; \">" + "  </div> " + "  </div>" + " </div> " + "</div>";
        dialogHtml += '<div class="tips_conbox" style="display:none" id="winconfirm">' + '	<div class="tips_wrap">' + '        <div class="tips_box">' + '            <div class="tips_title" id="winconfirm_title">' + '                <h2 id="">温馨提示</h2>' + '  <span class="close" id="winconfirm_close"><a href="javascript:void 0" title="关闭">关闭</a></span>' + '            </div><div class="confirm state">' + ' <div class="tips_text" id="winconfirm_content" style="zoom:1"></div></div>' + '            <div class="tips_sbt">' + '                <input type="button" value="确 定" class="btn"  id="winconfirm_ok" style=\"display: inline-block; \"/><input type="button" value="取 消" class="btn btn_no"  id="winconfirm_no" style=\"display: inline-block; \"/>' + '            </div>' + '        </div>' + '    </div>' + '</div>'
        $('body').append($(dialogHtml));
    }
}
$.extend(jQuery.fn, {
    setCenter:function (equal) { // default is gold scale
        var el, w, h, pt = {top:0, left:0}, sl, psl, off;
        if (el = this.get(0)) {
            this.css('position', 'absolute');
            off = el.offsetParent != document.body && el.offsetParent != document.documentElement ? $(el.offsetParent).offset() : pt;
            psl = sl = $.getSize(); // scroll
            w = el.offsetWidth;
            h = el.offsetHeight;
            pt.left = $.getInt((sl.offsetWidth - w) / 2 + sl.scrollLeft - off.left) + 'px';
            pt.top = Math.min(sl.scrollHeight - h - 10, Math.max(0, $.getInt((psl.offsetHeight - h) * (equal ? .5 : .382) + psl.scrollTop - off.top))) + 'px';
            this.css(pt);
        }
        return this
    },
    getCss:function (key) {
        if (key == "top" || key == "left") {
            return $.getInt($(this).offset()[key]);
        }
        var v = $.getInt(this.css(key));
        if (isNaN(v)) {
            return false;
        }
        return v;
    }
})
jQuery.extend(jQuery, {
    getSize:function (el, win) {
        var fix, doc, dd, db;
        fix = parseInt(this.browser.version) < 9 ? 2 : 0; // ie6/7/8 bug 2px on body border
        win = win || window;
        dd = win.document.documentElement;
        db = win.document.body;
        doc = win.document.compatMode == "CSS1Compat" ? dd : db;
        if (el == void(0) || el == dd || el == document.body) {
            return {
                scrollLeft:Math.max(dd.scrollLeft, db.scrollLeft) - fix,
                scrollTop:Math.max(dd.scrollTop, db.scrollTop) - fix,
                scrollWidth:doc.scrollWidth,
                scrollHeight:Math.max(doc.clientHeight, doc.scrollHeight),
                offsetWidth:doc.clientWidth,
                offsetHeight:doc.clientHeight
            }
        }
        return $(el);
    }, getInt:function (val, def) {
        var d = parseInt(val, 10);
        return isNaN(d) ? (def || 0) : d
    }
})
$.fn.Drag = function (opts) {
    var ps = $.extend({
        handler:null,
        isProxy:true,
        onMove:function () {
        },
        onDrop:function () {
        }
    }, opts);
    var dragndrop = {
        drag:function (e) {
            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            var dragData = e.data.dragData, el = ps.proxy || dragData.target
            el.css({
                left:dragData.left + e.pageX - dragData.offLeft,
                top:dragData.top + e.pageY - dragData.offTop
            });
            dragData.onMove(e);
        },
        drop:function (e) {
            var dragData = e.data.dragData, pos = {}, a, b, c;
            if (ps.proxy) {
                pos = {x:ps.proxy.getCss('left'), y:ps.proxy.getCss('top')};
                dragData.target.css({'top':pos.y + 'px', 'left':pos.x + 'px'})
                ps.proxy.remove();
                ps.proxy = false
            }
            dragData.target.css(dragData.oldCss); //.css({ 'opacity': '' });
            dragData.onDrop(e);
            $("body").unbind('mousemove', dragndrop.drag).unbind('mouseup', dragndrop.drop).unbind('losecapture');
            s = $.getSize();
            a = pos.x < s.scrollLeft;
            b = pos.y < s.scrollTop;
            if (a || b) {
                c = eval('({' + (a ? 'left:' + s.scrollLeft : '') + (a & b ? ',' : '') + (b ? 'top:' + s.scrollTop : '') + '})');
                dragData.target.animate(c, 300);
            }
        },
        createProxy:function (d) {//创建一个代理框架
            ps.proxy = $('<DIV></DIV>').appendTo('body').css({
                position:'absolute',
                zIndex:d.target.css('z-index') + 5,
                border:'1px dotted #fa403a',
                width:d.target.outerWidth() + 'px',
                height:d.target.outerHeight() + 'px',
                left:d.left + 'px',
                top:d.top + 'px'
            })
        }
    }
    return this.each(function () {
        var me = this;
        var handler = null;
        if (typeof ps.handler == 'undefined' || ps.handler == null) {
            handler = $(me);
        } else {
            handler = (typeof ps.handler == 'string' ? $(ps.handler, this) : ps.handler);
        }
        handler.bind('mousedown', {e:me}, function (s) {
            var target = $(s.data.e);
            var oldCss = {};
            if (target.css('position') != 'absolute') {
                try {
                    target.position(oldCss);
                } catch (ex) {
                }
                target.css('position', 'absolute');
            }
            oldCss.cursor = target.css('cursor') || 'default';
            var pv = $.getSize();
            var dragData = {
                left:oldCss.left || (target.getCss('left')) || 0,
                top:oldCss.top || (target.getCss('top')) || 0,
                scollleft:pv.scrollLeft,
                scolltop:pv.scrollTop,
                offLeft:s.pageX,
                offTop:s.pageY,
                oldCss:oldCss,
                onMove:ps.onMove,
                onDrop:ps.onDrop,
                handler:handler,
                target:target
            }
            if (ps.isProxy && !ps.proxy) dragndrop.createProxy(dragData);
            $("body").bind('mousemove', { dragData:dragData }, dragndrop.drag).bind('mouseup', { dragData:dragData }, dragndrop.drop);
        });
    });
}
$(function () {
    MaskInit.init();
})

$.fn.extend({
        iClear: function(options) {
            var iset = {
                name: null,//获取表单元素比如$(':text')
                curVal: null,//默认显示文字,优先于表单默认值,为空时调用表单默认值
                color: '#000',//点击后输入值颜色
                curColor: '#ccc',//默认颜色
                enter: null
            }
            options = options || {};
            $.extend(iset, options);
            iset.name.each(function() {
                //当设置默认值是为表单赋默认值
                if (iset.curVal != null) {
                    iset.name.val(iset.curVal);
                }
                //表单focus,blur事件
                $(this).css('color', iset.curColor).focus(
                    function() {
                        $(this).css('color', iset.color);
                        if ($(this).val() == (iset.curVal ? iset.curVal : this.defaultValue)) {
                            $(this).val('');
                        }
                    }).blur(function() {
                        if ($(this).val() == '') {
                            $(this).val(iset.curVal ? iset.curVal : this.defaultValue).css('color', iset.curColor);
                        }
                    });
                //绑定回车事件
                if (iset.enter != null) {
                    $(this).keydown(function(e) {
                        if (e.keyCode == 13) {
                            iset.enter.click();
                        }
                    });
                }
            });
        },


        fixedheader : function(A){
            var _ = $.extend({parentclass:"", top:0, maxtop:0}, A);
            this.each(function (E) {
                var D = $(this), A = $("<div></div>").append($(this).clone(true).css("margin-top", 0)), B = D.outerWidth(), C = D.offset();
                A.attr("id", "fixed_" + (+new Date())).css({"position":"fixed", "top":"0", "left":C.left, width:B, display:"none"}).appendTo("body");
                if (_.parentclass)A.addClass(_.parentclass);
                if (!jQuery.browser.msie || jQuery.browser.version != "6.0")$(window).scroll(function () {
                    var C = D.offset();
                    A.css({"position":"fixed", "top":_.top + "px", "left":C.left - $(window).scrollLeft()});
                    var E = $(window).scrollTop(), B = C.top;
                    if (E > B) {
                        A.show();
                        if (_.maxtop && _.maxtop < E)A.hide()
                    } else A.hide()
                })
            })
        },

        fixedHeader : function(op){
            var opts = $.extend({p:'',cls:''},op);
            var D = $(this), C = D.offset();
            var O = opts.p || this ;
            this.each(function () {
                 if (!jQuery.browser.msie || jQuery.browser.version != "6.0"){
                     $(window).scroll(function () {
                         var E = $(window).scrollTop(),B = C.top;
                         if (E >= B) {
                             $(O).addClass(opts.cls)
                         } else{
                             $(O).removeClass(opts.cls)
                         }
                     }).trigger('scroll');
                 }
            })
        },

        fixedFooter : function(op){
            var opts = $.extend({p:'',cls:''},op);

            var sBox = $(this), sh = sBox.outerHeight();
            var C = sBox.offset();
            var O = opts.p || this ;
            this.each(function () {
                if (!jQuery.browser.msie || jQuery.browser.version != "6.0"){
                    $(window).scroll(function() {
                        var  H = $(window).height(), E = $(window).scrollTop();
                        var st = sBox.parent().offset().top ;
                        if (C.top >= 0 && E <= st - H + sh) {
                            $(O).addClass(opts.cls);
                        } else {
                            $(O).removeClass(opts.cls);
                        }
                    }).trigger('scroll');
                }
            })
        },

        getBytes : function(_) {
            var a = _.match(/[^\x00-\xff]/ig);
            return _.length + (a == null ? 0 : a.length);
        },

        isTogglen : function(f){
              return f ? $(this).show() : $(this).hide();
        },

        getSize:function (el, win) {
            var fix, doc, dd, db;
            fix = parseInt(this.browser.version) < 9 ? 2 : 0; // ie6/7/8 bug 2px on body border
            win = win || window;
            dd = win.document.documentElement;
            db = win.document.body;
            doc = win.document.compatMode == "CSS1Compat" ? dd : db;
            if (el == void(0) || el == dd || el == document.body) {
                return {
                    scrollLeft:Math.max(dd.scrollLeft, db.scrollLeft) - fix,
                    scrollTop:Math.max(dd.scrollTop, db.scrollTop) - fix,
                    scrollWidth:doc.scrollWidth,
                    scrollHeight:Math.max(doc.clientHeight, doc.scrollHeight),
                    offsetWidth:doc.clientWidth,
                    offsetHeight:doc.clientHeight
                }
            }
            return $(el);
        },

        getInt:function (val, def) {
            var d = parseInt(val, 10);
            return isNaN(d) ? (def || 0) : d
        }

});


$.extend(Math,Math.prototype,{
    a:function (a) {
        var ret = 1;
        for (var i = 0, j = a.length; i < j; i++) {
            ret *= a[i].length;
        }
        return j ? ret : 0;
    },
    al:function (a) {
        var n = 0, codes = [], code = [], stop;
        f(a, n);
        function f(b, n) {
            if (stop || n >= b.length) {
                codes.push(code.slice());
                code.length = n - 1;
            } else {
                var cur = b[n];
                for (var i = 0, j = cur.length; i < j; i++) {
                    code.push(cur[i]);
                    f(b, n + 1);
                }
                if (n) {
                    code.length = n - 1;
                }
            }
        }
        return codes;
    },
    cl:function(arr, n, z){
        var r = [];
        fn([], arr, n);
        return r;
        function fn(t, a, n) {
            if (n === 0 || z && r.length == z) {
                return r[r.length] = t;
            }
            for (var i = 0, l = a.length - n; i <= l; i++) {
                if (!z || r.length < z) {
                    var b = t.slice();
                    b.push(a[i]);
                    fn(b, a.slice(i + 1), n - 1);
                }
            }
        }
    },
    dl:function(a, d, n, z){
        var r = [], p = [], m = n - d.length;
        if (!d.length) {
            p = Math.cl(a, m, z);
            for (var i in p) r = r.concat(Math.al(p[i]));
            return r
        }
        else {
            var dan = Math.al(d);
            if (m == 1) sn([], a, z);
            else {
                p = Math.cl(a, m, z);
                for (var i in p) r = r.concat(Math.al(p[i]));
            }
            return fn(Math.al([r, dan]))
        }
        function sn(t, a, z) {
            for (var i = 0, l = a.length; i <= l; i++) {
                if (a[i] instanceof Array) {
                    for (var j in a[i]) {
                        if (!z || r.length < z) {
                            var b = t.slice();
                            b.push(a[i][j]);
                            r[r.length] = b;
                        }
                    }
                }
            }
        }
        function fn(a) {
            var p = [], b, c = [];
            for (var i = 0, l = a.length; i < l; i++) {
                if (a[i] instanceof Array) {
                    b = a[i], c = b[0].slice();
                    for (var j = 1; j < b.length; j++) c = c.concat(b[j]);
                    p[i] = c;
                }
            }
            return p;
        }
    },

    accMul :function(arg1,arg2){
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },
    myCal:function(gg,arr){
        arr.unshift(gg);
        return Math.calcuteWC.apply(null, arr);
    },
    calcuteWC:function(passtype, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
                var re = 0;
                a = a == null ? 0 : parseFloat(a, 10);
                b = b == null ? 0 : parseFloat(b, 10);
                c = c == null ? 0 : parseFloat(c, 10);
                d = d == null ? 0 : parseFloat(d, 10);
                e = e == null ? 0 : parseFloat(e, 10);
                f = f == null ? 0 : parseFloat(f, 10);
                g = g == null ? 0 : parseFloat(g, 10);
                h = h == null ? 0 : parseFloat(h, 10);
                i = i == null ? 0 : parseFloat(i, 10);
                j = j == null ? 0 : parseFloat(j, 10);
                k = k == null ? 0 : parseFloat(k, 10);
                l = l == null ? 0 : parseFloat(l, 10);
                m = m == null ? 0 : parseFloat(m, 10);
                n = n == null ? 0 : parseFloat(n, 10);
                o = o == null ? 0 : parseFloat(o, 10);
                switch (passtype) {
                    case "1_1":
                        re = a;
                        break;
                    case "2_1":
                        re = a * b;
                        break;
                    case "2_3":
                        re = (a + 1) * (b + 1) - 1;
                        break;
                    case "3_1":
                        re = a * b * c;
                        break;
                    case "3_3":
                        re = a * b + a * c + b * c;
                        break;
                    case "3_4":
                        re = a * b * c + a * b + a * c + b * c;
                        break;
                    case "3_7":
                        re = (a + 1) * (b + 1) * (c + 1) - 1;
                        break;
                    case "4_1":
                        re = a * b * c * d;
                        break;
                    case "4_4":
                        re = a * b * c + a * b * d + a * c * d + b * c * d;
                        break;
                    case "4_5":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) - (a * (b + c + d + 1) + b * (c + d + 1) + (c + 1) * (d + 1));
                        break;
                    case "4_6":
                        re = a * b + a * c + a * d + b * c + b * d + c * d;
                        break;
                    case "4_11":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) - (a + b + c + d + 1);
                        break;
                    case "4_15":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) - 1;
                        break;
                    case "5_1":
                        re = a * b * c * d * e;
                        break;
                    case "5_5":
                        re = a * b * c * d + a * b * c * e + a * b * d * e + a * c * d * e + b * c * d * e;
                        break;
                    case "5_6":
                        re = a * b * c * d * e + a * b * c * d + a * b * c * e + a * b * d * e + a * c * d * e + b * c * d * e;
                        break;
                    case "5_10":
                        re = a * b + a * c + a * d + a * e + b * c + b * d + b * e + c * d + c * e + d * e;
                        break;
                    case "5_16":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) - (a * (b + c + d + e + 1) + b * (c + d + e + 1) + c * (d + e + 1) + (d + 1) * (e + 1));
                        break;
                    case "5_20":
                        re = a * b * c + a * b * d + a * b * e + a * c * d + a * c * e + a * d * e + b * c * d + b * c * e + b * d * e + c * d * e + a * b + a * c + a * d + a * e + b * c + b * d + b * e + c * d + c * e + d * e;
                        break;
                    case "5_26":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) - (a + b + c + d + e + 1);
                        break;
                    case "5_31":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) - 1;
                        break;
                    case "6_1":
                        re = a * b * c * d * e * f;
                        break;
                    case "6_6":
                        re = a * b * c * d * e + a * b * c * d * f + a * b * c * e * f + a * b * d * e * f + a * c * d * e * f + b * c * d * e * f;
                        break;
                    case "6_7":
                        re = a * b * c * d * e * f + a * b * c * d * e + a * b * c * d * f + a * b * c * e * f + a * b * d * e * f + a * c * d * e * f + b * c * d * e * f;
                        break;
                    case "6_15":
                        re = a * b + a * c + a * d + a * e + a * f + b * c + b * d + b * e + b * f + c * d + c * e + c * f + d * e + d * f + e * f;
                        break;
                    case "6_20":
                        re = a * b * c + a * b * d + a * b * e + a * b * f + a * c * d + a * c * e + a * c * f + a * d * e + a * d * f + a * e * f + b * c * d + b * c * e + b * c * f + b * d * e + b * d * f + b * e * f + c * d * e + c * d * f + c * e * f + d * e * f;
                        break;
                    case "6_22":
                        re = a * b * c * d * e * f + a * b * c * d * e + a * b * c * d * f + a * b * c * e * f + a * b * d * e * f + a * c * d * e * f + b * c * d * e * f + a * b * c * d + a * b * c * e + a * b * c * f + a * b * d * e + a * b * d * f + a * b * e * f + a * c * d * e + a * c * d * f + a * c * e * f + a * d * e * f + b * c * d * e + b * c * d * f + b * c * e * f + b * d * e * f + c * d * e * f;
                        break;
                    case "6_35":
                        re = a * b * c + a * b * d + a * b * e + a * b * f + a * c * d + a * c * e + a * c * f + a * d * e + a * d * f + a * e * f + b * c * d + b * c * e + b * c * f + b * d * e + b * d * f + b * e * f + c * d * e + c * d * f + c * e * f + d * e * f + a * b + a * c + a * d + a * e + a * f + b * c + b * d + b * e + b * f + c * d + c * e + c * f + d * e + d * f + e * f;
                        break;
                    case "6_42":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) - (a * (b + c + d + e + f + 1) + b * (c + d + e + f + 1) + c * (d + e + f + 1) + d * (e + f + 1) + (e + 1) * (f + 1));
                        break;
                    case "6_50":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) - (a + b + c + d + e + f + 1) - (a * b * c * d * e + a * b * c * d * f + a * b * c * e * f + a * b * d * e * f + a * c * d * e * f + b * c * d * e * f + a * b * c * d * e * f);
                        break;
                    case "6_57":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) - (a + b + c + d + e + f + 1);
                        break;
                    case "6_63":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) - 1;
                        break;
                    case "7_1":
                        re = a * b * c * d * e * f * g;
                        break;
                    case "7_7":
                        re = a * b * c * d * e * f + a * b * c * d * e * g + a * b * c * d * f * g + a * b * c * e * f * g + a * b * d * e * f * g + a * c * d * e * f * g + b * c * d * e * f * g;
                        break;
                    case "7_8":
                        re = a * b * c * d * e * f * g + a * b * c * d * e * f + a * b * c * d * e * g + a * b * c * d * f * g + a * b * c * e * f * g + a * b * d * e * f * g + a * c * d * e * f * g + b * c * d * e * f * g;
                        break;
                    case "7_21":
                        re = a * b * c * d * e + a * b * c * d * f + a * b * c * d * g + a * b * c * e * f + a * b * c * e * g + a * b * c * f * g + a * b * d * e * f + a * b * d * e * g + a * b * d * f * g + a * b * e * f * g + a * c * d * e * f + a * c * d * e * g + a * c * d * f * g + a * c * e * f * g + a * d * e * f * g + b * c * d * e * f + b * c * d * e * g + b * c * d * f * g + b * c * e * f * g + b * d * e * f * g + c * d * e * f * g;
                        break;
                    case "7_35":
                        re = a * b * c * d + a * b * c * e + a * b * c * f + a * b * c * g + a * b * d * e + a * b * d * f + a * b * d * g + a * b * e * f + a * b * e * g + a * b * f * g + a * c * d * e + a * c * d * f + a * c * d * g + a * c * e * f + a * c * e * g + a * c * f * g + a * d * e * f + a * d * e * g + a * d * f * g + a * e * f * g + b * c * d * e + b * c * d * f + b * c * d * g + b * c * e * f + b * c * e * g + b * c * f * g + b * d * e * f + b * d * e * g + b * d * f * g + b * e * f * g + c * d * e * f + c * d * e * g + c * d * f * g + c * e * f * g + d * e * f * g;
                        break;
                    case "7_120":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) * (g + 1) - (a + b + c + d + e + f + g + 1);
                        break;
                    case "8_1":
                        re = a * b * c * d * e * f * g * h;
                        break;
                    case "8_8":
                        re = a * b * c * d * e * f * g + a * b * c * d * e * f * h + a * b * c * d * e * g * h + a * b * c * d * f * g * h + a * b * c * e * f * g * h + a * b * d * e * f * g * h + a * c * d * e * f * g * h + b * c * d * e * f * g * h;
                        break;
                    case "8_9":
                        re = a * b * c * d * e * f * g * h + a * b * c * d * e * f * g + a * b * c * d * e * f * h + a * b * c * d * e * g * h + a * b * c * d * f * g * h + a * b * c * e * f * g * h + a * b * d * e * f * g * h + a * c * d * e * f * g * h + b * c * d * e * f * g * h;
                        break;
                    case "8_28":
                        re = a * b * c * d * e * f + a * b * c * d * e * g + a * b * c * d * e * h + a * b * c * d * f * g + a * b * c * d * f * h + a * b * c * d * g * h + a * b * c * e * f * g + a * b * c * e * f * h + a * b * c * e * g * h + a * b * c * f * g * h + a * b * d * e * f * g + a * b * d * e * f * h + a * b * d * e * g * h + a * b * d * f * g * h + a * b * e * f * g * h + a * c * d * e * f * g + a * c * d * e * f * h + a * c * d * e * g * h + a * c * d * f * g * h + a * c * e * f * g * h + a * d * e * f * g * h + b * c * d * e * f * g + b * c * d * e * f * h + b * c * d * e * g * h + b * c * d * f * g * h + b * c * e * f * g * h + b * d * e * f * g * h + c * d * e * f * g * h;
                        break;
                    case "8_56":
                        re = a * b * c * d * e + a * b * c * d * f + a * b * c * d * g + a * b * c * d * h + a * b * c * e * f + a * b * c * e * g + a * b * c * e * h + a * b * c * f * g + a * b * c * f * h + a * b * c * g * h + a * b * d * e * f + a * b * d * e * g + a * b * d * e * h + a * b * d * f * g + a * b * d * f * h + a * b * d * g * h + a * b * e * f * g + a * b * e * f * h + a * b * e * g * h + a * b * f * g * h + a * c * d * e * f + a * c * d * e * g + a * c * d * e * h + a * c * d * f * g + a * c * d * f * h + a * c * d * g * h + a * c * e * f * g + a * c * e * f * h + a * c * e * g * h + a * c * f * g * h + a * d * e * f * g + a * d * e * f * h + a * d * e * g * h + a * d * f * g * h + a * e * f * g * h + b * c * d * e * f + b * c * d * e * g + b * c * d * e * h + b * c * d * f * g + b * c * d * f * h + b * c * d * g * h + b * c * e * f * g + b * c * e * f * h + b * c * e * g * h + b * c * f * g * h + b * d * e * f * g + b * d * e * f * h + b * d * e * g * h + b * d * f * g * h + b * e * f * g * h + c * d * e * f * g + c * d * e * f * h + c * d * e * g * h + c * d * f * g * h + c * e * f * g * h + d * e * f * g * h;
                        break;
                    case "8_70":
                        re = a * b * c * d + a * b * c * e + a * b * c * f + a * b * c * g + a * b * c * h + a * b * d * e + a * b * d * f + a * b * d * g + a * b * d * h + a * b * e * f + a * b * e * g + a * b * e * h + a * b * f * g + a * b * f * h + a * b * g * h + a * c * d * e + a * c * d * f + a * c * d * g + a * c * d * h + a * c * e * f + a * c * e * g + a * c * e * h + a * c * f * g + a * c * f * h + a * c * g * h + a * d * e * f + a * d * e * g + a * d * e * h + a * d * f * g + a * d * f * h + a * d * g * h + a * e * f * g + a * e * f * h + a * e * g * h + a * f * g * h + b * c * d * e + b * c * d * f + b * c * d * g + b * c * d * h + b * c * e * f + b * c * e * g + b * c * e * h + b * c * f * g + b * c * f * h + b * c * g * h + b * d * e * f + b * d * e * g + b * d * e * h + b * d * f * g + b * d * f * h + b * d * g * h + b * e * f * g + b * e * f * h + b * e * g * h + b * f * g * h + c * d * e * f + c * d * e * g + c * d * e * h + c * d * f * g + c * d * f * h + c * d * g * h + c * e * f * g + c * e * f * h + c * e * g * h + c * f * g * h + d * e * f * g + d * e * f * h + d * e * g * h + d * f * g * h + e * f * g * h;
                        break;
                    case "8_247":
                        re = (a + 1) * (b + 1) * (c + 1) * (d + 1) * (e + 1) * (f + 1) * (g + 1) * (h + 1) - (a + b + c + d + e + f + g + h + 1);
                        break;
                    case "9_1":
                        re = a * b * c * d * e * f * g * h * i;
                        break;
                    case "10_1":
                        re = a * b * c * d * e * f * g * h * i * j;
                        break;
                    case "11_1":
                        re = a * b * c * d * e * f * g * h * i * j * k;
                        break;
                    case "12_1":
                        re = a * b * c * d * e * f * g * h * i * j * k * l;
                        break;
                    case "13_1":
                        re = a * b * c * d * e * f * g * h * i * j * k * l * m;
                        break;
                    case "14_1":
                        re = a * b * c * d * e * f * g * h * i * j * k * l * m * n;
                        break;
                    case "15_1":
                        re = a * b * c * d * e * f * g * h * i * j * k * l * m * n * o;
                        break;
                    default:
                        break;
                }
                return re;
    },
    calcuteMN:function(passtype) {
            var re = 0;
            switch (passtype) {
                case "1_1":
                case "2_3":
                case "3_7":
                case "5_31":
                case "6_63":
                    re = 1;
                    break;
                case "2_1":
                case "3_3":
                case "3_4":
                case "4_6":
                case "4_11":
                case "4_15":
                case "5_10":
                case "5_20":
                case "5_26":
                case "6_15":
                case "6_35":
                case "6_50":
                case "6_57":
                case "7_120":
                case "8_247":
                    re = 2;
                    break;
                case "3_1":
                case "4_4":
                case "4_5":
                case "5_16":
                case "6_20":
                case "6_42":
                    re = 3;
                    break;
                case "4_1":
                case "5_5":
                case "5_6":
                case "6_22":
                case "7_35":
                case "8_70":
                    re = 4;
                    break;
                case "5_1":
                case "6_6":
                case "6_7":
                case "7_21":
                case "8_56":
                    re = 5;
                    break;
                case "6_1":
                case "7_7":
                case "7_8":
                case "8_28":
                    re = 6;
                    break;
                case "7_1":
                case "8_8":
                case "8_9":
                    re = 7;
                    break;
                case "8_1":
                    re = 8;
                    break;
                case "9_1":
                    re = 9;
                    break;
                case "10_1":
                    re = 10;
                    break;
                case "11_1":
                    re = 11;
                    break;
                case "12_1":
                    re = 12;
                    break;
                case "13_1":
                    re = 13;
                    break;
                case "14_1":
                    re = 14;
                    break;
                case "15_1":
                    re = 15;
                    break;
                default:
                    break;
            }
            return re;
    }
})

//混投玩法互斥配置
var filterArgs = {

    "spf":{
        '3':{
            'rqspf':{'f':[0],'z':[1,0]}, //与让球胜平负的互斥组合   f:-1 , z:+1
            'jqs':{'f':[0],'z':[0]},//与进球数的互斥组合
            'bqc':{'f':[1,2,4,5,7,8],'z':[1,2,4,5,7,8]},//与半全场的互斥组合
            'bf':{
                'f':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            }//与比分的互斥组合
        },
        '1':{
            'rqspf':{'f':[3,1],'z':[1,0]},
            'jqs':{'f':[1,3,5],'z':[1,3,5]},
            'bqc':{'f':[0,2,3,5,6,8],'z':[0,2,3,5,6,8]},
            'bf':{
                'f':[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23,24,25,26,27,28,29,30]
            }
        },
        '0':{
            'rqspf':{'f':[3,1],'z':[0]},
            'jqs':{'f':[0],'z':[0]},
            'bqc':{'f':[0,1,3,4,6,7],'z':[0,1,3,4,6,7]},
            'bf':{
                'f':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            }
        }
    },

    "rqspf":{
        '3':{
            'spf':{'f':[1,0],'z':[0]}, //与胜平负的互斥组合
            'jqs':{'f':[0],'z':[]},//与进球数的互斥组合
            'bqc':{'f':[0,2,4,5,7,8],'z':[2,5,8]},//与半全场的互斥组合
            'bf':{
                'f':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[18,19,20,21,22,23,24,25,26,27,28,29,30]
            }
        },
        '1':{
            'spf':{'f':[1,0],'z':[3,1]},
            'jqs':{'f':[1,2,4,5,7,8],'z':[0,5,6,7]},
            'bqc':{'f':[0,2,3,5,6,8],'z':[0,1,3,4,6,7]},
            'bf':{
                'f':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            }
        },
        '0':{
            'spf':{'f':[3],'z':[3,1]},
            'jqs':{'f':[],'z':[]},
            'bqc':{'f':[0,3,6],'z':[0,1,3,4,6,7]},
            'bf':{
                'f':[18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            }
        }
    },

    "jqs":{
        // 0  进球数为0 单独处理
        '0':{
            'spf':{'f':[3,0],'z':[3,0]}, //与胜平负的互斥组合
            'rqspf':{'f':[3,1],'z':[1,0]}, //与让球胜平负的互斥组合
            'bqc':{'f':[0,1,2,3,5,6,7,8],'z':[0,1,2,3,5,6,7,8]},//与半全场的互斥组合
            'bf':{
                'f':[],
                'z':[]
            }
        },

        //进球数为1-3-5-7   1%2 --->1 奇数
        '1':{
            'spf':{'f':[1],'z':[1]},
            'rqspf':{'f':[3],'z':[0]},
            'bqc':{'f':[1,4,7],'z':[1,4,7]},
            'bf':{
                'f':[],
                'z':[]
            }
        },

        //进球数为2-4-6   2%2 --->2  偶数
        '2':{
            'spf':{'f':[],'z':[]},
            'rqspf':{'f':[],'z':[]},
            'bqc':{'f':[],'z':[]},
            'bf':{
                'f':[],
                'z':[]
            }
        }
    },

    "bqc":{
        //半全场是0,3,6对应的， 3%3 --->0
        '0':{
            'spf':{'f':[1,0],'z':[1,0]}, //与胜平负的互斥组合
            'rqspf':{'f':[0],'z':[1,0]}, //与让球胜平负的互斥组合
            'jqs':{'f':[0],'z':[0]},//与总进球的互斥组合
            'bf':{
                'f':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
            }
        },

        //半全场是1,4,7对应的， 1%3 --->1
        '1':{
            'spf':{'f':[3,0],'z':[3,0]},
            'rqspf':{'f':[3,1],'z':[1,0]},
            'jqs':{'f':[1,3,5,7],'z':[1,3,5,7]},
            'bf':{
                'f':[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23,24,25,26,27,28,29,30],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,18,19,20,21,22,23,24,25,26,27,28,29,30]
            }
        },

        //半全场是2,5,8对应的， 2%3 --->2
        '2':{
            'spf':{'f':[3,1],'z':[3,1]},
            'rqspf':{'f':[3,1],'z':[3]},
            'jqs':{'f':[0],'z':[0]},
            'bf':{
                'f':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
                'z':[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
            }
        }
    },

    "bf":{
        // 比分选项 0至12  ---> 3 胜
        '3':{
            'spf':{'f':[1,0],'z':[1,0]}, //与胜平负的互斥组合
            'rqspf':{'f':[0],'z':[1,0]}, //与让球胜平负的互斥组合
            'jqs':{'f':[0],'z':[0]},//与总进球的互斥组合
            "bqc":{'f':[1,2,4,5,7,8],'z':[1,2,4,5,7,8]}//与半全场的互斥组合
        },

        // 比分选项 13至17  ---> 1 平
        '1':{
            'spf':{'f':[3,0],'z':[3,0]},
            'rqspf':{'f':[3,1],'z':[1,0]},
            'jqs':{'f':[1,3,5,7],'z':[1,3,5,7]},
            "bqc":{'f':[0,2,3,5,6,8],'z':[0,2,3,5,6,8]}
        },

        // 比分选项 18至30  ---> 0 负
        '0':{
            'spf':{'f':[3,1],'z':[3,1]},
            'rqspf':{'f':[3,1],'z':[3]},
            'jqs':{'f':[0],'z':[0]},
            "bqc":{'f':[0,1,3,4,6,7],'z':[0,1,3,4,6,7]}
        }
    },


    // 篮球玩法选项互斥配置
    "sf":{
        '0':{
            'rfsf':{'f':[1],'z':[]},
            'sfc':{'f':[1,3,5,7,11],'z':[1,3,5,7,11]},
            'dx':{'f':[],'z':[]}
        },
        '1':{
            'rfsf':{'f':[],'z':[0]},
            'sfc':{'f':[0,2,4,6,8,10],'z':[0,2,4,6,8,10]},
            'dx':{'f':[],'z':[]}
        }
    },
    'rfsf':{
        '0':{
            'sf':{'f':[],'z':[1]},
            'sfc':{'f':[],'z':[1,3,5,7,11]},
            'dx':{'f':[],'z':[]}
        },
        '1':{
            'sf':{'f':[0],'z':[]},
            'sfc':{'f':[2,4,6,8,10],'z':[]},
            'dx':{'f':[],'z':[]}
        }
    },
    'sfc':{
        // 胜分差  选项  0,2,4,6,8,10  ---> 客胜
        '0':{
            'sf':{'f':[1],'z':[1]},
            'rfsf':{'f':[1],'z':[]},
            'dx':{'f':[],'z':[]}
        },

        // 胜分差  选项  1,3,5,7,9,11  ---> 主胜
        '1':{
            'sf':{'f':[0],'z':[0]},
            'rfsf':{'f':[],'z':[0]},
            'dx':{'f':[],'z':[]}
        }
    },
    'dx':{
        '0':{
            'sf':{'f':[],'z':[]},
            'sfc':{'f':[],'z':[]},
            'rfsf':{'f':[],'z':[]}
        },
        '1':{
            'sf':{'f':[],'z':[]},
            'sfc':{'f':[],'z':[]},
            'rfsf':{'f':[],'z':[]}
        }
    }

}


