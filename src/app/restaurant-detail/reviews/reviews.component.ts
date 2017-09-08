import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RestaurantsService } from '../../restaurants/restaurants.service';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaruantsService: RestaurantsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.parent.snapshot.params['id'];
    this.reviews = this.restaruantsService.reviewsOfRestaurant(id);
  }

}
