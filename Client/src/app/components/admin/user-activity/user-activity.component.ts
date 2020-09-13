import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-activity',
  templateUrl: './user-activity.component.html',
  styleUrls: ['./user-activity.component.css']
})
export class UserActivityComponent implements OnInit {
  allUserActivity: string [][] = [[]];
  usersActivityFiltered: string [][] = [[]];
  searchData: FormGroup;

  ngOnInit(): void {
    this.allUserActivity.push(['Yaniv Falik', 'falik@gmail.com', 'Sep 09, 2020']);
    this.allUserActivity.push(['ohad assulin', 'ohad@gmail.com', 'Sep 09, 2020']);
    this.allUserActivity.push(['Yaniv Falik', 'falik@gmail.com', 'Aug 31, 2020']);
    this.allUserActivity.push(['Sapir Alperovich', 'sapir@gmail.com', 'Aug 10, 2020']);
    this.allUserActivity.push(['Yogev Nissan', 'Nissan@gmail.com', 'Aug 10, 2020']);
    this.allUserActivity.push(['Yaniv Falik', 'falik@gmail.com', 'Aug 10, 2020']);

    this.usersActivityFiltered = this.allUserActivity;
    this.searchData = new FormGroup({
      search: new FormControl(''),
    });

    this.searchData.valueChanges.subscribe(val => {
      if (val.search === '') {
        this.usersActivityFiltered = this.allUserActivity;
      }
    });
  }

  search(text: string) {
    this.usersActivityFiltered = this.allUserActivity.filter(user => user[1].startsWith(text));
  }
}
