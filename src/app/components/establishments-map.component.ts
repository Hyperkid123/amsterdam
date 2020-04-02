import 'ol/ol.css';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import {fromLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {OSM} from 'ol/source';
import Point from 'ol/geom/Point';
import {Style, Icon} from 'ol/style';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';

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
  popup: any;
  popupLink: any;
  selectedFeature: any;

  renderMarkers() {
    this.vectorSource.clear();
    const markers = this.locations.map(({location, title, link, shortdescription, ...rest}) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([Number(location.longitude.replace(',', '.')), Number(location.latitude.replace(',', '.'))])),
        title,
        link,
        shortdescription,
        city: rest['location.city'],
        zipcode: rest['location.zipcode'],
        adress: rest['location.adress']
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
      this.renderMarkers();
      this.selectedFeature = undefined;
    }
  }
  ngOnInit() {
    this.popup = document.getElementById('map-popup');
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
    const popup = new Overlay({
      element: this.popup,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -25]
    });
    this.map.addOverlay(popup);
    this.map.on('pointermove', (event) => {
      if (event.dragging) {
        this.popup.hidden = true
        return;
      }
      const pixel = this.map.getEventPixel(event.originalEvent);
      const hit = this.map.hasFeatureAtPixel(pixel);
      this.map.getTarget().style.cursor = hit ? 'pointer' : '';
    });
    this.map.on('click', (event) => {
      const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      if (this.selectedFeature){
        this.selectedFeature.setStyle(new Style({
          image: new Icon({
            src: 'assets/blue-map-marker.svg',
            scale: 0.1
          })
        }));
      }
      if (feature) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        this.popupLink = feature.get('link');
        const detailLink = document.getElementById('popup-link');
        const detailTitle = document.getElementById('popup-title')
        detailLink.innerHTML = 'Learn more';
        this.popup.innerHTML = '';
        const popupTemplate = `<div class="map-popup">
        <section class="mat-typography">
          <small>
            ${feature.get('adress')} ${feature.get('zipcode')} ${feature.get('city')}
          </small>
          <p>${feature.get('shortdescription')}</p>
        </section>
        </div>`
        detailTitle.innerHTML = feature.get('title');
        const popupContent = document.createElement('p');
        popupContent.innerHTML = popupTemplate.trim();
        detailTitle.classList.add("popup-title")
        this.popup.appendChild(detailTitle);
        this.popup.appendChild(popupContent);
        this.popup.appendChild(detailLink);
        feature.setStyle(new Style({
          image: new Icon({
            src: 'assets/red-map-marker.svg',
            scale: 0.1
          })
        }));
        this.selectedFeature = feature;

        this.view.animate({
          zoom: 12,
          center: coordinates
        }) 
      } else {
        this.selectedFeature = undefined;
      }
    });
    this.renderMarkers()
  }
}
