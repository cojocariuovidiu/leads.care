import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LandingMenuComponent } from './app-components/landing-menu/landing-menu.component';
import { CanActivateViaAuthGuard } from './authguard';
import { LeadSearchComponent } from './app-components/leads/lead-search/lead-search.component';
import { LeadDetailComponent } from './app-components/leads/lead-detail/lead-detail.component';


export const ApplicationRoutes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'welcome', component: LandingMenuComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'leads', component: LeadSearchComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'leads/:leadId', component: LeadDetailComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'leads/0', component: LeadDetailComponent, canActivate: [CanActivateViaAuthGuard] },
  {
    path: '*/path',
    redirectTo: '',
    pathMatch: 'full'
  }
];
