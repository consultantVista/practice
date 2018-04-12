function printCalcVotes1(x)
{
	$(`#container${x}`).append(`The total number of accepted votes is: ${votes1}.`);
	$(`#container${x}`).append(`<br/>`);
}

function printCalcHasel1(x)
{
	$(`#container${x}`).append(`The primary quota is: ${hasel1}.`);
	$(`#container${x}`).append(`<br/>`);
}

function printCalcSeats1(x)
{	
	for (let i = 0; i < nLists; i++)
	{
		$(`#container${x}`).append(`The number of straight seats awareded for List #${i} based on the primary quota is: ${seats[i]}.`);
		$(`#container${x}`).append(`<br/>`);
	}
}

function printCalcVotes2(x)
{
	$(`#container${x}`).append(`The total number of votes for lists that passed the electoral threshold is: ${votes2}.`);
	$(`#container${x}`).append(`<br/>`);
}

function printCalcHasel2(x)
{
	$(`#container${x}`).append(`The final quota is: ${hasel2}.`);
	$(`#container${x}`).append(`<br/>`);
}
	
function printCalcSeats2(x)
{	
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] === 0) 
		{
			$(`#container${x}`).append(`The number of seats awarded for List #${i} based on the final quota is still: ${seats[i]} since it did not pass the threshold.`);
			$(`#container${x}`).append(`<br/>`);
		}
		else
		{
			$(`#container${x}`).append(`The number of straight seats awarded for List #${i} based on the final quota is: ${seats[i]}.`);
			$(`#container${x}`).append(`<br/>`);
		}
	}
}

function printCalcRemainingSeats(x)	
{
	$(`#container${x}`).append(`The number of remaining seats is: ${remainingSeats}.`);
	$(`#container${x}`).append(`<br/>`);
}

function printCalcRemainders(x)	
{
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] === 0)
		{
			$(`#container${x}`).append(`The remainders of List #${i} based on the final quota is: ${remainders[i]} since it did not pass the threshold.`);
			$(`#container${x}`).append(`<br/>`);
		}
		else
		{
			$(`#container${x}`).append(`The remainders of List #${i} based on the final quota is: ${remainders[i]}.`);
			$(`#container${x}`).append("<br/>");
		}
	}
}

function printCalcSeatsFinal(x)
{
	for (let i = 0; i < nLists; i++)
	{
		if (seats[i] === 0) 
		{
			$(`#container${x}`).append(`The final number of seats awarded for List #${i} based on the final quota is: ${seats[i]} since it did not pass the threshold.`);
			$(`#container${x}`).append(`<br/>`);
		}
		else
		{
			$(`#container${x}`).append(`The final number of seats awarded for List #${i} based on the final quota is: ${seats[i]}.`);
			$(`#container${x}`).append(`<br/>`);
		}
	}
	$(`#container${x}`).append(`<br/>`);
}

function findWinners(x)
{
    let totalVotes = calcTotalVotes();
    let sortedCandList = formSortedCandList(totalVotes, seats);
    determineWinners(sortedCandList, seats);
}






//////////////////////////////////////////////////////////////////////////////////////////////////////







function printCalcTotalVotes(x)
{
    $(`#container${x}`).append(`<h4>The total votes for candidates in their corresponding secondary district are:</h4>`);
    $(`#container${x}`).append(`<br/>`);
    for (i = 0; i < district.getSecDistrictDataByName(selectedDistrict).length; i++)
    {
        $(`#container${x}`).append(`${district.getSecDistrictDataByName(selectedDistrict)[i][0]}: ${totalVotes[i]}`);
        $(`#container${x}`).append(`<br/>`);
    }
    $(`#container${x}`).append(`<br/>`);
}

function printFormSortedCandList(x)
{
	$(`#container${x}`).append(`<br/>`);
	$(`#container${x}`).append(`<h4>The list of candidates sorted by the votes ratios in their corresponding secondary district is:</h4>`);
	$(`#container${x}`).append(`<br/>`);
	$(`#container${x}`).append(`
	<table id="t${x}1" class="table">
    	<tr>
    		<th scope="col">Ranking</th>
    		<th scope="col">Name of Candidate</th>
      		<th scope="col">Sect of Candidate</th>
			<th scope="col">Secondary District</th>
			<th scope="col">Number of Votes</th>
			<th scope="col">Ratio of Votes</th>
			<th scope="col">Name of List</th>
    	</tr>
	</table>
	`);
    for (let i = 0; i < sortedCandList.length; i++)
	{
		let ii = parseInt(i) + 1;
		let rr = Math.round(sortedCandList[i].ratioOfCandidate * 100) / 100;
		$(`#t${x}1`).append(`
    	<tr>
      		<th scope="row">#${ii}</th>
      		<td>${sortedCandList[i].nameOfCandidate}</td>
      		<td>${sortedCandList[i].sectOfCandidate}</td>
			<td>${sortedCandList[i].secDistrictOfCandidate}</td>
			<td>${sortedCandList[i].numberOfVotes}</td>
			<td>${rr}%</td>
			<td>${sortedCandList[i].nameOfList}</td>
    	</tr>
		`);    
    }
    $(`#container${x}`).append(`<br/>`);
}

function printDetermineWinners(x)
{
    $(`#container${x}`).append(`<h4>The list of winning candidates is:</h4>`);
	$(`#container${x}`).append(`<br/>`);
	$(`#container${x}`).append(`	
	<table id="t${x}2" class="table">
	  	<tr>
			<th scope="col">Ranking</th>
			<th scope="col">Name of Candidate</th>
			<th scope="col">Sect of Candidate</th>
		  	<th scope="col">Secondary District</th>
			<th scope="col">Number of Votes</th>
		  	<th scope="col">Ratio of Votes</th>
		  	<th scope="col">Name of List</th>
	  	</tr>
	</table>
	`);
	let ii = parseInt(0) + 1;
    for (let i = 0; i < sortedCandList.length; i++)
	{
        if (sortedCandList[i].status == "Winner")
        {
			let rr = Math.round(sortedCandList[i].ratioOfCandidate * 100) / 100;
			$(`#t${x}2`).append(`
			<tr>
				<th scope="row">#${ii}</th>
				<td>${sortedCandList[i].nameOfCandidate}</td>
				<td>${sortedCandList[i].sectOfCandidate}</td>
		  		<td>${sortedCandList[i].secDistrictOfCandidate}</td>
		  		<td>${sortedCandList[i].numberOfVotes}</td>
		  		<td>${rr}%</td>
		  		<td>${sortedCandList[i].nameOfList}</td>
			</tr>
			`);
			ii++;
        }
    }
    $(`#container${x}`).append(`<br/>`);
}