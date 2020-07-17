import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemontypecolors'
})
export class PokemontypecolorsPipe implements PipeTransform {
// Accepte valeur correspond a la valeur de la propriété sur lequel s'applique notre pipe => ici type d'un pokemon, ici , pipe n'a pas de parametres
  transform(type:string): string {
    let color:string;

    switch (type) {
      case 'Feu':
        color = 'red lighten-1';
        break;
      case 'Eau':
        color = 'blue lighten-1';
        break;
      case 'Plante':
        color = 'green lighten-1';
        break;
      case 'Insecte':
        color = 'brown lighten-1';
        break;
      case 'Normal':
        color = 'grey lighten-3';
        break;
      case 'Vol':
        color = 'blue lighten-3';
        break;
      case 'Poison':
        color = 'deep-purple accent-1';
        break;
      case 'Fée':
        color = 'pink lighten-4';
        break;
      case 'Psy':
        color = 'deep-purple darken-2';
        break;
      case 'Electrik':
        color = 'lime accent-1';
        break;
      case 'Combat':
        color = 'deep-orange';
        break;
      default:
        color = 'grey';
        break;
    }

    // Come from the materialze css 
    return 'chip ' + color;

  }
  }

