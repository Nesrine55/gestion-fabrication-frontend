import { Routes } from '@angular/router';

import { Produits } from './produits/produits';
import { Machines } from './machines/machines';
import { EmployeComponent } from './employes/employes';
import { Ordres } from './ordres/ordres';

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
  },
  {
  path: 'employes',
  component: EmployeComponent
},
{
  path: 'ordres',
  component: Ordres
}

];