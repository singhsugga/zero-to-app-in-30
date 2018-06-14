import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../services/user.service';
import { MouseEvent } from '@agm/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent {

  // center map over US
  lat = 37;
  lng = -97;

  markers$: Observable<MapMarker[]>;

  constructor(
    public userService: UserService,
    private afs: AngularFirestore
  ) {
    // this observable is a "live" array of all the markers in the
    // hometowns collection. Marker locations can change and they
    // get updated on our map in real time.
    this.markers$ = afs.collection<MapMarker>('hometowns').valueChanges();
  }

  setHometown(event: MouseEvent) {
    this.userService.isLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // if logged in, create a marker doc and persist it in firestore
        const marker: MapMarker = {
          lat: event.coords.lat,
          lng: event.coords.lng,
          label: this.userService.currentUser.displayName,
          photoUrl: this.userService.currentUser.photoURL
        };
        // the doc() call implicitly sets the id to the user id, and
        // places it in the "hometowns" collection. This way
        // we can call set() over and over again and keep replacing
        // the same document.
        this.afs.doc(`hometowns/${this.userService.currentUser.uid}`).set(marker);
      }
    });
  }
}

export interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  photoUrl: string;
}
