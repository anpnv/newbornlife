import { Injectable, inject } from '@angular/core';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  authState,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  user,
} from '@angular/fire/auth';
import { ParentProfileService } from './parent-profile.service';
import { Router } from '@angular/router';
import { FamilyService } from './family.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #parentProfile = inject(ParentProfileService);
  readonly #family = inject(FamilyService);
  readonly #auth: Auth = inject(Auth);
  readonly user$ = user(this.#auth);
  readonly authState$ = authState(this.#auth);
  readonly #router = inject(Router);

  constructor() {
    this.authState$.subscribe((user) => {
      if (user) {
        this.#family.hasFamily(user.uid);
      }
    });
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(this.#auth, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.#auth, email, password);
  }

  signout() {
    return signOut(this.#auth);
  }

  signInWithgoogle() {
    signInWithPopup(this.#auth, new GoogleAuthProvider())
      .then(async (result) => {
        const user = result.user;
        const additionalInfo = getAdditionalUserInfo(result);
        if (additionalInfo?.isNewUser) {
          const { given_name, family_name } = additionalInfo?.profile as {
            given_name: string;
            family_name: string;
          };
          await this.#parentProfile.createParentProfile(user.uid, {
            email: user.email ?? '',
            firstName: given_name,
            lastName: family_name,
            relationshipToBaby: 'parent',
          });
        }
      })
      .then(() => {
        this.#router.navigate(['dashboard']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  #signInWithFacebook() {
    signInWithPopup(this.#auth, new FacebookAuthProvider()).then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const user = result.user;
    });
  }

  #signInWithApple() {}
}
