import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Spotify } from 'src/app/models/spotify';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-create',
  templateUrl: './spotify-create.component.html',
  styleUrls: ['./spotify-create.component.scss']
})
export class SpotifyCreateComponent implements OnInit {
  
  dataForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<SpotifyCreateComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
  ) {
 
   }

  ngOnInit(): void {

    this.dataForm = new FormGroup({
      spotify: new FormGroup({ 
        trackName: new FormControl(),
        artistName: new FormControl(),
        genre: new FormControl(),
        popularity: new FormControl(),
      })
    });
    
  }

  closeDialog(){
    this.matDialogRef.close()
  }

  submitDialog(){

    this.matDialogRef.close(this.dataForm.value.spotify);
    
  }

}
