import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetGoalsPageRoutingModule } from './set-goals-routing.module';

import { SetGoalsPage } from './set-goals.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		SetGoalsPageRoutingModule
	],
	declarations: [SetGoalsPage]
})

export class SetGoalsPageModule { }