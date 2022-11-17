import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MergeTableListComponent } from './components/merge-table/merge-table-list/merge-table-list.component';
import { SpotifyListComponent } from './components/spotify/spotify-list/spotify-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'spotify', pathMatch: 'full' },
  { path: 'spotify', component: SpotifyListComponent },
  { path: 'merge-table-list', component: MergeTableListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
