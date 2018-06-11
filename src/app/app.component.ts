import { Component, ViewEncapsulation } from '@angular/core';
import { firestore } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = '0 to app in 30';

  geoPoint = new firestore.GeoPoint(37, -97);
  zoom = 5;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {}

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/');
  }

}
