/***********************ajax部分**********************/
	function processData(data) {
		if(s_lock < 0){
			debugger;
			if(mode == 1){
				//单人模式
				s_lock++;
				hori = data.hori-0;
				vert = data.vert-0;
				map = new Array();
				for(var i = 0; i < vert; i++){
					map[i] = new Array();
					for(var j = 0; j < hori; j++) {
						map[i][j] = (data.map[i*hori + j] - 0);//number类型的各位置信息
					}
				}
				setSuslik();
				//alert(suslik);
				//绘制地图
				appendBlocks(hori, vert, map);
				draw(hori,vert, map);
				$(window).resize(function() {
					draw(hori,vert, map);
				});
				one_player_start();
			}
			if(mode == 2){
				//
				s_lock++;
				hori = data.hori-0;
				vert = data.vert-0;
				map = new Array();
				for(var i = 0; i < vert; i++){
					map[i] = new Array();
					for(var j = 0; j < hori; j++) {
						map[i][j] = (data.map[i*hori + j] - 0);//number类型的各位置信息
					}
				}
				setSuslik();
				//alert(suslik);
				//绘制地图
				appendBlocks(hori, vert, map);
				draw(hori,vert, map);
				$(window).resize(function() {
					draw(hori,vert, map);
				});
				two_player_start();
			}
		}
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

	function ajax(mode) {
		var url = "json/map_mode" + mode + ".json";
		var client = new XMLHttpRequest();
		client.onreadystatechange = handler;
		client.open('GET', url);
		client.send();
	}

/************************ajax部分结束******************************/

$(document).ready(function(){
	$(".play").click(function(){
		debugger;
		s_lock = -1;
		$(".welcome").slideUp(350);
		$(".options").slideDown(1000);
		$(".options div:eq(0)").click(function(){//单人游戏
			if(s_lock < 0){
				mode = 1;
				$(".options").css("display", "none");
				//websocket
				 //socket.emit('mode', "1");
				//ajax
				ajax(1);
			}
		});
		$(".options div:eq(1)").click(function(){//双人游戏
			if(s_lock < 0){
				mode = 2;
				$(".options").css("display", "none");
				//websocket
				//socket.emit('mode', "2");
				//ajax
				ajax(2);
			}
		});
		$(".options div:eq(2)").click(function(){//联网模式
			if(s_lock < 0){
				mode = 3;
				$(".options").css("display", "none");
				//websocket
				//socket.emit('mode', "3");
				alert("不会在github上配置服务器 QAQ\n请期待展示环节(*^__^*) ……");
				$(".options").slideDown(1000);
				s_lock++;
			}
		});
	});
	$(".help").click(function(){
		$(".helpbg").fadeIn(500, function(){
			$(".helpbg").click(function(){
				$(".helpbg").fadeOut(500);
			})
		})
	})
})

function one_player_start(){
	var on = 0;//游戏未开始
	$(".timebar").fadeIn(500);
	$(".players img:eq(0)").fadeIn(500);//player1

	//草坪点击事件
	$(".grass").click(function(e){
		if(on == 0){
			time_run();//第一次点击grass，开始计时
			on = 1;//游戏已经开始
		}
		var click_hori = this.id.split("")[1] - 0;//水平坐标
		var click_vert = this.id.split("")[0] - 0;//竖直坐标

		if(suslik[0] == click_vert && suslik[1] == click_hori){//找到地鼠， 游戏结束
			$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/suslik.png");
			clearInterval(timer);
			clearTimeout(timeOut);
			$(".timebar").hide();
			//alert("唉呀妈呀抓到了！游戏结束 =_=");
			//显示成功界面
			$(".winlosebg").attr({"src": 'images/win.png'});
			$(".winlose").slideDown(1000); 
			$(".winlose div:eq(0)").click(function(){//再来一局
				$(".winlose").css("display", "none");
				appendBlocks(hori, vert, map);
				draw(hori, vert, map);
				resetTimer();
				resetTool();
				s_lock = -1;
				$(".options div:eq(0)").click();
			});
			$(".winlose div:eq(1)").click(function(){//返回菜单
				$(".winlose").css("display", "none");
				appendBlocks(hori, vert, map);
				draw(hori, vert, map);
				resetTimer();
				resetTool();
				if($(".map").children().length != 0){
					$(".map").children().remove();
				}
				$(".welcome").slideDown(350);
			});
		}
		else{//未找到地鼠

			//判断道具
			if(map[click_vert][click_hori] == 2){
				map[click_vert][click_hori] = 1;
				if(tool2){
					//修改右侧框数字
					tool2++;
					$(".tool_num:eq(0)")[0].innerText = tool2;
				}
				else{
					//提示得到道具二
					tool2++;
					$(".toolbar_right img:eq(0)").css("opacity", "1");
					$(".tool_num:eq(0)")[0].innerText = tool2;

					$(".toolalert").attr("src", "images/gettool2.jpg");
					$(".toolalert").fadeIn(500, function(){
						$(".toolalert").click(function(){
							$(".toolalert").fadeOut(500);
						})
					})
				}
			}
			if(map[click_vert][click_hori] == 3){
				map[click_vert][click_hori] = 1;
				if(tool3){
					//修改右侧框数字
					tool3++;
					$(".tool_num:eq(1)")[0].innerText = tool3;
				}
				else{
					//提示得到道具3
					tool3++;
					$(".toolbar_right img:eq(1)").css("opacity", "1");
					$(".tool_num:eq(1)")[0].innerText = tool3;

					$(".toolalert").attr("src", "images/gettool3.jpg");
					$(".toolalert").fadeIn(500, function(){
						$(".toolalert").click(function(){
							$(".toolalert").fadeOut(500);
						})
					})
				}
			}
			/****************特效：被点击的草皮翻开，显示数字****************/
			var num_neighbor = near(click_vert, click_hori);//由周围地鼠的个数

			//变草为土,2s后变为草
			//$(this.firstElementChild).fadeTo(500, 0.7, function(){
				$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/soil"+(num_neighbor+"")+".png");
				//$("#"+(click_vert+"")+(click_hori+"")+" img").css("opacity", 1);
			//})
			setTimeout(function(){
				$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/grass.png");
				$("#"+(click_vert+"")+(click_hori+"")+" img").fadeIn(3000);
			}, 2000);

			/********************特效部分结束******************/

			//地鼠移动一步
			debugger;
			getSuslik(click_vert,click_hori, suslik);
			//地鼠移动一步结束
			
		}


	})

	//道具使用事件
	$(".toolbar_right img:eq(0)").click(function(){
		//使用道具2
		if(tool2 > 0){
			tool2--;
			$(".tool_num:eq(0)")[0].innerText = tool2;
			if(tool2 == 0){				
				$(".toolbar_right img:eq(0)").css("opacity", "0.7");
			}

			//使用效果：将不含地鼠的某一行变成石头
			while(1){
				var line = getRandom(vert);
				if(suslik[0] != line){
					break;
				}
			}
			for(var i = 0; i < hori; i++){
				$("#"+line+i).attr("class", "grass_stone stone");
				$("#"+line+i+" img").attr("src", "images/stone.png");
			}
		}
	})
	$(".toolbar_right img:eq(1)").click(function(){
		//使用道具3
		if(tool3 > 0){
			tool3--;
			$(".tool_num:eq(1)")[0].innerText = tool3;
			if(tool3 == 0){				
				$(".toolbar_right img:eq(1)").css("opacity", "0.7");
			}

			//使用效果: 显示地鼠此时所在行
			flick();
		}
	})
}



function two_player_start(){
	var player = 0;
	//debugger;
	$(".timebar").hide();
	$(".players img:eq(0), .players img:eq(1), .players img:eq(2)").fadeIn(500);//player1,player2,1号选点
	$(".players img:eq(3)").hide();
	$(".grass").click(function(){
		var click_hori = this.id.split("")[1] - 0;//水平坐标
		var click_vert = this.id.split("")[0] - 0;//竖直坐标
		//alert(hori +" "+ vert);

		if(suslik[0] == click_vert && suslik[1] == click_hori){//找到地鼠， 游戏结束
			$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/suslik.png");
			//alert(player+1+"号玩家获胜");
			//再来一局的时候地图需要重新生成    因部分变成了石头
			//显示成功界面
			$(".winlosebg").attr({"src": 'images/player'+(player+1)+'win.png'});
			$(".winlose").slideDown(1000);
			$(".winlose div:eq(0)").click(function(){//再来一局
				debugger;
				$(".winlose").css("display", "none");
				appendBlocks(hori, vert, map);
				draw(hori, vert, map);
				resetTool();
				s_lock = -1;
				$(".options div:eq(1)").click();
			});
			$(".winlose div:eq(1)").click(function(){//返回菜单
				$(".winlose").css("display", "none");
				debugger;
				appendBlocks(hori, vert, map);
				draw(hori, vert, map);
				resetTool();
				if($(".map").children().length != 0){
					$(".map").children().remove();
				}
				$(".welcome").slideDown(350);
			});
		}
		else{//未找到地鼠

			//判断道具
			if(map[click_vert][click_hori] == 2){
				map[click_vert][click_hori] = 1;
				if(tool2){
					//修改右侧框数字
					tool2++;
					$(".tool_num:eq(0)")[0].innerText = tool2;
				}
				else{
					//提示得到道具二
					tool2++;
					$(".toolbar_right img:eq(0)").css("opacity", "1");
					$(".tool_num:eq(0)")[0].innerText = tool2;

					$(".toolalert").attr("src", "images/gettool2.jpg");
					$(".toolalert").fadeIn(500, function(){
						$(".toolalert").click(function(){
							$(".toolalert").fadeOut(500);
						})
					})
				}
			}
			if(map[click_vert][click_hori] == 3){
				map[click_vert][click_hori] = 1;
				if(tool3){
					//修改右侧框数字
					tool3++;
					$(".tool_num:eq(1)")[0].innerText = tool3;
				}
				else{
					//提示得到道具3
					tool3++;
					$(".toolbar_right img:eq(1)").css("opacity", "1");
					$(".tool_num:eq(1)")[0].innerText = tool3;

					$(".toolalert").attr("src", "images/gettool3.jpg");
					$(".toolalert").fadeIn(500, function(){
						$(".toolalert").click(function(){
							$(".toolalert").fadeOut(500);
						})
					})
				}
			}

			/****************特效：被点击的草皮翻开，显示数字****************/
			var num_neighbor = near(click_vert, click_hori);//由周围地鼠的个数

			//变草为土
			//$("#"+(click_vert+"")+(click_hori+"")+" img").fadeTo(500, 0.7, function(){
				$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/soil"+(num_neighbor+"")+".png");
			//	$("#"+(click_vert+"")+(click_hori+"")+" img").css("opacity", 1);
			//})
			//变土为石             !!!!通知服务器端需要改地图
			map[click_vert][click_hori] = 0;
			$("#"+(click_vert+"")+(click_hori+"")).attr("class", "grass_stone stone");
			setTimeout(function(){
				$("#"+(click_vert+"")+(click_hori+"")+" img").attr("src", "images/stone.png");
			//	alert("现在由"+player+"号玩家选点")
			}, 2000);
			player = change_player(player);
			showArrow(player);

			/********************特效部分结束******************/

			//地鼠移动一步
			getSuslik(click_vert,click_hori, suslik);
		}
		
	})
	//道具使用事件
	$(".toolbar_right img:eq(0)").click(function(){
		//使用道具2
		if(tool2 > 0){
			tool2--;
			$(".tool_num:eq(0)")[0].innerText = tool2;
			if(tool2 == 0){				
				$(".toolbar_right img:eq(0)").css("opacity", "0.7");
			}

			//使用效果：将不含地鼠的某一行变成石头
			while(1){
				var line = getRandom(vert);
				if(suslik[0] != line){
					break;
				}
			}
			for(var i = 0; i < hori; i++){
				$("#"+line+i).attr("class", "grass_stone stone");
				$("#"+line+i+" img").attr("src", "images/stone.png");
			}
		}
	})
	$(".toolbar_right img:eq(1)").click(function(){
		//使用道具3
		if(tool3 > 0){
			tool3--;
			$(".tool_num:eq(1)")[0].innerText = tool3;
			if(tool3 == 0){				
				$(".toolbar_right img:eq(1)").css("opacity", "0.7");
			}

			//使用效果: 显示地鼠此时所在行
			flick();
		}
	})
}


//计算两点之间的曼哈顿距离
function distance(h1, h2, v1, v2){//h1,h2分别为水平坐标；v1,v2分别为竖直坐标
	res = Math.abs(h1-h2)+Math.abs(v1-v2);
	return res;
}

function resetTimer(){
	$(".timebar").css("width", "400px");
	clearInterval(timer);
	clearTimeout(timeOut);
}

function time_run(){
		//时间条状态
		var	widthdec = $(".timebar").width()/time/5;//单位时间减少的宽度
		timer = setInterval(function(){
			$(".timebar").css("width", ($(".timebar").width() - widthdec)+"px");
		}, 200);
	timeOut = setTimeout('timeup()', time*1000);
}
function timeup(){
	//时间到，游戏结束
	clearInterval(timer);
	$(".timebar").hide();
	//显示失败界面
	$(".winlosebg").attr({"src": 'images/lose.png'});
	$(".winlose").slideDown(1000); 
	$(".winlose div:eq(0)").click(function(){//再来一局
		$(".winlose").css("display", "none");
		appendBlocks(hori, vert, map);
		draw(hori, vert, map);
		resetTimer();
		s_lock = -1;
		$(".options div:eq(0)").click();
	});
	$(".winlose div:eq(1)").click(function(){//返回菜单
		$(".winlose").css("display", "none");
		appendBlocks(hori, vert, map);
		draw(hori, vert, map);
		resetTimer();
		if($(".map").children().length != 0){
			$(".map").children().remove();
		}
		$(".welcome").slideDown(350);
	});

}

//被点击点周围的地鼠数量
function near(click_vert, click_hori){
	var num = 0;
	if(click_vert - 1 >= 0){//上
		if(suslik[0] == click_vert-1 && suslik[1] == click_hori){
			num++;
		}
	}
	if(click_vert + 1 >= 0){//下
		if(suslik[0] == click_vert+1 && suslik[1] == click_hori){
			num++;
		}
	}
	if(click_hori - 1 >= 0){
		if(suslik[0] == click_vert && suslik[1] == click_hori-1){
			num++;
		}
	}
	if(click_hori + 1 >= 0){
		if(suslik[0] == click_vert && suslik[1] == click_hori+1){
			num++;
		}
	}
	return num;
}
function setSuslik(){
	while(1){
		suslik[1] = getRandom(hori);//水平坐标
		suslik[0] = getRandom(vert);//竖直坐标
		if(map[suslik[0]][suslik[1]] != 0){//suslik位置为grass
			break;
		}
	}										

}
function change_player(player){
	if(player == 1){
		return 0;
	}
	return 1;
}

function flick(){
	for(var i = 0; i < hori; i++){
		$("#"+suslik[0]+i).css("opacity", 0.1);
	}
	setTimeout(function(){
		for(var i = 0; i < hori; i++){
			$("#"+suslik[0]+i).css("opacity", 1);
		}
	}, 200)
	setTimeout(function(){
		for(var i = 0; i < hori; i++){
			$("#"+suslik[0]+i).css("opacity", 0.1);
		}
	}, 400)
	setTimeout(function(){
		for(var i = 0; i < hori; i++){
			$("#"+suslik[0]+i).css("opacity", 1);
		}
	}, 600)
}
function getSuslik(click_vert,click_hori, suslik){
	//寻找最大距离
	debugger;
	var max = 0;
	var dist = new Array();
	if(suslik[0] - 1 >= 0){
		if(map[suslik[0]-1][suslik[1]]){
			//可以上移
			dist[0] = distance(suslik[0]-1, click_vert, suslik[1], click_hori);
			if(dist[0] > max){
				max = dist[0];
			}
		}
	}
	if(suslik[0] + 1 < vert){
		if(map[suslik[0]+1][suslik[1]]){
			//可以下移
			dist[1] = distance(suslik[0]+1, click_vert, suslik[1], click_hori);
			if( dist[1]> max){
				max = dist[1];
			}
		}
	}
	if(suslik[1] - 1 >= 0){
		if(map[suslik[0]][suslik[1]-1]){
			//可以左移
			dist[2] = distance(suslik[0], click_vert, suslik[1]-1, click_hori);
			if( dist[2] > max){
				max = dist[2];
			}
		}
	}
	if(suslik[1] + 1 < hori){
		if(map[suslik[0]][suslik[1]+1]){
			//可以右移
			dist[3] = distance(suslik[0], click_vert, suslik[1]+1, click_hori);
			if(dist[3] > max){
				max = dist[3];
			}
		}
	}

	//地鼠移动位置到距离最大处
	if(max != 0){
		while(1){
			var random = getRandom(4);
			if(dist[random] == max){
				//4个方向中随机选取
				switch(random){
					case 0: //向上
						dire = 1;
						suslik[0] = suslik[0]-1;
						break;
					case 1: //向下
						dire = 2;
						suslik[0] = suslik[0]+1;
						break;
					case 2:	//向左	
						dire = 3;			
						suslik[1] = suslik[1]-1;
						break;
					case 3: //向右
						dire = 4;
						suslik[1] = suslik[1]+1;
						break;
				}
				break;
			}
		}
	}
	else{
		dire = 0;
	}
}

function showArrow(player){
	if(player == 0){
		$(".players img:eq(2)").fadeIn(500);
		$(".players img:eq(3)").fadeOut(500);
	}
	if(player == 1){
		$(".players img:eq(2)").fadeOut(500);
		$(".players img:eq(3)").fadeIn(500);
	}
	draw_window();
}
function resetTool(){
	tool2 = 0;
	tool3 = 0;
	$(".tool_num:eq(0)")[0].innerText = tool2;
	$(".tool_num:eq(1)")[0].innerText = tool3;
	$(".toolbar_right img:eq(0)").css("opacity", 0.5);
	$(".toolbar_right img:eq(1)").css("opacity", 0.5);

}