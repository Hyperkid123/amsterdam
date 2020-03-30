import 'ol/ol.css';
import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {OSM} from 'ol/source';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Style} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {defaults as defaultControls, ZoomToExtent} from 'ol/control';

@Component({
  selector: 'app-venue-map',
  templateUrl: './venue-map.component.html',
  styleUrls: ['./venue-map.component.scss']
})
export class VenueMapComponent implements OnInit {
  @Input() latitude: string;
  @Input() longitude: string;

  map: any;
  view: any;
  vectorSource: any;
  lonLat: any;
  ngOnInit() {
    this.lonLat = fromLonLat([Number(this.longitude.replace(',', '.')), Number(this.latitude.replace(',', '.'))])
    console.log(this.lonLat)
    const marker = new Feature({
      geometry: new Point(this.lonLat)
    });
    marker.setStyle(new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({
          color: 'orange'
        })
      })
    }));
    this.vectorSource = new VectorSource({
      features: [marker]
    });
    const vectorLayer = new VectorLayer({
      source: this.vectorSource
    });
    const tileLayer = new TileLayer({
      source: new OSM()
    })
    const layers = [
      tileLayer,
      vectorLayer
    ]
    this.view = new View({
      center: this.lonLat,
      zoom: 10
    })
    this.map = new Map({
      target: document.getElementById('map'),
      layers,
      view: this.view,
      controls: defaultControls().extend([
        new ZoomToExtent({
          className: 'foo',
          label: 'center',
          extent: [
            this.lonLat[0] - 150,
            this.lonLat[1] - 150,
            this.lonLat[0] + 150,
            this.lonLat[1] + 150
          ]
        })
      ]),
    })
  }

  handleCenter() {
    const [ marker ] = this.vectorSource.getFeatures();
    const point = marker.getGeometry();
    this.view.centerOn(point.getCoordinates(), [500, 500], [250, 250])
  }
}
