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





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function findWinners(x)
{
    calcTotalVotes(x);
    formSortedCandList(x);
    determineWinners(x);
}

function calcTotalVotes(x)
{
    for (i = 0; i < district.getSecDistrictDataByName(selectedDistrict).length; i++)
    {
        let y = 0;
        for (let j = 0; j < nLists; j++)
	    {
		    for (let k = 0; k < lists[j].numberOfCandidates; k++)
		    {
                if (district.getSecDistrictDataByName(selectedDistrict)[i][0] == lists[j].candidates[k].secDistrict)
                {
					y += parseInt(lists[j].candidates[k].numberOfVotes)
                }
		    }
        }
        totalVotes.push(y);
	}
	printCalcTotalVotes(x);
}

function formSortedCandList(x)
{
	let candList = new Array;
	let count = parseInt(0);
    for (i = 0; i < district.getSecDistrictDataByName(selectedDistrict).length; i++)
    {
        for (let j = 0; j < nLists; j++)
	    {
            if (seats[j] != 0)
            {
		        for (let k = 0; k < lists[j].numberOfCandidates; k++)
	    	    {
                    if (district.getSecDistrictDataByName(selectedDistrict)[i][0] == lists[j].candidates[k].secDistrict)
                    {
						let ratio = parseFloat(lists[j].candidates[k].numberOfVotes) / parseFloat(totalVotes[i]) * 100;
						candList[count] = {};
						candList[count].nameOfCandidate = lists[j].candidates[k].name;
						candList[count].sectOfCandidate = lists[j].candidates[k].sect;
						candList[count].secDistrictOfCandidate = lists[j].candidates[k].secDistrict;
						candList[count].numberOfVotes = lists[j].candidates[k].numberOfVotes;
						candList[count].ratioOfCandidate = ratio;
						candList[count].nameOfList = lists[j].name;
						candList[count].numberOfList = j;  
						count++;
                    }              
                }
		    }
        }
    }
    for (let i = 0; i < candList.length; i++)
	{
        let max = -1;
        let index = -1;
        for (let j = 0; j < candList.length; j++)
    	{
            if (candList[j].ratioOfCandidate > max)
            {
                max = candList[j].ratioOfCandidate;
                index = j;
            }
        }
		sortedCandList[i] = {};
		sortedCandList[i].nameOfCandidate = candList[index].nameOfCandidate;
		sortedCandList[i].sectOfCandidate = candList[index].sectOfCandidate;
		sortedCandList[i].secDistrictOfCandidate = candList[index].secDistrictOfCandidate;
		sortedCandList[i].numberOfVotes = candList[index].numberOfVotes;
		sortedCandList[i].ratioOfCandidate = candList[index].ratioOfCandidate;
		sortedCandList[i].nameOfList = candList[index].nameOfList;
		sortedCandList[i].numberOfList = candList[index].numberOfList;
		candList[index].ratioOfCandidate = -2;
	}
	printFormSortedCandList(x);
}

function determineWinners(x)
{
    let y = district.getSecDistrictDataByName(selectedDistrict);
    for (let i = 0; i < sortedCandList.length; i++)
	{
        if (seats[sortedCandList[i].numberOfList] > 0)
        {
            for (let j = 0; j < y.length; j++)
            {
                if (y[j][0] == sortedCandList[i].secDistrictOfCandidate)
                {
                    for (let k = 0; k < y[j][1].length; k++)
                    {
                        if (y[j][1][k][0] == sortedCandList[i].sectOfCandidate)
                        {
                            if (y[j][1][k][1] > 0)
                            {
                                y[j][1][k][1]--;
                                seats[sortedCandList[i].numberOfList]--;
                                sortedCandList[i].status = ("Winner");
                            }
                        }
                    }
                }   
            }
		}
	}
	for (let i = 0; i < sortedCandList.length; i++)
	{
		if (sortedCandList[i].status != "Winner")
		{
			sortedCandList[i].status = "Loser"
		}
	}
	printDetermineWinners(x);
}