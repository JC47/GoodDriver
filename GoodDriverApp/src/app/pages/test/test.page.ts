import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooddriverService } from '../../services/gooddriver.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  loading = true;
  test = null;

  constructor(public dgService: GooddriverService, private router: ActivatedRoute, private router2: Router,
              public alertController: AlertController) {
    const id = this.router.snapshot.paramMap.get('id');
    this.getData(id);
  }

  ngOnInit() {
  }

  async getData(id) {
    const res = await this.dgService.getTest(id);
    this.loading = false;
    if (res.ok) {
      this.test = res.test;
      console.log('Test ', res.test);
    } else {
      console.log('Error get test');
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: '',
      message: 'Los resultados de la prueba han sido guardados',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router2.navigateByUrl(`/tabs/tab3`);
        }
      }]
    });

    await alert.present();
  }

}
