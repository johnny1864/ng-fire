import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { RoutingModule } from './routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MaterialModule, CoreModule, SharedModule, RoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}