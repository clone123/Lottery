/**
 * Created with IntelliJ IDEA.
 * User: clone
 * QQ: 351354135
 * Date: 14-3-11
 * Time: 上午11:54
 * To change this template use File | Settings | File Templates.
 */

function Sportery() {
        this.args = {
                    //胜负06
                    26:{numType:[0,1],numName:["主负","主胜"],newId:"200",id:["200","06","01"],maxNum:8},
                    //让分胜负07
                    27:{numType:[0,1],numName:["让分主负","让分主胜"],newId:"200",id:["200","07","01"],maxNum:8},

                    //胜负差08
                    28:{numType:[0,1,2,3,4,5,6,7,8,9,10,11],
                        numName:["客胜1-5","主胜1-5","客胜6-10","主胜6-10","客胜11-15",
                                 "主胜11-15","客胜16-20","主胜16-20","客胜21-25","主胜21-25","客胜26+","主胜26+"],
                        newId:"200",id:["200","08","01"],maxNum:4},
                    //大小分09
                    29:{numType:[0,1],numName:["大","小"],newId:"200",id:["200","09","01"],maxNum:8},

                    48:{numType:[0,1],numName:["主负","主胜"],newId:"200",id:["200","08","01"],maxNum:8}
        };

        this.weekTips  = {
                0:{s:'9:00',e:'23:59:59',t:1*1000*60*60 + 1000},
                1:{s:'9:00',e:'23:59:59',t:1000},
                2:{s:'9:00',e:'23:59:59',t:1000},
                3:{s:'7:30',e:'23:59:59',t:1000},
                4:{s:'7:30',e:'23:59:59',t:1000},
                5:{s:'9:00',e:'23:59:59',t:1000},
                6:{s:'9:00',e:'23:59:59',t:1*1000*60*60 + 1000}
        };

        this.playTypes = {'26': 'sf', '27':'rfsf','28': 'sfc', '29': 'dx'};
        this.typePosition = ['26','27','28','29'];
        this.ggMode = {"Single":["\u5355\u5173", "2\u4e321", "3\u4e321", "4\u4e321", "5\u4e321", "6\u4e321", "7\u4e321", "8\u4e321"], "Many":{1:[], 2:[], 3:["3\u4e323", "3\u4e324"], 4:["4\u4e324", "4\u4e325", "4\u4e326", "4\u4e3211"], 5:["5\u4e325", "5\u4e326", "5\u4e3210", "5\u4e3216", "5\u4e3220", "5\u4e3226"], 6:["6\u4e326", "6\u4e327", "6\u4e3215", "6\u4e3220", "6\u4e3222", "6\u4e3235", "6\u4e3242", "6\u4e3250", "6\u4e3257"], 7:["7\u4e327", "7\u4e328", "7\u4e3221", "7\u4e3235", "7\u4e32120"], 8:["8\u4e328", "8\u4e329", "8\u4e3228", "8\u4e3256", "8\u4e3270", "8\u4e32247"]}};

       // this.Op = new OpAfirm().init();

        this.fiveMatch = ['NBA'];
        this.isHis = isHis ? 0 : 1 ;
        this.bfFirstTr = $("#dcc").find("tr[expire='"+this.isHis+"']").first().find('span.openUp');
        this.lotName = {
            '胜负/让分':{lotId:48,playId:'05',type:'jcmini',url:'/lottery/jchtplayvsForJsp.action'},
         //   '胜负':{lotId:26,playId:'06',type:'',url:'/lottery/jcplayvsForJsp.action'},
        //    '让分胜负':{lotId:27,playId:'07',type:'',url:'/lottery/jcplayvsForJsp.action'},
            '胜分差':{lotId:28,playId:'08',type:'',url:'/lottery/jcplayvsForJsp.action'},
            '大小分':{lotId:29,playId:'09',type:'',url:'/lottery/jcplayvsForJsp.action'},
            '混合过关':{lotId:48,playId:'01',type:'',url:'/lottery/jchtplayvsForJsp.action'}
        }

        this.init = function (lotid) {
                this.ie = jQuery.browser.msie ? parseInt(jQuery.browser.version,10) : 0;
                this.lotId = lotid ;//lotid ==48 ? 26 : lotid;
                this.isDG = isDG === true;
                this.jcT = 0;
                this.isHm = 1 ; //默认代购
                this.isMix = true;
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
                this.matchKinds = [];
                this.matchEvents = {};//赛事
                this.showPrizeTip = true;
                this.isStop = false;

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
                this.getSpInfoUrl = "/lottery/jcplaysp.action";
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
                this.iniLotMenu();
                this.initDcInfo();
                this.initHandle();//初始化定时器
                this.restoreData();//返回修改方案

        };
        this.iniLotMenu = function(){
            var lot = Dyc.url().lotteryId.replace(/[^\d]/g,'') ,type = Dyc.url().type;
            var strHtml = '',flag  = true ;
            for(var i in this.lotName){
                if(i!='length'){
                    if(this.lotName[i]['lotId']== lot && flag){
                        $('#lotName').text('混合过关');
                        flag = false ;
                    }else{
                        if(i=='混合过关') strHtml += '<a href="javascript:void(0);"  onclick="return false;">胜负/让分</a>' ;
                        else strHtml += '<a href="javascript:void(0);"  onclick="return false;">'+i+'</a>' ;
                    }
                }
            }
            $("#lotMenu p").empty().html(strHtml)

        };

        this.setLotUrl = function(n){
            var ln = this.lotName[n],lotId = ln.lotId,type=ln.type,url = ln.url;
            var urlStr = '';
            if(lotId =='48'){
                var rl ;
                if(n =='混合过关'){
                    urlStr += url + '?lotteryId=' + lotId  ;
                }else{
                    if(isDG) lotId = 22 + '_dg';
                    urlStr += url + '?lotteryId=' + lotId + '&type='+type ;
                }
            }else{
                if(isDG) lotId = lotId + '_dg';
                urlStr += url + '?lotteryId=' + lotId ;
            }

            window.location.href = urlStr ;
        };

        this.initDcInfo = function () {//初始化数据
            $("#hideNum").html(0);
            this.multipleObj.val(this.bei);//倍数清0
            if(this.isDG)  {
                this.minMacthNum = 1;
                this.maxModeLimite = 1;
            }else{
                if (this.lotId == "28") this.maxModeLimite = 4;
               // else if (this.lotId == "24") this.maxModeLimite = 6;
            }
            var responseData = eval('(' + $("#responseJson").text() + ')');
            this.baseRoot = responseData.baseRoot;
            this.sumMatch = responseData.sumMatch;
            this.queryTime = responseData.issue;
            this.isHistory = responseData.isHistory;
            $("#hideNum,#endAll").html(responseData.hideMatch);
            var rightBox = '', footBox = '', arr;
            if (!this.isHistory) {
                this.stopNum = responseData.hideMatch;
                arr = $("#dcc tr[expire]");
            } else {
                this.stopNum = 0;
                arr = $("#dcc tr[expire='0']");
            }
            $("#hideNum").html(this.hideNum = this.stopNum);
            for (var i = 0, l = arr.length; i < l; i++) {

                var tr = $(arr[i]);

                var spArr = [], b = {};
                var tid = tr.attr("id").split("_");
                var matchId  =  tid[1];

                if(this.nos[matchId]) continue;
                this.sp[matchId] = {};

                this.getBetSp(matchId);

                footBox += '<tr id="foot_' + matchId + '"></tr>';

                var matchNo = tr.find("td:eq(0)").text();
                this.nos[matchId] = matchNo;

                var isStop = false;
                if (tr.attr("expire") == 1)this.fens[matchId] = parseInt(tr.find("td:eq(2) span:first").text(), 10);
                else isStop = true;
                b["matchId"] = matchId;
                b["comityBall"] =  tr.attr("rq");
                b["zf"] =  tr.attr("zf");
                b["endTime"] = tr.attr("t"), b["playid"] = tr.attr("playid");
                b["matchNo"] = matchNo;

                b["matchHome"] = tr.find("td:eq(3)").find('a:last').text();
                b["matchGuest"] = tr.find("td:eq(5)").find('a:last').text();

                //    b["matchHome"] = tr.children(":eq(3)").find('a:last').text(), b["matchGuest"] = tr.children(":eq(" + (this.lotId == 22 || this.lotId == 47 || this.lotId == 46 ? 5 : 5) + ")").find('a:last').text();
                b["isStop"] = isStop;
                this.matchInfo.push(b);
            }
            //     $("#rightBox").html(rightBox);
            $("#footBox").html(footBox);
            var systemTime = responseData.systemTime;
            var sysArr = systemTime.split(" ");
            var sysArr1 = sysArr[0].split("-");
            var sysArr2 = sysArr[1].split(":");
            this.sysHM = new Date(sysArr1[0], (parseFloat(sysArr1[1]) - 1), sysArr1[2], sysArr2[0], sysArr2[1], sysArr2[2]).getTime();
            this.initPopupBox();
        };

        this.initHandle = function () {//初始化
            this.filterWin();//写入筛选
            this.bindEvent();//绑定事件
            this.getSpData("lqpjpl1_3");
            /*         clearInterval(this.sysTimeInterval);
             this.sysTimeInterval = setInterval("dc.sysTime()", 1000);//系统时间写入
             if (this.isHistory) return;
             this.getSpInfo();//定时更新sp*/
            this.setFen();//比赛倒计时
            clearTimeout(this.fenInterval);
            this.fenInterval = setInterval("dc.setFen()", 60000);//写入距离结期时间
            /*    clearInterval(this.spInterval);
             if (this.lotId != "23") {
             if (this.lotId == "22" || this.lotId == "46") this.spInterval = setInterval("dc.getSpInfo()", 2 * 60000);//写入sp
             else this.spInterval = setInterval("dc.getSpInfo()", 5 * 60000);
             }*/
        };



        this.restoreData = function () {  //返回修改方案
            var store = J.cookie("Dyc_lotteryData");
            if (!store)return;
            J.cookie('Dyc_lotteryData',null, {expire: -1, path: '/'});
            store = decodeURIComponent(store);
            var arrInfo = store.split("|");
            var arr = arrInfo[0].split("^");
            this.itemTotal = arr[4];
            var tzArr = arr[3].split("/");
            var storeNb = {},danArr = [];
            if (typeof(arr[11]) != "undefined" && arr[11] && arr[11] != "0") danArr = arr[11].split(',');
            this.betNum = 0;
            this.bei = parseInt(arr[5], 10);
            this.sum = arr[6];
            var lottery_obj = {'06': '26', '07':'27','08': '28', '09': '29'};
            var _this = this ;
            for (var i = 0; i < tzArr.length; i++) {// 39050:  周一001~01:  [平]
                var nArr = tzArr[i].split(":"), matchId = nArr[0];
                if (nArr.length == 2) nArr.unshift("");
                var tr = $('#tr_' + matchId), inx = +tr.attr('i');
                storeNb[matchId] = {};
                this.betPlayTypes[inx] = [];
                !this.betMatchCache[matchId] && (this.betMatchCache[matchId] = inx.toString());
                //  this.getBetSp(matchId, null, 1);

                var nameArr = tzArr[i].split('~')[1].split('-');
                for (var j = 0, jl = nameArr.length; j < jl; j++) {
                    var pids = nameArr[j].split(':[') , inxArr = [];
                    var pid = lottery_obj[pids[0]], argx = this.args[pid];
                    storeNb[matchId][pid] = {};
                    storeNb[matchId][pid]['numType'] = argx.numType.length;

                    var res = (/\[(.*)\]/g).exec(nameArr[j]);
                    var bb = res.length > 1 ? res[1].split(',') : [];
                    for(var k = 0,len = bb.length;k<len;k++){
                        var name = (this.jcT =='jcrxy' ? argx.numName2 : argx.numName)
                        var no = $.inArray(bb[k].replace(/\*/g,'-'),name);
                        inxArr.push(no);
                        this.getBetData(inx, pid, matchId, no, 1);
                        this.resToggleHt(matchId);
                        this.getMinModeLimite();
                    }
                    storeNb[matchId][pid]['ball'] = inxArr;
                }
                if (jQuery.inArray(matchId, danArr) > -1) {
                    this.dan[inx] = matchId;
                    this.danCount++;
                }

            }
            if (!this.betNum) this.betNum = tzArr.length;
            this.chuan = arr[2].replace(/x/ig, '串').split(',');
            this.multipleObj.val(this.bei);//倍数清0
            for (var i in storeNb) {
                if (i != "length") {
                    var a = storeNb[i];
                    for(var j in a){
                        if(j !='length'){
                            var  pid = j, sz = a[j]['numType'], nb = a[j]['ball'] ;
                            $.each(nb, function (j, o) {
                                $('#td_' + i + '_' + pid + '_' + o).addClass('x').attr("x", "1");
                            })
                            if (pid == 28) {
                                $.each([1, 2, 3], function (k, no) {
                                    var all_obj = $('#' + [no + 'all', i , pid].join('_')), l = all_obj.prevAll('.x').length;
                                    if (l == (no == 2 ? 5 : 13)) all_obj.addClass('x').children(':checkbox').attr('checked', 1);
                                })
                            } else if (nb.length == sz) $('#all' + '_' + i + '_' + pid).addClass('x').children(':checkbox').attr('checked', 1);
                            this.setFootWin(i);
                        }
                    }
                }
            }
            this.showChuanFn((this.betNum > 8 ? 8 : this.betNum));
            var minB = 20, minC = 1;
            $.each(this.chuan, function (j, o) {
                var a = o.indexOf('\u4e32') > -1 ? o.split('\u4e32') : [1, 1], b = a[0], c = a[1];
                if (minB > b) minB = +b;
                if (minC < c) minC = +c;
                $("#chuans :checkbox[value='" + o + "']").attr("checked",true);
            })
            this.minChuan = minB == 20 ? 0 : minB;
            this.minChuanNum = minC;
            $.each(danArr, function (j, o) {
                $("#fd_" + o).add("#cd_" + o).attr("checked", 1);
            })
            if ($('#chuanOths :checked').length > 0) {
                $('#guoguanManyInput').attr('checked', 1);
                $('#guoguanMany').addClass('show')
            }
            this.danAndChuan();
            this.countItems();
            /*        if (this.betNum == 0) $("#qrfaManu").attr("disabled", 1).removeClass("qrfa_manu");
             else if (this.betNum > 0)$("#qrfaManu").attr("disabled", 0).addClass("qrfa_manu");*/
            if (this.bei > 1)$("#doubleDown").attr("class", "jian_manu");
            if (this.bei >= this.maxBei) $("#doubleUp").attr("class", "jia_manu_d");
        };

        this.bindEvent = function () {
            var _this = this ;

            // SP值
            $(".pjopBtn, .paixvBtn").hover(function(){
                $(this).addClass("show");
            },function(){
                $(this).removeClass("show");
            })

            $("#opData9 input[type='radio']").click(function(){
                var sSp = $(this).val();
                $("#comp8").text($(this).attr("tip").replace(/(让分|总分)+/, ""));

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

            // 条件排序
            $("#px8 a").live("click", function(){
                var tName = $(this).attr('rel'),
                    cls = $(this).find('em').attr('class');

                $(".paixvBtn").find('a').find('em').removeClass('cur');
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
                  //  console.log(tabArr);
                    var trs = $(tabArr[i]).find("tr") ;
                    var trsNew = trs.sort(function(a, b){
                        var spsA , spsB;
                        if(tName == '场次号'){
                            spsA = Number($(a).find('td:eq(0) i').text()) || 0;
                            spsB = Number($(b).find('td:eq(0) i').text()) || 0;
                        }
                        else if(tName == '最小赔率'){
                            var spA = $(a).find('td:eq('+c+') span');
                            var spB = $(b).find('td:eq('+c+') span');
                            spsA = Math.min.call(Math, $(spA[0]).text(),$(spA[1]).text(),$(spA[2]).text()) || 0;
                            spsB = Math.min.call(Math, $(spB[0]).text(),$(spB[1]).text(),$(spB[2]).text()) || 0;
                        }
                        else if(tName === '主客差值' || tName === "大小差值"){
                            var spA = $(a).find('td:eq('+c+') span');
                            var spB = $(b).find('td:eq('+c+') span');
                            spsA = Math.abs($(spA[0]).text()- $(spA[2]).text()) || 0;
                            spsB = Math.abs($(spB[0]).text()- $(spB[2]).text()) || 0;
                        }
                        else{
                       //     console.log('$($(a).find(td:eq('+ c +') span)['+ d + ']).text() || 0');
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

            $("#dcc").delegate('.weisai','click',function(){
                if ($(this).attr("expire") == 0)alert("当前期次不允许投注已截止的比赛场次！");
                var id = $(this).attr("id");
                var o = id.split('_');
                if(!$("#t_"+o[1]).data('p')){
                    var obj = $("#t_"+o[1]);
                    _this.toggleHt(obj);
                    $("#t_"+o[1]).data('p',1)
                }
                _this.clickEvent(id, 1);
                _this.flyEffect(this)
            })
            $(document).delegate('span.openUp','click',function(){
                var obj = $(this);
                _this.toggleHt(obj);
            })

            if(this.lotId ==48){
                if(_this.bfFirstTr.length){
                    _this.toggleHt(_this.bfFirstTr)
                    _this.bfFirstTr.data('p',1)
                }
            }

            $("#menuNav").delegate('li','click',function(){
                var t = $(this).attr('t');
                if(t=='hm'){
                    window.location.href = '/lottery/jclqNew/project.jsp?lotteryId=203&playId=1';
                }
            })

            $("#lotMenu").delegate('a','click',function(){
                var oldN = $("#lotName").text();
                var newN = $(this).html();
                $("#lotName").text(newN);
                $(this).html(oldN)
                if(newN =='混合过关'){
                    window.location.href  = '/lottery/jchtplayvsForJsp.action?lotteryId=48'
                }else{
                    _this.setLotUrl(newN);
                }
            });

            $(document).delegate('.tzWf','hover',function(){
                $(this).toggleClass('show');
            })

            $(document).delegate('#huifu','click',function(){
                $("#dcc").find("tr[expire='0']").hide();
                if(_this.lotId !=48){
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

                _this.setHideMatch()

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


            $("#dcc .all").mousedown(function () {
                var id = $(this).attr("id");
                _this.allClickEvent(id);
            })

            $(document).delegate('a.quanBf','click',function(){
                var id = this.id;
                if (_this.betNum == _this.maxChang && !_this.betMatchCache[id.split("_")[1]] ){
                    $.alert("对不起，最多能选择" + _this.maxChang + "场比赛")
                }else{
                    _this.allClickEventBf($(this), 2);
                }
            })


            $("#dcc .ah").click(function () {
                var id = $(this).attr("id");
                _this.delTrNb(id);
                //  _this.countBox(id);
            })

            $("#dcc").delegate('.weisai','mouseenter',function(){
                if (!$(this).attr("x"))$(this).addClass("h");
            })

            $("#dcc").delegate('.weisai','mouseleave',function(){
                if (!$(this).attr("x"))$(this).removeClass("h");
            })

            /*        $("#dcc .weisai").hover(function () {
             if (!$(this).attr("x"))$(this).addClass("h");
             },function () {
             if (!$(this).attr("x"))$(this).removeClass("h");
             })*/

            $("#dcc tr").hover(function(){
                var id = $(this).attr('id'),
                    ids = id.split('_');

                $(this).addClass('tr-hover')
                if(id.indexOf('ht')>-1){
                    $("#"+ids[0]+"_"+ids[1]).addClass('tr-hover');
                }else{
                    $("#"+ids[0]+"_"+ids[1]+"_ht").addClass('tr-hover');
                }
            },function(){
                var id = $(this).attr('id'),
                    ids = id.split('_');

                $(this).removeClass('tr-hover')
                if(id.indexOf('ht')>-1){
                    $("#"+ids[0]+"_"+ids[1]).removeClass('tr-hover');
                }else{
                    $("#"+ids[0]+"_"+ids[1]+"_ht").removeClass('tr-hover');
                }
            })

            $(document).delegate('.inputClear','click',function(){
                var ids = this.id.split('_');
                _this.delTrNb1(this.id);
                _this.countBox(ids[1]);
            })

            $(document).delegate('body','selectstart',function(){
                return false ;
            })

            $(document).delegate('.spfBtn','hover',function(){
                $(this).toggleClass('show')
            })

            $("#selectMatch").click(function(){
                var flag = $(this).prop('checked');
                _this.hideShowMatch(flag);
            })

            $("#ballFly").click(function(){
                $(".yixuan").toggleClass('show');
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

            $("#selectissue").change(function () {
                var path = location.pathname;
                var lotId = Dyc.url().lotteryId;
                var type = Dyc.url().type;

                location.href = "/lottery/jchtplayvsForJsp.action?lotteryId=" + lotId + "&issue=" + $(this).val();
                return false;
            })

            $("#oyx").bind('mouseenter',function(){
                $(this).addClass('c-hover')
            })

            $("#oyx").bind('mouseleave',function(){
                $(this).removeClass('c-hover')
            })

            $("#oyx :radio").unbind().bind('click',function(){
                var val,rl = window.parent.location.href,domain='';
                if(rl.indexOf('zgzcw.com') > -1){
                    domain = 'zgzcw.com';
                }else{
                    domain = 'diyicai.com';
                }
                if($(this).hasClass('o-old')){
                    $("input.o-old").attr('checked',true);
                    $("input.o-new").attr('checked',false);
                    val = '2'
                }else{
                    $("input.o-old").attr('checked',false);
                    $("input.o-new").attr('checked',true);
                    val = '1'
                }
                jQuery.cookie("oyx-type",val,{expires:365,path:domain});
            })

            if (this.ie == 6) {
                $("#dcc .show").mouseover(function () {
                    $(this).find("span").hide();
                })
                $("#dcc .show").mouseout(function () {
                    $(this).find("span").show();
                })
                $('.em_2').hover(function () {
                    $(this).find('span').show();
                }, function () {
                    $(this).find('span').hide();
                })
                this.ggOut = false;
            } else if (this.ie == 0 || this.ie >= 7) {
                $('#gcfc_lab').click(function () {
                    if (this.checked)dc.ggOut = true;
                    else dc.ggOut = false;
                    setTimeout(function () {
                        $('#ggIcon').next().removeClass('gcfc_top').fadeOut(100);
                    }, 200)
                })
                $('#ggIcon').click(function () {
                    dc.toggleGgArea();
                }).parent().hover(function () {
                        $('#ggIcon').next().show().addClass('gcfc_top');
                    }, function () {
                        $('#ggIcon').next().hide().removeClass('gcfc_top');
                    })

            }
            $("#resetInfo, #clearListBtn").click(function () {
                if (confirm('是否确认清空选号信息?')) {
                    dc.resetInfo();
                }
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
            $(".hide_next").toggle(function () {
                var id = $(this).attr("id").split("_")[1];
                $("#hide1_" + id).attr("src", "../../style/img/lot_jiaa.gif")
                $("#hide2_" + id).attr("src", "../../style/img/lot_zk.gif")
                $("#hide_box_" + id).children("tr:not(.hide)").hide();
                $("td.sp_kg").removeClass("sp_kg1").html("<span>展开sp值</span>").removeAttr('s');
            }, function () {
                var id = $(this).attr("id").split("_")[1];
                $("#hide1_" + id).attr("src", "../../style/img/lot_jian.gif")
                $("#hide2_" + id).attr("src", "../../style/img/lot_sq.gif")
                $("#hide_box_" + id).children("tr[xq]:not(.hide)").show();
                var sp_kg = $("#hide_tr_" + id).next().find(".sp_kg");
                sp_kg.parent().next().show();
                sp_kg.addClass("sp_kg1").html("<span>收起sp值</span>").removeAttr('s');
            })

            /*        if (dc.isHistory)$("a.time_switch div").hide();
             else $("a.time_switch").click(function () {
             var $a = $('a.time_switch');
             if ($a.attr('m') != 1) {
             var str = '比赛<p>时间</p>';
             $a.html(dc.lotId == 23 ? '比赛时间' : str).attr('m', 1);
             $('#dcc span.endtime').hide();
             $('#dcc span.matchtime').show();
             } else {
             var str = '停售<p>时间</p>';
             $a.html(dc.lotId == 23 ? '停售时间' : str).attr('m', 0);
             $('#dcc span.endtime').show();
             $('#dcc span.matchtime').hide();
             }
             return false;
             })*/

            $("a.odds_switch").click(function () {
                var $a = $('a.odds_switch');
                if ($a.attr('m') != 1) {
                    $a.html('亚&nbsp;&nbsp;&nbsp;盘').attr('m', 1);
                    $('#dcc span.odds_d').hide();
                    $('#dcc span.yapan_d').show();
                } else {
                    $a.html('平均欧赔').attr('m', 0);
                    $('#dcc span.odds_d').show();
                    $('#dcc span.yapan_d').hide();
                }
                return false;
            })

            //跳转到奖金详情
            $("#winMore").click(function () {
                //  return false ;
                if (dc.betNum < 1) {
                    return !!alert("请选择投注场次！");
                } else if (!dc.chuan.length) {
                    return !!alert("请选择过关方式！");
                } else {
                    var winmoreData = dc.getWinMoreMix();
                    var url = "/lottery/jclqNew/winmore_mix.jsp?value=";
                    $("#winmoreData").text(winmoreData);
                    $("#winmoreForm").attr("action", url + encodeURIComponent(winmoreData)).submit();
                }
            });

            //跳转到奖金优化
            $("#prFilter").click(function () {
                var flag = dc.checkChuan(dc.chuan);
                if(flag) return alert(flag);
                if(dc.itemTotal >2000){ return alert('您好，投注注数大于2000的不支持奖金优化功能')}
                var info = dc.getBuyInfo();
                if (info) {
                    dc.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
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

            $(".freeSave").click(function () {
                var lotteryData = dc.createBetInfo();
                if (!lotteryData) return false;
                dc.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                a(lotteryData)
                var saveurl = '/lottery/savelottery.action';
                $.post(saveurl, {lotteryData:lotteryData, r:J.r()}, function (result) {
                    a(result)
                    var arr = eval('(' + result + ')');
                    if (arr.result == '0000') {
                        dc.setPopupBox('方案保存成功！  <a href="/uc/betmanage/betprosave.action" target="_blank">查看已保存的方案列表</a>', 'ok');
                    } else if (arr.result == "1") {
                        dc.setPopupBox('保存失败，用户未登录，请点击确定登录。', 'prompt', function () {
                            showLoginDiv('/lottery/common/login.jsp');
                        });
                    } else {
                        dc.setPopupBox('方案保存失败，请稍后重试！', 'error');
                    }
                })
                return false;
            })

            $('#onlineFilter').click(function () {
                if (!dc.betNum) {
                    return !!alert("请选择投注场次！");
                }
                else if (dc.betNum <= 1) {
                    return !!alert("请至少选择投注两场比赛进行过滤！");
                }
                if (dc.chuan.length > 1) {
                    return !!alert('只能选择一个格式为【X串1】的过关方式！');
                }
                else {
                    var chuan = dc.chuan[0];
                    if (dc.chuan.length == 1 && parseInt(chuan.split('串')[1]) > 1) {
                        if (!confirm('你选择的过关方式不是【X串1】格式的，过滤时系统将自动转换为【X串1】，是否继续过滤？')) {
                            return false;
                        }
                    }
                    var url = dc.baseRoot + "filter.jsp?v=" + J.r();
                    var filterData = dc.getFilterData();
                    $("#winmoreData").text(filterData);
                    $("#winmoreForm").attr("action", url).submit();
                }
                return false;
            })

            $("#affirmBuy").click(function () {
                if (dc.jiezhi) {
                    $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                    return;
                }
                if(!_this.checkIsWeekTip()){
                    var str = '因出票时间不同,方案场次让球，让分，预设总分，SP等有可能会发生变化，' +
                        '您此次发起的方案将在官方开售时进行出票，实际奖金以最终出票为准。<br>' +
                        '<b class="red">提醒</b>：竞彩篮球官方销售时间：周一、二、五 9:00-24:00｜周三、四 07:30 - 24:00｜周六、日 9:00 - 次日01:00。';
                    $.confirm(str,function(){
                        dc.affirmBuy();
                    })
                }else{
                    dc.affirmBuy();
                }
               // dc.affirmBuy();
            })

            $("#cooperateBuy").click(function () {
                if (dc.jiezhi) {
                    $.alert("竞彩足球已经停售！\n请选择其它彩种投注！");
                    return;
                }
                if(!_this.checkIsWeekTip()){
                    var str = '因出票时间不同,方案场次让球，让分，预设总分，SP等有可能会发生变化，' +
                        '您此次发起的方案将在官方开售时进行出票，实际奖金以最终出票为准。<br>' +
                        '<b class="red">提醒</b>：竞彩篮球官方销售时间：周一、二、五 9:00-24:00｜周三、四 07:30 - 24:00｜周六、日 9:00 - 次日01:00。';
                    $.confirm(str,function(){
                        dc.cooperateBuy();
                    })
                }else{
                    dc.cooperateBuy();
                }
               // dc.cooperateBuy();
            })


            $(document).delegate('a.zlc','click',function(){
                    _this.checkPlayId(this)
            })

            $(document).delegate('a.sj','click',function(){
                    _this.openOYX(this)
            })

        };

        this.checkPlayId = function(obj){
                var _t = this ;
                $.confirm('您好，您将要打开的数据页面中，主客场位置与现在投注页相反，投注时请确认主客队位置，一旦提交，我们将按照您的所选选项执行。',function(event){
                     _t.openOYX(obj);
                })
        };
        this.openOYX = function(obj){
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
        };

        this.checkIsWeekTip = function(){
                var _this = this, date = new Date() ,
                    ymd = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate(), //date.toLocaleDateString(),
                    d = date.getDay(),
                    tip = _this.weekTips[d];

                var s = new Date(ymd + ' ' + tip.s).getTime(),
                    e = new Date(ymd + ' ' + tip.e).getTime() + tip.t,
                    wk = new Date(ymd + ' 01:00').getTime(),
                    nowTime = new Date().getTime();

                if((d==0||d==1) && nowTime < wk){     // 每天正常出票时间内
                    return  true ;
                }else if(s < nowTime && nowTime < e){   // 周六,日到次日 01:00 内
                    return true ;
                }else{
                    return false ;
                }
        };

        // 获取SP值
        this.getSpData = function(sVal){
            var spUrl = "/ssc/json/lqpjpl/" + sVal + ".json?v=" + this.random(),
                sHtml = "";

                $.ajax({
                    url:spUrl,
                    type:'post',
                    dataType:'json',
                    success:function(reg){
                        var spData =  reg ;
                        $.each(spData, function(key, v){
                            sHtml = "<span>"+ v.v3 +"</span><span class=\"mid\">"+ v.v2 +"</span><span>"+ v.v1 +"</span>"
                            $("#sp_"+ key).html(sHtml);
                        })
                    },error:function(r){}
                })
        },

        //只看已选择场次
        this.hideShowMatch = function(flag){
            var _this = this ;
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
        }

        this.checkChuan = function(chuan){
            var len = chuan.length;
            var obj ={
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
        };

        this.resetInfo = function () { //清空所有已选场次
            this.deleteAll();
            this.datas = [];//选择号码
            this.betMatchCache = {};
            this.selfDan = [];
            this.selfOpt = [];
            this.betNum = 0;
            this.betPlayTypes = [];
            this.betPlayTypesBase = {};
            this.chuan = [];//串信息
            this.dan = [];//胆信息
            this.sum = 0;//总金额
            this.bei = 1;//倍数
            $("#dcc").find('div.bifen-area').html("");
            $("#footBox tr").html("");
            $("#dcc .weisai").removeClass('x h').removeAttr('x');
            //     $("#dcc .a>:checked").attr("checked", false);
            this.countBox(1);
        };
        this.getDgpData = function () { //获取单关配数据
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
        };


        this.getGroup = function (pid, mid) {
            return {
                id: mid,
                type: this.playTypes[pid],
                code: [],//选号
                prize: [],//奖金
                bets:0,
                name:[]
            }
        };
        this.getBetData = function (i, pid, mid, k, flag) {
            flag = flag || false;
            var match = this.getMatch(mid) || {}, argx = this.args[pid], betValue = argx.numType, betName = ((this.jcT=='jcrxy') ? argx.numName2 : argx.numName), sp = this.sp[mid][pid];
            if (flag) {
                !this.datas[i] && ++this.betNum && (this.datas[i] = {});
                if (!this.isMix) {
                    var cid = this.betPlayTypes[i];
                    if (cid && pid != cid) {
                        this.datas[i] = {};
                        //  this.clearPlay(i, cid, mid)
                    }
                }
                !this.datas[i][pid] && (this.datas[i][pid] = this.getGroup(pid, mid));
                var nb = this.datas[i][pid];
                if (this.empty(nb.code)) {
                    nb.code[k]  = betValue[k];
                    nb.prize[k]  = Math.abs(sp[k]) || 0;
                    nb.name[k]  = betName[k];
                    nb.bets = 1;
                    this.betsSum++;
                    this.betPlayTypes[i] = pid;
                    if(!this.betPlayTypesBase[pid]){
                        this.betPlayTypesBase[pid] = 1
                    }else{
                        this.betPlayTypesBase[pid]++;
                    }
                    //  !this.betPlayTypesBase[pid] && (this.betPlayTypesBase[pid] = 1);
                    !this.betMatchCache[match.matchId] && (this.betMatchCache[match.matchId] = i.toString());
                } else {
                    nb.code[k] = betValue[k];
                    nb.prize[k]  = Math.abs(sp[k]) || 0;
                    nb.bets++;
                    this.betsSum++;
                    this.betPlayTypesBase[pid]++;
                    nb.name[k]  = betName[k];
                }
                if (this.ggOut) {
                    if (!this.ggIsOut) {
                        this.toggleGgArea(1);
                    }
                }
            } else {
                if (this.datas[i] && this.datas[i][pid]) {
                    var nb = this.datas[i][pid];
                    delete nb.code[k] && nb.bets--&&this.betsSum--;
                    if (--this.betPlayTypesBase[pid] == 0) delete this.betPlayTypesBase[pid];
                    if (this.empty(nb.code) || nb.bets == 0) {
                        delete this.datas[i][pid];
                        this.betPlayTypes[i] = '';
                    }
                    delete nb.prize[k];
                    delete nb.name[k];
                    if (this.checkEmpty(i)) {
                        this.deleteOne(mid);
                    }
                }
            }
            this.betNumObj.html(this.betNum);
        };
        this.getMinModeLimite = function () {
            var pTypes = this.betPlayTypesBase, args = this.args;
            this.maxModeLimite = (function (t) {
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
        };
        this.checkEmpty = function(inx){
            var datas = this.datas[inx], f = true;
            for(var i in datas){
                f = f && (this.empty(datas[i]['code']));
            }
            return f;
        };
        this.affirmBuy = function () {//代购
            this.isHm = 1;
            var info = this.getBuyInfo();
            if (info) {
                this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                var url = '/lottery/jc_affirm.jsp';
                $("#lotteryData").val(encodeURIComponent(info));
                /*   if (dc.ie < 8 && dc.ie > 0) {
                 url += '?r=' + J.r();
                 }
                 else {*/
                url += '?value=' + encodeURIComponent(info);
                //   }
                $("#affForm").attr("action", url).submit();
                $('#loadingBox .popup_cancel').click()
            }
        };
        this.cooperateBuy = function () {//合买
            this.isHm = 0;
            var info = this.getBuyInfo();
            if (info) {
                this.setPopupBox('正在查找您所请求的数据，请稍等。', 'loading');
                var url = '/lottery/jc_coop.jsp';
                $("#lotteryData").val(encodeURIComponent(info));
                /* if (dc.ie < 8 && dc.ie > 0) {
                 url += '?r=' + J.r();
                 }
                 else {*/
                url += '?value=' + encodeURIComponent(info);
                // }
                $("#affForm").attr("action", url).submit();
                $('#loadingBox .popup_cancel').click()
            }
        };

        // 统计个彩种玩法的点击触发事件
        this.setTrackEvent = function(play){
                var _this = this,
                    t = _this.isHm ? '我要代购' : '我要合买' ;

                try{
                    _czc.push(["_trackEvent", "竞彩篮球", t+''+play]);
                }catch(e){}
        };

        this.getBuyInfo = function () { //组装参数
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
                                    if (nb.code[j] >= 0)tar.push(nb.name[j].replace(/-/g,'*')),tarB.push(nb.name[j]);
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

                        var rq = obj.comityBall+'$'+obj.zf;
                        var _str = obj.matchNo + '~' + obj.matchHome + 'VS' + obj.matchGuest + '~' + rq + '~' + tarB.join(' ') + '~';
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

            this.setTrackEvent('大混投');

            return str;
        };
        this.getBuyInfo_rqBase = function () { //组装参数
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
        };
        this.getBuyInfo_rq = function () { //组装参数
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
        };
        this.getFilterData = function(){ //获取在线过滤数据
            var arr = [],sparr = [],vsArr = [],orderArr = [],oparr = [];
            for (var i = 0, dl = this.datas.length; i < dl; i++) {
                var nb = this.datas[i];
                if(!nb) continue;
                var id = nb[6];
                sparr.push(id+':'+this.sp[id].join(','));
                var _op = $.trim($('#esp_'+id + ' .odds_d').html()).replace('&nbsp;','');
                if(_op.length < 1) _op = "- - -";
                oparr.push(id+':'+_op.split(' ').slice(0,3).join(','));
                var obj = this.getMatch(id);
                var str = id + ":"+this.nos[id] + "VS" +obj.matchHome + "VS" + obj.matchGuest + "VS"+obj.comityBall+"VS" + obj.endTime;
                vsArr.push(str);
                orderArr.push(id+':'+nb[7].join("-"));
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
            arr.push(this.arg.id);
            arr.push(dc.queryTime.replace(/-/gm,''));
            $('#filtersp').val(sparr.join("/")+'^'+oparr.join('/'));
            return arr.join("^");
        };
        this.getWinMoreBase = function(){//获取奖金预测数据
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
                        var temp = nb['code'], _arr = nb['prize'], b = this.getMatch(id);;
                        for (var n = 0; n < temp.length; n++){
                            var bt = temp[n];
                            if(bt >= 0){
                                var bv = [];
                                if( i == '22'){
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
        };

        this.getWinMoreMix = function () {//获取奖金预测数据
            var arr = [], nbArr = [], vsArr = [];
            for (var i = 0, il = this.datas.length; i < il; i++) {
                // for (var i in this.codeList) {
                var nb = this.datas[i];
                var tzArr = [];
                if (!nb) continue;
                var id ;
                for(var pid in nb){
                    id = +nb[pid].id;
                    var codes = nb[pid]['code'], sps = nb[pid]['prize'], _arr = [];
                    var argx = this.args[pid.toString().toUpperCase()], betValue = argx['numType'];
                    for(var j = 0; j < codes.length; j++){
                        if(codes[j] >= 0)  {
                            var inx = $.inArray(codes[j],betValue);
                            _arr.push(inx + '(' + sps[j] + ')');
                        }
                    }
                    tzArr.push(pid + '^' + _arr.join(','));
                }
                var obj = this.getMatch(id)
                var dan_str = '%' + (this.dan[i] > 0 ? '1' : '0');
                nbArr.push(obj['matchNo'] + '=' + tzArr.join('|') + dan_str);
                var vs_str = obj['matchNo'] + "^" + obj['matchHome'] +"&nbsp;("+obj['comityBall'] +")&nbsp;"+ obj['matchGuest'] + "^" + obj['endTime'];
                vsArr.push(vs_str);
            }
            arr.push('JCLQ');
            arr.push(nbArr.join("/"));
            arr.push([this.chuan.join(",").replace('单关','1*1').replace(/串/g, '*'), this.bei, this.sum].join('+'));
            arr.push(vsArr.join('/'));
            return arr.join("&");
        };
        this.getWinMore = function(){//获取奖金预测数据
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
        };

        this.resToggleHt = function(matchId){
            var sps = $('#ht_'+matchId).val() ;
            $('#div_'+matchId+'_ht').empty().html(this.generateSpHtml(sps,matchId));
            $('#tr_'+matchId+'_ht').show();
            $('#div_'+matchId+'_ht').show(200);
            $("#t_"+matchId).attr('s',1).addClass('show').find('i').html('其他玩法收起');
            $("#t_"+matchId).data('p',1)
        }

        this.toggleHt = function(o){//比分页面详情的展开
            var s = o.attr('s'),
                refid = o.attr('d'),
                id = refid.split('_')[0],
                sps = $('#ht_'+id).val(),
                _this  = this ;
            if(s == null){

                $('#div_'+refid).empty().html(this.generateSpHtml(sps,id));
                $('#tr_'+refid).slideDown();
                $('#div_'+refid).slideDown(200);
                if($("#pn_"+id).text().indexOf('已选择') < 0){
                    o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                }else{
                    o.attr('s',1).addClass('show')
                }
                // o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                o.data('p',1)
            }else{
                if(s == "1"){
                    $('#tr_'+refid).slideUp(200);
                    $('#div_'+refid).slideUp(200);
                    if($("#pn_"+id).text().indexOf('已选择') < 0){
                        o.attr('s',0).removeClass('show').find('i').html('其他玩法展开');
                    }else{
                        o.attr('s',0).removeClass('show')
                    }
                    o.data('p',0)
                }else if(!this.isHistory){
                    $.get('/ssc/lottery/getJCBDBFSP.jsp?lottery=48&matchId='+id+'&d='+Dyc.r(),function(sp){
                        /*sp = $.trim(sp);
                         if(!sp || sp == "null") sp = sps;
                         else if(_this.sp[id])_this.sp[id] = sp.split(' ');*/
                        sp = sps ;
                        $('#div_'+refid).empty().html(_this.generateSpHtml(sp,id));
                        $('#tr_'+refid).slideDown();
                        $('#div_'+refid).slideDown(200);
                        if($("#pn_"+id).text().indexOf('已选择') < 0){
                            o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                        }else{
                            o.attr('s',1).addClass('show')
                        }
                        //     o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                        o.data('p',1)
                    });
                }else{
                    $('#tr_'+refid).slideDown();
                    $('#div_'+refid).slideDown(200);
                    if($("#pn_"+id).text().indexOf('已选择') < 0){
                        o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                    }else{
                        o.attr('s',1).addClass('show')
                    }
                    //     o.attr('s',1).addClass('show').find('i').html('其他玩法收起');
                    o.data('p',1)
                }
            }
        };

        this.fomartSp = function(sp){
            var lots = ['26','27','29','28'], r = {};
            var sp_arr = sp.split('|');
            for (var j = 0; j < sp_arr.length; j++) {
                if (sp_arr[j] && lots[j]) r[lots[j]] = sp_arr[j].split(' ');
            }
            return r;
        };

        this.getBetSp = function(m, no, old){

            var _self = this,  sp = $('#sps_' + m).val(), sp_fn = function () {
                _self.sp[m] = _self.fomartSp(sp);
            };
            if(!old) return sp_fn();
            $.post(this.getSpInfoUrl + '?lottery=48&matchId=' + m,function (s) {
             //   console.log(s);
                if (s.indexOf('|') == -1) s = sp;
                _self.sp[m] = _self.fomartSp(s);
            }).error(sp_fn)
        };

        this.generateSpHtml = function(sps,id){
                    var $tr = $("#tr_"+id),k= 0, isStop = $tr.attr("expire") == 0,zf =$tr.attr("zf") ;

                    if(this.isHistory) isStop = true;
                    var spArr = $.trim(sps.replace(/null/g,'')).split(" ");
                    var strHtml = '';
                    var lotArgs = ['29','28'];

                    for(var j= 0,jl=lotArgs.length;j<jl;j++){
                        var cl =  (lotArgs[j] =='29') ? 'dxf' :'sfc';
                        var tzArr = this.betMatchCache[id] ? this.datas[this.betMatchCache[id]][lotArgs[j]] : [];
                        var nbArr = tzArr ? tzArr['name']  : [] ;
                        var nArr = this.args[lotArgs[j]].numName ;
                        strHtml += '<dl class="'+cl+'">' ;

                        if(lotArgs[j] =='29'){
                            strHtml +='<dt>大小分</dt><dd class="spe"><em>预设总分</em>'+zf+'</dd><dd>'
                        }else if(lotArgs[j] =='28'){
                            strHtml +='<dt>胜分差</dt><dd><div>'
                        }
                        var kStr='',zStr='';
                        for(var i= 0,len=nArr.length;i<len;i++,k++){
                            var nb = nArr[i],sp = spArr[k] ;
                            if(!(sp-0)) continue;
                            var ids = "td_"+id+"_"+lotArgs[j]+"_"+ i , cls = "",pS=""  ;
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
                            if(lotArgs[j] =='29') {
                                if(i+1 == len)cls = "" + cls ;
                                strHtml +='<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>';
                            }else if(lotArgs[j] =='28'){
                                var  sf = i%2 ;
                                nb = nb.replace(/(主|客)胜/g,'');
                                if(sf){
                                    zStr +='<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>';
                                }else{
                                    kStr +='<a href="javascript:void(0)" id="'+ids+'" class="'+cls+'" '+pS+'><em>'+nb+'</em>'+sp+'</a>';
                                }
                            }
                        }
                        if(lotArgs[j] =='28'){
                             zStr = '<span class="x1">主胜</span>' + zStr + '</div>';
                             kStr = '<span class="x1">客胜</span>' + kStr + '</div>';
                             strHtml += kStr + zStr ;
                           //  strHtml += '</dd></dl><label><input type="button" value="全 清"></label>';
                        }else{
                            strHtml += '</dd></dl>';
                        }
                    }
                    return strHtml ;
        };


        this.checkBei = function (obj, n) {
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
        };
        this.clickEvent = function (id, c) {//处理选号事件处理
            var arr = id.split("_");
            var mid = arr[1], pid = arr[2], no = arr[3];
            var argx = this.args[pid], betValue = argx.numType;
            var con = $('#tr_' + mid), etd = $('#td_' + arr.slice(1).join('_')), allId = '#all_' + mid + '_' + pid, inx = +con.attr('i');
            // if (!this.isHistory && con.attr("expire") == 0)return !!alert("当前期次不允许投注已截止的比赛场次！");
            if (!etd.attr("x")) {
                if (!this.betMatchCache[mid] && this.betNum + 1 > this.maxChang) {
                    return alert("对不起，最多能选择" + this.maxChang + "场比赛");
                }
                this.getBetData(inx, pid, mid, no, betValue[no].toString());
                etd.addClass("x").attr("x", "1");
            } else {
                this.getBetData(inx, pid, mid, no);
                etd.removeClass("x h").removeAttr("x");
            }
            var len = 0;
            var nb = this.datas[inx];
            if(!this.empty(nb) && nb[pid]) len = nb[pid].bets;
            if (len) {
                var count = betValue.length;
                if (pid == '23') {
                    count = 13;
                    if (no < 13) allId = "#1all_" + mid + '_' + pid
                    else if (no > 17) allId = "#3all_" + mid + '_' + pid
                    else {
                        allId = "#2all_" + mid + '_' + pid
                        count = 5;
                    }
                    len = $(allId).prevAll(".x").length;
                }
                if (len == count) $(allId).addClass("x").children(':checkbox').attr('checked', true);
                else $(allId).removeClass("x").children(':checkbox').attr('checked', false);
            }
            this.restoreData();
            this.getMinModeLimite();
            setTimeout(function(){dc.countBox(mid)}, 20);
        };
        this.allClickEvent = function(id){
            var arr = id.split("_"); //all_38795_23
            var mid = arr[1], pid = arr[2], eid, b;
            var con = $('#tr_' + mid), all = $('#all_' + mid + '_' + pid);
            if (!this.isHistory &&  con.attr("expire") == 0)return !!alert("当前期次不允许投注已截止的比赛场次！");
            var betObj = all.prevAll('.weisai'), kl = betObj.length, etd, inx = +con.attr('i'), c =  all.children(':checkbox');
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
                all.attr("class", "a x");
                c.attr("checked", true);
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
                all.attr("class", "a");
                c.attr("checked", false);

            }
            this.getMinModeLimite()
            setTimeout(function(){dc.countBox(mid)}, 20);
        }

        this.allClickEventBf = function(ts){ //比分点全
            var id = ts.attr("id");
            var arr = id.split("_");
            var betObj = ts.parent().siblings('.weisai'),etd, inx = $('#tr_'+arr[1]).attr('i');
            if ($(ts).attr("class") == "quanBf") {
                for (var k = 0, kl = betObj.length; k < kl; k++) {
                    etd = $(betObj[k]);
                    etd.addClass("x").attr("x", "1");
                    var ids = etd.attr('id').split('_');
                    this.getBetData(inx,ids[2],ids[1],ids[3],1);
                }
                ts.addClass("x");
            } else {
                for (var k = 0, kl = betObj.length; k < kl; k++) {
                    etd = $(betObj[k]);
                    if (etd.attr("x")) {
                        etd.removeClass("x h").removeAttr("x");
                        var ids = etd.attr('id').split('_');
                        this.getBetData(inx, ids[2],ids[1],ids[3],0);
                    }
                }
                ts.removeClass("x");
            }
            this.getMinModeLimite()
            dc.countBox(arr[1]);//函数集合
        };

        this.flyEffect = function (s) {
            var o = $(s);
            if(dc.ie > 0 && dc.ie < 8)return;
            if (o.attr('x')) {
                jTool.initFly(o);
            }
        };

        this.deleteOne = function (id) {
            this.betNum--;
            if (this.betNum <= this.minMacthNum) {
                $('#guoguanMany').removeClass('special').hide();
                $('#guoguanManyInput').attr('checked',0);
            }
            var i = +this.betMatchCache[id];
            delete this.betMatchCache[id];
            delete this.datas[i];
            delete this.betPlayTypes[i];
            for(var pid in this.datas[i]){
                var nb = this.datas[i][pid];
                this.betPlayTypesBase[pid] -= nb['bets'];
            }
            if (this.dan[i]) {
                this.danCount--;
                delete this.dan[i];
            }
            if (this.ggModeInputObj[this.betNum + 1]) {
                this.ggModeInputObj[this.betNum + 1].remove();
                delete this.ggModeInputObj[this.betNum + 1];
            }
            if (this.ggManayLiObj[this.betNum + 1]) {
                this.ggManayLiObj[this.betNum + 1].remove();
                delete this.ggManayLiObj[this.betNum + 1];
            }
        };
        this.deleteAll = function(){
            for (var i in this.ggModeInputObj) {
                var ggInput = this.ggModeInputObj[i];
                if (ggInput) {
                    ggInput.remove();
                }
            }
            for (var i in this.ggManayLiObj) {
                var ggLi = this.ggManayLiObj[i];
                if (ggLi) {
                    ggLi.remove();
                }
            }
            this.betPlayTypesBase = {};
            this.ggModeInputObj = [];
            this.ggManayLiObj = [];
            $("#guoguanMany").removeClass('special').hide();
            $('#guoguanManyInput').attr('checked', 0);
        };
        this.getMatch = function (id) {//获取当前场次
            for (var i = 0, il = this.matchInfo.length; i < il; i++) {
                if (this.matchInfo[i].matchId == id) return this.matchInfo[i];
            }
            return null;
        }
        this.countBox = function (id, val) {//计算钱数集合
            if (id) {
                //  this.setFloatWin(id);//浮动框信息
                this.setFootWin(id); //下部窗口
                this.showChuanFn(this.betNum);//显示隐藏串
            }
            this.getChuan();
            this.getDan();
            this.danAndChuan(val);//串和胆的显示
            if(this.lotId == 23) this.bfTr(id)//已经有号码的单场场次，变色
            this.countItems();//算注数
        };
        this.bfTr = function(id){
            if (this.betMatchCache[id]){
                $("#tr_"+id).addClass("mor_ye");
            }else{
                $("#tr_"+id).removeClass("mor_ye");
            }
        };
        this.countItems = function () { //计算钱数
            var nbLen = this.betNum;
            if (nbLen && this.chuan.length) {
                this.getMoney();
            } else {
                $("#buyTotalItems").html(0);
                $("#buyTotalNum").html(0);
                $("#maxPrize").add('#minPrize').html(0);
            }
            this.betNumObj.html(nbLen);
            $("#buyDoubleTxt").text(this.bei);
            $("#allDan").text(this.danCount);
        };
        this.showChuanFn = function (len) { //显示选号方式
        var betNum = len || this.betNum;
        if (betNum > this.maxModeLimite) {
            for (var i = this.maxModeLimite + 1; i <= betNum; i++) {
                var ggMode = this.ggModeInputObj[i];
                if (ggMode) {
                    ggMode.remove();
                    delete this.ggModeInputObj[i];
                }
            }
            betNum = this.maxModeLimite;
        }

        var ggObj;
        if (!this.ggModeInputObj[0]) {
            var str = '\u8BF7\u81F3\u5C11\u9009\u62E9' + (this.isDG ? "\u4E00" : "\u4E24") + '\u573A\u6BD4\u8D5B';
            var labelObj = $('<label id="noguoguan" class="noguoguan">' + str + '</label>');
            this.ggModeInputObj[0] = labelObj;
            $('#guoguanSingle').empty().append(labelObj);
        }
        this.hideChuan();
        for (var i = this.minMacthNum; i <= betNum; i++) {
            if (!this.ggModeInputObj[i]) {
                var gg = this.ggMode["Single"][i - 1];
                var labelObj = $("<label for=\"guoGuan" + i + "\"><input type=\"checkbox\" value=\"" + gg + "\" id=\"guoGuan" + i + "\">" + gg + "</label>");
                this.ggModeInputObj[i] = labelObj;
                if (!ggObj) ggObj = labelObj;
                else ggObj = ggObj.add(labelObj);
                (function (i) {
                    labelObj.children(':checkbox').click(function () {
                        if (this.checked) {
                            var guoGuanNum = dc.chuan.length;
                            if (guoGuanNum >= 5) {
                                this.checked = "";
                                $.alert("\u7ec4\u5408\u8fc7\u5173\u9009\u62e9\u7684\u8fc7\u5173\u65b9\u5f0f\u4e0d\u80fd\u8d85\u8fc75\u4e2a");
                                return false;
                            }
                            var val = $(this).val();
                            if (val == "\u5355\u5173") val = 1;
                            else val = $(this).val().split("\u4e32")[1];
                            dc.countBox(0, val);
                        }
                        else dc.countBox();
                    });
                })(i);
            }
            //  ggObj.last().children(':checkbox').trigger('click');
        }
        $('#guoguanSingle').append(ggObj);
        if (betNum > this.minMacthNum && !this.isDG) {
            $("#guoguanMany").show();
            this.createGgManyMode();
        }
    };
        this.createGgManyMode = function () {
        var liObjArr = "";
        for (var i = this.minMacthNum; i <= (this.betNum > 8 ? 8 : this.betNum); i++) {
            var liObj = $("<dd></dd>");
            if (!this.ggModeInputObj[i] || this.ggModeInputObj[i].length != 1) {
                continue;
            }
            for (var k in this.ggMode["Many"][i]) {
                var gg = this.ggMode["Many"][i][k];
                var labelObj = $('<label for="guoGuan_' + i + k + '"><input type="checkbox" value="' + gg + '" id="guoGuan_' + i + k + '">' + gg + '</label>');
                liObj.append(labelObj);
                this.ggModeInputObj[i] = this.ggModeInputObj[i].add(labelObj);
                (function (i) {
                    labelObj.children(':checkbox').click(function () {
                        if (this.checked) {
                            var guoGuanCheckedNum = dc.chuan.length;
                            if (guoGuanCheckedNum >= 5) {
                                this.checked = "";
                                $.alert("\u7ec4\u5408\u8fc7\u5173\u9009\u62e9\u7684\u8fc7\u5173\u65b9\u5f0f\u4e0d\u80fd\u8d85\u8fc75\u4e2a");
                                return false;
                            }
                            var val = $(this).val();
                            if (val == "\u5355\u5173") val = 1;
                            else val = $(this).val().split("\u4e32")[1];
                            dc.countBox(0, val);
                        }
                        else dc.countBox();
                        //   $('#guoguanManyInput').attr('checked',$('#chuanOths :checked').length?'checked':'');
                    });
                })(i);
            }
            if (!this.empty(this.ggMode["Many"][i])) {
                if (!this.ggManayLiObj[i]) {
                    this.ggManayLiObj[i] = liObj;
                }
                if (liObjArr == "") {
                    liObjArr = liObj;
                } else {
                    liObjArr = liObjArr.add(liObj);
                }
            }
        }
        $('#chuanOths').append(liObjArr);
    };
        this.hideChuan = function () {
            if (this.betNum < this.minMacthNum) {
                $('#noguoguan').show();
            } else {
                $('#noguoguan').hide();
            }
        };
        this.getChuan = function () {//获取串信息
            var dc = this, minB = 20, minC = 1;
            this.chuan = [];
            $("#chuans :checked").each(function (i) {
                var val = $(this).val(), b = 1, c = 1;
                if (val) {
                    dc.chuan.push(val);
                    if (val != "\u5355\u5173") {
                        var arr = val.split("\u4e32");
                        b = +arr[0];
                        c = +arr[1];
                    }
                    if (minB > b) minB = b;
                    if (minC < c) minC = c;
                }
            });
            this.minChuan = minB == 20 ? 0 : minB;
            this.minChuanNum = minC;
        };
        this.getDan = function () {//获取胆信息
            this.dan = [];
            this.danCount = 0;
            var dc = this;
            $("#footBox :checked").each(function (i) {
                var matchid = $(this).val(), val = $(this).attr('id').split('_')[1],inx = dc.betMatchCache[matchid];
                if(+inx >= 0){
                    dc.danCount++;
                    dc.dan[+inx] = val;
                }
            });
        };
        this.setFloatWin = function (id) {    //生成并绑定右选框
            var str = "", inx = this.betMatchCache[id];
            if (inx >= 0) {
                var obj = this.getMatch(id);
                str += '<td class="show" id="r_' + id + '"><div><span class="x" >' + obj.matchNo + '</span><s class="del" title="删除">删除</s></div></td>';
                str += '<td>' + obj.matchHome.substring(0, 3) + '</td>';
                str += '<td class="s">';
                for(var tp = 0,tl=this.typePosition.length;tp<tl;tp++){
                    var i = this.typePosition[tp];
                    if(this.datas[+inx][i]){
                        var  nb = this.datas[+inx][i], val = nb.code, vallen = nb.code.length, numName = nb.name;
                        for (var n = 0; n < vallen; n++) {
                            if (val[n] >= 0) str += '<a href="javascript:void(0)" class="n" id="n_' + id + '_' + i + '_' + n + '">' + numName[n] + '</a>';
                        }
                    }
                }

                str += '</td>';
                str += '<td><input type="checkbox" class="d" id="fd_' + id + '" value="' + id + '"></td>';
                $("#right_" + id).html(str).show();
                $("#right_" + id + " .n").unbind().mousedown(function () {
                    dc.clickEvent(this.id, 1);
                })
                $("#right_" + id + " .d").unbind().click(function () {
                    $("#foot_" + id + " .d").attr('checked', $(this).attr('checked'));
                    dc.countBox();
                })
                $("#right_" + id + " .show").unbind().click(function () {
                    dc.delTrNb1(this.id);
                    dc.countBox(id);
                })
                if (this.ie == 6) {
                    $("#right_" + id + " .show").unbind().hover(function () {$(this).find('span').hide()}, function () {$(this).find('span').show()})
                }
            } else {
                $("#right_" + id).html("").hide();
            }
        }
        this.setFootWin = function (id) { //生成并绑定下选框
            var str = "",bfStr ='', inx = this.betMatchCache[id],_this = this;
            if (inx >= 0) {
                var obj = this.getMatch(id);
                var pid = this.betPlayTypes[+inx] ,flag = false;
                str += '<td width="50" id="b_' + id + '">' + obj.matchNo + '</td>';
                str += '<td width="60" class="t-r">' + obj.matchHome.substring(0, 4) +'</td>';
                str += '<td width="25">VS</td>';
                str += '<td width="60" class="t-l">' +obj.matchGuest.substring(0, 4) +'</td>';
                for(var ii in this.datas[+inx]){
                    if( ii !='length'){
                        if(ii =='22'){
                            flag = true;
                            break;
                        }else{
                            flag = false;
                        }
                    }
                }

                str += '<td class="optionsTd"><span class="opti-list">';
                var sn = 0;
                for(var tp = 0,tl=this.typePosition.length;tp<tl;tp++){
                    var i = this.typePosition[tp];
                    if(this.datas[+inx][i]){
                        var  nb = this.datas[+inx][i], val = nb.code, vallen = nb.code.length, numName = nb.name;
                        sn += nb.bets;
                        for (var n = 0; n < vallen; n++) {
                            if (val[n] >= 0){
                                if(i=='22'){
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
                $("#pn_"+id).html('已选择<b class="red">'+sn+'</b>个');
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
                    _this.countBox();
                })
                $("#foot_" + id + " .fs").unbind().mousedown(function () {
                   // _this.delTrNb1(this.id);
                    $(this).siblings('.optionsTd').find('a').trigger('mousedown');
                    _this.countBox(id);
                })
                if (this.ie == 6) {
                    $("#foot_" + id + " .fs").unbind().hover(function () {$(this).find('span').hide()},function(){$(this).find('span').show()});
                }
            } else {
                $("#foot_" + id).html("");
                $("#strBf_" + id).html("");
                $("#pn_"+id).html('其他玩法收起');
                // $("#ballFly").parent().removeClass('show');
            }
          //  if(!this.isHistory){
                _this.checkSelectedMatch()
         //   }
        };
        this.checkSelectedMatch = function(){
            for(var i in this.betMatchCache){
                if(i!='length'){
                    var exp = $("#tr_"+i).attr('expire');
                    if(exp =='0'){ $('.tzbtn,.otherapp').hide();break;}
                    else{ $('.tzbtn,.otherapp').show() }
                }
            }
            if(this.empty(this.betMatchCache)) $('.tzbtn').show() ;
        };

        this.danAndChuan = function (val) {
            var nbLen = this.betNum;
            var box = $("#footBox :checkbox");
            if (this.isDG) { //如果是单关的时候
                box.attr("disabled",true).attr("checked",false);
                return;
            }
            if (val && val != 1) {
                box.attr("disabled",true).attr("checked",false);
                return;
            }
            box.filter(':disabled').attr("disabled",false);
            $("#chuans input:disabled").attr("disabled",false);
            if (this.danCount) {
                $("#chuanOths :checked").attr("checked",false);
                $("#chuanOths :checkbox").attr("disabled",true);//组合过关全部禁用
            } else $("#chuanOths :checkbox").attr("disabled",false);//组合过关全部禁用
            var dom = $("#guoguanSingle label:lt(" + this.danCount + ") :checkbox");
            dom.attr("checked",false).attr("disabled",true);
            if (this.minChuan) {//已经选了串了
                if ((this.minChuan - 1) == this.danCount) {  //胆数等于最小的 串数 -1
                    box.not(":checked").attr("disabled",true);
                } else if (this.minChuanNum == 1 && nbLen == this.minChuan) { //场数等于最小串数切为串1
                    box.attr("disabled",true).attr("checked",false);
                    $("#chuans input:disabled").attr("disabled",false);
                }else if(this.minChuanNum > 1){
                    box.attr("disabled",true).attr("checked",false);
                }
            } else if (this.danCount >= nbLen - 1) { //胆数 等于 场数 -1
                box.not(":checked").attr("disabled",true);
            } else if ((this.minChuan - 1) == this.danCount) { //最小串数-1 等于胆数
                box.not(":checked").attr("disabled",true);
            }
        };
        this.delTrNb = function (ids) {
            var idA = ids.split("_"),id ;
            id = idA[1];
            this.delTrNb1(ids)
            this.hideNum = this.hideNum + 1;
            $("#hideNum").html(this.hideNum);


            $("#tr_"+id).hide();
            $("#tr_"+id+"_ht").hide();

            this.getMinModeLimite();
            this.countBox(id);

        };
        this.delTrNb1 = function (id) {
            var ids = id.split("_");
            var id = ids[1];
            var i =  +this.betMatchCache[id] ;
            if (i >= 0) this.deleteOne(id);

            $("#div_"+id+"_ht .weisai").attr("class","weisai").removeAttr('x')
            $("#tr_"+id+" .weisai").attr("class","weisai").removeAttr('x');


            this.setFootWin(id); //下部窗口
        };

        this.getMoney = function () {
            this.getCodeList();
            /*var beiShuValue = this.multipleObj.val() == "" ? 1 : this.multipleObj.val();
             this.bei = parseInt(beiShuValue, 10);*/
            var zhuShuVal = 0, minBonusVal = 0, maxBonusVal = 0, minBonusValArr = [];
            for (var i = 0 , il = this.chuan.length; i < il; i++) {
                var guoGuan = this.chuan[i].replace('串', '_');
                if (this.chuan[i] == '单关') guoGuan = '1_1';
                var c = this.getZhuShu(guoGuan);
                zhuShuVal += c;
                var bonus = this.getBonus(guoGuan);
                if (c > 0) maxBonusVal += bonus[0];
                var minArr = bonus[1];
                for (var j = 0, jl = minArr.length; j < jl; j++) {
                    if (minArr[j] >= 0) {
                        if (!minBonusValArr[j]) minBonusValArr[j] = 0;
                        minBonusValArr[j] += minArr[j];
                    }
                }
            }
            if (zhuShuVal > this.maxZhushu) {//如果注数超出最大注数
                this.zhushuOverflow(zhuShuVal);
                this.overflowTip = false;
            }
            for (var i = 0, l = minBonusValArr.length; i < l; i++) {
                if (minBonusValArr[i]) {
                    minBonusVal = minBonusValArr[i];
                    break;
                }
            }
            /* if (this.overflowErr) {
             maxBonusVal = minBonusVal = 0;
             }*/
            this.itemTotal = zhuShuVal;
            this.sum = zhuShuVal * this.bei * 2;
            $("#buyTotalItems").html(this.itemTotal);
            $("#buyTotalNum").html(this.sum);
            var maxbouns = 0, minbouns = 0;
            if (this.betNum > 0 && this.betNum <= this.maxChang && this.bei <= this.maxBei) {
                var radix = 2;
                maxbouns = parseFloat(parseFloat(maxBonusVal).toFixed(2) * this.bei * 100 * radix / 100).toFixed(2);
                minbouns = parseFloat(parseFloat(minBonusVal).toFixed(2) * this.bei * 100 * radix / 100).toFixed(2);
            }
            $('#maxPrize').html(maxbouns);
            $('#minPrize').html(minbouns);
        };
        this.getCodeList = function(){
            var r = [], b = [];
            for (var i = 0, il = this.datas.length; i < il; i++) {
                var nb = this.datas[i];
                if (!nb) continue;
                var a = [];
                jQuery.each(nb, function (j, d) {
                    a.push(d.bets + '-' + d.type);
                })
                if (!this.dan[i]) r.push(a);
                else b.push(a);
            }
            this.selfOpt = r;
            this.selfDan = b;
        };
        this.getZhuShu = function (ggWay, prize,min) {
            var count = 0, sels = this.selfOpt, dan = this.selfDan, n = parseInt(ggWay, 10), kill = this.checkSingleType, isMix = this.killRepeat,group;
            if(prize)group = Math.dl(prize[0], prize[1], n);//计算奖金
            else group = Math.dl(sels, dan, n)
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

        };
    /*    this.getBonus = function (ggType) {
            if (this.betNum > this.maxChang) return 0;
            var prizes = [], dan_prize = [], min_sp = [], dan_min_sp = [];
            for (var k in this.datas) {
                var maxVal = [], minVal = [], nb = this.datas[k];
                for (var i in nb) {
                    if (nb[i]){
                        var sp = $.grep(nb[i].prize,function(n){return n > 0})
                        maxVal.push(Math.max.apply(Math,sp) + '-' + nb[i].type);// 最大sp值
                        minVal.push(Math.min.apply(Math,sp) + '-' + nb[i].type);// 最小sp值
                    }
                }
                if (this.dan[k]) {
                    dan_prize.push(maxVal);
                    dan_min_sp.push(minVal);
                }
                else{
                    prizes.push(maxVal);
                    min_sp.push(minVal);
                }
            }
            var max_prize = this.getZhuShu(ggType, [prizes, dan_prize]);//把它转换成注数的计算模式
            var minArr = this.getMinBonus(ggType, min_sp, dan_min_sp); //最小奖金
            return [parseFloat(max_prize), minArr];
        };*/

        this.getBonus = function (ggType) {
                var _this = this ;
                if (_this.betNum > _this.maxChang) return 0;
                var prizes = [], dan_prize = [], min_sp = [], dan_min_sp = [], k,len;
                for (k=0,len=_this.datas.length;k<len;k++) {
                        var maxVal = [],  minVal = [], nb = _this.datas[k];
                        if(!nb) continue ;
                        var pN = 0, codeNew = [];
                        for (var i in nb) {
                                var nbs = nb[i];
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
                        }

                        maxVal = maxVal.sort(function(m,n){
                            return  parseFloat(n) - parseFloat(m) ;
                        })
                        minVal = minVal.sort(function(m,n){
                            return  parseFloat(m) - parseFloat(n) ;
                        })


                        //过滤号码组合，判断是否互斥，并返回不互斥的组合
                        var cArr = _this.filterCodeTo(codeNew,pN);


                        if(!cArr.length) cArr =[[maxVal[0]],[minVal[0]]] ;

                        if (_this.dan[k]) {
                            dan_prize.push(cArr[0]);
                            dan_min_sp.push(cArr[1]);
                        }else{
                            prizes.push(cArr[0]);
                            min_sp.push(cArr[1]);
                        }
                }
                var max_prize = _this.getZhuShu(ggType, [prizes, dan_prize]);//把它转换成注数的计算模式
                var minArr = _this.getMinBonus(ggType, min_sp, dan_min_sp); //最小奖金
                return [parseFloat(max_prize), minArr];
        };


        this.filterCodeTo  = function(obj,ggWay){
                var _this = this ,cArr;
                cArr = _this.filterCodeArr(obj,ggWay);
                if(!cArr.length && ggWay > 2){
                       ggWay = ggWay - 1 ;
                       cArr = _this.filterCodeTo(obj,ggWay);
                };
                return cArr ;
        };


        //检查当前组合是否互斥
        this.filterCodeArr = function(obj,ggWay){
                var _this = this, nArr= [],
                    n = parseInt(ggWay, 10),
                    a1 = Math.dl(obj,[],n),i,ln;

                //循环遍历新的组合
                for(i=0,ln=a1.length;i<ln;i++){
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
        };

        this.checkIsMutex  = function(arr){
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
        };

        this.checkArrMax = function(arr){
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
        };

        this.getMinBonus = function (ggType, sa, dan) {
            if (this.betNum > this.maxChang) return 0;
            var rb = [], cn = Math.calcuteMN(ggType);
            var d = cn - dan.length, min_bonus = -1;
            var ff = function (a, b) {
                if (parseFloat(a[0]) > parseFloat(b[0])) return 1; else return 0
            };
            sa.sort(ff);
            $.each(sa, function (j, n) {
                if (j >= d)  n[0] = n[0].replace(/^[\d\.]+/i, '0')
            })
            var prize_arr = this.getZhuShu(ggType, [sa, dan], 1);//把它转换成注数的计算模式
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

        };
        this.zhushuOverflow = function(n){
            if (!this.overflowTip) {
                $.alert('已经超过了最大注数限制，如需继续投注，可能会降低浏览器的效率。但理论奖金范围将停止计算，如需查看奖金范围，请点击奖金详情链接。');
                this.overflowTip = true;
            }
        };

        this.batchShow = function (arr, show) { //批量显示隐藏行
            var len = arr.length;
            var sum = len;
            for (var i = 0; i < len; i++) {
                if (arr[i] == "") {
                    sum--;
                    continue;
                }
                if(this.lotId =='48'){
                    var otr_0 = $("#tr_" + arr[i]+'_49');
                    if (!show) {
                        if (!$("#ck3").attr("checked") && (parseInt(otr_0.attr("expire")) == 0) /*|| !$("#ck1").attr("checked") && (parseInt(otr.attr("rq")) != 0) || !$("#ck2").attr("checked")*/ /*&& (parseInt(otr_0.attr("rq")) == 0)*/) {
                            sum--;
                            continue;
                        }
                        otr_0.attr("fold", "0").hide();
                        if (otr_0.next("tr").css("display") != "none")otr_0.children(".sp_kg").click();
                    } else {
                        if (!$("#ck3").attr("checked") && (parseInt(otr_0.attr("expire")) == 0) /*|| !$("#ck1").attr("checked") && (parseInt(otr.attr("rq")) != 0) || !$("#ck2").attr("checked")*//* && (parseInt(otr_0.attr("rq")) == 0)*/) {
                            if (otr_0.css("display") == "none")otr_0.attr("fold", "");
                            sum--;
                            continue;
                        }
                        if (dc.isShowStop) {
                            otr_0.attr("fold", "").show();
                        } else {
                            $("#tr_"+arr[i]+"_49"+"[show=1]").attr("fold", "").show();
                        }
                    }

                    var otr = $("#tr_" + arr[i]+'_22');
                    if (!show) {
                        if (!$("#ck3").attr("checked") && (parseInt(otr.attr("expire")) == 0) /*|| !$("#ck1").attr("checked") && (parseInt(otr.attr("rq")) != 0) || !$("#ck2").attr("checked")*/ /*&& (parseInt(otr.attr("rq")) == 0)*/) {
                            sum--;
                            continue;
                        }
                        otr.attr("fold", "0").hide();
                        if (otr.next("tr").css("display") != "none")otr.children(".sp_kg").click();
                    } else {
                        if (!$("#ck3").attr("checked") && (parseInt(otr.attr("expire")) == 0) /*|| !$("#ck1").attr("checked") && (parseInt(otr.attr("rq")) != 0) || !$("#ck2").attr("checked")*/ /*&& (parseInt(otr.attr("rq")) == 0)*/) {
                            if (otr.css("display") == "none")otr.attr("fold", "");
                            sum--;
                            continue;
                        }
                        if (dc.isShowStop) {
                            otr.attr("fold", "").show();
                        } else {
                            $("#tr_" +arr[i]+"_22"+"[show=1]").attr("fold", "").show();
                        }
                    }
                }else{
                    var otr = $("#tr_" + arr[i]);
                    if (!show) {
                        if (!$("#ck3").attr("checked") && (parseInt(otr.attr("expire")) == 0)) {
                            sum--;
                            continue;
                        }
                        otr.attr("fold", "0").hide();
                        if (otr.next("tr").css("display") != "none")otr.children(".sp_kg").click();
                    } else {
                        if (!$("#ck3").attr("checked") && (parseInt(otr.attr("expire")) == 0)) {
                            if (otr.css("display") == "none")otr.attr("fold", "");
                            sum--;
                            continue;
                        }
                        if (dc.isShowStop) {
                            otr.attr("fold", "").show();
                        } else {
                            $("#tr_" + arr[i] + "[show=1]").attr("fold", "").show();
                        }
                    }
                }

            }
            if (show) {
                dc.hideNum -= sum;
            } else {
                dc.hideNum += sum;
            }
            if (dc.hideNum < 0) dc.hideNum = 0;
            else if (dc.hideNum > dc.sumMatch) dc.hideNum = dc.sumMatch;
            $("#hideNum").html(dc.hideNum);
        };

        this.setHideMatch = function(){

            var trs = $("#dcc").find("tr[rel='0']");
            var sum = trs.length ;
            var tr = trs.filter(function(){
                return  $(this).is(':visible')
            }),n;
            n = sum - tr.length ;
            $("#hideNum").html(n);
            this.hideNum = n ;


        };

        this.filterMatch = function () {  //赛事让球与不让球过滤
            var selector = "";
            $("#dcc tr[rq]").hide();
            if (!$("#ck3").attr("checked")) selector += "[expire='1']";
            else selector += "[expire='0']";
            /*if ($("#ck1").attr("checked")) {
             if (!$("#ck2").attr("checked")) selector += "[rq!='0']";
             else selector += "[rq]";
             } else {
             if ($("#ck2").attr("checked")) selector += "[rq='0']";
             else selector += "[rq='x']";
             }*/
            var trs = $("#dcc tr" + selector);
            dc.hideNum = dc.sumMatch - trs.show().length;
            if (dc.hideNum < 0)dc.hideNum = 0
            $("#hideNum").html(dc.hideNum = Math.min(dc.hideNum, dc.sumMatch));
        };
        this.filterWin = function () {//赛事筛选

            var _this = this ;
            _this.setMoreFilter();
            if(this.lotId !=48){
                $(".rangq").hide();
            }

            $("#filterWin :checkbox").unbind().click(function () { //点击选框
                var arr = $(this).val().split(",");
                var show = $(this).attr("checked") ? 1 : 0;
                dc.batchShow(arr, show);
            })
            //筛选按钮
            $("#filterBn").unbind().click(function () {
                if ($("#filterC").css("display") == "none")    $(this).addClass("sssx_manu_2");
                else $(this).removeClass("sssx_manu_2");
                $("#filterC").toggle();
            })
            //关闭筛选
            $("#filterClose").unbind().click(function () {
                $("#filterBn").removeClass("sssx_manu_2");
                $("#filterC").hide();
            })
            //全选
            $("#filterAll").unbind().click(function () {
                var arr = [];
                $("#filterWin input:not(:checked)").each(function () {
                    $(this).attr("checked", "checked")
                    arr.push($(this).val());
                });
                dc.batchShow(arr.join(",").split(","), 1);
            })
            //反选
            $("#filterFan").unbind().click(function () {
                var arr = [];
                $("#filterWin :checkbox").each(function () {
                    if ($(this).attr("checked")) {
                        $(this).attr("checked", "")
                        dc.batchShow($(this).val().split(","), 0);
                    } else {
                        $(this).attr("checked", "checked")
                        dc.batchShow($(this).val().split(","), 1);
                    }
                });
            })
            //显示全部
            $("#showHide").unbind().click(function () {
                $("#hideNum").html(dc.hideNum = dc.stopNum);
                if (dc.isHistory) selector = "[expire=1]";
                else selector = "[expire=0]";

                if (dc.lotId != 23) {
                    if (dc.isShowStop) {
                        $("#dcc tr").not(selector).show();
                    } else {
                        $("#dcc tr[show='1']").not(selector).show();
                    }
                    $("#dcc tr.hide").hide();
                } else {
                    if (dc.isShowStop) {
                        $("#dcc tr[l!=bf]").not(selector).show();
                    } else {
                        $("#dcc tr[l!=bf][show=1]").not(selector).show();
                    }
                    $("#dcc tr.hide").hide().next("tr[l=bf]").hide().find(".sp_kg").removeClass("sp_kg1").html("<span>展开sp值</span>");
                    $(".sp_kg").unbind();
                    $(".sp_kg").toggle(function () {
                        $(this).parent().next().show();
                        $(this).addClass("sp_kg1");
                        $(this).html("<span>收起sp值</span>");
                    }, function () {
                        $(this).parent().next().hide();
                        $(this).removeClass("sp_kg1");
                        $(this).html("<span>展开sp值</span>");
                    })
                }
                $("#filterWin :checkbox").attr("checked", "checked");
                /*$("#ck1").attr("checked", "checked");
                 $("#ck2").attr("checked", "checked");*/
                if (dc.isHistory) $("#ck3").attr("checked", "checked");
                else $("#ck3").attr("checked", "");
                if(dc.lotId ==48){
                    $(".show span").show();
                }else{
                    $(".show").mouseout();
                }

            })

            $("#fiveMatch").click(function(){
                var flag = $("#fiveMatch").prop('checked');
                _this.toggleMatch(flag);
                _this.setHideMatch();
            });

            $('.rang').delegate('input','click',function(){
                var f = $(this).prop('checked'),
                    v = $(this).val(),
                    fs = $(".rang input:checked").length;

                $("."+v).isTogglen(f);
                $(".px_"+v).isTogglen(f);
                if(!f && !fs){
                    var sb = $(this).parent().siblings().find('input');
                    $(sb).attr('checked',true);
                    v = $(sb).val();
                    $("."+v).isTogglen(true);
                    $(".px_"+v).isTogglen(true);
                }
            })

            $(document).delegate('.moreBtn','hover',function(){
                $(this).toggleClass('show');
            })

            $(document).delegate('.setBtn','hover',function(){
                $(this).toggleClass('show');
            })

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

            $('div.slip-f2').delegate('a','click',function(){
                var tn = $('#timeType').text();
                var tx = $(this).html();
                $(this).html(tn);
                $('#timeType').text(tx);
                _this.setTimeType(tx,tn)
            })

            $(".spfBtn").delegate('a','click',function(){
                var c = $(this).parent().attr('c').split('-');
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
        };


        this.showHideTr = function(obj){
            var ck = $(obj).find('input');
            var flag = ck.prop('checked'),v = ck.val(),t = ck.attr('t');

            $("#dcc").find('tr[expire=1]['+t+'="'+v+'"]').isTogglen(flag);

            $("#dcc").find('tr[expire=1][h'+t+'="ht_'+v+'"]').filter(function(){
                return $(this).find('div.hT-hidden')[0].style.display !='none' ? (flag ? $(this).isTogglen(1):$(this).isTogglen(0)) : $(this).isTogglen(0);
            })
        };

        this.setTimeType = function(x,n){
            var sArr = $("#dcc tr").find('td:eq(2)').find('span');
            $.each(sArr,function(i){
                var t =  $(sArr[i]).attr('title') ;
                if(t.indexOf(x) >-1){ $(sArr[i]).isTogglen(1)}
                if(t.indexOf(n) >-1){ $(sArr[i]).isTogglen(0)}
            })
        };

        this.fomartFen = function(f){

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
        };


        this.setMoreFilter = function(){
            var opts = this.getMatchOptions(),str='',sf='';
            var aT = ['rq','m','d'];
            var arg = {
                'rq':{'name':'让球','cls':'rangq'},
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
                        var q = (i =='rq') ? '球' : "";
                        var x = zk +''+op+''+q ;
                        str += '<label><input type="checkbox" checked  t="'+i+'" value="'+opts[i][j]+'">'+x+'<em>['+c+'场]</em></label>' ;
                    }
                    str += '</div></li>'
                }
            }
            $("#filterInfos").empty().append(str);
        };

        this.getMatchOptions = function(){
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
        };

        this.toggleSps = function(f){
            var sps = $("#dcc tr[expire='1']").find('.spArr');
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
        };


        this.toggleMatch = function(flag){
            var h = $("#endM :checkbox").prop('checked'),trs ;
            if(h){
                trs = $("#dcc tr");
            }else{
                trs = $("#dcc tr[expire='1']"); ///[expire='1']
            }
            for(var i= 0,len = trs.length;i<len;i++){
                var tr = $(trs[i])
                var ht = tr.attr('ht');
                var na ;

                if(!flag && tr.attr('expire') == '0' && !$("#endM :checkbox").prop('checked')){
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
        };

        this.eventS = {
            smousedown:function (event, id) {
                if ($("#" + id + " input").attr("disabled")) return false;
                if (dc.betNum == dc.maxChang && !dc.betMatchCache[id.split("_")[1]]) {
                    alert("对不起，最多能选择" + dc.maxChang + "场比赛")
                } else {
                    dc.clickEvent(id, 1);
                }
                event = event || window.event;
                var target = event.target ? event.target : event.srcElement;
                if (target.tagName == "INPUT") dc.eventS.toggle(target);
                return false;
            },
            a1mousedown:function (event, obj) {
                var id = obj.id;
                if (dc.betNum == dc.maxChang && !dc.betMatchCache[id.split("_")[1]] ){
                    alert("对不起，最多能选择" + dc.maxChang + "场比赛")
                } else {
                    dc.allClickEventBf($(obj), 1);
                }
                event = event ? event : window.event;
                var target = event.target ? event.target : event.srcElement;
                if (target.tagName == "INPUT")dc.eventS.toggle(target);
                return false;
            },
            a2mousedown:function (event, obj) {
                var id = obj.id;
                if (dc.betNum == dc.maxChang && !dc.betMatchCache[id.split("_")[1]] ){
                    alert("对不起，最多能选择" + dc.maxChang + "场比赛")
                } else {
                    dc.allClickEventBf($(obj), 2);
                }
                event = event ? event : window.event;
                var target = event.target ? event.target : event.srcElement;
                if (target.tagName == "INPUT")dc.eventS.toggle(target);
                return false;
            },
            a3mousedown:function (event, obj) {
                var id = obj.id;
                if (dc.betNum == dc.maxChang && !dc.betMatchCache[id.split("_")[1]] ){
                    alert("对不起，最多能选择" + dc.maxChang + "场比赛")
                } else {
                    dc.allClickEventBf($(obj), 3);
                }
                event = event ? event : window.event;
                var target = event.target ? event.target : event.srcElement;
                if (target.tagName == "INPUT")dc.eventS.toggle(target);
                return false;
            },
            toggle:function (o) {
                o.checked = !o.checked;
            }
        };

        this.sysTime = function () {
            var newDate = new Date();
            newDate.setTime(this.sysHM);
            var newTime1 = (newDate.getMonth() + 1) + "月" + newDate.getDate() + "日 " + newDate.toLocaleTimeString();
            $("#sysTime").html(newTime1);
            this.sysHM += 1000;
        };
        this.setFen = function () {//写入距离结束还有多少分
            for (var i in this.fens) {
                var fen = this.fens[i]--;
                if (fen > 9) {
                    var t = this.fomartFen(fen);
                    $("#fen_" + i).html('' + t + "");
                } else if (fen > 0) {
                    var t = this.fomartFen(fen);
                    $("#fen_" + i).html('' + t + "");
                } else if (fen <= 0) {
                    this.stopNum++;
                    $("#fen_" + i).html('0');

                    $("#tr_" + i).attr("expire", "0").attr("class", "endBet");
                    $("#tr_" + i + "_ht").attr("expire", "0").attr("class", "endBet");
                    $("#tr_" + i + " :checkbox").attr("checked",false).attr("disabled",false).unbind();
                    $("#tr_" + i + " .weisai").removeClass("x").removeAttr("x").unbind();
                    $("#tr_" + i + "_ht .weisai").removeClass("x").removeAttr("x").unbind();
                    $("#tr_" + i + " .a").removeClass("x").unbind();

                    delete this.fens[i];
                    if (this.betMatchCache[i]) {
                        this.deleteOne(i);
                        this.countBox(i);
                    }
                }
            }
            $("#expireCount").html(dc.stopNum);
        };

        this.getSpInfo = function () {//获取sp信息
            var lotteryId = this.isDG ? this.lotId + "_dg" : this.lotId;
            if (lotteryId == 46) lotteryId = 22;//一场决胜
            var spurl = "/ssc/json/jcplaysp_" + lotteryId + ".json?v=" + J.r();
            if (this.isDG)  spurl = this.getSpInfoUrl + "?lotteryId=" + lotteryId + "&v=" + J.r();

            $.ajax({
                'url':spurl,
                type:'post',
                data:[],
                success:function(dt){
                    var obj = dt;
                    if (typeof(dt) == "string")obj = eval("(" + dt + ")");
                    var spArr = obj.spInfo;
                    var spObj = {}
                    for (var i = 0; i < spArr.length; i++) {
                        // spArr[i] {"1":["2.48","3.49","3.22"]}
                        for (var n in spArr[i]) {
                            spObj[n] = spArr[i][n];
                            dc.sp[n] = spObj[n];
                        }
                    }
                    dc.setSp(spObj);//获取sp
                },error:function(){}

            })
        };
        this.setSp = function (obj) { //写入sp信息
            for (var i in obj) {
                if (!dc.oldSp) {
                    for (var n = 0; n < obj[i].length; n++) {
                        $("#sp_" + i + "_" + n).html(obj[i][n]);
                    }
                } else {
                    for (var n = 0; n < obj[i].length; n++) {
                        var str = "";
                        var objN = obj[i][n];
                        if (objN && dc.oldSp[i]) {
                            if (objN > dc.oldSp[i][n]) {
                                if (dc.lotId != 23) {
                                    str = objN + '<span class="tre ts">↑</span>'
                                } else {
                                    str = '<span class="tre ts"><br />↑</span>' + objN;
                                }
                            } else if (objN < dc.oldSp[i][n]) {
                                if (dc.lotId != 23) {
                                    str = objN + '<span class="gre ts">↓</span>'
                                } else {
                                    str = '<span class="gre ts"><br />↓</span>' + objN;
                                }
                            } else {
                                if (dc.lotId != 23) {
                                    str = objN;
                                } else {
                                    str = '<br />' + objN;
                                }
                            }
                        }
                        if (objN >= 0)$("#sp_" + i + "_" + n).removeClass("red");
                        else $("#sp_" + i + "_" + n).addClass("red");
                        $("#sp_" + i + "_" + n).html(str);
                    }
                }
            }
            dc.oldSp = dc.oldSp || {}
            dc.extend(dc.oldSp, obj);
        };
        this.extend = function (destination, source) { //深复制对象
            for (var p in source) {
                if (dc.getType(source[p]) == "array" || dc.getType(source[p]) == "object") {
                    destination[p] = dc.getType(source[p]) == "array" ? [] : {};
                    arguments.callee(destination[p], source[p]);
                } else {
                    destination[p] = source[p];
                }
            }
        };
        this.getType = function (o) {
            var _t;
            return ((_t = typeof(o)) == "object" ? o == null && "null" || Object.prototype.toString.call(o).slice(8, -1) : _t).toLowerCase();
        };
        this.empty = function (v) {
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
        };
        //加载状态框
        this.initPopupBox = function () {
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
        };
        this.setPopupBox = function (str, type, callback) { //状态框设置
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
        }
        this.toggleGgArea = function(f){
            if(!!f && this.ggIsOut) return;
            if (this.ggIsOut) {
                this.ggIsOut = false;
                $('#ggIcon').removeClass('gcfc_icon_h');
                $('#ggMain').slideUp(300);
            } else {
                this.ggIsOut = true;
                $('#ggIcon').addClass('gcfc_icon_h');
                $('#ggMain').slideDown(300);
            }
        }

        // 随机数
        this.random = function(m, n){
            return Math.floor( Math.random() * ( n || 9999 ) + ( m || 1 ) );
        }
}

$().ready(function () {
    window.dc = new Sportery();
    dc.init(lotteryId);
    dc.jiezhi = (function (lotId) {
        var stat = $.trim($.ajax({url:"/lottery/checkLottery.action?lotteryId=" + lotId, async:false }).responseText);
        var cov = '<div class="cover"></div>';
        if (stat == "true")return false;
       /* $("body").append(cov);
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
})