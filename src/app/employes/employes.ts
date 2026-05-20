import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { EmployeService } from '../services/employe';
import { MachineService } from '../services/machine';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employes.html',
  styleUrls: ['./employes.css']
})
export class EmployeComponent implements OnInit {

  employes: any[] = [];
  machines: any[] = [];

  employe: any = {
    nom: '',
    poste: '',
    machine: null
  };

  editMode = false;

  constructor(
    private employeService: EmployeService,
    private machineService: MachineService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEmployes();
    this.loadMachines();
  }

  loadEmployes() {
    this.employeService.getEmployes().subscribe(data => {
    this.employes = [...data];

    this.cdr.detectChanges();
    });
  }

  loadMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
      this.cdr.detectChanges();
    });
  }

  saveEmploye() {

    if (this.editMode) {

      this.employeService.updateEmploye(
        this.employe['id'],
        this.employe
      ).subscribe(() => {

        this.loadEmployes();

        this.resetForm();
      });

    } else {

      this.employeService.addEmploye(this.employe)
        .subscribe(() => {

          this.loadEmployes();

          this.resetForm();
        });
    }
  }

  editEmploye(emp: any) {
    this.employe = { ...emp };
    this.editMode = true;
  }

  deleteEmploye(id: number) {
    this.employeService.deleteEmploye(id)
      .subscribe(() => {
        this.loadEmployes();
      });
  }

  resetForm() {
    this.employe = {
      nom: '',
      poste: '',
      machine: null
    };

    this.editMode = false;
  }
 
}