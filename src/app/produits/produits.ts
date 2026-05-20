import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produits.html',
  styleUrls: ['./produits.css']
})
export class Produits implements OnInit {

  produits: any[] = [];

  produit = {
    id: null,
    nom: '',
    type: '',
    stock: 0,
    fournisseur: ''
  };

  editMode = false;

  constructor(
    private produitService: ProduitService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits() {
    this.produitService.getProduits().subscribe(data => {
      this.produits = data;
      this.cd.detectChanges();
    });
  }

  addProduit() {

    if (this.editMode) {

      this.produitService.updateProduit(
        this.produit.id!,
        this.produit
      ).subscribe(() => {

        this.getProduits();
        this.resetForm();

      });

    } else {

      this.produitService.addProduit(this.produit).subscribe(() => {

        this.getProduits();
        this.resetForm();

      });
    }
  }

  editProduit(p: any) {

    this.editMode = true;

    this.produit = {
      id: p.id,
      nom: p.nom,
      type: p.type,
      stock: p.stock,
      fournisseur: p.fournisseur
    };
  }

  deleteProduit(id: number) {

    this.produitService.deleteProduit(id).subscribe(() => {
      this.getProduits();
    });

  }

  resetForm() {

    this.produit = {
      id: null,
      nom: '',
      type: '',
      stock: 0,
      fournisseur: ''
    };

    this.editMode = false;
  }
}