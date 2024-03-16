import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { DbTitle } from '../models/enums/db-title.enum';
import { Family } from '../models/family.model';
import { Observable, filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  #firestore = inject(Firestore);
  #familiesCollection: CollectionReference = collection(
    this.#firestore,
    DbTitle.FAMILIES
  );

  families$: Observable<Family[]>;
  constructor() {
    this.families$ = collectionData(this.#familiesCollection, {
      idField: 'id',
    }) as Observable<Family[]>;
  }

  hasFamily(id: string) {
    return this.families$.pipe(
      filter((families) => {
        return families.some((family) => family.parents.includes(id));
      })
    );
  }

  async getFamily(
    id: string
  ): Promise<{ id: string; family: Family } | undefined> {
    const q = query(
      this.#familiesCollection,
      where('parents', 'array-contains', id),
      limit(1)
    );

    const snap = await getDocs(q);

    return { id: snap.docs[0].id, family: snap.docs[0].data() as Family };
  }

  createFamily(parentId: string) {
    const newFamily: Family = {
      parents: [parentId],
      babies: [],
    };
    this.checkIfFamilyExists(parentId).then(async (exists) => {
      if (!exists) {
        await addDoc(this.#familiesCollection, newFamily);
      } else {
        console.log('Family already exists');
      }
    });
  }

  async checkIfFamilyExists(id: string) {
    const snap = await getDocs(
      query(this.#familiesCollection, where('parents', 'array-contains', id))
    );

    return snap.docs[0]?.exists();
  }

  async join(id: string, parentId: string) {
    await updateDoc(doc(this.#familiesCollection, id), {
      parents: arrayUnion(parentId),
    });
  }

  async leave(id: string, parentId: string) {
    await updateDoc(doc(this.#familiesCollection, id), {
      parents: arrayRemove(parentId),
    });
  }

  async remove(id: string) {
    await deleteDoc(doc(this.#familiesCollection, id));
  }

  async addBaby(id: string, babyId: string) {
    await updateDoc(doc(this.#familiesCollection, id), {
      babies: arrayUnion(babyId),
    });
  }

  async removeBaby(id: string, babyId: string) {
    await updateDoc(doc(this.#familiesCollection, id), {
      babies: arrayRemove(babyId),
    });
  }
}
