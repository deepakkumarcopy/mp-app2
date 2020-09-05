import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { ExpenseDataService } from './expense-data.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ExpenseModelService } from './expense-model.service';


@Injectable({
	providedIn: 'root'
})
export class ExpenseService {

	expenseListRef: AngularFirestoreCollection<any>;
	expenses: Observable<ExpenseDataService[]>;
	id: any;

	constructor(
		public http: HttpClient,
		public firestore: AngularFirestore
	) {
		// this.expenseListRef = firestore.collection<any>('expenses');
		this.expenseListRef = this.firestore.collection<any>("expenses", x => x.orderBy("date", "desc"));
		this.expenses = this.expenseListRef.snapshotChanges().map((changes: any) => {
			return changes.map((a: any) => {
				const data = a.payload.doc.data() as ExpenseDataService;
				data.id = a.payload.doc.id;
				return data;
			});
		});
	}

	addExpense(date: string, amount: number, category: string, desc: string, remark: string, goal: number): Promise<any> {
		const expenseId: string = this.firestore.createId();
		return this.expenseListRef.doc(expenseId).set({
			expenseId: expenseId, date: date,
			//this.firestore.collection('expenses').add({ date: date,
			amount: amount,
			category: category,
			desc: desc,
			remark: remark,
			goals_id: goal
		});
	}

	//use for update but it creates a new transaction instad of updating it 
	//addUpdateExpense(id:string,date:string, amount:number,category:string,desc:string,remark:string){

	//this.firestore.collection('expenses').add({date,
	//amount,
	//category,
	//desc,
	//remark});
	//}
	//getExpenseDetail(){
	//  return this.expenseListRef.valueChanges('expenseId')
	//}

	getExpenseDetail() {
		console.log('')
		return this.expenses;
	}

	getExpenseList(Expenses: string): AngularFirestoreCollection<ExpenseModelService> {
		return this.firestore.collection(`expenses`);
	}


	UpdateExpense(documentId: string, date: string, amount: number, category: string, desc: string, remark: string, goal: number): Promise<any> {

		return this.expenseListRef.doc(documentId).update({
			date,
			amount,
			category,
			desc,
			remark,
			goal
		});
	}

	deleteExpense(expenseId: string) {
		this.expenseListRef.doc(expenseId).delete();
	}
}
