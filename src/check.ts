import { district } from "./db";
import { getState } from "./state";

export const checkListsNumberValidity = () => {
  const { nLists } = getState();
  let response = ``;
  if (isNaN(nLists) || nLists < 2) {
    response += `The number of lists should have an integer value greater than 1.`;
    response += "<br/>";
  }
  return response;
};

export const checkListsValidity = () => {
  const { lists, selectedDistrict } = getState();
  let response = ``;
  for (let i = 0; i < lists.length; i++) {
    let listName = lists[i].name.replace(/\s/g, "");
    if (listName == "") {
      let j = i + 1;
      response += `Enter the name of List #${j}.`;
      response += "<br/>";
    }
    if (isNaN(parseInt(lists[i].numberOfVotes))) {
      let j = i + 1;
      response += `The number of votes for List #${j} should have an integer value.`;
      response += "<br/>";
    }
    if (lists[i].numberOfVotes < 0) {
      let j = i + 1;
      response += `The number of votes for List #${j} should be at least 0.`;
      response += "<br/>";
    }
    if (isNaN(parseInt(lists[i].numberOfCandidates))) {
      let j = i + 1;
      response += `The number of candidates for List #${j} should have an integer value.`;
      response += "<br/>";
    }
    let numberOfSeats = district.getSeatsNumberByName(selectedDistrict);
    if (lists[i].numberOfCandidates > numberOfSeats) {
      let j = i + 1;
      response += `The number of candidates for List #${j} should be at most ${numberOfSeats}.`;
      response += "<br/>";
    }
    let minimumSeats = numberOfSeats * 0.4;
    if (
      lists[i].numberOfCandidates < 3 ||
      lists[i].numberOfCandidates < minimumSeats
    ) {
      let j = i + 1;
      let min;
      if (minimumSeats > 3) {
        min = minimumSeats;
      } else {
        min = 3;
      }
      response += `The number of candidates for List #${j} should be at least ${min}.`;
      response += "<br/>";
    }
  }
  return response;
};

export const checkCandidatesValidity = () => {
  const { lists, nLists } = getState();
  let response = ``;
  for (let i = 0; i < nLists; i++) {
    for (let j = 0; j < lists[i].numberOfCandidates; j++) {
      let candidateName = lists[i].candidates[j].name.replace(/\s/g, "");
      let candidateSect = lists[i].candidates[j].sect.replace(/\s/g, "");
      let candidateSecDistrict = lists[i].candidates[j].secDistrict.replace(
        /\s/g,
        ""
      );
      let ii = i + 1;
      let jj = j + 1;
      if (candidateName == "") {
        response += `Enter the name of Candidate #${jj} in List #${ii}.`;
        response += "<br/>";
      }
      if (candidateSect == "") {
        response += `Enter the sect of Candidate #${jj} in List #${ii}.`;
        response += "<br/>";
      }
      if (candidateSecDistrict == "") {
        response += `Enter the secondary district of Candidate #${jj} in List #${ii}.`;
        response += "<br/>";
      }
      if (isNaN(lists[i].candidates[j].numberOfVotes)) {
        response += `The number of votes for Candidate #${jj} in List #${ii} should have an integer value.`;
        response += "<br/>";
      }
      if (lists[i].candidates[j].numberOfVotes < 0) {
        response += `The number of votes for Candidate #${jj} in List #${ii} should be at least 0.`;
        response += "<br/>";
      }
    }
  }
  return response;
};
