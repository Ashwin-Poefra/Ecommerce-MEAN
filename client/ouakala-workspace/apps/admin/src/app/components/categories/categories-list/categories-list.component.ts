import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ouakala-workspace-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  public categories:string[]=[];
  constructor() { }

  ngOnInit(): void {
  }

}
