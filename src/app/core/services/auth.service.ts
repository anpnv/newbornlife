import { Injectable, inject } from '@angular/core';
import {
  Auth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #auth: Auth = inject(Auth);
  user$ = user(this.#auth);
  authState$ = authState(this.#auth);

  createUserWithEmailAndPassword(email: string, password: string) {
    createUserWithEmailAndPassword(this.#auth, email, password);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.#auth, email, password);
  }

  signInWithgoogle() {
    signInWithPopup(this.#auth, new GoogleAuthProvider()).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
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
