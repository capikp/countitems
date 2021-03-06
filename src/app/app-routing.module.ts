import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

// Components
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: 'app', component: AppComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) 
    ],
    exports: [
        RouterModule 
    ]
})
export class AppRoutingModule { }
