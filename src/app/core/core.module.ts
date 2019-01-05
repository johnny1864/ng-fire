import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "./auth.service";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    UserModule
  ],
  exports: [],
  providers: [AuthService]
})
export class CoreModule {}
