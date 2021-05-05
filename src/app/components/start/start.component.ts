import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
