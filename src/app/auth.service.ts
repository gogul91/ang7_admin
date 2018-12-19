import {
    Injectable
} from '@angular/core';
import {
    JwtHelperService
} from '@auth0/angular-jwt';
import {
    Router
} from '@angular/router';
declare var Fingerprint2: any;
@Injectable()
export class AuthService {
    constructor(public jwtHelper: JwtHelperService, ) {
        // this.setClientToken()

     }
    public getToken(): string {
        return localStorage.getItem('token');
    }
    public getClientToken(): string {
        return localStorage.getItem('client_token');
    }

    public setClientToken() {
        let client_data = new Fingerprint2().get(function(result, components) {
            localStorage.setItem("client_token", result)
        });
    }
    public setToken(token) {
        localStorage.setItem("token", token);
    }
    
    public isAuthenticated(): boolean {        
        const token = localStorage.getItem('token');
        if (token) {
            return true;
        }
        else
        {
            return false
        }
        return !this.jwtHelper.isTokenExpired(token);
        
    }


    public logout() {
        localStorage.clear();

        

    }
}