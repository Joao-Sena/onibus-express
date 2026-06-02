import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/passagens/passagens.component').then(m => m.PassagensComponent)
  },
  {
    path: 'passagens',
    loadComponent: () => import('./pages/passagens/passagens.component').then(m => m.PassagensComponent)
  },
  {
    path: 'assentos',
    loadComponent: () => import('./pages/assentos/assentos.component').then(m => m.AssentosComponent)
  },
  {
    path: 'confirmacao',
    loadComponent: () => import('./pages/confirmacao/confirmacao.component').then(m => m.ConfirmacaoComponent)
  },
  {
    path: 'minha-reserva',
    loadComponent: () => import('./pages/minha-reserva/minha-reserva.component').then(m => m.MinhaReservaComponent)
  },
];
