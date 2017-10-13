import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  private rating = 0;

  @Input()
  private readonly = true;

  @Output()
  private ratingChange: EventEmitter<number> = new EventEmitter();

  stars: boolean[]; // 与Array<boolean>的写法区别？

  constructor() { }

  ngOnInit() {
    /* 由ngOnChanges()覆盖 */
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.stars = [];
    for (let i = 1; i <= 5; ++i) {
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index: number) {
    if (!this.readonly) {
      this.rating = index + 1;
      this.ratingChange.emit(this.rating);
    }
  }

}
