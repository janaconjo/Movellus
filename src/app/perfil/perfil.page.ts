import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = null;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadUserPerfil();
  }

  // Carregar dados do perfil do usuário
  async loadUserPerfil() {
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      try {
        const userDoc = await this.firestore
          .collection('users')
          .doc(currentUser.uid)
          .get()
          .toPromise();

        if (userDoc?.exists) {
          this.user = userDoc.data();
          console.log('Dados do usuário carregados:', this.user);
        } else {
          console.error('Documento do usuário não encontrado no Firestore.');
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
      }
    } else {
      console.error('Nenhum usuário autenticado.');
    }
  }

  // Logout
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  // Função para editar perfil
  async editProfile() {
    const alert = await this.alertController.create({
      header: 'Editar Perfil',
      inputs: [
        {
          name: 'fullName',
          type: 'text',
          placeholder: 'Nome Completo',
          value: this.user?.fullName || '',
        },
        {
          name: 'phoneNumber',
          type: 'text',
          placeholder: 'Telefone',
          value: this.user?.phoneNumber || '',
        },
        {
          name: 'dateOfBirth',
          type: 'date',
          placeholder: 'Data de Nascimento',
          value: this.user?.dateOfBirth || '',
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Endereço',
          value: this.user?.address || '',
        },
        {
          name: 'bio',
          type: 'textarea',
          placeholder: 'Biografia',
          value: this.user?.bio || '',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            this.updateUserProfile(data);
          },
        },
      ],
    });

    await alert.present();
  }

  // Atualizar dados do perfil no Firestore
  async updateUserProfile(data: any) {
    const currentUser = await this.auth.currentUser;
    if (currentUser) {
      try {
        await this.firestore.collection('users').doc(currentUser.uid).update(data);
        this.user = { ...this.user, ...data }; // Atualiza os dados localmente
        console.log('Perfil atualizado com sucesso');
      } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
      }
    }
  }

  // Função para salvar as alterações
  saveProfile() {
    console.log('Alterações salvas');
  }
}
