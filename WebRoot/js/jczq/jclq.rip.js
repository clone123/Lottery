/**
 * Created with IntelliJ IDEA.
 * User: clone
 * QQ: 351354135
 * Date: 14-3-10
 * Time: 下午14:49
 * To change this template use File | Settings | File Templates.
 */
function Sportery(lotid) {
            this.args = {
                //胜负06
                26:{numType:[0,1],numName:["主负","主胜"],tName:"胜负",newId:"200",id:["200","06","01"],maxNum:8},
                //让分胜负07
                27:{numType:[0,1],numName:["让分主负","让分主胜"],tName:"让分胜负",newId:"200",id:["200","07","01"],maxNum:8},
                //胜负差08
                28:{numType:[0,1,2,3,4,5,6,7,8,9,10,11],
                    numName:["客胜1-5","主胜1-5","客胜6-10","主胜6-10","客胜11-15","主胜11-15","客胜16-20","主胜16-20","客胜21-25","主胜21-25","客胜26+","主胜26+"],
                    tName:"胜分差",newId:"200",id:["200","08","01"],maxNum:4},
                //大小分09
                29:{numType:[0,1],numName:["大","小"],tName:"大小分",newId:"200",id:["200","09","01"],maxNum:8},

                48:{numType:[0,1],numName:["主负","主胜"],tName:"小混投",newId:"200",id:["200","08","01"],maxNum:8}
            };

           this.weekTips  = {
                   0:{s:'9:00',e:'23:59:59',t:1*1000*60*60 + 1000},
                   1:{s:'9:00',e:'23:59:59',t:1000},
                   2:{s:'9:00',e:'23:59:59',t:1000},
                   3:{s:'07:30',e:'23:59:59',t:1000},
                   4:{s:'07:30',e:'23:59:59',t:1000},
                   5:{s:'9:00',e:'23:59:59',t:1000},
                   6:{s:'9:00',e:'23:59:59',t:1*1000*60*60 + 1000}
           };


            this.playTypes = {'26': 'sf', '27':'rfsf','28': 'sfc', '29': 'dx'};
            this.typePosition = ['26','27','28','29'];
            this.ggMode = {"Single":["\u5355\u5173", "2\u4e321", "3\u4e321", "4\u4e321", "5\u4e321", "6\u4e321", "7\u4e321", "8\u4e321"], "Many":{1:[], 2:[], 3:["3\u4e323", "3\u4e324"], 4:["4\u4e324", "4\u4e325", "4\u4e326", "4\u4e3211"], 5:["5\u4e325", "5\u4e326", "5\u4e3210", "5\u4e3216", "5\u4e3220", "5\u4e3226"], 6:["6\u4e326", "6\u4e327", "6\u4e3215", "6\u4e3220", "6\u4e3222", "6\u4e3235", "6\u4e3242", "6\u4e3250", "6\u4e3257"], 7:["7\u4e327", "7\u4e328", "7\u4e3221", "7\u4e3235", "7\u4e32120"], 8:["8\u4e328", "8\u4e329", "8\u4e3228", "8\u4e3256", "8\u4e3270", "8\u4e32247"]}};

          //   this.Op = new OpAfirm().init();

            this.ie = jQuery.browser.msie ? parseInt(jQuery.browser.version,10) : 0;
            this.lotId = lotid;
            this.isDG = isDG === true;


            this.isMix = true;
            this.isHm = 1 ; //默认代购
            this.maxModeLimite = 8;
            this.isScrollWinDing = false;
            this.overflowTip = false;
            this.maxChang = 15;
            this.maxBei = 99999;
            this.sp = {}; //sp值
            this.sum = 0;//总金额
            this.bei = 1;//倍数
            this.hideNum = 0;
            this.expireNum = 0;
            this.sumMatch = 0;
            this.stopNum = 0;
            this.dgNum = 0;   //选择的单关场个数 this.dgNum = 0;   //选择的单关场个数
            this.matchKinds = [];
            this.matchEvents = {};//赛事
            this.showPrizeTip = true;
            this.isStop = false;
            this.isYtFs = false ; //复式预投

            this.nos = {};
            this.fens = {};
            this.matchInfo = [];
            this.nb = [];
            this.datas = [];
            this.betNum = 0;
            this.betMatchNum = [];
            this.betMatchCache = {};

            this.betRqMatch = {};
            this.isHF = true ;
            this.danCount = 0;
            this.dan = [];
            this.chuan = [];
            this.itemTotal = 0;
            this.arg = this.args[this.lotId];
            this.getMatchInfoUrl = "/lottery/jcplayvs.action";
            this.getSpInfoUrl = "/lottery/getJclqJp.action";
            this.betPlayTypes = [];
            this.betPlayTypesBase = {};
            this.minMacthNum = 2;
            this.ggModeInputObj = [];
            this.ggManayLiObj = [];
            this.betNumObj = $('#allChang').add('#allCount');
            this.multipleObj = $("#double");
            this.betBonusObj = $('#dgpPrize');
            this.betValue = this.arg.numType;
            this.betName = this.arg.numName;
            this.betName2 = this.arg.numName2;
            this.ggOut = true;
            this.ggIsOut = false;

            this.fiveMatch = ['NBA'];
            this.minSp = 1.8 ;
            this.bfFirstTr = $("#dcc").find("tr[expire='1']").first().find('a.openUp');
            this.lotName = {
                '胜负/让分':{lotId:48,playId:'18',type:'jcmini',url:'/lottery/jchtplayvsForJsp.action'},
              //  '胜负':{lotId:26,playId:'06',type:'',url:'/lottery/jcplayvsForJsp.action'},
                // '让分胜负':{lotId:27,playId:'07',type:'',url:'/lottery/jcplayvsForJsp.action'},
                '胜分差':{lotId:28,playId:'08',type:'',url:'/lottery/jcplayvsForJsp.action'},
                '大小分':{lotId:29,playId:'09',type:'',url:'/lottery/jcplayvsForJsp.action'},
                '混合过关':{lotId:48,playId:'18',type:'',url:'/lottery/jchtplayvsForJsp.action'}
            }
}

Sportery.prototype = {

            constructor:Sportery,

            init : function () {
                var _this = this ;
                _this.iniLotMenu();
                _this.initDcInfo();
                _this.initHandle(); //初始化定时器
                _this.restoreData();//返回修改方案
                _this.getSpData("lqpjpl1_3");    // 初始化sp

                if(Dyc.url().lottery){
                    _this.isYtFs = true ;
                    _this.intYtFs(Dyc.url().lottery)
                }

                if(!_this.isYtFs){
                    if(Dyc.cookie('spfType')){
                        $("#filter"+Dyc.cookie('spfType')).attr('checked',true);
                        $("#filter"+Dyc.cookie('spfType')).trigger('click');
                    }else{
                        $(".rang :checked").trigger('click');
                    }
                }

                return _this ;
            },

            intYtFs:function(id){
                var _this = this,
                    money = Number(Dyc.url().money),
                    projectId = Dyc.url().projectId;
                _this.minSum = money.multiline(0.7);
                _this.maxSum = money.multiline(0.3) + money;
                $("#moneySum").text(money);
                $("#minSum").text(_this.minSum);
                $("#maxSum").text(_this.maxSum);
                $("#projectId").val(projectId);

                _this.setSpfType(id,1);
            },

            setSpfType :function(id,t){
                var arg = {26:'filterSpf',27:'filterSpfRq'};
                var o = arg[id];

                if(t){
                    $("#"+o).attr('checked',false).parent().hide();
                    $("#"+o).trigger('click');
                    $(".rang :checkbox").attr('disabled',true);
                }else{
                    $("#"+o).trigger('click');
                    $("#"+o).attr('checked',false);
                }
            },

            iniLotMenu : function(){
                var lot = Dyc.url().lotteryId.replace(/[^\d]/g,'') ,type = Dyc.url().type;
                lot = (lot==27 ) ? '48' : lot
                var strHtml = '',flag  = true ;
                for(var i in this.lotName){
                    if(i!='length'){
                        if(this.lotName[i]['lotId']== lot && flag){
                            if(type =='jcmini'){
                                $('#lotName').text('胜负/让分');
                            }else {
                                $('#lotName').text(i);
                            }
                            flag = false ;
                        }else{
                            strHtml += '<a href="javascript:void(0);">'+i+'</a>' ;
                        }
                    }
                }
                $("#lotMenu p").empty().html(strHtml)
            } ,

            // 玩法选择调转到页面方法
            setLotUrl : function(n){
                var ln = this.lotName[n],
                    lotId = ln.lotId,       // 玩法id
                    type  = ln.type,        // 玩法类型
                    url   = ln.url,         // 跳转url
                    urlStr= '';

                if(lotId =='48'){
                    var rl ;
                    if(n =='混合过关'){
                        urlStr += url + '?lotteryId=' + lotId;
                    }else{
                        if(isDG) lotId = 27 + '_dg';
                        urlStr += url + '?lotteryId=' + lotId + '&type='+type;
                    }
                }else{
                    if(isDG) lotId = lotId + '_dg';
                    urlStr += url + '?lotteryId=' + lotId ;
                }

                location.href = urlStr;
            },

            // 初始化数据
            initDcInfo : function () {
                var _this = this;
                $("#hideNum").html(0);
                _this.multipleObj.val(_this.bei);//倍数清0
                if(_this.isDG)  {
                    _this.minMacthNum = 1;
                    _this.maxModeLimite = 1;
                }else{
                    if (_this.lotId == "28") _this.maxModeLimite = 4;
                   // else if (this.lotId == "24") this.maxModeLimite = 6;
                }
                var responseData = eval('(' + $("#responseJson").text() + ')');
                _this.baseRoot = responseData.baseRoot;
                _this.sumMatch = responseData.sumMatch;
                _this.queryTime = responseData.issue;
                _this.isHistory = responseData.isHistory;
                $("#hideNum,#endAll").html(responseData.hideMatch);
                var rightBox = '', footBox = '', arr;
                if (!_this.isHistory) {
                    _this.stopNum = responseData.hideMatch;
                    arr = $("#dcc tr[expire]");
                } else {
                    _this.stopNum = 0;
                    arr = $("#dcc tr[expire='0']");
                }
                $("#hideNum").html(_this.hideNum = _this.stopNum);

                for (var i = 0, l = arr.length; i < l; i++) {
                        var tr = $(arr[i]);

                        var spArr = [], b = {};
                        var tid = tr.attr("id").split("_");
                        var matchId  =  tid[1];

                        if(_this.nos[matchId]) continue;
                        _this.sp[matchId] = {};
                        if(_this.lotId == 48 || _this.lotId ==27){
                            var spStr = $("#ht_" + matchId).val();
                            if(!spStr){ continue; }

                            spArr = spStr.replace(/\-/g,'').split(/[\|\ ]/); //replace(/\|/g,' ').split(' ');
                            _this.sp[matchId]['26'] = spArr.slice(0,2);
                            _this.sp[matchId]['27'] = spArr.slice(2);
                        }else{
                            var spStr = $("#ht_" + matchId).val();
                            if(!spStr){ continue; }
                            spArr = spStr.replace(/-/g, '').split(' ');
                            _this.sp[matchId][_this.lotId] = spArr;
                        }

                        footBox += '<tr id="foot_' + matchId + '"></tr>';

                        var matchNo = $.trim(tr.find("td:eq(0)").text());
                    _this.nos[matchId] = matchNo;

                        var isStop = false;
                        if (tr.attr("expire") == 1)_this.fens[matchId] = parseInt(tr.find("td:eq(2) span:first").text(), 10);
                        else isStop = true;
                        b["matchId"] = matchId, b["comityBall"] =  tr.attr("rq");
                        b["endTime"] = tr.attr("t"), b["playid"] = tr.attr("playid");
                        b["matchNo"] = matchNo;

                        b['isDg'] = tr.attr('dg') - 0; //是否是单关赛程

                        b["matchHome"] = tr.find("td:eq(3)").find('a:last').text();
                        b["matchGuest"] = tr.find("td:eq(5)").find('a:last').text();

                        b["isStop"] = isStop;
                    _this.matchInfo.push(b);
                }

                $("#footBox").html(footBox);
                var  systemTime = responseData.systemTime,
                     sysArr = systemTime.split(" "),
                     sysArr1 = sysArr[0].split("-"),
                     sysArr2 = sysArr[1].split(":");
                _this.sysHM = new Date(sysArr1[0], (parseFloat(sysArr1[1]) - 1), sysArr1[2], sysArr2[0], sysArr2[1], sysArr2[2]).getTime();
                _this.initPopupBox();

            },

            initHandle : function () {//初始化
                var _this = this ;
                _this.filterWin();//写入筛选
                _this.bindEvent();//绑定事件

                if (_this.isHistory) return;
                var type = Dyc.url().type;

                _this.setFen();//比赛倒计时
                clearTimeout(this.fenInterval);
                _this.fenInterval = setInterval(function(){
                       _this.setFen();
                }, 1*60*1000);//写入距离结期时间

                /*
                 if (this.lotId != "23" && type!='jcrxy') {
                 this.getSpInfo();//定时更新sp
                 }

                 clearInterval(this.spInterval);
                 if (this.lotId != "23" && type!='jcrxy') {
                    if (this.isDG) this.spInterval = setInterval("dc.getSpInfo()", 1*50000);//写入sp
                    else this.spInterval = setInterval("dc.getSpInfo()", 2*60000);
                 }
                 */

            },

            restoreData : function () {  //返回修改方案
                var _this = this ;
                var store = J.cookie("Dyc_lotteryData"),cc = J.cookie("cN");
                var cN =  (cc =='1' ) ? true : false ;
                if (!store)return;
                J.cookie('Dyc_lotteryData',null, {expire: -1, path: '/'});
                J.cookie('cN',null, {expire: -1, path: '/'});
                store = decodeURIComponent(store);
                var arrInfo = store.split("|");
                var arr = arrInfo[0].split("^");
                _this.itemTotal = arr[4];
                var tzArr = arr[3].split("/");
                var storeNb = {},danArr = [];
                if (typeof(arr[11]) != "undefined" && arr[11] && arr[11] != "0") danArr = arr[11].split(',');
                _this.betNum = 0;
                _this.bei = parseInt(arr[5], 10);
                _this.sum = arr[6];
                var lottery_obj = {'06': '26', '07':'27','08': '28', '09': '29'};
                for (var i = 0; i < tzArr.length; i++) {// 39050:  周一001~01:  [平]
                    var nArr = tzArr[i].split(":"), matchId = nArr[0];
                    if (nArr.length == 2) nArr.unshift("");
                    var tr = $('#tr_' + matchId), inx = +tr.attr('i');
                    storeNb[matchId] = {};
                    _this.betPlayTypes[inx] = [];
                    !_this.betMatchCache[matchId] && (_this.betMatchCache[matchId] = inx.toString());

                    //是否是小混投过关或小混投单关玩法
                    if(cN){
                        var nameArr = tzArr[i].split('~')[1].split('-');
                    }else{
                        var nameArr = [1];
                    }

                    for (var j = 0, jl = nameArr.length; j < jl; j++) {
                            var inxArr = [],pids,pid ;
                            if(cN){  //arr[0] =='48' ||(arr[0] =='27' && tzArr[1].indexOf('[让')>-1)
                                pids = nameArr[j].split(':[')
                                pid = lottery_obj[pids[0]];
                                var res = (/\[(.*)\]/g).exec(nameArr[j]);
                                var bb = res.length > 1 ? res[1].split(',') : [];
                            }else{
                                pid = arr[0];
                                var bs;
                                if(pid =='23'){
                                    bs = "[" + tzArr[i].split(':[')[1] ;
                                }else{
                                    bs = tzArr[i].split(':')[2]
                                }

                                var res = (/\[(.*)\]/g).exec(bs);
                                var bb = res.length > 1 ? res[1].split(',') : [];
                            }
                            var  argx = _this.args[pid];
                            storeNb[matchId][pid] = {};
                            storeNb[matchId][pid]['numType'] = argx.numType.length;


                            for(var k = 0,len = bb.length;k<len;k++){
                                    var isDg = 0 , name = (_this.jcT =='jcrxy' ? argx.numName : argx.numName);
                                  /*  if((arr[0] =='27')){
                                        if(tzArr[1].indexOf('[让') < 0){
                                            bb[k] = '让'+bb[k] ;
                                        }
                                    }*/
                                    var no = $.inArray(bb[k],name);
                                    inxArr.push(no);
                                    if(pid=='23'){isDg=1;} //比分全是
                                    else{
                                        var etdP = $("#td_"+matchId+"_"+pid+"_"+no).parent();
                                        isDg = etdP.attr('isdg') || 0,isDg = isDg -0;
                                    }
                                    _this.getBetData(inx, pid, matchId, no, 1, isDg);
                                    _this.resToggleHt(matchId)
                                    if(_this.chuan[0] == '单关'){
                                        _this.showChuanFn(1);
                                    }else{
                                        _this.showChuanFn((_this.betNum));
                                    }
                            }
                            storeNb[matchId][pid]['ball'] = inxArr;
                    }
                    if (jQuery.inArray(matchId, danArr) > -1) {
                        _this.dan[inx] = matchId;
                        _this.danCount++;
                    }
                }

                _this.isggAreaOrNo();

                if((arr[0] =='26' || arr[0] =='27') && !cN ){
                      _this.setSpfType(arr[0],0);
                }else{
                    Dyc.cookie('spfType','Spfht');
                }

                if (!_this.betNum) _this.betNum = tzArr.length;
                _this.chuan = arr[2].replace(/x/ig, '串').split(',');
                _this.multipleObj.val(_this.bei);//倍数清0
                for (var i in storeNb) {
                        if (i != "length") {
                            var a = storeNb[i];
                            for(var j in a){
                                if(j !='length'){
                                    var  pid = j, sz = a[j]['numType'], nb = a[j]['ball'] ;
                                    $.each(nb, function (j, o) {
                                        $('#td_' + i + '_' + pid + '_' + o).addClass('x').attr("x", "1");
                                    })
                                    if (pid == 23) {
                                        $.each([1, 2, 3], function (k, no) {
                                            var all_obj = $('#' + [no + 'all', i , pid].join('_')), l = all_obj.prevAll('.x').length;
                                            if (l == (no == 2 ? 5 : 13)) all_obj.addClass('x').children(':checkbox').attr('checked', 1);
                                        })
                                    } else if (nb.length == sz) $('#all' + '_' + i + '_' + pid).addClass('x').children(':checkbox').attr('checked', 1);
                                    _this.setFootWin(i);
                                }
                            }
                        }
                }
                if(_this.chuan[0] == '单关'){
                    _this.showChuanFn(1);
                }else if(arr[0] =='28'){
                    _this.showChuanFn((_this.betNum > 4 ? 4 : _this.betNum));
                }else{
                    _this.showChuanFn((_this.betNum > 8 ? 8 : _this.betNum));
                }
                var minB = 20, minC = 1;
                $.each(_this.chuan, function (j, o) {
                    var a = o.indexOf('\u4e32') > -1 ? o.split('\u4e32') : [1, 1], b = a[0], c = a[1];
                    if (minB > b) minB = +b;
                    if (minC < c) minC = +c;
                    $("#chuans :checkbox[value='" + o + "']").attr("checked",true);
                })
                _this.minChuan = minB == 20 ? 0 : minB;
                _this.minChuanNum = minC;
                $.each(danArr, function (j, o) {
                    $("#fd_" + o).add("#cd_" + o).attr("checked", 1);
                })
                if ($('#chuanOths :checked').length > 0) {
                    $('#guoguanManyInput').attr('checked', 1);
                    $('#guoguanMany').addClass('show')
                }
                _this.danAndChuan();
                _this.countItems();
                if (_this.betNum == 0) $("#qrfaManu").attr("disabled", 1).removeClass("qrfa_manu");
                else if (_this.betNum > 0)$("#qrfaManu").attr("disabled", 0).addClass("qrfa_manu");
                if (_this.bei > 1)$("#doubleDown").attr("class", "jian_manu");
                if (_this.bei >= _this.maxBei) $("#doubleUp").attr("class", "jia_manu_d");
            },

            bindEvent: function() {
                var _this = this;

                $("#dcc").delegate('.weisai','click',function(){
                    if ($(this).attr("expire") == 0)alert("当前期次不允许投注已截止的比赛场次！");
                    var id = $(this).attr("id");
                    _this.clickEvent(id, 1);
                    _this.flyEffect(this)
                })

                $("#dcc").delegate('em.all','click',function (event) {
                    var target = event.target || event.srcElement ;
                    var id ;
                    if(target.tagName =='INPUT'){
                        id = $(target).parent().attr("id");
                        $(target).attr('checked',!$(target).attr('checked'));
                    }else{
                        id = $(this).attr("id");
                    }
                    _this.allClickEvent(id);
                })

                $('.rang').delegate('input','click',function(){
                        var f = $(this).prop('checked'),
                            id = $(this).attr('id'),
                            t = $(this).attr('t'),
                            p = $(this).attr('p'),
                            v = $(this).val();

                        $(this).parent().addClass('fb').siblings('label').removeClass('fb');
                        Dyc.cookie('spfType',t,{expires:365, path:'/'});
                        $(".bets-area").isTogglen(true);
                        $(".slip-b2 a").show();
                        if(v !='ht'){
                            $("."+v).isTogglen(!f); //设置投注选择中的玩法隐藏

                            //设置投注区下面的胜平负里面的排序选项
                            var px = $(".px_"+v),cls;
                            if(f) cls = 'none';
                            else {cls = 'block'}
                            $.each(px,function(i,m){
                                $(m)[0].style.display = cls;
                            })
                        }

                         _this.setTrDgCls(p); // 玩法切换时候tr单关显示

                        if(v !='ht') _this.delType(v); //清除已选择的投注玩法
                })

                $("#menuNav").delegate('li','click',function(){
                    var t = $(this).attr('t'),lotteryId = Dyc.url().lotteryId,type=Dyc.url().type;
                    var lotId = lotteryId.replace(/[^\d]/g,'');
                    var playId = _this.args[lotId]['id'][1];
                    var flag = (lotteryId.indexOf('_dg')>-1 ) ? 1 : 0 ;
                    if(t =='fs' && flag){
                        if( lotId == '27'){
                            location.href = '/lottery/jchtplayvsForJsp.action?lotteryId=48&type=jcmini';
                        }else{
                            location.href = '/lottery/jcplayvsForJsp.action?lotteryId='+lotId;
                        }
                    }else if( t=='fs' && type=='jcrxy' ){
                        location.href = '/lottery/jchtplayvsForJsp.action?lotteryId=48&type=jcmini';
                    }else if( t=='dg' && !flag){
                        if(lotId =='48'){
                            location.href = '/lottery/jchtplayvsForJsp.action?lotteryId=27_dg&type=jcmini';
                        }else{
                            location.href = '/lottery/jcplayvsForJsp.action?lotteryId='+lotteryId+'_dg';
                        }
                    }else if(t =='yt'){
                        if(lotId =='48'){
                            location.href = '/lottery/jclqNew/yt.jsp?playId=1';
                        }else{
                            location.href = '/lottery/jclqNew/yt.jsp?playId='+Number(playId);
                        }
                    }else if( t=='sc'){
                        if(lotId =='48'){
                            location.href = '/lottery/jclqNew/upload.jsp?playId=1';
                        }else{
                            location.href = '/lottery/jclqNew/upload.jsp?playId='+Number(playId);
                        }
                    }else if( t=='hm'){
                        if(lotId =='48' || lotId =='27'){
                            var na = $("#lotName").text();
                            if(na =='胜负/让分'){
                                location.href = '/lottery/jclqNew/project.jsp?playId=1';
                            }
                        }else{
                            location.href = '/lottery/jclqNew/project.jsp?playId='+Number(playId);
                        }
                    }
                })

                // 选择玩法
                $("#lotMenu").delegate('a','click',function(){
                    var oldN = $("#lotName").text();
                    var newN = $(this).html();
                    $("#lotName").text(newN);
                    $(this).html(oldN);
                    _this.setLotUrl(newN);      // 跳转
                });


                $(document).delegate('a.quanBf','click',function(){
                    var id = this.id;
                    if (_this.betNum == _this.maxChang && !_this.betMatchCache[id.split("_")[1]] ){
                        $.alert("对不起，最多能选择" + _this.maxChang + "场比赛")
                    }else{
                        _this.allClickEventBf($(this), 2);
                    }
                })

                $("#endM").delegate('label','click',function(){
                    var  flag = $(this).find('input').prop('checked');

                    $("#dcc").find("tr[expire='0']").each(function(){
                        if(flag){
                            var ht = $(this).attr('ht');
                            if(ht=='1'){
                                if($(this).find('div.hT-hidden')[0].style.display =='none'){
                                    $(this).isTogglen(0)
                                }else{
                                    $(this).isTogglen(1)
                                }
                            }else{
                                $(this).isTogglen(1);
                            }
                        }else{
                            $(this).isTogglen(0);
                        }
                    })
                    _this.setHideMatch();
                })

                $("#huifu").click(function(){
                    $("#dcc").find("tr[expire='0']").hide();
                    if(_this.lotId !=23){
                        $("#dcc").find("tr[expire='1']").show();
                    }else{
                        $("#dcc").find("tr[expire='1']").each(function(){

                            var ht = $(this).attr('ht');
                            if(ht=='1'){
                                if($(this).find('div.hT-hidden')[0].style.display =='none'){
                                    $(this).isTogglen(0)
                                }else{
                                    $(this).isTogglen(1)
                                }
                            }else{
                                $(this).isTogglen(1);
                            }
                        })
                    }

                    $("#filterInfos :checkbox").attr('checked',true);
                    $("#endM :checkbox").attr('checked',false)
                    $("#fiveMatch").attr('checked',false);
                    _this.setHideMatch();
                })

                $("#dcc .ah").unbind().live('click',function () {
                    var id = $(this).attr("id");
                    _this.delTrNb(id);
                    _this.countBox(id);
                })

                $("#dcc").delegate('.weisai','mouseenter',function(){
                    if (!$(this).attr("x"))$(this).addClass("h");
                })

                $("#dcc").delegate('.weisai','mouseleave',function(){
                    if (!$(this).attr("x"))$(this).removeClass("h");
                })

                $("#double").click(function() {
                    $(this).select();
                }).keyup(function(event) {
                        if (event.keyCode != 8 && isNaN(parseInt($("#double").val()))) {
                            $("#double").val(1)
                        }
                        _this.checkBei($("#double"));
                    }).blur(function(){
                        var v = $(this).val();
                        if(isNaN(parseInt(v,10))){
                            $(this).val(1);
                        }
                        _this.checkBei($(this));
                    })

                $("#doubleDown").click(function() {
                    var val = $("#double").val();
                    if (val > 1) {
                        $("#double").val(--val)
                    }
                    _this.checkBei($("#double"));
                })

                $("#doubleUp").click(function() {
                    var val = $("#double").val();
                    if (val < 10000) {
                        $("#double").val(++val);
                    } else {
                        $("#double").val(++val);
                    }
                    _this.checkBei($("#double"));
                })


                $("#dcc").delegate("tr",'hover',function(){
                    $(this).toggleClass('tr-hover')
                })

                $(document).delegate('.inputClear','click',function(){
                    var ids = this.id.split('_');
                    _this.delTrNb1(this.id);
                    _this.countBox(ids[1]);
                })

                $(document).delegate('body','selectstart',function(){
                    return false ;
                })

                $("#selectMatch").click(function(){
                    var flag = $(this).prop('checked');
                    _this.hideShowMatch(flag);
                })

                $("#ballFly").click(function(){
                    $(".yixuan").toggleClass('show');
                })

                // 赛事回查选择
                $("#selectissue").change(function () {
                    var path = location.pathname;
                    var lotId = Dyc.url().lotteryId;
                    var type = Dyc.url().type;
                    if(type =='jcmini'){
                        location.href = "/lottery/jchtplayvsForJsp.action?lotteryId=" + lotId + "&type=jcmini&issue="+ $(this).val();
                    }else if(type =='jcrxy'){
                        location.href = "/lottery/jchtplayvsForJsp.action?lotteryId=" + lotId + "&type=jcrxy&issue="+ $(this).val();
                    }else{
                        location.href = "/lottery/jcplayvsForJsp.action?lotteryId=" + lotId + "&issue=" + $(this).val();
                    }
                    return false;
                })

                $("#resetInfo, #clearListBtn").click(function () {
                        $.confirm("是否确认清空选号信息?",function(){
                                _this.resetInfo();
                        })
                })

                $('#guoguanManyInput').click(function () {
                        if($('#guoguanMany').hasClass('show')){
                            $('#guoguanMany').removeClass('show');
                        }else{
                            $('#guoguanMany').addClass('show');
                        }
                        //  $('#this').attr('checked',$('#chuanOths :checked').length?'checked':'');
                        return false;
                })

                $('#hideGuoguanManyLayer').click(function(){
                    $('#guoguanMany').removeClass('show');
                })

                $(document).delegate('a.openUp','click',function(){
                        var obj = $(this);
                        _this.toggleBf(obj);

                      /*  if(_this.bfFirstTr){
                            setTimeout(function(){
                                _this.toggleBf(_this.bfFirstTr)
                                _this.bfFirstTr = obj;
                                return false;
                            },10)
                        }*/
                })

                if(_this.lotId ==23){
                    _this.toggleBf($(_this.bfFirstTr)); //.trigger('click')
                }

                // 跳转到奖金详情
                $("#winMore").click(function () {
                        //  return false ;
                        if (_this.betNum < 1) {
                            return !!alert("请选择投注场次！");
                        } else if (!_this.chuan.length) {
                            return !!alert("请选择过关方式！");
                        } else if($.inArray('单关',_this.chuan)>-1 && _this.chuan.length >1){
                            return !!$.alert('单过关混投不支持奖金详细');
                        } else if($.inArray('单关',_this.chuan)>-1 && _this.dgNum != _this.betNum){
                            return !!$.alert('单关奖金详细只支持选择场次都是单关的赛程');
                        }else {
                            var winmoreData = _this.getWinMoreMix();
                            var url = "/lottery/jclqNew/winmore_mix.jsp?value=";
                            $("#winmoreData").text(winmoreData);
                            $("#winmoreForm").attr("action", url + encodeURIComponent(winmoreData)).submit();
                        }
                });

                // 跳转到奖金优化
                $("#prFilter").click(function () {
                    var flag = _this.checkChuan(_this.chuan);
                    if(flag) return $.alert(flag);
                    if(_this.itemTotal >2000){ return $.alert('您好，投注注数大于2000的不支持奖金优化功能')}
                    var t = Dyc.url().type,info;
                    var f = t =='jcrxy' ? 1 : 0 ;
                    if(f){
                        info = _this.getBuyInfo_rxy();
                    }else{
                        info = _this.getBuyInfo();
                    }
                    if (info) {
                        _this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                        var url = '/lottery/prizeFilter_mix.jsp';
                        $("#lotteryData_prf").val(encodeURIComponent(info));
                        /*                if (dc.ie < 8 && dc.ie > 0) {
                         url += '?r=' + J.r();
                         }else {*/
                        url += '?value=' + encodeURIComponent(info);
                        // }
                        $("#affForm_prf").attr("action", url).submit();
                        $('#loadingBox .popup_cancel').click()
                    }
                });


                $('#onlineFilter').click(function () {
                        if (!_this.betNum) {
                            return !!alert("请选择投注场次！");
                        }
                        else if (_this.betNum <= 1) {
                            return !!alert("请至少选择投注两场比赛进行过滤！");
                        }
                        if (_this.chuan.length > 1) {
                            return !!alert('只能选择一个格式为【X串1】的过关方式！');
                        }
                        else {
                            var chuan = _this.chuan[0];
                            if (_this.chuan.length == 1 && parseInt(chuan.split('串')[1]) > 1) {
                                if (!confirm('你选择的过关方式不是【X串1】格式的，过滤时系统将自动转换为【X串1】，是否继续过滤？')) {
                                    return false;
                                }
                            }
                            var url = _this.baseRoot + "filter.jsp?v=" + J.r();
                            var filterData = _this.getFilterData();
                            $("#winmoreData").text(filterData);
                            $("#winmoreForm").attr("action", url).submit();
                        }
                        return false;
                })

                $("#affirmBuy").click(function () {
                    if (_this.jiezhi) {
                        $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                        return;
                    };

                    if(!_this.checkIsWeekTip()){
                        var str = '因出票时间不同,方案场次让球，让分，预设总分，SP等有可能会发生变化，' +
                                  '您此次发起的方案将在官方开售时进行出票，实际奖金以最终出票为准。<br>' +
                                  '<b class="red">提醒</b>：竞彩篮球官方销售时间：周一、二、五 9:00-24:00｜周三、四 07:30 - 24:00｜周六、日 9:00 - 次日01:00。';
                        $.confirm(str,function(){
                            _this.affirmBuy();
                        })
                    }else{
                        _this.affirmBuy();
                    }
                })

                $("#cooperateBuy").click(function () {
                        if (_this.jiezhi) {
                            $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                            return;
                        }
                        if(!_this.checkIsWeekTip()){
                            var str = '因出票时间不同,方案场次让球，让分，预设总分，SP等有可能会发生变化，' +
                                '您此次发起的方案将在官方开售时进行出票，实际奖金以最终出票为准。<br>' +
                                '<b class="red">提醒</b>：竞彩篮球官方销售时间：周一、二、五 9:00-24:00｜周三、四 07:30 - 24:00｜周六、日 9:00 - 次日01:00。';
                            $.confirm(str,function(){
                                _this.cooperateBuy();
                            })
                        }else{
                            _this.cooperateBuy();
                        }
                })

                $("#buyUpload").click(function(){
                        if (_this.jiezhi) {
                            $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                            return false ;
                        }
                        if(_this.sum < _this.minSum || _this.sum > _this.maxSum){
                            $.alert('对不起，预投金额必需在'+_this.minSum+'至'+_this.maxSum+'元之间');
                            return false;
                        }
                        _this.upLoadBuy();
                });

                // 选择公司SP
                $(".pjopBtn, .paixvBtn").hover(function(){
                    $(this).addClass("show");
                },function(){
                    $(this).removeClass("show");
                })


                //更多条件设置
                $("span.moreBtn").unbind().live('mouseenter',function(){
                    var obj = this;
                    _this.mBTimer = setTimeout(function(){
                        $(obj).addClass('show')
                    },500);
                });
                $("span.moreBtn").unbind().live('mouseleave',function(){
                    clearTimeout(_this.mBTimer);
                    $(this).removeClass('show');
                })

                //玩法下单栏
                $("div.tzWf").unbind().live('mouseenter',function(){
                    var obj = this;
                    _this.tFTimer = setTimeout(function(){
                        $(obj).addClass('show')
                    },500);
                });
                $("div.tzWf").unbind().live('mouseleave',function(){
                    clearTimeout(_this.tFTimer);
                    $(this).removeClass('show');
                })

                $("#opData9 input[type='radio']").click(function(){
                        var sSp = $(this).val();
                        $("#comp9").text($(this).attr("tip").replace(/(让分|总分)+/, ""));

                        if($(this).attr("tip").indexOf("总分") > -1){
                            $("#px8").html('<a href="javascript:void(0)" rel="场次号">场次号<em class="up cur"></em></a>'+
                                '<a href="javascript:void(0)" rel="主胜赔">大分赔<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="客胜赔">小分赔<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="最小赔率">最小赔率<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="主客差值">大小差值<em class="down"></em></a>'
                            )
                        }
                        else{
                            $("#px8").html('<a href="javascript:void(0)" rel="场次号">场次号<em class="up cur"></em></a>'+
                                '<a href="javascript:void(0)" rel="主胜赔">主胜赔<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="客胜赔">客胜赔<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="最小赔率">最小赔率<em class="up"></em></a>'+
                                '<a href="javascript:void(0)" rel="主客差值">主客差值<em class="down"></em></a>'
                            )
                        }
                        _this.getSpData(sSp);
                })

                // 选择SP值排序方式
                $("#px8 a").live("click", function(){
                        var tName = $(this).attr('rel'),
                            cls = $(this).find('em').attr('class');

                        $("#px8").find('a').find('em').removeClass('cur');
                        $(this).find('em').addClass('cur');

                        var sFlag = (cls.indexOf('up')>-1) ? 1 : 0,     // 向上
                            c = $(this).parent().attr('t'),             // 9
                            tabArr = $(".mb"),
                            d;

                        $("#pN"+c).text(tName);

                        if((tName.indexOf('主')>-1 && tName !='主客差值') || (tName.indexOf('主')>-1 && tName !='大小差值')){
                            d = 0;
                        }
                        else if((tName.indexOf('客')>-1 && tName != '主客差值') || (tName.indexOf('客')>-1 && tName != '大小差值')){
                            d = 2;
                        }

                        $.each(tabArr, function(i){
                            var trs = $(tabArr[i]).find("tr") ;
                            var trsNew = trs.sort(function(a, b){
                                var spsA , spsB;
                                if(tName == '场次号'){
                                    spsA = Number($(a).find('td:eq(0) i').text()) || 0;
                                    spsB = Number($(b).find('td:eq(0) i').text()) || 0;
                                }
                                else if(tName === '最小赔率'){
                                    var spA = $(a).find('td:eq('+c+') span');
                                    var spB = $(b).find('td:eq('+c+') span');
                                    spsA = Math.min.call(Math,$(spA[0]).text(),$(spA[1]).text(),$(spA[2]).text()) || 0;
                                    spsB = Math.min.call(Math,$(spB[0]).text(),$(spB[1]).text(),$(spB[2]).text()) || 0;
                                }
                                else if(tName === '主客差值' || tName === "大小差值"){
                                    var spA = $(a).find('td:eq('+c+') span');
                                    var spB = $(b).find('td:eq('+c+') span');
                                    spsA = Math.abs($(spA[0]).text()- $(spA[2]).text()) || 0;
                                    spsB = Math.abs($(spB[0]).text()- $(spB[2]).text()) || 0;
                                }
                                else{
                                 //   console.log('$($(a).find(td:eq('+ c +') span)['+ d + ']).text() || 0');
                                    spsA = $($(a).find('td:eq('+c+') span')[d]).text() || 0;
                                    spsB = $($(b).find('td:eq('+c+') span')[d]).text() || 0;
                                }

                                if(sFlag){
                                    return  Number(spsA) - Number(spsB)
                                }
                                else{
                                    return  Number(spsB) - Number(spsA)
                                }
                            })
                            $(".mb").eq(i).empty().html(trsNew);
                        })
                })

                //玩法排序
                $("span.spfBtn").unbind().live('mouseenter',function(){
                        var obj = this;
                        _this.spfBTimer = setTimeout(function(){
                            $(obj).addClass('show')
                        },500);
                });
                $("span.spfBtn").unbind().live('mouseleave',function(){
                        clearTimeout(_this.spfBTimer);
                        $(this).removeClass('show');
                })

                $(".slip-b2").delegate('a','click',function(){
                        var p = $(this).attr('p'),t = $(this).attr('t');
                        var em = $(this).find('em'),cls = em.attr('class');
                        var s ;
                        $(this).siblings('a').find('em').removeClass('cur')
                        $(this).parent().parent().parent().siblings('span').find('em').removeClass('cur')
                        if(cls =='up'){
                            em.addClass('cur')
                            s = 1;
                        }else if(cls =='down'){
                            em.addClass('cur')
                            s = 0 ;
                        }else if(cls =='up cur'){
                            em.attr('class','down cur');
                            s = 0 ;
                        }else if(cls =='down cur'){
                            em.attr('class','up cur');
                            s = 1 ;
                        }
                        _this.spsSort(p,t,s);
                })


                $(document).delegate('a.zlc','click',function(){
                       _this.checkPlayId(this)
                })

                $(document).delegate('a.sj','click',function(){
                       _this.openOYX(this)
                })

            },

            checkPlayId : function(obj){
                    var _t = this ;
                    $.confirm('您好，您将要打开的数据页面中，主客场位置与现在投注页相反，投注时请确认主客队位置，一旦提交，我们将按照您的所选选项执行。',function(event){
                        _t.openOYX(obj);
                    })
            },
            openOYX : function(obj){
                    var s = $(obj).html();
                    var urlArgs = {
                        '1':{'亚':'/ypdb','欧':'/bjop','析':'/bfyc'},
                        '2':{'亚':'http://yuce.zgzcw.com/asia/','欧':'http://yuce.zgzcw.com/euro/','析':'http://yuce.zgzcw.com/dataAnalysis/'}
                    }
                    var cType = Dyc.cookie("oyx-type") , id,u='',rl = window.parent.location.href,domain='' ;

                    if(rl.indexOf('zgzcw.com') > -1){
                        domain = 'zgzcw.com';
                    }else{
                        domain = 'diyicai.com';
                    }

                    if($("input.o-old").first().attr('checked')){
                        cType = '2'
                        Dyc.cookie("oyx-type",cType,{expires:365,path:domain});
                    }else{
                        cType = '1'
                        Dyc.cookie("oyx-type",cType,{expires:365,path:domain});
                    }

                    if(cType =='2'){
                        id = $(obj).parent().attr('oldPlayid');
                        u  += urlArgs[cType][s];
                        u += id+'.shtml';
                    }else{
                        id = $(obj).parent().attr('newPlayid');
                        if(lotteryId ==200 || lotteryId ==48){
                            u += 'http://fenxi.zgzcw.com/lq/' ;
                        }else{
                            u += 'http://fenxi.zgzcw.com/' ;
                        }
                        u  += id + urlArgs[cType][s];
                    }
                    var src = u ;
                    window.open(src,'_blank');
            },

            checkIsWeekTip : function(){
                   var _this = this, date = new Date() ,
                       ymd = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(), //date.toLocaleDateString(),
                       d = date.getDay(),
                       tip = _this.weekTips[d];

                   var s = new Date(ymd + ' ' + tip.s).getTime(),
                       e = new Date(ymd + ' ' + tip.e).getTime() + tip.t,
                       wk = new Date(ymd + ' 01:00').getTime(),
                       nowTime = new Date().getTime();

                   if((d==0||d==1) && nowTime < wk){     //  周六,日到次日 01:00 内
                        return  true ;
                   }else if(s < nowTime && nowTime < e){   //  每天正常出票时间内
                        return true ;
                   }else{
                        return false ;
                   }
            },

            // 获取SP值
            getSpData: function(sVal){
                var spUrl = "/ssc/json/lqpjpl/" + sVal + ".json",
                    sHtml = "",
                    dt = {'v':this.random()},
                    spData = null;

                    $.ajax({
                           url:spUrl,
                           type:'post',
                           data:dt,
                           dataType:'json',
                           success:function(reg){
                               spData =  reg ;
                               $.each(spData, function(key, v){
                                   sHtml = "<span>"+ v.v3 +"</span><span class=\"mid\">"+ v.v2 +"</span><span>"+ v.v1 +"</span>"
                                   $("#sp_"+ key).html(sHtml);
                               })
                           },error:function(r){}
                    })
            },

            // 执行投注区排序
            spsSort : function(p,t,s){
                var tabArr = $(".mb"),
                    trsNew = "";
                $.each(tabArr,function(i){
                        var trs = $(tabArr[i]).find("tr[expire='1']") ;
                        if(trs.length){
                            trsNew = trs.sort(function(a,b){
                                var spsA = $(a).find('.spArr').val().split('|')[p],
                                    spsB = $(b).find('.spArr').val().split('|')[p];

                                var spA =  spsA.split(' '),spB =  spsB.split(' ') ;
                                if(s){
                                    return  Number(spA[t]) - Number(spB[t])
                                }else{
                                    return  Number(spB[t]) - Number(spA[t])
                                }
                            })
                            $("#hide_box_"+(i+1)).empty().html(trsNew);
                        }
                })
            },

            // 只看已选择场次
            hideShowMatch : function(flag){
                var _this = this
                if(!this.betNum){
                    $.alert('请选择赛事!');
                    $("#selectMatch").attr('checked',false)
                    return false ;
                }

                var h = $("#endM :checkbox").prop('checked'),trs ;
                if(h){
                    trs = $("#dcc tr");
                }else{
                    trs = $("#dcc tr[expire='1']"); ///[expire='1']
                }

                $.each(trs,function(i){
                    var ids = $(trs[i]).attr('id').split('_')
                    if(_this.betMatchCache[ids[1]] == undefined ){
                        if(ids.length<3){
                            $(trs[i]).isTogglen(!flag);
                        }else{
                            $(trs[i]).isTogglen(false);
                        }
                    }
                })
            },

            checkChuan : function(chuan){
                var len = chuan.length;
                var obj = {
                    '2':['2串1'],
                    '3':['2串1','3串1'],
                    '4':['2串1','3串1','4串1'],
                    '5':['2串1','3串1','4串1','5串1'],
                    '6':['2串1','3串1','4串1','5串1','6串1'],
                    '7':['7串1'],
                    '8':['8串1']
                };

                if(parseInt(dc.betNum,10) == 0) return '您好，请您先选择比赛场次。'
                if(len ==0) return '您好，请您先选择过关方式。'
                if(parseInt(dc.betNum,10) > 8 || parseInt(dc.betNum,10) < 2) return '很抱歉，优化功能暂时不支持8场以上和2场以下比赛的优化';
                for(var i=0;i<len;i++){
                    if(($.inArray(chuan[i],obj[dc.betNum]) < 0)) return '很抱歉，您当前的投注方案仅支持'+obj[dc.betNum].join(',')+'等过关方式优化' ;
                }
                return false ;
            },

            resetInfo : function () { //清空所有已选场次

                    var _this = this ;
                    _this.deleteAll();
                    _this.datas = [];//选择号码
                    _this.betMatchCache = {};
                    _this.selfDan = [];
                    _this.selfOpt = [];
                    _this.selfOpt_dg = [];
                    _this.betNum = 0;
                    _this.dgNum = 0;
                    _this.betPlayTypes = [];
                    _this.betPlayTypesBase = {};
                    _this.chuan = [];//串信息
                    _this.dan = [];//胆信息
                    _this.sum = 0;//总金额
                    _this.bei = 1;//倍数
                    $("#dcc").find('div.bifen-area').html("");
                    $("#footBox tr").html("");
                    $("#dcc .weisai").removeClass('x h').removeAttr('x');
                    $("#dcc .martop9").attr("checked", false);

                    _this.isggAreaOrNo();
                    _this.countBox(1);
            },

            // 获取单关配数据
            getDgpData : function () {
                // ?matchId=32204,32206&beishu=10&selectsp=3,1|3,0
                if (this.jiezhi) {
                    $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                    return false;
                }
                if (this.betNum <= 0) {
                    this.setPopupBox('请选择场次！', 'error');
                    return false;
                }
                if (this.bei < 10) {
                    this.setPopupBox('一场决胜投注倍数最小为10倍！', 'error');
                    return false;
                }
                var matchIds = [], selectsp = [];
                for (var i = 0; i < this.datas.length; i++) {
                    var data = this.datas[i];
                    if (data) {
                        matchIds.push(data[6]);
                        var arr = data[4], nums = [];
                        for (var j in arr) {
                            if (arr[j].toString()) nums.push(arr[j]);
                        }
                        selectsp.push(nums.join(','));
                    }
                }
                return {'matchId':matchIds.join(','), 'beishu':this.bei, 'selectsp':selectsp.join('|')};
            },

            getGroup : function (pid, mid) {
                return {
                    id: mid,
                    type: this.playTypes[pid],
                    code: [],//选号
                    prize: [],//奖金
                    bets:0,
                    name:[]
                }
            },

            getBetData : function (i, pid, mid, k, flag, isDg) {
                    var _this = this;
                    flag = flag || false;
                    isDg = isDg || 0;

                    var match = _this.getMatch(mid) || {},
                        argx = _this.args[pid],
                        betValue = argx.numType,
                        betName = ((_this.jcT=='jcrxy') ? argx.numName2 : argx.numName),
                        sp = _this.sp[mid][pid];
                    if (flag) {
                        !_this.datas[i] && ++_this.betNum && (_this.datas[i] = {});
                        if (!_this.isMix) {
                            var cid = _this.betPlayTypes[i];
                            if (cid && pid != cid) { _this.datas[i] = {};}
                        };
                        if(!_this.datas[i][pid] ){ if(isDg)  ++_this.dgNum;};
                        !_this.datas[i][pid] && (_this.datas[i][pid] = _this.getGroup(pid, mid));
                        var nb = _this.datas[i][pid];

                        if (_this.empty(nb.code)) {
                            nb.code[k]  = betValue[k];
                            nb.prize[k]  = sp[k] || 0;
                            nb.name[k]  = betName[k];
                            nb.bets = 1;
                            nb.isdg = isDg; //是否是单关
                            _this.betsSum++;
                            _this.betPlayTypes[i] = pid;
                            if(!_this.betPlayTypesBase[pid]){
                                _this.betPlayTypesBase[pid] = 1
                            }else{
                                _this.betPlayTypesBase[pid]++;
                            }
                            !_this.betMatchCache[match.matchId] && (_this.betMatchCache[match.matchId] = i.toString());
                        } else {
                            nb.code[k] = betValue[k];
                            nb.prize[k]  = sp[k] || 0;
                            nb.name[k]  = betName[k];
                            nb.bets++;
                            nb.isdg = isDg; //是否是单关
                            _this.betsSum++;
                            _this.betPlayTypesBase[pid]++;
                        };
                    } else {
                        if (_this.datas[i] && _this.datas[i][pid]) {
                            var nb = _this.datas[i][pid];
                            delete nb.code[k] && nb.bets--&&_this.betsSum--;
                            if (--_this.betPlayTypesBase[pid] == 0) delete _this.betPlayTypesBase[pid];
                            if (_this.empty(nb.code) || nb.bets == 0) {
                                delete _this.datas[i][pid];
                                _this.betPlayTypes[i] = '';
                                nb.isdg = 0; //设置不是单关
                                if(isDg) {
                                    if(_this.dgNum==0) _this.dgNum = 0;
                                    else _this.dgNum--;
                                }
                            }
                            delete nb.prize[k];
                            delete nb.name[k];
                            if (_this.checkEmpty(i)) {
                                _this.deleteOne(mid);
                            }
                        }
                    };
                    _this.betNumObj.html(_this.betNum);
            },

            getMinModeLimite : function () {
                var _this = this, pTypes = _this.betPlayTypesBase, args = _this.args;
                _this.maxModeLimite = (function (t) {
                    var s = 100;
                    for (var i  in pTypes) {
                            var p = pTypes[i];
                            if (p > 0) {
                                var max = args[i.toString().toUpperCase()]['maxNum'];
                                if (s > max) s = max;
                            }
                    }
                    return Math.min(s, t);
                })(8);
            },

            checkEmpty : function(inx){
                var datas = this.datas[inx], f = true;
                for(var i in datas){
                    f = f && (this.empty(datas[i]['code']));
                }
                return f;
            },

            // 代购
            affirmBuy : function () {
                var info = (Dyc.url().type =='jcrxy' ) ? this.getBuyInfoRxy() : this.getBuyInfo();
                var cN = ($(".rang :checked").val() =='ht') ? 2 : $(".rang :checked").length ;
                if (info) {
                    this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                    var url = '/lottery/jc_affirm.jsp';
                    $("#lotteryData").val(encodeURIComponent(info));
                    if(Dyc.url().type =='jcrxy'){
                        url += '?type=jcrxy&cN='+cN+'&value=' + encodeURIComponent(info);
                    }else{
                        url += '?cN='+cN+'&value=' + encodeURIComponent(info);
                    }
                    $("#affForm").attr("action", url).submit();
                    $('#loadingBox .popup_cancel').click()
                }
            },

            // 合买
            cooperateBuy : function () {
                var info = (Dyc.url().type =='jcrxy') ? this.getBuyInfoRxy() : this.getBuyInfo();
                var cN = ($(".rang :checked").val() =='ht') ? 2 : $(".rang :checked").length ;
                if (info) {
                    this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                    var url = '/lottery/jc_coop.jsp';
                    $("#lotteryData").val(encodeURIComponent(info));
                    if(Dyc.url().type =='jcrxy'){
                        url += '?type=jcrxy&cN='+cN+'&value=' + encodeURIComponent(info);
                    }else{
                        url += '?cN='+cN+'&value=' + encodeURIComponent(info);
                    }
                    $("#affForm").attr("action", url).submit();
                    $('#loadingBox .popup_cancel').click()
                }
            },

            upLoadBuy :function(){
                var info = this.getBuyInfo();
                if (info) {
                    this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                    var url = '/lottery/jc_yt_confirm.jsp';
                    $("#lotteryData").val(encodeURIComponent(info));
                    url += '?value=' + encodeURIComponent(info);
                    $("#affForm").attr("action", url).submit();
                    $('#loadingBox .popup_cancel').click()
                }
            },

            // 统计个彩种玩法的点击触发事件
            setTrackEvent : function(play){
                    var _this = this,
                        t = _this.isHm ? '我要代购' : '我要合e买' ;
                    try{
                        _czc.push(["_trackEvent", "竞彩篮球", t+''+play]);
                    }catch(e){}

            },

            // 组装参数
            getBuyInfo : function () {
                var _this = this ;
                if (_this.betNum <= 0) {
                    return !jQuery.alert("请选择投注场次！");
                } else if (!_this.chuan.length) {
                    return !jQuery.alert("请选择过关方式！")
                }
                if (this.sum < 1) {
                    return !jQuery.alert("投注方案金额不能为0！");
                }
                if (_this.bei == 1 && _this.sum > 6000) {
                    return !jQuery.alert("当倍数为1的时候，您的投注总金额不能超过6000元！");
                }
                if (_this.bei > 1 && _this.sum > 1500000) {
                    return !jQuery.alert("您的投注总金额不能超过150万元！");
                }

                var cN = ($(".rang :checked").val() =='ht') ? 2 : $(".rang :checked").length;

                var ids = [], nbs = [],nbsDg = [], arr = [], nums = 0, dzArr = [],dgArr = [];
                for (var i = 0, il = _this.datas.length; i < il; i++) {
                            var bet = _this.datas[i];
                            if (!bet) continue;
                            var ballStr = '',tarB=[],isdg = false;;

                            var playIdStr = '' , dgStr = '';
                            for(var tp = 0,tl=_this.typePosition.length;tp<tl;tp++){
                                        var playid = _this.typePosition[tp],dg = '';
                                        if(bet[playid]){
                                                var nb = bet[playid], tar = [],argx = _this.args[playid], id = +nb.id;
                                                if(nb.isdg) {
                                                    dg = '@';
                                                    isdg = true;
                                                }
                                                for (var j = 0, jl = nb.code.length; j < jl; j++) {
                                                    if (nb.code[j] >= 0){
                                                        var name = (cN!=2 && Dyc.url().type !='jcrxy') ?  nb.name[j] : nb.name[j] ;
                                                        tar.push(name),tarB.push(name);
                                                    }
                                                }
                                                nums += tar.length;

                                                if(cN==2 && !_this.isYtFs){
                                                    ballStr += argx.id[1] + ':' + "[" + tar.join(",") + "]-";
                                                    dgStr += argx.id[1] + ':' + '[' + tar.join(',') + ']'+dg+'-';
                                                }else{
                                                    ballStr += "[" + tar.join(",") + "]-";
                                                    dgStr += '[' + tar.join(',') + ']'+dg+'-';
                                                }
                                                playIdStr += playid +' ' ;
                                        }
                            }
                            ids.push(id);
                            var obj = _this.getMatch(id);
                            ballStr = ballStr.slice(0,ballStr.length -1);
                            dgStr = dgStr.slice(0,dgStr.length -1);

                            if(isdg){
                                dgArr.push(obj.matchNo);
                            }

                            var str,strDg,rq=0;
                            if( cN==2 && !_this.isYtFs){
                                str = id + ":" + obj.matchNo + "~" + ballStr;
                                strDg = id + ":" + obj.matchNo + "~" + dgStr;
                            }else{
                                str = id + ":" + obj.matchNo + ":" + ballStr;
                                strDg = id + ":" + obj.matchNo + ":" + dgStr;
                            }

                            if(playIdStr.indexOf('27') > -1 || playIdStr.indexOf('29')>-1){
                                     rq =  obj.comityBall ;
                            }

                            nbs.push(str);
                            nbsDg.push(strDg);
                            var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + rq + '~' + tarB.join(' ') + '~';
                            var dan = $.inArray(id.toString(), _this.dan) > -1 ? 1 : 0;
                            _str += dan;
                            dzArr.push(_str);
                };
                var _czcLotId;
                if(_this.isYtFs){
                    arr.push(Dyc.url().lottery);//彩种
                    _czcLotId = Dyc.url().lottery;
                    _this.setTrackEvent('预投上传'+_this.args[_czcLotId].tName);
                }else{
                    if(cN==1){
                        var nn = _this.filterNum ? 27 : 26 ;
                        arr.push(nn);
                        _czcLotId = nn;
                    }else if(cN==2 && _this.isDG){
                        arr.push(48);
                        _czcLotId = 48;
                    }else{
                        arr.push(_this.lotId);//彩种
                        _czcLotId = _this.lotId;
                    }
                    _this.setTrackEvent(_this.args[_czcLotId].tName);
                }
                arr.push(0);//写死
                arr.push(_this.chuan.join(",").replace(/串/g, "x"));//串
                ids.sort();
                arr.push(nbs.join("/"));//投注号码
                arr.push(_this.itemTotal);//总注数
                arr.push(_this.bei);//倍数
                arr.push(_this.sum);//总费用
                arr.push(_this.betNum);//场数
                arr.push(nums);//一共多少个号码
                arr.push(J.arr.min(ids));//开始期
                arr.push(J.arr.max(ids));//结束期
                if (_this.danCount > 0) {
                    var dan_arr = $.grep(_this.dan, function (n) {
                        return !!n
                    });
                    arr.push(dan_arr.join(","));//胆
                } else {
                    arr.push(0);//胆
                }
                var str = arr.join("^");
                str += "|" + dzArr.join("/");

                if(cN==2){
                    str += "|" + nbsDg.join("/");
                }else{
                    str += "|" + dgArr.join("/");
                }

                //   console.log(str);
                return str;
            },

            getBuyInfoRxy : function(){
                if (this.betNum <= 0) {
                    return !jQuery.alert("请选择投注场次！");
                } else if (!this.chuan.length) {
                    return !jQuery.alert("请选择过关方式！")
                }
                if (this.sum < 1) {
                    return !jQuery.alert("投注方案金额不能为0！");
                }
                if (this.bei == 1 && this.sum > 20000) {
                    return !jQuery.alert("当倍数为1的时候，您的投注总金额不能超过2万元！");
                }
                if (this.bei > 1 && this.sum > 1500000) {
                    return !jQuery.alert("您的投注总金额不能超过150万元！");
                }
                var ids = [], nbs = [], arr = [], nums = 0, dzArr = [];

                this.nameObj = {'主胜':'胜','主不败':'让胜','客胜':'负','客不败':'让负'};
                for (var i = 0, il = this.datas.length; i < il; i++) {
                    var bet = this.datas[i];
                    if (!bet) continue;
                    var ballStr = '',tarB=[];

                    for(var tp = 0,tl=this.typePosition.length;tp<tl;tp++){
                        var playid = this.typePosition[tp];
                        if(bet[playid]){
                            var nb = bet[playid], tar = [],argx = this.args[playid], id = +nb.id;
                            for (var j = 0, jl = nb.code.length; j < jl; j++) {
                                if (nb.code[j] >= 0)tar.push(this.nameObj[nb.name[j]]),tarB.push(this.nameObj[nb.name[j]]);
                            }
                            nums += tar.length;
                            ballStr += argx.id[1] + ':' + "[" + tar.join(",") + "]-";
                        }
                    }
                    ids.push(id);
                    var obj = this.getMatch(id);
                    ballStr = ballStr.slice(0,ballStr.length -1)
                    var str = id + ":" + obj.matchNo + "~" + ballStr;

                    nbs.push(str);
                    var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + obj.comityBall + '~' + tarB.join(' ') + '~';
                    var dan = $.inArray(id.toString(), this.dan) > -1 ? 1 : 0;
                    _str += dan;
                    dzArr.push(_str);
                }
                arr.push(this.lotId);//彩种
                arr.push(0);//写死
                arr.push(this.chuan.join(",").replace(/串/g, "x"));//串
                ids.sort();
                arr.push(nbs.join("/"));//投注号码
                arr.push(this.itemTotal);//总注数
                arr.push(this.bei);//倍数
                arr.push(this.sum);//总费用
                arr.push(this.betNum);//场数
                arr.push(nums);//一共多少个号码
                arr.push(J.arr.min(ids));//开始期
                arr.push(J.arr.max(ids));//结束期
                if (this.danCount > 0) {
                    var dan_arr = $.grep(this.dan, function (n) {
                        return !!n
                    });
                    arr.push(dan_arr.join(","));//胆
                } else {
                    arr.push(0);//胆
                }
                var str = arr.join("^");
                str += "|";
                str += dzArr.join("/");
                return str;
            },

            getBuyInfo_rqBase : function () { //组装参数
                if (this.betNum <= 0) {
                    return !jQuery.alert("请选择投注场次！");
                } else if (!this.chuan.length) {
                    return !jQuery.alert("请选择过关方式！")
                }
                if (this.sum < 1) {
                    return !jQuery.alert("投注方案金额不能为0！");
                }
                if (this.bei == 1 && this.sum > 20000) {
                    return !jQuery.alert("当倍数为1的时候，您的投注总金额不能超过2万元！");
                }
                if (this.bei > 1 && this.sum > 1500000) {
                    return !jQuery.alert("您的投注总金额不能超过150万元！");
                }
                var ids = [], nbs = [], arr = [], nums = 0, dzArr = [];
                for (var i = 0, il = this.datas.length; i < il; i++) {
                    var bet = this.datas[i];
                    if (!bet) continue;
                    var ballStr = '',tarB=[];

                    for(var tp = 0,tl=this.typePosition.length;tp<tl;tp++){
                        var playid = this.typePosition[tp];
                        if(bet[playid]){
                            var nb = bet[playid], tar = [],argx = this.args[playid], id = +nb.id;
                            for (var j = 0, jl = nb.code.length; j < jl; j++) {
                                if (nb.code[j] >= 0)tar.push(nb.name[j]),tarB.push(nb.name[j]);
                            }
                            nums += tar.length;
                            ballStr += argx.id[1] + ':' + "[" + tar.join(",") + "]-";
                        }
                    }
                    ids.push(id);
                    var obj = this.getMatch(id);
                    ballStr = ballStr.slice(0,ballStr.length -1)
                    var str = id + ":" + obj.matchNo + "~" + ballStr;

                    nbs.push(str);
                    var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + obj.comityBall + '~' + tarB.join(' ') + '~';
                    var dan = $.inArray(id.toString(), this.dan) > -1 ? 1 : 0;
                    _str += dan;
                    dzArr.push(_str);
                }
                arr.push(this.lotId);//彩种
                arr.push(0);//写死
                arr.push(this.chuan.join(",").replace(/串/g, "x"));//串
                ids.sort();
                arr.push(nbs.join("/"));//投注号码
                arr.push(this.itemTotal);//总注数
                arr.push(this.bei);//倍数
                arr.push(this.sum);//总费用
                arr.push(this.betNum);//场数
                arr.push(nums);//一共多少个号码
                arr.push(J.arr.min(ids));//开始期
                arr.push(J.arr.max(ids));//结束期
                if (this.danCount > 0) {
                    var dan_arr = $.grep(this.dan, function (n) {
                        return !!n
                    });
                    arr.push(dan_arr.join(","));//胆
                } else {
                    arr.push(0);//胆
                }
                var str = arr.join("^");
                str += "|";
                str += dzArr.join("/");
                return str;
            },

            getBuyInfo_rq : function () { //组装参数
                if (this.betNum <= 0) {
                    return alert("请选择投注场次！");
                } else if (!this.chuan.length) {
                    return alert("请选择过关方式！")
                }
                if (this.bei == 1 && this.sum > 20000) {
                    return alert("当倍数为1的时候，您的投注总金额不能超过2万元！");
                }
                if (this.bei > 1 && this.sum > 1500000) {
                    return alert("您的投注总金额不能超过150万元！");
                }
                var ids = [], nbs = [], arr = [], nums = 0, dzArr = [];
                for(var i = 0, il = this.datas.length; i < il; i++){
                    var nb = this.datas[i];
                    if(!nb) continue;
                    var ids = nb[6].split('_') ;
                    var oldId = ids[0];
                    var id = ids[0]+'_'+ids[1], tar = [];
                    ids.push(oldId);
                    for(var j = 0, jl = nb[8].length; j < jl; j++){
                        if(nb[8][j])tar.push(nb[8][j]);
                    }
                    var str = "";
                    if(this.lotId =='48'){
                        str += oldId + ":" + this.nos[id] + "~" +this.arg.id[this.betRqMatch[oldId]]+ ":";
                    }else{
                        str += oldId + ":" + this.nos[id] + ":";
                    }
                    str += "[" + tar.join(",") + "]";
                    nums += tar.length;
                    nbs.push(str);
                    var obj = this.getMatch(id);
                    var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + obj.comityBall + '~' + tar.join(" ") + '~';
                    var dan = J.arr.isIn(this.dan, oldId) ? 1 : 0;
                    _str += dan;
                    dzArr.push(_str);
                }
                arr.push(this.lotId);//彩种
                arr.push(0);//写死
                arr.push(this.chuan.join(",").replace(/串/g, "x"));//串
                ids.sort();
                arr.push(nbs.join("/"));//投注号码
                arr.push(this.itemTotal);//总注数
                arr.push(this.bei);//倍数
                arr.push(this.sum);//总费用
                arr.push(this.betNum);//场数
                arr.push(nums);//一共多少个号码
                arr.push(J.arr.min(ids));//开始期
                arr.push(J.arr.max(ids));//结束期
                if (this.danCount > 0) {
                    var dan_arr = $.grep(this.dan, function(n){return !!n});
                    arr.push(dan_arr.join(","));//胆
                } else {
                    arr.push(0);//胆
                }
                var str = arr.join("^");
                str += "|";
                str += dzArr.join("/");
                return str;
            },

            getBuyInfo_rxy : function () { //组装参数
                if (this.betNum <= 0) {
                    return !jQuery.alert("请选择投注场次！");
                } else if (!this.chuan.length) {
                    return !jQuery.alert("请选择过关方式！")
                }
                if (this.sum < 1) {
                    return !jQuery.alert("投注方案金额不能为0！");
                }
                if (this.bei == 1 && this.sum > 20000) {
                    return !jQuery.alert("当倍数为1的时候，您的投注总金额不能超过2万元！");
                }
                if (this.bei > 1 && this.sum > 1500000) {
                    return !jQuery.alert("您的投注总金额不能超过150万元！");
                }
                var ids = [], nbs = [], arr = [], nums = 0, dzArr = [];

                this.nameObj = {'主胜':'胜','主不败':'让胜','客胜':'负','客不败':'让负'};
                for (var i = 0, il = this.datas.length; i < il; i++) {
                    var bet = this.datas[i];
                    if (!bet) continue;
                    var ballStr = '',tarB=[];

                    for(var tp = 0,tl=this.typePosition.length;tp<tl;tp++){
                        var playid = this.typePosition[tp];
                        if(bet[playid]){
                            var nb = bet[playid], tar = [],argx = this.args[playid], id = +nb.id;
                            for (var j = 0, jl = nb.code.length; j < jl; j++) {
                                if (nb.code[j] >= 0)tar.push(this.nameObj[nb.name[j]]),tarB.push(this.nameObj[nb.name[j]]);
                            }
                            nums += tar.length;
                            ballStr += argx.id[1] + ':' + "[" + tar.join(",") + "]-";
                        }
                    }

                    ids.push(id);
                    var obj = this.getMatch(id);
                    ballStr = ballStr.slice(0,ballStr.length -1)
                    var str = id + ":" + obj.matchNo + "~" + ballStr;

                    nbs.push(str);
                    var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + obj.comityBall + '~' + tarB.join(' ') + '~';
                    var dan = $.inArray(id.toString(), this.dan) > -1 ? 1 : 0;
                    _str += dan;
                    dzArr.push(_str);
                }
                arr.push(this.lotId);//彩种
                arr.push(0);//写死
                arr.push(this.chuan.join(",").replace(/串/g, "x"));//串
                ids.sort();
                arr.push(nbs.join("/"));//投注号码
                arr.push(this.itemTotal);//总注数
                arr.push(this.bei);//倍数
                arr.push(this.sum);//总费用
                arr.push(this.betNum);//场数
                arr.push(nums);//一共多少个号码
                arr.push(J.arr.min(ids));//开始期
                arr.push(J.arr.max(ids));//结束期
                if (this.danCount > 0) {
                    var dan_arr = $.grep(this.dan, function (n) {
                        return !!n
                    });
                    arr.push(dan_arr.join(","));//胆
                } else {
                    arr.push(0);//胆
                }
                var str = arr.join("^");
                str += "|";
                str += dzArr.join("/");
                return str;
            },

            getFilterData : function(){ //获取在线过滤数据
                var arr = [],sparr = [],vsArr = [],orderArr = [],oparr = [];
                for (var i = 0, dl = this.datas.length; i < dl; i++) {
                    var nb = this.datas[i];
                    if(!nb) continue;

                    for(var j in nb){
                        if(j!='length'){
                            var id = nb[j]['id'];
                            sparr.push(id+':'+this.sp[id][j].join(','));
                            var _op = $.trim($('#esp_'+id).val()).replace('&nbsp;','');
                            if(_op.length < 1) _op = "- - -";
                            oparr.push(id+':'+_op.split(' ').slice(0,3).join(','));
                            var obj = this.getMatch(id);
                            var str =  '';
                            if(this.arg.id[this.filterNum] == '10'){
                                str = id + ":"+this.nos[id] + "VS" +obj.matchHome + "VS" + obj.matchGuest + "VS"+0+"VS" + obj.endTime;
                            }else{
                                str = id + ":"+this.nos[id] + "VS" +obj.matchHome + "VS" + obj.matchGuest + "VS"+obj.comityBall+"VS" + obj.endTime;
                            }
                            vsArr.push(str);
                            orderArr.push(id+':'+this.formatCode(nb[j]['code'],'-'));
                        }
                    }
                }
                arr.push(this.arg.newId);
                arr.push(orderArr.join("/"));
                arr.push(vsArr.join(","));
                if(this.chuan.length){
                    var chuanArr = this.chuan[0].split('串');
                    if(parseInt(chuanArr[1]) > 1) arr.push(chuanArr[0]+'串1');
                    else arr.push(this.chuan.join(","));
                }
                else arr.push('-');
                arr.push(this.bei);
                arr.push(this.itemTotal);
                arr.push(this.sum);
                arr.push(this.arg.id[this.filterNum]);
                arr.push(dc.queryTime.replace(/-/gm,''));
                $('#filtersp').val(sparr.join("/")+'^'+oparr.join('/'));
                return arr.join("^");
            },

            formatCode : function(arr,t){
                var len = arr.length,i,s="";
                if(!len) return s;
                for(i=0;i<len;i++){
                    if(arr[i]!=undefined){
                        s += arr[i] + t ;
                    }
                }
                return s.slice(0,-1)
            },

            getWinMoreBase : function(){//获取奖金预测数据
                var arr=[],nbArr=[],vsArr=[],minArr=[],maxArr=[],danA=[];
                for(var a = 0,al=this.datas.length;a<al;a++){
                    if(this.datas[a]){
                        var data = this.datas[a];
                        var id ,_nbArr = [], spVal = [];
                        var maxA = [],minA = [];
                        for (var i in data){
                            var nb = data[i];
                            id = nb['id'];
                            if(!nb) continue;
                            var temp = nb['code'], _arr = nb['prize'], b = this.getMatch(id);
                            for (var n = 0; n < temp.length; n++){
                                var bt = temp[n];
                                if(bt >= 0){
                                    var bv = [];
                                    if( i == '27'){
                                        bv = ['','','',3,1,0,'']
                                    }else{
                                        bv = [3,1,0,'','','','']
                                    }
                                    var inx = $.inArray(bt,bv);
                                    _nbArr.push("sp_" + this.nos[id] + "_" + (inx+1) + ":" + _arr[n]);
                                }
                            }
                            for (var v in _arr) {
                                if (_arr[v] && Number(_arr[v]) >= 0) {
                                    spVal.push(Number(_arr[v]));
                                }
                            }
                            maxA.push(J.arr.max(_arr))
                            minA.push(J.arr.min(_arr))
                        }

                        minArr.push(this.nos[id] + ":" + J.arr.min(spVal));
                        maxArr.push(this.nos[id] + ":" + J.arr.max(spVal));
                        nbArr.push(_nbArr.join(","));
                        var obj = this.getMatch(id);
                        var str = this.nos[id] + ":" + obj.matchHome + " VS " + obj.matchGuest + "$" + obj.endTime;
                        vsArr.push(str);
                    }
                }

                arr.push(10101)
                arr.push(nbArr.join("/"));
                arr.push(minArr.join("/"));
                arr.push(maxArr.join("/"));
                arr.push(vsArr.join(","));
                arr.push(this.chuan.join(","));
                arr.push(this.bei);
                arr.push(9528); //小混投
                arr.push(2010);
                for (var k = 0, kl = this.dan.length; k < kl; k++) {
                    if(this.dan[k]){
                        (this.lotId =='48') ? danA.push(this.getMatch(this.dan[k]+'_'+this.betRqMatch[this.dan[k]]).matchNo) :danA.push(this.getMatch(this.dan[k]).matchNo);
                    }
                }
                arr.push("方案金额:"+this.sum+"@"+danA.join(","));
                return arr.join("^");
            },

            getWinMoreMix : function () {//获取奖金预测数据
                var _this = this, arr = [], nbArr = [], vsArr = [];
                for (var i = 0, il = _this.datas.length; i < il; i++) {
                        // for (var i in this.codeList) {
                        var nb = _this.datas[i];
                        var tzArr = [];
                        if (!nb) continue;
                        var id ;
                        for(var pid in nb){
                            id = +nb[pid].id;
                            var codes = nb[pid]['code'], sps = nb[pid]['prize'], _arr = [];
                            var argx = _this.args[pid.toString().toUpperCase()], betValue = argx['numType'];
                            for(var j = 0; j < codes.length; j++){
                                    if(codes[j] >= 0)  {
                                        var inx = $.inArray(codes[j],betValue);
                                        _arr.push(inx + '(' + sps[j] + ')');
                                    }
                                }
                            tzArr.push(pid + '^' + _arr.join(','));
                        }
                        var obj = _this.getMatch(id);
                        var dan_str = '%' + (_this.dan[i] > 0 ? '1' : '0');
                        nbArr.push(obj['matchNo'] + '=' + tzArr.join('|') + dan_str);
                        var vs_str = obj['matchNo'] + "^" + obj['matchHome'] +"&nbsp;("+obj['comityBall'] +")&nbsp;"+ obj['matchGuest'] + "^" + obj['endTime'];
                        vsArr.push(vs_str);
                }
                arr.push('JCLQ');
                arr.push(nbArr.join("/"));
                arr.push([_this.chuan.join(",").replace('单关','1*1').replace(/串/g, '*'), _this.bei, _this.sum].join('+'));
                arr.push(vsArr.join('/'));
                return arr.join("&");
            },

            getWinMore : function(){//获取奖金预测数据
                var arr=[],nbArr=[],vsArr=[],minArr=[],maxArr=[],danA=[];;
                for (var i in this.datas){
                    var nb = this.datas[i];
                    if(!nb) continue;
                    var id = nb[6], temp = nb[4], _arr = nb[5], _nbArr = [], spVal = [];
                    for (var n = 0; n < temp.length; n++){
                        var bt = temp[n];
                        if(bt >= 0){
                            var inx = J.arr.indexof(this.betValue, bt);
                            _nbArr.push("sp_" + this.nos[id] + "_" + (inx + 1) + ":" + _arr[n]);
                        }
                    }
                    for (var v in _arr) {
                        if (_arr[v] && Number(_arr[v]) >= 0) {
                            spVal.push(Number(_arr[v]));
                        }
                    }
                    minArr.push(this.nos[id] + ":" + J.arr.min(spVal));
                    maxArr.push(this.nos[id] + ":" + J.arr.max(spVal));
                    nbArr.push(_nbArr.join(","));
                    var obj = this.getMatch(id);
                    var str = this.nos[id] + ":" + obj.matchHome + " VS " + obj.matchGuest + "$" + obj.endTime;
                    vsArr.push(str);
                }
                arr.push(10101)
                arr.push(nbArr.join("/"));
                arr.push(minArr.join("/"));
                arr.push(maxArr.join("/"));
                arr.push(vsArr.join(","));
                arr.push(this.chuan.join(","));
                arr.push(this.bei);
                arr.push(this.lotId);
                arr.push(2010);
                for (var k = 0, kl = this.dan.length; k < kl; k++) {
                    if(this.dan[k]){
                        (this.lotId =='48') ? danA.push(this.getMatch(this.dan[k]+'_'+this.betRqMatch[this.dan[k]]).matchNo) : danA.push(this.getMatch(this.dan[k]).matchNo);
                    }
                }
                arr.push("方案金额:"+this.sum+"@"+danA.join(","));
                return arr.join("^");
            },

            toggleBf : function(o){//比分页面详情的展开
                var s = o.attr('s'),
                    refid = o.attr('d') || '',
                    id = refid.split('_')[0],
                    sps = $('#ht_'+id).val() || '',
                    _this  = this ;
                if(s == null){
                    o.attr('s',1).addClass('show').find('i').html('收起');
                    $('#div_'+refid).empty().html(this.generateSpHtml(sps,id));
                    $('#tr_'+refid).show();
                    $('#div_'+refid).show();//200
                }else{
                    if(s == "1"){
                        $('#tr_'+refid).hide();//200
                        $('#div_'+refid).hide();//200
                        o.attr('s',0).removeClass('show').find('i').html('展开');
                    }else if(!this.isHistory){
                        $.get('/ssc/lottery/getJCBDBFSP.jsp?lottery=23&matchId='+id+'&d='+J.r(),function(sp){
                            sp = $.trim(sp) || '';
                            if(!sp || sp == "null") sp = sps;
                            else if(_this.sp[id])_this.sp[id] = sp.split(' ');
                            $('#div_'+refid).empty().html(_this.generateSpHtml(sp,id));
                            $('#tr_'+refid).show();
                            $('#div_'+refid).show();//200
                            o.attr('s',1).addClass('show').find('i').html('收起');
                        });
                    }else{
                        $('#tr_'+refid).show();
                        $('#div_'+refid).show();
                        o.attr('s',1).addClass('show').find('i').html('收起');
                    }
                }
            },

            resToggleHt : function(matchId){
                var sps = $('#ht_'+matchId).val() || '' ;
                $('#div_'+matchId+'_bf').empty().html(this.generateSpHtml(sps,matchId));
            },

            generateSpHtml : function(sps,id){
                var os = [], $tr = $("#tr_"+id), isStop = $tr.attr("expire") == 0,numName = this.betName,inx = $tr.attr('i');
                var tzArr = this.betMatchCache[id] ? this.datas[this.betMatchCache[id]]['23'] : [];
                var nbArr = tzArr ? tzArr['name']  : [] ;
                if(this.isHistory) isStop = true;
                var spArr = sps.split(" ");//tzdata = this.betMatchCache[id] ? this.datas[this.betMatchCache[id]] : [], nb = tzdata[4] || [];
                var strHtml = '<div class="bifen-area-bets">',nArr = this.arg.numName ;
                for(var i= 0,len=nArr.length;i<len;i++){
                    var nb = nArr[i],sp = spArr[i];
                    if(!sp) continue;
                    var ids = "td_"+id+"_23_"+ i , cls = "",pS="" ;
                    if(!isStop){
                        var f = ($.inArray(nb,nbArr) > -1 ) ? 1 : 0 ;
                        if(f){
                            cls = 'weisai x' ;
                            pS += 'x=1'
                        }else{
                            cls = 'weisai'
                            pS = '';
                        }
                    }else{
                        cls = sp-0 < 0 ? 'weisai red' : 'weisai' ;
                        sp =  sp.replace(/\-/g,'');
                    }
                    if(nb =='胜其他'){
                        strHtml += '<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>';
                        strHtml += '<label class="winOther"><a href="javascript:void(0)" class="quanBf" id="all1_'+id+'">全</a></label></div><div class="bifen-area-bets">';
                    }else if(nb =='平其他'){
                        strHtml += '<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>'
                        strHtml += '<label class="drawOther"><a href="javascript:void(0)" class="quanBf" id="all2_'+id+'">全</a></label><input class="inputClear" id="qx_'+id+'" type="button" value="全 清"></div><div class="bifen-area-bets">';
                    }else if(nb =='负其他'){
                        strHtml += '<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>'
                        strHtml += '<label class="lostOther"><a href="javascript:void(0)" class="quanBf" id="all3_'+id+'">全</a></label></div>';
                    }else{
                        strHtml += '<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>'
                    }
                }
                strHtml += '</div>';
                return strHtml ;
            },

            generateSpHtmlBase : function(sps,id){
                var os = [], $tr = $("#tr_"+id), isStop = $tr.attr("expire") == 0,numName = this.betName,inx = $tr.attr('i');
                if(this.isHistory) isStop = false;
                var spArr = sps.split(" "),spStr = '',tzdata = this.betMatchCache[id] ? this.datas[this.betMatchCache[id]] : [], nb = tzdata[4] || [];
                os.push('<div   class="bifen-area-bets" i="'+inx+'">');
                if(spArr[12].indexOf("-")>-1)spStr = '<br/><span id="sp_'+id+'_12" class="red">'+spArr[12].replace('-','')+'</span>';
                else spStr = '<br/><span id="sp_'+id+'_12">'+spArr[12]+'</span>';
                var str = '<td width="9%" id="td_'+id+'_12"';
                if(!isStop){
                    if(J.arr.indexof(nb,12) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                    else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                }
                else str += '>';
                str += '<span class="tb">胜其他</span>' + spStr +'</td>';
                os.push(str);
                for(var n=0; n < 12 ; n++){
                    if(spArr[n].indexOf("-")>-1)spStr = '<br/><span id="sp_'+id+'_'+n+'" class="red">'+spArr[n].replace('-','')+'</span> ';
                    else spStr = '<br/><span id="sp_'+id+'_'+n+'">'+spArr[n]+'</span> ';
                    str = '<td width="7%" id="td_'+id+'_'+n+'"';
                    if(!isStop){
                        if(J.arr.indexof(nb,n) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                        else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                    }
                    else str += '>';
                    str += '<span class="tb">'+numName[n]+'</span>' + spStr +'</td>';
                    os.push(str);
                }
                if(!isStop)os.push('<td class="a1" id="all1_'+id+'" onmousedown="return dc.eventS.a1mousedown(event,this)"><input type="checkbox"></td>');
                os.push('</tr>');
                os.push('<tr i="'+inx+'">');
                os.push('<td width="5%" height="40">平局</td>');
                if(spArr[17].indexOf("-")>-1)spStr = '<br/><span id="sp_'+id+'_17" class="red">'+spArr[17].replace('-','')+'</span>';
                else spStr = '<br/><span id="sp_'+id+'_17">'+spArr[17]+'</span>';
                str = '<td width="9%" id="td_'+id+'_17"';
                if(!isStop) {
                    if(J.arr.indexof(nb,17) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                    else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                }
                else str += '>';
                str += '<span class="tb">平其他</span>' + spStr +'</td>';
                os.push(str);
                for(var n=13; n < 17 ; n++){
                    if(spArr[n].indexOf("-")>-1)spStr = '<br/><span id="sp_'+id+'_'+n+'" class="red">'+spArr[n].replace('-','')+'</span> ';
                    else spStr = '<br/><span id="sp_'+id+'_'+n+'">'+spArr[n]+'</span> ';
                    str = '<td width="7%" id="td_'+id+'_'+n+'"';
                    if(!isStop){
                        if(J.arr.indexof(nb,n) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                        else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                    }
                    else str += '>';
                    str += '<span class="tb">'+numName[n]+'</span>' + spStr +'</td>';
                    os.push(str);
                }
                for(var j=0; j < 8 ; j++)os.push('<td> </td>');
                if(!isStop)os.push('<td class="a2" id="all2_'+id+'" onmousedown="return dc.eventS.a2mousedown(event,this)"><input type="checkbox"></td>');
                os.push('</tr>');
                os.push('<tr i="'+inx+'">');
                os.push('<td width="5%" height="40">客胜</td>');
                if(spArr[30].indexOf("-")>-1) spStr = '<br/><span id="sp_'+id+'_30" class="red">'+spArr[30].replace('-','')+'</span>';
                else spStr = '<br/><span id="sp_'+id+'_30">'+spArr[30]+'</span>';
                str = '<td width="9%" id="td_'+id+'_30"';
                if(!isStop){
                    if(J.arr.indexof(nb,30) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                    else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                }
                else str += '>';
                str += '<span class="tb">负其他</span>' + spStr +'</td>';
                os.push(str);
                for(var n=18; n < 30 ; n++){
                    if(spArr[n].indexOf("-")>-1)spStr = '<br/><span id="sp_'+id+'_'+n+'" class="red">'+spArr[n].replace('-','')+'</span> ';
                    else spStr = '<br/><span id="sp_'+id+'_'+n+'">'+spArr[n]+'</span> ';
                    str = '<td width="7%" id="td_'+id+'_'+n+'"';
                    if(!isStop){
                        if(J.arr.indexof(nb,n) < 0)str += ' class="s" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" />';
                        else str += ' class="s xz" x="1" onmousedown="return dc.eventS.smousedown(event,this.id)"><input type="checkbox" checked="checked"/>';
                    }
                    else str += '>';
                    str += '<span class="tb">'+numName[n]+'</span>' + spStr +'</td>';
                    os.push(str);
                }
                if(!isStop)os.push('<td class="a3" id="all3_'+id+'" onmousedown="return dc.eventS.a3mousedown(event,this)"><input type="checkbox"></td>');
                os.push('</tr>');
                os.push('</table>');
                return os.join('');
            },

            checkBei : function (obj, n) {
                var val = obj.val();
                var maxBei = this.maxBei||10000;
                if (val !== "") {
                    val = parseInt(val);
                    if (!val) {
                        obj.val(1);
                    }
                    else if (val > maxBei) {
                        obj.val(maxBei);
                    } else {
                        if (val <= 0) {
                            obj.val(1);
                        } else {
                            obj.val(val);
                        }
                    }
                }
                val = obj.val();
                if (val <= 1) {
                    $("#doubleDown").attr("class", "jian_manu_d")
                } else {
                    $("#doubleDown").attr("class", "jian_manu")
                }
                if (val >= maxBei) {
                    $("#doubleUp").attr("class", "jia_manu_d")
                } else {
                    $("#doubleUp").attr("class", "jia_manu")
                }
                this.bei = val;
                this.countItems();
            },

            // 处理选号事件处理
            clickEvent : function (id, c) {
                var _this = this,
                    arr = id.split("_"),
                    mid = arr[1], pid = arr[2], no = arr[3],
                    argx = this.args[pid], betValue = argx.numType;
                var con = $('#tr_' + mid),
                    etd = $('#td_' + arr.slice(1).join('_')),etdP = etd.parent(),
                    allId = '#all_' + mid + '_' + pid, inx = +con.attr('i');

                var isDg = etdP.attr('isdg') || 0,isDg = isDg -0;

                if (!etd.attr("x")) {
                    if (!_this.betMatchCache[mid] && _this.betNum + 1 > _this.maxChang) {
                        return alert("对不起，最多能选择" + _this.maxChang + "场比赛");
                    }
                    _this.getBetData(inx, pid, mid, no, 1, isDg);
                    etd.addClass("x").attr("x", "1");
                } else {
                    _this.getBetData(inx, pid, mid, no, 0, isDg);
                    etd.removeClass("x h").removeAttr("x");
                }
                var len = 0, nb = _this.datas[inx];
                if(!_this.empty(nb) && nb[pid]) len = nb[pid].bets;
                if(len){
                    var count = betValue.length;
                    if (pid == '28') {
                            count = 6;
                            var a1 = ['0','2','4','6','8','10'],a2 = ['1','3','5','7','9','11'];
                            if($.inArray(no,a1)>-1){
                                allId = "#all1_" + mid + '_' + pid
                            }else if($.inArray(no,a2)>-1){
                                allId = "#all2_" + mid + '_' + pid
                            }
                            len = $(allId).prevAll(".x").length;
                    }
                    if (len == count) $(allId).addClass("x").children(':checkbox').attr('checked',true);
                    else $(allId).removeClass("x").children(':checkbox').attr('checked',false);
                }
                _this.isggAreaOrNo();
                setTimeout(function(){_this.countBox(mid)}, 20);
            },

            allClickEvent : function(id){
                var _this = this, arr = id.split("_"); //all_38795_23
                var mid = arr[1], pid = arr[2], eid, b;
                var con = $('#tr_' + mid), all = $("#"+id);//$('#all_' + mid + '_' + pid);
                //  if (!this.isHistory &&  con.attr("expire") == 0)return !!alert("当前期次不允许投注已截止的比赛场次！");
                var betObj = all.prevAll('.weisai'), kl = betObj.length, etd, inx = +con.attr('i'), c =  all.find('input');
                if (!c.attr('checked')) {
                    if (!this.betMatchCache[mid] && this.betNum + 1 > this.maxChang){
                        return !!alert("对不起，最多能选择" + this.maxChang + "场比赛");
                    }
                    for (var k = 0; k < kl; k++) {
                        etd = $(betObj[k]);
                        if (!etd.attr("x")) {
                            eid = etd.attr('id');
                            b = eid.split('_');
                            etd.addClass("x").attr("x", "1");
                            this.getBetData(inx, pid, mid, +(b[3] || k), 1);
                        }
                    }
                    all.attr("class", "all x");
                    all.find(":checkbox").attr("checked",true);
                } else {
                    for (var k = 0; k < kl; k++) {
                        etd = $(betObj[k]);
                        if (!!etd.attr("x")) {
                            eid = etd.attr('id');
                            b = eid.split('_');
                            etd.removeClass("x h").removeAttr("x");
                            this.getBetData(inx, pid, mid, +(b[3] || k));
                        }
                    }
                    all.attr("class","all");
                    all.find(":checkbox").attr("checked",false);
                }

                _this.isggAreaOrNo();
                setTimeout(function(){_this.countBox(mid)}, 20);

            },

            // 比分点全
            allClickEventBf : function(ts){
                var _this = this, id = ts.attr("id");
                var arr = id.split("_");
                var betObj = ts.parent().siblings('.weisai'),etd, inx = $('#tr_'+arr[1]).attr('i');
                if ($(ts).attr("class") == "quanBf") {
                    for (var k = 0, kl = betObj.length; k < kl; k++) {
                                etd = $(betObj[k]);
                                etd.addClass("x").attr("x", "1");
                                var ids = etd.attr('id').split('_');
                                _this.getBetData(inx,ids[2],ids[1],ids[3],1);
                    }
                    ts.addClass("x");
                } else {
                    for (var k = 0, kl = betObj.length; k < kl; k++) {
                                etd = $(betObj[k]);
                                if (etd.attr("x")) {
                                    etd.removeClass("x h").removeAttr("x");
                                    var ids = etd.attr('id').split('_');
                                    _this.getBetData(inx, ids[2],ids[1],ids[3],0);
                                }
                    }
                    ts.removeClass("x");
                }

                _this.isggAreaOrNo();
                _this.countBox(arr[1]);//函数集合
                return false ;
            },

            flyEffect : function (s) {
                var o = $(s);
                if(this.ie > 0 && this.ie < 8)return;
                if (o.attr('x')) {
                    jTool.initFly(o);
                }
            },

            isggAreaOrNo:function(){
                var nbLen = this.betNum;
                if(nbLen){
                    $("#ggNoArea").hide()
                    $("#ggArea").show();
                }else{
                    $("#ggArea").hide();
                    $("#ggNoArea").show()
                }
            },

            deleteOne : function (id) {
                var _this = this ;
                _this.betNum--;
                if (_this.betNum <= _this.minMacthNum) {
                    $('#guoguanMany').removeClass('special').hide();
                    $('#guoguanManyInput').attr('checked',0);
                }
                var i = +_this.betMatchCache[id];
                delete _this.betMatchCache[id];
                delete _this.datas[i];
                delete _this.betPlayTypes[i];
                for(var pid in _this.datas[i]){
                    var nb = _this.datas[i][pid];
                    _this.betPlayTypesBase[pid] -= nb['bets'];
                }
                if (_this.dan[i]) {
                    _this.danCount--;
                    delete _this.dan[i];
                }
                if (_this.ggModeInputObj[_this.betNum + 1]) {
                    _this.ggModeInputObj[_this.betNum + 1].remove();
                    delete _this.ggModeInputObj[_this.betNum + 1];
                }
                if (_this.ggManayLiObj[_this.betNum + 1]) {
                    _this.ggManayLiObj[_this.betNum + 1].remove();
                    delete _this.ggManayLiObj[_this.betNum + 1];
                }
            },

            deleteAll : function(){
                var _this = this ;
                for (var i in _this.ggModeInputObj) {
                    var ggInput = _this.ggModeInputObj[i];
                    if (ggInput) {
                        ggInput.remove();
                    }
                }
                for (var i in _this.ggManayLiObj) {
                    var ggLi = _this.ggManayLiObj[i];
                    if (ggLi) {
                        ggLi.remove();
                    }
                }
                _this.betPlayTypesBase = {};
                _this.ggModeInputObj = [];
                _this.ggManayLiObj = [];
                $("#guoguanMany").removeClass('special').hide();
                $('#guoguanManyInput').attr('checked', 0);
            },

            // 获取当前场次
            getMatch : function (id) {
                var _this = this ;
                for (var i = 0, il = _this.matchInfo.length; i < il; i++) {
                    if (_this.matchInfo[i].matchId == id) return _this.matchInfo[i];
                }
                return null;
            },

            // 计算钱数集合
            countBox : function (id, val, dg) {
                var _this = this;
                if (id) {
                    _this.setFootWin(id); //下部窗口
                    _this.showChuanFn(_this.betNum);//显示隐藏串
                }
                _this.getChuan();
                _this.getDan();
                if(!dg){
                    _this.danAndChuan(val);//串和胆的显示
                }
                if(_this.lotId == 23) _this.bfTr(id)//已经有号码的单场场次，变色
                _this.countItems();//算注数
            },

            bfTr : function(id){
                if (this.betMatchCache[id]){
                    $("#tr_"+id).addClass("mor_ye");
                }else{
                    $("#tr_"+id).removeClass("mor_ye");
                }
            },

            // 计算钱数
            countItems : function () {
                var _this = this , nbLen = _this.betNum;
                if (nbLen && _this.chuan.length) {
                    _this.getMoney();
                } else {
                    $("#buyTotalItems").html(0);
                    $("#buyTotalNum").html(0);
                    $("#maxPrize").add('#minPrize').html(0);
                }
                _this.betNumObj.html(nbLen);
                $("#buyDoubleTxt").text(_this.bei);
                $("#allDan").text(_this.danCount);
            },

            showChuanFn : function (len) { //显示选号方式
                var _this = this ;
                var betNum = len || _this.betNum;

                if (betNum > _this.maxModeLimite) {
                       betNum = _this.maxModeLimite ;
                };
                if(_this.dgNum) _this.minMacthNum = 1 ; //如果是单关
                else  _this.minMacthNum = 2 ;
                if(_this.isDGP) return false ;  //单关配

                if (!_this.ggModeInputObj[0] && !_this.dgNum && betNum <1) {
                    var str = '\u8BF7\u81F3\u5C11\u9009\u62E9' + (_this.isDG ? "\u4E00" : "\u4E24") + '\u573A\u6BD4\u8D5B';
                    var labelObj = $('<label id="noguoguan" class="noguoguan">' + str + '</label>');
                    _this.ggModeInputObj[0] = labelObj;
                    $('#guoguanSingle').empty().append(labelObj);
                }
                _this.hideChuan();
                var dg = false ; //单关
                for (var i = _this.minMacthNum; i <= betNum; i++) {
                    if (!_this.ggModeInputObj[i]) {
                        var gg = _this.ggMode["Single"][i - 1];
                        if(gg =='单关'){
                            var ch = _this.isDG ? 'checked' : '';
                            if(_this.isDGP){
                                var labelObj = $('<label for="guoGuan2"><input type="checkbox" checked disabled value="2串1" id="guoGuan2">2串1</label>');
                            }else{
                                var labelObj = $("<label for=\"guoGuan" + i + "\"><input type=\"checkbox\"  "+ch+"  disabled  value=\"" + gg + "\" id=\"guoGuan" + i + "\">" + gg + "</label>");
                                dg = true ;
                            }
                        }else{
                            var labelObj = $("<label for=\"guoGuan" + i + "\"><input type=\"checkbox\" value=\"" + gg + "\" id=\"guoGuan" + i + "\">" + gg + "</label>");
                            dg = false ;
                        }
                        _this.ggModeInputObj[i] = labelObj;
                        if(dg){
                            $('#guoguanSingle label:eq(0)').after(labelObj)
                        }else{
                            $('#guoguanSingle').append(labelObj);
                        }
                        (function (i) {
                            labelObj.children(':checkbox').click(function () {
                                if (this.checked) {
                                    var guoGuanNum = _this.chuan.length;
                                    if (guoGuanNum >= 5) {
                                        this.checked = "";
                                        $.alert("\u7ec4\u5408\u8fc7\u5173\u9009\u62e9\u7684\u8fc7\u5173\u65b9\u5f0f\u4e0d\u80fd\u8d85\u8fc75\u4e2a");
                                        return false;
                                    }

                                    var val = $(this).val(),dgF = false;
                                    if (val == "\u5355\u5173") dgF = true;
                                    val = $(this).val().split("\u4e32")[1];

                                    _this.countBox(0, val, dgF);
                                }else {
                                    _this.countBox();
                                }
                            });
                        })(i);
                    }
                }

                if(!_this.dgNum){
                    $("#guoguanSingle").find("label[for='guoGuan1']").remove();
                    delete _this.ggModeInputObj[1] ;
                }
                if (betNum > _this.minMacthNum && !_this.isDG) {
                    $("#guoguanMany").show();
                    _this.createGgManyMode();
                }
            },

            createGgManyMode : function () {
                var liObjArr = "", _this = this ;
                var betNum = _this.betNum ;
                if(betNum > _this.maxModeLimite){
                    betNum = _this.maxModeLimite;
                };
                for (var i = _this.minMacthNum; i <= betNum; i++) {
                    var liObj = $("<dd></dd>");
                    if (_this.ggModeInputObj[i].length != 1) {
                        continue;
                    }
                    for (var k in _this.ggMode["Many"][i]) {
                        var gg = _this.ggMode["Many"][i][k];
                        var labelObj = $('<label for="guoGuan_' + i + k + '"><input type="checkbox" value="' + gg + '" id="guoGuan_' + i + k + '">' + gg + '</label>');
                        liObj.append(labelObj);
                        _this.ggModeInputObj[i] = _this.ggModeInputObj[i].add(labelObj);
                        (function (i) {
                            labelObj.children(':checkbox').click(function () {
                                if (this.checked) {
                                    var guoGuanCheckedNum = _this.chuan.length;
                                    if (guoGuanCheckedNum >= 5) {
                                        this.checked = "";
                                        $.alert("\u7ec4\u5408\u8fc7\u5173\u9009\u62e9\u7684\u8fc7\u5173\u65b9\u5f0f\u4e0d\u80fd\u8d85\u8fc75\u4e2a");
                                        return false;
                                    }
                                    var val = $(this).val();
                                    if (val == "\u5355\u5173") val = 1;
                                    else val = $(this).val().split("\u4e32")[1];
                                    _this.countBox(0, val);
                                }
                                else _this.countBox();
                            });
                        })(i);
                    }
                    if (!_this.empty(_this.ggMode["Many"][i])) {
                        if (!_this.ggManayLiObj[i]) {
                            _this.ggManayLiObj[i] = liObj;
                        }
                        if (liObjArr == "") {
                            liObjArr = liObj;
                        } else {
                            liObjArr = liObjArr.add(liObj);
                        }
                    }
                }
                $('#chuanOths').append(liObjArr);
            },

            hideChuan : function () {
                if (this.betNum < this.minMacthNum) {
                    $('#noguoguan').show();
                } else {
                    $('#noguoguan').hide();
                }
            },

            // 获取串信息
            getChuan : function () {
                var _this = this, minB = 20, minC = 1;
                _this.chuan = [];
                $("#chuans :checked").each(function (i) {
                    var val = $(this).val(), b = 1, c = 1;
                    if (val) {
                        _this.chuan.push(val);
                        if (val != "\u5355\u5173") {
                            var arr = val.split("\u4e32");
                            b = +arr[0];
                            c = +arr[1];

                            if (minB > b) minB = b;
                            if (minC < c) minC = c;
                        }
                    }
                });
                _this.minChuan = minB == 20 ? 0 : minB;
                _this.minChuanNum = minC;
            },

            // 获取胆信息
            getDan : function () {
                var _this = this;
                _this.dan = [];
                _this.danCount = 0;
                $("#footBox :checked").each(function (i) {
                        var matchid = $(this).val(), val = $(this).attr('id').split('_')[1],inx = dc.betMatchCache[matchid];
                        if(+inx >= 0){
                            _this.danCount++;
                            _this.dan[+inx] = val;
                        }
                });
            },


            // 生成并绑定下选框
            setFootWin : function (id) {
                var _this = this, str = "",bfStr ='', inx = _this.betMatchCache[id];
                if (inx >= 0) {
                    var obj = _this.getMatch(id);
                    var pid = _this.betPlayTypes[+inx] ,flag = false;
                    str += '<td width="50"  class="fs" id="b_' + id + '">' + obj.matchNo + '</td>';
                    str += '<td width="60" class="t-r">' + obj.matchHome.substring(0, 4) +'</td>';
                    str += '<td width="25">VS</td>';
                    str += '<td width="60" class="t-l">' +obj.matchGuest.substring(0, 4) +'</td>';
                    for(var ii in _this.datas[+inx]){
                        if( ii !='length'){
                            if(ii =='27'){
                                flag = true;
                                break;
                            }else{
                                flag = false;
                            }
                        }
                    }

                    str += '<td class="optionsTd"><span class="opti-list">';
                    for(var tp = 0,tl=_this.typePosition.length;tp<tl;tp++){
                        var i = _this.typePosition[tp];
                        if(_this.datas[+inx][i]){
                            var  nb = _this.datas[+inx][i], val = nb.code, vallen = nb.code.length, numName = nb.name;
                            for (var n = 0; n < vallen; n++) {
                                    if (val[n] >= 0){
                                        if(i=='27'){
                                            str += '<a class="n" id="n_' + id + '_' + i + '_' + n + '">('+obj.comityBall+')'+numName[n] + '</a>';
                                        }else{
                                            str += '<a class="n" id="n_' + id + '_' + i + '_' + n + '">' + numName[n] + '</a>';
                                        }
                                        if(i=='23'){
                                            bfStr += '<a class="n" id="n_' + id + '_' + i + '_' + n + '">' + numName[n] + '</a>';
                                        }
                                    }
                            }
                        }
                    }
                    str += '</span></td>';
                    str += '<td width="30"><input type="checkbox" class="d" id="cd_' + id + '" value="' + id + '"></td>';
                    str += '<td width="30" class="fs" id="z_' + id + '"><a href="####" class="close"></a></td>';


                    $("#strBf_"+id).empty().append(bfStr);
                    $("#foot_" + id).html(str).show();
                    $("#foot_" + id + " .n").unbind().mousedown(function () {
                        _this.clickEvent(this.id, 1);
                    })
                    $("#strBf_" + id + " .n").unbind().mousedown(function () {
                        _this.clickEvent(this.id, 1);
                    })

                    $("#foot_" + id + " .d").unbind().click(function () {
                        $("#right_" + id + " .d").attr('checked', $(this).attr('checked'));
                        _this.isggAreaOrNo();
                        _this.countBox();
                    })
                    $("#foot_" + id + " .fs").unbind().mousedown(function () {
                      //  _this.delTrNb1(this.id);
                        $(this).siblings('.optionsTd').find('a').trigger('mousedown');
                        _this.isggAreaOrNo();
                        _this.countBox(id);
                    })
                    if (_this.ie == 6) {
                        $("#foot_" + id + " .fs").unbind().hover(function () {$(this).find('span').hide()},function(){$(this).find('span').show()});
                    }
                } else {
                    $("#foot_" + id).html("");
                    $("#strBf_" + id).html("");
                    // $("#ballFly").parent().removeClass('show');
                }
                if(!_this.isHistory){
                      _this.checkSelectedMatch();
                }
            },

            checkSelectedMatch : function(){
                var _this = this, arr = [],flag = true;
                for(var i in _this.betMatchCache){
                    if(i!='length'){
                        var exp = $("#tr_"+i).attr('expire');
                        if(exp =='0'){ $('.tzbtn').hide();break;}
                        else{ $('.tzbtn').show() }
                        arr = arr.concat(_this.getPlayType(_this.betMatchCache[i]))
                    }
                }
                if(_this.empty(_this.betMatchCache)) $('.tzbtn').show() ;
                for(var j= 0,len = arr.length;j<len;j++){
                    if(arr[0] != arr[j]){
                        flag = false ;
                        break;
                    }
                }
                _this.filterNum = ((arr[0] =='26') ? 0 : 1)

                if(!flag)$("#onlineFilter").hide();
                else $("#onlineFilter").show();
            },

            getPlayType:function(n){
                var _this = this, arr = [] ;
                for(var i in _this.datas[n]){
                    if(i!='length'){
                        arr.push(i);
                    }
                }
                return arr ;
            },

            danAndChuan : function (val) {
                var _this = this, nbLen = _this.betNum,dC;
                var box = $("#footBox :checkbox");
                if (_this.isDG) { //如果是单关的时候
                    box.attr("disabled",true).attr("checked",false);
                    return;
                }
                if (val && val != 1) {
                    box.attr("disabled",true).attr("checked",false);
                    return;
                }
                box.filter(':disabled').attr("disabled",false);
                $("#chuans input:disabled").attr("disabled",false);
                if (_this.danCount) {
                    $("#chuanOths :checked").attr("checked",false);
                    $("#chuanOths :checkbox").attr("disabled",true);//组合过关全部禁用
                } else $("#chuanOths :checkbox").attr("disabled",false);//组合过关全部禁用
                /*var dom = $("#guoguanSingle label:lt(" + this.danCount + ") :checkbox");
                dom.attr("checked",false).attr("disabled",true);*/
                if(_this.dgNum && nbLen>2 && _this.danCount){
                    dC = _this.danCount + 1 ;
                }else{
                    dC = _this.danCount ;
                }
                var dom = $("#guoguanSingle label:lt(" + dC + ") :checkbox");
                dom = dom.filter(function(i){
                             return  $(dom[i]).val() !='单关' ;
                })
                dom.attr("checked",false).attr("disabled",true);
                if (_this.minChuan) {//已经选了串了
                    if ((_this.minChuan - 1) == _this.danCount) {  //胆数等于最小的 串数 -1
                        box.not(":checked").attr("disabled",true);
                    } else if (_this.minChuanNum == 1 && nbLen == _this.minChuan) { //场数等于最小串数切为串1
                        box.attr("disabled",true).attr("checked",false);
                        $("#chuans input:disabled").attr("disabled",false);
                    }else if(_this.minChuanNum > 1){
                        box.attr("disabled",true).attr("checked",false);
                    }
                } else if (_this.danCount >= nbLen - 1) { //胆数 等于 场数 -1
                    box.not(":checked").attr("disabled",true);
                } else if ((_this.minChuan - 1) == this.danCount) { //最小串数-1 等于胆数
                    box.not(":checked").attr("disabled",true);
                }

                if(_this.dgNum && _this.danCount){
                       $("#guoGuan1").attr('disabled',false);
                };
            },

            setTrDgCls :function(c){
                var _this = this;
                if(_this.isDG) return false;
                if(c){
                    var divV = $("."+c);
                    $.each(divV,function(i){
                        var d = $(divV[i]),
                            mid = d.attr('mid'),
                            tr = $('#tr_'+mid),
                            isdg = d.attr('isdg') - 0;

                        if(isdg){
                            tr.find('td:eq(0)').addClass('dg');
                        }else{
                            tr.find('td:eq(0)').removeClass('dg');
                        }
                    })
                }else{
                    var trs = $("#dcc tr");
                    $.each(trs,function(i){
                        var d = $(trs[i]),
                            isdg = d.attr('dg') - 0;

                        if(isdg){
                            d.find('td:eq(0)').addClass('dg');
                        }else{
                            d.find('td:eq(0)').removeClass('dg');
                        }
                    })
                }

            },

            delType :function(t){
                var s =  $("."+t).find('a.x');
                //  $("."+t).find('a').removeClass('x');
                s.click();
                $("."+t).find('checkbox').attr('checked',false)
            },

            delTrNb : function (ids) {
                var _this = this,
                    idA = ids.split("_"),id ;

                id = idA[1];

                _this.delTrNb1(ids);
                _this.hideNum = _this.hideNum + 1;
                $("#hideNum").html(_this.hideNum);

                if(_this.lotId =='23'){
                    $("#tr_"+id).hide();
                    $("#tr_"+id+"_bf").hide();
                }else{
                    $("#tr_"+id).hide();
                }
                _this.isggAreaOrNo();
                _this.countBox(id);
            },

            delTrNb1 : function (id) {
                var _this = this, ids = id.split("_");
                var id = ids[1];
                var i =  +_this.betMatchCache[id] ;
                if (i >= 0) _this.deleteOne(id);

                if(_this.lotId == 23){
                    $("#div_"+id+"_bf .weisai").attr("class","weisai").removeAttr('x');
                    $("#div_"+id+"_bf .quanBf").attr("class","quanBf");
                    $("#div_"+id+"_bf .inputClear").attr("class","inputClear");
                }else{
                    $("#tr_"+id+" .weisai").attr("class","weisai").removeAttr('x');
                    $("#tr_"+id+" .a").attr("class","a");
                    $("#tr_"+id+"  :checkbox").attr("checked",false);
                }

                _this.getMinModeLimite();
                _this.setFootWin(id); //下部窗口
            },

            getCodeList : function(){
                    var r = [],r_d = [], b = [],_this = this;
                    for (var i = 0, il = _this.datas.length; i < il; i++) {
                        var nb = _this.datas[i];
                        if (!nb) continue;
                        var a = [],a_d = [];
                        $.each(nb, function (j, d) {
                            a.push(d.bets + '-' + d.type);
                            if(d.isdg) a_d.push(d.bets + '-' + d.type);
                        })
                        if (!_this.dan[i]) {  // 非胆
                            r.push(a);
                        }else b.push(a);  // 胆

                        // 单关
                        if(a_d.length){
                            r_d.push(a_d);
                        };
                    }
                    _this.selfOpt = r;
                    _this.selfDan = b;
                    _this.selfOpt_dg = r_d; //单关
            },

            getMoney : function () {
                var _this = this ;
                _this.getCodeList();
                var zhuShuVal = 0, minBonusVal = 0, maxBonusVal = 0, minBonusValArr = [];
                for (var i = 0 , il = _this.chuan.length; i < il; i++) {
                        var guoGuan = _this.chuan[i].replace('串', '_');
                        if (_this.chuan[i] == '单关') guoGuan = '1_1';
                        var c = _this.getZhuShu(guoGuan);
                        zhuShuVal += c;
                        var bonus = _this.getBonus(guoGuan);
                        if (c > 0) maxBonusVal += bonus[0];
                        var minArr = bonus[1];
                        for (var j = 0, jl = minArr.length; j < jl; j++) {
                                if (minArr[j] >= 0) {
                                    if (!minBonusValArr[j]) minBonusValArr[j] = 0;
                                    minBonusValArr[j] += minArr[j];
                                }
                        }
                }
                if (zhuShuVal > _this.maxZhushu) {//如果注数超出最大注数
                    _this.zhushuOverflow(zhuShuVal);
                    _this.overflowTip = false;
                }
                for (var i = 0, l = minBonusValArr.length; i < l; i++) {
                        if (minBonusValArr[i]) {
                            minBonusVal = minBonusValArr[i];
                            break;
                        }
                }

                _this.itemTotal = zhuShuVal;
                _this.sum = zhuShuVal * _this.bei * 2;
                $("#buyTotalItems").html(_this.itemTotal);
                $("#buyTotalNum").html(_this.sum);
                var maxbouns = 0, minbouns = 0;
                if (_this.betNum > 0 && _this.betNum <= _this.maxChang && _this.bei <= _this.maxBei) {
                    var radix = 2;
                   // if(_this.isDG && _this.lotId !=28)radix = 1;
                    maxbouns = parseFloat(Math.round(maxBonusVal * _this.bei * 100 * radix) / 100).toFixed(2);
                    minbouns = parseFloat(Math.round(minBonusVal * _this.bei * 100 * radix) / 100).toFixed(2);
                }
                $('#maxPrize').html(maxbouns);
                $('#minPrize').html(minbouns);
            },

            getZhuShu : function (ggWay, prize,min) {
                var count = 0, _this = this ,
                    sels =  ((ggWay =="1_1" && !_this.isDGP)? _this.selfOpt_dg :_this.selfOpt),
                    dan = ((ggWay =="1_1" && !_this.isDGP) ? []: _this.selfDan),
                    n = parseInt(ggWay, 10),
                    kill = _this.checkSingleType,
                    isMix = _this.killRepeat,group;

                if(prize){
                    if(ggWay =='1_1'){
                        group = Math.dl(prize[0], [], n);  //计算奖金
                    }else{
                        group = Math.dl(prize[0], prize[1], n);  //计算奖金
                    }
                }else {
                    group = Math.dl(sels, dan, n)
                }
                var  singleGroup = group;
                if (isMix)  singleGroup = $.grep(group, function (h) {//只收集不干掉的
                        return !kill(h);
                });

                if (!min) {
                    $.each(singleGroup, function (i, g) {
                        var zs = Math.myCal(ggWay, g); //([1,2,2], '3串4')
                        count += zs;
                    });
                    return count;
                } else {
                    var ret_prize_arr = [];
                    $.each(singleGroup, function (j, gh) {
                        var zs = Math.myCal(ggWay, gh); //([1,2,2], '3串4')
                        ret_prize_arr.push(zs)
                    });
                    return ret_prize_arr;
                }
            },

            getBonus : function (ggType) {
                    var _this = this ,isdg = false;
                    if (_this.betNum > _this.maxChang) return 0;
                    if (ggType == "1_1" && !_this.isDGP) isdg = true ;
                    var prizes = [], dan_prize = [], min_sp = [], dan_min_sp = [], k,len;
                    for (k=0,len=_this.datas.length;k<len;k++) {
                                var maxVal = [],  minVal = [], nb = _this.datas[k];
                                if(!nb) continue ;
                                var pN = 0, codeNew = [];
                                for (var i in nb) {
                                        var nbs = nb[i];
                                        if(isdg && !nbs.isdg) continue;
                                        if (nb[i]){
                                            var aHC = [];
                                            var sps = $.grep(nb[i].prize,function(n){return n >=0});
                                            for(var j= 0,jl=nbs.prize.length;j<jl;j++){
                                                    var sp = nbs.prize[j];
                                                    if(sp){
                                                        aHC.push(sp+'-'+nbs.type+'-'+nbs.code[j]+'-'+nbs.id);// 格式封装sp值
                                                    }
                                            }
                                            maxVal.push(Math.max.apply(Math,sps) + '-' + nbs.type);// 最大sp值
                                            minVal.push(Math.min.apply(Math,sps) + '-' + nbs.type);// 最小sp值

                                            codeNew.push(aHC);
                                            pN++;
                                        }
                                };

                                if(!maxVal.length || !minVal.length) continue;

                                maxVal = maxVal.sort(function(m,n){
                                    return  parseFloat(n) - parseFloat(m) ;
                                });
                                minVal = minVal.sort(function(m,n){
                                    return  parseFloat(m) - parseFloat(n) ;
                                });

                              //  var cArr = _this.filterCodeArr(codeNew,pN);
                              var cArr = _this.filterCodeTo(codeNew,pN);

                                if(!cArr.length) cArr =[[maxVal[0]],[minVal[0]]] ;

                                if (_this.dan[k]) {
                                    dan_prize.push(cArr[0]);
                                    dan_min_sp.push(cArr[1]);
                                    if(isdg){
                                        prizes.push(cArr[0]);
                                        min_sp.push(cArr[1]);
                                    }
                                }else{
                                    prizes.push(cArr[0]);
                                    min_sp.push(cArr[1]);
                                }
                    }
                    if(isdg) dan_prize = [],dan_min_sp = [] ;
                    var max_prize = _this.getZhuShu(ggType, [prizes, dan_prize]);//把它转换成注数的计算模式
                    var minArr = _this.getMinBonus(ggType, min_sp, dan_min_sp); //最小奖金
                    return [parseFloat(max_prize), minArr];
            },

            filterCodeTo  : function(obj,ggWay){
                    var _this = this ,cArr;
                    cArr = _this.filterCodeArr(obj,ggWay);

                    if(!cArr.length && ggWay > 2){
                            ggWay = ggWay - 1;
                            cArr = _this.filterCodeTo(obj , ggWay);
                    };
                    return cArr ;
            },


            //检查当前组合是否互斥
            filterCodeArr : function(obj,ggWay){
                    var _this = this, nArr= [],
                        n = parseInt(ggWay, 10),
                        a1 = Math.dl(obj,[],n),i,ln;

                    //循环遍历新的组合
                    for(i= 0,ln=a1.length;i<ln;i++){
                            var a2 = a1[i],lm=a2.length;
                            if(!lm) continue;

                            //当组合里面的玩法大于2个玩法的时候
                            if(n>2){
                                var j,nA=[];
                                for(j=0;j<lm;j++){
                                    nA[nA.length] = [a2[j]];
                                }
                                //再进行拆分组合迭代
                                var ar = _this.filterCodeArr(nA,n-1),al = ar.length;
                                //没拆分之前的组合 不互斥，满足条件，存进去
                                if(al && ar[2] == ar[3] ){
                                    nArr.push(a2);
                                }
                            }else{
                                // 检查a2组合是否互斥
                                var fg = _this.checkIsMutex(a2);
                                if(!fg) nArr.push(a2);
                            }
                    }
                    var nl = nArr.length ;
                    if(nl){
                        // 取出所有满足条件，不互斥组合里面，概率最大和最新的一个组合
                        var cA = _this.checkArrMax(nArr),
                            max = cA[0].split('-')[1] -0 ,
                            min = cA[cA.length-1].split('-')[1] -0 ;

                        return [nArr[max],nArr[min],ln,nl];
                    }else{
                        return [] ;
                    }
            },

            checkIsMutex  : function(arr){
                if(arr.length<2) return false ;
                var sfcBall =  ["1-5","1-5","6-10","6-10","11-15","11-15",
                                "16-20","16-20","21-25","21-25","26-26","26-26"];
                var _this = this ,
                    tp = Array.prototype.slice.apply(arr),flag = false ,
                    aa = tp.splice(0,1), as = aa[0].split('-'),mid = as[3];

                //拿出数组组合里面第一个，然后去跟剩下的组合遍历比较是否互斥
                var as2 =as[2] -0, oT = as2 ,os = as[1];
                // 进球数，半全场，比分  改造成符合filterArgs对象里面的key值
                if(os =='jqs' || os =='sfc') oT = oT % 2 ;
                if(os =='bqc') oT = oT % 3 ;
                if(os =='bf') {
                    if(oT <=12) oT = 3 ;
                    if(oT >=13 && oT <=17) oT = 1 ;
                    if(oT >=18 && oT <=30) oT = 0 ;
                }

                var objT = filterArgs[os],codeT = objT[oT];

                var ball = _this.getMatch(mid).comityBall - 0;

                //遍历数组组合里面剩下的元素，去跟之前第一个拿出去的组合进行比较，是否互斥
                for(var j= 0,lm=tp.length;j<lm;j++){
                        if(!tp[j]) continue ;
                        var cd = tp[j].split('-'),
                            cT = codeT[cd[1]],cb = cd[2]-0,nbs ;

                        nbs = ball >= 0 ? cT.z : cT.f ;

                        //如果第一个拿出去的进球数，剩下组合里面有比分
                        if(os =='sfc' && cd[1] =='rfsf'){
                                var nA = [aa[0]] ;
                                nA[nA.length] = tp[j];

                                return _this.checkIsMutex(nA);

                        }else if(os =='rfsf' && cd[1] =='sfc'){
                            //正数
                            if(ball>0){
                                var fB = Math.abs(ball);
                                //让分主负
                                if(oT==0){
                                    // 胜分差主胜
                                    if(cb % 2) flag = true ; // 互斥
                                    else{
                                        // 胜分差客胜
                                        var fs = sfcBall[cb],fsA = fs.split('-');
                                        // 客胜最大值小于ball
                                        if(fsA[1] < fB) flag = true ; // 互斥
                                    }

                                    //让分主胜
                                }else{
                                    // 胜分差主胜
                                    if(cb % 2) flag = false ; // 不互斥
                                    else{
                                        // 胜分差客胜
                                        var fs = sfcBall[cb],fsA = fs.split('-');
                                        // 客胜最小值大于ball
                                        if(fsA[0] > fB) flag = true ; // 互斥
                                    }
                                }

                                //负数
                            }else{
                                var fB = Math.abs(ball);
                                //让分主负
                                if(oT==0){
                                    // 胜分差客胜
                                    if(!(cb % 2)) flag = false ; // 不互斥
                                    else{
                                        // 胜分差主胜
                                        var fs = sfcBall[cb],fsA = fs.split('-');
                                        // 胜分差主胜最小值大于ball
                                        if(fsA[0] > fB) flag = true ; // 互斥
                                    }

                                    //让分主胜
                                }else{
                                    // 胜分差客胜
                                    if(!(cb % 2)) flag = true ; // 互斥
                                    else{
                                        var fs = sfcBall[cb],fsA = fs.split('-');
                                        // 胜分差主胜最大值小于ball
                                        if(fsA[1] < fB) flag = true ; // 互斥
                                    }
                                }
                            }

                            //其他玩法互斥比较
                        }else if($.inArray(cb,nbs) >-1){
                            flag = true ; // 互斥
                            break;
                        }
                }

                return flag ;
            },

            checkArrMax : function(arr){
                    var len = arr.length, i;
                    if(!len) return false ;

                    var aR = [] ;
                    for(i=0;i<len;i++){
                        var j,jA = arr[i],jl=jA.length,sum=0;
                        for(j=0;j<jl;j++){
                            var cd = jA[j].split('-');
                            sum += Number(cd[0]);
                        }
                        aR[i] = sum +'-'+i;
                    }

                    aR = aR.sort(function(a,b){
                        return b.split('-')[0] - a.split('-')[0];
                    })

                    return aR ;
            },

            getMinBonus : function (ggType, sa, dan) {
                var _this = this;
                if (_this.betNum > _this.maxChang) return 0;
                var rb = [], cn = Math.calcuteMN(ggType);
                var d = cn - dan.length, min_bonus = -1;
                /*var ff = function (a, b) {
                    if (parseFloat(a[0]) > parseFloat(b[0])) return 1; else return 0
                };*/
                var ff = function (a, b) {
                            if(parseFloat(a[0]) > parseFloat(b[0])){
                                return 1;
                            }else if(parseFloat(a[0]) == parseFloat(b[0])){
                                return 0;
                            }else{
                                return -1 ;
                            }
                };
                sa.sort(ff);
                $.each(sa, function (j, n) {
                    if (j >= d)  n[0] = n[0].replace(/^[\d\.]+/i, '0')
                })
                var prize_arr = _this.getZhuShu(ggType, [sa, dan], 1);//把它转换成注数的计算模式
                prize_arr.sort(function (a, b) {
                    return a - b
                })
                var len = prize_arr.length;
                for(var i = len -1;i>=0;i--){
                    if (prize_arr[i] == 0) break;
                    if (min_bonus == -1) min_bonus = prize_arr[i];
                    else if (min_bonus > prize_arr[i]) min_bonus = prize_arr[i];
                }

                rb[cn - 1] = (min_bonus == -1) ? 0 : min_bonus;
                return rb;

            },

            zhushuOverflow : function(n){
                if (!this.overflowTip) {
                    $.alert('已经超过了最大注数限制，如需继续投注，可能会降低浏览器的效率。但理论奖金范围将停止计算，如需查看奖金范围，请点击奖金详情链接。');
                    this.overflowTip = true;
                }
            },


            setHideMatch :function(){
                    var trs = $("#dcc").find("tr[rel='0']");
                    var sum = trs.length ;
                    var tr = trs.filter(function(){
                        return  $(this).is(':visible')
                    }),n;
                    n = sum - tr.length ;
                    $("#hideNum").html(n);
                    this.hideNum = n ;
            },


            // 赛事筛选
            filterWin : function () {
                var _this = this ,jT = Dyc.url().type;

                if(_this.lotId !=48 || jT =='jcrxy' ){
                      $(".rangq").hide();
                }

                _this.setMoreFilter();

                $("#fiveMatch").click(function(){
                        var flag = $("#fiveMatch").prop('checked');
                        _this.toggleMatch(flag);
                        _this.setHideMatch();
                });


                $(document).delegate('.a-1','click',function(){
                        $('.yixuan').removeClass('show');
                })


                $(document).delegate('span.remainTime','click',function(){
                        $(this).toggleClass('show');
                })

                $(document).delegate('.yc','click',function(){
                        var t=  $(this).attr('t'),n = $(this).attr('n'),v = $.trim($(this).html());

                        if(v =='隐藏'){
                            $(this).html('展示')
                            $("#hide_box_"+n).find('tr[d='+t+']').isTogglen(0); //[expire=1]
                            $("#hide_box_"+n).find('tr[hd=ht_'+t+']').isTogglen(0);
                        }else{
                            $(this).html('隐藏')
                            $("#hide_box_"+n).find('tr[d='+t+']').isTogglen(1);
                            $("#hide_box_"+n).find('tr[hd=ht_'+t+']').filter(function(){
                                return $(this).find('div.hT-hidden')[0].style.display !='none' ? $(this).isTogglen(1) : '';
                            })
                        }
                        _this.setHideMatch();
                })


                // head栏中选择截期方式
                $('div.slip-f2').delegate('a','click',function(){
                    var tn = $('#timeType').text();
                    var tx = $(this).html();
                    $(this).html(tn);
                    $('#timeType').text(tx);
                    _this.setTimeType(tx,tn);
                })


                $("#filterInfos").delegate('label','click',function(){
                    _this.showHideTr(this);
                    _this.setHideMatch();
                })

                $("#filterInfos").delegate('.xuan','click',function(){
                    var f = $(this).attr('t') - 0;
                    $(".saishi label").each(function(i,m){
                        var b = $(m).find(':checkbox');
                        if(f){
                            b.attr('checked',true)
                        }else{
                            b.attr('checked',!b.attr('checked'))
                        }
                        _this.showHideTr(m)
                    })
                    _this.setHideMatch();

                })

                $('#minSp').click(function(){
                    var f = $(this).prop('checked');
                    _this.toggleSps(f);
                    _this.setHideMatch();
                })

            },

            showHideTr : function(obj){
                var ck = $(obj).find('input');
                var flag = ck.prop('checked') ;
                var v = ck.val(),t = ck.attr('t');

                $("#dcc").find('tr[expire=1]['+t+'="'+v+'"]').isTogglen(flag);

                $("#dcc").find('tr[expire=1][h'+t+'="ht_'+v+'"]').filter(function(){
                    return $(this).find('div.hT-hidden')[0].style.display !='none' ? (flag ? $(this).isTogglen(1):$(this).isTogglen(0)) : $(this).isTogglen(0);
                })
            },

            // 按时间筛选，控制显隐剩余时间、截期时间或比赛时间
            setTimeType :function(x,n){
                var sArr = $("#dcc tr").find('td:eq(2)').find('span');
                $.each(sArr,function(i){
                    var t =  $(sArr[i]).attr('title') ;
                    if(t.indexOf(x) >-1){ $(sArr[i]).isTogglen(1)}
                    if(t.indexOf(n) >-1){ $(sArr[i]).isTogglen(0)}
                })
            },

            fomartFen : function(f){
                var  t =  Math.floor(f/60);
                if(t>=24){
                    var d = Math.floor(t/24);
                    var h = t - (d*24);
                    return  d + '天' + ((h<=0)?1:h) +'时' ;
                }else{
                    var m = f - (t*60),str='';
                    if(t){
                        str = t + '时' + m + '分' ;
                    }else{
                        str = m + '分' ;
                    }
                    return str ;
                }
            },

            setMoreFilter : function(){
                var opts = this.getMatchOptions(),str='',sf = '';
                var aT = ['rq','m','d'];
                var arg = {
                    'rq':{'name':'让分','cls':'rangq'},
                    'm':{'name':'赛事','cls':'saishi'},
                    'd':{'name':'日期','cls':'date'}
                }
                for(var ii= 0,al=aT.length;ii<al;ii++){
                            var i = aT[ii];
                            if(i!='length'){
                                if(i=='m') sf = '<a href="javascript:void(0)" class="xuan" t=0>反选</a><a href="javascript:void(0)" class="xuan" t=1>全选</a>' ;
                                else sf = '';
                                str +='<li id="filter_'+i+'" class="'+arg[i]['cls']+'"><h2>'+sf+arg[i]['name']+'</h2><div>';
                                for(var j= 0,len=opts[i].length;j<len;j++){
                                        if(!opts[i][j]) continue;
                                        var op = (i=='rq') ? Math.abs(opts[i][j]) : opts[i][j] ;
                                        var zk = (i=='rq') ? ((opts[i][j]-0) > 0 ? '客让':'主让') : '' ;
                                        var c = $("#dcc").find('tr['+i+'="'+opts[i][j]+'"]').length ;
                                        var q = (i =='rq') ? '分' : "";
                                        var x = zk +''+op+''+q ;
                                        str += '<label><input type="checkbox" checked  t="'+i+'" value="'+opts[i][j]+'">'+x+'<em>['+c+'场]</em></label>' ;
                                }
                                str += '</div></li>'
                            }
                }
                $("#filterInfos").empty().append(str);
            },

            getMatchOptions : function(){
                var trs = $("#dcc tr");
                var mObj = [],dObj = [],rqObj = [];

                for(var i= 0,len=trs.length;i<len;i++){
                        var d = $(trs[i]).attr('d'),
                            m = $(trs[i]).attr('m'),
                            r = $(trs[i]).attr('rq');
                        if($.inArray(m,mObj) < 0) mObj.push(m);
                        if($.inArray(d,dObj) < 0) dObj.push(d);
                        if($.inArray(r,rqObj) < 0) rqObj.push(r)
                }
                return {'rq':rqObj,'d':dObj,'m':mObj};
            },

            toggleSps : function(f){
                var h = $("#endM :checkbox").prop('checked'),sps ;
                if(h){
                    sps = $("#dcc tr").find('.spArr');
                }else{
                    sps = $("#dcc tr[expire='1']").find('.spArr'); ///[expire='1']
                };

                for(var i= 0,len=sps.length;i<len;i++){
                        var spsArr = $(sps[i]).val().replace(/\-/g,'').split(/[\|\ ]/);
                        var id = $(sps[i]).attr('id').split('_')[1];
                        var flag = Dyc.array.isLess(this.minSp,spsArr);
                        if(f){
                            $("#tr_"+id).isTogglen(flag)
                        }else{
                            $("#tr_"+id).isTogglen(!f)
                        }
                }
            },

            toggleMatch: function(flag){
                var h = $("#endM :checkbox").prop('checked'),trs ;
                if(h){
                    trs = $("#dcc tr");
                }else{
                    trs = $("#dcc tr[expire='1']"); ///[expire='1']
                }

                for(var i= 0,len = trs.length;i<len;i++){
                        var tr = $(trs[i]),
                             ht = tr.attr('ht'),
                             na ;

                        if(!flag && (tr.attr('expire') == '0' && !$("#endM :checkbox").prop('checked'))){
                                tr.isTogglen(0);
                                continue ;
                        }

                        if(ht =='1'){
                            na = $.trim(tr.attr('hm').split('_')[1]);
                        }else{
                            na = $.trim(tr.attr('m'));
                        }
                        var f ;
                        if(flag){
                            f = $.inArray(na,this.fiveMatch) >-1 ? 1 : 0 ;
                        }else{
                            f  = 1 ;
                        }

                        if(ht=='1'){
                            tr.filter(function(){
                                if(tr.find('div.hT-hidden')[0].style.display =='none'){
                                    tr.isTogglen(0)
                                }else{
                                    if(f){
                                        return  tr.isTogglen(1)
                                    }else{
                                        return  tr.isTogglen(0)
                                    }
                                }
                            })
                        }else{
                            tr.isTogglen(f)
                        }
                }
            },

            sysTime : function () {
                var newDate = new Date();
                newDate.setTime(this.sysHM);
                var newTime1 = (newDate.getMonth() + 1) + "月" + newDate.getDate() + "日 " + newDate.toLocaleTimeString();
                $("#sysTime").html(newTime1);
                this.sysHM += 1000;
            },

            // 写入距离结束还有多少分
            setFen : function () {
                var _this = this;
                for (var i in _this.fens) {
                    var fen = _this.fens[i]--;
                    if (fen > 9) {
                        var t = _this.fomartFen(fen);
                        $("#fen_" + i).html('' + t + "");
                    } else if (fen > 0) {
                        var t = _this.fomartFen(fen);
                        $("#fen_" + i).html('' + t + "");
                    } else if (fen <= 0) {
                        _this.stopNum++;
                        $("#fen_" + i).html('0');

                        $("#tr_" + i).attr("expire", "0").attr("class", "endBet");
                        $("#tr_" + i + "_bf").attr("expire", "0").attr("class", "endBet");
                        $("#tr_" + i + " :checkbox").attr("checked",false).attr("disabled",false).unbind();
                        $("#tr_" + i + " .weisai").removeClass("x").removeAttr("x").unbind();
                        $("#tr_" + i + "_bf .weisai").removeClass("x").removeAttr("x").unbind();
                        $("#tr_" + i + " .all").removeClass("x").unbind();
                        delete _this.fens[i];
                        if (_this.betMatchCache[i]) {
                                _this.deleteOne(i);
                                _this.countBox(i);
                        }
                    }
                }
                $("#expireCount").html(_this.stopNum);
            },

            /* 获取sp信息
            getSpInfo : function () {
                var pid,type=Dyc.url().type,lotId = Dyc.url().lotteryId.replace(/[^\d]/g,'');
                if(this.isDG){
                    if(type =='jcmini' && this.lotId =='27'){
                        this.getSpDate(this.isDG,"26_dg");
                        this.getSpDate(this.isDG,"27_dg");
                    }else{
                        pid = this.lotId + "_dg";
                        this.getSpDate(this.isDG,pid);
                    }
                }else{
                    this.getSpDate(0,'26');
                    this.getSpDate(0,'27');
                }
                // if (lotteryId == 46) lotteryId = 27;//一场决胜
            },*/

            getSpDate : function(isDg,pid){
                    var spUrl, _this = this;
                    if(isDg){
                        spUrl = _this.getSpInfoUrl + "?lotteryId=" + pid + "&v=" + J.r();
                    }else{
                        spUrl = "/ssc/json/lqpjpl_" + pid + ".json?v=" + J.r();
                    }
                    pid = pid.replace(/[^\d]/g,'');
                    $.ajax({
                        'url':spUrl,
                        type:'post',
                        data:[],
                        success:function(dt){
                            var obj = dt;
                            if (typeof(dt) == "string")obj = eval("(" + dt + ")");
                            var spArr = obj.spInfo;
                            var spObj = {};
                            if(!spArr || !spArr.length) return false ;
                            for (var i = 0; i < spArr.length; i++) {
                                // spArr[i] {"1":["2.48","3.49","3.27"]}
                                for (var n in spArr[i]) {
                                    spObj[n] = spArr[i][n];
                                    if(!_this.sp[n]) continue;
                                    _this.sp[n][pid] = spObj[n];
                                }
                            }
                            _this.setSp(spObj, pid);//获取sp
                        },error:function(){}
                    })
            },

            // 写入sp信息
            setSp : function (obj, pid) {
                        var _this = this;
                        for (var i in obj) {
                            if (!_this.oldSp) {
                                for (var n = 0; n < obj[i].length; n++) {
                                    $("#td_"+i+"_"+pid+"_"+n).html(obj[i][n]);
                                }
                            } else {
                                for (var n = 0; n < obj[i].length; n++) {
                                    var str = "";
                                    var objN = obj[i][n];
                                    if (objN && _this.oldSp[i]) {
                                        if (objN > _this.oldSp[i][n]) {
                                            str = objN + '<s class="rise"></s>'
                                        } else if (objN < _this.oldSp[i][n]) {
                                            str = objN + '<s class="fall"></s>'
                                        } else {
                                            str = objN + '<s></s>'
                                        }
                                        $("#td_"+i+"_"+pid+"_"+n).html(str);
                                    }
                                }
                            }
                        }
                        _this.oldSp = _this.oldSp || {} ;
                        $.extend(_this.oldSp, obj);
            },

            // 深复制对象
            extend : function (destination, source) {
                for (var p in source) {
                    if (dc.getType(source[p]) == "array" || dc.getType(source[p]) == "object") {
                        destination[p] = dc.getType(source[p]) == "array" ? [] : {};
                        arguments.callee(destination[p], source[p]);
                    } else {
                        destination[p] = source[p];
                    }
                }
            },

            getType : function (o) {
                var _t;
                return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
            },

            empty : function (v) {
                switch (typeof v) {
                    case "undefined":
                        return true;
                    case "string":
                        if (v.trim().length == 0) {
                            return true;
                        }
                        break;
                    case "boolean":
                        if (!v) {
                            return true;
                        }
                        break;
                    case "number":
                        if (0 === v) {
                            return true;
                        }
                        break;
                    case "object":
                        if (null === v) {
                            return true;
                        }
                        if (undefined !== v.length && v.length == 0) {
                            return true;
                        }
                        for (var k in v) {
                            return false;
                        }
                        return true;
                        break;
                }
                return false;
            },

            // 加载状态框
            initPopupBox : function () {
                var lodbg = new Image(), lodclass = "";
                if (location.hostname.indexOf('zgzcw.com') > -1) {
                    lodbg.src = "/style/images/login_banzc.jpg";
                    lodclass = ' popupzc';
                } else lodbg.src = "/style/images/login_ban.jpg";
                $("#bgLogin").after('<div id="loadingBox" class="loadingBox"><p>信息提示</p><div class="popup_ban' + lodclass + '"><a href="javascript:void(0)" class="popup_cancel"></a></div>' + '<div class="popup_con"><div class="popupbg_ld" id="popupDes">对不起，您输入的信息有误，请重新输入！</div>' + '<span class="popup_button"><button hidefocus=”true” class="popup_queding">确  定</button></span></div>');
                $('#loadingBox .popup_cancel').bind('click', function () {
                    $('#popupDes').removeClass();
                    $("#loadingBox").add("#bgPay").hide();
                })
            },

            // 状态框设置
            setPopupBox : function (str, type, callback) {
                    $("#loadingBox").add("#bgPay").show();
                    var des = $('#popupDes').html(str).removeClass();
                    if (type == "loading") {
                        des.addClass('popupbg_ld');
                        des.next('span').hide();
                        $('.popup_cancel').hide();
                        return;
                    } else if (type == "error") {
                        des.addClass('popupbg_er');
                    } else if (type == "prompt") {
                        des.addClass('popupbg_po');
                    } else if (type == "ok") {
                        des.addClass('popupbg_ok');
                    }
                    $('.popup_cancel').show();
                    var btnSpan = des.next('span').show();
                    btnSpan.children("button").unbind().bind('click', function () {
                        $('#popupDes').removeClass();
                        $("#loadingBox").add("#bgPay").hide();
                    })
                    if (callback) {
                        btnSpan.children("button").click(function () {
                            callback.call($(this));
                        })
                    }
            },

            toggleGgArea : function(f){
                var _this = this;
                if(!!f && _this.ggIsOut) return;
                if (_this.ggIsOut) {
                    _this.ggIsOut = false;
                    $('#ggIcon').removeClass('gcfc_icon_h');
                    $('#ggMain').slideUp(300);
                } else {
                    _this.ggIsOut = true;
                    $('#ggIcon').addClass('gcfc_icon_h');
                    $('#ggMain').slideDown(300);
                }
            },

            // 随机数
            random: function( m,n ){
                return Math.floor( Math.random() * ( n || 9999 ) + ( m || 1 ) );
            }
}



$().ready(function () {
    window.dc = new Sportery(playId).init();
    dc.jiezhi = (function (lotId) {
        var stat = $.trim($.ajax({url:"/lottery/checkLottery.action?lotteryId=" + lotId, async:false }).responseText);
        var cov = '<div class="cover"></div>';
        if (stat == "true")return false;
        /*$("body").append(cov);
        $("#submitCaseBtn").css("background", "url(/style/img/lot_buy_gray.gif) no-repeat");
        $(".wytc").css("display","block");
        $(".cover").css("display","block");
        $("#clock").click(function(){
            $(".wytc").hide();
            $(".cover").remove();
        });*/
        // jTool.stopHandle();
        return false;
    })(200)
});


