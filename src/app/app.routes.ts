import { Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToIDashboard = () => redirectLoggedInTo(['dashboard']);

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToIDashboard },
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];
