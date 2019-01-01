import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

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

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`user/${user.uid}`).valueChange();
      } else {
        return Observable.of(null);
      }
    });
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log("You have been logged in"))
      .catch(err => console.log(err.message));
  }

  signOut() {
    return this.afAuth.auth.signOut().then(_ => {
      this.router.navigate([""]);
    });
  }
}
