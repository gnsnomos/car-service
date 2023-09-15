import firebase from "firebase/compat";
import firestore = firebase.firestore;

export interface User {
  uid: string;
  name: string;
  photoURL: string;
  email: string;
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}
