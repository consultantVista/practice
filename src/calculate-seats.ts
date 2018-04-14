import $ from "jquery";
import { times } from "lodash";
import { getState, setState } from "./state";
import { district } from "./db";
import {
  printCalcSeats1,
  printCalcVotes1,
  printCalcHasel1,
  printCalcVotes2,
  printCalcHasel2,
  printCalcSeats2,
  printCalcRemainingSeats,
  printCalcRemainders,
  printCalcSeatsFinal
} from "./print-calculate-seats";

export const calculateSeats = x => {
  $(`#container${x}`).append(`<br/>`);
  $(`#container${x}`).append(
    `<h4>The distribution of seats is the following:</h4>`
  );
  calcVotes1(x);
  calcHasel1(x);
  calcSeats1(x);
  calcVotes2(x);
  calcHasel2(x);
  calcSeats2(x);
  calcRemainingSeats(x);
  calcRemainders(x);
  calcSeatsFinal(x);
};

export const calcVotes1 = x => {
  const { nLists, votes1, lists } = getState();
  let updatedVotes1 = 0;
  for (let i = 0; i < nLists; i++) {
    updatedVotes1 = votes1 + lists[i].numberOfVotes;
  }
  setState({ votes1: updatedVotes1 });
  printCalcVotes1(x);
};

export const calcHasel1 = x => {
  const { votes1, selectedDistrict } = getState();
  const hasel1 = Math.floor(
    votes1 / district.getSeatsNumberByName(selectedDistrict)
  );
  setState({ hasel1 });
  printCalcHasel1(x);
};

export const calcSeats1 = x => {
  const { nLists, lists, hasel1 } = getState();
  const seats = times(nLists, i => {
    return Math.floor(lists[i].numberOfVotes / hasel1);
  });
  setState(seats);
  printCalcSeats1(x);
};

export const calcVotes2 = x => {
  const { votes1, lists, nLists, seats } = getState();
  let newVotes2 = votes1;
  for (let i = 0; i < nLists; i++) {
    if (seats[i] === 0) {
      newVotes2 = newVotes2 - lists[i].numberOfVotes;
    }
  }
  printCalcVotes2(x);
};

export const calcHasel2 = x => {
  const { votes2, selectedDistrict } = getState();
  const hasel2 = Math.floor(
    votes2 / district.getSeatsNumberByName(selectedDistrict)
  );
  setState({ hasel2 });
  printCalcHasel2(x);
};

export const calcSeats2 = x => {
  const { nLists, lists, seats, hasel2 } = getState();
  const newSeats = times(nLists, i => {
    return seats[i] != 0
      ? Math.floor(lists[i].numberOfVotes / hasel2)
      : seats[i];
  });
  setState({ seats: newSeats });
  printCalcSeats2(x);
};

export const calcRemainingSeats = x => {
  const { selectedDistrict, nLists, seats } = getState();
  let remainingSeats = district.getSeatsNumberByName(selectedDistrict);
  for (let i = 0; i < nLists; i++) {
    remainingSeats = remainingSeats - seats[i];
  }
  setState({ remainingSeats });
  printCalcRemainingSeats(x);
};

export const calcRemainders = x => {
  const { nLists, seats, lists, hasel2 } = getState();
  const remainders = times(nLists, i => {
    return seats[i] == 0 ? 0 : lists[i].numberOfVotes - seats[1] * hasel2;
  });
  setState({ remainders });
  printCalcRemainders(x);
};

export const calcSeatsFinal = x => {
  const { remainingSeats, nLists, remainders, seats } = getState();
  const updatedSeats = [...seats];
  for (let i = 0; i < remainingSeats; i++) {
    let maxRemainders = 0;
    let maxRemaindersIndex;
    for (let j = 0; j < nLists; j++) {
      if (remainders[j] > maxRemainders) {
        maxRemainders = remainders[j];
        maxRemaindersIndex = j;
      }
    }
    updatedSeats[maxRemaindersIndex]++;
  }
  printCalcSeatsFinal(x);
  return updatedSeats;
};
