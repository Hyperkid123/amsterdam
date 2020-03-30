import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getVenue } from 'src/app/api-mock/api';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTwitter, faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

type Location = {
  city: string,
  adress: string,
  zipcode: string,
  latitude: string,
  longitude: string
}

type Descriptions = {
  shortdescription?: string,
  longdescription?: string,
}

type VenueDetails = {
  en: Descriptions
}

type VenueMedia = {
  url: string,
  main: string
}

type Venue = {
  urls: Array<string>,
  details: VenueDetails,
  title: string,
  media: Array<VenueMedia>,
  location: Location
}

const iconMapper = {
  'www.facebook.com': ['fab', 'facebook-square'],
}


declare var ol: any;
@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.scss']
})
export class VenueComponent implements OnInit {
  venueId;
  venue: Venue;
  isLoading = true;
  links = [];
  images = [];
  map: any;


  constructor(
    private route: ActivatedRoute,
    library: FaIconLibrary
  ) { 
    library.addIcons(faTwitter, faFacebookSquare, faGlobe);
  }

  ngOnInit() {
    this.isLoading = true
    this.route.paramMap.subscribe(params => {
      this.venueId = params.get('venueId');
      getVenue(this.venueId).then((venue: Venue) => {
        this.venue = venue;
        this.isLoading = false
        console.log('venue', venue)
        this.links = venue.urls.map(url =>  ({
          url,
          icon: iconMapper[new URL(url).hostname] || ['fas', 'globe']
        }))
        this.images = venue.media.sort(({ main }) => main === 'true' ? -1 : 0)
      })
    });
  }
}
