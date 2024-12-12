import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router'; // Adicionando a importação do Router

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  bookings: any[] = []; // Lista de agendamentos
  isEditing: boolean = false;
  serviceType: string = '';
  vehicleType: string = '';
  urgency: string = '';
  currentLocation: string = ''; // Não será mais utilizado, pois o usuário vai inserir a distância
  destination: string = ''; // Não será mais utilizado, pois o usuário vai inserir a distância
  serviceDate: string = '';
  remarks: string = '';
  finalPrice: number = 0;
  bookingId: string | null = null;
  distance: number = 0; // Distância informada pelo usuário
  applyDiscount: boolean = true;  // Aplica o desconto de 20%
  discountedPrice: number = 0;
  paymentButtonVisible: boolean = false; // Propriedade para controlar a visibilidade do botão de pagamento

  constructor(
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private router: Router // Injeção do Router para navegação
  ) {}

  ngOnInit() {
    this.loadBookings(); 
  }

  // Carrega todos os agendamentos do bookings
  async loadBookings() {
    try {
      const snapshot = await this.firestore.collection('bookings').get().toPromise();
      if (snapshot && snapshot.docs) {
        this.bookings = snapshot.docs.map((doc) => {
          const data = doc.data();
          return data ? { id: doc.id, ...data } : null;
        }).filter(booking => booking !== null); 
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    }
  }

  calculateCost() {
    let basePrice = 0;

    // Definição do preço base de acordo com o tipo de serviço
    switch (this.serviceType) {
      case 'transporte':
        basePrice = 1500;
        break;
      case 'entrega':
        basePrice = 500;
        break;
      case 'mudanca':
        basePrice = 2000;
        break;
      case 'apoio_construcao':
        basePrice = 1800;
        break;
      case 'transporte_personalizado':
        basePrice = 2000;
        break;
      case 'transporte_turismo':
        basePrice = 3000;
        break;
    }

    // Adiciona custo do veículo
    switch (this.vehicleType) {
      case 'carro':
        basePrice += 300;
        break;
      case 'mota':
        basePrice += 150;
        break;
      case 'camiao':
        basePrice += 500;
        break;
    }

    // Adiciona custo de urgência
    if (this.urgency === 'urgente') {
      basePrice += 500;  // Adiciona 500 se for urgente
    }

    // Calcula o preço final considerando a distância informada
    if (this.distance > 0) {
      this.finalPrice = basePrice + (this.distance * 100);  // Cada quilômetro custa 100 ts
    } else {
      this.finalPrice = basePrice;  // Caso a distância não tenha sido informada
    }

    // Aplica o desconto de 20% se a variável applyDiscount for verdadeira
    if (this.applyDiscount) {
      this.discountedPrice = this.finalPrice * 0.8;  // Aplica 20% de desconto
    } else {
      this.discountedPrice = this.finalPrice;
    }

    // Define se o botão de pagamento será visível com base no preço final
    this.paymentButtonVisible = this.discountedPrice > 0;
  }

  // Função para salvar ou atualizar o agendamento
  async saveOrUpdateBooking() {
    if (this.isEditing && this.bookingId) {
      await this.updateBooking(this.bookingId, this.getBookingData());
    } else {
      await this.createBooking();
    }
  }

  // Função de navegação para a página de pagamento
  goToPaymentPage() {
    this.router.navigate(['/pagamento']); // Navegar para a página de pagamento
  }

  // Cria um novo agendamento
  async createBooking() {
    if (!this.isFormValid()) {
      const errorAlert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK'],
      });
      await errorAlert.present();
      return;
    }

    try {
      const newBooking = this.getBookingData();
      await this.firestore.collection('bookings').add(newBooking);
      this.resetForm();
      this.loadBookings();
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  }

  // Atualiza um agendamento existente
  async updateBooking(id: string, updatedData: any) {
    try {
      await this.firestore.collection('bookings').doc(id).update(updatedData);
      this.resetForm();
      this.loadBookings();
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
    }
  }

  // Função que retorna os dados do agendamento
  private getBookingData() {
    return {
      serviceType: this.serviceType,
      vehicleType: this.vehicleType,
      urgency: this.urgency,
      currentLocation: this.currentLocation,
      destination: this.destination,
      serviceDate: this.serviceDate,
      remarks: this.remarks,
      price: this.discountedPrice,  
    };
  }

  // Limpa o formulário
  resetForm() {
    this.serviceType = '';
    this.vehicleType = '';
    this.urgency = '';
    this.currentLocation = '';
    this.destination = '';
    this.serviceDate = '';
    this.remarks = '';
    this.finalPrice = 0;
    this.discountedPrice = 0;
    this.isEditing = false;
    this.bookingId = null;
  }

  // Verifica se o formulário é válido (todos os campos obrigatórios estão preenchidos)
  isFormValid() {
    return this.serviceType && this.vehicleType && this.serviceDate && this.currentLocation && this.destination;
  }

  // Função para excluir um agendamento
  async deleteBooking(id: string) {
    const confirmDelete = await this.alertController.create({
      header: 'Confirmar',
      message: 'Tem certeza de que deseja excluir este agendamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          handler: async () => {
            try {
              await this.firestore.collection('bookings').doc(id).delete();
              this.loadBookings();
            } catch (error) {
              console.error('Erro ao excluir agendamento:', error);
            }
          },
        },
      ],
    });
    await confirmDelete.present();
  }

  // Função para editar um agendamento
  editBooking(booking: any) {
    this.bookingId = booking.id;
    this.serviceType = booking.serviceType;
    this.vehicleType = booking.vehicleType;
    this.urgency = booking.urgency;
    this.currentLocation = booking.currentLocation;
    this.destination = booking.destination;
    this.serviceDate = booking.serviceDate;
    this.remarks = booking.remarks;
    this.discountedPrice = booking.price;
    this.isEditing = true;
  }
}
