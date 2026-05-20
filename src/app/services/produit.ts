import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = 'http://localhost:8088/produits';

  constructor(private http: HttpClient) { }

  getProduits(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProduit(produit: any): Observable<any> {
    return this.http.post(this.apiUrl, produit);
  }

  deleteProduit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateProduit(id: number, produit: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, produit);
  }
}