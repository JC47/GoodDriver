import { Component } from '@angular/core';
import { GooddriverService } from '../../services/gooddriver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  loading = true;
  reglas = [];

  constructor(public gdService: GooddriverService, private router: Router) {
    this.getData();
  }

  async getData() {
    const res = await this.gdService.getReglas();
    this.loading = false;
    if (res.ok) {
      this.reglas = res.reglas;
      console.log('Reglas', this.reglas);
    } else {
      console.log('Error get reglas');
    }
  }

  reglaDetail(id) {
    this.router.navigateByUrl(`/tabs/tab1/regla/${id}`);
  }



}
