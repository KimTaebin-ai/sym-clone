import { Component, Directive, OnInit, Pipe } from '@angular/core';
import { ConfigAPIService } from 'src/app/services/API/config-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

@Directive({
  selector: '[login-submit]',
  host: {
    '(click)': 'login()'
  }
})

export class LoginPage implements OnInit {
  id: string;
  password: string;


  constructor(
   private configApiService: ConfigAPIService
  ) { 

  }

  ngOnInit() {
  }

  login(id: string, pw: string) {
    if (id && pw) {
      this.configApiService.Login(id, pw);
    }
  }
}
