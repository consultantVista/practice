import $ from "jquery";
import { getState } from "./state";
import { district } from "./db";
import {
  calcTotalVotes,
  formSortedCandList,
  determineWinners
} from "./find-winners";
export const printCalcVotes1 = x => {
  const { votes1 } = getState();
  $(`#container${x}`).append(
    `The total number of accepted votes is: ${votes1}.`
  );
  $(`#container${x}`).append(`<br/>`);
};

export const printCalcHasel1 = x => {
  const { hasel1 } = getState();
  $(`#container${x}`).append(`The primary quota is: ${hasel1}.`);
  $(`#container${x}`).append(`<br/>`);
};

export const printCalcSeats1 = x => {
  const { nLists, seats } = getState();
  for (let i = 0; i < nLists; i++) {
    $(`#container${x}`).append(
      `The number of straight seats awareded for List #${i} based on the primary quota is: ${
        seats[i]
      }.`
    );
    $(`#container${x}`).append(`<br/>`);
  }
};

export const printCalcVotes2 = x => {
  const { votes2 } = getState();
  $(`#container${x}`).append(
    `The total number of votes for lists that passed the electoral threshold is: ${votes2}.`
  );
  $(`#container${x}`).append(`<br/>`);
};

export const printCalcHasel2 = x => {
  const { hasel2 } = getState();
  $(`#container${x}`).append(`The final quota is: ${hasel2}.`);
  $(`#container${x}`).append(`<br/>`);
};

export const printCalcSeats2 = x => {
  const { nLists, seats } = getState();
  for (let i = 0; i < nLists; i++) {
    if (seats[i] === 0) {
      $(`#container${x}`).append(
        `The number of seats awarded for List #${i} based on the final quota is still: ${
          seats[i]
        } since it did not pass the threshold.`
      );
      $(`#container${x}`).append(`<br/>`);
    } else {
      $(`#container${x}`).append(
        `The number of straight seats awarded for List #${i} based on the final quota is: ${
          seats[i]
        }.`
      );
      $(`#container${x}`).append(`<br/>`);
    }
  }
};

export const printCalcRemainingSeats = x => {
  const { remainingSeats } = getState();
  $(`#container${x}`).append(
    `The number of remaining seats is: ${remainingSeats}.`
  );
  $(`#container${x}`).append(`<br/>`);
};

export const printCalcRemainders = x => {
  const { nLists, seats, remainders } = getState();

  for (let i = 0; i < nLists; i++) {
    if (seats[i] === 0) {
      $(`#container${x}`).append(
        `The remainders of List #${i} based on the final quota is: ${
          remainders[i]
        } since it did not pass the threshold.`
      );
      $(`#container${x}`).append(`<br/>`);
    } else {
      $(`#container${x}`).append(
        `The remainders of List #${i} based on the final quota is: ${
          remainders[i]
        }.`
      );
      $(`#container${x}`).append("<br/>");
    }
  }
};

export const printCalcSeatsFinal = x => {
  const { nLists, seats, remainders } = getState();

  for (let i = 0; i < nLists; i++) {
    if (seats[i] === 0) {
      $(`#container${x}`).append(
        `The final number of seats awarded for List #${i} based on the final quota is: ${
          seats[i]
        } since it did not pass the threshold.`
      );
      $(`#container${x}`).append(`<br/>`);
    } else {
      $(`#container${x}`).append(
        `The final number of seats awarded for List #${i} based on the final quota is: ${
          seats[i]
        }.`
      );
      $(`#container${x}`).append(`<br/>`);
    }
  }
  $(`#container${x}`).append(`<br/>`);
};

export const findWinners = x => {
  let totalVotes = calcTotalVotes();
  let sortedCandList = formSortedCandList(totalVotes);
  determineWinners(sortedCandList);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////

export const printCalcTotalVotes = x => {
  const { selectedDistrict, totalVotes } = getState();
  $(`#container${x}`).append(
    `<h4>The total votes for candidates in their corresponding secondary district are:</h4>`
  );
  $(`#container${x}`).append(`<br/>`);
  for (
    let i = 0;
    i < district.getSecDistrictDataByName(selectedDistrict).length;
    i++
  ) {
    $(`#container${x}`).append(
      `${district.getSecDistrictDataByName(selectedDistrict)[i][0]}: ${
        totalVotes[i]
      }`
    );
    $(`#container${x}`).append(`<br/>`);
  }
  $(`#container${x}`).append(`<br/>`);
};

export const printFormSortedCandList = x => {
  const { sortedCandList } = getState();
  $(`#container${x}`).append(`<br/>`);
  $(`#container${x}`).append(
    `<h4>The list of candidates sorted by the votes ratios in their corresponding secondary district is:</h4>`
  );
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
  for (let i = 0; i < sortedCandList.length; i++) {
    let ii = i + 1;
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
};

export const printDetermineWinners = x => {
  const { sortedCandList } = getState();
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
  let ii = 1;
  for (let i = 0; i < sortedCandList.length; i++) {
    if (sortedCandList[i].status == "Winner") {
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
};
