/**
 * Created with IntelliJ IDEA.
 * User: clone
 * Date: 15-10-20 下午1:59
 * email: printf@126.com
 * To change this template use File | Settings | File Templates.
 */


define(function(require , exports , module){

          "use strict";


          //地图附件彩票店查询
          (function($){
                  "use strict";
                   var Ips = require('js/mapLocation.js').initMap({mid:'addMap'});
                   var Line = {
                             shopUrl:'/uc/betByO2O/getLotteryMerchants.action',
                             init : function(){
                                   var _this = this ;
                                   _this.bindEvent();
                             },
                             bindEvent : function(){
                                     var _this = this ;

                                     $("#edit").click(function(){
                                             $(".map_out").slideDown();
                                     });

                                     $("#searchOk").click(function(){
                                             Ips.getLatLng($("#address").val(),function(data){
                                                     _this.data = data ;
                                                     _this.getLotteryShops(data[0]);
                                             });
                                     });

                                     $("#closeMap").click(function(){
                                             $(".map_out").slideUp();
                                             $("#orderAddress").text((_this.pname || '')+''+(_this.cityname || '')+''+($("#address").val() || ''));
                                     })

                                     $(".amap_lib_placeSearch_poi").unbind().live('click',function(){
                                                 var n = $(this).html(), p = _this.data[n-1];
                                                 console.log(n+'-->'+p.name+'---lat:' + p.location.lat+'---lng:'+ p.location.lng);
                                                 $("#address").val(p.name);
                                                 if(p.pname == p.cityname){
                                                     _this.cityname = '';
                                                 }else{
                                                     _this.cityname = p.cityname || '';
                                                 };
                                                _this.pname = p.pname || '';

                                                _this.getLotteryShops(p);
                                     });
                             },
                             getLotteryShops : function(obj){
                                     var _this = this ,
                                         lat = obj.location.lat,
                                         lng = obj.location.lng;

                                     $.ajax({
                                          url:_this.shopUrl+'?latitude_longitude='+lng+','+lat,
                                          type:'post',
                                          data:[],
                                          success:function(rel){
                                                 if(!rel) return false ;
                                                 rel = JSON.parse(rel);
                                                 var s = _this.createLotShop(rel['merchantList']);
                                                 $("#lotShop").html(s);
                                          },error:function(){}

                                     });
                             },
                             createLotShop : function(data){
                                     var len = data.length,strHtml = '';
                                     for(var i = 0;i<len;i++){
                                           var ads = data[i];
                                           strHtml += '<span class="radio_con" >' +
                                               '<input type="radio" name="shop" phone="'+ads.phone+'" username="'+ads.username+'" merchant_no="'+ads.merchant_no+'" value="'+ads.address+'">' +
                                               '<var>地址：'+ads.address+'&nbsp;&nbsp;&nbsp;&nbsp;距离:'+ads.distance+'米</var>' +
                                               '</span>';
                                     };
                                     return strHtml ;
                             }
                   }.init();
          })(jQuery);
});