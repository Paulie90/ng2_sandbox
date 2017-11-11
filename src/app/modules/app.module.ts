import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { APP_ROUTES } from './app.routes';

import { NotFoundComponent } from './common/NotFound/NotFound.component';
import { MainComponent } from './components/Main/Main.component';

@NgModule({
    providers: [{ provide: APP_BASE_HREF, useValue: '/ng2' }],
    imports: [
        RouterModule.forRoot(
            APP_ROUTES,
            { enableTracing: true },
        ),
        BrowserModule,
    ],
    declarations: [
        MainComponent,
        NotFoundComponent,
    ],
    bootstrap: [MainComponent],
})
export class AppModule { }
