import { Component, OnInit, ViewChild } from '@angular/core';

import { NavController, IonSlides, Platform } from '@ionic/angular';
import { ExpenseService } from '../services/expense.service';
import { ExpenseModelService } from '../services/expense-model.service';
import { Observable } from 'rxjs/Observable';
import { GoalService } from '../services/goal.service';
import { GoalModelService } from '../services/goal-model.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Chart } from 'chart.js';
import * as data from '../../assets/input.json';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.page.html',
	styleUrls: ['./stats.page.scss'],
})

export class StatsPage implements OnInit {

	@ViewChild('slider') slider: IonSlides;
	page = 0;
	isAvailable = false;
	expenses: any;
	goals: any;
	amount: number;
	public expenseListRef: Observable<ExpenseModelService[]>;
	totalamount: number = 0;
	public goalCollectionRef: Observable<GoalModelService[]>;
	statusMsg: number = 0;
	sampleArr = [];
	resultArr = [];

	totalExps = {};
	//chart.js stuffs
	monthlyTrans: any = data["default"];
	@ViewChild('BarChart') barChart;
	bars: any;
	colorArray: any;
	month: string[] = [];
	transAmount: string[] = [];
	color: string[] = [];
	colorH: string[] = [];
	private timeoutId: number;


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
			console.log(this.monthlyTrans);
		});
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

	//ionviewdidenter for charts
	ionViewWillEnter() {
		this.monthlyTrans.forEach(x => {
			this.month.push(x.month);
			this.transAmount.push(x.transAmount);
			this.color.push(x.color);
			this.colorH.push(x.colorH);
		});
		this.createBarChart();
	}

	createBarChart() {
		this.bars = new Chart(this.barChart.nativeElement, {
			type: 'bar',
			data: {
				labels: this.month,
				datasets: [{
					label: 'Monthly Summary',
					data: this.transAmount,
					backgroundColor: this.color,
					borderColor: this.colorH,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		})
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

	ionViewDidLoad() {

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
		})
	}

	totalExpense(total_amount) {
		this
	}

	selectedTab(index) {
		this.slider.slideTo(index);
	}
}
