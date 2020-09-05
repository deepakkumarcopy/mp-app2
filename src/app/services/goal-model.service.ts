// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoalModelService {

//   constructor() { }
// }
export interface GoalModelService {

	name: string, 
	amount : number, 
	startDate: string, 
	endDate:string, 
	optional:string
}