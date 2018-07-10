import { Component } from '@angular/core';
import { Trainer, Sportsman, Roles } from './models/model';
import { RouterModule, Routes } from '@angular/router';
import { SharedLocalDataService } from './services/shared-local-data.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';

  trainers: Trainer[];
  sportsmen: Sportsman[];

  constructor(private sharedLocalDataService: SharedLocalDataService) {

    this.sportsmen = [];
    this.trainers = [];

    let trainer1: Trainer = { Name: "Володя", Surname: "Плеханов", Email: "volodya@ya.ru", Role: Roles.Default, Sportsmen: [] };
    trainer1.Sportsmen.push({ Name: "Миха", Surname: "Порохов", Trainer: trainer1 });
    trainer1.Sportsmen.push({ Name: "Оля", Surname: "Дубкина", Trainer: trainer1 });
    trainer1.Sportsmen.push({ Name: "Дима", Surname: "Шаровоз", Trainer: trainer1 });
    trainer1.Sportsmen.push({ Name: "Виталик", Surname: "Китченко", Trainer: trainer1 });
    trainer1.Sportsmen.push({ Name: "Константин", Surname: "Дабровский", Trainer: trainer1 });

    let trainer2: Trainer = { Name: "Роман", Surname: "Виноделов", Email: "RomaBoss@gmail.com", Role: Roles.Admin, Sportsmen: [] };
    trainer2.Sportsmen.push({ Name: "Анна", Surname: "Вишневская", Trainer: trainer2 });
    trainer2.Sportsmen.push({ Name: "Жозель", Surname: "Котченко", Trainer: trainer2 });
    trainer2.Sportsmen.push({ Name: "Игорь", Surname: "Путчинко", Trainer: trainer2 });
    trainer2.Sportsmen.push({ Name: "Александр", Surname: "Варламов", Trainer: trainer2 });
    trainer2.Sportsmen.push({ Name: "Максим", Surname: "Пулевский", Trainer: trainer2 });

    let trainer3: Trainer = { Name: "Ангелина", Surname: "Курапаткова", Email: "Angel@mail.ru", Role: Roles.Default, Sportsmen: [] };
    trainer3.Sportsmen.push({ Name: "Ибрагим", Surname: "Дараван", Trainer: trainer3 });
    trainer3.Sportsmen.push({ Name: "Евгений", Surname: "Капчанский", Trainer: trainer3 });
    trainer3.Sportsmen.push({ Name: "Владимир", Surname: "Тузов", Trainer: trainer3 });
    trainer3.Sportsmen.push({ Name: "Илья", Surname: "Ручковский", Trainer: trainer3 });
    trainer3.Sportsmen.push({ Name: "Инна", Surname: "Парапетова", Trainer: trainer3 });

    this.trainers.push(trainer1);
    this.trainers.push(trainer2);
    this.trainers.push(trainer3);


    this.sportsmen = this.getSportsmen(this.trainers);

/*     sharedLocalDataService.getDataTrainer().subscribe((dataTr) => this.trainers = dataTr);
    sharedLocalDataService.getDataSportsmen().subscribe((dataSp) => this.sportsmen = dataSp); */

    sharedLocalDataService.updateSharedTrainerData(this.trainers);
    sharedLocalDataService.updateSharedSportsmenData(this.sportsmen);

  }

  private getSportsmen(trainers: Trainer[]): Sportsman[] {
    let sportsmen: Sportsman[] = [];

    for (let i = 0; i < trainers.length; i++) {
      sportsmen = sportsmen.concat(trainers[i].Sportsmen);
    }

    return sportsmen;
  }




  private testMethod(): void {

  }

}
