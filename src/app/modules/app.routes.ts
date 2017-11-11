import { NotFoundComponent } from './common/NotFound/NotFound.component';
import { MainComponent } from './components/Main/Main.component';

export const APP_ROUTES = [
    {
        path: 'main',
        component: MainComponent,
        data: { title: 'Main page' },
    },
    {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full',
    },
    { path: '**', component: NotFoundComponent },
];
