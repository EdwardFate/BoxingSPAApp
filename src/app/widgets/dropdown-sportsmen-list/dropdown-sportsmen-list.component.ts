import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, group, query, stagger, keyframes } from '@angular/animations';
import { Trainer, Sportsman } from 'src/app/models/model';
// import { EventEmitter } from 'events';


@Component({
  selector: 'dropdown-sportsmen-list',
  templateUrl: './dropdown-sportsmen-list.component.html',
  styleUrls: ['./dropdown-sportsmen-list.component.css', './CSS/open-iconic-bootstrap.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        'max-height': '250px', 'opacity': '1', 'display': 'block'
      })),
      state('out', style({
        'max-height': '0px', 'opacity': '0', 'display': 'none'
      })),
      transition('in => out', [group([
        animate('400ms ease-in-out', style({
          'opacity': '0'
        })),
        animate('500ms ease-in-out', style({
          'max-height': '0px'
        })),
        animate('200ms ease-in-out', style({
          'display': 'none'
        }))
      ])]),
      transition('out => in', [group([
        animate('1ms ease-in-out', style({
          'display': 'block'
        })),
        animate('800ms ease-in-out', style({
          'max-height': '250px'
        })),
        animate('1000ms ease-in-out', style({
          'opacity': '1'
        }))
      ])])
    ])
  ]
})
export class DropdownSportsmenListComponent implements OnInit {

  isArrowDown: boolean;
  animationState: string;


  isSelectedItems: Array<boolean>;
  removeIdItems: Array<number>;


  selectedSportsmen: any;
  @Input()
  public dataSportsmen: Sportsman[] = [];


  @Output()
  onRemoveSportsmen = new EventEmitter<Array<number>>();

  constructor() {
    this.isArrowDown = true;
    this.animationState = "out";
    this.isSelectedItems = [];

    this.selectedSportsmen = {};
    this.removeIdItems = [];
  }

  ngOnInit() {
  }
  ngOnChanges() {
    this.removeIdItems = [];
  }

  removeSportsman() {

    let newSportsmen: Sportsman[] = [];

    this.getKeysOutSelectedSportsmen().forEach(key => {
      this.removeIdItems.push(parseInt(key));

    });
    this.selectedSportsmen = {};
    this.isSelectedItems = [];

    this.onRemoveSportsmen.emit(this.removeIdItems);
  }

  clickSelectSportsman() {

    this.animationState = this.animationState === 'out' ? 'in' : 'out';

    if (this.isArrowDown) {
      this.isArrowDown = false;
    }
    else {
      this.isArrowDown = true;
    }

    let value = this.animationState === 'out' ? false : true

  }


  //Возможно передать родителю

  onClickSelectedItem(event, index) {

    this.isSelectedItems[index] = !this.isSelectedItems[index];

    if (this.isSelectedItems[index]) {
      this.selectedSportsmen[index] = (this.dataSportsmen[index]);

    }
    else {
      delete this.selectedSportsmen[index];
    }



  }

  getKeysOutSelectedSportsmen(): Array<string> {
    return Object.keys(this.selectedSportsmen);
  }

}

