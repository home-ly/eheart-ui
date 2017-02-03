/*----- rck-tab -----*/
;(function($){
    /*变量定义部分*/
    var defaults = {
        fade: false,
        turnleft:false
    };

    /*功能实现部分*/
    $.fn.rcktab = function(option){
        var options = $.extend(defaults,option);
        if(!option){
        	options.render = null;
        }
        var $nav = $(this).find(".tab-menu ul li");
        var tn = 1 ;
        if(options.turnleft){
            var turnL = setInterval(turnleft,2000);
        }
        this.each(function(){
            /*基本切换功能*/
            var $tab = $(this).find(".rck-tab");
            var $menu = $tab.find(".tab-menu");
            var $body = $tab.find(".tab-body");
            $menu.find("ul").find("li").delegate("a","click",function(){
                var $parent = $(this).parent();
                if(!$parent.hasClass("tab-now")){
                    var flag = $parent.index();
                    $parent.siblings().removeClass("tab-now");
                    $parent.toggleClass("tab-now");
                    var $title = $tab.find(".tab-title");
                    if($title.length!=0){
                        var $pic = $body.find(".tab-blank").eq(flag).find("img");
                        if($pic.length!=0){
                            var str = $pic.attr("alt");
                            $title.html(str);
                        }
                    }
                    if(options.fade){
                        $body.find(".tab-blank").siblings().hide();
                        $body.find(".tab-blank").eq(flag).fadeIn();
                    }
                    $body.find(".tab-blank").siblings().removeClass("tab-now");
                    $body.find(".tab-blank").eq(flag).toggleClass("tab-now");
                }
                //执行自定义的函数
                if(typeof(options.render) === 'function'){
                    options.render($parent);
                }
            });
        });


        /*左轮播功能*/
        function turnleft(){
            var len = $nav.length;
            $nav.eq(tn).find("a").trigger("click");
            tn++;
            if(tn>=len){tn=0;}
        }
    };
})(jQuery);

/*----- rck-placeholder -----*/
;(function($){
	/*变量定义部分*/
    var defaults = {

    };

    /*功能实现部分*/
    $.fn.rckplaceholder = function(options){
    	var options = $.extend(defaults,options);
        return this.each(function(){
        	/*基本切换功能*/
        	if(_IE<=9&&_IE){
				var $inputbox = $(this);
				var str = $inputbox.attr("placeholder");
				if(str !== undefined){
					$inputbox.addClass("rck-input-text");
					$inputbox.wrap("<div class='rck-placeholder'></div>");
					var $parent = $inputbox.parent();
					var ml = parseInt($inputbox.css("margin-left").split("px")[0]);
					var bl = parseInt($inputbox.css("border-left-width").split("px")[0]);
					var bt = parseInt($inputbox.css("border-top-width").split("px")[0]);
					var bb = parseInt($inputbox.css("border-bottom-width").split("px")[0]);
					var pt = parseInt($inputbox.css("padding-top").split("px")[0]);
					var pb = parseInt($inputbox.css("padding-bottom").split("px")[0]);
					var pl = parseInt($inputbox.css("padding-left").split("px")[0]);
					var fl = $inputbox.position().left;
					var lh = $inputbox.height()+pt+pb+bt+bb;
					var px = pl + ml + bl + fl;
					$parent.append('<div class="placeholder-text">'+str+'</div>');
					var fx = $inputbox.css("font-size");
					var $pst = $parent.find(".placeholder-text");
					$pst.css({"left":px+"px","line-height":lh+"px","font-size":fx});
					$pst.delegate(this,"click",function(){
						$inputbox.trigger("focus");
					});
					if($inputbox.val() !== ""){
						$pst.hide();
					}
					$inputbox.delegate(this,"keydown",function(){
						var val = $(this).val();
						if(val !== ""){
							$(this).parent().find(".placeholder-text").hide();
						}else{
							$(this).parent().find(".placeholder-text").show();
						}
					});
					$inputbox.delegate(this,"keyup",function(){
						var val = $(this).val();
						if(val !== ""){
							$(this).parent().find(".placeholder-text").hide();
						}else{
							$(this).parent().find(".placeholder-text").show();
						}
					});
				}
			}
        });
    };
})(jQuery);

/*----- rck-checkbox -----*/

;(function($){
	/*变量定义部分*/
    var defaults = {
        radio: 0
    };

    /*功能实现部分*/
    $.fn.rckcheck = function(options){
    	var options = $.extend(defaults,options);
        return this.each(function(){
        	var $checkbox = $(this);
            var name;
            if(options.radio){
                name = $checkbox.attr("name");
                $checkbox.wrap("<div class='check_blank radio_blank' cname='"+name+"'></div>");
            }else{
                $checkbox.wrap("<div class='check_blank'></div>");
            }
            var edit = $checkbox.attr("edit");
            if(edit != "true"){
                $checkbox.parent().append("<div class='check_icon' onselectstart='return false'>&radic;</div>");
            }else{
                $checkbox.parent().append("<div class='check_icon' onselectstart='return false'>&nbsp;</div>");
            }
        	var $new_check = $checkbox.parent().find(".check_icon");
        	if($checkbox.is(':checked')){
        		$new_check.addClass("checked" );
        	}
            var f = options.radio;
        	$new_check.delegate(this,"click",function(){
                if(!f){
                    var flag =  $checkbox.is(':checked') ? false : true;
                    $checkbox.prop("checked",flag);
                    $checkbox.trigger("change");
                }else{
                    $("input[name="+name+"]").prop("checked",false);
                    $checkbox.prop("checked",true);
                    $checkbox.trigger("change");
                }
        	});
        	$checkbox.delegate(this,"change",function(){
                if(!f){
                	if($checkbox.is(':checked')){
                		$new_check.addClass("checked");
                	}else{
                		$new_check.removeClass("checked");
                	}
               }else{
                    $("div[cname="+name+"] .check_icon").removeClass("checked");
                    $new_check.addClass("checked");
               }
        	});
        	$checkbox.hide();
        });
    };
})(jQuery);

/*----- rck-selectbox -----*/

;(function($){
	/*变量定义部分*/
    var defaults = {

    };

    /*功能实现部分*/
    $.fn.rckselect = function(options){
    	var options = $.extend(defaults,options);
        return this.each(function(){
        	var $selectbox = $(this);
            $selectbox.wrap("<div class='select_blank' onselectstart='return false'></div>");
            var $parent = $selectbox.parent();
            $parent.append("<div class='select_box'><div class='disable_box'></div><div class='item_box'></div><div class='select_icon'><span class='icon'></span></div></div>");
            var $new_select = $parent.find(".select_box");
            var $item_box = $new_select.find(".item_box");
            var len = $selectbox.get(0).options.length + 1 ;
            for(var i = 0 ; i < len ; i ++) {
                var value;
                if(i==0){
                    value = $selectbox.find("option").eq(0).html();
                    $item_box.append("<div class='item'>"+value+"</div>");
                }else{
                    value = $selectbox.find("option").eq(i-1).html();
                    $item_box.append("<div class='item item_option'>"+value+"</div>");
                }
            }
        	var $new_item = $new_select.find(".item");
            var $disable_box = $new_select.find(".disable_box");
            var font_size = parseInt($item_box.find(".item").css("font-size").split("px")[0]);
            var itemlength = $selectbox.find("option").length;
            var max_font = 0;
            for (var i = 0 ; i < itemlength ; i++) {
                var next_font = $selectbox.find("option").eq(i).html().length;
                if(next_font>max_font){
                    max_font = next_font;
                }
            }
        	var width = max_font*font_size+45;
        	$new_select.find(".item").eq(1).addClass("item-checked");
        	$new_select.css("width",width);
        	$new_select.delegate(this,"click",function(event){
        		event.stopPropagation();
        		$(this).toggleClass("select_box_open");
        		$new_select.css("z-index","10002");
        	});
        	$new_item.delegate(this,"click",function(event){
        		event.stopPropagation();
        		var index = $(this).index();
        		if(index>0){
        			$new_select.removeClass("select_box_open");
        			var value = $(this).html();
        			$new_select.find(".item").eq(0).html(value);
        			$selectbox.get(0).selectedIndex = index-1;
                    $selectbox.change();
                    $new_select.css("z-index","9999");
        		}else{
        			$new_select.toggleClass("select_box_open");
        			$new_select.css("z-index","10002");
        		}
        	});
        	$selectbox.delegate(this,"change",function(){
        		var index = $(this).get(0).selectedIndex ;
        		var value = $new_select.find(".item").eq(index+1).html();
        		$new_select.find(".item").eq(0).html(value);
        		$new_select.find(".item").eq(index+1).addClass("item-checked").siblings().removeClass("item-checked");
        	});
        	$(document).delegate(this,"click",function(){
        		$new_select.removeClass("select_box_open");
        	});
            $disable_box.delegate(this,"click",function(event){
                event.stopPropagation();
            });
        	$selectbox.hide();
        });
    };
})(jQuery);

/*----- rck-circle -----*/
;(function($){
    /*变量定义部分*/
    var defaults = {
        point: 0.6
    };

    /*功能实现部分*/
    $.fn.rckcircle = function(options){
        var options = $.extend(defaults,options);
        return this.each(function(){
            $this = $(this);
            var $circle = $this.find(".rck-circle");
            var $crl = $circle.find(".circle-l").find(".cr");
            var $crr = $circle.find(".circle-r").find(".cr");
            $crl.hide();
            var $count = $circle.find(".circle-count");
            var point = options.point;
            var text = (point * 100).toFixed(0) + "%";
            $count.find(".num").html(text);
            $crl.addClass("circle-act");
            $crr.removeClass("circle-act").hide().show().addClass("circle-act");
            if(point>0.5){
                var min = ( point - 0.5 ) / 0.5;
                $crr.show();
                $crl.css({
                    "-webkit-animation-duration":min*2+"s",
                    "-webkit-transform":"rotate("+(min-1)*180+"deg)",
                    "animation-duration":min*2+"s",
                    "transform":"rotate("+(min-1)*180+"deg)"
                });
                if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
                    $crl.show();  
                }else if(isIE = navigator.userAgent.indexOf("MSIE")!=-1){
                    $crl.show(); 
                }else{
                    setTimeout(function(){
                        $crl.show();
                    },2000);
                }
            }else{
                var min = point / 0.5;
                $crr.css({
                    "-webkit-animation-duration":min*2+"s",
                    "-webkit-transform":"rotate("+(min-1)*180+"deg)",
                    "animation-duration":min*2+"s",
                    "transform":"rotate("+(min-1)*180+"deg)"
                });
            }
        });
    };
})(jQuery);

/*----- rck-week-picker -----*/
;(function($){
    /*变量定义部分*/
    var defaults = {
        
    };

    /*功能实现部分*/
    $.fn.rckweekpicker = function(options){
        var options = $.extend(defaults,options);
        return this.each(function(){
            $this = $(this);
            var $select = $this.find("select");
            var select_length = $select.find("option").length;
            // $select.html("");
            // for(var i = 0 ; i < 12 ; i++){
            //     var somedate = getSomeDate(new Date(),(i-5));
            //     var monDay = getMonday(somedate);
            //     var sunDay = getSunday(monDay);
            //     var stringDate = getStringDate(monDay,sunDay);
            //     $select.append('<option>'+stringDate[0]+'到'+stringDate[1]+'</option>');
            // }
            var $prev = $this.find(".form-link-prev");
            var $next = $this.find(".form-link-next");
            $prev.delegate(this,"click",function(){
                var index = $select.get(0).selectedIndex;
                if(index > 0){
                    $select.get(0).selectedIndex = index - 1;
                    $select.trigger("change");
                }
            });
            $next.delegate(this,"click",function(){
                var index = $select.get(0).selectedIndex;
                if(index < select_length){
                    if( !((index + 1) >= select_length)) {
                        $select.get(0).selectedIndex = index + 1;
                        $select.trigger("change");
                    }
                }
            });
        });
    };
    function getStringDate(starDate,endDate){
        var starString = starDate.format("yyyy-MM-dd");
        var endString = endDate.format('yyyy-MM-dd');
        return [starString,endString];
    }

    function getSomeDate(date,dayCount){
        var somedate = new Date(date.getTime()+dayCount*7*24*60*60*1000);
        return somedate;
    }

    function getMonday(date){
        var weekDay = date.getDay();
        var monDay = new Date(date.getTime()-(weekDay-1)*24*60*60*1000);
        return monDay;
    }

    function getSunday(monday){
        var sunDay = new Date(monday.getTime()+6*24*60*60*1000);
        return sunDay;
    }


})(jQuery);

/*----- rck-image -----*/
;(function($){
    /*变量定义部分*/
    var defaults = {

    };

    /*功能实现部分*/
    $.fn.rckimg = function(options){
        var options = $.extend(defaults,options);
        this.each(function(){
            var $img = $(this);
            $img.delegate(this,"click",function(event){
                event.stopPropagation();
                var url = $img.find("img").attr("src");
                var ph = $(window).height()*0.8;
                var html = '<div class="b-msg rckimgshower"><div class="fliter"></div><div class="msg-body msg-img" style="font-size:'+ph+'px;"><img src="'+url+'"/></div></div>';
                $("body").append(html);
            });
            $(document).delegate(this,"click",function(){
                $(".rckimgshower").fadeOut(300,function(){
                    $(this).remove();
                });
            });
        });
    };
})(jQuery);

/*----- rck-graph -----*/
;(function($){
    /*变量定义部分*/
    var defaults = {
        valueArr: [25,45,30,1001,40,56,35],
        valueArr2: [25,44,28,56,34,56,32],
        nameArr: ['2015-04-02','2015-04-03','2015-04-04<br/>放假','2015-04-05','2015-04-06','2015-04-07','2015-04-08'],
        tipArr: ['2015-04-04<br/>全班：21人<br/>到员：17人<br/>缺勤：4人','2015-04-03','2015-04-04<br/>放假','2015-04-05','2015-04-06','2015-04-07','2015-04-08'],
        tipShow: [3,5]
    };

    /*功能实现部分*/
    $.fn.rckgraph = function(options){
        var options = $.extend(defaults,options);
        return this.each(function(){
            $this = $(this);
            var unit_html = '',line_html = '',name_html = '',column_html = '';

            /*获取Unit上限*/
            var valueArr = new Array();
            valueArr = options.valueArr;
            var maxValue = Math.max.apply(Math,valueArr);
            var maxValue_length = Math.pow(10,(maxValue.toString().length-1));
            var maxUnit = Math.ceil(maxValue/maxValue_length)*maxValue_length;
            var minUnit = maxUnit;
            var unit = maxUnit/5;
            if(unit > 0){
            	while (minUnit >= 0) {
            		unit_html = unit_html + '<li>'+minUnit+'</li>';
            		minUnit = minUnit - unit;
            		minUnit = (minUnit + '').indexOf('.')==-1 ? minUnit : minUnit.toFixed(1);
            	}
            }
//            for(var i = valueArr.length; i > 1 ; i -- ){
//                unit_html = unit_html + '<li>'+minUnit+'</li>';
//                minUnit = minUnit - unit;
//                minUnit = (minUnit + '').indexOf('.')==-1 ? minUnit : minUnit.toFixed(1);
//            }

            for(var i = 0; i < 5 ; i ++ ){
                line_html = line_html + '<div class="line-box"></div>';
            }

            var nameArr = new Array();
            nameArr = options.nameArr;
            for(var i = 0 , length = nameArr.length ; i < length ; i ++ ){
                name_html = name_html + '<li>'+nameArr[i]+'</li>';
            }

            var pointArr = new Array();
            var pointArr2 = new Array();
            var valueArr2 = new Array();
            var tipArr = new Array();
            var tipShow = new Array();
            tipArr = options.tipArr;
            valueArr2 = options.valueArr2;
            tipShow = options.tipShow;

            /*计算柱状图百分比*/
            for(var i = 0 , length = valueArr.length ; i < length ; i ++ ){
                pointArr.push( valueArr[i] / maxUnit * 100 + "%");
                pointArr2.push( valueArr2[i] / valueArr[i] * 100 + "%");
            }

            for(var i = 0 , length = valueArr.length ; i < length ; i ++ ){
                var flag;
                var now_class = "";
                for(var j = 0 , len = tipShow.length ; j < len ; j ++ ){
                    flag = tipShow[j] == (i + 1);
                    if(flag){break;}
                }
                if(flag){
                    now_class = " fill-now";
                }
                column_html = column_html + '<div class="column-box'+now_class+'">'+
                              '<div class="column-filter" style="height:'+pointArr[i]+';">'+
                              '<div class="column-fill" style="height:'+pointArr2[i]+';"></div>'+
                              '<div class="column-tip">'+
                              '<p>'+tipArr[i]+'</p>'+
                              '<div class="tip-top"></div>'+
                              '</div></div></div>';
            }
            $this.append('<div class="rck-graph">'+
                '<div class="graph-x"></div>'+
                '<div class="graph-y"></div>'+
                '<div class="graph-unit"><ul>'+unit_html+'</ul></div>'+
                '<div class="graph-line">'+line_html+'</div>'+
                '<div class="graph-name"><ul>'+name_html+'</ul></div>'+
                '<div class="grahp-column">'+column_html+'</div>'+
                '</div>');
            $this.delegate(".column-tip","click",function(){
                $(this).hide();
            });
        });
    };
})(jQuery);

/*----- rck-msg -----*/
;(function($){
     $.fn.extend({
        rckmsg:function(str, time){
        	time = !time ? 3500 : time;
            $(this).append('<div class="rck-msg" onselectstart="return false">'+
                '<p >'+str+'</p></div>');
            $(this).find(".rck-msg").fadeOut(time,function(){
                $(this).remove();
            });
        },
        rckloading:function(str){
        	$(this).css("position","relative");
            $(this).append('<div class="rck-msg top-msg" onselectstart="return false">'+
                '<p ><span class="loading-icon"></span>'+str+'</p></div>');
        },
        removemsg:function(str){
            $(this).find(".rck-msg").remove();
        },
        selectdisable:function(flag){
            if(flag){
                $(this).find(".select_blank").find(".disable_box").show();
            }else{
                $(this).find(".select_blank").find(".disable_box").hide();
            }
            
        },
        rckdialog:function(id,title,html){ 
            var str = '<div id="'+id+'" class="b-dialog" style="display:none;">'
                        +'<div class="fliter"></div>'
                        +'<div class="dialog-body">'
                            +'<div class="blank-head bbe8e8e8">'
                                +'<p class="dialog-title">'+title+'</p>'
                            +'</div>'
                            +'<div class="blank-body blank-body-long">'+html+'</div>'  
                        +'</div>'
                        +'<label class="dialog-close">'
                            +'<a class="icon b_dialog_close" href="javascript:void(0);"></a>'
                        +'</label>'
                    +'</div>';
            $(this).append(str);
            var $dialog = $("#"+id);
            $dialog.fadeIn();
            var $close_but = $dialog.find(".dialog-close");
            $close_but.delegate("a","click",function(){
                $dialog.fadeOut(300,function(){$(this).remove();});
            });
        },
        removeDialog:function(id){
            $("#"+id).remove();
        },
        readPdf:function(url){
            $(this).find(".pdf-reader").remove();
            var str = '<div class="pdf-reader">'
                        +'<div class="filter"></div>'
                        +'<div class="pdf-body" id="pdf-body">'
                            +'<a class="pdf-close" href="javascript:void(0);"></a>'
                            +'<div id="pdf-main"></div>'
                        +'</div>'
                    +'</div>';
            $(this).css("position","relative").append(str);
            var $pdfReader = $(this).find(".pdf-reader");
            new PDFObject({ url: url }).embed("pdf-main");
            $pdfReader.fadeIn(300);
            $("body").css("overflow","hidden");

            var $pdfClose = $(this).find(".pdf-close");
            $pdfClose.delegate(this,"click",function(){
                $pdfReader.fadeOut(300,function(){
                    $(this).remove();
                    $("body").css("overflow","auto");
                });
            });
        }
     });    
})(jQuery);

function creatDialog(id,title,html){
    $("body").rckdialog(id,title,html);
}

function removeDialog(id){
    $("body").removeDialog(id);
}

//判断IE版本是否超过IE9;
var _IE = (function () {
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false;
} ());

//Date格式转换
 Date.prototype.format = function(format)
    {
    var o = {
    "M+" : this.getMonth()+1, //month
    "d+" : this.getDate(),   //day
    "h+" : this.getHours(),  //hour
    "m+" : this.getMinutes(), //minute
    "s+" : this.getSeconds(), //second
    "q+" : Math.floor((this.getMonth()+3)/3), //quarter
    "S" : this.getMilliseconds() //millisecond
    };
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
    format = format.replace(RegExp.$1,
    RegExp.$1.length==1 ? o[k] :
    ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
    };

$(function(){
	$("input").rckplaceholder();
    $("input[type='checkbox']").rckcheck({radio:false});
    $("input[type='radio']").rckcheck({radio:true});
    $(".form-week-picker").rckweekpicker();
	$("select").rckselect();
    $(".rck-imgbox").rckimg();
});

function rckinit() {
    $("input").rckplaceholder();
    $("input[type='checkbox']").rckcheck({radio:false});
    $("input[type='radio']").rckcheck({radio:true});
    $(".form-week-picker").rckweekpicker();
    $("select").rckselect();
    $(".rck-imgbox").rckimg();
}