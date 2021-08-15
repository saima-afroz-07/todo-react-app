import firebase from 'firebase/app';
import "firebase/database";
const firebaseCongif = require('./env/key.json');

firebase.initializeApp(firebaseCongif);
// firebase.analytics();

export const databaseRef = firebase.database().ref();
export default firebase