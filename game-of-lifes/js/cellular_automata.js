var map = new Array();
var new_map = new Array();

//初始化两个地图数组，默认状态为dead(false)
function initMap(){
	for(var i = 0; i < height; i++){
		map[i] = new Array();
		for(var j = 0; j < width; j++){
			map[i][j] = 0;
		}
	}
	for(var i = 0; i < height; i++){
		new_map[i] = new Array();
		for(var j = 0; j < width; j++){
			new_map[i][j] = 0;
		}
	}
}

//随机化生成地图
function randomizeMap(){
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			$($(".cell")[i*60+j]).css({"background-color": "black"});
		}
	}
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			map[i][j] = getRandomBool();
		}
	}
}

//随机生成两种状态，细胞生死比为1:9
function getRandomBool(){
	var result = true;
	var random_num = Math.random();
	if(random_num >= 0.9)
		result = true;
	else
		result = false;
	return result;
}

//更新地图，重新绘图
function updateMap(){
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			new_map[i][j] = getNextState(i, j);
		}
	}
	for(var i = 0; i < height; i++){
		for(var j = 0; j < width; j++){
			if(map[i][j] == false && new_map[i][j] == true){
				$($(".cell")[i*60+j]).css({"background-color": "yellow"});
			}
			else if(map[i][j] == true && new_map[i][j] == false){
				$($(".cell")[i*60+j]).css({"background-color": "black"});
			}
			map[i][j] = new_map[i][j];			
		}
	}
}

//返回位置为(x,y)的细胞的下一刻的状态
function getNextState(x, y){
	var new_state = false;
	var sum = 0;
	sum += getLineSum(x, y) + getLineSum(x, (y+1)%width) + getLineSum(x, (y+width-1)%width);
	sum -= map[x][y];
	if (sum == 3)
		new_state = true;
	else if(sum == 2)
		new_state = map[x][y];
	else
		new_state = false;
	return new_state;
}

//返回位置为(x,y)的细胞及其上下两个细胞中活细胞数量之和
function getLineSum(x, y){
	var sum = 0;
	sum += map[x][y] + map[(x+height-1)%height][y] + map[(x+1)%height][y];
	return sum;
}

//开始游戏
function startGame(){

	randomizeMap();							//随机产生地图

	picTimer = setInterval(function(){		//定时更新地图及重绘
		updateMap();
	},100); //单位：毫秒
}

//停止游戏
function endGame(){
	clearInterval(picTimer);
}