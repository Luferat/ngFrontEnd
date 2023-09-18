import { Component, inject } from '@angular/core';
import { GoogleAuthProvider, Auth, signInWithPopup, signInWithRedirect } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private auth: Auth = inject(Auth)
  ) { }

  login(provider: string) {

    signInWithPopup(this.auth, new GoogleAuthProvider())
      // signInWithRedirect(this.auth, new GoogleAuthProvider())
      .then((a) => {
        location.href = 'home';
      })
      .catch((error) => {
        console.error(error.code, error.message, error.customData.email);
        alert("Oooops! Ocorreram erros ao fazer login.");
      })

  }

}
