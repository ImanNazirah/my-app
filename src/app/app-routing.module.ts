import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyListComponent } from './components/spotify/spotify-list/spotify-list.component';
import { TestListComponent } from './components/test/test-list/test-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'spotify', pathMatch: 'full' },
  { path: 'spotify', component: SpotifyListComponent },
  { path: 'test', component: TestListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
