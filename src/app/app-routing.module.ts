import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Página inicial "Home"
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.ClientPageModule)
  },
  {
    path: 'provider',
    loadChildren: () => import('./provider/provider.module').then(m => m.ProviderPageModule)
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoPageModule),
  },
  {
    path: 'agendamento/:id',
    loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoPageModule),
  },

  {
    path: 'motorista',
    loadChildren: () => import('./motorista/motorista.module').then(m => m.MotoristaPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then(m => m.HistoricoPageModule)
  },
 
  {
    path: 'suporte',
    loadChildren: () => import('./suporte/suporte.module').then(m => m.SuportePageModule)
  },
  {
    path: 'avaliacao',
    loadChildren: () => import('./avaliacao/avaliacao.module').then(m => m.AvaliacaoPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // Pré-carregar módulos preguiçosamente
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
