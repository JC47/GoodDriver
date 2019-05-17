import { Component, OnInit, ViewChild } from '@angular/core';
import { EscuelaService } from '../../services/escuela.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {

  escuelas = [];
  @ViewChild('modalNew') public modalNew: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  editSchool: FormGroup;
  newSchool: FormGroup;
  loadingNew = false;
  loadingEdit = false;
  loadingDelete = false;
  deleteSchool = {
    nombre: '',
    id: ''
  };

  constructor(private escuelaService: EscuelaService) {
    this.editSchool = new FormGroup({
      nombre: new FormControl(),
      nickname: new FormControl(),
      direccion: new FormControl(),
      alumn: new FormControl(),
      id: new FormControl()
    });
    this.newSchool = new FormGroup({
      nombre: new FormControl(),
      nickname: new FormControl(),
      direccion: new FormControl(),
      alumn: new FormControl(),
    });
  }

  ngOnInit() {
    this.updateData();
  }

  async updateData() {
    const res = await this.escuelaService.getEscuelas();
    if (res.ok) {
      this.escuelas = res.escuelas;
      console.log(this.escuelas);
    } else {
      console.log(res);
    }
    this.loadingEdit = false;
    this.loadingDelete = false;
    this.loadingNew = false;
  }

  showNewModal() {
    this.clearValues();
    this.modalNew.show();
  }

  clearValues() {
    this.newSchool.controls.nombre.setValue('');
    this.newSchool.controls.nickname.setValue('');
    this.newSchool.controls.direccion.setValue('');
    this.newSchool.controls.alumn.setValue('');
  }

  showEditModal(escuela) {
    this.editSchool.controls.id.setValue(escuela._id);
    this.editSchool.controls.nombre.setValue(escuela.nombre);
    this.editSchool.controls.nickname.setValue(escuela.nickname);
    this.editSchool.controls.direccion.setValue(escuela.direccion);
    this.editSchool.controls.alumn.setValue(escuela.alumn);
    this.modalEdit.show();
  }

  async updateSchool() {
    this.loadingEdit = true;
    const id = this.editSchool.controls.id.value;
    const body = {
      nombre: this.editSchool.controls.nombre.value,
      nickname: this.editSchool.controls.nickname.value,
      direccion: this.editSchool.controls.direccion.value,
      alumn: this.editSchool.controls.alumn.value
    };
    const res = await this.escuelaService.updateEscuela(id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al editar');
    }
    this.modalEdit.hide();
  }

  async addSchool() {
    this.loadingNew = true;
    const body = {
      nombre: this.newSchool.controls.nombre.value,
      nickname: this.newSchool.controls.nickname.value,
      direccion: this.newSchool.controls.direccion.value,
      alumn: this.newSchool.controls.alumn.value
    };
    const res = await this.escuelaService.addEscuela(body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalNew.hide();
  }

  showDeleteModal(id, name) {
    this.deleteSchool.id = id;
    this.deleteSchool.nombre = name;
    this.modalDelete.show();
  }

  async removeSchool() {
    this.loadingDelete = true;
    const res = await this.escuelaService.deleteEscuela(this.deleteSchool.id);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al borrar');
    }
    this.modalDelete.hide();
  }

}
