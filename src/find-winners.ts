import { getState, setState } from "./state";
import { district } from "./db";
import {
  printCalcTotalVotes,
  printFormSortedCandList,
  printDetermineWinners
} from "./print-find-winners";

export const findWinners = x => {
  calcTotalVotes(x);
  formSortedCandList(x);
  determineWinners(x);
};

export const calcTotalVotes = (x = 0) => {
  const { totalVotes, selectedDistrict, nLists, lists } = getState();
  const updatedTotalVotes = [];
  for (
    let i = 0;
    i < district.getSecDistrictDataByName(selectedDistrict).length;
    i++
  ) {
    let y = 0;
    for (let j = 0; j < nLists; j++) {
      for (let k = 0; k < lists[j].numberOfCandidates; k++) {
        if (
          district.getSecDistrictDataByName(selectedDistrict)[i][0] ==
          lists[j].candidates[k].secDistrict
        ) {
          y += parseInt(lists[j].candidates[k].numberOfVotes);
        }
      }
    }
    totalVotes.push(y);
  }
  setState({ totalVotes: updatedTotalVotes });
  printCalcTotalVotes(x);
};

export const formSortedCandList = x => {
  const {
    selectedDistrict,
    nLists,
    seats,
    lists,
    totalVotes,
    sortedCandList
  } = getState();
  let candList = [];
  let count = 0;
  for (
    let i = 0;
    i < district.getSecDistrictDataByName(selectedDistrict).length;
    i++
  ) {
    for (let j = 0; j < nLists; j++) {
      if (seats[j] != 0) {
        for (let k = 0; k < lists[j].numberOfCandidates; k++) {
          if (
            district.getSecDistrictDataByName(selectedDistrict)[i][0] ==
            lists[j].candidates[k].secDistrict
          ) {
            let ratio =
              parseFloat(lists[j].candidates[k].numberOfVotes) /
              parseFloat(totalVotes[i]) *
              100;
            candList[count] = {};
            candList[count].nameOfCandidate = lists[j].candidates[k].name;
            candList[count].sectOfCandidate = lists[j].candidates[k].sect;
            candList[count].secDistrictOfCandidate =
              lists[j].candidates[k].secDistrict;
            candList[count].numberOfVotes =
              lists[j].candidates[k].numberOfVotes;
            candList[count].ratioOfCandidate = ratio;
            candList[count].nameOfList = lists[j].name;
            candList[count].numberOfList = j;
            count++;
          }
        }
      }
    }
  }
  for (let i = 0; i < candList.length; i++) {
    let max = -1;
    let index = -1;
    for (let j = 0; j < candList.length; j++) {
      if (candList[j].ratioOfCandidate > max) {
        max = candList[j].ratioOfCandidate;
        index = j;
      }
    }
    sortedCandList[i] = {};
    sortedCandList[i].nameOfCandidate = candList[index].nameOfCandidate;
    sortedCandList[i].sectOfCandidate = candList[index].sectOfCandidate;
    sortedCandList[i].secDistrictOfCandidate =
      candList[index].secDistrictOfCandidate;
    sortedCandList[i].numberOfVotes = candList[index].numberOfVotes;
    sortedCandList[i].ratioOfCandidate = candList[index].ratioOfCandidate;
    sortedCandList[i].nameOfList = candList[index].nameOfList;
    sortedCandList[i].numberOfList = candList[index].numberOfList;
    candList[index].ratioOfCandidate = -2;
  }
  printFormSortedCandList(x);
};

export const determineWinners = x => {
  const { selectedDistrict, seats, sortedCandList } = getState();
  let y = district.getSecDistrictDataByName(selectedDistrict);
  let temp = [...seats];
  for (let i = 0; i < sortedCandList.length; i++) {
    if (temp[sortedCandList[i].numberOfList] > 0) {
      for (let j = 0; j < y.length; j++) {
        if (y[j][0] == sortedCandList[i].secDistrictOfCandidate) {
          for (let k = 0; k < y[j][1].length; k++) {
            if (y[j][1][k][0] == sortedCandList[i].sectOfCandidate) {
              if (y[j][1][k][1] > 0) {
                y[j][1][k][1]--;
                temp[sortedCandList[i].numberOfList]--;
                sortedCandList[i].status = "Winner";
              }
            }
          }
        }
      }
    }
  }
  for (let i = 0; i < sortedCandList.length; i++) {
    if (sortedCandList[i].status != "Winner") {
      sortedCandList[i].status = "Loser";
    }
  }
  printDetermineWinners(x);
};
