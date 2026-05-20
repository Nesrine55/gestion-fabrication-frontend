import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private apiUrl = 'http://localhost:8088/machines';

  constructor(private http: HttpClient) {}

  getMachines(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addMachine(machine: any): Observable<any> {
    return this.http.post(this.apiUrl, machine);
  }

  updateMachine(id: number, machine: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, machine);
  }

  deleteMachine(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}