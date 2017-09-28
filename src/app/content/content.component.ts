import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  pageTitle = '';

  pageDescription = '';

  constructor(public router: Router) {
    // 订阅导航结束事件
    router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/dashboard') {
          this.pageTitle = '首页';
          this.pageDescription = '';
        } else if (event.url.startsWith('/stock')) {
          this.pageTitle = '股票管理';
          this.pageDescription = '进行股票的增、删、改、查等常用操作';
        }
      });
  }

  ngOnInit() {
  }

}
