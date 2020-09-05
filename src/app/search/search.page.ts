import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
	selector: 'app-search',
	templateUrl: './search.page.html',
	styleUrls: ['./search.page.scss'],
})

export class SearchPage implements OnInit {


	sampleArr = [];
	resultArr = [];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public firestore: AngularFirestore
	) {
	}

	ngOnInit() {
	}

	search(event) {
		let searchKey: string = event.target.value;
		let firstLetter = searchKey;

		if (searchKey.length == 0) {
			this.sampleArr = [];
			this.resultArr = [];
		}


		if (this.sampleArr.length == 0) {
			this.firestore.collection('expenses', ref => ref.where('desc', '==', firstLetter)).snapshotChanges().subscribe(data => {
				data.forEach(childData => {
					this.sampleArr.push(childData.payload.doc.data())
				})
			})
		} else {
			this.resultArr = [];
			this.sampleArr.forEach(val => {
				let desc: string = val['Desc'];
				if (desc.startsWith(searchKey)) {
					if (true) {
						this.resultArr.push(val);
					}
				}
			})
		}
	}
}
