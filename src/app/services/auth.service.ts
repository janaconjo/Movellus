import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Função para registrar um novo usuário
  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Função para autenticar um usuário (login)
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Função para sair (logout)
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // Função para obter o ID do usuário logado
  async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser; // Obtém o usuário logado
    return user ? user.uid : null; // Retorna o ID ou null se não estiver logado
  }

  // Função para verificar se o usuário está logado
  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.afAuth.onAuthStateChanged((user) => {
        observer.next(!!user); // Retorna true se o usuário estiver logado
      });
    });
  }
}
