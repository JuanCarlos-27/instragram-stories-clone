import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home-page/home-page.component'),
  },
  {
    path: 'stories/:id',
    loadComponent: () =>
      import('./components/story-screen-modal/story-screen-modal.component'),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
