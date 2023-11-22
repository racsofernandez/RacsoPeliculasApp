import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {id:0};
  actores: Cast[] = [];
  oculto = 150;
  star = "star-outline";

  constructor(private moviesService: MoviesService,
              private modalDtrl: ModalController,
              private dataLocal: DataLocalService) { }

  ngOnInit() {
    console.log("id", this.id);

    this.dataLocal.existePelicula( this.id).then(existe => this.star = (existe) ? 'star': 'star-outline');

    this.moviesService.getPeliculaDetalle(this.id)
      .subscribe( resp => {
        this.pelicula = resp;
        console.log("detalle", resp);
        //  this.populares = resp.results;
      })

    this.moviesService.getActoresPelicula(this.id)
    .subscribe( resp => {
      this.actores = resp.cast;
      console.log("actores", this.actores);
      //  this.populares = resp.results;
    })
  }

  regresar() {
    this.modalDtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocal.guardarPelicula( this.pelicula );
    this.star = (existe) ? 'star': 'star-outline';
  }
}
