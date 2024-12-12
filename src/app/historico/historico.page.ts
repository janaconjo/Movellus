import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  bookings: any[] = []; // Lista de agendamentos

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadBookings(); // Carrega os agendamentos ao inicializar
  }

  // Função para carregar agendamentos
  async loadBookings() {
    try {
      const snapshot = await this.firestore.collection('bookings').get().toPromise();

      if (snapshot && snapshot.docs) {
        this.bookings = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Verifica se 'data' é um objeto válido
          if (data && typeof data === 'object') {
            return { id: doc.id, ...data }; // Agora o spread pode ser feito
          } else {
            return null; // Se não for um objeto, retorna null
          }
        }).filter(booking => booking !== null); // Remove elementos nulos
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  }
}
