import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './services/api.service';
import { DialogueComponent } from './dialogue/dialogue.component';

export interface UserData {
  id: string;
  name: string | null;
  // program: string | null;
  remarks: string | null;
  field: string | null;
  dob: string | null;
  yearofstudy: string | null;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'remarks', 'field', 'dob', 'yearofstudy','action'];
  dataSource = new MatTableDataSource<UserData>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialogue: MatDialog, private api: ApiService) {}

  
  ngOnInit(): void {
    this.getAllProducts();
    this.dataSource.filterPredicate = (data: UserData, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };
  }

  getAllProducts() {
    this.api.getProduct().subscribe({
      next: (data: UserData[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator; // Set paginator after data is fetched
        this.dataSource.sort = this.sort; // Set sort after data is fetched
      },
      error: (error) => console.error(error)
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // This triggers the filterPredicate
  }

  openDialog(editData?: UserData) {
    const dialogRef = this.dialogue.open(DialogueComponent, {
      width: '40%',
      data: editData 
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProducts();
      }
    })
  
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     if (result === 'updob' || result === 'delete') {
    //       this.getAllProducts(); // Refresh the product list
    //     }
    //   }
    // });
  }
  
  editProduct(element:any){
    this.dialogue.open(DialogueComponent,{
      width:'40%',
      data:element
    }).afterClosed().subscribe(val=>{
      if(val=='update'){
        this.getAllProducts();
      }
    })
  }
  deleteProduct(id:number){
    this.api.deleteProduct(id).subscribe({
      next: (data: any) => {
        alert('Record Deleted!');
        this.getAllProducts();
      },
      error:()=>{
        alert('Error deleting record')
      }
    })
  }
  // /comment
  
}
