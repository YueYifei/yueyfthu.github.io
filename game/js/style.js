//设定game_area位置
$(document).ready(function(){
	draw_window();
	$(window).resize(function() {
		draw_window();
	})

})

//向游戏区添加草皮、石块变量
function appendBlocks(num_hori, num_vert, map){//水平格子数，竖直格子数，位置
	if($(".map").children().length != 0){
		$(".map").children().remove();
	}
	for(var i = 0; i < num_hori * num_vert; i++){
		var newdiv = document.createElement("div");
		var newimg = document.createElement("img");
		$(newdiv).attr("class", "grass_stone");
		$(newdiv).append(newimg);
		$(".map").append(newdiv);
		if(map[Math.floor(i/num_hori)][i%num_hori] == 0){//该处为石块
			$(newimg).attr("src", "images/stone.png");
			$(newdiv).addClass("stone");
		}
		else if(map[Math.floor(i/num_hori)][i%num_hori] != 0){//该处为草皮
			$(newimg).attr("src", "images/grass.png");
			$(newdiv).addClass("grass");
			$(newdiv).attr("id", (Math.floor(i/num_hori)+"")+(i%num_hori+""));
		}
	}
}

//绘制地图
function draw(num_hori, num_vert, map){//水平格子数，竖直格子数，位置
	//debugger;
	$(".grass_stone").css({"float": "left", "margin": 0, "height": "50px"});
	$(".map").css({"position": "absolute", "z-index": 50, "width":　(50*num_hori)+"px", "height":　(50*num_vert) +"px", "top": ($(window).height()-$(".headbar").height()-50*num_vert)/2+$(".headbar").height(), "left": ($(window).width()-$(".toolbar_right").width()-50*num_hori)/2});
	
}

function draw_window(){
	$(".toolbar_right img, .toolbar_right div").css({"width": $(".toolbar_right").width()});
	$(".toolbar_right span").css({"height": $(".toolbar_right img").height()/2, "width": $(".toolbar_right").width()/3, "top": $(".headbar").height()+$(".horibar").height()+$(".toolbar_right img").height()/2});
	$(".toolbar_right span:eq(1)").css({"top": $(".headbar").height()+$(".horibar").height()+$(".toolbar_right img").height()*3/2});
	$(".game_bott").css({"width": $(window).width()});//设置该宽度要在其他设置值之前
	$(".welcome, .welcomebg").css({"height": $(window).height(), "width": $(window).width()});
	$(".headbar img").css({"overflow": "hidden", "position": "absolute", "left": ($(window).width()-$(".headbar img").width())/2});
	$(".game_area, .toolbar_right, .vertbar").css({"height": $(window).height() - $(".headbar").height() - $(".horibar").height()});
	$(".timebar").css({"position": "absolute", "top": ($(".game_area").height()*0.1+$(".headbar").height()) + $(".horibar").height(), "left": ($(".game_area").width()-$(".toolbar_right").width()-$(".timebar").width())*0.5+"px", "height": "20px"});
	$(".players").css({"position": "absolute", "bottom": 0, "height": "200px", "left": "100px", "right": $(".toolbar_right").width()+$(".vertbar").width()+100});
	$(".helpbg").css({"left": ($(window).width()-$(".helpbg").width())/2, "top": ($(window).height()-$(".helpbg").height())/2});
	$(".toolalert").css({"left": ($(window).width()-$(".toolalert").width())/2, "top": ($(window).height()-$(".toolalert").height())/2});
	draw_result();
	draw_options();
}
function draw_result(){
	$(".winlose, .winlosebg").css({"z-index": 100, "width": $(window).width(), "height": $(window).height()});
	$(".return").css({"left": ($(window).width()-500-$(".play_again").width())/2})
	$(".play_again").css({"right": ($(window).width()-500-$(".play_again").width())/2})
}

function draw_options(){
	$(".optionsbg").css("left", ($(window).width()-$(".optionsbg").width())/2);
	$(".options div").css("left", ($(window).width()-$(".one_player").width())/2);
}