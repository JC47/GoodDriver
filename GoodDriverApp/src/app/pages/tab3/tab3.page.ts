import { Component } from '@angular/core';
import { GooddriverService } from '../../services/gooddriver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  loading = true;
  tests = [];

  constructor(public gdService: GooddriverService, private router: Router) {
    this.getData();
  }

  async getData() {
    const res = await this.gdService.getTests();
    this.loading = false;
    if (res.ok) {
      this.tests = res.tests;
      console.log('Tests', this.tests);
    } else {
      console.log('Error get tests');
    }
  }

  testDetail(id) {
    this.router.navigateByUrl(`/tabs/tab3/test/${id}`);
  }

}
