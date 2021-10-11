import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import * as firebase from 'firebase/app';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private urlEndPoint: string = 'http://localhost:8002';
  public userData: any;
  public user: firebase.User;
  public showLoader: boolean = false;

  constructor(public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService,
    public http: HttpClient
  ) {

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     cookieService.set('user', JSON.stringify(this.userData));
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
  }

  ngOnInit(): void { }

  // sign in function
  // SignIn2(email, password): Observable<HttpEvent<{}>> {
  //   console.log(3);
  //   this.router.navigate(['/dashboard/default']);
  //   // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //   //   .then((result) => {
  //   //     // if (result.user.emailVerified !== true) {
  //   //     //   this.SetUserData(result.user);
  //   //     //   this.SendVerificationMail();
  //   //     //   this.showLoader = true;
  //   //     // } else {
  //   //     //   this.showLoader = false;
  //   //     //   this.ngZone.run(() => {
  //   //     //     this.router.navigate(['/auth/login']);
  //   //     //   });
  //   //     // }
  //   //   }).catch((error) => {
  //   //     this.toster.error('You have enter Wrong Email or Password.');
  //   //   })
  // }

  SignIn(email: any, password: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = this.urlEndPoint + "/oauth/token";
    console.log(httpOptions, 888);

    return this.http.post(url, JSON.stringify({
      "grant_type": "password",
      "client_id": 5,
      "client_secret": "TrULBpdUxGma0btXCI3g2y5GfW4iBZAuwGSo47eY",
      "username": "raegan63@example.net",
      "password": "123456"
    }), httpOptions).pipe(
      map((data: any[]) => {
        console.log(data);
      }),
    );
  }

  // Sign out
  SignOut() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    return this.afAuth.auth.signOut().then(() => {
      this.showLoader = false;
      localStorage.clear();
      this.cookieService.deleteAll('user', '/auth/login');
      this.router.navigate(['/auth/login']);
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

}