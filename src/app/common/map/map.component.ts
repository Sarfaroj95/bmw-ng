import { Component, OnInit, Input } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bmw-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

	@Input() location: string;

	 lat: number = 12.9118488;
   lng: number = 77.6489441;

  constructor( private mapService: MapService) { }

  ngOnInit() {
  }

  mapReadyHandler() {
  	this.mapService.geocodeLocation(this.location).subscribe(
  		(coordinates) => {
  			this.lat = coordinates.lat;
  			this.lng = coordinates.lng;
  		});	
  }

}
