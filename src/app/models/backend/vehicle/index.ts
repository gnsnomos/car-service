import firebase from "firebase/compat";
import firestore = firebase.firestore;

export interface Vehicle {
  brand: string;
  model: string;
  year: number;
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}
