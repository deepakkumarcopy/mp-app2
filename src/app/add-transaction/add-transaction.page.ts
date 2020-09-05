import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { GoalService } from '../services/goal.service';

@Component({
	selector: 'app-add-transaction',
	templateUrl: './add-transaction.page.html',
	styleUrls: ['./add-transaction.page.scss'],
})

export class AddTransactionPage implements OnInit {


	ngOnInit() {
	}

	addExpenseForm: FormGroup;
	public errorMessage: string;
	goals;
	totalExps;

	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public expenseService: ExpenseService,
		private goalProvider: GoalService,
		public alertController: AlertController
	) {
		this.addExpenseForm = fb.group({
			'date': new FormControl(null, [Validators.required]),
			'amount': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]),
			'category': new FormControl(null, [Validators.required]),
			'desc': new FormControl(null, [Validators.required]),
			'remark': new FormControl,
			'goal': new FormControl(null, [Validators.required])

		})
		expenseService.getExpenseDetail().subscribe((data: any) => {
			this.totalExps = this.getTotalSpentByBudget(data);
			goalProvider.getGoals().subscribe((data) => {
				this.goals = data;
			});
		});
	}
	// This function checks for expenses that will bust the budget.
	// If bust, it shows the alert on the screen
	checkOverBudget(goals, totalExps, currentExpense) {
		let goal_id = currentExpense.goal_id;
		let amount = currentExpense.amount;
		let selectedGoal = goals.filter(goal => goal.goals_id == goal_id)[0];

		if ((totalExps[goal_id] + amount) > selectedGoal['amount']) {

			this.showAlert(selectedGoal['name'], ((totalExps[goal_id] + amount) - selectedGoal['amount']));
		}

		this.goToViewExpense();
		// this.showAlert();
	}

	reachingBudget(goals, totalExps, currentExpense) {
		let goal_id = currentExpense.goal_id;
		let amount = currentExpense.amount;
		let selectedGoal = goals.filter(goal => goal.goals_id == goal_id)[0];

		if ((totalExps[goal_id] + amount) >= (selectedGoal['amount'] * 0.75) &&
			(totalExps[goal_id] + amount) < (selectedGoal['amount'])) {

			this.reachingAlert(selectedGoal['name'], ((selectedGoal['amount']) - (totalExps[goal_id] + amount)));
		}

		this.goToViewExpense();
		// this.showAlert();
	}

	// The alerts that show on the screen
	async showAlert(nameOfBudget, amount) {
		let alert = await this.alertController.create({
			header: 'Budget Exceeded',
			subHeader: '',
			message: "You have exceeded your " + nameOfBudget + " budget by $" + amount + ".",
			buttons: ['Dismiss']
		});
		await alert.present();
	}

	async reachingAlert(nameOfBudget, amount) {
		let alert = await this.alertController.create({
			header: 'Budget Reaching',
			subHeader: '',
			message: "You are reaching your " + nameOfBudget + " with remaining $" + amount + "." + "Please spend the remaining amount wisely!",
			buttons: ['Dismiss']
		});
		await alert.present();
	}

	formatdmy(date) {

		date = new Date(date);

		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();

		return day + '-' + month + '-' + year;
	}

	// This function adds up the expenses used up by each budget 
	getTotalSpentByBudget(expenses) {
		let totalExpenses = {};
		for (var i = 0; i < expenses.length; i++) {
			if (totalExpenses[expenses[i].goals_id] == undefined) {
				totalExpenses[expenses[i].goals_id] = 0;
			}
			totalExpenses[expenses[i].goals_id] += parseInt(expenses[i].amount);
		}
		return totalExpenses;
	}

	goToViewExpense() {
		this.navCtrl.navigateRoot('tabs');
	}

	clickAdd() {
		if (this.addExpenseForm.value.date != " " && this.addExpenseForm.value.amount != "" && this.addExpenseForm.value.category != ""
			&& this.addExpenseForm.value.desc != "" && this.addExpenseForm.value.remark != "") {
			this.expenseService.addExpense(this.addExpenseForm.value.date, this.addExpenseForm.value.amount,
				this.addExpenseForm.value.category, this.addExpenseForm.value.desc, this.addExpenseForm.value.remark, this.addExpenseForm.value.goal);
			this.checkOverBudget(this.goals, this.totalExps, {
				goal_id: this.addExpenseForm.value.goal,
				amount: parseInt(this.addExpenseForm.value.amount)
			});
			this.reachingBudget(this.goals, this.totalExps, {
				goal_id: this.addExpenseForm.value.goal,
				amount: parseInt(this.addExpenseForm.value.amount)
			});
		}
	}
}
