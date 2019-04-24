import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios = [];
  escuela;

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

}
