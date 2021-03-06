import { Component, OnInit } from '@angular/core';
import { MusicService } from '../../services/music/music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent  {

  nuevasCanciones: any[] = [];
  loading: boolean;

  error: boolean;
  mensajeError: string;

  constructor( private spotify: MusicService ) {
    this.loading = true;
    this.error = false;
    this.spotify.getToken().subscribe(
      data => { 
        console.log(data['token_type'] + " " + data['access_token']);

        this.spotify.getNewReleases(data['token_type'] + " " + data['access_token'])
        .subscribe( (data: any) => {
          this.nuevasCanciones = data;
          this.loading = false;
        }, ( errorServicio ) => {

          this.loading = false;
          this.error = true;
          console.log(errorServicio);
          this.mensajeError = errorServicio.error.error.message;

        });
    },
      error => { console.log(error);
    } )
  }
}
