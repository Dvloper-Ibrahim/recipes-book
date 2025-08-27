import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { LoggingService } from './logging.service';
import { HeaderComponent } from './header/header.component';
import { autoLogin } from './auth/auth-store/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
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
