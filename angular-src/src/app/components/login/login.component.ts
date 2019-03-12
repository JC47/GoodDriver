import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  valid = false;

  constructor(/* private auth: AuthService */) {
    this.login = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit() {
  }

  loginSubmit() {
    const data = {
      nickname: this.login.controls.username.value,
      token: this.login.controls.password.value
    };
    console.log('Perro ', data);
    /* this.auth.schoolLogin(data).subscribe( (res) => {
      console.log(res);
    }); */
  }

}
