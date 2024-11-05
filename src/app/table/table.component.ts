import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserData } from '../app.component'; // Adjust the path if necessary

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements AfterViewInit {
  @Input() dataSource: MatTableDataSource<UserData> = new MatTableDataSource<UserData>([]);
  displayedColumns: string[] = ['id', 'name', 'price', 'comment', 'category', 'date', 'radiooption'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
