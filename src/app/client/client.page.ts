import { Component } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage {
  searchText = ''; // Valor da pesquisa

  // Lista de serviços disponíveis
  services = [
    { title: 'Transporte de Mudanças', img: '/assets/mudancas.jpg' },
    { title: 'Entrega de Produtos', img: '/assets/entrega.jpg' },
    { title: 'Transporte para Eventos',  img: '/assets/casamento.jpg' },
    { title: 'Apoio à Construção',  img: '/assets/construcao.jpg' },
    { title: 'Transporte Personalizado',  img: '/assets/transportepersonalizado .jpg' },
    { title: 'Transporte para Turismo',  img: '/assets/TransporteTurismo.jpg' }
  ];

  // Função de filtragem com base no texto da pesquisa
  filteredServices() {
    return this.services.filter(service => 
      service.title.toLowerCase().includes(this.searchText.toLowerCase()) 
    
    );
  }
}
