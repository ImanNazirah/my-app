import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Spotify } from 'src/app/models/spotify';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-spotify-update',
  templateUrl: './spotify-update.component.html',
  styleUrls: ['./spotify-update.component.scss']
})
export class SpotifyUpdateComponent implements OnInit {

  dataForm!: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<SpotifyUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.dataForm = new FormGroup({
      spotify: new FormGroup({ 
        trackName: new FormControl(),
        artistName: new FormControl(),
        genre: new FormControl(),
        popularity: new FormControl(),
      })

      
    });

  }

  ngOnInit(): void {
    
    this.dataForm.patchValue(
      { 
        spotify : { 
                    trackName  : this.data.trackName? this.data.trackName : '',
                    artistName : this.data.artistName? this.data.artistName : '',   
                    genre      : this.data.genre? this.data.genre : '',
                    popularity : this.data.popularity? this.data.popularity : ''                                  
                  }
      });
    
  }

  closeDialog():void{
    this.matDialogRef.close();
  }

  submitDialog():void{

    this.matDialogRef.close(this.dataForm.value.spotify);
    
  }

}
