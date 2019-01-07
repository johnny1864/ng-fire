import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "./user.model";
import { AuthService } from "../core/auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore, private _auth: AuthService) {}

  getUsers() {
    this.userCollection = this.afs.collection("user");
    return this.userCollection.valueChanges();
  }

  getUser(id) {
    this.userDoc = this.afs.doc<User>(`user/${id}`);
    return this.userDoc.valueChanges();
  }

  updateProfileData(displayName: string, photoURL: string) {
    const user = this._auth.authState;
    const data = { displayName, photoURL };
    return user
      .updateProfile(data)
      .then(_ => {
        this.afs.doc(`user/${user.uid}`).update({ displayName, photoURL });
      })
      .then(_ => console.log("Your profile has been updated!"))
      .catch(err => console.log(err));
  }

  updateEmailData(email: string) {
    const user = this._auth.authState;

    return user
      .updateEmail(email)
      .then(_ => {
        this.afs.doc(`user/${user.uid}`).update({ email });
      })
      .then(_ => console.log("Your email has been updated"))
      .then(user => {
        this._auth.authState
          .sendEmailVerification()
          .then(_ => "your email has been sent");
      })
      .catch(err => console.log(err));
  }
}
