import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService, 
    private router: Router,
    private toastController: ToastController 
  ) {}

  // Função para autenticar o usuário
  async login() {
    try {
      const user = await this.auth.login(this.email, this.password);
      console.log('Login bem-sucedido');
      if (user) {
        this.router.navigate(['/client']); 
      }
    } catch (error: any) {
      console.error('Erro no login:', error.message);

      this.presentToast('Email ou senha inválidos. Por favor, tente novamente.');
    }
  }

 
  async register() {
    try {
      const user = await this.auth.register(this.email, this.password);
      console.log('Cadastro bem-sucedido');
      if (user) {
        this.presentToast('Cadastro realizado com sucesso! Agora faça o login.');
        this.email = '';
        this.password = '';
      }
    } catch (error: any) {
      console.error('Erro no registro:', error.message);
  
      this.presentToast('Erro ao cadastrar. Por favor, tente novamente.');
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,  
      position: 'bottom', 
      color: 'danger',  
    });
    toast.present();
  }
}
