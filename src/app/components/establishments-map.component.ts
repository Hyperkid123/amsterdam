import 'ol/ol.css';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {OSM} from 'ol/source';
import Point from 'ol/geom/Point';
import {Circle as CircleStyle, Fill, Style, Icon} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {defaults as defaultControls, ZoomToExtent} from 'ol/control';

@Component({
  selector: 'app-establishments-map',
  templateUrl: './establishments-map.component.html',
  styleUrls: ['./establishments-map.component.scss']
})
export class EstablishmentsMapComponent implements OnInit, OnChanges {
  @Input() locations = [];

  @Output() getLocations = new EventEmitter();
  map: any;
  view: any;
  vectorSource: any;
  lonLat: any;

  renderMarkers() {
    this.vectorSource.clear();
    const markers = this.locations.map(({location}) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([Number(location.longitude.replace(',', '.')), Number(location.latitude.replace(',', '.'))]))
      })
      marker.setStyle(new Style({
        image: new Icon({
          src: 'assets/blue-map-marker.svg',
          scale: 0.1
        })
      }));
      return marker;
    });
    this.vectorSource.addFeatures(markers)

  }

  ngOnChanges() {
    if (this.vectorSource) {
      this.renderMarkers()
    }
  }
  ngOnInit() {
    this.lonLat = fromLonLat([5.27972222, 52.21222222])
    this.vectorSource = new VectorSource({
      features: []
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
      zoom: 8
    })
    this.map = new Map({
      target: document.getElementById('map'),
      layers,
      view: this.view,
    })
    this.renderMarkers()
  }
}
