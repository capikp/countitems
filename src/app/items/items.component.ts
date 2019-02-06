import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Items } from './items';
import { ItemsService } from './items.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  listItems : Items[];

  name: string;
  count: number;
  image_url: string; 

  //Upload File
  fileToUpload: File = null;

  constructor(
    private service: ItemsService,
    public dialog: MatDialog,
    private router: Router,
    public snackBar: MatSnackBar
  ) {  }

  ngOnInit() {
    this.refreshItem();
  }

  /* SnackBar */
  openSnackBarIncreaseItem() {
    this.snackBar.openFromComponent(SnackBarIncreaseItemComponent, {
      duration: 800
    });
  }

  openSnackBarDecreaseItem() {
    this.snackBar.openFromComponent(SnackBarDecreaseItemComponent, {
      duration: 800
    });
  }

  openSnackBarDeleteItem() {
    this.snackBar.openFromComponent(SnackBarDeleteItemComponent, {
      duration: 800
    });
  }

  openSnackBarRefreshItem() {
    this.snackBar.openFromComponent(SnackBarRefreshItemComponent, {
      duration: 800
    });
  }

  openSnackBarUpdateItem() {
    this.snackBar.openFromComponent(SnackBarUpdateItemComponent, {
      duration: 800
    });
  }

  openSnackBarUploadImageItem() {
    this.snackBar.openFromComponent(SnackBarUploadImageItemComponent, {
      duration: 800
    });
  }

  /* Dialogs */
  openDialogAddItem() : void {
    let dialogRef = this.dialog.open(DialogFormAddItem, {
      width: '250px',
      data: { name: this.name, count: this.count }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result){
        this.addItem(result);
      }
      
    });
  }

  openDialogUpdateItem(item: Items) : void {
    let dialogRef = this.dialog.open(DialogFormUpdateItem, {
      width: '250px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateItem(result);
      }
      
    });
  }

  /* Logic methods */

  handleFileInput(item: Items, file, files: FileList) {
    let fileRecive = files.item(0); 
    if(fileRecive){
      this.fileToUpload = files.item(0);
      this.uploadFile(item, file);
    }

  }

  uploadFile(item, file) {
    let _id = item._id;
    this.service.postFile(_id, this.fileToUpload).subscribe(data => {
      file.value = '';
      this.fileToUpload = null;
      this.refreshItem();
      this.openSnackBarUploadImageItem();
      }, error => {
        console.log(error);
      });
  }

  increaseItem(item: Items){
    this.service.increaseItem(item)
                  .subscribe(
                    rt => console.log(),
                    er => console.log(),
                    () => {
                      this.refreshItem();
                      this.openSnackBarIncreaseItem();
                    }
                  )
  } 

  decreaseItem(item: Items){
    this.service.decreaseItem(item)
                  .subscribe(
                    rt => console.log(),
                    er => console.log(),
                    () => {
                      this.refreshItem();
                      this.openSnackBarDecreaseItem();
                    }
                  )
  } 

  updateItem(item: Items){
    let _id = item._id;
    this.service.updateItem(_id, item)
                  .subscribe(
                    rt => console.log(),
                    er => console.log(),
                    () => {
                      this.refreshItem();
                      this.openSnackBarUpdateItem();
                    }
                  )
  }

  refreshItem(){
    this.service.getItems()
                  .subscribe(
                    rs => this.listItems = rs,
                    er => console.log(er),
                    () => console.log(this.listItems)
                  )
  }

  refreshItemButton(){
    this.service.getItems()
                  .subscribe(
                    rs => this.listItems = rs,
                    er => console.log(er),
                    () => {
                      console.log(this.listItems);
                      this.openSnackBarRefreshItem();
                    }
                  )
  }

  deleteItem(item: Items){
    this.service.deleteItem(item._id)
                  .subscribe(
                    rt => console.log(rt),
                    er => console.log(er),
                    () => {
                      this.listItems = this.listItems.filter(ha => ha !== item);
                      this.openSnackBarDeleteItem();
                    }
                  )
  }

  addItem(item){
    this.service.addItem(item)
                  .subscribe(
                    rt => console.log(rt),
                    er => console.log(er),
                    () => {
                      this.refreshItem();
                    }
                  )
  }
}

// Dialogs components
@Component({
  selector: 'dialog-form-add-item',
  templateUrl: 'dialog-form-add-item.html',
})
export class DialogFormAddItem {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormAddItem>,
    @Inject (MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        name: [''],
        count: ['']
    })
  }

  submit(form) {
    this.dialogRef.close(form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-form-update-item',
  templateUrl: 'dialog-form-add-item.html',
})
export class DialogFormUpdateItem {

  listItems : Items[];
  form: FormGroup;

  _id : string;

  constructor(
    private service: ItemsService,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogFormUpdateItem>,
    @Inject (MAT_DIALOG_DATA) public data: any ) { 
      this._id = data._id;
    }

  ngOnInit() {

    this.form = this.formBuilder.group({
      _id: [''],
      name: [''],
      count: ['']
    })

    this.service.getItem(this._id) 
                  .subscribe( 
                    rs => this.listItems = rs, 
                    er => console.log('Error: %s', er), 
                    () => { 
                        console.log(this.listItems.length);

                        if(this.listItems.length > 0){ 
          
                          this.form.patchValue({                                      
                                _id: this.listItems[0]._id, 
                                name: this.listItems[0].name,
                                count: this.listItems[0].count
                          })
                        }
                    }
                  )

  }

  submit(form) {
    this.dialogRef.close(form.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// Components Snack-bar
@Component({
  selector: 'snack-bar-increase-item-component',
  templateUrl: 'snack-bar-increase-item.html',
  styles: [`.increase-item { color: hotpink; }`],
  
})
export class SnackBarIncreaseItemComponent {}

@Component({
  selector: 'snack-bar-decrease-item-component',
  templateUrl: 'snack-bar-decrease-item.html',
  styles: [`.decrease-item { color: hotpink; }`],
  
})
export class SnackBarDecreaseItemComponent {}

@Component({
  selector: 'snack-bar-delete-item-component',
  templateUrl: 'snack-bar-delete-item.html',
  styles: [`.delete-item { color: hotpink; }`],
  
})
export class SnackBarDeleteItemComponent {}

@Component({
  selector: 'snack-bar-refresh-item-component',
  templateUrl: 'snack-bar-refresh-item.html',
  styles: [`.refresh-item { color: hotpink; }`],
  
})
export class SnackBarRefreshItemComponent {}

@Component({
  selector: 'snack-bar-update-item-component',
  templateUrl: 'snack-bar-update-item.html',
  styles: [`.update-item { color: hotpink; }`],
  
})
export class SnackBarUpdateItemComponent {}

@Component({
  selector: 'snack-bar-upload-image-item-component',
  templateUrl: 'snack-bar-upload-image-item.html',
  styles: [`.upload-image-item { color: hotpink; }`],
  
})
export class SnackBarUploadImageItemComponent {}

