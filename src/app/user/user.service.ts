import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "@angular/fire/firestore";
import { User } from "./user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) {}

  getUsers() {
    this.userCollection = this.afs.collection("user");
    return this.userCollection.valueChanges();
  }

  getUser(id) {
    this.userDoc = this.afs.doc<User>(`user/${id}`);
    return this.userDoc.valueChanges();
  }
}
