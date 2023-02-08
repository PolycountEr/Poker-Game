Array.prototype.add = function(index, newitems)
{
	this.splice(index, 0, newitems);
}

Array.prototype.remove = function(index, howmany)
{
	if(typeof howmany == 'undefined')
	{
		howmany = 1;
	}
	this.splice(index, howmany);
}