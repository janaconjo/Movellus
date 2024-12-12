import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  images = [
    'assets/discount-loyalty-card-concept-illustration_335657-5335.avif',
    'assets/Preview (1).png',
    '/assets/Wavy Buddies .png'
  ];
  currentIndex = 0;
  interval: any;

  // Função para navegar entre os slides
  goToSlide(index: number) {
    this.currentIndex = index;
  }

  // Função para avançar a imagem
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  ngOnInit() {
    // Inicia a mudança automática das imagens a cada 5 segundos
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5000 milissegundos = 5 segundos
  }

  ngOnDestroy() {
    // Limpa o intervalo quando o componente for destruído
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
