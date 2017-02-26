var SCROLL_BAR_HEIGHT = 475;
var DIGIT_WIDTH = 18;
var COEFFICIENT = 9;
var SCROLL_BOX_HEIGHT = 20;
var SCROLL_BUTTON_INTERVAL = 100;

var position = 0;
var mouseY = 0;
var active = false;
var startingIndex = 0;
var startingPosition = 0;
var length = 0;

var extern;

$(document).ready(function(){
	
	var exponent = window.location.hash.replace(/\D/g,'');
	
	if( exponent == '' )
	{
		window.location.href = "index.html";
	}
	
	extern = new Loader(exponent);
	length = extern.getLength();
	
	if( length == -1 )
	{
		window.location.href = "index.html";
	}
	
	//Set height of scroll stops
	$(".scroll-stopper").each(function( index ){
		$( this ).css("top", maxPos(index) % SCROLL_BAR_HEIGHT );
	});
	
	update();
	
	$(document).mousemove(function(e){
		if( !active )
		{
			mouseY = e.pageY;
		}
		else
		{
			var delta = e.pageY - mouseY;
			setPos( startingPosition + delta * invPos(startingIndex) );
			update();
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
	
	var upButtonInterval;
	$("#btn-up").mousedown(function() {
		upButtonInterval = setInterval(scrollUp, SCROLL_BUTTON_INTERVAL);
	}).mouseup(function() {
		clearInterval(upButtonInterval);
	}).mouseleave(function() {
		clearInterval(upButtonInterval);
	});;
	var downButtonInterval;
	$("#btn-down").mousedown(function() {
		downButtonInterval = setInterval(scrollDown, SCROLL_BUTTON_INTERVAL);
	}).mouseup(function() {
		clearInterval(downButtonInterval);
	}).mouseleave(function() {
		clearInterval(downButtonInterval);
	});
	function scrollUp() {
		setPos(position - 1);
		update();
	}
	function scrollDown() {
		setPos(position + 1);
		update();
	}
	
});

function update(){
	updateSliders();
	updateContent();
}

function updateContent(){
	
	//Row contents
	var contentWidth = $(".digits").innerWidth();
	var digitsPerRow = Math.floor( contentWidth / DIGIT_WIDTH);
	var row = Math.floor( position / digitsPerRow );
	var percent = (position - row * digitsPerRow) / digitsPerRow;
	
	$(".digits").each(function( index ){
		$( this ).html(
			extern.getString(row * digitsPerRow, digitsPerRow));
		row += 1;
	});
	
	//Row position
	$(".digits").css("top", parseInt($(".digits").css("height")) * -percent);
	
}

function updateSliders(){
	$(".scrollbar").each(function( index ){
		var max = maxPos(index);
		var posi = pos(index);
		$( this ).children(".scroll-box").css("top", posi % SCROLL_BAR_HEIGHT);
		if( posi >= max - (maxPos(index) % SCROLL_BAR_HEIGHT) )
		{
			$( this ).children(".scroll-stopper").css("display", "block");
		}
		else
		{
			$( this ).children(".scroll-stopper").css("display", "none");
		}
	});
}

function setPos(newPos)
{
	position = Math.min(length, Math.max( 0, newPos ));
}

function maxPos(index)
{
	return length * 1/COEFFICIENT**(index - 1);
}

function pos(index)
{
	return position * 1/COEFFICIENT**(index - 1);
}

function invPos(index)
{
	return COEFFICIENT**(index - 1);
}