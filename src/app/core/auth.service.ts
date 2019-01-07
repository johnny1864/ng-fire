import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable, of } from "rxjs";
import { Router } from "@angular/router";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { switchMap } from "rxjs/operators";
import { Md5 } from "ts-md5/dist/md5";
import { findReadVarNames } from "@angular/compiler/src/output/output_ast";

interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: Observable<User>;
  authState: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        // console.log(user);
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    this.afAuth.authState.subscribe(data => (this.authState = data));
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : null;
  }

  // LOG USER IN WITH EMAIL
  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log("You have been logged in"))
      .catch(err => console.log(err.message));
  }

  // OAUTH LOGIN
  oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithRedirect(provider)
      .then(credential => {
        console.log("login in with google");
        return this.updateUserData(credential);
      })
      .catch(err => console.log(err.message));
  }

  // REGISTER USER WITH EMAIL
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(data => this.updateUserData(data.user))
      .then(() => console.log("You have been registered"))
      .then(user => {
        this.afAuth.auth.currentUser
          .sendEmailVerification()
          .then(_ => console.log("Verification email has been sent"))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err.message));
  }

  //STORE USER TO DATABASE
  private updateUserData(user) {
    console.log(user, user.uid);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `user/${user.uid}`
    );
    // console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName,
      photoURL:
        user.photoURL ||
        `http://www.gravatar.com/avatar/${Md5.hashStr(user.uid)}?d=identicon`
    };

    return userRef.set(data, { merge: true });
  }

  // RESET PASSWORD
  resetPassword(email: string) {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(_ => console.log("Password reset email has been set"))
      .catch(err => console.log(err.message));
  }

  // SOCIAL LOGIN PROVIDERS

  // Google LOGIN
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }

  // FACEBOOK LOGIN
  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.oAuthLogin(provider);
  }

  // GITHUB
  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    this.oAuthLogin(provider);
  }

  signOut() {
    return this.afAuth.auth.signOut().then(_ => {
      this.router.navigate([""]);
    });
  }
}
