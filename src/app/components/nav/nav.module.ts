import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from "@app/components/nav/sidenav/sidenav.component";
import {NavComponent} from "@app/components/nav/nav.component";
import {ToolbarComponent} from "@app/components/nav/toolbar/toolbar.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SidenavComponent,
    NavComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ],
  exports: [
    NavComponent
  ]
})
export class NavModule {
}
