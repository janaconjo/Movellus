import { Component } from '@angular/core';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.page.html',
  styleUrls: ['./motorista.page.scss'],
})
export class MotoristaPage {
  nomeCompleto: string = '';
  telefone: string = '';
  email: string = '';
  documento: string = '';
  dataNascimento: string = '';
  categoriaVeiculo: string = '';
  licenca: string = '';
  photo: string | null = null;

  // Variável para controlar a exibição da mensagem de erro
  errorMessage: string | null = null;

  // Função para selecionar e carregar uma foto
  selectPhoto() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.photo = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  // Função para submeter o formulário
  submitForm() {
    // Verificar se os campos obrigatórios estão preenchidos
    if (!this.nomeCompleto || !this.telefone || !this.email || !this.documento) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    // Limpar mensagem de erro ao submeter com sucesso
    this.errorMessage = null;

    // Exibir os dados no console (pode ser substituído por uma lógica de envio para o servidor)
    console.log('Dados enviados:', {
      nomeCompleto: this.nomeCompleto,
      telefone: this.telefone,
      email: this.email,
      documento: this.documento,
      dataNascimento: this.dataNascimento,
      categoriaVeiculo: this.categoriaVeiculo,
      licenca: this.licenca,
      photo: this.photo,
    });

    // Mostrar mensagem de sucesso
    alert('Cadastro concluído com sucesso!');
  }
}
