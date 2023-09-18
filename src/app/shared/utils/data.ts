import {DocumentChangeAction} from "@angular/fire/compat/firestore";

interface Vehicle {
  id?: string;

  [key: string]: any;
}

export const extractDocumentChangeActionData = (x: DocumentChangeAction<any>, addId = true): Vehicle => {
  const data = x.payload.doc.data();

  if (addId) {
    data.id = x.payload.doc.id;
  }

  return data;
};
