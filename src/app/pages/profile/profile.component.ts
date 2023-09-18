import { Component, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  authStateSubscription = new Subscription;
  user: any;

  constructor() { }

  async ngOnInit() {
    this.authStateSubscription = this.authState$.subscribe(
      (userData: User | null) => {
        if (userData) this.user = userData
      }
    )
  }

  ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  logout() {
    this.auth.signOut();
    alert('Você saiu do aplicativo.');
    location.href = "home";
  }

  toProfile() {
    window.open('https://myaccount.google.com/', '_blank')
  }

}
