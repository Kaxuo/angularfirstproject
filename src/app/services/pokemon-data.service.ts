import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { POKEMONS } from './mock-pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PokemonDataService {
  constructor(private http: HttpClient) {}
  private pokemonsUrl = 'api/pokemons';

  // centralise gestion des logs de notre service , ==> Archive ?
  private log(log: string) {
    console.info(log);
  }

  // T = designe le fait que vous allez typer un type en lui meme ( number ou string par exemple)
  // Operation = Nom de la methode qui a causé l'erreur , result = donnée facultative a renvoyé comme resultat de l'observable
  // return => Laisse notre operation continuer a fonctionner  en renvoyant un result adapté a la methode qui a lever l'erreur. chaque methode du service renvoie un observakle dont le resultat a un type different, ( getpokemon => [] , while get SinglePOkemon => {}) ==> T type attendu par lerreur
  private handleError<T>(operation="operation", result?:T){
    return (error:any): Observable<T> => {
      console.log(error)
      console.log(`${operation} failed: ${error.message}`)
      // transofrmer les données passée en parametre en tant qu'obserable ( et de ce fait , permettre que lapp continue de fonctionner) AVEC OF
      return of(result as T)
    }
  }

  // Prends parametre term => renvoie un observable contenant un flux de pokemon.
  // si term vide => Renvoie tableau vide sous la forme d'un observable
  // url specifique renvoie tous les pokemons contenant ou matchant le term, il ne FILTER pas yet 
  searchPokemons(term:string):Observable<Pokemon[]>{
    if (!term.trim()){
      return of ([])
    }
    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found pokemons matching '${term}`)),
      catchError(this.handleError<Pokemon[]>('searchPokemons',[]))
    )
  }

  updatePokemon(pokemon:Pokemon):Observable<Pokemon>{
    // format json , aded in line 43 (http.put)
    const httpOptions = {
      headers : new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    }

    //  put (url , les modifications s'appliquent sur un pok particulier)
    return this.http.put(this.pokemonsUrl,pokemon,httpOptions).pipe(
      tap(_ => this.log(`updated pokemon id = ${pokemon.id}`)),
      catchError(this.handleError<any>(`updatedPokemon`))
    )
  }


  deletePokemon(pokemon:Pokemon): Observable<Pokemon>{
    const url = `${this.pokemonsUrl}/${pokemon.id}`
    const httpOptions = {
      headers : new HttpHeaders({'Content-Type':'application/json'})
    }
    return this.http.delete<Pokemon>(url,httpOptions).pipe(
      tap(_ => this.log(`deleted pokemon id = ${pokemon.id}`)),
      catchError(this.handleError<any>(`deletePoke`))
    )
  }

  // Retourne tous les pokémons
  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(

      // Execute action quelconque avec tap(interagis sur le deroulement des evenements générés sur l'observable)
      tap((_) => this.log('fetched pokemons')),
      catchError(this.handleError('getpPokemons', []))
    );
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre
  getSinglePokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`
    return this.http.get<Pokemon>(url).pipe(
      tap(_ => this.log(`fetched pokemon id = ${id}`)),
      catchError(this.handleError<Pokemon>(`getPokemon ID = ${id}`))
    )
  }

  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
  
}
