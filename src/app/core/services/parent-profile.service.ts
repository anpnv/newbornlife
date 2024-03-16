import { Injectable, inject } from '@angular/core';
import {
    CollectionReference,
    Firestore, collection,
    doc,
    setDoc
} from '@angular/fire/firestore';
import { DbTitle } from '../models/enums/db-title.enum';
import { ParentProfile } from '../models/parent-profile.model';

@Injectable({
  providedIn: 'root',
})
export class ParentProfileService {
  #firestore = inject(Firestore);
  #familiesCollection: CollectionReference = collection(
    this.#firestore,
    DbTitle.PARENT_PROFILE
  );

  async createParentProfile(id: string, newParentProfile: ParentProfile) {
    setDoc(doc(this.#firestore, DbTitle.PARENT_PROFILE, id), newParentProfile);
  }
}
