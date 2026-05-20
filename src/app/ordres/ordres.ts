import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrdreService } from '../services/ordre';
import { ProduitService } from '../services/produit';

@Component({
  selector: 'app-ordres',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ordres.html',
  styleUrls: ['./ordres.css']
})
export class Ordres implements OnInit {

  ordres: any[] = [];
  produits: any[] = [];

  ordre: any = {
    projet: '',
    produit: null,
    quantite: null,
    date: '',
    etat: ''
  };

  editMode = false;

  constructor(
    private OrdreService: OrdreService,
    private produitService: ProduitService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadOrdres();
    this.loadProduits();
  }

  loadOrdres() {

    this.OrdreService.getOrdres().subscribe(data => {

      this.ordres = [...data];

      this.cdr.detectChanges();

    });
  }

  loadProduits() {

    this.produitService.getProduits().subscribe(data => {

      this.produits = data;

    });
  }

  saveOrdre() {

    if (this.editMode) {

      this.OrdreService.updateOrdre(
        this.ordre.id,
        this.ordre
      ).subscribe(() => {

        this.loadOrdres();

        this.resetForm();
      });

    } else {

      this.OrdreService.addOrdre(this.ordre)
        .subscribe(() => {

          this.loadOrdres();

          this.resetForm();
        });
    }
  }

  editOrdre(o: any) {

    this.ordre = { ...o };

    this.editMode = true;
  }

  deleteOrdre(id: number) {

    this.OrdreService.deleteOrdre(id)
      .subscribe(() => {

        this.loadOrdres();
      });
  }

  resetForm() {

    this.ordre = {
      projet: '',
      produit: null,
      quantite: null,
      date: '',
      etat: ''
    };

    this.editMode = false;
  }

  trackById(index: number, item: any): number {
    return item.id;
  }

  changerEtat(ordre: any, nouvelEtat: string) {

  ordre.etat = nouvelEtat;

  this.OrdreService.updateOrdre(ordre.id, ordre)
    .subscribe(() => {

      this.loadOrdres();

    });

}
}