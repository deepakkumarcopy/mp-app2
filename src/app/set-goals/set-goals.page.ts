import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GoalService } from '../services/goal.service';

@Component({
	selector: 'app-set-goals',
	templateUrl: './set-goals.page.html',
	styleUrls: ['./set-goals.page.scss'],
})

export class SetGoalsPage implements OnInit {


	ngOnInit() {
	}
	myGoals: FormGroup;
	msg: string;
	public errorMessage: string;

	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public goalProvider: GoalService,
		public toastCtrl: ToastController
	) {
		this.myGoals = fb.group({
			'name': new FormControl(null, [Validators.required]),
			'amount': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")]),
			'startDate': new FormControl(null, [Validators.required]),
			'endDate': new FormControl(null, [Validators.required]),
			'optional': new FormControl
		})
	}

	//name: [
	//   "",
	//  Validators.compose([Validators.required])
	// ],
	//amount: [
	//  "",
	//  Validators.compose([Validators.required,Validators.pattern("^[0-9]+(\.[0-9]{1,2})?$")])
	// ],
	//   startDate: [
	//    "",
	//     Validators.compose([Validators.required])
	//   ],
	//   endDate: [
	//    "",
	//    Validators.compose([Validators.required])
	//   ],
	//  optional: [
	//   "",

	// ]
	//  });
	// }



	//  formatdmy(date) {
	//
	//    date = new Date(date);
	//
	//    var day = ('0' + date.getDate()).slice(-2);
	//    var month = ('0' + (date.getMonth() + 1)).slice(-2);
	//    var year = date.getFullYear();

	//    return day + '-' + month + '-' + year;
	//}

	//  positiveNumber(control: FormControl): { [s: string]: boolean } {

	//    if (control.value && control.value.match(/^\d+\.?\d?\d?$/)) {
	//     return null;
	//    }

	//     return { 'invalidNumber': true }; 


	//   };


	//addUpdateGoal(
	//  budgetName: string,
	//  budgetAmount: number,
	//  budgetStartDate: string,
	//   budgetEndDate: string,
	//   budgetOptional : string
	//):void{
	//  if(!this.myGoals.valid){
	//    console.log("Invalid value");
	//  }
	//  if( budgetOptional== null){
	//    budgetOptional = "";
	//}

	// budgetStartDate = this.formatdmy(budgetStartDate);
	// budgetEndDate = this.formatdmy(budgetEndDate);
	// this.goalProvider
	// .addUpdateGoal(budgetName,budgetAmount,budgetStartDate,budgetEndDate,budgetOptional)
	//}

	async clickAdd() {

		//if(!this.myGoals.valid){
		//   console.log("Invalid value");
		//  }
		//this.myGoals.value.startDate = this.formatdmy( this.myGoals.value.startDate);
		// this.myGoals.value.endDate = this.formatdmy(this.myGoals.value.endDate);
		let date = new Date().getTime();

		if (this.myGoals.value.name != " " &&
			this.myGoals.value.amount != "" &&
			this.myGoals.value.startDate != "" &&
			this.myGoals.value.endDate != "" &&
			this.myGoals.value.optional != ""
		) {
			this.goalProvider.addUpdateGoal(this.myGoals.value.name, this.myGoals.value.amount, this.myGoals.value.startDate, this.myGoals.value.endDate, this.myGoals.value.optional, date.toString());
			this.navCtrl.pop();
			const toast = await this.toastCtrl.create({
				message: 'Your goals were successfully added',
				duration: 2000
			});
			await toast.present();
		} else {
			const toast = await this.toastCtrl.create({
				message: 'Failed to add Goal. Please check your inputs!',
				duration: 2000
			});
			await toast.present();
		}
	}

	clickView() {
		this.navCtrl.navigateForward('goals');
	}
}
