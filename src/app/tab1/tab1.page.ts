import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = []

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature()
      .subscribe( resp => {
        console.log('Resp', resp);
        this.peliculasRecientes = resp.results;
        console.log("peliculasRecientes", this.peliculasRecientes);
      }
    );

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares()
      .subscribe( resp => {
        console.log("Populares", resp);
        //  this.populares = resp.results;
        const arrTemp = [ ...this.populares, ...resp.results ];
        this.populares = arrTemp;
      })
  }
}