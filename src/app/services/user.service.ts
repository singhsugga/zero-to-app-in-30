import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { first, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone
  ) { }

  signInWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(() => {
        // since this promise resolves outside the angular zone,
        // calling zone.run() gives angular its execution context for
        // change detection, so we can route the user somewhere upon login
        this.zone.run(() => this.router.navigateByUrl('/hometown'));
      }, err => console.error('Error signing in', err));
  }

  isLoggedIn(withRedirect?: boolean): Observable<boolean> {
    return this.afAuth.authState.pipe(
      first(), // allow any subscriptions to be auto unsubscribed
      map(user => {
        // assign the current user while we're here.
        this.currentUser = user;
        return !!user;
      }),
      tap(isLoggedIn => {
        // this tap is so we can redirect if logged out
        if (!isLoggedIn && withRedirect) {
          this.router.navigateByUrl('/login');
        }
      })
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
