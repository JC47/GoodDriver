import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  valid = false;
  loading = false;

  constructor(private auth: AuthService,
              private router: Router) {
    this.login = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  async loginSubmit() {
    const data = {
      nickname: this.login.controls.username.value,
      token: this.login.controls.password.value
    };
    this.loading = true;
    const res = await this.auth.loginRequest(data);
    this.loading = false;
    if (res.ok) {
      this.valid = false;
      localStorage.setItem('GDToken', res.token);
      localStorage.setItem('escuela', JSON.stringify(res.escuela));
      this.router.navigate(['/escuela']);
    } else {
      this.valid = true;
    }
  }

}
