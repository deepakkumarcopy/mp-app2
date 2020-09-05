// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExpenseDataService {

//   constructor() { }
// }


export class ExpenseDataService {

	constructor(
		public id: string,
		public date: string,
		public amount: number,
		public category: string,
		public desc: string,
		public remark: string
	) {
	}
}
