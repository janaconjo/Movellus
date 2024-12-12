import { Component } from '@angular/core';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.page.html',
  styleUrls: ['./suporte.page.scss'],
})
export class SuportePage {
  // Definindo as propriedades para vinculação no formulário
  name: string = '';
  email: string = '';
  message: string = '';

  // Método para processar o envio do formulário
  submitSupportForm() {
    if (this.name && this.email && this.message) {
      // Aqui você pode adicionar o que precisa fazer quando o formulário for enviado
      console.log('Formulário enviado com sucesso!');
      console.log('Nome:', this.name);
      console.log('E-mail:', this.email);
      console.log('Mensagem:', this.message);
      // Limpar campos após o envio
      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      // Se algum campo estiver vazio, mostrar um alerta
      alert('Por favor, preencha todos os campos antes de enviar.');
    }
  }
}
