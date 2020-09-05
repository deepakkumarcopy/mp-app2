import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { GoalModelService } from './goal-model.service';

@Injectable({
	providedIn: 'root'
})
export class GoalService {

	goalsCollectionRef: AngularFirestoreCollection<any>;

	constructor(
		public http: HttpClient,
		public firestore: AngularFirestore
	) {
		this.goalsCollectionRef = this.firestore.collection<any>('goals');
	}

	addUpdateGoal(name: string, amount: number, startDate: string, endDate: string, optional: string, goals_id: string) {
		this.goalsCollectionRef.doc(name).set({
			name: name,
			amount: amount,
			startDate: startDate,
			endDate: endDate,
			optional: optional,
			goals_id: goals_id
		});
	}

	deleteGoal(name: string) {
		this.goalsCollectionRef.doc(name).delete();
	}

	getGoals() {
		return this.goalsCollectionRef.valueChanges();
	}

	getGoalsList(goals: string): AngularFirestoreCollection<GoalModelService> {
		return this.firestore.collection(`goals`);
	}
}
