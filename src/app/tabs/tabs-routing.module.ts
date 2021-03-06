import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
	{
		path: 'tabs',
		component: TabsPage,
		children: [
			{
				path: 'home',
				loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
			},
			{
				path: 'stats',
				loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
			},
			{
				path: 'add-transaction',
				loadChildren: () => import('../add-transaction/add-transaction.module').then(m => m.AddTransactionPageModule)
			},
			{
				path: 'tips',
				loadChildren: () => import('../tips/tips.module').then(m => m.TipsPageModule)
			},
			{
				path: 'tab3',
				loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
			},
			{
				path: '',
				redirectTo: '/tabs/home',
				pathMatch: 'full'
			}
		]
	},
	{
		path: '',
		redirectTo: '/tabs/home',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class TabsPageRoutingModule { }