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