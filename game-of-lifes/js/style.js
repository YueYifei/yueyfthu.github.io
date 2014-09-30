
$(document).ready(function(){
	var map_area = document.getElementById("map_area");
	for(var i = 0; i < width*height; i++){
		var new_div = document.createElement('div');
		$(new_div).addClass("cell");
		$(new_div).attr("id", "cell_"+i);
		map_area.appendChild(new_div);
	}
})

$(document).ready(function(){
	draw_window();
	$(window).resize(function() {
		draw_window();
	})
})
function draw_window(){
	$(".sidebar").css({"height": $(window).height()});
	$(".cell").css({"height": "10px", "width": "10px", "margin": "1px", "float": "left"});
	$("#map_area").css({"position": "absolute", "left": ($(window).width()+250-722)/2+"px", "top": ($(window).height()-485)/2+"px"});
	
}