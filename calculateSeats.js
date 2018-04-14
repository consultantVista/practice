function calculateSeats(x)
{
	$(`#container${x}`).append(`<br/>`);
	$(`#container${x}`).append(`<h4>The distribution of seats is the following:</h4>`);
	calcVotes1(x);
	calcHasel1(x);
	calcSeats1(x);
	calcVotes2(x);
	calcHasel2(x);
	calcSeats2(x);
	calcRemainingSeats(x);
	calcRemainders(x);
	calcSeatsFinal(x);
}

function calcVotes1(x)
{
	votes1 = 0;
	for (let i = 0; i < nLists; i++)
	{
		votes1 = parseInt(votes1) + parseInt(lists[i].numberOfVotes);
	}
	printCalcVotes1(x);
}

function calcHasel1(x)
{
	hasel1 = parseInt(votes1 / district.getSeatsNumberByName(selectedDistrict));
	printCalcHasel1(x);
}

function calcSeats1(x)
{	
	for (let i = 0; i < nLists; i++)
	{
		seats[i] = parseInt(lists[i].numberOfVotes / hasel1);
	}
	printCalcSeats1(x);
}

function calcVotes2(x)
{
	votes2 = votes1;
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] === 0)
		{
			votes2 = votes2 - lists[i].numberOfVotes;
		}
	}
	printCalcVotes2(x);
}

function calcHasel2(x)
{
	hasel2 = parseInt(votes2 / district.getSeatsNumberByName(selectedDistrict));
	printCalcHasel2(x);
}
	
function calcSeats2(x)
{	
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] != 0) 
		{
			seats[i] = parseInt(lists[i].numberOfVotes / hasel2);
		}
	}
	printCalcSeats2(x)
}

function calcRemainingSeats(x)	
{
	remainingSeats = district.getSeatsNumberByName(selectedDistrict);
	for (let i = 0; i < nLists; i++)
	{
		remainingSeats = parseInt(remainingSeats) - seats[i];
	}
	printCalcRemainingSeats(x);
}

function calcRemainders(x)	
{
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] == 0)
		{
			remainders[i] = parseInt(0);
		}
		else
		{
			remainders[i] = parseInt(lists[i].numberOfVotes - seats[1] * hasel2);
		}
	}
	printCalcRemainders(x);
}

function calcSeatsFinal(x)
{
	for (let i = 0; i < remainingSeats; i++)
	{
		let maxRemainders = parseInt(0);
		let maxRemaindersIndex;
		for (let j = 0; j < nLists; j++)
		{
			if (remainders[j] > maxRemainders)
			{
				maxRemainders = remainders[j];
				maxRemaindersIndex = parseInt(j);
			}
		}
		seats[maxRemaindersIndex]++;
	}
	printCalcSeatsFinal(x);
}