import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import {PokemonDataService} from '../../services/pokemon-data.service'
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {

  // subject => appartient a rxjs , permet de stocker les recherches successives de l'user sous la forme d'observable => hérite la classe observable 
  // transforme le flux de recherche (string) en un flux de des pokemons !!!! 
  private searchTerms = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;
 
  constructor(
      private pokemonsService: PokemonDataService,
      private router: Router) { }
 
  // Ajoute un terme de recherche dans le flux de l'Observable 'searchTerms'
  // Compare a react, la fonction onChange et le state serait searchterms
  search(term: string): void {
      this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
      this.pokemons$ = this.searchTerms.pipe(
          // attendre 300ms de pause entre chaque requête // mets en pause l'execution de recherche tant qu'une nouvelle recherche a été lancée ( il y a moins de 300 ms)
          debounceTime(300),
          // ignorer la recherche en cours si c'est la même que la précédente // assure que les requetes seulement si le terme de la requete si elle a été changée
          distinctUntilChanged(),
          // on retourne la liste des résultats correpsondant aux termes de la recherche // apply the function , seulement ce qui a été saisi en dernier
          switchMap((term: string) => this.pokemonsService.searchPokemons(term)),
      );
  }
 
  gotoDetail(pokemon: Pokemon): void {
      let link = ['/pokemon', pokemon.id];
      this.router.navigate(link);
  }
}