import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MachineService } from '../services/machine';

@Component({
  selector: 'app-machines',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './machines.html',
  styleUrls: ['./machines.css']
})
export class Machines implements OnInit {

  machines: any[] = [];

  machine = {
    id: null,
    nom: '',
    etat: '',
    derniereMaintenance: ''
  };

  editMode = false;

  constructor(
    private machineService: MachineService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getMachines();
  }

  getMachines() {
    this.machineService.getMachines().subscribe(data => {
      this.machines = data;
      this.cd.detectChanges();
    });
  }

  addMachine() {

    if (this.editMode) {

      this.machineService.updateMachine(
        this.machine.id!,
        this.machine
      ).subscribe(() => {

        this.getMachines();
        this.resetForm();

      });

    } else {

      this.machineService.addMachine(this.machine).subscribe(() => {

        this.getMachines();
        this.resetForm();

      });
    }
  }

  editMachine(m: any) {

    this.editMode = true;

    this.machine = {
      id: m.id,
      nom: m.nom,
      etat: m.etat,
      derniereMaintenance: m.derniereMaintenance
    };
  }

  deleteMachine(id: number) {

    this.machineService.deleteMachine(id).subscribe(() => {
      this.getMachines();
    });

  }

  resetForm() {

    this.machine = {
      id: null,
      nom: '',
      etat: '',
      derniereMaintenance: ''
    };

    this.editMode = false;
  }
}