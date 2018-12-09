import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {

  // Server: string = 'http://ec2-52-34-75-49.us-west-2.compute.amazonaws.com:3000/';
  Server: string = 'http://34.217.198.144:3000/';
  // Server: string = 'http://localhost:3000/';
  ApiUrl: string = '';
  imageServerWithApiUrl: string = 'http://34.217.198.144:3000/';
  ServerWithApiUrl = this.Server + this.ApiUrl;
}
