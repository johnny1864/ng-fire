import { Component, OnInit } from "@angular/core";
import { User } from "../user.model";
import { AuthService } from "../../core/auth.service";
import { UserService } from "../user.service";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"]
})
export class UserDashboardComponent implements OnInit {
  user: User;
  editing: boolean = false;
  constructor(private _auth: AuthService, private _user: UserService) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    return this._auth.user.subscribe(user => (this.user = user));
  }

  updateProfile() {
    return this._user.updateProfileData(
      this.user.displayName,
      this.user.photoURL
    );
  }

  updateEmail() {
    return this._user.updateEmailData(this.user.email);
  }
}
