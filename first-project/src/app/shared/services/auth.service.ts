import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Subject, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Auth } from "../model/auth.model";
import { User } from "../model/user.model";

@Injectable({providedIn:'root'})
export class AuthService {

    userSubject:Subject<User> = new BehaviorSubject<User>(null);
    tokenExpirationTimer:any;

    constructor(private httpClient: HttpClient, private router: Router) {

    }

    signUp(email:string, password:string) {
        return this.httpClient.post<Auth>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.authKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
        tap(resp => {
            const tokenExpireDate =
            new Date(new Date().getTime() +
            + resp.expiresIn * 1000);

            const user = new User(
                    resp.localId,
                    resp.email,
                    resp.idToken,
                    tokenExpireDate);
        this.userSubject.next(user);
        this.autoLogout(+resp.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        }));
    }

    signIn(email:string, password:string) {
        return this.httpClient.post<Auth>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.authKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), 
        tap(resp => {
            const tokenExpireDate =
            new Date(new Date().getTime() +
            + resp.expiresIn * 1000);

            const user = new User(
                    resp.localId,
                    resp.email,
                    resp.idToken,
                    tokenExpireDate); 
        this.userSubject.next(user);
        this.autoLogout(+resp.expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        }));
    }   

    private handleError(errorResp: HttpErrorResponse) {
        let errorMsg = 'An error occured!!!';
                
                if(!errorResp.error || !errorResp.error.error){
                    return throwError(errorMsg);
                }

                console.log('error occured ', errorResp.error.error.message);
                switch(errorResp.error.error.message) {
                    case 'EMAIL_EXISTS':
                        errorMsg = 'The email address is already in use by another account.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMsg = 'User name or password is invalid.';
                        break;
                    case  'EMAIL_NOT_FOUND':
                        errorMsg = 'User name or password is invalid.';
                } 

                return throwError(errorMsg);
    }

    logOut(){
        this.userSubject.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const user: {
            id: string,
            email: string,
            _token: string,
            _tokenExpireDate: string
        } = JSON.parse(localStorage.getItem("userData"));

        let loggedInUser:User = null;
        
        if(user) {
            loggedInUser = new User(user.id, user.email, 
                user._token, new Date(user._tokenExpireDate));
                if(loggedInUser.getToken()) {
                    this.userSubject.next(loggedInUser);
                    const expirationDuration = new Date(user._tokenExpireDate).getTime() - new Date().getTime();
                    this.autoLogout(expirationDuration);
                }
        } 
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logOut()
        }, expirationDuration);
    }

}