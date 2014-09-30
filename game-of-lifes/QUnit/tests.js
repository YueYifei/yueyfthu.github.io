var height=3, width=3;


test("RandomMapTest", function() {
    initMap();
    randomizeMap()
    var dead, alive;
    dead=0;alive=0;
    
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		if (map[i][j]) alive++;
		else dead++;
    equal( alive, 0, "Éú´æ");
    equal( dead, 9, "ËÀÍö");
});


test("checkOne", function() {
    initMap();
    map[0][0]=0;map[0][1]=0;map[0][2]=0;
    map[1][0]=0;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=0;map[2][2]=0;
    equal(getNextState(1, 1), false);

    
    map[0][0]=0;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=1;map[2][2]=0;
    equal(getNextState(1, 1), true);

    map[0][0]=0;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=1;map[1][2]=0;
    map[2][0]=0;map[2][1]=1;map[2][2]=0;
    equal(getNextState(1, 1), true);

    map[0][0]=1;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=1;map[1][2]=0;
    map[2][0]=0;map[2][1]=1;map[2][2]=0;
    equal(getNextState(1, 1), false);

    map[0][0]=0;map[0][1]=1;map[0][2]=1;
    map[1][0]=0;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=0;map[2][2]=0;
    equal(getNextState(1, 1), false);

    map[0][0]=0;map[0][1]=0;map[0][2]=0;
    map[1][0]=0;map[1][1]=1;map[1][2]=0;
    map[2][0]=0;map[2][1]=0;map[2][2]=0;
    equal(getNextState(1, 1), false);

});

test("CheckAll", function() {
    initMap();
    var output, ans;

    map[0][0]=0;map[0][1]=0;map[0][2]=0;
    map[1][0]=0;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=0;map[2][2]=0;
    updateMap();
    output='';
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		output+=map[i][j]?1:0;
    ans="000000000";
    equal(output, ans);
    
    map[0][0]=0;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=1;map[2][2]=0;
    updateMap();
    output='';
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		output+=map[i][j]?1:0;
    ans="111111111";
    equal(output, ans);

    map[0][0]=0;map[0][1]=1;map[0][2]=1;
    map[1][0]=0;map[1][1]=0;map[1][2]=0;
    map[2][0]=0;map[2][1]=0;map[2][2]=0;   
    updateMap();
    output='';
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		output+=map[i][j]?1:0;
    ans="000000000";
    equal(output, ans);
	
    map[0][0]=0;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=1;map[1][2]=0;
    map[2][0]=0;map[2][1]=1;map[2][2]=0;
    updateMap();
    output='';
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		output+=map[i][j]?1:0;
    ans="001110010";
    equal(output, ans);

    map[0][0]=1;map[0][1]=0;map[0][2]=1;
    map[1][0]=1;map[1][1]=1;map[1][2]=1;
    map[2][0]=1;map[2][1]=1;map[2][2]=1;
    updateMap();
    output='';
    for(var i = 0; i < height; i++)
	for(var j = 0; j < width; j++)
		output+=map[i][j]?1:0;
    ans="000000000";
    equal(output, ans);

});




