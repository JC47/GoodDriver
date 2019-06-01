import { Component } from '@angular/core';
import { GooddriverService } from '../../services/gooddriver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading = true;
  consejos = [];

  constructor(public gdService: GooddriverService, private router: Router) {
    this.getData();
  }

  async getData() {
    const res = await this.gdService.getConsejos();
    this.loading = false;
    if (res.ok) {
      this.consejos = res.consejos;
      console.log('Consejos', this.consejos);
    } else {
      console.log('Error get consejos');
    }
  }

  consejoDetail(id) {
    this.router.navigateByUrl(`/tabs/tab2/consejo/${id}`);
  }

}
