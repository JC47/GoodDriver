import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GooddriverService } from '../../services/gooddriver.service';

@Component({
  selector: 'app-regla',
  templateUrl: './regla.page.html',
  styleUrls: ['./regla.page.scss'],
})
export class ReglaPage implements OnInit {
  loading = true;
  regla = null;

  constructor(public dgService: GooddriverService, private router: ActivatedRoute) {
    const id = this.router.snapshot.paramMap.get('id');
    this.getData(id);
  }

  ngOnInit() {
  }

  async getData(id) {
    const res = await this.dgService.getRegla(id);
    this.loading = false;
    if (res.ok) {
      this.regla = res.regla;
    } else {
      console.log('Error get regla');
    }
  }

}
