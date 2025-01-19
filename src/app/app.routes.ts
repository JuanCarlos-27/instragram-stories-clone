import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'stories/:id',
    loadComponent: () =>
      import('./components/story-screen-modal/story-screen-modal.component'),
  },
];
