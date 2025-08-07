import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  // ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/place-holder/place-holder.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;

  /* Another solution for alert component */
  // private closeAlertSub: Subscription;
  // @ViewChild(PlaceHolderDirective, { static: false })
  // alertHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private compFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.showErrorAlert(errorMessage);   /* Another solution for alert component */
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  /* Another solution for alert component */

  // private showErrorAlert(message: string) {
  //   const alertCompFactory =
  //     this.compFactoryResolver.resolveComponentFactory(AlertComponent);

  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //   const compRef = hostViewContainerRef.createComponent(alertCompFactory);

  //   compRef.instance.message = message;
  //   this.closeAlertSub = compRef.instance.close.subscribe(() => {
  //     this.closeAlertSub.unsubscribe();
  //     hostViewContainerRef.clear();
  //   });
  // }

  ngOnDestroy(): void {
    /* Another solution for alert component */
    // if (this.closeAlertSub) {
    //   this.closeAlertSub.unsubscribe();
    // }
  }
}
