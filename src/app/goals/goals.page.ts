import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GoalService } from '../services/goal.service';

@Component({
	selector: 'app-goals',
	templateUrl: './goals.page.html',
	styleUrls: ['./goals.page.scss'],
})

export class GoalsPage implements OnInit {

	goals: any;

	constructor(
		public navCtrl: NavController,
		public goalProvider: GoalService
	) {
		goalProvider.getGoals().subscribe((data) => {
			this.goals = data;
		});
	}

	ngOnInit() {
	}

	viewGoal(name, amount, startDate, endDate, optional, goal) {
		this.navCtrl.navigateForward('edit-goal', {
			state: {
				item: {
					name: name, amount: amount, startDate: startDate, endDate: endDate,
					optional: optional, expense: goal
				}
			}
		});
	}
}
