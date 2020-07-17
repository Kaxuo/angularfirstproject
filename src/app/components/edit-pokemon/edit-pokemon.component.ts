import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import {ActivatedRoute,Params} from "@angular/router"
import {PokemonDataService} from '../../services/pokemon-data.service'

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.css']
})
export class EditPokemonComponent implements OnInit {

  Singlepokemon: Pokemon = null;
  
  constructor(
    private route: ActivatedRoute,
    private pokemonsService: PokemonDataService) {}
  
  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    // this.pokemon = this.pokemonsService.getSinglePokemon(id); => not needed anymore

    this.pokemonsService.getSinglePokemon(id)
    .subscribe(pokemon => this.Singlepokemon = pokemon)
  
  }
  
}