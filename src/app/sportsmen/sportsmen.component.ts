import { Component, OnInit, Input } from '@angular/core';
import { Trainer, Sportsman, Roles, TrainerShorInfo } from '../models/model';
import { SharedLocalDataService } from '../services/shared-local-data.service';

@Component({
  selector: 'app-sportsmen',
  templateUrl: './sportsmen.component.html',
  styleUrls: ['./sportsmen.component.css']
})
export class SportsmenComponent implements OnInit {

  trainers: Trainer[] = [];
  sportsmen: Sportsman[] = [];

  trainersInfo: TrainerShorInfo[] = [];

  changedSportsman: Sportsman;


  idChangeSp: number;
  idChangeSpTrainer: number;

  isShowSpAdd: boolean;
  isShowSpChange: boolean;


  constructor(private sharedLocalDataService: SharedLocalDataService) {
    this.isShowSpAdd = false;
    this.isShowSpChange = false;

    this.idChangeSp = -1;
    this.idChangeSpTrainer = -1;

    sharedLocalDataService.getDataTrainer().subscribe((dataTrainer) => this.trainers = dataTrainer);
    sharedLocalDataService.getDataSportsmen().subscribe((dataSportsmen) => this.sportsmen = dataSportsmen);


    this.trainersInfo = this.getTrainersinfoList(this.trainers);


  }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  addEvent(val: boolean) {
    this.isShowSpAdd = true;
    this.isShowSpChange = false;
  }

  changeEvent(sportsman: any) {
    this.isShowSpAdd = false;

    this.changedSportsman = sportsman as Sportsman;
    this.idChangeSp = this.sportsmen.findIndex(sp => {
      return sp.Name === this.changedSportsman.Name
        && sp.Surname === this.changedSportsman.Surname
        && sp.Trainer === this.changedSportsman.Trainer
    });

    if (this.changedSportsman.Trainer !== null && this.changedSportsman.Trainer !== undefined) {
      this.idChangeSpTrainer = this.trainers.findIndex(tr => {
        return tr.Name === this.changedSportsman.Trainer.Name && tr.Surname === this.changedSportsman.Trainer.Surname
          && tr.Email === this.changedSportsman.Trainer.Email
      });
    }
    else {
      this.idChangeSpTrainer = -1;
    }

    this.isShowSpChange = true;
  }

  removeEvent(sportsman: any) { // Избежать колизию между индексом изменения и удаления

    let remSportsman: Sportsman = sportsman as Sportsman;
    let indexRemoveSportsman: number = -1;
    let indexTrainerRemSportsman: number = -1;


    if (remSportsman !== null && remSportsman !== undefined) {


      indexRemoveSportsman = this.sportsmen.findIndex(sp => {
        return sp.Name === remSportsman.Name && sp.Surname === remSportsman.Surname
      });

      if (indexRemoveSportsman !== -1) {

        if (remSportsman.Trainer !== null && remSportsman.Trainer !== undefined) {

          indexTrainerRemSportsman = this.trainers.findIndex(tr => {
            return tr.Name === remSportsman.Trainer.Name && tr.Surname === remSportsman.Trainer.Surname
              && tr.Email === remSportsman.Trainer.Email
          });

          let local = this.getLocalIndexSportsman(this.trainers[indexTrainerRemSportsman], remSportsman);

          if (local !== -1) {
            this.trainers[indexTrainerRemSportsman].Sportsmen.splice(local, 1);
          }
          else {
            alert("При удалении спортсмен не был найден у указанного тренера");
          }

        }

      }
      else {
        alert("Данные удаляемого спортсмена некорректны");
      }

    }



    if (this.idChangeSp == indexRemoveSportsman) {
      this.changedSportsman = { Name: "", Surname: "", Trainer: null };
      this.isShowSpChange = false;

      this.idChangeSp = -1;
    }

    if (this.idChangeSp >= 1 && indexRemoveSportsman < this.idChangeSp) {
      this.idChangeSp = this.idChangeSp - 1;
    }

    this.sportsmen.splice(indexRemoveSportsman, 1);

    let arrRes: Sportsman[] = [];
    Object.assign(arrRes, this.sportsmen);
    this.sportsmen = arrRes;

  }



  AddSportsman(sportsmanObj: any) {

    let sportsman: Sportsman = sportsmanObj.Sportsman as Sportsman;
    let trainerInfo: TrainerShorInfo = sportsmanObj.TrainerInfo === null || this.isEmpty(sportsmanObj.TrainerInfo.Name) || this.isEmpty(sportsmanObj.TrainerInfo.Surname)
      ? null : sportsmanObj.TrainerInfo as TrainerShorInfo;
    let indexTargetTrainer: number = -1;
    let isHaveSportsman: boolean = false;


    if (sportsman !== null && sportsman !== undefined) {



      if (this.findSportsmanInSource(sportsman, this.sportsmen)) {
        alert("Добавляемый спортсмен уже существует!");
        return;
      }


      if (trainerInfo !== null && this.trainersInfo !== undefined) {
        for (let i = 0; i < this.trainers.length; i++) {
          if (this.trainers[i].Name == trainerInfo.Name && this.trainers[i].Surname == trainerInfo.Surname) {
            indexTargetTrainer = i;
            break;
          }
        }
        if (indexTargetTrainer !== -1) {
          for (let i = 0; i < this.trainers[indexTargetTrainer].Sportsmen.length; i++) { //Проверяем его спортсменов
            if (sportsman.Name === this.trainers[indexTargetTrainer].Sportsmen[i].Name && sportsman.Surname === this.trainers[indexTargetTrainer].Sportsmen[i].Surname) {
              isHaveSportsman = true;
              break;
            }
          }
        }

        if (!isHaveSportsman) { // нет такого спортсмена
          sportsman.Trainer = this.trainers[indexTargetTrainer];
          this.trainers[indexTargetTrainer].Sportsmen.push(sportsman);
        }
        else {
          alert("Вы пытаетесь добавить уже имеющегося спортсмена");
        }
      }

      let newArrr: Sportsman[] = [];
      Object.assign(newArrr, this.sportsmen);
      newArrr.push(sportsman);

      this.sportsmen = newArrr;

      this.sharedLocalDataService.updateSharedTrainerData(this.trainers);
      this.sharedLocalDataService.updateSharedSportsmenData(this.sportsmen);
      
    }
    else {
      alert("Невозможно добаить спортсмена, данные повреждены!");
    }
  }



  changeSportsman(sportsmanContext: any) { //Рефакторить

    let sptr: Sportsman = sportsmanContext.Sportsman as Sportsman;
    let trainerInfo: TrainerShorInfo = sportsmanContext.TrainerInfo as TrainerShorInfo;

    let idNewTrainer: number = -1;
    let newspInNewTrainer: boolean = false;

    if (sptr !== null && sptr !== undefined) {
      /* 
            if (this.findSportsmanInSource(sptr, this.sportsmen)) {
              alert("Измененный спортсмен соответствует уже существующему!");
            } */


      if (trainerInfo !== null && trainerInfo !== undefined) { // Есть запись о тренере

        idNewTrainer = this.trainers.findIndex(tr => { // Получаем индекс тренера
          return trainerInfo.Name === tr.Name && trainerInfo.Surname === tr.Surname
        });
    

        if (idNewTrainer === this.idChangeSpTrainer) { // Тренер не поменялся
          let localIndex2 = this.getLocalIndexSportsman(this.trainers[idNewTrainer], this.sportsmen[this.idChangeSp]);

          this.trainers[this.idChangeSpTrainer].Sportsmen[localIndex2].Name = sptr.Name;
          this.trainers[this.idChangeSpTrainer].Sportsmen[localIndex2].Surname = sptr.Surname;
          return;
        }

        if (idNewTrainer === -1) { // Новый, указанный тренер при редактировании не найден
          alert("Целевой тренер не обнаружен!");
          return;
        }
        else { // Запись тренера есть, и она не соответствует старому тренеру
          newspInNewTrainer = this.sportsmanIsTrainer(this.trainers[idNewTrainer], sptr);

          if (this.idChangeSpTrainer !== -1) { // Тренер был у спортсмена до редактирования

            let localIndex = this.getLocalIndexSportsman(this.trainers[this.idChangeSpTrainer], this.sportsmen[this.idChangeSp]);
            if (localIndex !== -1) { // Нашли индекс старого спортсмена(до редоктирования) у старого тренера
              if (!newspInNewTrainer) { // У нового тренера нет совпадений по измененному спортсмену
                this.trainers[this.idChangeSpTrainer].Sportsmen[localIndex].Trainer = null;
                this.trainers[this.idChangeSpTrainer].Sportsmen.splice(localIndex, 1);

                this.sportsmen[this.idChangeSp].Name = sptr.Name;
                this.sportsmen[this.idChangeSp].Surname = sptr.Surname;
                this.sportsmen[this.idChangeSp].Trainer = this.trainers[idNewTrainer];

                this.trainers[idNewTrainer].Sportsmen.push(this.sportsmen[this.idChangeSp]);

                this.idChangeSpTrainer = idNewTrainer;
              }
              else {
                alert("Новый спортсмен повторяет существующего в целевом тренере!");
                return;
              }
            }
            else {
              alert("Не получилось найти старого спортсмена!");
              return;
            }
          }
          else { // Тренера небыло у спортсмена до редактирования, но появлися
            if (!newspInNewTrainer) { //Совпадений нет

              this.sportsmen[this.idChangeSp].Name = sptr.Name;
              this.sportsmen[this.idChangeSp].Surname = sptr.Surname;
              this.sportsmen[this.idChangeSp].Trainer = this.trainers[idNewTrainer];

              this.getLocalIndexSportsman(this.trainers[idNewTrainer], this.sportsmen[this.idChangeSp]) === -1
                ? this.trainers[idNewTrainer].Sportsmen.push(this.sportsmen[this.idChangeSp])
                : alert("У целевого тренера уже существует данный спортсмен!");

              this.idChangeSpTrainer = idNewTrainer;
            }
            else {
              alert("Новый спортсмен существует в целевом тренере!");
            }
          }
        }
      }
      else { // проверить был ли тренер до редактирования
        if (this.idChangeSpTrainer !== -1) { //был тренер

          let local = this.getLocalIndexSportsman(this.trainers[this.idChangeSpTrainer], this.sportsmen[this.idChangeSp]);

          if (local !== -1) {
            this.trainers[this.idChangeSpTrainer].Sportsmen[local].Trainer = null;
            this.trainers[this.idChangeSpTrainer].Sportsmen.splice(local, 1);


            this.sportsmen[this.idChangeSp].Name = sptr.Name;
            this.sportsmen[this.idChangeSp].Surname = sptr.Surname;
            this.sportsmen[this.idChangeSp].Trainer = null;

            this.idChangeSpTrainer = -1;
          }
          else {
            alert("Предыдущая версия не найдена в целевом теренер!");

          }
        }
        else { // Небыло тренера
          this.sportsmen[this.idChangeSp].Name = sptr.Name;
          this.sportsmen[this.idChangeSp].Surname = sptr.Surname;
          this.sportsmen[this.idChangeSp].Trainer = null;
          ;
        }
      }

    }
    else {
      alert("Нет спорсмена или неверные данные!");
      return;
    }

  }

  private sportsmanIsTrainer(trainer: Trainer, sportsman: Sportsman): boolean {

    let result: boolean = false;

    trainer.Sportsmen.forEach(sp => {
      if (!result) {
        if (sp.Name === sportsman.Name && sp.Surname === sportsman.Surname) {
          result = true;
        }
      }

    });

    return result;
  }



  private getLocalIndexSportsman(trainer: Trainer, sportsman: Sportsman): number {
    return trainer.Sportsmen.findIndex(sp => {
      return sp.Name === sportsman.Name && sp.Surname === sportsman.Surname
    });


  }

  private getTrainersinfoList(trainers: Trainer[]): TrainerShorInfo[] {
    let trainersInfo: TrainerShorInfo[] = [];

    for (let i = 0; i < trainers.length; i++) {
      trainersInfo.push({ Name: trainers[i].Name, Surname: trainers[i].Surname });
    }

    return trainersInfo;
  }

  private findSportsmanInSource(sprt1: Sportsman, sprts: Sportsman[]): boolean {

    let res: boolean = false;

    let getTr = function (spt: Sportsman): boolean {
      return spt.Trainer === null || spt.Trainer === undefined || !typeof (SportsmenComponent).prototype.isEmpty(spt.Trainer.Name);
    };

    let isTrainer: boolean = getTr(sprt1);


    sprts.forEach(sp => {
      if (sp.Name === sprt1.Name && sp.Surname === sprt1.Surname
        && isTrainer ? sprt1.Trainer.Name === sp.Trainer.Name ? true : false : getTr(sp)) {
        res = true;
        return res;
      }
    })

    return res;

  }



  private isEmpty(str: string): boolean {
    let res: boolean;

    if (str === null || str === undefined) {
      res = true;
      return res;
    }


    let isSpace = /\s/.test(str);
    if (str !== '') {
      res = false;
      return res;
    }

    if (str === '' || isSpace) {
      res = true;
      return res;
    }
  }

}
