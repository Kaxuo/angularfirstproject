import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './components/data/data.component';
import { DetailpokemonComponent } from './components/detailpokemon/detailpokemon.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { EditPokemonComponent } from './components/edit-pokemon/edit-pokemon.component';
import { LoginFOrmComponent } from './components/login-form/login-form.component';
import { AuthGuardService } from './services/auth-guard.service';

// routes
const appRoutes: Routes = [
  {
    path: 'pokemon',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: DataComponent },
      {
        path: 'edit/:id',
        component: EditPokemonComponent,
        canActivate: [AuthGuardService],
      },
      { path: ':id', component: DetailpokemonComponent },
    ],
  },
  { path:'login', component:LoginFOrmComponent},
  { path: '', redirectTo: 'pokemon/all', pathMatch: 'full' },
  // intercept all route not known
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
