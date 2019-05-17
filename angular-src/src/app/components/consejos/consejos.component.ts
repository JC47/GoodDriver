import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsejoService } from '../../services/consejo.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.css']
})
export class ConsejosComponent implements OnInit {

  consejos = [];
  escuela;
  @ViewChild('modalNew') public modalNew: ModalDirective;
  @ViewChild('modalEdit') public modalEdit: ModalDirective;
  @ViewChild('modalDelete') public modalDelete: ModalDirective;
  editAdvice: FormGroup;
  newAdvice: FormGroup;
  loadingNew = false;
  loadingEdit = false;
  loadingDelete = false;
  deleteAdvice = {
    titulo: '',
    id: ''
  };

  constructor(private consejoService: ConsejoService) {
    this.escuela = JSON.parse(localStorage.getItem('escuela'));
    this.editAdvice = new FormGroup({
      titulo: new FormControl(),
      cuerpo: new FormControl(),
      tags: new FormControl(),
      id: new FormControl()
    });
    this.newAdvice = new FormGroup({
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
    const res = await this.consejoService.getConsejos();
    if (res.ok) {
      this.consejos = res.consejos;
      console.log(this.consejos);
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
    this.newAdvice.controls.titulo.setValue('');
    this.newAdvice.controls.cuerpo.setValue('');
    this.newAdvice.controls.tags.setValue('');
  }

  showEditModal(consejo) {
    this.editAdvice.controls.id.setValue(consejo._id);
    this.editAdvice.controls.titulo.setValue(consejo.titulo);
    this.editAdvice.controls.cuerpo.setValue(consejo.cuerpo);
    this.editAdvice.controls.tags.setValue(this.parseArrayTags(consejo.tags));
    this.modalEdit.show();
  }

  async updateAdvice() {
    this.loadingEdit = true;
    const id = this.editAdvice.controls.id.value;
    const body = {
      titulo: this.editAdvice.controls.titulo.value,
      cuerpo: this.editAdvice.controls.cuerpo.value,
      tags: this.parseTags(this.editAdvice.controls.tags.value)
    };
    const res = await this.consejoService.updateConsejo(id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al editar');
    }
    this.modalEdit.hide();
  }

  async addAdvice() {
    this.loadingNew = true;
    const body = {
      idEscuela: this.newAdvice.controls.idEscuela.value,
      titulo: this.newAdvice.controls.titulo.value,
      cuerpo: this.newAdvice.controls.cuerpo.value,
      tags: this.parseTags(this.newAdvice.controls.tags.value)
    };
    const res = await this.consejoService.addConsejo(body);
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
      if (tag.length > 1) {
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
    this.deleteAdvice.id = id;
    this.deleteAdvice.titulo = name;
    this.modalDelete.show();
  }

  async removeAdvice() {
    this.loadingDelete = true;
    const res = await this.consejoService.deleteConsejo(this.deleteAdvice.id);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al borrar');
    }
    this.modalDelete.hide();
  }

}
