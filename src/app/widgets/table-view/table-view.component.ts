import { Component, OnInit, Input, ContentChild, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Trainer, Sportsman } from '../../models/model';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {


  protected itemsToDisplayBodyTable: TableItemContext[] = [];

  @Input()
  public headNameTemplate: string;

  @Input()
  public bodyNameTemplate: string;


  @Input()
  public bodyItems: any[];


  selectedItemIndex: number;


  @Output()
  onChangeData = new EventEmitter<any>();
  @Output()
  onAddDate = new EventEmitter<any>();
  @Output()
  onRemoveData = new EventEmitter<any>();

  constructor() {
    this.selectedItemIndex = -1;
  }


  ngOnChanges() {
    this.itemsToDisplayBodyTable = this.initializeBodyItems();
  }



  ngOnInit() {
  }

  private initializeBodyItems(): TableItemContext[] { //Допилить на нахождения вложенныъ массивов

    return this.bodyItems.map(i => new TableItemContext(i, i.Sportsmen));

  }

  onClickSelectedItemTable(event, index) {

    if (this.selectedItemIndex == index) {
      this.selectedItemIndex = -1;
      return;
    }


    this.selectedItemIndex = index;
  }



  AddData() {
    this.onAddDate.emit(true);
  }


  ChangeData() {
    if (this.selectedItemIndex < 0) {
      alert("Элемент не выбран!");
      return;
    }
    this.onChangeData.emit(this.bodyItems[this.selectedItemIndex]);
  }



  DeleteData() {
    if (this.selectedItemIndex < 0) {
      alert("Элемент не выбран!");
      return;
    }
    let boolRes = confirm('Действительно ли вы хотите удалить элемент?');
    if (boolRes) {
      this.onRemoveData.emit(this.bodyItems[this.selectedItemIndex]);

      this.selectedItemIndex = -1;
    }

  }

}

export class TableItemContext {
  constructor(
    public $implicit: any,
    public innerItems: any[]
  ) { }
}
