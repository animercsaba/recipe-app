import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
	token: string;

	constructor(private router: Router) {}

	signupUser(email: string, password: string) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(
				err => console.log(err)
			);
	}

	signinUser(email: string, password: string) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(
			response => {
				this.router.navigate(['/']);
				firebase.auth().currentUser.getIdToken().then(
					(token: string) => this.token = token
				);
			}
		)
		.catch(
			err => console.log(err)
		);
	}

	getToken() {
		firebase.auth().currentUser.getIdToken().then(
			(token: string) => this.token = token
		);
		return this.token;
	}

	isAuthenticated() {
		return this.token != null;
	}

	logOut() {
		firebase.auth().signOut();
		this.token = null;
	}
}
