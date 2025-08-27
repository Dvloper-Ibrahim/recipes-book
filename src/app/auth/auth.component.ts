import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  // ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AlertComponent } from '../shared/alert/alert.component';
// import { PlaceHolderDirective } from '../shared/place-holder/place-holder.directive';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import {
  clearAuthError,
  startLogin,
  startSignup,
} from './auth-store/auth.actions';
import { selectAuthState } from './auth-store/auth.selector';
import { StoreState } from '../shared/store/store-repo';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertComponent, LoadingSpinnerComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  storeSub!: Subscription;

  /* Another solution for alert component */
  // private closeAlertSub: Subscription;
  // @ViewChild(PlaceHolderDirective, { static: false })
  // alertHost: PlaceHolderDirective;

  constructor(
    private compFactoryResolver: ComponentFactoryResolver,
    private store: Store<StoreState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store
      .select(selectAuthState)
      .subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(startLogin({ value: { email, password } }));
    } else {
      this.store.dispatch(startSignup({ value: { email, password } }));
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(clearAuthError());
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

    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
