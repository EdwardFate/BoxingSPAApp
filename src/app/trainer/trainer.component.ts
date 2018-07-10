import { ViewChild, Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { TrainerRegistrationComponent } from 'src/app/trainer-registration/trainer-registration.component';
import { TrainerChangeComponent } from 'src/app/trainer-change/trainer-change.component';
import { Trainer, Sportsman, Roles } from '../models/model';
import { SharedLocalDataService } from '../services/shared-local-data.service';



@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})

export class TrainerComponent implements OnInit, AfterViewInit { // Завязать модель компонента на сервис получения данных!

  trainers: Trainer[];
  sportsmen: Sportsman[];

  changeTrainer: Trainer;
  removeTrainer: Trainer;


  idChangeTrainer: number;
  idRemoveTrainer: number;

  isShowTrainerChange: boolean;
  isShowTrainerAdd: boolean;

  constructor(private sharedLocalData: SharedLocalDataService) {
    this.isShowTrainerAdd = false;
    this.isShowTrainerChange = false;

    sharedLocalData.getDataTrainer().subscribe((dataTr) => this.trainers = dataTr);
    sharedLocalData.getDataSportsmen().subscribe((dataSp) => this.sportsmen = dataSp);
  }

  addTrainerEvent(click: boolean) {
    this.isShowTrainerChange = false;
    this.isShowTrainerAdd = true;
  }

  changeTrainerEvent(trainer: any): void {
    this.isShowTrainerAdd = false;
    this.changeTrainer = trainer as Trainer;

    if (this.changeTrainer !== null && this.changeTrainer !== undefined) {

      /*     if (this.findTrainer(this.changeTrainer, this.trainers)) {
            alert("Измененные данные тренера повторяют уже существующего!");
            return;
          } */

      this.idChangeTrainer = this.trainers.findIndex(t => {
        return t.Name == this.changeTrainer.Name && t.Surname == this.changeTrainer.Surname
          && t.Email == this.changeTrainer.Email
          && t.Sportsmen.length == this.changeTrainer.Sportsmen.length
      });
      this.isShowTrainerChange = true;
    }
    else {
      alert("Некорректные данные измененого тренера!");
    }
  }
  removeTrainerEvent(trainer: any): void {
    this.removeTrainer = trainer as Trainer;


    if (this.removeTrainer !== null && this.removeTrainer !== undefined) {

      this.idRemoveTrainer = this.trainers.findIndex(t => {
        return t.Name == this.removeTrainer.Name && t.Surname == this.removeTrainer.Surname
          && t.Email == this.removeTrainer.Email
          && t.Sportsmen.length == this.removeTrainer.Sportsmen.length
      });



      if (this.idChangeTrainer == this.idRemoveTrainer) {
        this.changeTrainer = { Name: "", Surname: "", Email: "", Role: Roles.Default, Sportsmen: [] };
        this.isShowTrainerChange = false;

        this.idChangeTrainer = -1;
      }


      if (this.idRemoveTrainer !== -1) {
        let newArrTrainers: Trainer[] = [];

        let sportsmenDontHaveTrainer: Sportsman[] = []; //Манипуляции со спортсменами!!
        Object.assign(sportsmenDontHaveTrainer, this.trainers[this.idRemoveTrainer].Sportsmen);

        for (let i = 0; i < sportsmenDontHaveTrainer.length; i++) {
          sportsmenDontHaveTrainer[i].Trainer = null;
        }

        this.trainers[this.idRemoveTrainer].Sportsmen = null;
        this.trainers.splice(this.idRemoveTrainer, 1);
        Object.assign(newArrTrainers, this.trainers);
        this.trainers = newArrTrainers;
      }

      if (this.idChangeTrainer >= 1 && this.idRemoveTrainer < this.idChangeTrainer) {
        this.idChangeTrainer = this.idChangeTrainer - 1;
      }


      this.idRemoveTrainer = -1;

    }
    else {
      alert("Входящие данные тренера на удаление некорректны!");
    }

  }




  RegistrationTrainer(trainer: Trainer): void {
    let newTr: Trainer = { Name: trainer.Name, Surname: trainer.Surname, Email: trainer.Email, Role: trainer.Role, Sportsmen: trainer.Sportsmen };

    if (newTr !== null && newTr !== undefined) {

      if (this.findTrainer(newTr, this.trainers)) {
        alert("Невозможно добавить нового тренера, уже существует!");
        return;
      }



      let newArrTrainers: Trainer[] = [];

      Object.assign(newArrTrainers, this.trainers);
      newArrTrainers.push(trainer);
      this.trainers = newArrTrainers;


      this.sharedLocalData.updateSharedTrainerData(this.trainers); 
    }
    else {
      alert("Некорректный данные добавляемого тренера!");
      return;
    }
  }

  ChangesTrainer(trainer: Trainer) {


    let countrSp: number = 0;

    if (trainer !== null && trainer !== undefined) {
      /*  if (this.findTrainer(newTr, this.trainers)) {
         alert("Изменненый тренер повторяет уже существующего!");
       } */

      let newArrTrainers: Trainer[] = [];

      let indexesMissSportsmen: number[] = [];
      let currentSportsmen: Sportsman[] = [];

      Object.assign(newArrTrainers, this.trainers);

      newArrTrainers[this.idChangeTrainer].Name = trainer.Name;
      newArrTrainers[this.idChangeTrainer].Surname = trainer.Surname;
      newArrTrainers[this.idChangeTrainer].Email = trainer.Email;



      for (let i = 0; i < this.trainers[this.idChangeTrainer].Sportsmen.length; i++) {

        let ind = trainer.Sportsmen.findIndex(sp => {
          return this.trainers[this.idChangeTrainer].Sportsmen[i].Name === sp.Name
            && this.trainers[this.idChangeTrainer].Sportsmen[i].Surname === sp.Surname
        });

        if (ind === -1) {
          indexesMissSportsmen.push(i);
        }

      }

      for (let i = 0; i < indexesMissSportsmen.length; i++) {
        newArrTrainers[this.idChangeTrainer].Sportsmen[indexesMissSportsmen[i]].Trainer = null;
      }

      newArrTrainers[this.idChangeTrainer].Sportsmen.forEach(sp => {
        if (sp.Trainer !== null ) {
          currentSportsmen.push(sp);
        }
      });

      newArrTrainers[this.idChangeTrainer].Sportsmen = currentSportsmen;


      this.trainers = newArrTrainers;


     /*  this.sharedLocalData.updateSharedTrainerData(this.trainers); */
    }
    else {
      alert("Некорректные данные отредактированого тренера!");
    }


  }



  ngOnInit(): void {

  }

  ngOnChanges() {

  }
  ngAfterViewInit(): void {

  }


  private findTrainer(trainer: Trainer, trainers: Trainer[]): boolean {

    if (this.trainers.findIndex(tr => {
      return tr.Name === trainer.Name && tr.Surname === trainer.Surname
    }) !== -1) {
      return true;
    }
    else {
      return false;
    }

  }


}

