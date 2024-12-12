import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Função para criar um agendamento
  createAgendamento(agendamento: any): Promise<void> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        const agendamentoId = this.firestore.createId();
        agendamento.usuarioId = user.uid;
        return this.firestore
          .collection('appointments')
          .doc(agendamentoId)
          .set(agendamento);
      } else {
        throw new Error('Usuário não autenticado');
      }
    });
  }

  // Função para recuperar agendamentos
  getAgendamentos(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('appointments', (ref) =>
              ref.where('usuarioId', '==', user.uid)
            )
            .valueChanges();
        } else {
          return [];
        }
      })
    );
  }

  // Função para excluir um agendamento
  deleteAgendamento(agendamentoId: string): Promise<void> {
    return this.firestore
      .collection('appointments')
      .doc(agendamentoId)
      .delete();
  }
}
