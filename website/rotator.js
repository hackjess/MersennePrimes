var LINE_HEIGHT = 42;
var DIGIT_WIDTH = 18;


$(document).ready(function(){
	var DIV_WIDTH = document.getElementById("digits").offsetWidth; 
	var DIGITS_PER_LINE = Math.floor(DIV_WIDTH / DIGIT_WIDTH);

console.log(LINE_HEIGHT);
console.log(DIV_WIDTH);
console.log(DIGITS_PER_LINE);
});