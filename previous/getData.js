//let userInput = prompt("Enter the password:");

let firebaseRef = firebase.database().ref();
let selectedDistrict;
let nLists;
let lists = new Array;
let votes1;
let hasel1;
let seats = new Array;
let votes2;
let hasel2;
let remainingSeats;
let remainders = new Array;
let totalVotes = new Array;
let sortedCandList = new Array;

function getFilledDistrict(x)
{
	selectedDistrict = $(`#l${x}2`).val();
	appendContainer(x);
	let y = parseInt(x) + 1;
	printFilledDistrictData(y);
	printRequestFillListsNumber(y);
	firebaseRef = firebase.database().ref().child("storedLists");
	firebaseRef.child(selectedDistrict).once("value", x => 
	{
		storedLists.array = x.val();
	});

}

function autoFillListsNumber(x)
{
	firebaseRef = firebase.database().ref().child("storedLists");
	firebaseRef.child(selectedDistrict).once("value", y => 
	{
		$(`#t${x}`).val(y.val().length);
	});
}

function getFilledListsNumber(x)
{
	nLists = parseInt($(`#t${x}`).val());
	appendContainer(x);
	let y = parseInt(x) + 1;
	printRequestFillLists(y);	
}

function autoFillLists(x)
{
	for (let i = 0; i < nLists; i++)
	{
		$(`#t${x}c0r${i}`).val(storedLists.array[i].name);
		$(`#t${x}c1r${i}`).val(storedLists.array[i].votesNumber);
		$(`#t${x}c2r${i}`).val(storedLists.array[i].candidatesNumber);
	}
}

function getFilledLists(x)
{
	lists = [];
	for (let i = 0; i < nLists; i++)
	{
		lists[i] = {};
		lists[i].name = $(`#t${x}c0r${i}`).val();
		lists[i].numberOfVotes = $(`#t${x}c1r${i}`).val();
		lists[i].numberOfCandidates = $(`#t${x}c2r${i}`).val();
	}
	appendContainer(x);
	let y = parseInt(x) + 1;
	let response = checkListsValidity();
	if (response == ``)
	{
		calculateSeats(y);
	}
	printRequestFillCandidates(y, response);
}

function autoFillCandidates(x)
{
	for (let i = 0; i < nLists; i++)
	{
		for (let j = 0; j < lists[i].numberOfCandidates; j++)
		{
			$(`#t${x}${i}c0r${j}`).val(storedLists.array[i].candidates[j].name); 
			$(`#t${x}${i}c1r${j}`).val(storedLists.array[i].candidates[j].sect); 
			$(`#t${x}${i}c2r${j}`).val(storedLists.array[i].candidates[j].secDistrict); 
			$(`#t${x}${i}c3r${j}`).val(storedLists.array[i].candidates[j].votesNumber); 
		}
	}
}

function saveFilledCandidates(x)
{
	storedLists.array = [];
	for (let i = 0; i < nLists; i++)
	{
		storedLists.array[i] = {};
		storedLists.array[i].name = lists[i].name;
		storedLists.array[i].votesNumber = lists[i].numberOfVotes;
		storedLists.array[i].candidatesNumber = lists[i].numberOfCandidates;
		storedLists.array[i].candidates = [];
		for (let j = 0; j < lists[i].numberOfCandidates; j++)
		{
			storedLists.array[i].candidates[j] = {};
			storedLists.array[i].candidates[j].name = $(`#t${x}${i}c0r${j}`).val(); 
			storedLists.array[i].candidates[j].sect = $(`#t${x}${i}c1r${j}`).val(); 
			storedLists.array[i].candidates[j].secDistrict = $(`#t${x}${i}c2r${j}`).val(); 
			storedLists.array[i].candidates[j].votesNumber = $(`#t${x}${i}c3r${j}`).val(); 
		}
	}
	firebaseRef = firebase.database().ref().child("storedLists");
	firebaseRef.child(selectedDistrict).set(storedLists.array);

}

function getFilledCandidates(x)
{
	for (let i = 0; i < nLists; i++)
	{
		lists[i].candidates = [];
	}
	for (let i = 0; i < nLists; i++)
	{
		for (let j = 0; j < lists[i].numberOfCandidates; j++)
		{
			lists[i].candidates[j] = {};
			lists[i].candidates[j].name = $(`#t${x}${i}c0r${j}`).val();
			lists[i].candidates[j].sect = $(`#t${x}${i}c1r${j}`).val();
			lists[i].candidates[j].secDistrict = $(`#t${x}${i}c2r${j}`).val();
			lists[i].candidates[j].numberOfVotes = parseInt($(`#t${x}${i}c3r${j}`).val());
		}
	}
	appendContainer(x);
	let y = parseInt(x) + 1;
	let response = 	checkCandidatesValidity();
	printMessageResults(y, response);
	if (response == ``)
	{
		findWinners(y);
	}
}

