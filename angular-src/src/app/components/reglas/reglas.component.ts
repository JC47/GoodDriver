import { Component, OnInit, ViewChild } from '@angular/core';
import { ReglaService } from '../../services/regla.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reglas',
  templateUrl: './reglas.component.html',
  styleUrls: ['./reglas.component.css']
})
export class ReglasComponent implements OnInit {

  reglas = [];
  escuela;
  @ViewChild('modalNew') public modalNew: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  editRule: FormGroup;
  newRule: FormGroup;
  loadingNew = false;
  loadingEdit = false;
  loadingDelete = false;
  deleteRule = {
    titulo: '',
    id: ''
  };

  constructor(private relgaService: ReglaService) {
    this.escuela = JSON.parse(localStorage.getItem('escuela'));
    this.editRule = new FormGroup({
      titulo: new FormControl(),
      cuerpo: new FormControl(),
      tags: new FormControl(),
      id: new FormControl()
    });
    this.newRule = new FormGroup({
      idEscuela: new FormControl(this.escuela._id),
      titulo: new FormControl(),
      cuerpo: new FormControl(),
      tags: new FormControl(),
    });
  }

  ngOnInit() {
    this.updateData();
  }

  async updateData() {
    const res = await this.relgaService.getReglas();
    if (res.ok) {
      this.reglas = res.reglas;
      console.log(this.reglas);
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
    this.newRule.controls.titulo.setValue('');
    this.newRule.controls.cuerpo.setValue('');
    this.newRule.controls.tags.setValue('');
  }

  showEditModal(regla) {
    this.editRule.controls.id.setValue(regla._id);
    this.editRule.controls.titulo.setValue(regla.titulo);
    this.editRule.controls.cuerpo.setValue(regla.cuerpo);
    this.editRule.controls.tags.setValue(this.parseArrayTags(regla.tags));
    this.modalEdit.show();
  }

  async updateRule() {
    this.loadingEdit = true;
    const id = this.editRule.controls.id.value;
    const body = {
      titulo: this.editRule.controls.titulo.value,
      cuerpo: this.editRule.controls.cuerpo.value,
      tags: this.parseTags(this.editRule.controls.tags.value)
    };
    const res = await this.relgaService.updateRegla(id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al editar');
    }
    this.modalEdit.hide();
  }

  async addRule() {
    this.loadingNew = true;
    const body = {
      idEscuela: this.newRule.controls.idEscuela.value,
      titulo: this.newRule.controls.titulo.value,
      cuerpo: this.newRule.controls.cuerpo.value,
      tags: this.parseTags(this.newRule.controls.tags.value)
    };
    const res = await this.relgaService.addRegla(body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalNew.hide();
  }

  parseArrayTags(arrTag) {
    let stringTags = '';
    for (let i = 0; i < arrTag.length; i++) {
      if (arrTag[i].length > 1) {
        if (i === (arrTag.length - 1)) {
          stringTags += arrTag[i];
        } else {
          stringTags += arrTag[i] + ', ';
        }
      }
    }
    return stringTags;
  }

  parseTags(stringTags: string) {
    const tags = [];
    const auxTags = stringTags.split(',');
    for (const tag of auxTags) {
      tag.replace('.', '');
      if (tag.length > 1 ) {
        if (tag.indexOf(' ') === 0) {
          tags.push(tag.substr(1));
        } else if (tag.lastIndexOf(' ') === (tag.length - 1)) {
          tags.push(tag.substr(0, tag.length - 1));
        } else {
          tags.push(tag);
        }
      }
    }
    return tags;
  }

  showDeleteModal(id, name) {
    this.deleteRule.id = id;
    this.deleteRule.titulo = name;
    this.modalDelete.show();
  }

  async removeRule() {
    this.loadingDelete = true;
    const res = await this.relgaService.deleteRegla(this.deleteRule.id);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al borrar');
    }
    this.modalDelete.hide();
  }

}
