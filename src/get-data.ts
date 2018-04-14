import $ from "jquery";
import * as firebase from "firebase";
import { getState, setState } from "./state";
import { storedLists } from "./db";
import { checkListsValidity, checkCandidatesValidity } from "./check";
import { calculateSeats } from "./calculate-seats";
import { findWinners } from "./print-calculate-seats";
import {
  appendContainer,
  printFilledDistrictData,
  printRequestFillListsNumber,
  printRequestFillLists,
  printRequestFillCandidates,
  printMessageResults
} from "./print-get-data";

export const getFilledDistrict = x => {
  const updatedSelectedDistrict = `${$(`#l${x}2`).val()}`; //Casting it as string for firebase
  setState({ selectedDistrict: updatedSelectedDistrict });
  appendContainer(x);
  let y = parseInt(x) + 1;
  printFilledDistrictData(y);
  printRequestFillListsNumber(y);
  const childFirebaseRef = firebase
    .database()
    .ref()
    .child("storedLists");
  childFirebaseRef.child(updatedSelectedDistrict).once("value", x => {
    storedLists.array = x.val();
  });
};

export const autoFillListsNumber = x => {
  const { selectedDistrict } = getState();
  const firebaseRef = firebase
    .database()
    .ref()
    .child("storedLists");
  firebaseRef.child(selectedDistrict).once("value", y => {
    $(`#t${x}`).val(y.val().length);
  });
};

export const getFilledListsNumber = x => {
  const parsedNewNLists = parseInt(`${$(`#t${x}`).val()}`, 10);
  setState({ nLists: parsedNewNLists });
  appendContainer(x);
  const y = parseInt(x, 10) + 1;
  printRequestFillLists(y);
};

export const autoFillLists = x => {
  const { nLists } = getState();
  for (let i = 0; i < nLists; i++) {
    $(`#t${x}c0r${i}`).val(storedLists.array[i].name);
    $(`#t${x}c1r${i}`).val(storedLists.array[i].votesNumber);
    $(`#t${x}c2r${i}`).val(storedLists.array[i].candidatesNumber);
  }
};

export const getFilledLists = x => {
  const { nLists } = getState();
  const filledLists = [];
  // lists = [];
  for (let i = 0; i < nLists; i++) {
    filledLists[i] = {};
    filledLists[i].name = $(`#t${x}c0r${i}`).val();
    filledLists[i].numberOfVotes = $(`#t${x}c1r${i}`).val();
    filledLists[i].numberOfCandidates = $(`#t${x}c2r${i}`).val();
  }
  setState({ lists: filledLists });
  appendContainer(x);
  let y = parseInt(x) + 1;
  let response = checkListsValidity();
  if (response == ``) {
    calculateSeats(y);
  }
  printRequestFillCandidates(y, response);
};

export const autoFillCandidates = x => {
  const { nLists, lists } = getState();
  for (let i = 0; i < nLists; i++) {
    for (let j = 0; j < lists[i].numberOfCandidates; j++) {
      $(`#t${x}${i}c0r${j}`).val(storedLists.array[i].candidates[j].name);
      $(`#t${x}${i}c1r${j}`).val(storedLists.array[i].candidates[j].sect);
      $(`#t${x}${i}c2r${j}`).val(
        storedLists.array[i].candidates[j].secDistrict
      );
      $(`#t${x}${i}c3r${j}`).val(
        storedLists.array[i].candidates[j].votesNumber
      );
    }
  }
};

export const saveFilledCandidates = x => {
  const { nLists, lists, selectedDistrict } = getState();
  storedLists.array = [];
  for (let i = 0; i < nLists; i++) {
    storedLists.array[i] = {};
    storedLists.array[i].name = lists[i].name;
    storedLists.array[i].votesNumber = lists[i].numberOfVotes;
    storedLists.array[i].candidatesNumber = lists[i].numberOfCandidates;
    storedLists.array[i].candidates = [];
    for (let j = 0; j < lists[i].numberOfCandidates; j++) {
      storedLists.array[i].candidates[j] = {};
      storedLists.array[i].candidates[j].name = $(`#t${x}${i}c0r${j}`).val();
      storedLists.array[i].candidates[j].sect = $(`#t${x}${i}c1r${j}`).val();
      storedLists.array[i].candidates[j].secDistrict = $(
        `#t${x}${i}c2r${j}`
      ).val();
      storedLists.array[i].candidates[j].votesNumber = $(
        `#t${x}${i}c3r${j}`
      ).val();
    }
  }
  const firebaseRef = firebase
    .database()
    .ref()
    .child("storedLists");
  firebaseRef.child(selectedDistrict).set(storedLists.array);
};

export const getFilledCandidates = x => {
  const { nLists, lists } = getState();
  // Because I can
  const newLists = [...lists.map(list => ({ ...list, candidates: [] }))];
  setState({ lists, newLists });
  for (let i = 0; i < nLists; i++) {
    for (let j = 0; j < lists[i].numberOfCandidates; j++) {
      lists[i].candidates[j] = {};
      lists[i].candidates[j].name = $(`#t${x}${i}c0r${j}`).val();
      lists[i].candidates[j].sect = $(`#t${x}${i}c1r${j}`).val();
      lists[i].candidates[j].secDistrict = $(`#t${x}${i}c2r${j}`).val();
      lists[i].candidates[j].numberOfVotes = parseInt(
        `${$(`#t${x}${i}c3r${j}`).val()}`
      );
    }
  }
  appendContainer(x);
  let y = parseInt(x) + 1;
  let response = checkCandidatesValidity();
  printMessageResults(y, response);
  if (response == ``) {
    findWinners(y);
  }
};
