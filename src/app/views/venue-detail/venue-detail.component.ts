import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
})
export class VenueComponent implements OnInit {
  venueId;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.venueId = params.get('venueId');
    });
  }
}
