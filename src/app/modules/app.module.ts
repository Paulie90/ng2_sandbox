import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {MainComponent} from './components/Main/Main.component';
import {NotFoundComponent} from './common/NotFound/NotFound.component';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        data: {title: 'Heroes List'}
    },
    {
        path: '',
        redirectTo: '/heroes',
        pathMatch: 'full'
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    providers: [{provide: APP_BASE_HREF, useValue: '/ng2'}],
    imports: [
        RouterModule.forRoot(
            routes,
            {enableTracing: true}
        ),
        BrowserModule
    ],
    declarations: [
        MainComponent,
        NotFoundComponent
    ],
    bootstrap: [MainComponent]
})
export class AppModule {
}