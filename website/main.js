BLOCK_SIZE = 10000;

$(document).ready(function(){
	
	var exponent = window.location.hash.replace(/\D/g,'');
	var length = fetchSize(exponent);
	
	if( length == -1 )
	{
		window.location.href = "index.html";
	}
	
	var blockA_index = 0;
	var blockA = fetchBlock(exponent, blockA_index);
	
	$(window).resize(function(){
		
	});
	
});