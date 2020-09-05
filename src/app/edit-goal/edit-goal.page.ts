import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-goal',
	templateUrl: './edit-goal.page.html',
	styleUrls: ['./edit-goal.page.scss'],
})

export class EditGoalPage implements OnInit {

	myGoals: FormGroup;
	public errorMessage: string;
	myGoal: any;

	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public route: Router,
		public goalProvider: GoalService
	) {
		if (this.route.getCurrentNavigation().extras.state) {
			this.myGoal = this.route.getCurrentNavigation().extras.state.item;
		}
		this.myGoals = fb.group({
			'name': this.myGoal.get("name"),
			'amount': this.myGoal.get("amount"),
			'startDate': this.myGoal.get("startDate"),
			'endDate': this.myGoal.get("endDate"),
			'optional': this.myGoal.get("optional")
		});
	}

	ngOnInit() {
	}

	clickUpdate() {
		if (this.myGoals.value.name != "") {
			this.goalProvider.addUpdateGoal(this.myGoals.value.name, this.myGoals.value.amount,
				this.myGoals.value.startDate, this.myGoals.value.endDate, this.myGoals.value.optional, this.myGoal.expense.goals_id);
			this.navCtrl.pop();
		}
		else {
			console.log("Budget Name cannot be empty");
		}
	}

	clickDelete() {
		this.goalProvider.deleteGoal(this.myGoals.value.name);
		this.navCtrl.pop();
	}
}
