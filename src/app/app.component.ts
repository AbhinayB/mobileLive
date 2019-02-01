import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  arraystring:String;
  arrayItems:Number[]; 
  currentItem:Number;
  positionShift:Number;
  isValid:Boolean;
  isDuplicate:Boolean;
  notFound:Boolean;
  resultPosition:Number;
  currentPosition:Number;
  

  ngOnInit(){
    this.arrayItems = [];
    this.currentItem = 0;
    this.positionShift = 0;
    this.isValid = false;
    this.isDuplicate = false;
    this.notFound = false;
    this.resultPosition = 0;
    this.currentPosition = 0;
  }

  processData(){
    this.arrayItems = [];
    this.resultPosition = 0;
    this.currentPosition = 0;
    this.isValid = false;
    this.isDuplicate = false;
    this.notFound = false;
    var regexpr = new RegExp("[0-9]+(,[0-9]+)*");

    if(!this.arraystring.match(regexpr)){
      this.isValid = true;
      return;
    }

    var arr = this.arraystring.split(",");

    this.arraystring.split(",").map((ele)=>{
      this.arrayItems.push(parseInt(ele));
    });
    if(this.hasDuplicates(this.arrayItems)){
      this.isDuplicate = true;
      return;
    }
    this.arrayItems.sort(function(a:number,b:number){return a - b});
    this.cycle(this.currentItem,this.positionShift,this.arrayItems[0],this.arrayItems[this.arrayItems.length-1]);
  }

  cycle(current,imove,start,end){
    
    let index = this.arrayItems.findIndex((ele)=>{
        return ele == current;
    });
    if(index == -1){
      this.notFound = true;
      return;
    }
    this.currentPosition = index;
    index = index+parseInt(imove);
    if(index<0){
      index = (index%(this.arrayItems.length))+(this.arrayItems.length);
    }
    index = index%(this.arrayItems.length);
    this.resultPosition = index;
    console.log(this.currentPosition);
    console.log(this.resultPosition);
    
}

  hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
  }
}
