import {AfterViewInit, Component, ViewChild } from '@angular/core';
import { Inject, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductAddEditComponent } from './product-add-edit/product-add-edit.component';
import { ApiService } from './api.service';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CoreService } from './core/core.service';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'productPageProject';
  @ViewChild(MatSidenav)
  showDiv: boolean = false;

  toggleDivVisibility(): void {
    this.showDiv = !this.showDiv;
  }
  displayedColumns: string[] = [
    '_id',
    'productName', 
    'description', 
    'amount',
    'action',     
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog,
    private apiService: ApiService,
    private _coreService: CoreService,
    ) {};

  openAddEditProductForm() {
    this._dialog.open(ProductAddEditComponent);
  }

  //for displaying response from Express server
  products: any;
  ngOnInit() {
    this.apiService.getProducts().subscribe(data =>{
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  handleClick(){
    this.apiService.getProducts().subscribe(data =>{
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refreshData() {
    this.ngOnInit();
  }

  deleteProduct(id: string) {
    this.apiService.deleteProduct(id).subscribe({
      next:(res) => {
        this._coreService.openSnackBar("Product deleted successfully", "OK");
        this.refreshData();
      },
      error: console.log,
    })
  }

  openEditForm(data:any){
    this._dialog.open(ProductAddEditComponent, {
        data,
    });
  }
}
