import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
	selector: 'app-edit-expense',
	templateUrl: './edit-expense.page.html',
	styleUrls: ['./edit-expense.page.scss'],
})
export class EditExpensePage implements OnInit {

	addExpenseForm: FormGroup;
	expenseId: string;
	myGoal: any;

	constructor(
		public navCtrl: NavController,
		public route: Router,
		public fb: FormBuilder,
		public expenseProvider: ExpenseService,
		public firestore: AngularFirestore
	) {
		if (this.route.getCurrentNavigation().extras.state) {
			this.myGoal = this.route.getCurrentNavigation().extras.state.item;
		}
		this.addExpenseForm = fb.group({
			'date': this.myGoal.date,
			'amount': this.myGoal.amount,
			'category': this.myGoal.category,
			'desc': this.myGoal.desc,
			'remark': this.myGoal.remark
		});
	}

	ngOnInit() {
	}

	formatdmy(date) {

		date = new Date(date);

		var day = ('0' + date.getDate()).slice(-2);
		var month = ('0' + (date.getMonth() + 1)).slice(-2);
		var year = date.getFullYear();

		return day + '-' + month + '-' + year;
	}

	clickUpdate() {

		if (this.addExpenseForm.value.date != "") {
			this.expenseProvider.UpdateExpense(this.myGoal.expense.expenseId, this.addExpenseForm.value.date, this.addExpenseForm.value.amount, this.addExpenseForm.value.category, this.addExpenseForm.value.desc, this.addExpenseForm.value.remark, this.myGoal.expense.goals_id);
			this.navCtrl.pop();
		}
		else {
			console.log("Email cannot be empty!");
		}
	}

	clickDelete() {
		console.log(this);
		this.expenseProvider.deleteExpense(this.myGoal.expense.expenseId);
		this.navCtrl.pop();
	}
}
