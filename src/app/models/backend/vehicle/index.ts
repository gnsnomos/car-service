import firebase from "firebase/compat";
import firestore = firebase.firestore;

export interface Vehicle {
  brand: string;
  model: string;
  year: number;
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}

export type MaintenanceType = { value: string, label: string };

export interface Service {
  kilometers: string;
  date: number;
  vehicle: string;
  cost: string;
  sintirisiAnartisi: MaintenanceType[];
  sintirisiIgra: MaintenanceType[];
  sintirisiIlektrologika: MaintenanceType[];
  sintirisiLoipa: MaintenanceType[];
  sintirisiMixanikaMeri: MaintenanceType[];
  created: firestore.FieldValue;
  updated?: firestore.FieldValue;
}
