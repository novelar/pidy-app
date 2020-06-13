import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  responseJson: string;

  constructor(public auth: AuthService, private api: ApiService) { }

  ngOnInit() { }

  pingApi() {
    this.api.ping$().subscribe(
      res => this.responseJson = res
    );
  }

}