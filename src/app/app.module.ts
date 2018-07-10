import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { TrainerComponent } from './trainer/trainer.component';
import { TrainerRegistrationComponent } from './trainer-registration/trainer-registration.component';
import * as $ from 'jquery';
import { TrainerChangeComponent } from './trainer-change/trainer-change.component';
import {KeysPipe} from 'src/app/pipes/custom-pipes';

import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DropdownSportsmenListComponent } from './widgets/dropdown-sportsmen-list/dropdown-sportsmen-list.component';
import { TableViewComponent } from './widgets/table-view/table-view.component';
import { SportsmenComponent } from './sportsmen/sportsmen.component';
import { SportsmanChangeComponent } from './sportsmen/sportsman-change/sportsman-change.component';
import { SportsmanRegistrationComponent } from './sportsmen/sportsman-registration/sportsman-registration.component';

import {SharedLocalDataService} from './services/shared-local-data.service';

const appRoutes: Routes = [
{path: 'trainers', component: TrainerComponent},
{path: 'sportsmen', component: SportsmenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TrainerComponent,
    TrainerRegistrationComponent,
    KeysPipe,
    TrainerChangeComponent,
    DropdownSportsmenListComponent,
    TableViewComponent,
    SportsmenComponent,
    SportsmanChangeComponent,
    SportsmanRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [SharedLocalDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
