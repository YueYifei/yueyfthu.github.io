
$(function(){
	/* =====================线路列表中间滚动banner特效===================== */
	var winWidth = $("#travel_focus").width(); //获取焦点图的宽度（显示面积）
	var len = $("#travel_focus ul li").length; //获取焦点图个数
	var txtHeight = $(".travel_btn_text").height(); //获取焦点文字宽度（显示面积）
	var txtLen = $(".travel_btn_text p").length; //获取焦点文字个数
	var index = 0;
	var picTimer;
	
  
	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#travel_focus .btn span").css("opacity",1).mouseenter(function() {
		index = $("#travel_focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseenter");
  
	//上一页、下一页按钮透明度处理
	$("#travel_focus .preNext").css("opacity",0.2).hover(function() {
		$(this).stop(true,false).animate({"opacity":"1"},300);
	},function() {
		$(this).stop(true,false).animate({"opacity":"0.2"},300);
	});
  
	//上一页按钮
	$("#travel_focus .pre").click(function() {
		index -= 1;
		if(index == -1) {index = len - 1;}
		showPics(index);
	});
  
	//下一页按钮
	$("#travel_focus .next").click(function() {
		index += 1;
		if(index == len) {index = 0;}
		showPics(index);
	});
  
	//计算出外围ul元素的宽度
	$("#travel_focus ul").css("width",winWidth * (len));
	$(".travel_btn_text").css("height",txtHeight * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#travel_focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},3000); //此3000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
	    ajax();
		var nowLeft = -index*winWidth; //根据index值计算ul元素的left值
		$("#travel_focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		$("#travel_focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#travel_focus .btn span").stop(true,false).animate({"opacity":"1"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
		
		
		var nowTxtTop = -index * txtHeight; //根据index值计算p元素的top值
		$(".travel_btn_text").stop(true,false).animate({"top":nowTxtTop},300);
		$('.travel_btn_text p').stop(true,false).animate(300).eq(index).stop(true,false).animate(300).css('width',winWidth);
	}
	/* =====================线路列表中间滚动banner特效===================== */


	//ajax获取图片地址
	var url = 'json/img-url.json';

	//将get回来的数据用js加入网页
	function processData(data) {
		var order = $(".on")[0].innerText - "0";
		img = $("li")[order-1].firstElementChild;
		$(img).attr("src", data["url"+order]);
	}

	function handler() {
		if (this.readyState == this.DONE) {
			if (this.status == 200) {
				try {
					processData(JSON.parse(this.responseText));
				} catch(ex) {
				    console.log(ex.message);
				}
			}
		}
	}

	function ajax() {
		var client = new XMLHttpRequest();
		client.onreadystatechange = handler;
		client.open('GET', url);
		client.send();//发送请求
	}
	
	$(document).ready(function(){//文档加载结束后初始化显示第一张图片
		ajax();
	});


})