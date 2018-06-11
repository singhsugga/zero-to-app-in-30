import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { firestore } from 'firebase';
import { MouseEvent } from '@agm/core';
import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { MapService, MapMarker } from '../map.service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {

  geoPoint: firestore.GeoPoint;
  markers$: Observable<MapMarker[]>;
  zoom = 5;
  currentUser;

  constructor(
    public mapService: MapService,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.markers$ = afs.collection<MapMarker>('hometowns').valueChanges();
  }

  ngOnInit() {
    this.mapService.geoPoint$.subscribe(geo => this.geoPoint = geo);
  }

  ngOnDestroy() {
    this.mapService.geoPoint$.unsubscribe();
  }

  setHometown(event: MouseEvent) {
    console.log('map click', event.coords);
    if (this.userService.isLoggedIn()) {
      const marker: MapMarker = {
        geoPoint: new firestore.GeoPoint(event.coords.lat, event.coords.lng),
        label: this.userService.currentUser.displayName
      };
      this.afs.doc(`hometowns/${this.userService.currentUser.uid}`).set(marker);
    }
  }

  updatePosition(m: MapMarker, event: MouseEvent) {
    this.setHometown(event);
  }
}
