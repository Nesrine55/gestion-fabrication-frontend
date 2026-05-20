import { Routes } from '@angular/router';

import { Produits } from './produits/produits';
import { Machines } from './machines/machines';

export const routes: Routes = [

  {
    path: 'produits',
    component: Produits
  },

  {
    path: 'machines',
    component: Machines
  },

  {
    path: '',
    redirectTo: 'produits',
    pathMatch: 'full'
  }

];