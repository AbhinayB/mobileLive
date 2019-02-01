import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  arraystring: string;
  arrayItems: number[];
  currentItem: number;
  positionShift: number;
  isValid: boolean;
  isDuplicate: boolean;
  notFound: boolean;
  resultPosition: number;
  currentPosition: number;


  ngOnInit() {
    this.arrayItems = [];
    this.currentItem = 0;
    this.positionShift = 0;
    this.isValid = false;
    this.isDuplicate = false;
    this.notFound = false;
    this.resultPosition = 0;
    this.currentPosition = 0;
  }

  processData() {
    this.arrayItems = [];
    this.resultPosition = 0;
    this.currentPosition = 0;
    this.isValid = false;
    this.isDuplicate = false;
    this.notFound = false;
    const regexpr = new RegExp('[0-9]+(,[0-9]+)*');

    if (!this.arraystring.match(regexpr)) {
      this.isValid = true;
      return;
    }

    const arr = this.arraystring.split(',');

    this.arraystring.split(',').map((ele) => {
      this.arrayItems.push(parseInt(ele, 10));
    });
    if (this.hasDuplicates(this.arrayItems)) {
      this.isDuplicate = true;
      return;
    }
    this.arrayItems.sort((a: number, b: number) => (a - b));
    this.cycle(this.currentItem, this.positionShift, this.arrayItems[0], this.arrayItems[this.arrayItems.length - 1]);
  }
   // cycle function will process your results and give you the current item.
  cycle(current, imove, start, end) {

    let index = this.arrayItems.findIndex((ele) => {
        return ele == current;
    });
    if (index === -1) {
      this.notFound = true;
      return;
    }
    this.currentPosition = index;
    index = index + parseInt(imove, 10);
    if (index < 0) {
     // is the logic for negative circular dependency if exceeds length of array
      index = (index % (this.arrayItems.length)) + (this.arrayItems.length);
    }
     // is the logic for possitive circular dependency if exceeds length of array
    index = index % (this.arrayItems.length);
    this.resultPosition = index;

}
   // has duplicates checks if the array has duplicates or not
  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }
}
