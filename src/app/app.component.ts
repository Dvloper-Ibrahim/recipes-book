import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import { autoLogin } from './auth/auth-store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store, private loggingService: LoggingService) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
