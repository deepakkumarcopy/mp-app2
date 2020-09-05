// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExpenseModelService {

//   constructor() { }
// }
export interface ExpenseModelService {
	expenseId:string,
	date: string,
	amount:number, 
	category:string,
	desc:string,
	remark:string
}