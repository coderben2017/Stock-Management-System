import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  @Input()
  private rating: number = 0;

  private stars: boolean[]; // 与Array<boolean>的写法区别？

  constructor() { }

  ngOnInit() {
    this.stars = []; // 初始化数组，否则stars在控制台显示为undefined

    for (let i = 1; i <= 5; ++i) {
      this.stars.push(i > this.rating);
    }
  }

}
