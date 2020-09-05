import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';

const config = {
	apiKey: "AIzaSyAm-gaFsZUp1aUgUQG1CvGJzmLCF-ssUf0",
	authDomain: "mpapp1-c39ee.firebaseapp.com",
	databaseURL: "https://mpapp1-c39ee.firebaseio.com",
	projectId: "mpapp1-c39ee",
	storageBucket: "mpapp1-c39ee.appspot.com",
	messagingSenderId: "271124210189",
	appId: "1:271124210189:web:0dcb61be6a3a635c9a6b44",
	measurementId: "G-4M030E3B24"
};

@NgModule({
	declarations: [
		AppComponent
	],
	entryComponents: [],
	imports: [
		BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		AngularFireModule.initializeApp(config),
		AngularFirestoreModule,
		HttpClientModule,
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
	],
	bootstrap: [AppComponent]
})

export class AppModule {}