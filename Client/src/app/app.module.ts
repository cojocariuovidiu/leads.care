import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './framework-components/http/Interceptor';
import { LandingMenuModule } from './app-components/landing-menu/landing-menu.module';
import { AuthModule } from './auth/auth.module';
import { LeadsCommonModule } from './app-components/common/common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { DialogModule } from './framework-components/dialog/dialog.module';

import { AppComponent } from './app.component';
import { LandingMenuComponent } from './app-components/landing-menu/landing-menu.component';

import { CanActivateViaAuthGuard } from './authguard';

import { AuthComponent } from './auth/auth.component';
import { LeadsModule } from './app-components/leads/leads.module';
import { LeadSearchComponent } from './app-components/leads/lead-search/lead-search.component';
import { LeadDetailComponent } from './app-components/leads/lead-detail/lead-detail.component';
import { AppSettingsService } from './framework-components/settings/app-settings.service';
import { AppSettings } from './framework-components/settings/app-settings';
import { AppSettingsGuard } from './framework-components/settings/app-settings-guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    LandingMenuModule,
    CommonModule,
    AuthModule,
    LeadsModule,
    DialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LeadsCommonModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'welcome', component: LandingMenuComponent, canActivate: [CanActivateViaAuthGuard] },
      { path: 'leads', component: LeadSearchComponent, canActivate: [CanActivateViaAuthGuard, AppSettingsGuard] },
      { path: 'leads/:leadId', component: LeadDetailComponent, canActivate: [CanActivateViaAuthGuard, AppSettingsGuard] },
      { path: 'leads/0', component: LeadDetailComponent, canActivate: [CanActivateViaAuthGuard, AppSettingsGuard] },
      {
        path: '*/path',
        redirectTo: '',
        pathMatch: 'full'
      }
    ])
  ],
  bootstrap: [AppComponent],
  providers: [
    AppSettings,
    AppSettingsService,
    CanActivateViaAuthGuard,
    AppSettingsGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ]
})
export class AppModule { }
