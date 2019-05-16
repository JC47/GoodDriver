import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  escuela;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  editUser: FormGroup;
  loadingEdit = false;
  loadingDelete = false;
  deleteUser = {
    nombre: '',
    id: ''
  };

  constructor(private usuarioService: UsuarioService) {
    this.escuela = JSON.parse(localStorage.getItem('escuela'));
    this.editUser = new FormGroup({
      nombre: new FormControl(),
      password: new FormControl(),
      email: new FormControl(),
      id: new FormControl()
    });
  }

  ngOnInit() {
    this.updateData();
  }

  async updateData() {
    const res = await this.usuarioService.getUsuarios(this.escuela._id);
    if (res.ok) {
      this.usuarios = res.usuarios;
      console.log(this.usuarios);
    } else {
      console.log(res);
    }
    this.loadingEdit = false;
    this.loadingDelete = false;
  }

  showEditModal(user) {
    this.editUser.controls.nombre.setValue(user.nombre);
    this.editUser.controls.email.setValue(user.email);
    this.editUser.controls.id.setValue(user._id);
    this.modalEdit.show();
  }

  async updateUser() {
    this.loadingEdit = true;
    const id = this.editUser.controls.id.value;
    const body = {
      nombre: this.editUser.controls.nombre.value,
      email: this.editUser.controls.email.value
    };
    if (this.editUser.controls.password.value) {
// tslint:disable-next-line: no-string-literal
      body['password'] = this.editUser.controls.password.value;
    }
    const res = await this.usuarioService.updateUsuario(id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al editar');
    }
    this.modalEdit.hide();
  }

  showDeleteModal(id, name) {
    this.deleteUser.id = id;
    this.deleteUser.nombre = name;
    this.modalDelete.show();
  }

  async removeUser() {
    this.loadingDelete = true;
    const res = await this.usuarioService.deleteUsuario(this.deleteUser.id);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al borrar');
    }
    this.modalDelete.hide();
  }

}
