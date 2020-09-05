import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-tips',
	templateUrl: './tips.page.html',
	styleUrls: ['./tips.page.scss'],
})

export class TipsPage implements OnInit {

	constructor() { }

	ngOnInit() {
		var acc = document.getElementsByClassName("accordion");
		var i;
		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.display === "block") {
					panel.style.display = "none";
				} else {
					panel.style.display = "block";
				}
			});
		}
	}

}
