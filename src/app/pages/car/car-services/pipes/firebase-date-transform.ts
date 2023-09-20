import { Pipe, PipeTransform } from '@angular/core';
import firebase from "firebase/compat";
import firestore = firebase.firestore;

@Pipe({
  name: 'firebaseDateTransform'
})
export class FirebaseDateTransformPipe implements PipeTransform{
  transform(n: firestore.FieldValue): Date {
    return (new Date((n as any).seconds * 1000))
  }
}
