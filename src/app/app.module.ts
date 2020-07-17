import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataComponent } from './components/data/data.component';
import { BordercardDirective } from './directive/bordercard.directive';
import { PokemontypecolorsPipe } from './pipe/pokemontypecolors.pipe';
import { DetailpokemonComponent } from './components/detailpokemon/detailpokemon.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PokemonDataService } from './services/pokemon-data.service';
import { PokemonFormComponent } from './components/pokemon-form/pokemon-form.component'
import {FormsModule} from '@angular/forms';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component'
import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import {InMemoryDataService} from './services/in-memory-data.service';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginFOrmComponent } from './components/login-form/login-form.component'

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    BordercardDirective,
    PokemontypecolorsPipe,
    DetailpokemonComponent,
    PagenotfoundComponent,
    PokemonFormComponent,
    EditPokemonComponent,
    SearchPokemonComponent,
    LoadingComponent,
    LoginFOrmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // Api ready to use with those two, WebAPiModule intercepte les requete http et retourne les reponses simulés , lorsque qu'on hook to real api , alors faudra juste remove this line.
    // data encapsulation permet de preciser le format des données renvoyées par l'API
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation:false})
  ],
  providers: [PokemonDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
