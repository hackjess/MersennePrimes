function fetchBlock(exponent, block)
{
	console.log("Fetching " + exponent + '/' + block);
	var req = new XMLHttpRequest();
	req.open('GET', '' + exponent + '/' + block, false);
	req.overrideMimeType('text\/plain; charset=x-user-defined');
	req.send(null);
	
	if(req.status === 200)
	{
		var response = req.responseText;
		var outputString = "";
		for(var i = 0; i < response.length; i++)
		{
			var front = response.charcodeAt(i) & 0xF0 >> 4;
			var back  = response.charcodeAt(i) & 0x0F;
			
			if (front < 10){ outputString += front; }
			if (back  < 10){ outputString += back ; }
		}
		console.log("Fetched: " + outputString);
		return outputString;
	}
	console.log("Failure");
	return -1;
}

function fetchSize(exponent)
{
	console.log("Fetching size of " + exponent);
	var req = new XMLHttpRequest();
	req.open('GET', '' + exponent + '/len', false);
	req.send(null);
	
	if(req.status === 200)
	{
		console.log("Fetched " + req.responseText);
		return parseInt( req.responseText );
	}
	console.log("Failure");
	return -1;
}