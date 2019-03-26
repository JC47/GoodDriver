import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  root = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.root = this.auth.isRoot();
  }

  logout() {
    this.auth.logOut();
  }

}
