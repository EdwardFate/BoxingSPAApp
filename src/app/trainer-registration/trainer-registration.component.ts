import { print } from 'util';
import { Component, OnInit, Pipe, PipeTransform, Output, EventEmitter } from '@angular/core';
import { Roles, TrainerRegistration, Trainer } from 'src/app/models/model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { TrainerValidator } from 'src/app/Validators/validators-trainer';
import { KeysPipe } from 'src/app/pipes/custom-pipes';



@Component({
  selector: 'app-trainer-registration',
  templateUrl: './trainer-registration.component.html',
  styleUrls: ['./trainer-registration.component.css']
})
export class TrainerRegistrationComponent implements OnInit {

  trainerRegForm: FormGroup;
  trainerRegModel: TrainerRegistration;
  keyValuesRoles: any[];
  trainerValidator: TrainerValidator;

 

  @Output()
  onTrainerRegistration = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.trainerValidator = new TrainerValidator();
    this.keyValuesRoles = this.parseRoleEnum();
    this.trainerRegModel = { Name: '', Surname: '', Email: '', Password: '', PassworConfirm: false, Role: Roles.Default };
  }

  ngOnInit() {
    this.initForm();

  }

  initForm(): void {
    this.trainerRegForm = this.fb.group({
      nameTrAng: [this.trainerRegModel.Name, [
        this.trainerValidator.nameCustomValidator,
        Validators.maxLength(32)
      ]],
      surnameTrAng: [this.trainerRegModel.Surname, [
        this.trainerValidator.surnameCustomValidator,
        Validators.maxLength(32)
      ]],
      emailTrAng: [this.trainerRegModel.Email, [
        Validators.email,
        Validators.maxLength(32)
      ]],
      passwordTrAng: [this.trainerRegModel.Password, [
        this.trainerValidator.passwordValidator
      ]],
      passwordConfirmTrAng: [null, [
        Validators.required

      ]],
      selectRoleTrAng: ['']

    }, { validator: this.trainerValidator.passwordConfirmValidator });
  }

  onSubmit() {


    if (this.trainerRegForm.valid) {
      let newTrainer: Trainer = {Name: this.trainerRegModel.Name, Surname: this.trainerRegModel.Surname, Email: this.trainerRegModel.Email, Role: this.trainerRegModel.Role, Sportsmen: []};
      this.onTrainerRegistration.emit(newTrainer);
    }
    else {
      alert("Bad :(");
    }
  }





  private parseRoleEnum(): any[] {
    let ar: any[] = [];

    let keys = Object.keys(Roles);
    keys = keys.slice(keys.length / 2);

    for (let i = 0; i < keys.length; i++) {
      ar.push({ Id: Roles[keys[i]], Name: Roles[i] });
    }

    return ar;

  }


  onChange() {

    let passCon = document.getElementById("passwordConfirmTr");
    let res: boolean = passCon.classList.contains("ng-invalid");
    if (res)
      this.trainerRegModel.PassworConfirm = false;
    else
      this.trainerRegModel.PassworConfirm = true;
  }
}







