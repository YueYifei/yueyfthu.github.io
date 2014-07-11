
$(function(){	
	debugger;
	//localStorage本地存储当前评论页数及当前屏幕在页面中的位置
	if(localStorage.currentPage){
		//localStorage.currentPage = 1;
		currentPage = localStorage.currentPage - 0;//将string转化为number
	}
	else{
		currentPage = 1;
		localStorage.currentPage = 1;
	}
	if(sessionStorage.currentHeight){
		//currentHeight = 1200;
		currentHeight = sessionStorage.currentHeight - 0;
	}
	else{
		currentHeight = 0;
		sessionStorage.currentHeight = 0;
	}

	var totalPage;
	function processData(data) {
		//添加总数
		$("#numtotal")[0].innerText = data.countTotal;
		totalPage = Math.floor(data.countTotal / 10) + 1;
		var length = $(".remarkPiece").length;
		if(data.count < length){ //将评论栏中多余的remarkPiece删掉
			for(var i = 0; i < length-data.count; i++){
				$(".remarkPiece")[0].remove();
			}
		}
		else{
			if(length < 10){//需要增加remarkPiece
				for(var i = 0; i < 10 - length; i++){

					//新建remarkPiece
					var docFrag = document.createDocumentFragment();
					docFrag.appendChild(document.createElement("div"));
					docFrag.firstElementChild.className = "remarkPiece";
					//var insertText = Template.load("/template/foo.html");
					var insertText = '<table><tr><td><div class = "photo"><img /></div><div class = "remarkPieceRight"><div class = "remark_info"><span class = "username"></span>　发表于<span class = "year"></span>年<span class = "month"></span>月<span class = "day"></span>日　<span class = "hour"></span>:<span class = "minute"></span></div><div class = "remark_content"><p></p></div><div class = "remark_option"><div class = "comment"><span></span>	<a>回复</a></div><div class = "agrees"><span></span>	<a>赞同</a></div></div></div></td></tr></table>'; 
					docFrag.firstElementChild.innerHTML = insertText;

					$(".remarkSection")[0].appendChild(docFrag);
				}
			}
		}
		//分条显示评论
		for(var i = 0; i < data.count; i++){
			$($(".photo")[i].firstElementChild).attr("src", data.remarks[i].photo);
			$(".username")[i].innerText = (data.remarks[i].author);
			var time = data.remarks[i].time.split(" ");
			$(".year")[i].innerText = time[0];
			$(".month")[i].innerText = time[1];
			$(".day")[i].innerText = time[2];
			$(".hour")[i].innerText = time[3];
			$(".minute")[i].innerText = time[4];
			$(".remark_content")[i].firstElementChild.innerText = data.remarks[i].content;
			$(".comment")[i].firstElementChild.innerText = data.remarks[i].comment;
			$(".agrees")[i].firstElementChild.innerText = data.remarks[i].agrees;
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

	function ajax(page) {
		page = page + "";
		var url = "json/remark" + page + ".json";
		var client = new XMLHttpRequest();
		client.onreadystatechange = handler;
		client.open('GET', url);
		client.send();
	}


	$(document).ready(function(){
		ajax(localStorage.currentPage);		
		//debugger;
	});

	$(".controlBar span:nth-child(1)").click(function(){//尾页
		ajax(totalPage);
		currentPage = totalPage;
		localStorage.currentPage = currentPage;
	})
	$(".controlBar span:nth-child(2)").click(function(){//下一页
		if(currentPage < totalPage){
			ajax(currentPage+1);
			currentPage += 1;
		localStorage.currentPage = localStorage.currentPage - 0 + 1;
		}
	})
	$(".controlBar span:nth-child(3)").click(function(){//上一页
		if(currentPage-1 > 0){
			ajax(currentPage-1);
			currentPage -= 1;
		localStorage.currentPage -= 1;
		}
	})
	$(".controlBar span:nth-child(4)").click(function(){//首页
		ajax(1);
		currentPage = 1;
		localStorage.currentPage = currentPage;
	})

	//设置cover封面，隐藏滚动条
	$("body").eq(0).css("overflow","hidden");
	$(".cover").css({"height": $(window).height(), "width": $(window).width(), "top": currentHeight, "margin": 0}).click(function(){
		$(".cover").fadeTo(500, 0, function(){
			$(".cover").css("z-index", -1);
			$("body").eq(0).css("overflow-y","visible");
		});
	})

	//记录当前时刻屏幕在页面中的位置，更新周期为100ms
	setInterval(function() {
		sessionStorage.currentHeight = $(window).scrollTop();
	},100); 

	//显示cover封面照片时禁止鼠标滚轮事件响应
	function disableMouseWheel(){
		if(document.addEventListner){
			document.addEventListner('DOMMouseScroll',scrollFunc, false);
		}
		window.onmousewheel = document.onmousewheel = scrollFunc;
	}
	function scrollFunc(evt){
		return true;
	}
	window.onload = disableMouseWheel;

})