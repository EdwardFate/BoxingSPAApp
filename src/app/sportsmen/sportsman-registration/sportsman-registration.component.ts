import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sportsman, TrainerShorInfo, SportsmanRegistration } from '../../models/model';
import { TrainerValidator } from '../../Validators/validators-trainer';


@Component({
  selector: 'app-sportsman-registration',
  templateUrl: './sportsman-registration.component.html',
  styleUrls: ['./sportsman-registration.component.css']
})
export class SportsmanRegistrationComponent implements OnInit {
  sportsmanRegForm: FormGroup;
  sportsmanRegModel: SportsmanRegistration;
  spValidator: TrainerValidator;


  @Input()
  trainersList: TrainerShorInfo[];

  @Output()
  onSportsmanRegistration = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.sportsmanRegModel = { Name: "", Surname: "", TrainerInfo: { Name: "", Surname: "" } };
    this.spValidator = new TrainerValidator();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.sportsmanRegForm = this.fb.group({
      nameSpAng: [this.sportsmanRegModel.Name, [
        this.spValidator.nameCustomValidator, Validators.maxLength(32)
      ]],
      surnameSpAng: [this.sportsmanRegModel.Surname, [
        this.spValidator.surnameCustomValidator, Validators.maxLength(32)
      ]],
      selectTrainerSpAng: [this.sportsmanRegModel.TrainerInfo]
    });
  }

  onSubmit() {
    let resValue = { Sportsman: {}, TrainerInfo: {} };
    let Sportsman: Sportsman = { Name: this.sportsmanRegModel.Name, Surname: this.sportsmanRegModel.Surname, Trainer: null };

    resValue.Sportsman = Sportsman;

    resValue.TrainerInfo = this.sportsmanRegModel.TrainerInfo;

    this.onSportsmanRegistration.emit(resValue);
  }




}
