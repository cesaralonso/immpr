import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.html',
  styleUrls: ['./feed.scss']
})
export class Feed implements OnInit {

  feed: Array<Object>;

  constructor(private _feedService: FeedService) {
  }

  ngOnInit() {
    this._loadFeed();
  }

  expandMessage (message) {
    message.expanded = !message.expanded;
  }

  private _loadFeed() {
    this._feedService.all()
      .subscribe(result => this.feed = result.result);
  }
}
