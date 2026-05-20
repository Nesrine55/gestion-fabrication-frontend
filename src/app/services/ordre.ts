import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdreService {

  private apiUrl = 'http://localhost:8088/ordres';

  constructor(private http: HttpClient) { }

  getOrdres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addOrdre(ordre: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ordre);
  }

  updateOrdre(id: number, ordre: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, ordre);
  }

  deleteOrdre(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}