import { Component, OnInit, ElementRef, Input, Output, EventEmitter, Directive, HostListener } from '@angular/core';
import { Trainer, Sportsman, Roles } from 'src/app/models/model';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms'
import { TrainerValidator } from '../Validators/validators-trainer';



@Component({
  selector: 'app-trainer-change',
  templateUrl: './trainer-change.component.html',
  styleUrls: ['./trainer-change.component.css']
})
export class TrainerChangeComponent implements OnInit {

  trainerChanged: Trainer;


  private trainerValidator: TrainerValidator;
  trainerChangeForm: FormGroup;




  @Input()
  public trainer: Trainer;

  @Output()
  onChangedTrainer = new EventEmitter<any>();


  constructor(private fb: FormBuilder, el: ElementRef) {
    this.trainerChanged = { Name: "", Surname: "", Email: "", Role: Roles.Default, Sportsmen: [] };
    this.trainerValidator = new TrainerValidator();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(simpleChanges) {


    if (this.trainer.Name != undefined && this.trainer.Surname != undefined) {
      this.trainerChanged.Name = this.trainer.Name;
      this.trainerChanged.Surname = this.trainer.Surname;
      this.trainerChanged.Email = this.trainer.Email;
      this.trainerChanged.Role = this.trainer.Role;

      this.trainerChanged.Sportsmen = this.trainer.Sportsmen;

    }
  }



  initForm(): void {
    this.trainerChangeForm = this.fb.group({
      nameTrChan: [this.trainerChanged.Name, [
        this.trainerValidator.nameCustomValidator,
        Validators.maxLength(32)
      ]],
      surnameTrChan: [this.trainerChanged.Surname, [
        this.trainerValidator.surnameCustomValidator,
        Validators.maxLength(32)
      ]],
      emailTrChan: [this.trainerChanged.Email, [
        Validators.email,
        Validators.maxLength(32)
      ]],
      spotrsmenTrChan: ['-1']
    });
  }


  ChangedDataTrainer() {
    if (this.trainerChangeForm.valid) {
      this.onChangedTrainer.emit(this.trainerChanged);
    }
    else {
      alert("bad(");
    }
  }

  onSubmit() {  //Вызывается при клики на доч. элементе

  }


  removeSportsmen(indexes: Array<number>) {
    let sprt: Sportsman[] = [];
    let isChanged: boolean;
    if (this.trainerChanged.Sportsmen.length < indexes.length) {
      alert("Ошибка, удаляемых итемов больше чем есть в объекте!");
      return;
    }
    if (this.trainerChanged.Sportsmen.length == indexes.length) {
      this.trainerChanged.Sportsmen = sprt;
    }
    else {
      Object.assign(sprt, this.trainerChanged.Sportsmen);

      for (let i = 0; i < sprt.length; i++) {
        for (let j = 0; j < indexes.length; j++) {
          if (i === indexes[j]) {
            sprt.splice(i, 1);
            indexes.splice(j, 1);

            for (let g = 0; g < indexes.length; g++) {
              indexes[g] = indexes[g] - 1;
            }

            isChanged = true;
            break;
          }
          isChanged = false;
        }
        if (indexes.length === 0) {
          break;
        }
        if (isChanged) {
          i = -1;
        }
      }


      this.trainerChanged.Sportsmen = sprt;

    }
  }





}
