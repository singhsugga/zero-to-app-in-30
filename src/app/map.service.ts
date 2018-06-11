import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { firestore } from 'firebase';
import { Observable } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  centerOnUS = new firestore.GeoPoint(37, -97);
  geoPoint$ = new BehaviorSubject<firestore.GeoPoint>(this.centerOnUS);

  constructor() { }

  updateGeoPoint(geopoint: firestore.GeoPoint) {
    this.geoPoint$.next(geopoint);
  }

}

export interface MapMarker {
  geoPoint: firestore.GeoPoint;
  label: string;
}
