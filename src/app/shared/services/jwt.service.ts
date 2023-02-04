import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  constructor(){}

  getToken(): any {
    return window.localStorage['jwtToken'];
  }

}