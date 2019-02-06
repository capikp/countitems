import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';

import { ItemsComponent } from './items.component';

import { ItemsService } from './items.service';

import { MaterialModule } from './material.module'; 
import { ItemsRoutingModule } from './items-routing.module';

// Dialogs
import { DialogFormAddItem } from './items.component';
import { DialogFormUpdateItem } from './items.component';

// SnackBars
import { 
    SnackBarIncreaseItemComponent, 
    SnackBarDecreaseItemComponent, 
    SnackBarDeleteItemComponent,
    SnackBarRefreshItemComponent,
    SnackBarUpdateItemComponent,
    SnackBarUploadImageItemComponent
} from './items.component';


@NgModule({
    declarations: [ 
        ItemsComponent,
        DialogFormAddItem,
        DialogFormUpdateItem,
        SnackBarIncreaseItemComponent,
        SnackBarDecreaseItemComponent,
        SnackBarDeleteItemComponent,
        SnackBarRefreshItemComponent,
        SnackBarUpdateItemComponent,
        SnackBarUploadImageItemComponent
    ],
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        ItemsRoutingModule
    ],
    entryComponents: [
        DialogFormAddItem,
        DialogFormUpdateItem,
        SnackBarIncreaseItemComponent,
        SnackBarDecreaseItemComponent,
        SnackBarDeleteItemComponent,
        SnackBarRefreshItemComponent,
        SnackBarUpdateItemComponent,
        SnackBarUploadImageItemComponent
    ],
    exports: [
        ItemsComponent
    ],
    providers: [ItemsService] 
})
export class ItemsModule { }


