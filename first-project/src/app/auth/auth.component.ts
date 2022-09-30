import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '../shared/model/auth.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  error:string = null;
  isLoginMode = true;
  isLoading = false;
  activeMode:string = 'Sign in';
  switchMode:string = 'Sign up';
  authObserver: Observable<Auth>;
  
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.activeMode = this.isLoginMode ? 'Sign in' : 'Sign up';
    this.switchMode = this.isLoginMode ? 'Sign up' : 'Sign in';
  }

  onSubmit(authForm:NgForm) {
    if(!authForm.valid) {
      return ;
    }

    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObserver = this.authService
      .signIn(authForm.value.email, authForm.value.password);
    } else {
      this.authObserver = this.authService
      .signUp(authForm.value.email, authForm.value.password);
    }

    this.authObserver.subscribe(resp => {
        console.log('Response ' , resp);       
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/recipes']);
    }, errorResp => {
        console.log('error ', errorResp);    
        this.error = errorResp;
        this.isLoading = false;
    }); 

    authForm.reset();
  }

  onClose() {
    console.log(this.error);
    this.error = null;
    console.log(this.error)
  }
}
