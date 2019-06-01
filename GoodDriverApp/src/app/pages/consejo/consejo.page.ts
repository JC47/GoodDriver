import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GooddriverService } from '../../services/gooddriver.service';

@Component({
  selector: 'app-consejo',
  templateUrl: './consejo.page.html',
  styleUrls: ['./consejo.page.scss'],
})
export class ConsejoPage implements OnInit {
  loading = true;
  consejo = null;

  constructor(public dgService: GooddriverService, private router: ActivatedRoute) {
    const id = this.router.snapshot.paramMap.get('id');
    this.getData(id);
  }

  ngOnInit() {
  }

  async getData(id) {
    const res = await this.dgService.getConsejo(id);
    this.loading = false;
    if (res.ok) {
      this.consejo = res.consejo;
    } else {
      console.log('Error get consejo');
    }
  }

}
