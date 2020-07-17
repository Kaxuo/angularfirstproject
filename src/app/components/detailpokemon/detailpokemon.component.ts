import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from '../../models/pokemon';
import {PokemonDataService} from '../../services/pokemon-data.service'

@Component({
  selector: 'app-detailpokemon',
  templateUrl: './detailpokemon.component.html',
  styleUrls: ['./detailpokemon.component.css']
})
export class DetailpokemonComponent implements OnInit {

  // // Liste of all pok //
  // pokemons: Pokemon[] = null;

  // One Pokemon //
  Singlepokemon: Pokemon = null;

  // Angular : dans ce componsant, nous allons devoir recup des info depuis l'url du composant grace a Route, et rediriger l'user grace a des paramter grace a Router
  constructor(private route: ActivatedRoute,
     private router: Router,
     private pokemonsService :PokemonDataService) {}

  // void = pas de valeur de retour

  ngOnInit(): void {
    // recup et accéder au param mis dans le constructor, snapshot => Synchrone ( on need cet info pour continuer)
    let id = +this.route.snapshot.paramMap.get('id');
    // On cherche le pokemon correspondant a la route , et une fois trouvé, nous l'affectons a la variable pokemon => not needed anymore
    // this.Singlepokemon = this.pokemonsService.getSinglePokemon(id)

    this.pokemonsService.getSinglePokemon(id)
      .subscribe(pokemon => this.Singlepokemon = pokemon)
    
  }
  goBack(): void {
    this.router.navigate(['/pokemon/all']);
    // ce code marche aussi et demande un retour en arriere //
    // window.history.back(); 
  }
  goEdit(pokemon:Pokemon): void{
    let link = ['/pokemon/edit',pokemon.id];
    this.router.navigate(link)
  }

  delete(pokemon:Pokemon): void{
    this.pokemonsService.deletePokemon(pokemon)
    .subscribe(_ => this.goBack())
  }
}