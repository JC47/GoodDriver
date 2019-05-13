import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  escuela;
  @ViewChild('modalNew') public modalNew: ModalDirective;

  constructor(private usuarioService: UsuarioService) {
    this.escuela = JSON.parse(localStorage.getItem('escuela'));
  }

  async ngOnInit() {
    const res = await this.usuarioService.getUsuarios(this.escuela._id);
    if (res.ok) {
      this.usuarios = res.usuarios;
      console.log(this.usuarios);
    } else {
      console.log(res);
    }
  }

  showModal() {
    this.modalNew.show();
  }

}
