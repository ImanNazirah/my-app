//Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { AgGridModule } from 'ag-grid-angular';


//Component
import { AppComponent } from './app.component';
import { FooterComponent } from './shared-view/footer/footer.component';
import { NavbarComponent } from './shared-view/navbar/navbar.component';
import { MyNavComponent } from './shared-view/my-nav/my-nav.component';

import { SpotifyCreateComponent } from './components/spotify/spotify-create/spotify-create.component';
import { SpotifyUpdateComponent } from './components/spotify/spotify-update/spotify-update.component';
import { SpotifyListComponent } from './components/spotify/spotify-list/spotify-list.component';
import { TestListComponent } from './components/test/test-list/test-list.component';
import { TestCreateComponent } from './components/test/test-create/test-create.component';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    MyNavComponent,
    SpotifyCreateComponent,
    SpotifyUpdateComponent,
    SpotifyListComponent,
    TestListComponent,
    TestCreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    FlexLayoutModule,
    LayoutModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
