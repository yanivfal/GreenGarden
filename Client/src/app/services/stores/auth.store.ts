import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';
import {map, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router, Routes} from '@angular/router';
import {CartStore} from './cart-store';
import {CookieService} from 'ngx-cookie-service';

const AUTH_DATA = 'auth_data';

@Injectable({
    providedIn: 'root'
})
export class AuthStore {

    private subject = new BehaviorSubject<User>(null);

    user$: Observable<User> = this.subject.asObservable();

    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;
    isAdmin$: Observable<boolean>;

    constructor(private http: HttpClient, private router: Router,
                private cartStore: CartStore, private cookieService: CookieService) {

        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

        this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

        const user = localStorage.getItem(AUTH_DATA);

        if (user) {
            this.subject.next(JSON.parse(user));
        }

    }

    login(email: string, password: string, remember: boolean): Observable<User> {
        return this.http.post<User>('http://127.0.0.1:3000/api/users/login', {email, password, remember},{ withCredentials: true})
            .pipe(
                tap(user => {
                    this.subject.next(user);
                    localStorage.setItem(AUTH_DATA, JSON.stringify(user));
                    this.cartStore.init();
                }),
                shareReplay()
            );
    }

    logout() {
      return this.http.post<any>('http://127.0.0.1:3000/api/users/logout', {})
        .pipe(
          tap(response => {

            this.subject.next(null);
            localStorage.removeItem(AUTH_DATA);
            this.router.navigateByUrl('/login');
          }),
          shareReplay()
        );

        // this.subject.next(null);
        // localStorage.removeItem(AUTH_DATA);
        // this.cookieService.delete('connect.sid', '/', 'localhost', false, 'None');
        // this.router.navigateByUrl('/login');
    }

    register(newUser: User): Observable<User>{
      return this.http.post<User>('http://localhost:3000/api/users/register', newUser)
        .pipe(
          tap(user => {
            this.subject.next(user);
            localStorage.setItem(AUTH_DATA, JSON.stringify(user));

          }),
          shareReplay()
        );
    }

    getToken() {
      const user = JSON.parse(localStorage.getItem(AUTH_DATA));
      if (user) {
        return user.token;
      }
    }

    getUserDetails(): User {
      return this.subject.getValue();
    }

    isAdmin() {

    }

}
