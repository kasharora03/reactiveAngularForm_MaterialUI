import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideNativeDateAdapter } from '@angular/material/core';
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
