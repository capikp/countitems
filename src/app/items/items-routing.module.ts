import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

// Components
import { ItemsComponent }            from './items.component';

const itemsRoutes: Routes = [
    { path: 'items', component: ItemsComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(itemsRoutes) 
    ],
    exports: [
        RouterModule 
    ]
})
export class ItemsRoutingModule { }