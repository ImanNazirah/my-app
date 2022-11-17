import { Component, OnInit } from '@angular/core';
import { stateCountyItem } from 'src/app/models/statecountyitem';

@Component({
  selector: 'app-merge-table-list',
  templateUrl: './merge-table-list.component.html',
  styleUrls: ['./merge-table-list.component.scss']
})
export class MergeTableListComponent{

  data :stateCountyItem[]= [
    { state: 'MN', county: '1', item: 0.297 },
    { state: 'MN', county: '1', item: 0.04 },
    { state: 'MN', county: '3', item: 0.14 },
    { state: 'CA', county: '2', item: 0.019 },
    { state: 'CA', county: '3', item: 0.14 },
    { state: 'MN', county: '1', item: 0.0374 }, 
    { state: 'CA', county: '2', item: 0.037 }
  ];

  dataExt: stateCountyItem[] = [];

  dataTransform : TransformDataElement[] = [];

  //let's assume the data is already in sort order row then column
  elements :ElementsData[] = [
    {
      name: 'Item (1,1)',
      color: 'blue',
      fontSize: 16,
      row: 1,
      column: 1
    },
    {
      name: 'Item (1,2)',
      color: 'red',
      fontSize: 20,
      row: 1,
      column: 2
    },
    {
      name: 'Item (1,3)',
      color: 'green',
      fontSize: 20,
      row: 1,
      column: 3
    },
    {
      name: 'Item (2,1)',
      color: 'white',
      fontSize: 20,
      row: 2,
      column: 1
    },
    {
      name: 'Item (3,1)',
      color: 'black',
      fontSize: 20,
      row: 3,
      column: 1
    },
    {
      name: 'Item (3,2)',
      color: 'black1',
      fontSize: 20,
      row: 3,
      column: 2
    }
  ];


  constructor() { this.sortData();
    this.transformData();
  }

  // ngOnInit(): void {
  // }

  public sortData() {
    
    this.dataExt=this.data
    .sort((a:stateCountyItem, b:stateCountyItem) => a.state.localeCompare(b.state))
    .map((x)=>{

      return x;
    });
    
  }

  // styleObject(row: number, Column: number): Object {
  //   let obj: Object;
  //   obj = { 'grid-row': '' + Number(row), 'grid-column': '' + Number(Column) };

  //   return obj;
  // }

  transformData(): void{

    //find distinct of rows first
    let distinctRow :number[] = [...new Set(this.elements.map(x=>x.row))];

    //to transform from ElementsData to TransformDataElement
    distinctRow.map((y:number)=>{

      let filterElementData :ElementsData[] = this.elements.filter((x:ElementsData)=>{
        return x.row === y;
      })

      let setTranformDataElement :TransformDataElement = {
        row: y,
        totalCol:filterElementData.length,
        elements:filterElementData
      }
      
      this.dataTransform.push(setTranformDataElement);
      
    })

    
  }

}

export interface ElementsData {
  name: string;
  color: string;
  fontSize: number;
  row: number;
  column: number;
}

export interface TransformDataElement {
  row: number;
  totalCol:number;
  elements:ElementsData[];
}