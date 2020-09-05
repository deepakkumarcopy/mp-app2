import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SetGoalsPage } from '../set-goals/set-goals.page';
import { ExpenseService } from '../services/expense.service';
import { ExpenseModelService } from '../services/expense-model.service';
import { Observable } from 'rxjs/Observable';
import { GoalService } from '../services/goal.service';
import { GoalModelService } from '../services/goal-model.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { SearchPage } from '../search/search.page';
//import { templateJitUrl } from '@angular/compiler';
import { GoalsPage } from '../goals/goals.page';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

	isAvailable = false;
	next = SetGoalsPage;
	budget = GoalsPage;
	search = SearchPage;
	expenses: any;
	goals: any;
	amount: number;
	public expenseListRef: Observable<ExpenseModelService[]>;
	totalamount: number = 0;
	public goalCollectionRef: Observable<GoalService[]>;
	statusMsg: number = 0;
	sampleArr = [];
	resultArr = [];

	totalExps = {};
	//initializing default value for total
	// arr: ExpenseData[] = [];
	// model ={date:'',amount:'',category:'',desc:'',remark:''};
	// ngOnInit(){
	//   this.expenseProvider.getExpenseDetail().subscribe(
	//  (expenses: ExpenseData[]) => {
	//   this.arr = expenses;
	//   console.log(this.arr);
	//  }
	// );


	constructor(
		public navCtrl: NavController,
		public expenseProvider: ExpenseService,
		public goalProvider: GoalService,
		public firestore: AngularFirestore,
		private plt: Platform
	) {
		expenseProvider.getExpenseDetail().subscribe((data) => {
			this.expenses = data;
			this.totalExps = this.getTotalSpentByBudget(data);
			goalProvider.getGoals().subscribe((data) => {
				this.goals = this.removeExpiredBudget(data);
			});
		});
	}

	addBudget() {
		this.navCtrl.navigateForward('set-goals');
	}

	ngOnInit() {
		//get observable for the firestore collection based on userID
		this.expenseListRef = this.expenseProvider.getExpenseList("expenseId").valueChanges();
		this.expenseListRef.subscribe(val => {
			let amountarray: number[] = [];
			val.map((obj) => {
				amountarray.push(obj.amount);
			});
			this.totalamount = amountarray.reduce((a, b) => +a + +b, +0); // prefixing '+' before numbers to sumup
		});
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
	// The function to remove expired budgets from home page

	removeExpiredBudget(goals) {
		let d = new Date();
		let temp = [];
		for (var i = 0; i < goals.length; i++) {
			let goalsEndDate = new Date(goals[i]["endDate"]);
			if (goalsEndDate >= d) {
				temp.push(goals[i]);
			}
		}
		return temp;
	}

	setGoal() {
		this.navCtrl.navigateForward('set-goals');
	}

	viewExpense(date, amount, category, desc, remark, expense, goals_id) {
		this.navCtrl.navigateForward('edit-expense', {
			state: {
				item: {
					date: date,
					amount: amount,
					desc: desc,
					category: category,
					remark: remark,
					expense: expense,
					goals_id: goals_id
				}
			}
		});
	}

	viewGoal(name, amount, startDate, endDate, optional, goal, goals_id) {
		this.navCtrl.navigateForward('edit-goal', {
			state: {
				item: {
					name: name,
					amount: amount,
					startDate: startDate,
					endDate: endDate,
					optional: optional,
					expense: goal,
					goals_id: goals_id
				}
			}
		});
	}
}