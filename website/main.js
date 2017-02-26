BLOCK_SIZE = 10000; //Number of characters!
SCROLL_BAR_HEIGHT = 475;

var position = 0;
var mouseY = 0;
var active = false;
var startingIndex = 0;
var startingPosition = 0;
var length = 600000; //Reset back to zero & uncomment lines below

var blocks = {};

$(document).ready(function(){
	
	var exponent = window.location.hash.replace(/\D/g,'');
	
	if( exponent == '' )
	{
		//window.location.href = "index.html";
	}
	
	//length = fetchSize(exponent);
	
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
			position = Math.min(length, Math.max( 0,
				startingPosition +
				delta * 10**(startingIndex - 1)
			));
			updateSliders();
		}
	});
	
	$(".scrollbar").mousedown(function(){
		active = true;
		startingIndex = $(this).index();
		startingPosition = position;
	});
	
	$(window).mouseup(function(){
		active = false;
	});
	
	$(window).resize(function(){
		update();
	});
	
});

function updateSliders(){
	console.log(position);
	$(".scroll-box").each(function( index ){
		$( this ).css("top",
			position * 1/10**(index - 1) % SCROLL_BAR_HEIGHT
		);
	});
}

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