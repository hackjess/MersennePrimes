BLOCK_SIZE = 10000; //Number of characters!

var position = 0;
var subposition = 0.0;
var mouseY = 0;
var active = false;
var weight = 0;
var startingPos = [];

var blocks = {};

$(document).ready(function(){
	
	var exponent = window.location.hash.replace(/\D/g,'');
	
	if( exponent == '' )
	{
		//window.location.href = "index.html";
	}
	
	var length = fetchSize(exponent);
	
	if( length == -1 )
	{
		//window.location.href = "index.html";
	}
	
	update();
	
	$(document).mousemove(function(e){
		if( !active )
		{
			mouseY = e.pageY;
		}
		else
		{
			var delta = e.pageY - mouseY;
			$(".scroll-box").each(function( index ){
				$( this ).css("top",startingPos[index] + delta * index);
			});
		}
	});
	
	$(".scrollbar").mousedown(function(){
		active = true;
		$(".scroll-box").each(function( index ){
			startingPos[index] = parseInt( $( this ).css("top") );
		});
		weight = (6 - $(this).index()) * 10;
	});
	
	$(window).mouseup(function(){
		active = false;
	});
	
	$(window).resize(function(){
		update();
	});
	
});

function update(){
	
	/*var block = Math.floor(position / BLOCK_SIZE);
	if( !isInDict(blocks, block ) )
		blocks[block] = fetchBlock(exponent, block);
	if( !isInDict(blocks, block + 1) )
		blocks[block + 1] = fetchBlock(exponent, block + 1);
	
	var frontOffset = position % charsPerLine();
	
	var row = Math.floor( position / charsPerLine() );
	
	$("#content-1").html(blocks[block]);
	$("#content-2").html(blocks[block + 1]);*/
}

function charsPerLine(){
	//TODO
}

function heightPerLine(){
	//TODO
}

function isInDict(dict, name ) {
	for(var i = 0, len = dict.length; i < len; i++) {
		if( dict[ i ].key === name )
			return true;
	}
	return false;
}