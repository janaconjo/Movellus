import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordStrength: string = '';
  passwordStrengthColor: string = '';

  // Validações
  isFullNameInvalid: boolean = false;
  isEmailInvalid: boolean = false;
  isPasswordMismatch: boolean = false;

  constructor(
    private alertController: AlertController,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Mostrar alerta
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Validar nome completo
  validateFullName() {
    this.isFullNameInvalid = !this.fullName.trim();
  }

  // Validar email
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isEmailInvalid = !emailRegex.test(this.email);
  }

  // Validar se as senhas coincidem
  validatePasswordMatch() {
    this.isPasswordMismatch = this.password !== this.confirmPassword;
  }

  // Verificar força da senha
  checkPasswordStrength() {
    const lengthRequirement = this.password.length >= 8;
    const hasLetters = /[A-Za-z]/.test(this.password);
    const hasNumbers = /[0-9]/.test(this.password);
    const hasSpecialChars = /[!@#$%^&*]/.test(this.password);

    if (lengthRequirement && hasLetters && hasNumbers && hasSpecialChars) {
      this.passwordStrength = 'Forte';
      this.passwordStrengthColor = 'green';
    } else if (lengthRequirement && (hasLetters || hasNumbers)) {
      this.passwordStrength = 'Moderada';
      this.passwordStrengthColor = 'orange';
    } else {
      this.passwordStrength = 'Fraca';
      this.passwordStrengthColor = 'red';
    }
  }

  // Função de registro
  async register() {
    this.validateFullName();
    this.validateEmail();
    this.validatePasswordMatch();

    // Verifica se as validações falharam
    if (this.isFullNameInvalid || this.isEmailInvalid || this.isPasswordMismatch) {
      return;
    }

    try {
      // Registro no Firebase Auth
      const userCredential = await this.auth.createUserWithEmailAndPassword(this.email, this.password);

      // Salvar dados no Firestore
      await this.firestore.collection('users').doc(userCredential.user?.uid).set({
        fullName: this.fullName,
        email: this.email,
      });

      console.log('Usuário registrado no Firestore:', userCredential.user?.uid);

      // Exibir alerta de sucesso
      const successAlert = await this.alertController.create({
        header: 'Sucesso',
        message: 'Cadastro realizado com sucesso!',
        buttons: ['OK'],
      });

      // Navegar para a página de perfil após o sucesso
      successAlert.onDidDismiss().then(() => {
        this.router.navigate(['/perfil']);
      });

      await successAlert.present();
    } catch (error: any) {
      console.error('Erro no registro:', error);
      let errorMessage = 'Falha ao cadastrar. Tente novamente.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este email já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'O email fornecido é inválido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha fornecida é muito fraca.';
      }

      // Exibir alerta de erro
      await this.showAlert('Erro', errorMessage);
    }
  }
}
