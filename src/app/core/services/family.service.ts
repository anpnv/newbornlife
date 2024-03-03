import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { DbTitle } from '../models/enums/db-title.enum';
import { Family } from '../models/family.model';
import { ParentProfile } from '../models/parent-profile.model';
import { BabyProfile } from '../models/baby-profile.model';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  #firestore = inject(Firestore);
  #familiesCollection: CollectionReference = collection(
    this.#firestore,
    DbTitle.FAMILIES
  );

  async createFamily(newFamily: Family) {
    await addDoc(this.#familiesCollection, newFamily);
  }

  async join(id: string, parent: ParentProfile) {
    const ref = doc(this.#familiesCollection, id);
    await updateDoc(ref, { parents: arrayUnion(parent) });
  }

  async leave(id: string, parent: ParentProfile) {
    const ref = doc(this.#familiesCollection, id);
    await updateDoc(ref, { parents: arrayRemove(parent) });
  }

  async remove(id: string) {
    const ref = doc(this.#familiesCollection, id);
    await deleteDoc(ref);
  }

  async addBaby(id: string, baby: BabyProfile) {
    const ref = doc(this.#familiesCollection, id);
    await updateDoc(ref, { babies: arrayUnion(baby) });
  }

  removeBaby(id: string, baby: BabyProfile) {
    const ref = doc(this.#familiesCollection, id);
    updateDoc(ref, { babies: arrayRemove(baby) });
  }

  async collectionIntoCollection(id: string, parent: any) {
    const ref = doc(this.#familiesCollection, id);
    const elem = collection(ref, 'babies');
    await addDoc(elem, parent);
  }
}
