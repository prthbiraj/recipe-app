import { NgIfContext } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterceptore implements HttpInterceptor{

    constructor(private authService: AuthService){

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return this.authService.userSubject.pipe(take(1),
                    exhaustMap(user => {  
                        if(!user) {
                            return next.handle(req);
                        }
                        const authReq =  req.clone(
                        {
                            params: new HttpParams().set('auth', user.getToken())
                        });
                        return next.handle(authReq);
                    }));
    }

}