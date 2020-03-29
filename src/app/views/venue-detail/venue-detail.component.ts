import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getVenue } from 'src/app/api-mock/api';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
})
export class VenueComponent implements OnInit {
  venueId;
  venue;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.isLoading = true
    this.route.paramMap.subscribe(params => {
      this.venueId = params.get('venueId');
      getVenue(this.venueId).then(venue => {
        this.venue = venue;
        this.isLoading = false
        console.log('venue', venue)
      })
    });
  }
}
