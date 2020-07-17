import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import {Router} from "@angular/router"
import {PokemonDataService} from '../../services/pokemon-data.service'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  // Provider will take an array
  // providers:[PokemonDataService]
})
export class DataComponent implements OnInit {
  pokemons: Pokemon[];
  item: string = '';

  constructor(private router : Router, private pokemonsService :PokemonDataService) {}

  ngOnInit() {
    this.getPokemons()
  }

  getPokemons():void{
    this.pokemonsService.getPokemons()
      .subscribe(pokemons => this.pokemons = pokemons)
  }

  selectPokemon(data: Pokemon) {
    // How to pass Id when clicking on data
    let link = ['/pokemon',data.id]
    this.router.navigate(link)
  }
}
