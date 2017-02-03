/**
 *   rckui by @rckevin
 *   version 1.2
 *	 simple ui
 *	重新修整了每个插件的代码
 *
 */

;(function($){

/*-------------------------------------------------- nrck - tab --------------------------------------------------*/

	$.fn.nrcktab = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			onTab: $.noop   //tab切换时执行自定义函数,提供tab的index值
		}

		var options = $.extend(defaults,options);

		//base function
		return self.each(function(){
			var $this = $(this);
			var $tab = $this.children(".nrck-tab");
            var $menu = $tab.children(".tab-menu");
            var $body = $tab.children(".tab-body");

            $menu.children("ul").children("li.menu-block").on("click","a",function(){
            	var $nav = $(this);
            	var $parent = $nav.parent();
            	var flag = !$parent.hasClass("tab-now");
            	var index = $parent.index();
            	if(flag){
            		$parent.siblings().removeClass("tab-now");
            		$parent.addClass("tab-now");
            	}
            	$body.children(".body-block").siblings().removeClass("tab-now");
            	var $block = $body.children(".body-block").eq(index);
                $block.addClass("tab-now");

                options.onTab(index,$block);    //tab切换时执行自定义函数
            });
		});
		
	}


/*-------------------------------------------------- nrck - placeholder --------------------------------------------------*/

	$.fn.nrckplaceholder = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			showType: 1,
			inputOnFocus:$.noop,
			inputOnBlur:$.noop,
			setLineHeight: 30
		}

		var options = $.extend(defaults,options);

		//base function
		return self.each(function(){
			var $this = $(this);
			var str = $this.attr("nrcktip");
			var hasStr = str == undefined ? false : true;
			var hasPlaceholder = $this.parent().hasClass("nrck-placeholder");
			var flag = hasStr && !hasPlaceholder;
			if(flag){
				var $input = $this;
				$input.addClass("nrck-input-text");
				$input.wrap("<div class='nrck-placeholder'></div>");
				var $inputbox = $input.parent();
				$inputbox.append('<div class="placeholder-text">'+str+'</div>');
				var $inputText = $inputbox.find(".placeholder-text");
				var inputHeight = $inputbox.css("height");
				if(inputHeight == "0px"){
					inputHeight = options.setLineHeight + "px";
				}
				var fontSize = $input.css("font-size");
				var inputMl = parseInt($input.css("margin-left").split("px")[0]); //input左外间距
				var inputBl = parseInt($input.css("border-left-width").split("px")[0]); //input左边宽
				var inputPl = parseInt($input.css("padding-left").split("px")[0]); //input左内间距
				var inputPx = $input.position().left; //input相对于父级x坐标
				var inputBoxPx = inputMl + inputBl + inputPl + inputPx;
				$inputText.css({"font-size":fontSize,"line-height":inputHeight,"left":inputBoxPx+"px"});
				if($input.val() != ""){
					$inputText.hide();
				}

				//placeholder文字单击触发input聚焦
				$inputText.on("click",this,function(){
					$input.trigger("focus");
				});

				var showType = parseInt($input.attr("showType"));

				//input获取焦隐藏placeholder
				$input.on("focus",this,function(){
					switch(showType){
						case 1 : {
							$inputText.hide();
							break;
						}
						case 2 : {
							if(navigator.userAgent.indexOf("MSIE")!=-1){ //判断是否为IE浏览器
								$input.on("keydown",this,function(){
									$inputText.hide();
								});
							}else{
								$input.on("input",this,function(){
									$inputText.hide();
								});
							}
							break;
						}
						default : {
							$inputText.hide();
							break
						};
					}
				});

				//input恢复placeholder
				if(showType != 2){
					$input.on("blur",this,function(){
						var value = $input.val();
						if(value == ""){
							$inputText.show();
						}
					});
				}else{
					$input.on("keyup",this,function(){
						var value = $input.val();
						if(value == ""){
							$inputText.show();
						}
					});
				}
				$input.on("focus",this,function(){
					options.inputOnFocus();		//聚焦时触发自定义函数
				});

				$input.on("blur",this,function(){
					options.inputOnBlur();		//失去焦点时触发自定义函数
				});
			}
		});
		
	}

/*-------------------------------------------------- nrck - checkbox --------------------------------------------------*/

	$.fn.nrckcheckbox = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			checkStyle: 1,
			onCheck: $.noop   //check选中的自定义函数
		}

		var options = $.extend(defaults,options);

		//base function
		return self.each(function(){
			var $this = $(this);
            var type = $this.attr("type");
           	var isCheckBox = type == "radio" || type == "checkbox";
           	var hasCheckBlack = $this.parent().hasClass("nrck-check");
           	var flag = isCheckBox && !hasCheckBlack; //判断是否为checkbox并且没有进行过初始化
			if(flag){
				var $checkbox = $this;
				var name;
				var checkStyle = "check-style-" + options.checkStyle;
				switch(type){
	            	case 'radio' : {
	            		name = $checkbox.attr("name");
                		$checkbox.wrap("<div class='nrck-check radio-block "+checkStyle+"' cname='"+name+"'></div>");
	            		break;
	            	}
	            	case 'checkbox' : {
	            		$checkbox.wrap("<div class='nrck-check check-block "+checkStyle+"'></div>");
	            		break;
	            	}
	            	default : break;
	            }
	            $checkbox.parent().append("<div class='check-icon c-icon' onselectstart='return false'></div>"
	            	+"<div class='disable-icon checked c-icon' onselectstart='return false'></div>"
	            	+"<div class='disable-icon uncheck c-icon' onselectstart='return false'></div>");

	            //初始化判断是否选中
	            var $new_check = $checkbox.parent().find(".check-icon");
	            var $new_check_dischecked = $checkbox.parent().find(".disable-icon.checked");
	            var $new_check_disuncheck = $checkbox.parent().find(".disable-icon.uncheck");
	            if($checkbox.prop("disabled")){
	            	$new_check.hide();
	            	if($checkbox.is(':checked')){
		        		$new_check_dischecked.show();
		        	}else{
		        		$new_check_disuncheck.show();
		        	}
	            }
            	if($checkbox.is(':checked')){
	        		$new_check.addClass("checked" );
	        	}
	            
	        	//初始化后的单复选框绑定点击事件
	        	$new_check.delegate(this,"click",function(){
	        		switch(type){
		            	case 'radio' : {
		            		$("input[name="+name+"]").prop("checked",false);
	                    	$checkbox.prop("checked",true);
		            		break;
		            	}
		            	case 'checkbox' : {
		            		var flag =  $checkbox.is(':checked') ? false : true;
	                    	$checkbox.prop("checked",flag);
		            		break;
		            	}
		            	default : break;
		            }
		            $checkbox.trigger("change");
	        	});

	        	//原单复选框绑定change事件
	        	$checkbox.delegate(this,"change",function(){
	        		checkDisabled(this);
	        		switch(type){
		            	case 'radio' : {
		            		$("div[cname="+name+"] .check-icon").removeClass("checked");
	                    	$new_check.addClass("checked");
		            		break;
		            	}
		            	case 'checkbox' : {
		            		var value = $checkbox.prop("checked");
		            		if(value){
		            			$new_check.addClass("checked");
		            		}else{
		            			$new_check.removeClass("checked");
		            		}
		            		break;
		            	}
		            	default : break;
		            }
		            options.onCheck($checkbox);
	        	});

	        	//检测是否变更disabled属性
	        	function checkDisabled(obj){
	        		var $obj = $(obj);
	        		var disabled_flag = $obj.prop("disabled");
	        		var check_flag = $obj.prop("checked");
	        		$obj.parent().find(".c-icon").hide();
	        		if(disabled_flag){
	        			if(check_flag){
	        				$new_check_dischecked.show();
	        			}else{
	        				$new_check_disuncheck.show();
	        			}
	        		}else{
	        			$new_check.show();
	        		}
	        	}

	        	$checkbox.hide();
			}
		});
		
	}

/*-------------------------------------------------- nrck - select --------------------------------------------------*/
	$.fn.nrckselect = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			deValue: 0, //当默认值为0时则默认选中第一项
			reset: false,
			disabled: false, //是否重置selectbox
			showStyle: "fade",
			onChoose: $.noop   //select选择时执行自定义函数
		}

		var options = $.extend(defaults,options);

		//base function
		return self.each(function(){
			var $this = $(this);
			var hasSelect = $this.parent().hasClass("nrck-select");
			var reset = options.reset;
			var flag = !hasSelect || reset;
			if(flag){
				var $selectbox = $this;

				//重新初始化select
				if(reset){
					var $select_clone = $selectbox.clone();
					$selectbox.parent().after($select_clone);
					$selectbox.parent().remove();
					$selectbox = $select_clone;
				}

				//生成新的select
				var deValue = options.deValue;
				if(typeof(deValue) != "number" || deValue < 0 || deValue > $selectbox.get(0).options.length - 1 ){
					deValue = 0;
				}
				var deValue_text = deValue_text = $selectbox.find("option").eq(deValue).html();
				$selectbox.wrap("<div class='nrck-select' onselectstart='return false'></div>");
				var $parent = $selectbox.parent();
				$parent.append("<label class='select-disabled'></label>"
				 	+"<label class='select-value'>"+deValue_text+"</label>"
				 	+"<label class='select-icon'></label>"
				 	+"<ul class='select-body'></ul>");
				var $new_value = $parent.find(".select-value");
				var $new_disabled = $parent.find(".select-disabled")
				var $new_select = $parent.find(".select-body");
				var $new_select_icon = $parent.find(".select-icon");
				var select_len = $selectbox.get(0).options.length;
				for(var i = 0 ; i < select_len ; i ++) {
                    var value = $selectbox.find("option").eq(i).html();
                    if(i == deValue ){
                    	$new_select.append("<li class='select-item selected'>"+value+"</li>");
                    }else {
                    	$new_select.append("<li class='select-item'>"+value+"</li>");
                    } 
	            }
	            var $new_item = $parent.find(".select-item");

	            //select宽度设置
	            var font_size;
	            if($new_item.length == 0){
	            	font_size = 12;
	            }else{
	            	font_size = parseInt($new_item.css("font-size").split("px")[0]);
	            }
            	var itemlength = $selectbox.get(0).options.length;
            	var max_len = 0;
	            for (var i = 0 ; i < itemlength ; i++) {
	                var words_len = $selectbox.find("option").eq(i).html().length;
	                if(words_len>max_len){
	                    max_len = words_len;
	                }
	            }
	            var deValue_len = $new_value.html().length;
	            var max_len = max_len > deValue_len ? max_len : deValue_len;
	        	var width = (max_len + 2) * font_size + 20;
	        	$parent.css("width",width);

	        	//事件绑定
	        	$(document).delegate(this,"click",function(){
	        		selectClose($new_select,$parent);
	        	});

	        	$new_value.delegate(this,"click",function(event){
	        		event.stopPropagation();
	        		selectCloseOther($parent);
	        		if($parent.hasClass("select-open")){
	        			selectClose($new_select,$parent);
	        		}else{
	        			selectOpen($new_select,$parent);
	        		}
	        	});

	        	$new_select_icon.delegate(this,"click",function(event){
	        		event.stopPropagation();
	        		$new_value.trigger("click");
	        	})

	        	$new_item.delegate(this,"click",function(event){
	        		event.stopPropagation();
	        		var index = $(this).index();
        			$selectbox.get(0).selectedIndex = index;
                    $selectbox.change();
                    selectClose($new_select,$parent);
                    options.onChoose(index);
	        	});

	        	$selectbox.delegate(this,"change",function(){
	        		var index = $(this).get(0).selectedIndex ;
	        		var value = $selectbox.find("option").eq(index).html();
	        		$new_item.eq(index).addClass("selected").siblings().removeClass("selected");
	        		$new_value.html(value);
	        	});

	            $selectbox.hide();
			}
		});
		
		//交互效果
		function selectOpen(newItem,parent){
			switch(options.showStyle){
				case "fade" : {
					newItem.fadeIn();
					break;
				}
				case "slide" : {
					newItem.css({"top":"0","opacity":"0"});
					newItem.show().animate({top:"29px",opacity:"1"},300);
					break;
				}
				default : {
					newItem.show();
					break;
				}
			}
			parent.addClass("select-open");
		}

		function selectClose(newItem,parent){
			switch(options.showStyle){
				case "fade" : {
					newItem.hide();
					parent.removeClass("select-open");
					break;
				}
				case "slide" : {
					newItem.animate({top:"0",opacity:"0"},300,function(){$(this).hide();parent.removeClass("select-open");});
					break;
				}
				default : {
					newItem.hide();
					break;
				}
			}
		}

		function selectCloseOther(parent){
			var $selectOther = $(".nrck-select").not(parent);
			$selectOther.removeClass("select-open");
			var $selectOtherBody = $selectOther.find(".select-body");
			$selectOtherBody.hide();
		}
		
	}

/*-------------------------------------------------- nrck - dialog --------------------------------------------------*/

	$.fn.nrckdialog = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			width: "800px",
			height: "100%",
			background: "#ffffff",
			htmlCode: "",
			showStyle: "fade",
			targetId: "",
			dSize: "m",
			onInit: $.noop //初始化后自定义函数
		}

		var options = $.extend(defaults,options);

		var $parent = $(this);
		var position = $parent.css("position");
		var tag_name = $parent[0].tagName;
		if( position == "static"){
			$parent.css("position","relative");
		}
		$parent.css("overflow","hidden");
		
		//创建对话框
		var $dialog = $('<div class="nrck-dialog"></div>');
		$dialog.appendTo($parent);
		var $dialog_filter = $('<div class="dialog-filter"></div>');
		var $dialog_body = $('<div class="dialog-body dialog-'+ options.dSize +'"></div>');
		var $dialog_close = $('<div class="dialog-close"></div>');
		var $close_btn = $('<a class="icon" href="javascript:void(0);"></a>');
		$close_btn.appendTo($dialog_close);
		$dialog_filter.appendTo($dialog);
		$dialog_body.appendTo($dialog);
		$dialog_close.appendTo($dialog_body);
		if( tag_name != "BODY"){
			$dialog.css("position","absolute");
		}

		//导入html代码
		$dialog_body.append(options.htmlCode);

		//设置对话框样式
		switch(options.dSize){
			case "s" : {
				$dialog_body.css({
					"width" : options.width,
					"height" : options.height,
					"margin-left" : -options.width/2 + "px",
					"margin-top" : -options.height/2 + "px",
					"background" : options.background
				});
				break;
			}
			default : {
				$dialog_body.css({
					"width" : options.width,
					"height" : options.height,
					"background" : options.background
				});
				break;
			}
		}

		//关闭对话框
		$close_btn.on("click",this,function(){
			dialogClose($parent);
		});

		//显示dialog
		dialogOpen();
		options.onInit($dialog_body);

		//交互效果
		function dialogOpen(){
			switch(options.showStyle){
				case "fade" : {
					$dialog.fadeIn();
					break;
				}
				case "slide" : {
					var dialog_body_w = $dialog_body.width();
					var dialog_close_w = $dialog_close.width();
					var s = dialog_body_w + dialog_close_w;
					$dialog_body.css({"opacity":"0","right":-s});
					$dialog.fadeIn(300,function(){
						$dialog_body.animate({right:"0",opacity:"1"},300);
					});
					break;
				}
				case "throw" : {
					$dialog.fadeIn();
					break;
				}
				default : {
					$dialog.show();
					break;
				}
			}
		}

		function dialogClose(parent){
			switch(options.showStyle){
				case "fade" : {
					$dialog.fadeOut(300,function(){
						dialogRemove(parent);
					});
					break;
				}
				case "slide" : {
					var dialog_body_w = $dialog_body.width();
					var dialog_close_w = $dialog_close.width();
					var s = dialog_body_w + dialog_close_w;
					$dialog_body.animate({right:-s,opacity:"0"},300,function(){
						$dialog.fadeOut(300,function(){
							dialogRemove(parent);
						});
					});
					break;
				}
				case "throw" : {
					var dialog_body_w = $dialog_body.width();
					var dialog_close_w = $dialog_close.width();
					var targetId = options.targetId;
					var target_x,target_y
					if(targetId != ""){
						var $throwTarget = $("#"+targetId);
						target_x = $throwTarget.offset().left;
						target_y = $throwTarget.offset().top;
					}else{
						target_x = 0;
						target_y = 0;
					}
					var s = dialog_body_w + dialog_close_w;
					$dialog_body.animate({left:target_x,top:target_y,opacity:"0",width:0,height:0,margin:0},500,function(){
						$dialog.fadeOut(300,function(){
							dialogRemove(parent);
						});
					});
					break;
				}
				default : {
					$dialog.hide();
					dialogRemove(parent);
					break;
				}
			}
		}

		//重写remove方法
		$dialog_body.remove = function(){
			dialogClose($parent);
		}

		//移除弹窗
		function dialogRemove(parent){
			$dialog.remove();
			$parent.css("overflow","auto");
		}

		return $dialog_body
		
	}

	/*-------------------------------------------------- nrck - msg --------------------------------------------------*/

	$.fn.nrckmsg = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			background: "#ffffff",
			titleCode: "确认提示",
			textCode: "确认要进行此操作吗？",
			showStyle: "fade",
			onSure: $.noop   //确认时执行自定义函数
		}

		var options = $.extend(defaults,options);

		var $parent = $(this);
		var position = $parent.css("position");
		var tag_name = $parent[0].tagName;
		if( position == "static"){
			$parent.css("position","relative");
		}
		$parent.css("overflow","hidden");
		
		//创建对话框
		var $msg = $('<div class="nrck-msg"></div>');
		$msg.appendTo($parent);
		var $msg_filter = $('<div class="msg-filter"></div>');
		var $msg_body = $('<div class="msg-body"></div>');
		var $msg_close = $('<div class="msg-close"></div>');
		var $close_btn = $('<a class="icon" href="javascript:void(0);"></a>');
		$close_btn.appendTo($msg_close);
		$msg_filter.appendTo($msg);
		$msg_body.appendTo($msg);
		$msg_close.appendTo($msg_body);
		if( tag_name != "BODY"){
			$msg.css("position","absolute");
		}

		var $msg_head = $('<div class="msg-head"></div>');
		var $msg_title = $('<span class="msg-title"></span>');
		$msg_title.appendTo($msg_head);
		$msg_head.appendTo($msg_body);
		var $msg_text = $('<div class="msg-text"></div>');
		var $msg_content = $('<div class="msg-content"></div>');
		$msg_content.appendTo($msg_text);
		$msg_text.appendTo($msg_body);
		var $msg_submit = $('<a class="msg-submit nrck-button s1 mr100" href="javascript:void(0);">确认</a>');
		var $msg_cancel = $('<a class="msg-cancel nrck-button s2" href="javascript:void(0);">取消</a>');
		var $msg_active = $('<div class="msg-active"></div>');
		$msg_submit.appendTo($msg_active);
		$msg_cancel.appendTo($msg_active);
		$msg_active.appendTo($msg_body);

		//导入html代码
		$msg_title.append(options.titleCode);
		$msg_content.append(options.textCode);

		//设置对话框样式
		$msg_body.css({
			"background" : options.background
		});

		//关闭对话框
		$close_btn.on("click",this,function(){
			msgClose($parent);
		});

		//确认操作
		$msg_submit.on("click",this,function(){
			options.onSure();
			msgClose($parent);
		});

		//取消操作
		$msg_cancel.on("click",this,function(){
			msgClose($parent);
		});

		//显示msg
		msgOpen();

		//交互效果
		function msgOpen(){
			switch(options.showStyle){
				case "fade" : {
					$msg.fadeIn();
					break;
				}
				case "zoom" : {
					var msg_body_w = $msg_body.width();
					var msg_body_h = $msg_body.height();
					var msg_body_ml = $msg_body.css("margin-left");
					var msg_body_mt = $msg_body.css("margin-top");
					$msg_head.hide();
					$msg_text.hide();
					$msg_active.hide();
					$msg_close.hide();
					$msg_body.css({
						"width":"0",
						"height":"0",
						"margin-left":"0",
						"margin-top":"0",
						"opacity":"0"
					});
					$msg.fadeIn(300,function(){
						$msg_body.animate({
							width:msg_body_w,
							height:msg_body_h,
							marginLeft:msg_body_ml,
							marginTop:msg_body_mt,
							opacity:1
						},300,function(){
							$msg_head.fadeIn(100);
							$msg_text.fadeIn(100);
							$msg_active.fadeIn(100);
							$msg_close.fadeIn(100);
						});
					});
					break;
				}
				default : {
					$msg.show();
					break;
				}
			}
		}

		function msgClose(parent){
			switch(options.showStyle){
				case "fade" : {
					$msg.fadeOut(300,function(){
						msgRemove(parent);
					});
					break;
				}
				case "zoom" : {
					$msg_body.animate({opacity:"0"},300,function(){
						$msg.fadeOut(300,function(){
							msgRemove(parent);
						});
					});
					break;
				}
				default : {
					$msg.hide();
					msgRemove(parent);
					break;
				}
			}
		}

		//重写remove方法
		$msg_body.remove = function(){
			msgClose($parent);
		}

		//移除弹窗
		function msgRemove(parent){
			$msg.remove();
			$parent.css("overflow","auto");
		}

		return $msg_body
		
	}

/*-------------------------------------------------- nrck - prompt --------------------------------------------------*/

	$.fn.nrckprompt = function(options){
		//object clone
		var self = this;

		//set options
		var defaults = {
			textCode : "",
			waitTime : 1000
		}

		var options = $.extend(defaults,options);

		var $parent = $(this);
		var position = $parent.css("position");
		var tag_name = $parent[0].tagName;
		if( position == "static"){
			$parent.css("position","relative");
		}
		
		//创建对话框
		var $prompt = $('<div class="nrck-prompt"></div>');
		$prompt.appendTo($parent);
		var $prompt_text = $('<p class="prompt-text"></p>');
		$prompt_text.appendTo($prompt);
		if( tag_name != "BODY"){
			$prompt.css("position","absolute");
		}

		//显示prompt
		promptOpen();

		//交互效果
		function promptOpen(){
			$prompt.fadeIn(200,function(){
				var timeout = setTimeout(function(){
					$prompt.fadeOut(500,function(){
						clearTimeout(timeout);
						$prompt.remove();
					});
				},options.waitTime);
			});
		}

		//导入html代码
		$prompt_text.append(options.textCode);

		return $prompt
		
	}

	/*----- rck-graph -----*/

    /*功能实现部分*/
    $.fn.nrckgraph = function(options){

    	var defaults = {
	        valueArr: [25,45,30,1001,40,56,35],
	        valueArr2: [25,44,28,56,34,56,32],
	        nameArr: ['2015-04-02','2015-04-03','2015-04-04<br/>放假','2015-04-05','2015-04-06','2015-04-07','2015-04-08'],
	        tipArr: ['2015-04-04<br/>全班：21人<br/>到员：17人<br/>缺勤：4人','2015-04-03','2015-04-04<br/>放假','2015-04-05','2015-04-06','2015-04-07','2015-04-08'],
	        tipShow: [3,5]
	    };

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

            for(var i = 5; i >= 0 ; i -- ){
                unit_html = unit_html + '<li>'+minUnit+'</li>';
                minUnit = minUnit - unit;
                minUnit = (minUnit + '').indexOf('.')==-1 ? minUnit : minUnit.toFixed(1);
            }

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
                              '</div></div></div>'
            }
            $this.append('<div class="nrck-graph">'+
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
    }

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

