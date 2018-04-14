function wait(milliseconds)
{
	let start = new Date().getTime();
	while(true)
	{
		if ((new Date().getTime() - start) > milliseconds)
		{
			break;
	  	}
	}
}
