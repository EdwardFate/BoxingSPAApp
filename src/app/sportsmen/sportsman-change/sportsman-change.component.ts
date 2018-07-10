import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Sportsman, TrainerShorInfo } from '../../models/model';
import { TrainerValidator } from '../../Validators/validators-trainer';

@Component({
  selector: 'app-sportsman-change',
  templateUrl: './sportsman-change.component.html',
  styleUrls: ['./sportsman-change.component.css']
})
export class SportsmanChangeComponent implements OnInit {

  sportsmanChanForm: FormGroup;
  spValidator: TrainerValidator;

  @Input()
  sportsman: Sportsman;
  @Input()
  allTrainerList: TrainerShorInfo[];

  sportsmanChanged: Sportsman;
  currentTrainer: TrainerShorInfo;
  newTrainer: TrainerShorInfo;
  displayCurrentTrainer: string;
  isDisplayChangeTrainer: boolean;

  @Output()
  onChangeSportsman = new EventEmitter<any>();


  constructor(private fb: FormBuilder) {
    this.sportsmanChanged = { Name: "", Surname: "", Trainer: null };
    this.spValidator = new TrainerValidator();
    this.currentTrainer = { Name: "", Surname: "" };
    this.newTrainer = { Name: "", Surname: "" };
    this.isDisplayChangeTrainer = false;
  }

  ngOnInit() {
    this.initChanForm();
  }

  ngOnChanges() {
    if (this.sportsman !== null && this.sportsman !== undefined) {
      this.sportsmanChanged.Name = this.sportsman.Name;
      this.sportsmanChanged.Surname = this.sportsman.Surname;
      this.sportsmanChanged.Trainer = this.sportsman.Trainer;

      if (this.sportsmanChanged.Trainer !== null && this.sportsmanChanged.Trainer !== undefined) {


        this.currentTrainer.Name = this.sportsmanChanged.Trainer.Name;
        this.currentTrainer.Surname = this.sportsmanChanged.Trainer.Surname;
        this.displayCurrentTrainer = this.currentTrainer.Name + " " + this.currentTrainer.Surname;
      }
      else{
        this.currentTrainer.Name= undefined;
        this.currentTrainer.Surname = undefined;
        this.displayCurrentTrainer = undefined;
      }
    }
  }

  initChanForm(): void {
    this.sportsmanChanForm = this.fb.group({
      nameSpChanAng: [this.sportsmanChanged.Name, [
        this.spValidator.nameCustomValidator, Validators.maxLength(32)
      ]],
      surnameSpChanAng: [this.sportsmanChanged.Surname, [
        this.spValidator.surnameCustomValidator, Validators.maxLength(32)
      ]],
      trainerSpChanAng: new FormControl ({value: this.displayCurrentTrainer !== null && this.displayCurrentTrainer !== undefined && this.displayCurrentTrainer !== ' ' ? this.displayCurrentTrainer : 'Тренер отсутствует', 
                                          disabled: true }),
      selectNewTrainerSpChanAng: [this.newTrainer]
    });

  }
/* 
  [this.displayCurrentTrainer !== null && this.displayCurrentTrainer !== undefined && this.displayCurrentTrainer !== ' ' ? this.displayCurrentTrainer : 'Тренер отсутствует', ], */


  // onSubmit() { //Вызывается от любого нажатия клавиши!
  //   alert(this.currentTrainer.Name + ' ' + this.currentTrainer.Surname);
  // }

  changeTrainer() {
    this.isDisplayChangeTrainer = !this.isDisplayChangeTrainer;
  }

  removeTrainer() {
    this.sportsmanChanged.Trainer = null;
    this.currentTrainer = { Name: "", Surname: "" };
    this.displayCurrentTrainer = undefined;
  }

  selectNewTrainer() {
    this.currentTrainer.Name = this.newTrainer.Name;
    this.currentTrainer.Surname = this.newTrainer.Surname;

    this.displayCurrentTrainer = this.currentTrainer.Name + ' ' + this.currentTrainer.Surname;
    this.sportsmanChanged.Trainer = null;

    this.isDisplayChangeTrainer = false;
  }

  changeSportsman() {
    if (this.sportsmanChanForm.valid) {
      let result = { Sportsman: { Name: "", Surname: "", Trainer: {} }, TrainerInfo: { Name: "", Surname: "" } };
      result.Sportsman.Name = this.sportsmanChanged.Name;
      result.Sportsman.Surname = this.sportsmanChanged.Surname;

      if (this.sportsmanChanged.Trainer === null) {
        if (this.displayCurrentTrainer === undefined) {
          result.TrainerInfo = null;
        }
        else {
          result.TrainerInfo.Name = this.currentTrainer.Name;
          result.TrainerInfo.Surname = this.currentTrainer.Surname;
        }
      }
      else {
        result.Sportsman.Trainer = this.sportsmanChanged.Trainer;
        result.TrainerInfo.Name = this.sportsmanChanged.Trainer.Name;
        result.TrainerInfo.Surname = this.sportsmanChanged.Trainer.Surname;
      }

      this.onChangeSportsman.emit(result);

    }
    else {
      alert("bad change sportsman:(");
    }
  }

}
