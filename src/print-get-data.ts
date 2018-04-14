import $ from "jquery";
import * as firebase from "firebase";
import { district, secDistrict, mainDistrict } from "./db";
import { getState } from "./state";
import { checkListsNumberValidity } from "./check";
import {
  getFilledDistrict,
  autoFillLists,
  getFilledLists,
  autoFillCandidates,
  saveFilledCandidates,
  getFilledCandidates,
  getFilledListsNumber,
  autoFillListsNumber
} from "./get-data";

export const printList2 = x => {
  $(`#l${x}2`).html(``);
  let newList = mainDistrict.getDistrictsByName($(`#l${x}1`).val());
  newList.forEach(t => {
    $(`#l${x}2`).append(`<option>${t}</option>`);
  });
};

export const printRequestFillDistrict = x => {
  const firebaseRef = firebase.database().ref();

  firebaseRef.child("district").once("value", y => {
    district.array = y.val();
    $(`#container${x}`).append(`
  	</br>
  	<form class="form-inline">
  		<div class="form-group mx-sm-1 mb-1">
  			<h6>Select the district: </h6>
  		</div>
  		<select id='l${x}1' class='form-control mx-sm-1 mb-2'> <option value='North'>North</option> <option value='Mount Lebanon'>Mount Lebanon</option> <option value='South'>South</option> <option value='Beqah'>Beqah</option> <option value='Beirut'>Beirut</option> </select>
  		<select id='l${x}2' class='form-control mx-sm-1 mb-2'> <option value='North 1'>North 1</option> <option value='North 2'>North 2</option> <option value='North 3'>North 3</option></option> </select>
  		<input type='button' id='b${x}' class='btn btn-default mx-sm-1 mb-2' value='Submit'> </input>
  	</form>
    `);
    $(`#l${x}1`).on("change", () => {
      printList2(x);
    });
    $(`#b${x}`).on("click", () => {
      getFilledDistrict(x);
    });
  });
  firebaseRef.child("secDistrict").once("value", y => {
    secDistrict.array = y.val();
  });
  firebaseRef.child("mainDistrict").once("value", y => {
    mainDistrict.array = y.val();
  });
};

// printRequestFillDistrict(1);

export const appendContainer = x => {
  let y = parseInt(x, 10) + 1;
  $(`#container${x}`).append(`<div id = 'container${y}'> </div>`);
  $(`#container${y}`).empty();
};

export const printFilledDistrictData = x => {
  const { selectedDistrict } = getState();
  console.log(selectedDistrict);
  $(`#container${x}`).append(`
  The selected district is: ${selectedDistrict}
  <br/>
  The number of seats allocated to this district is: ${district.getSeatsNumberByName(
    selectedDistrict
  )}
  <br/>
  The distribution of seats in this district is as follows: `);
  for (
    let i = 0;
    i < district.getSeatsDistributionByName(selectedDistrict).length;
    i++
  ) {
    $(`#container${x}`).append(
      `${district.getSeatsDistributionByName(selectedDistrict)[i][0]}: `
    );
    $(`#container${x}`).append(
      `${district.getSeatsDistributionByName(selectedDistrict)[i][1]}`
    );
    if (i != district.getSeatsDistributionByName(selectedDistrict).length - 1) {
      $(`#container${x}`).append(`, `);
    }
  }
  $(`#container${x}`).append(`<br/> <br/>`);
};

export const printRequestFillListsNumber = x => {
  $(`#container${x}`).append(`
	<form class="form-inline">
		<div class="form-group mx-sm-1 mb-1">
			<h6>Enter the number of lists: </h6>
		</div>
    <input 
      type='text'
      id='t${x}'
      class='form-control mx-sm-1 mb-2'
      placeholder=''
    />
    <input 
      type='button'
      id='b${x}1'
      class='btn btn-default mx-sm-1 mb-2'
      value='Auto-fill'
    />
    <input
      type='button'
      id='b${x}2'
      class='btn btn-default mx-sm-1 mb-2'
      value='Submit'
    />
	</form>
  `);
  $(`#t${x}`).on("keydown", event => {
    if (event.keyCode == 13) {
      getFilledListsNumber(x);
    }
  });
  $(`#b${x}1`).on("click", event => {
    autoFillListsNumber(x);
  });
  $(`#b${x}2`).on("click", event => {
    getFilledListsNumber(x);
  });
};

export const printRequestFillLists = x => {
  let response = checkListsNumberValidity();
  const { nLists } = getState();
  if (response != ``) {
    $(`#container${x}`).append(response);
    return;
  }
  $(`#container${x}`).append(`
	  </br>
    <h4>Fill the table below:</h4>
    <br/>
    <table id='table${x}' class='table table-condensed'> <tr> <th>Number of List</th> <th>Name of List</th> <th>Number of Votes</th> <th>Number of Candidates</th> </tr> 
    </table${x}>
  `);
  for (let i = 0; i < nLists; i++) {
    let j = i + 1;
    $(`#table${x}`).append(
      `<tr> <td>List #${j}: </td> <td><input type='text' id='t${x}c0r${i}' class='form-control mx-sm-1 mb-2'></input></td> <td><input type='text' id='t${x}c1r${i}' class='form-control mx-sm-1 mb-2'></input></td> <td><input type='text' id='t${x}c2r${i}' class='form-control mx-sm-1 mb-2'></input></td> </tr>`
    );
  }
  $(`#container${x}`).append(`
    <input 
      type='button'
      id='b${x}1'
      class='btn btn-default mx-sm-1 mb-2'
      value='Auto-fill'
    />
    <input 
      type='button'
      id='b${x}2'
      class='btn btn-default mx-sm-1 mb-2'
      value='Submit'
    />
    <br/>
  `);
  $(`#b${x}1`).on("click", () => {
    autoFillLists(x);
  });
  $(`#b${x}2`).on("click", () => {
    getFilledLists(x);
  });
};

export const printRequestFillCandidates = (x, response) => {
  const { nLists, lists } = getState();
  if (response != ``) {
    $(`#container${x}`).append(response);
    $(`#container${x}`).append(`<br/>`);
    return;
  }
  $(`#container${x}`).append(`</br>`);
  $(`#container${x}`).append(`<h4>Fill the tables below:</h4>`);
  $(`#container${x}`).append(`<br/>`);
  for (let i = 0; i < nLists; i++) {
    let ii = i + 1;
    $(`#container${x}`).append(
      `<table id='table${x}${i}' class='table table-condensed'> <tr> <th>List #${ii}: "${
        lists[i].name
      }"</th> <th>Name of Candidate</th> <th>Sect of Candidate</th> <th>Secondary District</th> <th>Number of Votes</th> </tr> </table>`
    );
    for (let j = 0; j < lists[i].numberOfCandidates; j++) {
      let k = j + 1;
      $(`#table${x}${i}`).append(
        `<tr> <td>Candidate #${k}: </td> <td><input type='text' id='t${x}${i}c0r${j}' class='form-control mx-sm-1 mb-2'></input></td> <td><input type='text' id='t${x}${i}c1r${j}' class='form-control mx-sm-1 mb-2'></input></td> <td><input type='text' id='t${x}${i}c2r${j}' class='form-control mx-sm-1 mb-2'></input></td> <td><input type='text' id='t${x}${i}c3r${j}' class='form-control mx-sm-1 mb-2'></input></td> </tr>`
      );
    }
  }
  $(`#container${x}`).append(`
    <input 
      type='button'
      id='b${x}1'
      class='btn btn-default mx-sm-1 mb-2'
      value='Auto-fill'
    />
    <input 
      type='button'
      id='b${x}2'
      class='btn btn-default mx-sm-1 mb-2'
      value='Save'
    />
    <input 
      type='button'
      id='b${x}3'
      class='btn btn-default mx-sm-1 mb-2'
      value='Submit'
    />
    <br/>
  `);
  $(`#b${x}1`).on("change", () => {
    autoFillCandidates(x);
  });
  $(`#b${x}2`).on("change", () => {
    saveFilledCandidates(x);
  });
  $(`#b${x}3`).on("change", () => {
    getFilledCandidates(x);
  });
};

export const printMessageResults = (x, response) => {
  if (response != ``) {
    $(`#container${x}`).append(response);
    $(`#container${x}`).append(`<br/>`);
    return;
  }
  $(`#container${x}`).append(`<br/>`);
};
