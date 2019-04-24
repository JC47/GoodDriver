import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EscuelaService } from '../../services/escuela.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  escuela: any;
  profile: FormGroup;
  editing = true;
  aux: any;

  constructor(private escuelaService: EscuelaService) {
    this.aux = JSON.parse(localStorage.getItem('escuela'));
    this.profile = new FormGroup({
      nickname: new FormControl(),
      direccion: new FormControl()
    });
  }

  async ngOnInit() {
    const res = await this.escuelaService.meEscuela(this.aux._id);
    if (res.ok) {
      console.log(res);
      this.escuela = res.escuela;
    } else {
      this.escuela = this.aux;
    }
    this.assingValues();
  }

  assingValues() {
    this.profile.controls.nickname.setValue(this.escuela.nickname);
    this.profile.controls.direccion.setValue(this.escuela.direccion);
    this.profile.controls.nickname.disable();
    this.profile.controls.direccion.disable();
  }

  async editProfile() {
    this.profile.controls.nickname.disable();
    this.profile.controls.direccion.disable();
    const data = {
      nickname: this.profile.controls.nickname.value,
      direccion: this.profile.controls.direccion.value
    };
    const res = await this.escuelaService.updateEscuela(this.aux._id, data);
    console.log(res);
    if (res.ok) {
      this.profile.controls.nickname.setValue(res.escuela.nickname);
      this.profile.controls.direccion.setValue(res.escuela.direccion);
    } else {
      alert('Error al editar');
    }
  }

  edit() {
    this.editing = false;
    this.profile.controls.nickname.enable();
    this.profile.controls.direccion.enable();
  }

  cancel() {
    this.editing = true;
  }

}
