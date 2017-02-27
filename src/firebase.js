import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBl-8b-LVvpkSYqrRTD3H7AIP67FyxB4o4",
  authDomain: "goalcoach-f4276.firebaseapp.com",
  databaseURL: "https://goalcoach-f4276.firebaseio.com",
  storageBucket: "goalcoach-f4276.appspot.com",
  messagingSenderId: "1012315973157"
};

export const firebaseApp = firebase.initializeApp(config);
export const goalRef = firebase.database().ref('goals');
export const completeGoalRef = firebase.database().ref('completeGoals');
