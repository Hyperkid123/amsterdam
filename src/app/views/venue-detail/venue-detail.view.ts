import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'venue',
  templateUrl: './venue-detail.view.html',
})
export class Venue implements OnInit {
  venueId;

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.venueId = params.get('venueId');
    });
  }
}
