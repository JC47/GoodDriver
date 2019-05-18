import { Component, OnInit, ViewChild } from '@angular/core';
import { TestService } from '../../services/test.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  escuela;
  tests = [];
  @ViewChild('modalNewTest') public modalNewTest: ModalDirective;
  @ViewChild('modalNewQuestion') public modalNewQuestion: ModalDirective;
  @ViewChild('modalDeleteTest') public modalDeleteTest: ModalDirective;
  @ViewChild('modalDeleteQuestion') public modalDeleteQuestion: ModalDirective;
  // editSchool: FormGroup;
  newTest: FormGroup;
  newQuestion: FormGroup;
  loadingNewTest = false;
  loadingNewQuestion = false;
  loadingDeleteTest = false;
  loadingDeleteQuestion = false;
  deleteTest = {
    nombre: '',
    id: ''
  };
  deleteQuestion = {
    cuestion: '',
    id: '',
    idQ: ''
  };

  constructor(private testService: TestService) {
    this.escuela = JSON.parse(localStorage.getItem('escuela'));
    this.newTest = new FormGroup({
      nombre: new FormControl(),
      idEscuela: new FormControl(this.escuela._id)
    });
    this.newQuestion = new FormGroup({
      idTest: new FormControl(),
      cuestion: new FormControl(),
      respuesta1: new FormControl(),
      respuesta2: new FormControl(),
      respuesta3: new FormControl(),
      correcta: new FormControl()
    });
  }

  ngOnInit() {
    this.updateData();
  }

  showDeleteTestModal(id, nombre) {
    this.deleteTest.id = id;
    this.deleteTest.nombre = nombre;
    this.modalDeleteTest.show();
  }

  showDeleteQuestionModal(id, id2 , nombre) {
    this.deleteQuestion.id = id;
    this.deleteQuestion.idQ = id2;
    this.deleteQuestion.cuestion = nombre;
    this.modalDeleteQuestion.show();
  }

  showNewQuestionModal(id) {
    this.clearQuestionVales(id);
    this.modalNewQuestion.show();
  }

  showNewTestModal() {
    this.clearTestValues();
    this.modalNewTest.show();
  }

  clearTestValues() {
    this.newTest.controls.nombre.setValue('');
  }

  clearQuestionVales(id) {
    this.newQuestion.controls.idTest.setValue(id);
    this.newQuestion.controls.cuestion.setValue('');
    this.newQuestion.controls.respuesta1.setValue('');
    this.newQuestion.controls.respuesta2.setValue('');
    this.newQuestion.controls.respuesta3.setValue('');
  }

  async updateData() {
    const res = await this.testService.getTests();
    if (res.ok) {
      this.tests = res.tests;
      this.tests.sort( (a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      console.log(this.tests);
    } else {
      console.log(res);
    }
    this.loadingNewTest = false;
    this.loadingNewQuestion = false;
    this.loadingDeleteTest = false;
    this.loadingDeleteQuestion = false;
  }

  async addQuestion() {
    this.loadingNewQuestion = true;
    const id = this.newQuestion.controls.idTest.value;
    const body = {
      cuestion: this.newQuestion.controls.cuestion.value,
      respuestas: [
        {
          respuesta: this.newQuestion.controls.respuesta1.value,
          correcta: false
        },
        {
          respuesta: this.newQuestion.controls.respuesta2.value,
          correcta: false
        },
        {
          respuesta: this.newQuestion.controls.respuesta3.value,
          correcta: false
        }
      ]
    };

    switch (this.newQuestion.controls.correcta.value) {
      case 'Respuesta1':
        body.respuestas[0].correcta = true;
        break;
      case 'Respuesta2':
        body.respuestas[1].correcta = true;
        break;
      case 'Respuesta3':
        body.respuestas[2].correcta = true;
        break;
      default:
        body.respuestas[0].correcta = true;
        break;
    }

    const res = await this.testService.addQuestionTest(id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalNewQuestion.hide();
  }

  async addTest() {
    this.loadingNewTest = true;
    const body = {
      idEscuela: this.newTest.controls.idEscuela.value,
      nombre: this.newTest.controls.nombre.value
    };
    const res = await this.testService.addTest(body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalNewTest.hide();
  }

  async removeQuestionTest() {
    this.loadingDeleteQuestion = true;
    const body = {
      id: this.deleteQuestion.idQ
    };
    const res = await this.testService.deleteQuestionTest(this.deleteQuestion.id, body);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalDeleteQuestion.hide();
  }

  async removeTest() {
    this.loadingDeleteTest = true;
    const res = await this.testService.deleteTest(this.deleteTest.id);
    if (res.ok) {
      this.updateData();
    } else {
      alert('Error al agregar');
    }
    this.modalDeleteTest.hide();
  }

}
