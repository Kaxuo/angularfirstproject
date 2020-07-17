import { InMemoryDbService } from 'angular-in-memory-web-api';
import { POKEMONS } from './mock-pokemon';
  
// Simulate database , allow you to make get /put request , even queries
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let pokemons = POKEMONS;
        return { pokemons };
    }
}