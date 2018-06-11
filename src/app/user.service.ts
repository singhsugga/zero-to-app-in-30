import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { take, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  isLoggedIn(withRedirect?: boolean): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        this.currentUser = user;
        return !!user;
      }),
      tap(isLoggedIn => {
        console.log('logged in status', isLoggedIn);
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
