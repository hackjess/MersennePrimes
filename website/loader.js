var FILE_PREPEND = "numbers/";
var BLOCK_SIZE = 10000;

function Loader(exponent) {
	this.exponent = exponent;
	
	//Length
	var req = new XMLHttpRequest();
	req.open('GET', FILE_PREPEND + this.exponent + '/len', false);
	req.send(null);
	if(req.status === 200)
	{
		this.length = parseInt( req.responseText );
	}
	else
	{
		this.length =  -1;
	}
	
	this.getLength = function()
	{
		return this.length;
	}
	
	this.dictionary = new Object();
	
	//fetchBlock
	this.fetchBlock = function(block)
	{
		//console.log("HERE");
		block = String(block);
		if( this.dictionary[block] === undefined )
		{
			console.log("fetch new");
			var req = new XMLHttpRequest();
			req.open('GET', FILE_PREPEND + this.exponent + '/' + block, false);
			req.overrideMimeType('text\/plain; charset=x-user-defined');
			req.send(null);
			
			if(req.status === 200)
			{
				var response = req.responseText;
				var outputString = "";
				for(var i = 0; i < response.length; i++)
				{
					var front = (response.charCodeAt(i) & 0xF0) >> 4;
					var back  = response.charCodeAt(i) & 0x0F;
					
					if (front < 10){ outputString += front; }
					if (back  < 10){ outputString += back ; }
				}
				this.dictionary[block] = outputString;
				return outputString;
			}
			return -1;
		}
		else
		{
			console.log("cache hit");
			return this.dictionary[block];
		}
	}
	
	//getString
	this.getString = function(start, selectionLength)
	{
		var start = Math.min(this.length, Math.max(0, start));
		var end = Math.min(this.length, Math.max(0, start + selectionLength));
		
		var beginBlock = Math.floor( start / BLOCK_SIZE );
		var endBlock = Math.floor( end / BLOCK_SIZE );
		
		blocks = "";
		for(var i = beginBlock; i <= endBlock; i++)
		{
			blocks += this.fetchBlock(i);
		}
		return blocks.substring(
			start - beginBlock * BLOCK_SIZE,
			start - beginBlock * BLOCK_SIZE + selectionLength );
	}
	
}