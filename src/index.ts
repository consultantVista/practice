import * as firebase from "firebase";
import { printRequestFillDistrict } from "./print-get-data";
import "./style.css";

const config = {
  apiKey: "AIzaSyB-OsWX7D1yoSqr9_mSv5MfXkdzIspSzRE",
  authDomain: "election-25882.firebaseapp.com",
  databaseURL: "https://election-25882.firebaseio.com",
  projectId: "election-25882",
  storageBucket: "election-25882.appspot.com",
  messagingSenderId: "911315686758"
};

firebase.initializeApp(config);
printRequestFillDistrict(1);
