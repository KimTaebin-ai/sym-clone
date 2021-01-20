import { Component, OnInit } from '@angular/core';
import { config } from 'rxjs';
import { ConfigAPIService } from 'src/app/services/API/config-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor
  (
    private configApiService: ConfigAPIService
  ) { }

  ngOnInit() {
  }
}
