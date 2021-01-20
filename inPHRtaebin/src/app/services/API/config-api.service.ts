import { Injectable } from '@angular/core';
import { UserService } from '../Store/user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigAPIService {

  constructor
  ( 
    private userService: UserService
  ) { }

  public Login(id: string, pw: string) {
    this.userService.getAll();
  }
}
