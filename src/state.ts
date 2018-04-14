// import * as firebase from "firebase";

let state = {
  // firebaseRef: firebase.database().ref(),
  selectedDistrict: "",
  nLists: 0,
  lists: [],
  votes1: 0,
  hasel1: 0,
  seats: [],
  votes2: 0,
  hasel2: 0,
  remainingSeats: 0,
  remainders: [],
  totalVotes: [],
  sortedCandList: []
};

export const setState = newPartialState => {
  state = { ...state, ...newPartialState };
};

export const getState = () => {
  return state;
};
