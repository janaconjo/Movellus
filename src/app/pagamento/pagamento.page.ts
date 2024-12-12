import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  bookingDetails: any = {}; // Detalhes do agendamento
  paymentMethod: string = ''; // Método de pagamento selecionado
  walletMethod: string = ''; // Método de carteira móvel (M-Pesa, eMola, Mkesh)
  cardMethod: string = ''; // Método de cartão de crédito (BCI, ABSA, etc.)
  finalPrice: number = 0; // Preço final
  discountedPrice: number = 0; // Preço com desconto

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Verificando se a navegação existe e se o estado contém os detalhes do agendamento
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      // Usando 'as' para indicar que 'state' tem a propriedade 'bookingDetails'
      this.bookingDetails = (navigation.extras.state as { bookingDetails: any }).bookingDetails || {
        serviceType: 'Mudança',
        vehicleType: 'Carro',
        serviceDate: '2024-12-10',
        basePrice: 2000
      };
    } else {
      this.bookingDetails = {
        serviceType: 'Mudança',
        vehicleType: 'Carro',
        serviceDate: '2024-12-10',
        basePrice: 2000
      };
    }

    // Preço final e com desconto (exemplo)
    this.finalPrice = this.bookingDetails.basePrice;
    this.discountedPrice = this.finalPrice * 0.8; // Exemplo de desconto de 20%
  }

  // Função para confirmar o pagamento
  async confirmPayment() {
    if (!this.paymentMethod) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Por favor, selecione um método de pagamento.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Simular uma transação real (deveria ser integrada com uma API real)
    let paymentStatus = '';

    if (this.paymentMethod === 'wallet') {
      paymentStatus = `Pagamento realizado com sucesso via carteira móvel: ${this.walletMethod}.`;
    } else if (this.paymentMethod === 'card') {
      paymentStatus = `Pagamento realizado com sucesso via cartão de crédito: ${this.cardMethod}.`;
    }

    const alert = await this.alertController.create({
      header: 'Pagamento Confirmado',
      message: paymentStatus,
      buttons: ['OK'],
    });

    await alert.present();

    // Aqui você deve integrar com sua API para registrar a transação no banco de dados
  }
}
